// コンテンツ種別マスタ — CMS的な情報設計の軸。
// すべてのコンテンツは「記事」であり、その中に講座・ガイド・体験談という種別がある。
// カテゴリ（テーマの棚・categories.ts）とは直交する分類軸。
// クライアントコンポーネントから import されるため fs 依存を置かない。

export type ContentType = "lecture" | "guide" | "voice";

export type ContentTypeDef = {
  id: ContentType;
  label: string;
  en: string;
  description: string;
};

export const CONTENT_TYPES: ContentTypeDef[] = [
  {
    id: "lecture",
    label: "講座",
    en: "Lecture",
    description: "ネオシャーマニズム講座。連載で読む本論。",
  },
  {
    id: "guide",
    label: "ガイド",
    en: "Guide",
    description: "メディスンや実践を一つずつ丁寧に解説する読み物。",
  },
  {
    id: "voice",
    label: "体験談",
    en: "Voice",
    description: "プログラムを受けた方々の声。ご本人の記述を匿名で掲載。",
  },
];

export function getContentTypeById(id: string): ContentTypeDef | undefined {
  return CONTENT_TYPES.find((type) => type.id === id);
}

export function getContentTypeLabel(id: ContentType): string {
  return getContentTypeById(id)?.label || id;
}

/**
 * 種別一覧の正規URL。体験談の一覧は /voices に一本化する
 * （/articles/type/voice と /voices の二重インデックスを作らない）
 */
export function contentTypeIndexHref(id: ContentType): string {
  return id === "voice" ? "/voices" : `/articles/type/${id}`;
}
