"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 創世の5秒 — 初回訪問のロードアニメーション。
 *
 * 暗闇の特異点 → 神聖幾何学（フラワーオブライフ）の一筆書き生成 →
 * 臨界・ビッグバン（粒子の球状爆発・衝撃波・一瞬のグリッチ）→
 * 重力収束の渦 → ⊙ に結ばれ、夜の銀河（CosmicHero）へ溶ける。
 * 背景にはデジタルの雨（カタカナ・二進・古代記号）。
 *
 * - 1セッション1回のみ（sessionStorage）
 * - クリック / タップ / Esc でいつでもスキップ
 * - prefers-reduced-motion では再生しない
 * - 依存ゼロ（Canvas 2D・加算合成・自前粒子物理）
 */

const SEEN_KEY = "lwc-genesis-seen";

// タイムライン（ms）
const T_GEOMETRY = 700; //   特異点 → 幾何学の描画開始
const T_BANG = 2100; //      臨界 → 爆発
const T_VORTEX = 2750; //    爆発 → 渦への収束
const T_END = 5000; //       夜へ溶ける

const GOLD = { r: 200, g: 169, b: 110 };
const MIST = { r: 143, g: 166, b: 172 };

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  heat: number; // 1=白熱 → 0=冷えて金
  alive: boolean;
};

type RainColumn = {
  x: number;
  y: number;
  speed: number;
  glyphs: string[];
};

const GLYPHS = "アイウエオカタカムナ01010⊙◯△〆ヰヱヲ※⊕01";

function makeRain(width: number, height: number): RainColumn[] {
  const cols = Math.floor(width / 52);
  return Array.from({ length: cols }, (_, i) => ({
    x: i * 52 + 18 + Math.random() * 16,
    y: Math.random() * height,
    speed: 0.6 + Math.random() * 1.6,
    glyphs: Array.from(
      { length: 14 },
      () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    ),
  }));
}

/** フラワーオブライフ — 中心円 + 6 + 12 の19円（生命の種の拡張） */
function flowerCircles(R: number): Array<{ x: number; y: number; r: number }> {
  const r = R / 3;
  const out: Array<{ x: number; y: number; r: number }> = [{ x: 0, y: 0, r }];
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    out.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, r });
  }
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const d = i % 2 === 0 ? r * 2 : r * Math.sqrt(3);
    out.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, r });
  }
  return out;
}

