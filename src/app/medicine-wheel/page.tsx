import type { Metadata } from "next";
import Link from "next/link";
import { TELEGRAM_URL, absoluteUrl } from "@/lib/site";
import JourneyTimeline from "./JourneyTimeline";

export const metadata: Metadata = {
  title: "Medicine Wheel",
  description:
    "メディスンホイールプログラム。サナンガ、ハペ、シリアンルー、カンボ、イボガの伝統的実践を、事前対話と安全確認のもとで巡らせる中核プログラム。",
  alternates: {
    canonical: "/medicine-wheel",
  },
  openGraph: {
    title: "Medicine Wheel | LIGHTWORK CENTER",
    description:
      "五つのメディスンを巡り、神人合一へ向かうための地図。",
    url: absoluteUrl("/medicine-wheel"),
    type: "website",
  },
};

/** タイムライン（JourneyTimeline）のフェーズとの対応を phase に持つ */
const PROGRAMS = [
  {
    num: "I.",
    en: "Ceremony",
    jp: "セレモニー",
    medicines: ["サナンガ", "ハペ"],
    phase: "日々の実践",
    body: "サナンガとハペを中心に、短時間の祈りと集中の場を作る入口プログラム。",
  },
  {
    num: "II.",
    en: "Lifestyle",
    jp: "生活習慣の見直し",
    medicines: ["イボガチップ ディエタ30日"],
    phase: "日々の実践",
    body: "イボガチップのディエタを含む30日間の実践。瞑想の習慣化と、日々の選択を見つめ直す時間。",
  },
  {
    num: "III.",
    en: "Cleansing",
    jp: "伝統的な浄化",
    medicines: ["カンボ"],
    phase: "浄化の節目",
    body: "カンボを含むセレモニー。アマゾンの先住民の伝統では「地球最強の解毒剤」とも称されてきた。実施可否は事前確認を前提にする。",
  },
  {
    num: "IV.",
    en: "Retreat",
    jp: "リトリート",
    medicines: ["カンボ", "イボガ フラッドドーズ"],
    phase: "最深部",
    body: "カンボリトリート、イボガフラッドドーズを含む集中的な場。実施可否は事前の安全確認を前提にする。",
  },
  {
    num: "V.",
    en: "Microdosing",
    jp: "21日間プログラム",
    medicines: ["サナンガ", "ハペ", "ノーマルイボガ", "シリアンルー"],
    phase: "日々の実践",
    body: "サナンガ、ハペ、ノーマルイボガ、シリアンルーなどを、意図と状態に合わせて21日単位で組み立てる。",
  },
  {
    num: "VI.",
    en: "Power Up",
    jp: "パワーアップ",
    medicines: ["イボガ ワイルドバッチ等"],
    phase: "最深部のその先",
    body: "ワイルドバッチ等を含む短期集中プログラム。天才性・天職・表現の軸を見つめるための設計。",
  },
  {
    num: "VII.",
    en: "Support System",
    jp: "継続サポート",
    medicines: [],
    phase: "全段階",
    body: "毎月のアップデート説明会、毎週土曜の相談会、新月・満月の評価ワーク、24時間メールサポート。",
  },
];

const PACKS = [
  {
    en: "Economy",
    jp: "エコノミーパック",
    body: "カンボリトリート、シリアンルーフラッドドーズ、21日プログラム3種を組み合わせる。",
  },
  {
    en: "Adam Kadmon",
    jp: "アダムカドモン覚醒 イニシエーションパック",
    body: "ワイルドイボガフラッドドーズ、アダムカドモン覚醒ワーク、21日プログラム4種。四泊五日。",
  },
  {
    en: "VIP",
    jp: "VIPコース",
    body: "Adam Kadmonに加えて、イボガTA、エリプティカ、三泊四日のリトリート3回を含む。",
  },
];

