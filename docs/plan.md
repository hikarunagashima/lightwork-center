# 天照ライトワークセンター — キュレーション・オウンドメディア × Codex構築運用 計画 **v4（決定版）**

**作成**: 2026-06-02 / ライト（blueprint）
**改訂**: v4 — reviewer 2回（Opus）の全CRITICAL/HIGHを反映。方針＝**既存リポジトリを土台にIA刷新**（光さん「ライトがしたいように」の委任を受けライト判断）。
**実行主体**: 構築・初期運用＝**Codex（対話）** / 定期実行＝**GitHub Actions上の生成スクリプト（CodexがS10で実装）**
**ステータス**: 光さん確認後、§9の「人間のS0」→Codex着手
**元ネタ**: AIエージェントチャンネル「Codex社員でオウンドメディア自動運用」7フェーズ（eUe-cg2dD3k）

---

## 0. ゴール・要件・事業判断（確定）

| 項目 | 内容 |
|---|---|
| **媒体** | 現 `lightwork-center`（チャーチ型HP）を**土台に流用し、キュレーション・オウンドメディアへIA刷新**。スタック・デザイン・薬機法記述は引き継ぐ |
| **最終ゴール** | スピ関心層を、メディア内の `/medicine-wheel`（メディスンホイールプログラム）→**質の高い問い合わせ**へ |
| **プログラムの位置** | サイトの主役はメディア。メディスンホイールは**中核コンテンツ＋申込導線**として内包 |
| **ターゲット** | スピ関心層 — シャーマニズム・ヒーリング・覚醒に既に関心があり「本物」を探す人 |
| **構築運用** | 構築＝Codex（GitHub＋Vercel認証）。定期実行＝Actions生成スクリプト。人間＝「公開ボタン（PRマージ）」 |

**光さんの事業判断（背骨）**
1. **質の問い合わせ重視** — KPIは流入量でなく「本物の問い合わせ数」。量産しない。記事＝本物の証明。
2. **公開ボタンだけ目指す（無人化目標）** — 到達条件付き（S7・S10）。前提は品質ゲートの堅牢化。
3. **送客先の薬機法表現を是正** — 旧`/sessions`のNG表現は新`/medicine-wheel`に持ち込まない。事実だけ転記。

---

## 0.4 この方針転換で「捨てる／引き継ぐ」もの

| 引き継ぐ（資産） | 捨てる |
|---|---|
| Next.js 16 / React 19 / Tailwind 4 スタック | チャーチ型の情報設計（サービス紹介サイトの発想）|
| `globals.css`（⊙・エディトリアルラグジュアリーの美意識）| 旧`/sessions`のNG表現（「最強の解毒剤」「依存症の克服」等）|
| 36コミットの薬機法是正・SAFETY記述 | チャーチ然としたトップページ構成 |
| git履歴（`git tag pre-rebuild` を打ってから着手）| |

→ `create-next-app`での全消しはしない。**既存土台にメディア機能を増設し、IAを刷新する。**

---

## 0.5 リポジトリ & 認証マップ（cold-start で最初に読む）★

| 区分 | 対象 | 扱い |
|---|---|---|
| **Codexの作業リポジトリ** | `lightwork-center`（独立git・remote: `github.com/hikarunagashima/lightwork-center`）| ここだけがCodexのワークツリー |
| **git管理外のローカル素材** | `amateru/references/neoshamanism`・`company`・`memory`・`plans` | **amateru自体はgitリポジトリではない**。Codexからは見えない。§9「人間のS0」で作業リポジトリへ搬入する。Note 37本は載せない |
| light-core | `amateru/tools/light-core/`（Python）| 同上。S7でオプション利用するなら搬入 or API化 |
| **付与する認証** | ①GitHub（**pull-requests:write中心**・main直push権は与えない）②Vercel（GitHub連携）③API key（OpenAI/fal.ai/GA4/GSC）| Vercel/GitHub Secretsのみ。コード直書き禁止 |

