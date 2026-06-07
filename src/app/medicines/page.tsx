import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medicines",
  description:
    "イボガ・カンボ・サナンガ・ハペ・シリアンルー — 各メディスンの起源、伝統的文脈、研究へのリンク。",
};

const MEDICINES = [
  {
    num: "I.",
    en: "Iboga",
    sci: "Tabernanthe iboga",
    jp: "イボガ",
    region: "Gabon, Central Africa",
    summary:
      "ガボン共和国に自生するアポシナケア科の根。ブウィティ伝統の中心メディスン。アルカロイドのイボガインと神経可塑性に関する研究が現代でも進んでいます。",
  },
  {
    num: "II.",
    en: "Kambô",
    sci: "Phyllomedusa bicolor",
    jp: "カンボ",
    region: "Amazon Basin",
    summary:
      "アマゾンに生息するフィロメデューサ・バイカラー（ツリーフロッグ）の皮膚分泌物。dermorphin、deltorphinなどのbioactive peptidesを含み、先住民の文脈で伝統的に用いられてきました。",
  },
  {
    num: "III.",
    en: "Sananga",
    sci: "Tabernaemontana undulata",
    jp: "サナンガ",
    region: "Amazon",
    summary:
      "アマゾン先住民の眼薬。アポシナケア科の植物に由来し、祈りや集中の文脈で伝統的に用いられてきました。",
  },
  {
    num: "IV.",
    en: "Hapé",
    sci: "Sacred Tobacco Snuff",
    jp: "ハペ",
    region: "Amazon",
    summary:
      "アマゾン先住民の鼻薬。神聖タバコ（Nicotiana rusticaなど）と多種の薬草・木の灰のブレンドです。瞑想・祈りの場を整える文脈で用いられます。",
  },
  {
    num: "V.",
    en: "Syrian Rue",
    sci: "Peganum harmala",
    jp: "シリアンルー",
    region: "Middle East / Mediterranean",
    summary:
      "ハルマラアルカロイド（MAOI）を含む古代の薬用植物。瞑想や内省の文脈で語られてきた歴史があり、扱いには十分な安全確認が必要です。",
  },
];

