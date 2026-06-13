"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/** 出口アニメーションの長さ（book-close と同期させる） */
const TURN_MS = 420;

/**
 * 本のページ遷移（出口側）。
 * 記事・体験談の個別ページへのリンクだけをインターセプトし、
 * いまのページが本のようにめくれ始めてから遷移する。
 * 入口側は articles/[slug]/template.tsx の .book-page が受け取る。
 *
 * 安全設計: 修飾キー・中クリック・新規タブ・ダウンロード・外部リンクには介入しない。
 * prefers-reduced-motion では何もしない（即遷移）。
 */
export default function PageTurn() {
  const router = useRouter();
  const pathname = usePathname();

  // 遷移が完了したら、めくり状態を必ず解除する（戻るボタン経由でも残さない）
  useEffect(() => {
    document.body.classList.remove("page-turning");
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isArticleHref = (href: string) =>
      (href.startsWith("/articles/") && !href.startsWith("/articles/type/")) ||
      (href.startsWith("/voices/") && !href.startsWith("/voices/program/"));

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const target = e.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href") || "";
      if (!isArticleHref(href)) return;
      if (href === window.location.pathname) return;

      // Next.js の Link ハンドラより先に止める（capture段階で介入している）
      e.preventDefault();
      e.stopPropagation();
      document.body.classList.add("page-turning");
      window.setTimeout(() => {
        router.push(href);
      }, TURN_MS);
    };

    // capture: Link の onClick より先に受け取る
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
