"use client";

import { useEffect, useRef, useState } from "react";

export default function SplashOverlay() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const maxRadius =
      Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
      ) * 0.8;
    const startDelay = 600;
    const expandDuration = 1600;
    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < startDelay) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((elapsed - startDelay) / expandDuration, 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const r = eased * maxRadius;

      // Radial gradient: transparent center -> white glow edge -> dark outside
      el.style.background = `radial-gradient(
        circle at 50% 50%,
        transparent ${r}px,
        rgba(255, 255, 255, 0.35) ${r + 3}px,
        rgba(255, 255, 255, 0.15) ${r + 20}px,
        rgba(80, 80, 80, 0.85) ${r + 60}px,
        rgba(25, 25, 25, 0.95) ${r + 140}px,
        rgba(17, 17, 17, 1) ${r + 250}px
      )`;

      if (progress >= 1) {
        el.style.opacity = "0";
        setTimeout(() => setDone(true), 600);
        return;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        background: `radial-gradient(
          circle at 50% 50%,
          rgba(180, 180, 180, 0.25) 0%,
          rgba(60, 60, 60, 0.9) 15%,
          rgba(25, 25, 25, 0.97) 40%,
          rgba(17, 17, 17, 1) 100%
        )`,
        transition: "opacity 0.6s ease-out",
      }}
    />
  );
}