> 原則: Codexは作業リポジトリ内のみ書き換え。`amateru/`の素材は**人間が事前にcommit&pushして搬入**してから渡す（§9）。秘密は環境変数のみ。

---

## 1. 設計思想 — 「本物が編集するキュレーションメディア」

シャーマニズム×心身＝**YMYL領域**。Googleは医療・健康系を最も厳しく評価し、E-E-A-Tの弱い量産記事は排除される。高単価・要面談・場所非公開の事業特性上、**流入量を追うと冷やかし・誤解・通報リスク（麻薬関連）が増え、本気の少数との縁が薄まる**。

**だから「量産機械」でなく「本物が編集するキュレーションメディア」を作る。** 7フェーズは「光さんの本物を、薬機法クリアに・SEO的に正しく・効率的に世へ出す**増幅装置**」。

| E-E-A-T | 一般的な自動メディア | 天照の武器 |
|---|---|---|
| Experience | 2次情報のリライト | **光本人の一次体験・ネオシャーマニズム連載** |
| Expertise | 浅く広い | イボガ／ブウィティ正統系譜 |
| Authoritativeness | 無名ドメイン | **国際認定シャーマンとしての実践・専門編集** |
| Trust | 効果煽り・薬機法グレー | 科学参照＋医療否定せず＋自律尊重 |

**「公開ボタンだけ」と「本物の質」を両立させる鍵＝S4ナレッジベース。** 光さんが一次情報をS4に注入 → Codexがその魂で編集 → S7ゲートが薬機法・トーンを保証。**無人化しても質が落ちないのは、S4に光さんの魂が先に入っているから。** S4が光さんの唯一の能動的関与点。

---

## 2. サイトアーキテクチャ（メディアIAへ刷新）

```
/                     メディアトップ（最新記事・特集・編集の視点。チャーチ然としない）★刷新
/articles             記事一覧 ★新設
/articles/[slug]      記事詳細（信頼の証明）★新設
/category/[cat]       カテゴリ別（Medicines/Shamanism/Science/Experience/Practice 等・S1確定）★新設
/medicine-wheel       ★メディスンホイールプログラム（旧/sessionsを薬機法クリアに作り直し・内包）
/about                光さん＝著者・国際認定シャーマン（E-E-A-T権威性）★既存を強化
（既存 /shamanism /medicines /first-visit /voices /contact は記事とのカニバリを見て統廃合・S1判断）
```

**動線**: 記事（広く・信頼の証明）→ 関連記事 → `/medicine-wheel`（中核）→ 申込（Telegram/LINE/フォーム）。

**Phase（動画）↔ Step 対応**: S0土台 / S1設計・S2実装・S3計測・S4ナレッジ / S5(Phase1+2) / S6(Phase3+4) / S7(Phase5) / S8(Phase6) / S9(Phase7) / S10(中間管理職+定期実行)

---

## 3. 依存グラフ & 並列性

```
[人間のS0: 搬入・knowledge初版・認証・branch保護] ──┐
                                                    ├→ S1設計 → S2 IA刷新実装 → S3 計測
S4 ナレッジ整備(初版を人間→Codexが構造化) ──────────┘                              │
        └→ S5 KW+リサーチ → S6 設計+執筆 → S7 品質ゲート → S8 公開(下書きPR→マージ) → S9 分析 ─┐ │
                                                                                         S10 ←┘─┘
```
| 並列着手可 | 直列必須 |
|---|---|
| S1 と S4 | 人間のS0 → Codexの全て |
| S2後に S3 と S5 | S5→S6→S7→S8→S9 |

**モデル階層**: 設計・品質基準（S1・S7）= 最強(Opus級)。実装・運用（他）= 標準。

---

## 4. ステップ詳細

