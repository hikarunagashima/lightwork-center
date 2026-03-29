import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "ライトワークセンターが提供するサービス一覧",
  openGraph: {
    title: "言霊学 × シャーマニズム | LIGHTWORK CENTER",
    description: "ライトワークセンターが提供するサービス一覧",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("言霊学 × シャーマニズム")}`,
        width: 1200,
        height: 630,
        alt: "LIGHTWORK CENTER - Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "言霊学 × シャーマニズム | LIGHTWORK CENTER",
    description: "ライトワークセンターが提供するサービス一覧",
    images: [
      `/api/og?title=${encodeURIComponent("言霊学 × シャーマニズム")}`,
    ],
  },
};

const services = [
  {
    id: "kotodama",
    title: "言霊学セッション",
    subtitle: "KOTODAMA SESSION",
    description:
      "言葉の使い方が、人生を決める。一霊四魂の教えに基づき、あなたの言葉を根本から見直す。日常の悩みから人生の方向性まで、言葉の力で解決に導く。",
    details: ["1on1 / グループ対応", "オンライン・対面", "子供から大人まで"],
    pricing: "寄附制（セッション後、受け取った愛をお金に変換してください）",
  },
  {
    id: "shamanism",
    title: "シャーマニズム指導",
    subtitle: "SHAMANISM GUIDANCE",
    description:
      "天才性をさらに磨いて行きたい希望者を限定に、シャーマニズムの伝導を行う。精霊と神聖な薬草と共に、祈りで世界を変える生き方を伝えます。霊性に応じて完全個別でカスタマイズして提供。",
    details: ["完全個別対応", "段階的な導き", "面談後に適性を判断"],
    pricing: "面談にてご案内",
  },
  {
    id: "medicine",
    title: "メディスンプログラム",
    subtitle: "MEDICINE PROGRAM",
    description:
      "各種メディスンを用いたセレモニー。カンボ、イボガなど、あなたの段階に合わせて適切なメディスンを提案。単発の体験からフルパッケージまで対応。",
    details: [
      "単発メニュー（各種メディスン）",
      "フルパッケージ（イボガまで含む）",
      "事前面談必須",
    ],
    pricing: "メニューにより異なる（面談にてご案内）",
    link: "/medicine-wheel",
  },
  {
    id: "consulting",
    title: "経営者コンサルティング",
    subtitle: "EXECUTIVE CONSULTING",
    description:
      "経営の本質は、経営者自身の魂の状態にある。言霊と一霊四魂の視点から、あなたの経営を根本から見直し、組織と個人の両方を変容させる。",
    details: ["経営者・リーダー向け", "1on1", "オンライン・対面"],
    pricing: "面談にてご案内",
  },
  {
    id: "retreat",
    title: "リトリート・ツアー",
    subtitle: "RETREATS & TOURS",
    description:
      "定期的に国内外で開催するリトリートとセレモニー。与論島での異言開通ツアーや、各地でのセレモニーなど。非日常の中で、自分を解き放ち、魂の本質に触れる体験を。",
    details: ["国内外で不定期開催", "少人数制", "イベントページで随時告知"],
    pricing: "イベントごとに設定",
  },
  {
    id: "children",
    title: "子供の教育",
    subtitle: "CHILDREN'S PROGRAM",
    description:
      "スターシードの子供たちへ。言霊学を通じて、言葉の力と自分の本質を知る。親子参加も、子供だけの参加も可能。",
    details: ["親子参加可", "子供のみのグループ可", "年齢に合わせたプログラム"],
    pricing: "寄附制",
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto">
        <p className="text-sm tracking-[0.3em] text-muted mb-6 animate-in">
          SERVICES
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight animate-in-delay-1">
          あなたに合った道を、
          <br />
          一緒に見つける。
        </h1>
        <p className="text-muted mt-8 max-w-xl leading-relaxed animate-in-delay-2">
          最初に1時間の面談を行い、あなたの状態と目的に合わせて
          進め方を決めます。人によって導き方は異なります。
        </p>
      </section>

      {/* Services */}
      <section className="px-6 pb-32">
        <div className="max-w-[1400px] mx-auto">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="border-t border-border py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
            >
              <div className="md:col-span-1">
                <p className="text-sm text-muted font-mono">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="md:col-span-4">
                <p className="text-xs tracking-[0.3em] text-muted mb-2">
                  {service.subtitle}
                </p>
                <h2 className="text-2xl sm:text-3xl font-light">
                  {service.title}
                </h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-sm text-muted flex items-center gap-3"
                    >
                      <span className="w-1 h-1 bg-muted rounded-full shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm">
                  <span className="text-muted">料金：</span>
                  {service.pricing}
                </p>
                {"link" in service && service.link && (
                  <div className="mt-6">
                    <Link
                      href={service.link as string}
                      className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                    >
                      詳しく見る
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">
            まずは面談から。
          </h2>
          <p className="text-muted max-w-lg mx-auto leading-relaxed mb-12">
            どのサービスが合うかは、話してみないとわからない。
            まずは1時間、あなたの話を聞かせてください。
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