export default function GenesisLoader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leaveRef = useRef<() => void>(() => {});

  // 初回判定はマウント後に（SSRとhydrationを揺らさない）。?genesis で何度でも再生できる
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const force = new URLSearchParams(window.location.search).has("genesis");
    if (!force && sessionStorage.getItem(SEEN_KEY)) return;
    sessionStorage.setItem(SEEN_KEY, "1");
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 創世のあいだ世界を固定する
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let width = 0;
    let height = 0;
    let raf = 0;
    let sparks: Spark[] = [];
    let rain: RainColumn[] = [];
    let exploded = false;
    let done = false;
    const t0 = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rain = makeRain(width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    const cx = () => width / 2;
    const cy = () => height * 0.46; // CosmicHero の ⊙ と同じ座標 — 光が受け継がれる
    const circles = () => flowerCircles(Math.min(width, height) * 0.21);

    const explode = () => {
      if (exploded) return;
      exploded = true;
      const n = width < 640 ? 1100 : 2400;
      sparks = Array.from({ length: n }, () => {
        // 球面方向 + ランダム初速（中心からの放射）
        const a = Math.random() * Math.PI * 2;
        const tilt = (Math.random() - 0.5) * 0.9; // 楕円気味=銀河の円盤
        const speed = 2.2 + Math.random() * 9.5;
        return {
          x: cx(),
          y: cy(),
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed * (0.55 + Math.abs(tilt)),
          size: 0.5 + Math.random() * 1.9,
          heat: 0.6 + Math.random() * 0.4,
          alive: true,
        };
      });
    };

    const finish = () => {
      if (done) return;
      done = true;
      setLeaving(true);
      window.setTimeout(() => setShow(false), 950);
    };
    leaveRef.current = finish;

    const draw = (now: number) => {
      const t = now - t0;
      ctx.globalCompositeOperation = "source-over";
      // 残像を少し残す黒 — 光の尾を引かせる
      ctx.fillStyle = "rgba(6, 8, 14, 0.32)";
      ctx.fillRect(0, 0, width, height);

      const X = cx();
      const Y = cy();

      // ---- デジタルの雨（幾何学期〜爆発まで） ----
      if (t > T_GEOMETRY * 0.6 && t < T_VORTEX + 500) {
        const rainAlpha =
          t < T_BANG ? Math.min(0.22, (t - T_GEOMETRY * 0.6) / 3000)
          : Math.max(0, 0.22 - (t - T_BANG) / 1400);
        ctx.font = "13px monospace";
        for (const col of rain) {
          col.y += col.speed * (t > T_BANG ? 3.2 : 1);
          for (let g = 0; g < col.glyphs.length; g++) {
            const gy = col.y - g * 17;
            if (gy < -20 || gy > height + 20) continue;
            const head = g === 0;
            ctx.fillStyle = head
              ? `rgba(244,240,230,${rainAlpha * 1.6})`
              : `rgba(${MIST.r},${MIST.g},${MIST.b},${rainAlpha * (1 - g / 15)})`;
            ctx.fillText(col.glyphs[g], col.x, gy);
          }
          if (col.y - 14 * 17 > height) {
            col.y = -Math.random() * 300;
            col.glyphs = col.glyphs.map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
          }
          if (Math.random() < 0.04) {
            col.glyphs[Math.floor(Math.random() * col.glyphs.length)] =
              GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
      }

      ctx.globalCompositeOperation = "lighter"; // ここから先は光の加算

      // ---- 特異点（最初の光） ----
      if (t < T_BANG) {
        const charge = Math.min(1, t / T_BANG);
        const pulse = 1 + 0.3 * Math.sin(t * 0.02);
        const r = (2 + charge * 7) * pulse;
        const glow = ctx.createRadialGradient(X, Y, 0, X, Y, r * 9);
        glow.addColorStop(0, `rgba(255,252,240,${0.85 * charge + 0.15})`);
        glow.addColorStop(0.25, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${0.5 * charge})`);
        glow.addColorStop(1, "rgba(200,169,110,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(X - r * 9, Y - r * 9, r * 18, r * 18);
      }

      // ---- 神聖幾何学 — フラワーオブライフの一筆書き ----
      if (t > T_GEOMETRY && t < T_BANG + 180) {
        const prog = Math.min(1, (t - T_GEOMETRY) / (T_BANG - T_GEOMETRY));
        const cs = circles();
        const per = 1 / cs.length;
        ctx.lineWidth = 1;
        cs.forEach((c, i) => {
          const local = Math.max(0, Math.min(1, (prog - i * per * 0.72) / (per * 3)));
          if (local <= 0) return;
          const fade = t > T_BANG ? 1 - (t - T_BANG) / 180 : 1;
          ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${(0.25 + 0.45 * local) * fade})`;
          ctx.beginPath();
          ctx.arc(X + c.x, Y + c.y, c.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * local);
          ctx.stroke();
        });
      }

      // ---- ビッグバン ----
      if (t >= T_BANG) {
        explode();

        // 衝撃波リング
        for (const [delay, speed, alpha] of [[0, 0.9, 0.5], [120, 0.62, 0.3]] as const) {
          const wt = t - T_BANG - delay;
          if (wt > 0 && wt < 1300) {
            const wr = wt * speed;
            const wa = alpha * (1 - wt / 1300);
            ctx.strokeStyle = `rgba(244,240,230,${wa})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(X, Y, wr, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // 爆発の閃光
        const flash = Math.max(0, 1 - (t - T_BANG) / 320);
        if (flash > 0) {
          ctx.fillStyle = `rgba(255,250,235,${flash * 0.55})`;
          ctx.fillRect(0, 0, width, height);
        }

        // 粒子 — 放射 → 渦への収束
        const vortex = t > T_VORTEX;
        for (const s of sparks) {
          if (!s.alive) continue;
          if (vortex) {
            // 中心への重力 + 接線力 = 渦
            const dx = X - s.x;
            const dy = Y - s.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            const g = Math.min(0.5, 46 / d);
            s.vx += (dx / d) * g + (-dy / d) * g * 0.85;
            s.vy += (dy / d) * g + (dx / d) * g * 0.85;
            s.vx *= 0.965;
            s.vy *= 0.965;
            if (d < 14) s.alive = false; // ⊙ に還る
          } else {
            s.vx *= 0.988;
            s.vy *= 0.988;
          }
          s.x += s.vx;
          s.y += s.vy;
          s.heat = Math.max(0, s.heat - 0.004);

          // 白熱 → 金 → 青の余熱
          const c =
            s.heat > 0.55
              ? { r: 255, g: 250, b: 235 }
              : s.heat > 0.25
                ? GOLD
                : MIST;
          const a = Math.min(1, s.heat + 0.25);
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${a})`;
          ctx.fillRect(s.x, s.y, s.size, s.size);
        }
      }

      // ---- グリッチ（デジタルの産声・爆発直後の数フレーム） ----
      if (t > T_BANG && t < T_BANG + 200) {
        ctx.globalCompositeOperation = "source-over";
        for (let i = 0; i < 3; i++) {
          const sy = Math.random() * height;
          const sh = 6 + Math.random() * 26;
          const shift = (Math.random() - 0.5) * 46;
          ctx.drawImage(
            canvas,
            0, sy * dpr, canvas.width, sh * dpr,
            shift, sy, width, sh,
          );
        }
        ctx.globalCompositeOperation = "lighter";
      }

      // ---- ⊙ が結ばれる ----
      if (t > T_VORTEX + 500) {
        const oa = Math.min(1, (t - T_VORTEX - 500) / 700);
        ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${oa * 0.95})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(X, Y, 11, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${oa})`;
        ctx.beginPath();
        ctx.arc(X, Y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      if (t >= T_END) {
        finish();
        return;
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const skip = () => finish();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    canvas.parentElement?.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      canvas.parentElement?.removeEventListener("pointerdown", skip);
      document.body.style.overflow = prevOverflow;
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`genesis ${leaving ? "genesis-leave" : ""}`}
      role="presentation"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <p className="genesis-logo serif-en">⊙ &nbsp;LIGHTWORK CENTER</p>
      <button
        type="button"
        className="genesis-skip serif-en"
        onClick={() => leaveRef.current()}
      >
        SKIP
      </button>
    </div>
  );
}
