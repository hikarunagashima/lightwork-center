<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 天照ライトワークセンター — キュレーション・オウンドメディア

## 目的
シャーマニズム・植物メディスン・意識研究を、本物（国際認定イボガシャーマンである光さん）の一次体験と専門編集でキュレーションするメディア。読者を `/medicine-wheel` への質の高い問い合わせに繋ぐ。**量産しない。チャーチ型サービスサイトに戻さない。**

## 技術
- 既存スタック（Next.js 16 / React 19 / Tailwind 4）を**流用**。`create-next-app` で作り直さない
- コード前に `node_modules/next/dist/docs/01-app/` を読む（学習データと差分あり）
- `globals.css` の ⊙ エディトリアル美意識を継承
- デプロイ: push → Vercel 自動デプロイ。秘密は Secrets のみ（直書き禁止）

## 絶対制約（YMYL・薬機法）
- `knowledge/compliance.md` を必ず読み、NG表現（治る/効く/治療/診断/依存症の克服/最強の解毒剤/肝機能増強 等）を**絶対に書かない**
- イボガ／イボガインは日本の麻薬別表第1に非掲載＝麻薬指定なし（2026-06 一次情報確認）。「麻薬指定」「海外法域でのみ」と書かない。医療効果の断定（治る/効く/治療/改善 等）は薬機法上 禁止。施術場所・可否は断定せず事前の安全確認を前提に
- 全記事に一次情報 or 一次資料の出典＋著者情報。トーン＝`knowledge/voice.md`、法令＝`knowledge/compliance.md`
- `/medicine-wheel` の内容・送客文言は `knowledge/medicine-wheel.md` の事実のみを根拠にする。プログラム内容・価格を**捏造しない**

## コンテンツ源
- 記事の一次情報＝`content/_source/neoshamanism/`（ネオシャーマニズム連載 vol01-07）。note の創作系は載せない
- 全体計画＝`docs/plan.md`（必読）

## 作業境界
- このリポジトリ内のみ書き換える
- 本番公開は「**下書きPR**」で出す。`main` へ直接 push しない（branch protection あり）
- 着手前に `git tag pre-rebuild` を打つ
