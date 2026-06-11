import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Voices",
  description:
    "セレモニーを受けた方々の声。アダムカドモン覚醒 イニシエーションパック、その他のメディスン体験のご感想を、ご本人の許可のもと匿名で掲載しています。",
};

type Testimonial = {
  id: string;
  age: string;
  profession: string;
  program: string;
  title: string;
  paragraphs: ReadonlyArray<ReadonlyArray<string>>;
};

const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: "I.",
    age: "20代",
    profession: "アーティスト・経営者",
    program: "Adam Kadmon Initiation",
    title: "アダムカドモン覚醒 イニシエーションパック 体験レビュー",
    paragraphs: [
      [
        "音楽の作曲活動と会社経営。どちらも脳のリソースを極限まで使う仕事を、同時に走らせてきた。",
        "今までもかなりハードにやってきた自覚はある。ただ、5月以降のスケジュールを見たとき、「今の自分では絶対に対応しきれない」と思った。加えて、作曲が3ヶ月以上うまくいかない時期に入っていた。精神的にも、思考のリソース的にも、明確に自分の限界を感じていた。",
        "自分の限界値そのものを上げたい ── そう相談したことがきっかけで、非常に短いスパンでイボガのアダムカドモン覚醒 イニシエーションパックを受けることになった。",
      ],
      [
        "私は比較的恵まれた人生を歩んできたと思う。幼少期に壮絶と呼べるほどの体験はしていない。",
        "ただ、会社員を辞めて音楽と経営の世界に身を移してからは、ありとあらゆるハードシングスを経験した。挫折、絶望、失敗、裏切り、家族との対立。それらによる精神的な蓄積疲労は、自分でもはっきりと実感していた。",
        "イボガは、そうしたトラウマが脳に残した物理的な痕跡を修復できると聞いた。自分でもClaudeに聞いたり、海外の論文を読み漁った。調べていくと、ヘロイン中毒の治療にも使われていることがわかった。海外でそういう状況の人を実際に見たことがあったから、これが持っているポジティブな力の大きさは感覚的に理解できた。",
        "「恐らく、今の自分に必要なのはこれだ」と思った。",
      ],
      [
        "初日、イボガを飲むと、過去の記憶がフラッシュバックした。",
        "最初に出てきたのは家族との対立だった。当時の記憶が蘇るが、今の自分 ── 大人になった自分の視点で、愛を持って家族と向き合うことができた。すると、当時の父や母が置かれていた状況が理解できた。彼らもまた、愛を持って接してくれていたのだということがわかった。心の中にずっと放置していたわだかまりが、静かに消えていくのを感じた。",
        "2日目、3日目と続けるうちに、友人、昔の恋人、自分が傷つけてしまった人たち ── その全てと和解していった。",
        "全てと和解できたとき、自分を本当の意味で愛せるようになった。",
      ],
      [
        "しかし、それでも当時の私は「作曲がうまくいかない限り、自分の心の問題はどうでもいい」と思っていた。当時の私はそういう人間だった。",
        "アダムカドモン覚醒 イニシエーションパック終了後、音の聞こえ方が変わった。",
        "自分が今まで自信を持って作った曲、プロとしてレーベルからリリースした曲が、とんでもなくレベルの低い曲に聞こえたのである。",
        "これは経験上わかった。自分のレベルが上がったサインだと。",
        "そこから1週間、模索しながら作曲を続けた。ゴールデンウィーク中、友人のイベントに顔を出したら、今までのどんなパーティーよりも楽しかった。楽しいのはその場だけではなく、終わってからも続いた。自分の人生が音を立てて動いていくのがわかった。",
        "そして翌日、GWが終わる前に、曲ができた。",
        "3ヶ月以上進まなかったのに、1日でできた。",
      ],
      [
        "イボガ、その他のメディスン。どれを調べてもよくわからないし、値段も安くはないと思う。",
        "ただ、これは非常に最先端のものだった（昔からあるらしいが）。",
        "私が今まで飲んできたどんな薬よりも、間違いなく「薬」と呼べるものだった。",
      ],
    ],
  },
];

export default function VoicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[1100px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; VOICES
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          From Those
          <br />
          Who Returned.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 max-w-2xl editorial-in-delay-2">
          セレモニーを受けた方々の声を、
          ご本人の許可のもと、匿名でご紹介しています。
          掲載されている言葉はすべて、ご本人がご自身の体験として
          記述してくださったものです。
        </p>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto space-y-32">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="border-b border-border-soft pb-24 last:border-b-0"
            >
              {/* Meta */}
              <header className="mb-12 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12">
                <div>
                  <p className="serif-en text-sm tracking-[0.35em] text-accent">
                    {t.id}
                  </p>
                </div>
                <div>
                  <p className="serif-en text-xs tracking-[0.3em] text-accent mb-3">
                    {t.program}
                  </p>
                  <h2 className="serif-jp text-2xl sm:text-3xl font-medium leading-[1.6] mb-6">
                    {t.title}
                  </h2>
                  <p className="serif-en text-xs tracking-[0.25em] text-muted">
                    {t.age} &nbsp;·&nbsp; {t.profession}
                  </p>
                </div>
              </header>

              {/* Body */}
              <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12">
                <div aria-hidden></div>
                <div className="serif-jp text-base leading-[2.1] space-y-12">
                  {t.paragraphs.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-6">
                      {section.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                      {sIdx < t.paragraphs.length - 1 && (
                        <div
                          className="pt-6 flex justify-center"
                          aria-hidden
                        >
                          <span className="text-accent text-sm tracking-[0.5em]">
                            ⊙
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Note about anonymity */}
      <section className="py-24 px-6 border-t border-border bg-paper-deep/30">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-sm text-muted leading-[2.1]">
            掲載に際しては、ご本人にご確認のうえ、
            年齢・職業の方向性のみを残し、
            個人を特定しうる情報は削除しています。
            <br />
            体験は一人ひとり異なり、
            掲載されている内容が誰にとっても同じように起こることを
            お約束するものではありません。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-base text-muted leading-[2.1] mb-12">
            ご自身の状況をお話しください。
            場を整え、お待ちしています。
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">
            <Link
              href="/contact"
              className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              Apply
            </Link>
            <Link
              href="/medicine-wheel"
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground transition-colors py-4 border-b border-mute-soft hover:border-foreground"
            >
              Medicine&nbsp;Wheel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