const RESEARCH = [
  // — Iboga
  {
    medicine: "Iboga",
    title:
      "Ibogaine Administration Modifies GDNF and BDNF Expression in Brain Regions",
    author: "Martínez-Orozco et al.",
    journal: "Frontiers in Pharmacology",
    institution: "Universidad Nacional Autónoma de México",
    year: 2019,
    url: "https://pubmed.ncbi.nlm.nih.gov/30890941/",
  },
  {
    medicine: "Iboga",
    title:
      "A Systematic Literature Review of Clinical Trials and Therapeutic Applications of Ibogaine",
    author: "Schenberg EE et al.",
    journal: "Journal of Substance Abuse Treatment",
    institution: "ICEERS / Hospital das Clínicas, São Paulo",
    year: 2021,
    url: "https://pubmed.ncbi.nlm.nih.gov/35012793/",
  },
  {
    medicine: "Iboga",
    title:
      "Ibogaine Treatment Outcomes for Opioid Dependence — Twelve-month Follow-up",
    author: "Brown TK et al.",
    journal: "Am J Drug Alcohol Abuse",
    institution: "Pomona Valley Hospital Medical Center",
    year: 2017,
    url: "https://pubmed.ncbi.nlm.nih.gov/28402682/",
  },
  {
    medicine: "Iboga",
    title:
      "Significant Lesion Reduction and Neural Structural Changes Following Ibogaine Treatments for Multiple Sclerosis",
    author: "Case report",
    journal: "Frontiers in Immunology",
    institution: "PMC (NIH National Library of Medicine)",
    year: 2025,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11839422/",
  },

  // — Kambô
  {
    medicine: "Kambô",
    title:
      "Acute and Subacute Psychoactive Effects of Kambô — the Secretion of the Amazonian Giant Maki Frog",
    author: "ICEERS / Bouso JC et al.",
    journal: "Scientific Reports (Nature)",
    institution: "Universitat Autònoma de Barcelona",
    year: 2020,
    url: "https://www.nature.com/articles/s41598-020-78527-4",
  },
  {
    medicine: "Kambô",
    title:
      "The Amazonian Kambô Frog Phyllomedusa bicolor — Biology, Toxinology, Ethnopharmacology",
    author: "Multi-institution review",
    journal: "Toxicon",
    institution: "PubMed Indexed",
    year: 2022,
    url: "https://pubmed.ncbi.nlm.nih.gov/36278168/",
  },

  // — Sananga (Tabernaemontana)
  {
    medicine: "Sananga",
    title:
      "Potent Anti-amoebic Effects of Ibogaine, Voacangine and the Root Bark Alkaloid Fraction of Tabernaemontana arborea",
    author: "Carrero JC, Krengel F et al.",
    journal: "Planta Medica",
    institution: "Universidad Nacional Autónoma de México (UNAM)",
    year: 2023,
    url: "https://pubmed.ncbi.nlm.nih.gov/35338475/",
  },
  {
    medicine: "Sananga",
    title:
      "Coronaridine, an Iboga-type Alkaloid from Tabernaemontana divaricata, Inhibits the Wnt Signaling Pathway",
    author: "Ohishi K, Toume K, Ishibashi M et al.",
    journal: "Bioorganic & Medicinal Chemistry Letters",
    institution: "Chiba University, Japan",
    year: 2015,
    url: "https://pubmed.ncbi.nlm.nih.gov/26231157/",
  },

  // — Syrian Rue (Peganum harmala)
  {
    medicine: "Syrian Rue",
    title:
      "Peganum harmala Seed Extract Attenuates Anxiety and Depression by Restoring the BDNF/TrkB Signaling Pathway",
    author: "Tekşen Y, Koldemir Gündüz M et al.",
    journal: "Metabolic Brain Disease",
    institution: "Kütahya Health Sciences University",
    year: 2024,
    url: "https://pubmed.ncbi.nlm.nih.gov/39172328/",
  },
  {
    medicine: "Syrian Rue",
    title:
      "Harmine Stimulates Proliferation of Human Neural Progenitors",
    author: "Dakic V, Rehen SK et al.",
    journal: "PeerJ",
    institution: "Federal University of Rio de Janeiro / D'Or Institute",
    year: 2016,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5144684/",
  },
  {
    medicine: "Syrian Rue",
    title:
      "Pharmacological and Therapeutic Effects of Peganum harmala and Its Main Alkaloids",
    author: "Moloudizargari M et al.",
    journal: "Pharmacognosy Reviews",
    institution: "Urmia University of Medical Sciences",
    year: 2013,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3841998/",
  },
];

