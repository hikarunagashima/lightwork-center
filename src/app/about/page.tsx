import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "ライトワークセンター主宰・光について",
  openGraph: {
    title: "About | LIGHTWORK CENTER",
    description: "ライトワークセンター主宰・光について",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("About")}`,
        width: 1200,
        height: 630,
        alt: "LIGHTWORK CENTER - About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | LIGHTWORK CENTER",
    description: "ライトワークセンター主宰・光について",
    images: [`/api/og?title=${encodeURIComponent("About")}`],
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto">
        <p className="text-sm tracking-[0.3em] text-muted mb-6 animate-in">
          ABOUT
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight animate-in-delay-1">
          光 — Hikaru
        </h1>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            {/* Photo placeholder */}
            <div className="md:col-span-5 animate-in-delay-2">
              <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-muted">Photo</p>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-7 animate-in-delay-3">
              <div className="max-w-lg">
                <p className="text-sm tracking-[0.2em] text-muted mb-8">
                  LIGHTWORK CENTER 主宰
                </p>

                <div className="space-y-6 text-muted leading-relaxed">
                  <p>
                    独自に海外文化のサイケデリック探求をした後、井上朝陽先生に師事。言霊と魂の光を使い、人の天才性や無自覚な才能を発揮させる独自のライトワークセッションを提供。
                  </p>
                  <p>
                    言霊学とシャーマニズムを軸に、言霊と文字の力で人を導く。
                    一霊四魂の生き方、大和魂を自ら実践し、子供には言霊学の純粋な教えを、素質ある大人にはシャーマニズムの道を伝導している。
                  </p>
                  <p>
                    井上先生の開発したメディスンホイールプログラムを独自に言霊学と融合したプログラムとして改良し、本質的な変容をサポート。
                    経営者へのコンサルティングから、
                    スターシードの子供たちの教育まで、
                    一人ひとりの魂に合わせた指導を行う。
                  </p>
                  <p>
                    「ライトワーク」には二つの意味がある。
                    <br />
                    <strong>Write</strong> — 言葉を書くこと。言霊で人生を書き換える。
                    <br />
                    <strong>Light</strong> — 魂の光。本質を照らし出す。
                  </p>
                </div>

                <div className="mt-12 pt-12 border-t border-border">
                  <p className="text-sm tracking-[0.2em] text-muted mb-6">
                    APPROACH
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        title: "完全個別対応",
                        description:
                          "最初に1時間の面談を行い、一人ひとりに合った進め方を決める。テンプレートはない。",
                      },
                      {
                        title: "売り込まない",
                        description:
                          "直感で「ここだ」と感じた人が来る。必要な人に、必要なタイミングで届く。",
                      },
                      {
                        title: "実践主義",
                        description:
                          "教えるだけではなく、自ら一霊四魂の生き方を実践している。理論ではなく、生き様で伝える。",
                      },
                    ].map((item) => (
                      <div key={item.title}>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-border">
                  <p className="text-sm tracking-[0.2em] text-muted mb-6">
                    LINKS
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <a
                      href="https://www.instagram.com/hikaru.asobi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://note.com/hikaruuaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                    >
                      Note
                    </a>
                    <span className="text-sm text-muted/50">
                      X — Coming Soon
                    </span>
                    <span className="text-sm text-muted/50">
                      TikTok — Coming Soon
                    </span>
                    <a
                      href="https://t.me/shamanhikaru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                    >
                      Telegram
                    </a>
                  </div>
                </div>

                <div className="mt-12">
                  <Link
                    href="/contact"
                    className="inline-block text-sm border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors tracking-wider"
                  >
                    面談を申し込む
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
