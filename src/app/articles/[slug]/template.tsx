import type { ReactNode } from "react";

/** 記事ページは、開かれた本のページとして現れる（ナビゲーションごとに再生） */
export default function ArticleTemplate({ children }: { children: ReactNode }) {
  return <div className="book-page">{children}</div>;
}
