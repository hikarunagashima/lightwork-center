/**
 * JSON-LD を <script> タグへ安全に埋め込むための文字列化。
 * JSON.stringify は < > & をエスケープしないため、コンテンツ由来の文字列に
 * "</script>" が含まれるとタグが閉じられてしまう。Unicode エスケープで無害化する。
 */
export function jsonLdString(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
