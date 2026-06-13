"use client";

import { useEffect, useRef } from "react";

/**
 * 読書の進みを示す、画面上端の金の糸。
 * 読み終わりに近づくほど、光が右へ満ちていく。
 * scaleX のみを動かす（compositor-friendly・layoutを揺らさない）。
 */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(200,169,110,0.4), rgba(200,169,110,0.9))",
        }}
      />
    </div>
  );
}
