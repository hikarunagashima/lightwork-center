"use client";

import { useEffect, useRef } from "react";

/**
 * ヒーロー背景の「生きた光」。
 * 金の微粒子が香の煙のように立ち上り、全体がゆっくり呼吸し、
 * カーソル（指）にわずかに遅れて応える。⊙＝光の仕事、をファーストビューそのものにする。
 *
 * 設計原則: alive, not noisy。
 * - 依存ゼロ（Canvas 2D）・compositor負荷最小
 * - 画面外/非表示タブでは完全停止
 * - prefers-reduced-motion では静止した光だけを一度描く
 */

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  driftAmp: number;
  driftFreq: number;
  baseAlpha: number;
  phase: number;
};

const GOLD = { r: 200, g: 169, b: 110 }; // --color-accent #C8A96E

function makeParticle(w: number, h: number, seedY?: boolean): Particle {
  return {
    x: Math.random() * w,
    y: seedY ? Math.random() * h : h + Math.random() * 40,
    r: 0.6 + Math.random() * 1.7,
    vy: 0.1 + Math.random() * 0.28,
    driftAmp: 8 + Math.random() * 22,
    driftFreq: 0.0004 + Math.random() * 0.0007,
    baseAlpha: 0.08 + Math.random() * 0.3,
    phase: Math.random() * Math.PI * 2,
  };
}

/** 柔らかい光点スプライト（shadowBlurは高コストなので事前生成して使い回す） */
function makeGlowSprite(): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const sctx = sprite.getContext("2d");
  if (sctx) {
    const g = sctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2,
    );
    g.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},1)`);
    g.addColorStop(0.35, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.35)`);
    g.addColorStop(1, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, size, size);
  }
  return sprite;
}

export default function HeroLight() {
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
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    const sprite = makeGlowSprite();

    // カーソルの光暈は lag をかけて追従させる（trailing — 機械ではなく気配の速度）
    const cursor = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(64, Math.max(18, Math.floor(width / 22)));
      particles = Array.from({ length: count }, () => makeParticle(width, height, true));
    };

    const drawFrame = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // 全体の呼吸（±18%）
      const breath = 0.82 + 0.18 * Math.sin(t * 0.00028);

      // カーソルの光暈（遅延追従・デスクトップのみ）
      if (fine && cursor.active) {
        cursor.x += (cursor.tx - cursor.x) * 0.05;
        cursor.y += (cursor.ty - cursor.y) * 0.05;
        const halo = ctx.createRadialGradient(
          cursor.x, cursor.y, 0,
          cursor.x, cursor.y, 180,
        );
        halo.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.05)`);
        halo.addColorStop(1, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, width, height);
      }

      for (const p of particles) {
        p.y -= p.vy;
        const sway = Math.sin(t * p.driftFreq + p.phase) * p.driftAmp * 0.01;
        p.x += sway;

        // カーソルの気配から、そっと逸れる
        if (fine && cursor.active) {
          const dx = p.x - cursor.x;
          const dy = p.y - cursor.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12100 && d2 > 1) {
            const d = Math.sqrt(d2);
            const push = ((110 - d) / 110) * 0.5;
            p.x += (dx / d) * push;
            p.y += (dy / d) * push;
          }
        }

        if (p.y < -20) {
          // hot path: GC回避のためオブジェクトを再利用する（意図的なミューテーション）
          Object.assign(p, makeParticle(width, height));
        }

        const twinkle = 0.75 + 0.25 * Math.sin(t * 0.001 + p.phase * 3);
        const alpha = p.baseAlpha * twinkle * breath;
        const size = p.r * 14; // スプライトは半径の広がりを含むため大きめに引き伸ばす
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      drawFrame(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();

    if (reduced) {
      // 動きを抑えたい人には、静止した光をひとつだけ
      drawFrame(1200);
    } else {
      start();
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.tx = e.clientX - rect.left;
      cursor.ty = e.clientY - rect.top;
      if (!cursor.active) {
        cursor.x = cursor.tx;
        cursor.y = cursor.ty;
        cursor.active = true;
      }
    };
    const onPointerLeave = () => {
      cursor.active = false;
      cursor.x = -9999;
      cursor.tx = -9999;
    };

    // ポインターはコンテンツ側が受ける（このレイヤーはpointer-events-none）。
    // 動きの検知は祖先の<section>で行う
    const section = canvas.closest("section");
    if (fine && section) {
      section.addEventListener("pointermove", onPointerMove, { passive: true });
      section.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }

    // 画面外・非表示タブでは燃料を使わない
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
      if (fine && section) {
        section.removeEventListener("pointermove", onPointerMove);
        section.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden hero-dawn pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
