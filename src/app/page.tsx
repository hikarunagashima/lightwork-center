import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="min-h-[88vh] flex flex-col justify-center px-6 max-w-[1200px] mx-auto">
        <p className="serif-en text-xs sm:text-sm tracking-[0.4em] text-muted editorial-in">
          The Quantum Apothecary
        </p>
        <h1 className="serif-en text-6xl sm:text-8xl md:text-9xl font-light leading-[0.95] tracking-tight mt-8 editorial-in-delay-1">
          Medicine
          <br />
          Wheel
        </h1>
        <div className="serif-jp text-base sm:text-lg text-muted max-w-xl leading-[2] mt-14 editorial-in-delay-2">
          <p>
            ガボン共和国に伝わるブウィティの系譜と、
            独自に統合する量子意識のワーク。
          </p>
          <p className="mt-6">
            物質と意識、神経と魂、過去と未来 ──
            その境界を一度ほどき、
            自身の中心へと戻るための一連の手続き。
          </p>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 items-center editorial-in-delay-3">
          <Link
            href="/sessions"
            className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            View&nbsp;Sessions
          </Link>
          <Link
            href="/about"
            className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground transition-colors py-4 border-b border-mute-soft hover:border-foreground"
          >
            About&nbsp;the&nbsp;Practitioner
          </Link>
        </div>
      </section>

      {/* LINEAGE */}
      <section className="py-32 sm:py-40 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto text-center">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10">
            ⊙ &nbsp; LINEAGE
          </p>
          <h2 className="serif-jp text-2xl sm:text-3xl md:text-4xl font-light leading-[1.7]">
            一万年の伝統と、
            <br />
            現代の科学が交差する場所。
          </h2>
          <div className="serif-jp text-sm sm:text-base text-muted leading-[2.1] mt-14 max-w-xl mx-auto">
            <p>
              国際認定 イボガ シャーマン。
              ガボン共和国ブウィティ伝統の正統な系譜を受け継ぎ、
              現代の神経科学・量子意識のワークと統合する実践。
            </p>
            <p className="mt-6 serif-en text-xs tracking-[0.3em]">
              2025 OSAKA-KANSAI EXPO &nbsp;|&nbsp; SPEAKER
            </p>
          </div>
        </div>
      </section>

      {/* MEDICINES */}
      <section className="py-32 sm:py-40 px-6 border-t border-border">
        <div className="max-w-[1200px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-6">
            ⊙ &nbsp; MEDICINES
          </p>
          <h2 className="serif-en text-3xl sm:text-5xl font-light mb-2">
            The Plant Medicines.
          </h2>
          <p className="serif-jp text-xs tracking-[0.3em] text-muted mb-16">
            プラント メディスン
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                num: "I.",
                en: "Iboga",
                jp: "イボガ",
                desc: "ガボン共和国に自生する根の医学。BDNFの発現を促し、神経の修復と依存症治療への応用が現代の研究で進む。Bwiti伝統の中心メディスン。",
              },
              {
                num: "II.",
                en: "Kambô",
                jp: "カンボ",
                desc: "アマゾンに棲むフィロメデューサ・バイカラーというカエルの皮膚分泌物。地球最強の解毒剤と呼ばれ、感情体・肝機能の浄化に用いられる。",
              },
              {
                num: "III.",
                en: "Sananga & Hapé",
                jp: "サナンガ・ハペ",
                desc: "アマゾン先住民の眼薬と鼻薬。松果体の浄化、視力回復、メンタルブロックの除去に伝統的に用いられてきた。",
              },
            ].map((m) => (
              <article
                key={m.en}
                className="bg-background p-10 sm:p-14 flex flex-col"
              >
                <p className="serif-en text-sm tracking-[0.35em] text-accent mb-6">
                  {m.num}
                </p>
                <h3 className="serif-en text-3xl sm:text-4xl font-light mb-2">
                  {m.en}
                </h3>
                <p className="serif-jp text-xs tracking-[0.25em] text-muted mb-8">
                  {m.jp}
                </p>
                <p className="serif-jp text-sm text-muted leading-[2]">
                  {m.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/medicines"
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground transition-colors border-b border-mute-soft hover:border-foreground pb-1"
            >
              All&nbsp;Medicines &amp; Research →
            </Link>
          </div>
        </div>
      </section>

      {/* INQUIRE */}
      <section className="py-32 sm:py-40 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10">
            ⊙ &nbsp; INQUIRE
          </p>
          <h2 className="serif-jp text-2xl sm:text-3xl font-light leading-[1.8] mb-10">
            セレモニーへの参加は、
            <br />
            事前のお話合いから始まります。
          </h2>
          <p className="serif-jp text-sm text-muted max-w-lg mx-auto leading-[2] mb-14">
            お一人おひとりの状況に合わせた準備が必要なため、
            一度ご状況を伺ったうえでご案内しています。
            まずはお問い合わせください。
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
