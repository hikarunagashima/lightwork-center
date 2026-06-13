"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * 没入型ファーストビュー —「古代の祈りを、AI時代の言葉へ。」を画面そのものにする。
 *
 * 夜の宇宙: ⊙を中心に金の銀河が渦を巻き（3D投影・差動回転）、
 * 軌道リングがゆっくり回り、マウスで視点が傾く。
 * 見出しはランダムな文字から確定していく（言霊が降りるデコード演出）。
 * スクロールすると生成りの世界へ夜が明ける。
 *
 * 依存ゼロ（Canvas 2D）・画面外停止・reduced-motion対応・モバイル粒子減。
 */

const GOLD = { r: 200, g: 169, b: 110 }; // --color-accent
const MIST = { r: 143, g: 166, b: 172 }; // 古代の青（quantum tint）
const PAPER = { r: 244, g: 240, b: 230 };

type Star = {
  /** 銀河円盤上の半径（0-1正規化） */
  rad: number;
  theta: number;
  y: number;
  size: number;
  alpha: number;
  /** 0=金 1=紙白 2=青 */
  tone: number;
  twinklePhase: number;
};

function makeStar(): Star {
  // 中心に密度が寄る対数分布 + 渦腕の濃淡
  const rad = Math.pow(Math.random(), 0.6);
  const arm = Math.floor(Math.random() * 2) * Math.PI; // 2本腕
  const spread = (Math.random() - 0.5) * 1.6;
  const theta = rad * 5.2 + arm + spread; // 対数螺旋風
  const toneRoll = Math.random();
  return {
    rad: 0.06 + rad * 0.94,
    theta,
    y: (Math.random() - 0.5) * 0.08 * (1 - rad * 0.5),
    size: 0.5 + Math.random() * 1.8,
    alpha: 0.25 + Math.random() * 0.75,
    tone: toneRoll < 0.72 ? 0 : toneRoll < 0.9 ? 1 : 2,
    twinklePhase: Math.random() * Math.PI * 2,
  };
}

function starColor(tone: number): { r: number; g: number; b: number } {
  return tone === 0 ? GOLD : tone === 1 ? PAPER : MIST;
}

