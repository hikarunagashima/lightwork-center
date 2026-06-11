import Link from "next/link";
import { getAllArticles } from "@/lib/content";

/**
 * The Journey — メディスンホイールのタイムライン
 *
 * 事実の根拠は knowledge/medicine-wheel.md のみ（捏造禁止）。
 * 順序の正: サナンガ・ハペ・シリアンルーは重なって実践してよい（丁寧にやるならサナンガから）。
 * カンボ（浄化の節目）→ イボガ（最深部）の後段は固定。光さん確定 2026-06-11。
 * 文言は knowledge/compliance.md 遵守（効果断定NG・伝承マーカー必須）。
 */

const GRID_COLS = 24;

type Step = {
  index: string;
  en: string;
  jp: string;
  sci: string;
  catch: string;
  body: string;
  role: string;
  phaseLabel: string;
  /** 解説記事の規約slug（{medicine}-what-is）。published になると自動でリンク化 */
  articleSlug: string;
  /** 帯チャートの位置（1〜24グリッド） */
  barStart: number;
  barEnd: number; // exclusive
  barTone: "soft" | "mid" | "deep";
};

/** grid-row を明示し、auto-placement に依存しない（行=巡る順番） */
function cell(colStart: number, colEnd: number, row: number) {
  return { gridColumn: `${colStart} / ${colEnd}`, gridRow: row };
}

const STEPS: Step[] = [
  {
    index: "01",
    en: "Sananga",
    jp: "サナンガ",
    sci: "Tabernaemontana undulata",
    catch: "言えたら、癒えた。",
    body: "アマゾン先住民の点眼のメディスン。数分の強い灼熱感とともに、長く言えなかった感情が声になる——悲しみが浄化されていくと、シャーマニズムの伝承で語られてきました。丁寧に進めるなら、ホイールはここから始まります。",
    role: "感情の入口",
    phaseLabel: "日々の実践",
    articleSlug: "sananga-what-is",
    barStart: 1,
    barEnd: 14,
    barTone: "soft",
  },
  {
    index: "02",
    en: "Hapé",
    jp: "ハペ",
    sci: "Sacred Tobacco Snuff",
    catch: "思考のざわめきを、外す。",
    body: "神聖タバコと薬草の灰をブレンドした嗅ぎ薬。思考のざわめきから離れ、瞑想状態へ入る扉と伝統の中で語られてきました。物質だけでは半分——祈りと儀式が乗って、はじめて全体になります。",
    role: "瞑想の扉",
    phaseLabel: "日々の実践",
    articleSlug: "hape-what-is",
    barStart: 3,
    barEnd: 14,
    barTone: "soft",
  },
  {
    index: "03",
    en: "Syrian Rue",
    jp: "シリアンルー",
    sci: "Peganum harmala",
    catch: "固有のリズムに、還る。",
    body: "「テレパシン」と名づけられた成分（ハルミン）を含む、古代から伝わる薬用植物。深く潜る前に、心臓が自分の固有のリズムへ還っていく時間——イボガへの地ならしとして、伝承は位置づけてきました。",
    role: "深部への地ならし",
    phaseLabel: "日々の実践 → 地ならし",
    articleSlug: "syrian-rue-what-is",
    barStart: 5,
    barEnd: 19,
    barTone: "mid",
  },
  {
    index: "04",
    en: "Kambô",
    jp: "カンボ",
    sci: "Phyllomedusa bicolor",
    catch: "溜まったものを、吐き出す。",
    body: "アマゾン先住民の伝統で「地球最強の解毒剤」と称されてきた、大型アオガエルの分泌物のメディスン。先住民が「パネマ」と呼ぶ淀みを払う浄化の節目です。実施可否は事前の安全確認を前提にします。",
    role: "浄化の節目",
    phaseLabel: "浄化",
    articleSlug: "kambo-what-is",
    barStart: 14,
    barEnd: 19,
    barTone: "mid",
  },
  {
    index: "05",
    en: "Iboga",
    jp: "イボガ",
    sci: "Tabernanthe iboga",
    catch: "指揮者と、対面する。",
    body: "中央アフリカ・ブウィティ伝統の中心。メディスンホイールの予言では、全地球のメディスンに司令を出す「指揮者」と語り継がれてきました。心電図検査を含む事前の安全確認を必須とする、最深部の旅です。",
    role: "最深部の旅",
    phaseLabel: "最深部",
    articleSlug: "iboga-what-is",
    barStart: 19,
    barEnd: 25,
    barTone: "deep",
  },
];

const AFTER_IBOGA = [
  "内省",
  "フルリペア",
  "テレパシー獲得",
  "神として生きる",
  "天命・天職・天才性の発現",
];

const PHASES = [
  {
    num: "PHASE 01",
    jp: "日々の実践",
    note: "重ねてもいい",
    start: 1,
    end: 14,
  },
  { num: "PHASE 02", jp: "浄化の節目", note: "", start: 14, end: 19 },
  { num: "PHASE 03", jp: "最深部", note: "", start: 19, end: 24 },
];

const TONE_CLASS: Record<Step["barTone"], string> = {
  soft: "bg-accent/35",
  mid: "bg-accent/60",
  deep: "bg-accent",
};