> **§9「人間のS0」が完了してからCodex着手。** §0.5マップ・§5横断制約・§6指示書を先に読む。
> **Next.js注意**: `node_modules/next/dist/docs/01-app/`（実在確認済み）の metadata/sitemap/mdx を、コード前に必ず読む。

### S0 — 土台確認（Codex側）　【整備 / 依存=人間S0】
- 搬入済み確認: `content/_source/neoshamanism/`（ネオシャーマニズム連載のみ）と `knowledge/`（voice/compliance/medicine-wheel/science-refs）が**存在するか確認。無ければ「S0搬入未完」と報告して止まる**
- `git tag pre-rebuild` を打つ（既存資産の退避点）
- Vercel連携・本番ドメイン・`NEXT_PUBLIC_SITE_URL`・env を確認。ダミーコミットで **push→Vercel自動デプロイが通電**することを1回検証
- **Exit**: 燃料が内部にあり、デプロイが通電し、退避点がある

### S1 — 情報設計 & IA刷新設計　【設計 / 最強 / S0依存】
- メディアのコンセプト/トーン（キュレーションメディア。チャーチ然としない）
- URL設計（§2）・カテゴリ/タグ・**既存ページ（/shamanism /medicines等）と記事のカニバリ対策**（既存=ブランド面、記事=情報検索面。canonical方針）・統廃合判断
- **MVPは5〜10KW**に絞る（全体マップは後続・YAGNI）
- `/medicine-wheel` 構成設計：`knowledge/medicine-wheel.md`（人間が転記した事実）を唯一の出所とし、薬機法クリアに7プログラム＋3パックを記述
- JSON-LD方針・i18nは初期日本語単一・成果物を `docs/_design/` に出力
- **Exit**: 光さんがコンセプト・カテゴリ・統廃合・/medicine-wheel構成を承認

### S2 — IA刷新実装（既存土台に増設）　【実装 / 標準 / S1依存】
- **着手前に読む**: `node_modules/next/dist/docs/01-app/` の metadata/sitemap/mdx
- 既存スタック・`globals.css`を流用。記事ソース方式を**着手時に断定**（MDX採用なら`@next/mdx`等の追加と`next.config`変更を明記／または frontmatter付き`.md`自前パース）
- メディアトップ刷新・`/articles`・`/articles/[slug]`・`/category/[cat]`・`/medicine-wheel`（旧/sessionsをクリーンに作り直し）・`/about`強化
- フロントマター規約（title/description/slug/category/tags/publishedAt/updatedAt/author/ogImage/funnelStage/targetKW/jsonLd）
- JSON-LD・`sitemap.ts`・`robots.ts`・RSS・動的OGP・目次・読了時間・関連記事・パンくず
- **Verify**: `npm run build`成功 / サンプル記事3本 / Lighthouse SEO・Best Practices ≥95 / リッチリザルト通過 / Vercelプレビュー確認
- **Exit**: 記事1本追加で一覧・詳細・sitemapに自動反映。`/medicine-wheel`から申込導線が通る

### S3 — ファネル & 計測　【実装 / 標準 / S2依存】
- CTA出し分け（TOFU=メルマガ/LINE、MOFU=無料相談、BOFU=/medicine-wheel→申込）
- **一次CV = `outbound_click`**（Telegram/LINEクリックをGA4取得。実成約は手動突合）
- 内部リンク自動挿入・GA4/GSC連携・登録導線
- **Exit**: 「記事→/medicine-wheel→外部CTAクリック」率が計測できる

### S4 — ナレッジベース（光の魂の注入点）★最重要　【整備 / 標準〜最強 / 初版=人間】
- **初版は人間が用意**（§9）。Codexは構造化・index化・拡充を担う
- 最小ファイルセット: `voice.md`（トーン）/ `compliance.md`（薬機法NG/OK＋画像ガードレール）/ `medicine-wheel.md`（旧/sessionsから**事実だけ抽出しNG語を剥がして転記**）/ `science-refs.md`（一次論文リンク）
- 搬入素材（`content/_source/`）を構造化（出典・確信度・**光の一次体験フラグ**）
- **光さんレビュー**: 一次情報の真正性を確認（魂の注入）
- **Exit**: S5〜S7が `knowledge/` だけで天照の一次情報・トーン・法令制約を再現できる

