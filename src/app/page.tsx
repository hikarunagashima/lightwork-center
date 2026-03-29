import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-[1400px] mx-auto">
        <div className="animate-in">
          <p className="text-sm tracking-[0.3em] text-muted mb-6">
            WRITE × LIGHT
          </p>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight animate-in-delay-1">
          言霊は、
          <br />
          あなたの人生を
          <br />
          輝かせる。
        </h1>
        <div className="mt-12 animate-in-delay-2">
          <p className="text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
            言霊学とシャーマニズムを通じて、
            <br className="hidden sm:block" />
            あなたの本質を言葉にし、光輝く魂の旅路へ導く。
          </p>
        </div>
        <div className="mt-12 animate-in-delay-3">
          <Link
            href="/contact"
            className="inline-block text-sm border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors tracking-wider"
          >
            面談を申し込む
          </Link>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-sm tracking-[0.3em] text-muted mb-6">
                PHILOSOPHY
              </p>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight">
                一霊四魂の生き方。
                <br />
                大和魂の実践。
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-muted leading-relaxed">
                ライトワークセンターは、言葉の力で人を導く場所。
                言霊学を軸に、一人ひとりの魂に合わせた指導を行う。
                言霊学の実践だけで人生は大きく輝きます。才能ある者にはメディスンホイールプログラムを通じたシャーマニズムの伝導により、本質的な魂の成長をサポートします。
              </p>
              <p className="text-muted leading-relaxed mt-6">
                子供には言霊学の純粋な教え、
                大人には魂の深層に触れる体験を。
                年齢も背景も問わない。
                必要なのは、天命を求める心だけ。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-sm tracking-[0.3em] text-muted mb-6">SERVICES</p>
          <h2 className="text-3xl sm:text-4xl font-light mb-16">
            あなたに合った道を。
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {[
              {
                title: "言霊学セッション",
                description:
                  "言葉の使い方を学び、人生を書き換える。子供から大人まで。",
              },
              {
                title: "シャーマニズム指導",
                description:
                  "天才性をさらに磨きたい希望者限定。祈りで世界を変える生き方を伝える。",
              },
              {
                title: "メディスンプログラム",
                description:
                  "カンボ、イボガなど。単発からフルパッケージまで。",
              },
              {
                title: "経営者コンサルティング",
                description:
                  "言霊と魂の視点で、経営の本質を見極める。",
              },
              {
                title: "リトリート",
                description:
                  "定期開催。異言開通ツアー、国内外でのセレモニー。",
              },
              {
                title: "子供の教育",
                description:
                  "スターシードの子供たちへ。親子参加も個別も対応。",
              },
            ].map((service) => (
              <div key={service.title} className="bg-background p-8 sm:p-12">
                <h3 className="text-lg font-medium mb-4">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/services"
              className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
            >
              サービス詳細を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-muted mb-6">
            COMMUNITY
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-8">
            まずは、話をしよう。
          </h2>
          <p className="text-muted max-w-lg mx-auto leading-relaxed mb-12">
            ライトワークセンターでは、会員コミュニティ・情報発信・セッション予約のすべてをTelegramで行っています。
          </p>
          <Link
            href="/contact"
            className="inline-block text-sm border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors tracking-wider"
          >
            面談を申し込む
          </Link>
        </div>
      </section>
    </div>
  );
}
