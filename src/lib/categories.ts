/**
 * カテゴリ定義（fs非依存）。
 * クライアントコンポーネントからも安全にimportできるよう content.ts から分離。
 */

export type CategoryId =
  | "neo-shamanism"
  | "quantum-consciousness"
  | "resonance"
  | "practice"
  | "kotodama"
  | "self-transcendence";

export type Category = {
  id: CategoryId;
  label: string;
  en: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "neo-shamanism",
    label: "ネオシャーマニズム",
    en: "Neo Shamanism",
    description: "古代シャーマニズム、量子意識、AIを同じ地平で読み直す総論。",
  },
  {
    id: "quantum-consciousness",
    label: "量子意識",
    en: "Quantum Consciousness",
    description: "空、間、直感、神人合一を、意識の構造として扱う記事群。",
  },
  {
    id: "resonance",
    label: "共鳴と関係性",
    en: "Resonance",
    description: "推し活、人間関係、相性、モーフィックフィールドを読む。",
  },
  {
    id: "practice",
    label: "実践と瞑想",
    en: "Practice",
    description: "眠り、瞑想、セレモニー、日常への統合を扱う実装領域。",
  },
  {
    id: "kotodama",
    label: "言霊と声",
    en: "Kotodama",
    description: "声、タマ体系、霊主体従をめぐる光さんの核領域。",
  },
  {
    id: "self-transcendence",
    label: "自己超越",
    en: "Self Transcendence",
    description: "強さ、祈り、守る力、アダムカドモンへ向かう軸。",
  },
];

export function getCategoryById(id: string) {
  return CATEGORIES.find((category) => category.id === id);
}

export function getCategoryLabel(id: CategoryId) {
  return getCategoryById(id)?.label || id;
}
