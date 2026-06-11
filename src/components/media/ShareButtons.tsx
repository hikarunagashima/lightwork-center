"use client";

import { useState } from "react";

type ShareButtonsProps = {
  url: string;
  title: string;
};

const COPY_FEEDBACK_MS = 2000;

/**
 * シェア導線（X / LINE / リンクコピー）。
 * 黄金律 A-3（タイトル直下＋記事末の2点配置）で使う。
 * SDKは読み込まずintent URLのみ（性能・プライバシー・静謐の三方良し）。
 */
export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), COPY_FEEDBACK_MS);
    } catch {
      // クリップボード未許可環境では選択コピーに委ねる（致命ではないため静かに諦める）
      window.prompt("このURLをコピーしてください", url);
    }
  }

  const itemClass =
    "serif-en text-[11px] tracking-[0.28em] text-muted hover:text-foreground border-b border-transparent hover:border-foreground pb-0.5 transition-colors";

  return (
    <div className="flex items-center gap-6" aria-label="この記事を共有する">
      <span className="serif-en text-[11px] tracking-[0.35em] text-mute-soft select-none">
        SHARE
      </span>
      <a
        href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label="Xで共有する"
      >
        X
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label="LINEで共有する"
      >
        LINE
      </a>
      <button
        type="button"
        onClick={copyLink}
        className={`${itemClass} cursor-pointer`}
        aria-label="リンクをコピーする"
      >
        {isCopied ? "COPIED ⊙" : "COPY LINK"}
      </button>
    </div>
  );
}
