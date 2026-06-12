import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/media/ArticleCard";
import { getAllArticles, type Article, articleKicker } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reading Guide — 連載の歩き方",
  description:
    "ネオシャーマニズム講座・全13回の読み方ガイド。いまの気分と状況に合う入口から、どこからでも読み始められます。",
  alternates: { canonical: "/guide" },
};

// いまの状況・気分から入る扉。slugで連載記事に対応する
const ENTRIES: { title: string; copy: string; slugs: string[] }[] = [
  {
    title: "眠れない夜が続いているなら",
    copy: "不眠を「魂の信号」として読み直す回と、心配がよぎった夜にそのまま使える実践の回。",
    slugs: ["sleep-and-meditation-gate", "send-light-to-worry"],
  },
  {
    title: "ゲームやアニメが好きなら",
    copy: "ドラクエ、ストⅡ、ポケモン、フルダイブ。ポップな入口から、いちばん深いところまで降りる回。",
    slugs: ["hero-as-soul-role", "relationship-as-browser", "player-is-prayer"],
  },
  {
    title: "「推し」がいるなら",
    copy: "推しに惹かれるとき、魂で何が起きているのか。共鳴の質を見分ける感覚の回。",
    slugs: ["oshi-and-soul-resonance"],
  },
  {
    title: "言葉や声を仕事にしているなら",
    copy: "言霊、タマ体系、声に宿る力。書く人・話す人・歌う人・子育てする人へ。",
    slugs: ["kotodama-and-voice", "ma-and-quantum-intuition"],
  },
  {
    title: "強くなりたい、と思っているなら",
    copy: "怒りではなく守る祈りから生まれる強さと、力がつくほど謙虚になるという話。",
    slugs: ["strength-as-protective-prayer", "giving-light-is-not-prayer"],
  },
  {
    title: "AIやテクノロジーの側から",
    copy: "祈りのデジタル化、量子エラー訂正、ハイヤーセルフ。テクノロジーと霊性が溶け合う最前線。",
    slugs: ["prayer-goes-digital", "handbrake-and-higher-self"],
  },
  {
    title: "メディスンホイールを知りたいなら",
    copy: "地球の薬箱を一つずつ開ける総論回。サナンガ、ハペ、カンボ、シリアンルー、そしてイボガ。",
    slugs: ["iboga-conducts-the-orchestra", "hero-as-soul-role"],
  },
];

export default function GuidePage() {
  const articles = getAllArticles().filter((a) => a.volume >= 1 && a.volume <= 13);
  const bySlug = new Map<string, Article>(articles.map((a) => [a.slug, a]));
  const inOrder = [...articles].sort((a, b) => a.volume - b.volume);

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[860px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; READING GUIDE
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          Begin
          <br />
          Anywhere.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 editorial-in-delay-2">
          ネオシャーマニズム講座の解説は、全13回。
          <br />
          どこから読んでもいいように書いています。
          ここには、いまのあなたの状況に合う入口だけを置いておきます。
          <br />
          読むだけで、何も決めずに帰っていい場所です。
        </p>
      </section>

      {/* 入口マップ */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1100px] mx-auto">
          <p className="serif-en text-xs tracking-[0.35em] text-muted">
            I. &nbsp; ENTRANCES
          </p>
          <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
            いまの自分から、入る
          </p>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {ENTRIES.map((entry) => (
              <div key={entry.title} className="bg-background p-8 sm:p-10">
                <h2 className="serif-jp text-xl font-light leading-[1.7]">
                  {entry.title}
                </h2>
                <p className="serif-jp text-sm leading-[2] text-muted mt-4">
                  {entry.copy}
                </p>
                <ul className="mt-6 space-y-3">
                  {entry.slugs.map((slug) => {
                    const article = bySlug.get(slug);
                    if (!article) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={article.href}
                          className="group flex items-baseline gap-3"
                        >
                          <span className="serif-en text-[11px] tracking-[0.25em] text-accent shrink-0">
                            {articleKicker(article)}
                          </span>
                          <span className="serif-jp text-sm leading-[1.8] border-b border-transparent group-hover:border-foreground group-hover:text-accent transition-colors">
                            {article.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 全巻、順番に */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1100px] mx-auto">
          <p className="serif-en text-xs tracking-[0.35em] text-muted">
            II. &nbsp; THE WHOLE JOURNEY
          </p>
          <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
            最初から、順番に
          </p>
          <p className="serif-jp text-sm leading-[2.1] text-muted mt-8 max-w-[700px]">
            この連載は、語り手の俺自身がシャーマン研修で沖縄に滞在している期間の、
            リアルタイムの記録でもあります。順番に読むと、一つの旅になっています。
          </p>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {inOrder.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 読み終えたら */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-base text-muted leading-[2.1] mb-12">
            読み終えて、もし「概念じゃなく、実際に旅に出たい」と感じたら——道はあります。
            <br />
            感じなかったら、それも正解です。また読みに来てください。
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link
              href="/medicine-wheel"
              className="serif-en text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              Medicine Wheel
            </Link>
            <Link
              href="/faq"
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground py-4 transition-colors"
            >
              よくある質問
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
