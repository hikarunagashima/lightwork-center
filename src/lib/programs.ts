// プログラムマスタ — 出典: knowledge/medicine-wheel.md（事実のみ・捏造禁止）
// ラベルは /medicine-wheel ページの表記と1系統に統一する（表記揺れ禁止）
// クライアントコンポーネントから import されるため fs 依存を置かない（lib/categories.ts と同じ分離）

export type ProgramId =
  | "ceremony"
  | "lifestyle"
  | "cleansing"
  | "retreat"
  | "microdosing"
  | "power-up"
  | "support"
  | "economy-pack"
  | "adam-kadmon-pack"
  | "vip-pack";

export type Program = {
  id: ProgramId;
  /** 日本語名称 */
  label: string;
  /** 英語表記（serif-en 見出し用） */
  en: string;
  /** プログラム単体 or パック */
  kind: "program" | "pack";
  /** メディスン／形態（medicine-wheel.md の事実表現のみ） */
  description: string;
};

export const PROGRAMS: Program[] = [
  {
    id: "ceremony",
    label: "セレモニー",
    en: "Ceremony",
    kind: "program",
    description: "サナンガ＋ハペ。短時間の純度の高い祈りの場。",
  },
  {
    id: "lifestyle",
    label: "生活習慣の見直し",
    en: "Lifestyle",
    kind: "program",
    description: "イボガチップ ディエタ30日。瞑想の習慣化、生活を見つめ直す。",
  },
  {
    id: "cleansing",
    label: "伝統的な浄化",
    en: "Cleansing",
    kind: "program",
    description: "カンボ。アマゾン先住民が伝統的に浄化に用いてきたセレモニー。",
  },
  {
    id: "retreat",
    label: "リトリート",
    en: "Retreat",
    kind: "program",
    description:
      "カンボ／イボガフラッドドーズ（一泊二日）。アダムカドモンに向けたイニシエーション。",
  },
  {
    id: "microdosing",
    label: "21日間プログラム",
    en: "Microdosing",
    kind: "program",
    description:
      "サナンガ／ハペ／ノーマルイボガ／シリアンルー 各21日の緩やかな実践。",
  },
  {
    id: "power-up",
    label: "パワーアップ",
    en: "Power Up",
    kind: "program",
    description: "イボガワイルドバッチ等。天才性を磨く短期集中。",
  },
  {
    id: "support",
    label: "継続サポート",
    en: "Support System",
    kind: "program",
    description:
      "毎月の説明会、毎週土曜の相談会、新月満月の評価ワーク、24hメールサポート。",
  },
  {
    id: "economy-pack",
    label: "エコノミーパック",
    en: "Economy",
    kind: "pack",
    description:
      "カンボリトリート＋シリアンルーフラッドドーズ＋21日プログラム3種。",
  },
  {
    id: "adam-kadmon-pack",
    label: "アダムカドモン覚醒 イニシエーションパック",
    en: "Adam Kadmon",
    kind: "pack",
    description:
      "ワイルドイボガフラッドドーズ＋アダムカドモン覚醒ワーク＋21日プログラム4種（四泊五日）。",
  },
  {
    id: "vip-pack",
    label: "VIPコース",
    en: "VIP",
    kind: "pack",
    description:
      "Adam Kadmon＋イボガTA／エリプティカ＋三泊四日リトリート3回。",
  },
];

export function getProgramById(id: string): Program | undefined {
  return PROGRAMS.find((program) => program.id === id);
}

export function getProgramLabel(id: ProgramId): string {
  return getProgramById(id)?.label || id;
}
