import type { ReactNode } from "react";

/** 体験談ページも、開かれた本のページとして現れる（ナビゲーションごとに再生） */
export default function VoiceTemplate({ children }: { children: ReactNode }) {
  return <div className="book-page">{children}</div>;
}
