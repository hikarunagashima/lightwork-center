export const SITE_NAME = "LIGHTWORK CENTER";
export const SITE_TITLE = "LIGHTWORK CENTER — Neo Shamanism Journal";
export const SITE_DESCRIPTION =
  "シャーマニズム、植物メディスン、量子意識、AIを横断するキュレーション・オウンドメディア。国際認定イボガシャーマンの一次体験と専門編集で、静かに深く読むための場。";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lightworkcenter.com";

export const TELEGRAM_URL = "https://t.me/shamanhikaru";
export const NOTE_URL = "https://note.com/hikaruuaa";
export const INSTAGRAM_URL = "https://www.instagram.com/hikaru_asobi/";

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