### S5 — KW選定 & リサーチ（Phase1+2）　【運用 / 標準 / S4依存】
- KW選定（ボリュームMCP試行）。**フォールバック**: 無ければKWマップ優先度＋Google Suggest/関連検索＋競合上位有無で代替、ボリュームは任意フィールド
- リサーチ: ①`knowledge/`一次情報を最優先→②X/YouTube/競合補強→③出典付きメモ＋競合上位10記事
- **Exit**: MCP有無に関わらず再現可能

### S6 — 設計 & 執筆（Phase3+4）　【運用 / 標準 / S5依存】
- 設計: 競合10記事の見出し抽出→共通パターン→**独自パート（光の一次情報）**
- 執筆: 構成＋`knowledge/`＋`voice.md`で本文。内部リンク・FAQ・出典・静謐トーン。フロントマター準拠MD
- **Exit**: KW入力から下書きMDが生成される

### S7 — 品質ゲート（E-E-A-T＋薬機法）★差別化の心臓部　【設計+運用 / 最強 / S6依存】
- **二層ゲート**: 第1層=**薬機法ゲート(0/100)** NG表現1つでも検出→即不合格・公開不可。第2層=加点（①E-E-A-T一次情報②事実/出典③トーン④SEO構造⑤読者価値・各20点・95点以上で合格）
- NG検出は**TS側で独立実装**を基本。`anti_slop`/`saniwa`はオプション（搬入 or API化した場合のみ）
- ファクト/誤字チェック・**リライト上限3回→人間レビュー**
- **Exit**: 薬機法違反が公開キューに絶対入らない

### S8 — 公開（Phase6）　【運用 / 標準 / S7依存】
- アイキャッチ＝**fal.ai MCP**（抽象・象徴のみ。効果暗示・ビフォーアフター禁止）
- 合格MDを `content/articles/` に書き込み → **下書きPR作成** → 光さんがマージ＝公開（push→Vercel自動デプロイ）
- メタ（title/description/OGP/JSON-LD）自動設定
- **Exit**: 光さんのPRマージで本番公開・sitemap反映（＝「公開ボタンだけ」の実装）

### S9 — 分析 & リライト（Phase7）　【運用 / 標準 / S8依存】
- GA4/GSCからPV・順位・CTR・`outbound_click`取得、KPIレポート生成
- **質の指標を主軸**（流入量は従）。傾向分析→KW/設計へ学習FB。リライト。学習を`knowledge/learnings.md`に蓄積
- **Exit**: 分析→改善が次サイクルに反映

### S10 — オーケストレーション & 運用（イベント駆動・無人化）　【運用 / 標準 / S2・S9依存】
- **実行主体の書き分け**: 記事生成ロジックを**Codexが「再利用可能なスクリプト（node/python＋OpenAI API＋knowledge読込＋S7ゲート）」として実装**する。GitHub Actionsはそのスクリプトを起動するだけ（Codex本体がscheduleで自動起動するのではない）
- **イベント駆動を基本**（量産しない方針との整合）: 「光さんが`knowledge/`に一次情報を注入 → 生成スクリプトが1本編集 → 下書きPR」。定期`schedule`は分析(S9)・リライト候補抽出に留め、**記事の自動量産はしない**
- **branch protection（仕組み>意志）**: `main`に保護ルール（PR必須・`hikarunagashima`の承認必須）。Actions/Codexトークンは`pull-requests:write`に絞り**main直push不可**
- APIコスト上限・失敗通知。**無人化の到達条件**: S7第1層が薬機法違反を100%停止＋直近N本(例20本)連続で人間の本文修正ゼロ → 関与を「PRマージ」に縮小
- **Exit**: 到達条件を満たせば光さんの操作が「PRマージ」だけになる

