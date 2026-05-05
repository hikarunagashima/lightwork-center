import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sessions",
  description:
    "Medicine Wheel — メディスンホイール プログラム。Ceremony, Detoxification, Retreat, Microdosing, Power Up, Support。",
};

const PROGRAMS = [
  {
    num: "I.",
    en: "Ceremony",
    jp: "セレモニー",
    tagline: "Sananga & Hapé Ritual",
    desc: "サナンガ＋ハペセレモニー。短時間の純度の高い祈りの場。悲しみ・メンタルブロックの除去、松果体の浄化、チャクラのクレンジング。",
  },
  {
    num: "II.",
    en: "Lifestyle",
    jp: "生活習慣の改善",
    tagline: "30-Day Iboga Dieta",
    desc: "イボガチップ ディエタ プログラム（30日）。オートファジーサポート、瞑想の習慣化、依存症の克服。",
  },
  {
    num: "III.",
    en: "Detoxification",
    jp: "解毒",
    tagline: "Kambô Passage",
    desc: "カンボセレモニー。地球最強の解毒剤。感情体のクレンジング、自己免疫力・肝機能の強靭な増強。",
  },
  {
    num: "IV.",
    en: "Retreat",
    jp: "リトリート",
    tagline: "Iboga Flood Dose Initiation",
    desc: "カンボリトリート、イボガフラッドドーズリトリート（一泊二日）。秘教儀式としてのアダムカドモン覚醒イニシエーション。",
  },
  {
    num: "V.",
    en: "Microdosing",
    jp: "マイクロドージング — 21日間プログラム",
    tagline: "21-Day Plant Programmes",
    desc: "サナンガ／ハペ／ノーマルイボガ／シリアンルー、各21日間。緩やかなニューロン損傷修復、リプログラミング、アンセスターヒーリング。",
  },
  {
    num: "VI.",
    en: "Power Up",
    jp: "パワーアップ",
    tagline: "Genius Boost · Wild Iboga Pack",
    desc: "イボガワイルドバッチ ジーニアスブースト、タベルナンテマニ、アフリカーナ。天才性を磨き上げる短期集中プログラム。",
  },
  {
    num: "VII.",
    en: "Support System",
    jp: "サポートシステム",
    tagline: "Continuum",
    desc: "毎月のアップデート説明会、毎週土曜の相談会、新月・満月の評価ワーク、24h メールサポート。",
  },
];

const PACKS = [
  {
    tier: "I.",
    en: "Economy",
    jp: "エコノミーパック",
    desc: "カンボリトリート＋シリアンルーフラッドドーズ＋21日プログラム3種。",
  },
  {
    tier: "II.",
    en: "Adam Kadmon",
    jp: "アダムカドモン覚醒 イニシエーションパック",
    desc: "ワイルドイボガ フラッドドーズ＋アダムカドモン覚醒ワーク＋21日プログラム4種。四泊五日。",
  },
  {
    tier: "III.",
    en: "VIP",
    jp: "VIPコース",
    desc: "Adam Kadmonに加えて、イボガTA／エリプティカ／三泊四日のリトリート3回。",
  },
];

export default function SessionsPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[1100px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; SESSIONS
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          Medicine&nbsp;Wheel
        </h1>
        <p className="serif-jp text-xs tracking-[0.35em] text-muted mt-4 editorial-in-delay-1">
          メディスンホイール プログラム
        </p>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 max-w-2xl editorial-in-delay-2">
          一回限りのセレモニーから、二十一日間のディエタ、
          数泊のリトリート、そして覚醒のイニシエーションまで。
          <br />
          受け取る者の状態と意図に合わせて、メディスンを編む。
        </p>
      </section>

      {/* Programs */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-[1100px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-12">
            ⊙ &nbsp; PROGRAMMES
          </p>
          <div className="space-y-16">
            {PROGRAMS.map((p) => (
              <article
                key={p.en}
                className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12 pb-16 border-b border-border-soft last:border-b-0"
              >
                <div>
                  <p className="serif-en text-sm tracking-[0.35em] text-accent">
                    {p.num}
                  </p>
                </div>
                <div>
                  <h2 className="serif-en text-3xl sm:text-4xl font-light">
                    {p.en}
                  </h2>
                  <p className="serif-jp text-xs tracking-[0.25em] text-muted mt-2">
                    {p.jp}
                  </p>
                  <p className="serif-en text-sm italic text-accent tracking-wide mt-4 mb-6">
                    — {p.tagline} —
                  </p>
                  <p className="serif-jp text-base text-muted leading-[2]">
                    {p.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Packs */}
      <section className="py-32 px-6 border-t border-border bg-paper-deep/30">
        <div className="max-w-[1100px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-6">
            ⊙ &nbsp; THE PACK
          </p>
          <h2 className="serif-en text-3xl sm:text-5xl font-light mb-2">
            Curated Programmes.
          </h2>
          <p className="serif-jp text-xs tracking-[0.3em] text-muted mb-16">
            パックメニュー
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {PACKS.map((p) => (
              <div key={p.en} className="bg-background p-10 sm:p-12">
                <p className="serif-en text-sm tracking-[0.35em] text-accent mb-6">
                  {p.tier}
                </p>
                <h3 className="serif-en text-3xl font-light mb-2">{p.en}</h3>
                <p className="serif-jp text-xs tracking-[0.25em] text-muted mb-8">
                  {p.jp}
                </p>
                <p className="serif-jp text-sm text-muted leading-[2]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail / Inquire */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10">
            ⊙ &nbsp; DETAILS
          </p>
          <h2 className="serif-jp text-2xl sm:text-3xl font-light leading-[1.8] mb-10">
            プログラムの詳細と料金は、
            <br />
            お問い合わせ後にご案内します。
          </h2>
          <p className="serif-jp text-sm text-muted max-w-lg mx-auto leading-[2] mb-14">
            お一人おひとりのご状況をお伺いしたうえで、
            最適なプログラムをご一緒にお選びし、
            別冊のメディスンホイール プログラム表をお送りいたします。
          </p>
          <Link
            href="/contact"
            className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-12 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Apply
          </Link>
        </div>
      </section>
    </div>
  );
}