export default function JourneyTimeline() {
  // 解説記事が published になった車輪から順に、自動で実リンクが立つ
  const publishedSlugs = new Set(getAllArticles().map((article) => article.slug));

  return (
    <section className="px-6 py-20 border-t border-border" aria-labelledby="journey-heading">
      <div className="max-w-[1180px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted">
          ⊙ &nbsp; THE JOURNEY
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-20 mt-8">
          <h2 id="journey-heading" className="serif-jp text-3xl sm:text-4xl font-light leading-[1.5]">
            五つの車輪を巡り、
            <br />
            神人合一へ向かう。
          </h2>
          <p className="serif-jp text-sm sm:text-base leading-[2.1] text-muted">
            メディスンホイールは、効果を約束する処方箋ではなく、
            アダムカドモン（神人合一）という着地点へ向かうための地図です。
            前半の三つ——サナンガ、ハペ、シリアンルー——は日々の実践として重ねてもよく、
            丁寧に進めるならサナンガから。
            カンボで淀みを払い、心身の準備が整ってから、最深部のイボガへ入ります。
          </p>
        </div>

        {/* ——— 帯チャート: 重なりながら進む五つの実践（視覚表現。本文は下の <ol>） ——— */}
        <p aria-hidden className="serif-jp text-[11px] tracking-[0.25em] text-mute-soft mt-14 sm:hidden">
          横にスクロールして、旅の全体を見る →
        </p>
        <div aria-hidden className="mt-4 sm:mt-16 overflow-x-auto pb-2">
          <div className="min-w-[680px]">
            {/* フェーズ帯 */}
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
            >
              {PHASES.map((phase) => (
                <div
                  key={phase.num}
                  style={cell(phase.start, phase.end, 1)}
                  className="border-l border-border-soft pl-3 pb-4"
                >
                  <p className="serif-en text-[10px] tracking-[0.3em] text-accent">
                    {phase.num}
                  </p>
                  <p className="serif-jp text-xs tracking-[0.2em] text-muted mt-1">
                    {phase.jp}
                    {phase.note && (
                      <span className="text-mute-soft">　— {phase.note}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* メディスン帯（行=巡る順番） */}
            <div
              className="grid gap-y-2 mt-2"
              style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
            >
              {STEPS.map((step, i) => (
                <div key={step.en} style={cell(step.barStart, step.barEnd, i + 1)}>
                  <div
                    className={`${TONE_CLASS[step.barTone]} h-9 flex items-center px-3`}
                  >
                    <span className="serif-en text-[11px] tracking-[0.25em] text-foreground whitespace-nowrap">
                      {step.index}&nbsp;&nbsp;{step.en.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}

              {/* その先へ */}
              <div
                style={cell(12, GRID_COLS + 1, STEPS.length + 1)}
                className="pt-3 text-right"
              >
                <p className="serif-jp text-[11px] tracking-[0.15em] text-muted leading-[1.9] whitespace-nowrap">
                  → 内省 → フルリペア → <span className="text-accent">アダムカドモン</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="serif-jp text-xs text-mute-soft mt-4 leading-relaxed">
          ※ 帯の重なりは「並行して実践してよい」ことを表しています。歩む速さと組み合わせは、事前の対話で一人ひとり設計します。
        </p>

        {/* ——— 縦タイムライン: 各車輪の説明 ——— */}
        <div className="mt-20 relative">
          {/* スパイン */}
          <div
            aria-hidden
            className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-border"
          />
          <ol className="space-y-14">
            {STEPS.map((step) => (
              <li key={step.en} className="relative pl-10 sm:pl-16">
                {/* ノード */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full border border-accent bg-background flex items-center justify-center"
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-accent" />
                </span>

                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-12">
                  <div>
                    <p className="serif-en text-xs tracking-[0.35em] text-accent">
                      {step.index} &nbsp;·&nbsp; {step.phaseLabel}
                    </p>
                    <h3 className="serif-en text-3xl sm:text-4xl font-light mt-3">
                      {step.en}
                    </h3>
                    <p className="serif-jp text-xs tracking-[0.25em] text-muted mt-2">
                      {step.jp}
                    </p>
                    <p className="serif-en text-xs italic text-mute-soft mt-1">
                      {step.sci}
                    </p>
                  </div>
                  <div>
                    <p className="serif-jp text-lg sm:text-xl font-light leading-[1.9]">
                      {step.catch}
                    </p>
                    <p className="serif-jp text-sm leading-[2.1] text-muted mt-4">
                      {step.body}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
                      <span className="serif-jp text-[11px] tracking-[0.2em] text-accent border border-border px-3 py-1">
                        {step.role}
                      </span>
                      {publishedSlugs.has(step.articleSlug) ? (
                        <Link
                          href={`/articles/${step.articleSlug}`}
                          className="serif-jp text-[11px] tracking-[0.2em] text-foreground border-b border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors"
                        >
                          解説記事を読む →
                        </Link>
                      ) : (
                        <span className="serif-jp text-[11px] tracking-[0.15em] text-mute-soft">
                          解説記事 — 準備中
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {/* 着地点 */}
            <li className="relative pl-10 sm:pl-16">
              <span
                aria-hidden
                className="absolute left-0 top-1 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full bg-accent"
              />
              <div className="border border-border bg-paper-deep p-8 sm:p-10">
                <p className="serif-en text-xs tracking-[0.35em] text-accent">
                  DESTINATION
                </p>
                <p className="serif-jp text-2xl sm:text-3xl font-light leading-[1.6] mt-4">
                  アダムカドモン——神人合一。
                </p>
                <p className="serif-jp text-sm leading-[2.1] text-muted mt-5">
                  イボガの先に、車輪はまだ続きます。
                  {AFTER_IBOGA.join("、")}——
                  メディスンホイールの伝承が指し示す道のりを、
                  一人ひとりの意図と状態に合わせて歩いていきます。
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3">
          <Link
            href="/medicines"
            className="serif-en text-xs tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground pb-1 transition-colors"
          >
            Medicines — 基礎情報と研究
          </Link>
          <Link
            href="/first-visit"
            className="serif-en text-xs tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground pb-1 transition-colors"
          >
            Safety — 安全について
          </Link>
        </div>
      </div>
    </section>
  );
}