---

## 5. 横断制約（全ステップ共通・絶対）
1. **薬機法・医療広告**: 効果断定（治る/効く/治療/診断）禁止。「医療行為ではない」必須。医療否定せず必要時受診を促す
2. **法域・薬機法**: イボガ／イボガインを「日本で麻薬指定」「海外法域でのみ」と書かない。施術場所・実施可否は断定せず、事前の安全確認を前提にする
3. **E-E-A-T**: 全記事に光の一次情報 or 一次資料の出典＋著者情報（国際認定イボガシャーマン）。光さん本人を大阪万博登壇者として表記しない
4. **ブランドトーン**: エディトリアル・ラグジュアリー・静謐。煽り・量産感・AI定型句を排除（`voice.md`）
5. **画像**: 効果暗示禁止・生成画像の権利確認
6. **リポジトリ境界**: Codexは作業リポジトリ内のみ。素材は人間が事前搬入。秘密は環境変数のみ
7. **公開**: 光さんのPRマージのみ。main直push不可（branch protectionで強制）。無人化は到達条件まで行わない

---

## 6. ★ Codexへの指示書（このまま渡せる）

### 6.1 `lightwork-center/AGENTS.md` を拡張（既存のNext.js警告に追記）

```markdown
# 天照ライトワークセンター — キュレーション・オウンドメディア

## 目的
シャーマニズム・植物メディスン・意識研究を、本物（国際認定イボガシャーマン）の一次体験と
専門編集でキュレーションするメディア。読者を /medicine-wheel への質の高い問い合わせに繋ぐ。
量産しない。チャーチ型サービスサイトに戻さない。

## 技術
- 既存スタック（Next.js 16 / React 19 / Tailwind 4）を流用。create-next-appで作り直さない
- コード前に node_modules/next/dist/docs/01-app/ を読む（学習データと差分あり）
- globals.css の ⊙ エディトリアル美意識を継承
- デプロイ: push → Vercel 自動デプロイ。秘密は Secrets のみ（直書き禁止）

## 絶対制約（YMYL）
- 薬機法: 「治る/効く/治療/診断」等の効果断定 禁止。「医療行為ではない」を明記
- イボガ／イボガインを「日本で麻薬指定」「海外法域でのみ」と書かない。施術場所・実施可否は断定せず、事前の安全確認を前提にする
- 全記事に一次情報or一次資料の出典＋著者情報。トーン=knowledge/voice.md、法令=knowledge/compliance.md に従う
- /medicine-wheel の内容は knowledge/medicine-wheel.md の事実のみを根拠にする。プログラム内容・価格を捏造しない

## 作業境界
- このリポジトリ内のみ書き換える。素材は content/_source/ と knowledge/ から使う
- 本番公開は「下書きPR」で出す。main へ直接 push しない（保護ルールあり）
```

### 6.2 最初にCodexへ投げる着手プロンプト（案）

```
このリポジトリで、天照ライトワークセンターのキュレーション・オウンドメディアを
既存スタックを土台に構築する。まず AGENTS.md と knowledge/ と docs/plan.md を読め。
knowledge/（voice/compliance/medicine-wheel/science-refs）と content/_source/ が
搬入済みか確認し、無ければ「S0搬入が未完」と報告して止まれ。
次に docs/plan.md の S0→S1→S2 の順で進める。S1の情報設計は docs/_design/ に出し、
私（光）の承認を待て。S2の実装前に node_modules/next/dist/docs/01-app/ を読め。
create-next-app で作り直すな（既存土台に増設）。着手前に git tag pre-rebuild を打て。
薬機法ゲート（compliance.md）に違反する表現は絶対に書くな。/medicine-wheel の
プログラム内容は knowledge/medicine-wheel.md の事実のみを根拠にし、捏造するな。
本番公開は下書きPRで出し、私のマージを待て。main へ直接 push するな。
```

