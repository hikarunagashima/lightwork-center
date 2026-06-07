# Content Pipeline

Lightwork Center の記事運用自動化。  
YouTube動画の「KW選定 → リサーチ → 設計 → 執筆 → 品質 → 公開 → 分析」を、低負荷な1工程CLIに分解する。

## 現在の実装

```text
content:select-topic
```

テーマ候補 `content/topic-backlog.json` をスコアリングし、次に書くテーマを1本選ぶ。  
選定結果は `content/topic-briefs/<topic-id>.md` に保存される。

## テーマ選定のスコア

`select-topic` は検索ボリュームだけでは選ばない。  
シャーマニズムのオウンドメディア・キュレーションメディアとして、以下を点数化する。

| 軸 | 意味 |
|---|---|
| medicineWheelRelevance | `/medicine-wheel` 導線に自然につながるか |
| primaryInfoStrength | 光さんの一次情報・既存連載を使えるか |
| searchIntentStrength | 読者の検索意図が明確か |
| funnelStage | BOFU/MOFU/TOFU。初期は質の問い合わせに近いものを優先 |
| audience | 確信層を少し優先。逡巡層は副次 |
| riskLevel | 薬機法・医療広告・麻薬法域リスク。高いほど減点 |
| sourceRefs | 参照元ファイルが存在しない候補は減点 |
| duplicate | 既に `content/articles/<slug>.md` がある候補は減点 |

## 使い方

```bash
npm run content:select-topic -- --dry-run
npm run content:select-topic
npm run content:select-topic -- --topic-id=medicine-wheel-what-is
npm run content:select-topic -- --stage=MOFU
npm run content:select-topic -- --audience=逡巡層
npm run content:select-topic -- --medicine=ハペ
npm run content:select-topic -- --medicine=サナンガ
npm run content:select-topic -- --medicine=カンボ
npm run content:select-topic -- --json --dry-run
npm run content:batch-briefs -- --medicine=all
npm run content:batch-briefs -- --medicine=ハペ
npm run content:batch-briefs -- --medicine=all --draft
```

## 出力

```text
content/topic-briefs/<topic-id>.md
```

このブリーフを次工程の `research-brief` / `draft-article` が読む。

## 固定ルール

- 申込導線は `/medicine-wheel`
- `iboga.jp` は申込先にしない
- 光さん本人を大阪万博登壇者として書かない
- `content.ts` はCodexが触らない
- 新記事は `content/articles/<slug>.md`
- 本文にH1を書かない。見出しはH2から
- 画像は当面使わない

## 次に作る工程

```text
make-brief.mjs        選定テーマから論点・構成メモを作る
draft-article.mjs     frontmatter付きMarkdown下書きを作る
check-article.mjs     新記事単体の薬機法チェック
open-pr.mjs           下書きPRを作る
```
