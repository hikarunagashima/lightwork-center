import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — よくある質問",
  description:
    "メディスンホイールプログラムに興味を持った方からよくいただく質問に、正直に答えます。不安や迷いも、そのまま持ってきてください。",
  alternates: { canonical: "/faq" },
};

type Faq = { q: string; a: string[] };

const FAQS: Faq[] = [
  {
    q: "何から始めればいいですか？",
    a: [
      "まず、連載記事を読むことをおすすめします。費用も登録も要りません。読むだけで、何も決めずに帰っていい場所として書いています。",
      "読んだうえで聞いてみたいことが出てきたら、そのときに相談の場（Telegram）があります。急ぐ理由は、何もありません。",
    ],
  },
  {
    q: "これは医療行為ですか？",
    a: [
      "いいえ。メディスンは医療行為ではなく、シャーマニズムの伝統的実践です。診断・治療・処方は行いません。",
      "既存の医療を代替するものでもありません。治療中のご病気がある方は、必ず主治医にご相談のうえでご検討ください。私たちは医療を否定しません——必要なときに医療を頼ることは、正しい判断です。",
    ],
  },
  {
    q: "正直、怖いです。それでも大丈夫ですか？",
    a: [
      "怖いのは、正常です。得体の知れないものに対する警戒は、健全な感覚です。私たちはその感覚を「克服すべきもの」とは考えていません。",
      "怖さが残っているなら、何もしなくていい。記事を読むのも、相談に来るのも、ずっと来ないのも、全部あなたの自由です。怖さは、急いで手放さなくていいものです。",
    ],
  },
  {
    q: "サナンガは痛いと聞きました。本当ですか？",
    a: [
      "本当です。隠しません。目に入れた直後、数分間の強い灼熱感があります。",
      "その痛みが何なのかについては、連載vol.11で正直に書いています。読んでから判断してください。",
    ],
  },
  {
    q: "法律的に問題はないのですか？",
    a: [
      "イボガ・イボガインは、日本の麻薬及び向精神薬取締法の麻薬指定リスト（別表第一）には掲載されていません（2026年6月時点・一次情報確認）。",
      "ただし、法令は変わりうるものですし、各メディスンの国内法上の扱いはそれぞれ異なります。実施の形態・可否は、事前の対話と安全確認を踏まえて、個別に正確にご案内します。",
    ],
  },
  {
    q: "宗教やカルトではないですか？",
    a: [
      "特定の宗教への入信を求めることはありません。教義への同意も、人間関係の囲い込みもありません。",
      "出口は常に開いています。「今は受けない」「もう来ない」という選択を、私たちは引き止めません。むしろ、自分で選び直せることこそが、この実践が大切にしているものです。",
    ],
  },
  {
    q: "持病があります／薬を服用しています。受けられますか？",
    a: [
      "状態によっては、お受けいただけない場合があります。心臓疾患などの循環器系疾患、特定の薬の服用、精神疾患の既往、てんかん、腎・肝機能の障害、妊娠中・授乳中などは、事前の慎重な確認が必要です。イボガには心電図検査を必須としています。",
      "詳しくは「初めての方へ」のご注意の項をご覧ください。該当する場合も、まずは正直にお話しください。お断りすることがあるのは、あなたを守るためです。",
    ],
  },
  {
    q: "費用はいくらですか？",
    a: [
      "料金は、事前の対話と安全確認のあとで、プログラム内容に応じて個別にご案内しています。ページに一律の価格を載せていないのは、内容が一人ひとりの状態と意図によって変わるためです。",
      "対話の段階までは費用はかかりません。内容によってはまとまった費用になることもあります。金額を理由に見送る判断も、まったく正当です。",
    ],
  },
  {
    q: "何回くらい受ければいいのですか？",
    a: [
      "決まった回数はありません。一人ひとりの状態と歩く速度によって違います。",
      "プログラムは段階の道のりとして設計されていて、各段階のあいだに「ここで止まる」「ここから引き返す」という選択肢が常にあります。回数を約束したり、追加を勧誘したりすることはありません。",
    ],
  },
  {
    q: "「自分にはまだ早い」と感じています。",
    a: [
      "それは、正しい判断かもしれません。私たちは「まだ早い」という結論も、申し込みと同じくらい大切な到達点だと考えています。",
      "連載だけを読んで帰る人も、何年か経ってから来る人も、ずっと来ない人も——全部、正解です。扉は開けたまま、ここに置いておきます。",
    ],
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a.join(" "),
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[860px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; FAQ
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          Ask
          <br />
          Anything.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 editorial-in-delay-2">
          興味と不安は、たいてい一緒にやってきます。
          <br />
          ここでは、よくいただく質問に、できる限り正直に答えます。
          きれいな答えよりも、本当の答えを置くようにしています。
        </p>
      </section>

      {/* Q&A */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto space-y-0">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-12 border-b border-border-soft first:pt-0"
            >
              <div>
                <p className="serif-en text-xs tracking-[0.35em] text-accent">
                  Q.{String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <div>
                <h2 className="serif-jp text-xl font-light leading-[1.7]">
                  {faq.q}
                </h2>
                <div className="mt-6 space-y-4">
                  {faq.a.map((para) => (
                    <p key={para.slice(0, 24)} className="serif-jp text-sm sm:text-base leading-[2.1] text-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-base text-muted leading-[2.1] mb-12">
            ここにない質問は、対話の場でそのまま聞いてください。
            <br />
            どんな問いも、入口になります。
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link
              href="/first-visit"
              className="serif-en text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              First Visit
            </Link>
            <Link
              href="/guide"
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground py-4 transition-colors"
            >
              連載の歩き方
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