/** 見出しの言霊 — 一文字ずつ、水面から浮かび上がる */
function CharRise({
  text,
  startDelay = 0,
  className = "",
}: {
  text: string;
  startDelay?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text} role="text">
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="char-rise"
          style={{ animationDelay: `${startDelay + i * 110}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let running = false;
    let last = performance.now();

    // マウスパララックス（lerpで気配の速度に）
    const view = { yaw: 0, pitch: 0, tYaw: 0, tPitch: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 320 : 720;
      stars = Array.from({ length: count }, makeStar);
    };

    const drawFrame = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.46;
      const R = Math.min(width * 0.62, height * 0.78);
      const breath = 0.85 + 0.15 * Math.sin(now * 0.00022);

      view.yaw += (view.tYaw - view.yaw) * 0.04;
      view.pitch += (view.tPitch - view.pitch) * 0.04;
      const basePitch = 0.98 + view.pitch; // 見下ろし角
      const cosP = Math.cos(basePitch);
      const sinP = Math.sin(basePitch);
      const cosY = Math.cos(view.yaw);
      const sinY = Math.sin(view.yaw);

      // 中心のコア光
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
      core.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${0.34 * breath})`);
      core.addColorStop(0.4, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${0.1 * breath})`);
      core.addColorStop(1, "rgba(200,169,110,0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, width, height);

      // 銀河 — ケプラー風差動回転（内側ほど速い）
      for (const s of stars) {
        if (!reduced) {
          s.theta += (0.000045 * dt) / Math.pow(s.rad, 0.72);
        }
        // world（円盤座標 → ワールド）
        const wr = s.rad * R;
        let x = Math.cos(s.theta) * wr;
        let z = Math.sin(s.theta) * wr;
        let y = s.y * R;
        // yaw（マウス）
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        x = x1;
        z = z1;
        // pitch（見下ろし）
        const y2 = y * cosP - z * sinP;
        const z2 = y * sinP + z * cosP;
        // perspective
        const f = R * 1.9;
        const persp = f / (f + z2 + R);
        const sx = cx + x * persp;
        const sy = cy + y2 * persp;

        const tw = 0.7 + 0.3 * Math.sin(now * 0.0012 + s.twinklePhase);
        const a = s.alpha * tw * breath * Math.min(1, persp * 1.15);
        const c = starColor(s.tone);
        const size = Math.max(0.4, s.size * persp);

        ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ⊙の軌道リング — 破線の同心円がゆっくり逆回転（古代の曼荼羅×衛星軌道）
      const rings = [
        { rr: R * 0.2, speed: 0.00008, dash: [2, 9], alpha: 0.5 },
        { rr: R * 0.31, speed: -0.00005, dash: [1, 13], alpha: 0.38 },
        { rr: R * 0.44, speed: 0.00003, dash: [3, 21], alpha: 0.26 },
      ];
      for (const ring of rings) {
        ctx.save();
        ctx.translate(cx, cy);
        // リングも盤面に寝かせる（楕円 = 3D感）
        ctx.scale(1, Math.abs(cosP) * 0.42 + 0.1);
        ctx.rotate(reduced ? 0 : now * ring.speed);
        ctx.setLineDash(ring.dash);
        ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${ring.alpha * breath})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, ring.rr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 中心の ⊙
      ctx.globalAlpha = 0.9 * breath;
      ctx.strokeStyle = `rgb(${GOLD.r},${GOLD.g},${GOLD.b})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgb(${GOLD.r},${GOLD.g},${GOLD.b})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      drawFrame(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduced) {
      drawFrame(performance.now());
    } else {
      start();
    }

    const onPointerMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      view.tYaw = nx * 0.22;
      view.tPitch = ny * 0.1;
    };
    if (fine) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (fine) window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function CosmicHero() {
  return (
    <section className="cosmic-hero relative min-h-[92vh] flex flex-col overflow-hidden">
      {/* 宇宙 */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <GalaxyCanvas />
        {/* 下端 — 生成りの世界への夜明け */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#FAFAF7]" />
      </div>

      {/* 中身 */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center pt-24 pb-28">
        <p className="serif-en text-[11px] sm:text-xs tracking-[0.6em] text-[#C8A96E] editorial-in">
          ⊙ &nbsp;NEO SHAMANISM JOURNAL
        </p>
        <h1 className="serif-jp font-light leading-[1.4] mt-10 text-[#F4F0E6] text-4xl sm:text-6xl lg:text-7xl">
          <CharRise text="古代の祈りを、" startDelay={400} className="block" />
          <CharRise text="AI時代の言葉へ。" startDelay={1300} className="block mt-2" />
        </h1>
        <p className="serif-jp text-sm sm:text-lg leading-[2.2] text-[#A89B89] mt-10 editorial-in-delay-3 max-w-xl">
          ここは、何かになるための場所じゃない。
          <br />
          すでに、そうだったことを、思い出す場所だ。
        </p>
        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-5 items-center justify-center editorial-in-delay-3">
          <Link
            href="/articles"
            className="serif-en text-sm tracking-[0.25em] border border-[#F4F0E6]/70 text-[#F4F0E6] px-8 py-3.5 hover:bg-[#F4F0E6] hover:text-[#10131C] transition-colors duration-500"
          >
            Read Articles
          </Link>
          <Link
            href="/manifesto"
            className="serif-en text-sm tracking-[0.25em] text-[#A89B89] hover:text-[#F4F0E6] border-b border-[#A89B89]/40 hover:border-[#F4F0E6] py-3 transition-colors duration-500"
          >
            Read the Letter
          </Link>
        </div>
      </div>

      {/* スクロールの誘い */}
      <div
        aria-hidden
        className="relative flex flex-col items-center gap-3 pb-10 editorial-in-delay-3"
      >
        <span className="serif-en text-[10px] tracking-[0.5em] text-[#A89B89]">
          SCROLL
        </span>
        <span className="scroll-beam" />
      </div>
    </section>
  );
}
