"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type NextReadBarProps = {
  href: string;
  kicker: string;
  label: string;
};

/** この深さまで読んだ人にだけ、次の一歩を差し出す（黄金律: スクロール70%ソフトCTA） */
const SCROLL_DEPTH_THRESHOLD = 0.7;
const DISMISS_KEY = "lwc-next-read-dismissed";

function isDismissed() {
  return window.sessionStorage.getItem(DISMISS_KEY) === "1";
}

/**
 * モバイル限定の追従「次に読む」バー。
 * ポップアップで体験を破らないよう、読了に近づいた人へだけ静かに現れる。
 * 一度閉じたらそのセッションでは出さない。
 */
export default function NextReadBar({ href, kicker, label }: NextReadBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    function evaluateDepth() {
      if (isDismissed()) {
        setIsVisible(false);
        return;
      }
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = window.scrollY / scrollable;
      setIsVisible(depth >= SCROLL_DEPTH_THRESHOLD);
    }

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        evaluateDepth();
        tickingRef.current = false;
      });
    }

    const initialFrame = window.requestAnimationFrame(evaluateDepth);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function dismiss() {
    window.sessionStorage.setItem(DISMISS_KEY, "1");
    setIsVisible(false);
  }

  return (
    <aside
      aria-label="次に読む"
      aria-hidden={!isVisible}
      className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-4 px-5 py-3.5">
        <Link href={href} className="flex-1 min-w-0 group" tabIndex={isVisible ? 0 : -1}>
          <p className="serif-en text-[10px] tracking-[0.3em] text-accent">
            {kicker}
          </p>
          <p className="serif-jp text-sm leading-snug truncate mt-1 group-hover:text-accent transition-colors">
            {label}
          </p>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="このバーを閉じる"
          tabIndex={isVisible ? 0 : -1}
          className="shrink-0 w-9 h-9 flex items-center justify-center text-muted hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
