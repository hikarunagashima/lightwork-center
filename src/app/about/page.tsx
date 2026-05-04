import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "ガボン共和国ブウィティ伝統の系譜と、現代の量子意識のワークを統合する実践者について。2025年大阪・関西万博 登壇。",
};

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[860px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; ABOUT
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          A Note
          <br />
          from the
          <br />
          Practitioner.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-16 editorial-in-delay-2">
          ここでは、施術者についての紹介と、
          受け継ぐ系譜と実践のかたちを記す。
        </p>
      </section>

      {/* Profile */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              PROFILE
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              プロフィール
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <h2 className="serif-jp text-2xl sm:text-3xl font-medium mb-3">
              長島 光
            </h2>
            <p className="serif-jp text-sm text-muted mb-2">
              イボガ国際認定シャーマン
            </p>
            <p className="serif-en text-xs tracking-[0.3em] text-muted mb-10">
              HIKARU NAGASHIMA &nbsp;|&nbsp; Internationally Certified Iboga Shaman
            </p>
            <p>
              世界中のサイケデリックを探求するなかでシャーマニズムに出会う。
              現在は、世界中の薬草を取りまとめた
              覚醒プログラムを提供している。
            </p>
            <p className="mt-6">
              瞑想と意識の使い方、トラウマの払拭、
              そして天才性の磨き方を指導している。
            </p>
            <div className="mt-10 flex gap-8">
              <a
                href="https://www.instagram.com/hikaru_asobi/"
                target="_blank"
                rel="noopener noreferrer"
                className="serif-en text-xs tracking-[0.3em] text-muted hover:text-foreground transition-colors border-b border-mute-soft hover:border-foreground pb-1"
              >
                Instagram
              </a>
              <a
                href="https://note.com/hikaruuaa"
                target="_blank"
                rel="noopener noreferrer"
                className="serif-en text-xs tracking-[0.3em] text-muted hover:text-foreground transition-colors border-b border-mute-soft hover:border-foreground pb-1"
              >
                Note
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lineage */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              I. &nbsp; LINEAGE
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              系譜
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              アフリカ・ガボン共和国に伝わる<strong className="font-medium">ブウィティ（Bwiti）</strong>伝統の系譜を受け継ぐ
              国際認定イボガシャーマン。ブウィティはイボガを核とする、
              人類最古級の意識実践のひとつであり、ニャンガ（N&apos;ganga）と呼ばれる
              霊的指導者によって継承されてきた。
            </p>
            <p className="mt-8">
              現代の神経科学・量子意識のワークと、伝統の儀式を統合した実践として、
              依存症からの回復、トラウマの解放、実存的危機への伴走、
              そして自身の天命に戻る一連の手続きを提供している。
            </p>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              II. &nbsp; PRACTICE
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              実践
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <p>
              提供しているのは「治療」ではない。
              魂が、もう一度<strong className="font-medium">中心に戻る</strong>ための、
              一連の手続きである。
            </p>
            <p className="mt-8">
              イボガ、カンボ、サナンガ、ハペ、シリアンルー ──
              それぞれのメディスンが持つ周波数を、
              受け取る者の状態と意図に合わせて編む。
              セレモニーの前後の対話と統合を含めた一つの時間として設計している。
            </p>
            <p className="mt-8">
              科学と伝統は対立するものではなく、
              同じ現象を異なる言語で語っているにすぎない。
              ニューロンの可塑性も、魂の修復も、観測の角度が違うだけの一つの出来事である。
            </p>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-muted">
              III. &nbsp; RECOGNITION
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              登壇・認定
            </p>
          </div>
          <div className="serif-jp text-base leading-[2.1]">
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="serif-en text-xs tracking-[0.3em] text-accent">2025</span>
                <span className="mt-1">大阪・関西万博 登壇</span>
              </li>
              <li className="flex flex-col">
                <span className="serif-en text-xs tracking-[0.3em] text-accent">CERTIFIED</span>
                <span className="mt-1">国際認定 イボガ シャーマン（Bwiti系統）</span>
              </li>
              <li className="flex flex-col">
                <span className="serif-en text-xs tracking-[0.3em] text-accent">LINEAGE</span>
                <span className="mt-1">ガボン共和国ブウィティ伝統 — 直系の継承</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-base sm:text-lg text-muted leading-[2.1] mb-12">
            セレモニーへの参加は、
            一度のお話合いから始まります。
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">
            <Link
              href="/contact"
              className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              Get&nbsp;in&nbsp;Touch
            </Link>
            <Link
              href="/sessions"
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground transition-colors py-4 border-b border-mute-soft hover:border-foreground"
            >
              View&nbsp;Sessions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