export default function MedicineWheelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Medicine Wheel",
    description:
      "シャーマニズムの伝統的実践を、事前対話と安全確認のもとで組み合わせる中核プログラム。",
    provider: {
      "@type": "Organization",
      name: "LIGHTWORK CENTER",
    },
    areaServed: "Japan",
    url: absoluteUrl("/medicine-wheel"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/<\/script>/gi, "<\\/script>"),
        }}
      />

      <section className="px-6 pt-28 pb-20">
        <div className="max-w-[1180px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted">
            ⊙ &nbsp; PROGRAMME
          </p>
          <h1 className="serif-en text-6xl sm:text-8xl font-light leading-[0.98] mt-8">
            Medicine
            <br />
            Wheel
          </h1>
          <p className="serif-jp text-xs tracking-[0.35em] text-muted mt-6">
            メディスンホイール プログラム
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 mt-16">
            <div>
              <p className="serif-en text-xs tracking-[0.32em] text-accent leading-[2.2]">
                SANANGA · HAPÉ · SYRIAN RUE
                <br />
                → KAMBÔ → IBOGA
              </p>
            </div>
            <div>
              <p className="serif-jp text-base sm:text-lg leading-[2.15] text-muted">
                メディスンホイールは、サナンガ、ハペ、シリアンルー、カンボ、イボガの実践を、
                受け取る方の意図と状態に合わせて編む中核プログラムです。
                目的は効果の約束ではなく、魂の軸を見つめ直すための場を設計すること。
              </p>
              <p className="serif-jp text-sm leading-[2] text-muted mt-8">
                本プログラムは医療行為ではなく、診断・治療・処方は行いません。
                心身の状態によっては実施をお断りすることがあり、参加の前に
                必ず事前の対話と安全確認を行います。
              </p>
            </div>
          </div>
        </div>
      </section>

      <JourneyTimeline />

      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-[1180px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted">
            ⊙ &nbsp; SEVEN PROGRAMMES
          </p>
          <p className="serif-jp text-sm leading-[2] text-muted mt-6 max-w-2xl">
            旅の地図を、実際の場に落としたのが七つのプログラムです。
            それぞれがタイムラインのどの段階にあたるかを添えています。
          </p>
          <div className="mt-12 space-y-0 border-t border-border">
            {PROGRAMS.map((program) => (
              <article
                key={program.en}
                className="grid grid-cols-1 md:grid-cols-[120px_0.6fr_1fr] gap-6 md:gap-10 py-10 border-b border-border-soft"
              >
                <p className="serif-en text-sm tracking-[0.35em] text-accent">
                  {program.num}
                </p>
                <div>
                  <h2 className="serif-en text-3xl sm:text-4xl font-light">
                    {program.en}
                  </h2>
                  <p className="serif-jp text-sm tracking-[0.16em] text-muted mt-2">
                    {program.jp}
                  </p>
                  <p className="serif-jp text-[11px] tracking-[0.2em] text-accent mt-4">
                    ⊙ {program.phase}
                  </p>
                </div>
                <div>
                  <p className="serif-jp text-sm sm:text-base leading-[2] text-muted">
                    {program.body}
                  </p>
                  {program.medicines.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {program.medicines.map((medicine) => (
                        <span
                          key={medicine}
                          className="serif-jp text-[11px] tracking-[0.15em] text-muted border border-border px-3 py-1"
                        >
                          {medicine}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <div>
              <p className="serif-en text-xs tracking-[0.45em] text-muted">
                ⊙ &nbsp; PACKS
              </p>
              <h2 className="serif-jp text-3xl font-light leading-[1.6] mt-8">
                意図と段階に合わせて、組み合わせる。
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {PACKS.map((pack) => (
                <article key={pack.en} className="bg-background p-8 min-h-[280px]">
                  <p className="serif-en text-xs tracking-[0.3em] text-accent">
                    {pack.en}
                  </p>
                  <h3 className="serif-jp text-xl font-light leading-[1.7] mt-5">
                    {pack.jp}
                  </h3>
                  <p className="serif-jp text-sm leading-[2] text-muted mt-8">
                    {pack.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 深く知る・不安に答える */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-[900px] mx-auto">
          <p className="serif-en text-xs tracking-[0.35em] text-muted">
            LEARN &amp; TRUST
          </p>
          <h2 className="serif-jp text-2xl sm:text-3xl font-light leading-[1.6] mt-6">
            急いで決めなくていいように、読むものを置いています。
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            <Link href="/guide" className="group bg-background p-8 hover:bg-paper-deep/40 transition-colors">
              <p className="serif-en text-xs tracking-[0.3em] text-accent">READING GUIDE</p>
              <p className="serif-jp text-lg font-light mt-4 group-hover:text-accent transition-colors">連載の歩き方</p>
              <p className="serif-jp text-sm leading-[2] text-muted mt-4">
                全13回の解説連載を、いまの自分に合う入口から。読むだけで帰っていい場所です。
              </p>
            </Link>
            <Link href="/first-visit" className="group bg-background p-8 hover:bg-paper-deep/40 transition-colors">
              <p className="serif-en text-xs tracking-[0.3em] text-accent">SAFETY</p>
              <p className="serif-jp text-lg font-light mt-4 group-hover:text-accent transition-colors">初めての方へ・安全について</p>
              <p className="serif-jp text-sm leading-[2] text-muted mt-4">
                当日の流れ、受け入れの基準、禁忌事項、統合。お断りすることがある理由も、ここに書いています。
              </p>
            </Link>
            <Link href="/faq" className="group bg-background p-8 hover:bg-paper-deep/40 transition-colors">
              <p className="serif-en text-xs tracking-[0.3em] text-accent">FAQ</p>
              <p className="serif-jp text-lg font-light mt-4 group-hover:text-accent transition-colors">よくある質問</p>
              <p className="serif-jp text-sm leading-[2] text-muted mt-4">
                怖い、痛い、法律は、宗教なの、まだ早い——正直に答えます。
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-[900px] mx-auto">
          <div className="border border-border p-8 sm:p-12 bg-paper-deep">
            <p className="serif-en text-xs tracking-[0.35em] text-accent">
              APPLY
            </p>
            <h2 className="serif-jp text-3xl sm:text-4xl font-light leading-[1.55] mt-6">
              まずは、意図と状態を聞かせてください。
            </h2>
            <p className="serif-jp text-sm sm:text-base leading-[2.1] text-muted mt-8">
              料金・日程・実施可否は、事前の対話と安全確認を踏まえて個別にご案内します。
              既往症、服薬、心身の状態によっては、参加をおすすめしない場合があります。
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-event="outbound_click"
                className="serif-en text-sm tracking-[0.25em] border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
              >
                Contact on Telegram
              </a>
              <Link
                href="/articles"
                className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground py-4 transition-colors"
              >
                Read Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
