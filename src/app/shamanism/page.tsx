import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shamanism",
  description:
    "シャーマニズムとは何か。人類最古の意識の実践、ガボン共和国ブウィティ伝統、量子意識との接続。",
};

export default function ShamanismPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[860px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; SHAMANISM
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          The Oldest
          <br />
          Science.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 editorial-in-delay-2">
          シャーマニズムは、人類が一万年以上にわたって受け継いできた、
          意識を扱う最古の体系である。
        </p>
      </section>

      {/* I. Origin */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              I. &nbsp; ORIGIN
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              起源
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              シャーマニズムは、特定の宗教ではない。
              シベリアからアマゾン、アフリカ、北極圏、日本列島まで、
              地球上の独立した文化の中で並行的に発生し、
              共通する技法を持っていた人類最古の意識実践である。
            </p>
            <p className="mt-8">
              シャーマンとは、変性意識状態を意図的に扱い、
              個人と共同体の癒し・予言・調停を担う者の総称である。
              太鼓、植物、断食、儀式 ──
              手段は文化ごとに違うが、目指すものはひとつ。
              <strong className="font-medium">
                目に見える世界と、目に見えない世界の境界に立つこと。
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* II. Bwiti */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              II. &nbsp; BWITI
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              ブウィティ
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              ガボン共和国を中心に伝わる
              <strong className="font-medium">ブウィティ（Bwiti）</strong>
              は、イボガを核とする精神伝統である。
              ピグミー族から受け継がれたとされる起源を持ち、
              現代では複数の系統（Missoko、Disumba、Fang）に分岐している。
            </p>
            <p className="mt-8">
              中心となるイニシエーション儀式では、
              受ける者は「死と再生」を疑似的に体験する。
              数十時間にわたるイボガの効果のなかで、
              先祖との対話、自己の影との直面、
              そして自身の天命の確認が行われる。
            </p>
            <p className="mt-8">
              ブウィティは「治療」ではなく
              <strong className="font-medium">「人になる」</strong>
              ための儀式と位置づけられている。
              本来あるべき自己への帰還 ── それがイボガの本義である。
            </p>
          </div>
        </div>
      </section>

      {/* III. Quantum */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              III. &nbsp; QUANTUM
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              量子意識との接続
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              現代の神経科学は、
              シャーマンが何千年も前から知っていたことを、
              ようやく自分たちの言語で語り始めている。
              意識とは脳の出力ではなく、
              脳が観測する「場」そのものであるという仮説。
              物質と意識は地続きであり、
              観測の角度が違うだけの一つの出来事であるという理解。
            </p>
            <p className="mt-8">
              本実践では、ブウィティ伝統の儀式と、
              量子意識・神経可塑性のフレームワークを統合し、
              受け取る者の状態と意図に合わせて、
              メディスンと祈りを編んでいる。
            </p>
            <p className="mt-8">
              科学と伝統は対立するものではなく、
              同じ現象を異なる言語で語っているにすぎない。
              ニューロンの可塑性も、魂の修復も、観測の角度が違うだけの一つの出来事である。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-base text-muted leading-[2.1] mb-12">
            体験することは、読むことよりも雄弁である。
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">
            <Link
              href="/contact"
              className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              Apply
            </Link>
            <Link
              href="/medicines"
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground transition-colors py-4 border-b border-mute-soft hover:border-foreground"
            >
              The&nbsp;Medicines&nbsp;→
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
