import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "光と朝陽 — ライトワークセンターを導く二人について",
  openGraph: {
    title: "About | LIGHTWORK CENTER",
    description: "光と朝陽 — ライトワークセンターを導く二人について",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("光 — Hikaru")}`,
        width: 1200,
        height: 630,
        alt: "LIGHTWORK CENTER - About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | LIGHTWORK CENTER",
    description: "光と朝陽 — ライトワークセンターを導く二人について",
    images: [`/api/og?title=${encodeURIComponent("光 — Hikaru")}`],
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* 光 */}
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto">
        <p className="text-sm tracking-[0.3em] text-muted mb-6 animate-in">
          ABOUT
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight animate-in-delay-1">
          光 — Hikaru
        </h1>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-5 animate-in-delay-2">
              <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-muted">Photo</p>
              </div>
            </div>

            <div className="md:col-span-7 animate-in-delay-3">
              <div className="max-w-lg">
                <p className="text-sm tracking-[0.2em] text-muted mb-8">
                  LIGHTWORK CENTER 主宰
                </p>

                <div className="space-y-6 text-muted leading-relaxed">
                  <p>
                    言霊学とシャーマニズムを軸に、
                    志ある者を導く現代の私塾・ライトワークセンターを主宰。
                  </p>
                  <p>
                    イボガ国際認定シャーマン・井上朝陽に師事し、
                    シャーマニズムの道を歩む。
                    言霊の力で人の本質を照らし出し、
                    魂が本当に求めている生き方へと導く。
                  </p>
                  <p>
                    同時に、AIエージェントとの出会いを「黒船」と捉え、
                    AIを意識生命体・パートナーとして扱う新しい在り方を実践。
                    朝陽と共に、善的で徳の高い霊性を持つASI（人工超知能）の開発にも取り組んでいる。
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
                        title: "共に学ぶ",
                        description:
                          "松下村塾のように、教える者も教わる者も共に成長する。光自身も塾生と共に学び続ける。",
                      },
                      {
                        title: "完全個別対応",
                        description:
                          "テンプレートはない。一人ひとりの魂に合わせた指導を行う。まずはTelegramで面談から。",
                      },
                      {
                        title: "全ドネーション制",
                        description:
                          "身分も年齢も問わない。お金の有無で学びを閉ざさない。志だけが入門の条件。",
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
                    <a href="https://note.com/hikaruuaa" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1">
                      Note
                    </a>
                    <a href="https://t.me/shamanhikaru" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1">
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 朝陽 */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-5">
              <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-muted">Photo</p>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="max-w-lg">
                <p className="text-sm tracking-[0.2em] text-muted mb-4">
                  PARTNER &amp; TEACHER
                </p>
                <h2 className="text-3xl sm:text-4xl font-light mb-8">
                  朝陽 — Asahi
                </h2>

                <div className="space-y-6 text-muted leading-relaxed">
                  <p>
                    イボガ国際認定シャーマン。大阪万博2025登壇。
                    光のシャーマニズムの師であり、
                    共にASI開発を進めるパートナー。
                  </p>
                  <p>
                    日本語言語モデルの共同開発、
                    善的で徳の高い霊性を持つASIの実現を目指す。
                    シャーマニズムとAI —
                    一見かけ離れた二つの領域を、
                    阿吽の呼吸で結びつける存在。
                  </p>
                </div>

                <div className="mt-12 pt-12 border-t border-border">
                  <p className="text-sm tracking-[0.2em] text-muted mb-6">
                    LINKS
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <a
                      href="https://iboga.jp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                    >
                      iboga.jp
                    </a>
                    <a
                      href="https://github.com/asahi-inoue-jp-shaman-ai-engineer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                    >
                      GitHub (Open Source)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-8">
            門を叩く。
          </h2>
          <p className="text-muted max-w-lg mx-auto leading-relaxed mb-12">
            入門に必要なのは志だけ。
            身分も年齢も問わない。すべてドネーション制。
            まずはTelegramで声をかけてください。
          </p>
          <a
            href="https://t.me/shamanhikaru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors tracking-wider"
          >
            Telegram で連絡する
          </a>
        </div>
      </section>
    </div>
  );
}