### 6.3 運用自動化（S10・GitHub Actions）
- 記事生成は**Codexが実装する再利用可能スクリプト**（OpenAI API＋knowledge読込＋S7ゲート）。Actionsはそれを起動するだけ
- `schedule`: **分析(S9)・リライト候補抽出**に限定。記事の自動量産はしない（イベント駆動）
- 全ジョブにAPIコスト上限・失敗通知。`GITHUB_TOKEN`は`pull-requests:write`のみ。main直push不可

---

## 7. KPI（質の問い合わせ重視）& 人間の関与点
**KPI（主軸＝質）**: 本物の問い合わせ数 / outbound_click率 / 読了・滞在 /（最終）成約。流入量・公開本数は従。
**人間（光さん）の関与点**: ①S1コンセプト/構成承認 ②S4一次情報の真正性=**魂の注入** ③S8公開（PRマージ）。無人化が進んでもS4とPRマージは保持。

---

## 8. リスクと対策
| リスク | 影響 | 対策 |
|---|---|---|
| amateruがgit管理外でCodexから素材が見えない | 致命 | §9「人間のS0」で作業リポジトリへ搬入してから渡す |
| プログラム内容の捏造 | 致命 | knowledge/medicine-wheel.md（旧/sessionsから事実転記）を唯一の根拠に |
| 既存の薬機法資産を捨てる | 大 | 0.4方針＝土台流用。create-next-appしない。git tag pre-rebuild |
| 無人化での事故公開 | 致命 | S7第1層0/100＋branch protection（main直push不可）＋S8 PRマージ |
| CodexとActionsの混同 | 大 | S10で生成スクリプトとして実装、Actionsは起動のみと書き分け |
| CV計測不能(Telegram離脱) | 大 | S3 outbound_click＋手動突合。KPIを質に |
| YMYL品質不足で検索圏外 | 致命 | S7二層ゲート＋本物E-E-A-T。量を追わない |
| Vercel連携が未検証 | 中 | S0でダミーコミットによりデプロイ通電を1回検証 |
| Next最新版が学習データ外 | 大 | S2で具体docs＋方式断定 |
| 検索ボリュームMCP不在 | 中 | S5フォールバック既定値 |

---

## 9. 実行順サマリ

### ★ 人間のS0（Codexに渡す前に光さん＝必要ならライトが用意）
1. `amateru/references/neoshamanism` のみを `lightwork-center/content/_source/neoshamanism/` へコピーし**commit&push**（Note 37本は載せない）
2. `lightwork-center/knowledge/` に初版を置く：`voice.md`／`compliance.md`／`medicine-wheel.md`（旧/sessionsから事実転記・NG語剥がし）／`science-refs.md`
3. この計画書を `lightwork-center/docs/plan.md` としてコピー（Codexのワークツリーから読めるように）
4. AGENTS.md を §6.1 に拡張。GitHub の `main` に branch protection を設定。各認証・APIキーを Vercel/GitHub Secrets に
5. これら搬入済みリポジトリをCodexに渡す

### Codex（着手プロンプト§6.2を投げる）
6. **S0**（搬入確認・git tag・Vercel通電検証）
7. **並列**: S1（設計・光さん承認）＋ S4（ナレッジ構造化・光さん真正性承認）
8. S1後 → S2（IA刷新実装）→ S3（計測）
9. S4後 → S5→S6→S7→S8→S9 を**1本通す**（最初の1記事を下書きPR→マージ→本番公開）
10. 疎通後 → S10（生成スクリプト＋Actionsはイベント駆動／分析に限定）。到達条件まで無人化しない

**最初のマイルストーン**: 「人間のS0完了 → Codexが S0〜S8 を通し、**光さんの本物が宿った記事を1本**、薬機法ゲートを通し、下書きPR→光さんマージで本番公開」。ここまで来れば残りは精度と運用の問題。
