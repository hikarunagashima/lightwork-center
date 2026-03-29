import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medicine Wheel Program",
  description:
    "メディスンホイールプログラム — 井上朝陽先生監修。神聖な植物と精霊の力で天才性を発揮する。",
};

export default function MedicineWheelPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto">
        <p className="text-sm tracking-[0.3em] text-muted mb-6 animate-in">
          MEDICINE WHEEL PROGRAM
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight animate-in-delay-1">
          メディスンホイール
          <br />
          プログラム
        </h1>
        <p className="text-muted mt-8 max-w-xl leading-relaxed animate-in-delay-2">
          世界中の神聖な植物と精霊の力を借り、共に祈ることで、
          人類の天才性とポテンシャルを発揮するためのプログラム。
        </p>
      </section>

      {/* About the Program */}
      <section className="px-6 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-t border-border py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24">
            <div className="md:col-span-4">
              <p className="text-xs tracking-[0.3em] text-muted mb-2">
                ABOUT
              </p>
              <h2 className="text-2xl sm:text-3xl font-light">
                プログラムについて
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="max-w-xl space-y-6 text-muted leading-relaxed">
                <p>
                  メディスンホイールプログラムは、イボガ国際認定シャーマンである井上朝陽先生が監修したプログラムです。
                </p>
                <p>
                  朝陽先生は、その成果から国際的な大阪万博での登壇機会も持つ日本人シャーマン。世界各地のメディスンと伝統的なシャーマニズムの智慧を統合し、現代に生きる人々のために体系化しました。
                </p>
                <p>
                  本プログラムでは、世界中の神聖な植物と精霊の力を借り、共に祈ることで、人類の天才性とポテンシャルを発揮することを目指します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supervisor */}
      <section className="px-6 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-t border-border py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24">
            <div className="md:col-span-4">
              <p className="text-xs tracking-[0.3em] text-muted mb-2">
                SUPERVISOR
              </p>
              <h2 className="text-2xl sm:text-3xl font-light">
                監修者
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="max-w-xl">
                <h3 className="text-xl font-medium mb-4">
                  井上朝陽
                </h3>
                <ul className="space-y-2 mb-6">
                  {[
                    "イボガ国際認定シャーマン",
                    "大阪万博登壇",
                    "iboga.jp 主宰",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted flex items-center gap-3"
                    >
                      <span className="w-1 h-1 bg-muted rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works at Lightwork Center */}
      <section className="px-6 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-t border-border py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24">
            <div className="md:col-span-4">
              <p className="text-xs tracking-[0.3em] text-muted mb-2">
                AT LIGHTWORK CENTER
              </p>
              <h2 className="text-2xl sm:text-3xl font-light">
                当センターでの提供
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="max-w-xl space-y-6 text-muted leading-relaxed">
                <p>
                  ライトワークセンターでは、朝陽先生のプログラムの流れをベースに、一人ひとりの霊性に応じて完全個別にカスタマイズして提供します。
                </p>
                <p>
                  単発のメディスン体験からフルパッケージまで、あなたの段階に合わせた最適なプランを面談で一緒に決めていきます。
                </p>
                <ul className="space-y-2">
                  {[
                    "単発メニュー（カンボ等、各種メディスン）",
                    "フルパッケージ（イボガまで含む段階的プログラム）",
                    "事前面談必須",
                    "霊性に応じた完全個別カスタマイズ",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted flex items-center gap-3"
                    >
                      <span className="w-1 h-1 bg-muted rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">
            まずは面談から。
          </h2>
          <p className="text-muted max-w-lg mx-auto leading-relaxed mb-12">
            プログラムへの参加は、面談を通じてあなたの状態と適性を確認した上で決定します。
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
