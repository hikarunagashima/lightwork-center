import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "何をしたら、よくなれるんだろう。── 探していたものは、ずっと、自分の中にいた。この場所をつくった理由。",
  alternates: { canonical: "/manifesto" },
  openGraph: {
    title: "自分への手紙 — LIGHTWORK JOURNAL",
    description: "ここに置く言葉は、情報じゃない。あなたへの手紙だ。",
    url: absoluteUrl("/manifesto"),
    type: "article",
  },
};

const LINES = [
  "何をしたら、よくなれるんだろう。",
  "そう問いながら、たくさんの正解を集めてきた人へ。",
  "俺もそうだった。本を読み、講座に通い、誰かの成功法則を握って。でも、外には、なかった。",
  "探していたものは、ずっと、自分の中にいた。一度も、離れたことなんてなかった。",
  "「こうあるべき」「こうしなきゃ」。既存の概念への執着が、自分と、自分自身のあいだに、薄い膜を張っていた。それだけだ。",
  "だから、ここに置く言葉は、情報じゃない。あなたへの手紙だ。",
  "読んで、もし何かが静かに震えたなら、それは新しく知ったんじゃない。思い出したんだと思う。自分が、自分を愛していた感覚を。",
  "シャーマンが魂に光を送るように、俺はここから、画面の向こうの一人に、言葉で光を送る。",
  "その思い出しのために、この場所をつくった。",
  "あなたの人生が、また、輝きはじめるために。",
];

export default function ManifestoPage() {
  return (
    <article className="px-6 py-28 sm:py-40">
      <div className="max-w-[680px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted text-center">
          ⊙ &nbsp; EDITORIAL MANIFESTO
        </p>
        <h1 className="serif-jp text-3xl sm:text-4xl font-light text-center leading-[1.6] mt-10">
          自分への手紙
        </h1>

        <div className="mt-20 space-y-9 sm:space-y-10">
          {LINES.map((line, index) => (
            <p
              key={index}
              className="serif-jp text-lg sm:text-xl leading-[2.2]"
              style={{ color: "var(--color-ink-mute)" }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-24 text-center">
          <span className="serif-en text-accent text-3xl leading-none" aria-hidden>
            ⊙
          </span>
          <p className="serif-jp text-sm text-muted mt-10 tracking-[0.1em]">
            長島 光 — Hikaru Nagashima
          </p>
          <Link
            href="/articles"
            className="serif-en inline-block text-xs tracking-[0.25em] text-muted border-b border-mute-soft hover:text-foreground hover:border-foreground transition-colors mt-12 pb-1"
          >
            手紙を読む &nbsp;→&nbsp; Articles
          </Link>
        </div>
      </div>
    </article>
  );
}