export default function MedicinesPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[1100px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; MEDICINES
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          The&nbsp;Plant
          <br />
          Medicines.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 max-w-2xl editorial-in-delay-2">
          それぞれのメディスンには、固有の周波数と文化的文脈があります。
          ブウィティ、アマゾン、地中海 ──
          地球の異なる場所で人類が育ててきた知恵を、
          現代の意識の課題に向かって編み直しています。
        </p>
      </section>

      {/* Safety — 必ず最初に読まれるべき注意 */}
      <section className="py-20 px-6 border-t border-border bg-paper-deep/30">
        <div className="max-w-[860px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-accent mb-6">
            ⊙ &nbsp; SAFETY
          </p>
          <h2 className="serif-en text-2xl sm:text-3xl font-light mb-2">
            Before You Read.
          </h2>
          <p className="serif-jp text-xs tracking-[0.3em] text-muted mb-12">
            読み進めるまえに
          </p>

          <div className="serif-jp text-base text-foreground leading-[2.1] space-y-8">
            <p>
              これらのメディスンは、長い伝統と現代の科学的検証に支えられた一方で、
              固有の<strong className="font-medium">リスク</strong>を伴います。
            </p>
            <p>
              とりわけ<strong className="font-medium">イボガ</strong>は、
              心臓のQT間隔への影響により、
              ごく稀ながら重篤な不整脈や突然死の症例が国内外で報告されています。
              また、SSRI・MAOI・抗不整脈薬・抗精神病薬・血圧降下薬など、
              一部の薬剤との併用で強い相互作用を生じることがあります。
            </p>
            <p>
              本ページに記載されているメディスンは、
              <strong className="font-medium">
                必ず、資格を持つシャーマン、もしくは安全な体制が整えられた場のもとでのみ
              </strong>
              受け取られるべきものです。
            </p>
            <p className="serif-jp text-base text-foreground">
              <strong className="font-medium">
                ご自身で個人的に入手・調合・使用なさることは、
                いかなる場合も絶対におやめください。
              </strong>
              事前のスクリーニング（健康状態・服薬歴・既往症の確認）は、
              本セレモニーの安全性を担保する、最も重要な工程です。
            </p>
            <p className="text-sm text-muted pt-4 border-t border-border-soft">
              詳しい禁忌・注意事項については、
              <Link
                href="/first-visit"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                First&nbsp;Visit
              </Link>
              のページをご一読ください。
            </p>
          </div>
        </div>
      </section>

      {/* Medicine cards */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-[1100px] mx-auto space-y-20">
          {MEDICINES.map((m) => (
            <article
              key={m.en}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12 pb-16 border-b border-border-soft last:border-b-0"
            >
              <div>
                <p className="serif-en text-sm tracking-[0.35em] text-accent">
                  {m.num}
                </p>
              </div>
              <div>
                <h2 className="serif-en text-3xl sm:text-4xl font-light">
                  {m.en}
                </h2>
                <p className="serif-en text-xs italic text-muted mt-2 tracking-wide">
                  {m.sci}
                </p>
                <div className="flex gap-6 mt-4 mb-8">
                  <p className="serif-jp text-xs tracking-[0.25em] text-muted">
                    {m.jp}
                  </p>
                  <p className="serif-en text-xs tracking-[0.25em] text-muted">
                    {m.region}
                  </p>
                </div>
                <p className="serif-jp text-base text-muted leading-[2]">
                  {m.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Research */}
      <section className="py-32 px-6 border-t border-border bg-paper-deep/30">
        <div className="max-w-[1100px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-6">
            ⊙ &nbsp; RESEARCH
          </p>
          <h2 className="serif-en text-3xl sm:text-5xl font-light mb-4">
            Where Tradition Meets Science.
          </h2>
          <p className="serif-jp text-sm text-muted mb-16 max-w-2xl leading-[2]">
            伝統の中で受け継がれてきた知恵が、
            神経科学・薬理学の言語でも検証されつつあります。
            主要な査読論文を以下にご紹介します。
          </p>

          <ul className="divide-y divide-border-soft">
            {RESEARCH.map((r) => (
              <li key={r.url} className="py-6">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <p className="serif-en text-xs tracking-[0.3em] text-accent mb-2">
                    {r.medicine} &nbsp;·&nbsp; {r.year} &nbsp;·&nbsp; {r.journal}
                  </p>
                  <p className="serif-en text-lg sm:text-xl text-foreground font-light group-hover:underline underline-offset-4 leading-snug">
                    {r.title}
                  </p>
                  <p className="serif-en text-xs italic text-muted mt-2">
                    {r.author}
                  </p>
                  <p className="serif-en text-[11px] tracking-[0.15em] text-mute-soft mt-1">
                    {r.institution}
                  </p>
                </a>
              </li>
            ))}
          </ul>

          <p className="serif-jp text-xs text-muted mt-16 leading-relaxed">
            ※ 上記論文は外部の研究機関による独立した学術報告であり、
            本サイトの提供するセレモニーの効果を保証するものではありません。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <Link
            href="/contact"
            className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Apply
          </Link>
        </div>
      </section>
    </div>
  );
}
