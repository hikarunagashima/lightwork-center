import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "First Visit",
  description:
    "初めての方へ。セレモニー当日の流れ、統合について、禁忌事項。",
};

export default function FirstVisitPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[860px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; FIRST VISIT
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          For Those
          <br />
          Visiting
          <br />
          for the First Time.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 editorial-in-delay-2">
          初めてセレモニーを受けるとき、
          多くの方が緊張します。
          それは自然な反応です。
          <br />
          ここでは、当日までに知っておくとよいことをお伝えします。
        </p>
      </section>

      {/* What is a session */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              I. &nbsp; WHAT IS IT
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              セレモニーとは
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              本サイトで提供しているのは、
              医療行為ではなく、伝統的な精神文化に基づくセレモニーです。
              「治療」を約束するものではありませんが、
              受け取る方の状態と意図に応じて、
              内的な変容のきっかけとなる場を整えています。
            </p>
            <p className="mt-8">
              セレモニーの主役は、施術者でもメディスンでもなく、
              <strong className="font-medium">ご自身です。</strong>
              場を整え、メディスンを編むことが私の役割です。
              中心へ戻るのは、ご自身の意志と魂の力です。
            </p>
          </div>
        </div>
      </section>

      {/* The day */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              II. &nbsp; THE DAY
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              当日の流れ
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <ol className="space-y-8">
              <li>
                <p className="serif-en text-xs tracking-[0.3em] text-accent mb-2">
                  01 &nbsp; ARRIVAL &amp; CONVERSATION
                </p>
                <p>
                  到着後、まずはお話を伺います。
                  今日この時点でのご状態、不安、期待を、
                  ありのままお話しください。場が整っていきます。
                </p>
              </li>
              <li>
                <p className="serif-en text-xs tracking-[0.3em] text-accent mb-2">
                  02 &nbsp; CEREMONY
                </p>
                <p>
                  メディスンを受け取り、場の中心に降りていきます。
                  時間は数十分から数時間、リトリートでは数日にわたります。
                  その間、私はあなたの傍に居続けます。
                </p>
              </li>
              <li>
                <p className="serif-en text-xs tracking-[0.3em] text-accent mb-2">
                  03 &nbsp; INTEGRATION
                </p>
                <p>
                  セレモニーが終わったあとが、本当のはじまりです。
                  受け取ったものを日常に戻すための対話と、
                  必要に応じたフォローアップを行います。
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              III. &nbsp; INTEGRATION
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              統合
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              セレモニーで開かれた何かは、
              数日から数週間、ときに数ヶ月かけて、
              日常の中で形をなしていきます。
              焦らず、自分の呼吸の速度で受け入れていく時間です。
            </p>
            <p className="mt-8">
              統合の期間中は、できるだけ静かに、
              アルコール・刺激物・過度な情報摂取を控え、
              自然のなかで時間を過ごすことをお勧めしています。
            </p>
          </div>
        </div>
      </section>

      {/* Selection — 受け入れの基準 */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              IV. &nbsp; SELECTION
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              受け入れの基準
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              すべての方を受け入れているわけではありません。
              健康状態、動機、現在のサポート体制、
              そして場と人の相性を、
              事前のお話合いの中で丁寧に確認しています。
            </p>
            <p className="mt-8">
              状況によっては、率直にお断りすることがあります。
              それはあなたを守るためであり、
              この実践そのものを守るためでもあります。
            </p>
            <p className="mt-8">
              全申請を、私自身が個別に拝読しています。
              形式的な受付フォームではなく、
              ひとつの対話の入口としてお書きください。
            </p>
          </div>
        </div>
      </section>

      {/* Cautions */}
      <section className="py-24 px-6 border-t border-border bg-paper-deep/30">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              V. &nbsp; CAUTIONS
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              ご注意
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              以下の方には、セレモニーをお受けいただけない、
              もしくは事前の慎重なご相談が必要な場合があります。
            </p>
            <ul className="mt-8 space-y-3 list-disc pl-5 text-sm">
              <li>心臓疾患・QT延長などの循環器系疾患をお持ちの方</li>
              <li>SSRI・MAOI・抗不安薬・血圧降下薬などを服用中の方</li>
              <li>統合失調症・双極性障害などの精神疾患をお持ちの方</li>
              <li>妊娠中・授乳中の方</li>
              <li>てんかんの既往がある方</li>
              <li>重度の腎機能・肝機能障害をお持ちの方</li>
            </ul>
            <p className="mt-8 text-sm">
              本セレモニーは医療行為ではありません。
              既存の医療を代替するものではなく、
              現在治療中のご病気がある場合は、
              必ず主治医とご相談のうえご検討ください。
            </p>
          </div>
        </div>
      </section>

      {/* Not yet is also an answer */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              VI. &nbsp; NOT YET
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              「まだ早い」も、正解
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              ここまで読んで、「自分にはまだ早い」と感じたなら——
              それは、正しい判断かもしれません。
              私たちは、「今は申し込まない」という静かな結論も、
              申し込みと同じくらい大切な到達点だと考えています。
            </p>
            <p className="mt-8">
              迷っているあいだは、
              <Link href="/guide" className="border-b border-foreground hover:text-accent hover:border-accent transition-colors">
                連載記事
              </Link>
              を読んでいてください。費用も登録も要りません。
              何度でも来て、何も決めずに帰れる場所として、置いてあります。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-base text-muted leading-[2.1] mb-12">
            ご質問やご不安は、お話合いの場で何でもお聞きください。
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              Apply
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
