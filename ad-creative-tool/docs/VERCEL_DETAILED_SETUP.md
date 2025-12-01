# Vercel 詳細設定ガイド（完全版）

## 📋 目次

1. [アカウント作成とログイン](#1-アカウント作成とログイン)
2. [プロジェクトのインポート](#2-プロジェクトのインポート)
3. [プロジェクト設定の詳細](#3-プロジェクト設定の詳細)
4. [環境変数の設定](#4-環境変数の設定)
5. [Blob Storageの設定](#5-blob-storageの設定)
6. [デプロイ設定](#6-デプロイ設定)
7. [カスタムドメイン設定](#7-カスタムドメイン設定オプション)
8. [モニタリングとログ](#8-モニタリングとログ)

---

## 1. アカウント作成とログイン

### 1.1 Vercelにアクセス

1. ブラウザで https://vercel.com にアクセス

### 1.2 サインアップ

**方法1: GitHubアカウントで連携（推奨）**

```
1. 「Sign Up」ボタンをクリック
2. 「Continue with GitHub」を選択
3. GitHubのログイン画面が表示される
4. メールアドレス/パスワードを入力
5. 「Sign in」をクリック
6. 「Authorize Vercel」をクリック
7. Vercelダッシュボードにリダイレクト
```

**方法2: メールアドレスで登録**

```
1. 「Sign Up」ボタンをクリック
2. メールアドレスを入力
3. 確認メールが届く
4. メール内のリンクをクリック
5. パスワードを設定
```

### 1.3 チーム作成（初回のみ）

```
1. チーム名を入力（例: "My Team"）
2. 「Continue」をクリック
3. プランを選択
   - Hobby: 無料（個人利用）
   - Pro: $20/月（商用利用）
4. Hobbyを選択して「Continue」
```

---

## 2. プロジェクトのインポート

### 2.1 新規プロジェクト作成

```
1. Vercelダッシュボードで「Add New...」をクリック
2. ドロップダウンから「Project」を選択
```

### 2.2 Gitリポジトリの接続

**GitHubの場合:**

```
1. 「Import Git Repository」セクションを探す
2. 検索ボックスに「ad-cr-banana01」と入力
3. リポジトリが表示される
4. 「Import」ボタンをクリック
```

**リポジトリが表示されない場合:**

```
1. 「Adjust GitHub App Permissions」をクリック
2. GitHubの権限設定ページが開く
3. 「Repository access」セクションで:
   - 「All repositories」を選択、または
   - 「Only select repositories」で「ad-cr-banana01」を選択
4. 「Save」をクリック
5. Vercelに戻る
```

---

## 3. プロジェクト設定の詳細

### 3.1 Configure Project 画面

#### Project Name（プロジェクト名）
```
入力値: ad-creative-tool
説明: これが公開URLの一部になる
例: ad-creative-tool.vercel.app
```

#### Framework Preset（フレームワーク）
```
選択: Next.js
説明: 自動検出されるのでそのままでOK
```

#### Root Directory（最重要設定！）
```
⚠️ これを設定しないとビルドが失敗します！

1. 「Root Directory」の右側にある「Edit」をクリック
2. テキストボックスが表示される
3. 「ad-creative-tool」と入力
4. 「Continue」または「Save」をクリック

✅ 正しい設定:
   Root Directory: ad-creative-tool

❌ 間違った設定:
   Root Directory: (空白)
   Root Directory: /
   Root Directory: ./ad-creative-tool
```

### 3.2 Build and Output Settings

**デフォルト設定（変更不要）:**

```yaml
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

**カスタマイズが必要な場合:**

```
1. 「Build and Output Settings」セクションを展開
2. 「Override」トグルをONにする
3. 必要に応じてコマンドを変更

例: Node.jsメモリ増加
Build Command: NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### 3.3 Environment Variables（環境変数）

この段階で設定することもできますが、後から設定する方が確実です。
→ **次のセクションで詳しく説明**

---

## 4. 環境変数の設定

### 4.1 環境変数設定画面へのアクセス

**方法1: デプロイ前に設定（推奨）**
```
1. Configure Project画面で下にスクロール
2. 「Environment Variables」セクションを見つける
3. 「Add」ボタンをクリック
```

**方法2: デプロイ後に設定**
```
1. プロジェクトダッシュボードで「Settings」タブをクリック
2. 左サイドバーから「Environment Variables」を選択
3. 「Add New」をクリック
```

### 4.2 環境変数の追加手順

#### 変数1: GOOGLE_AI_API_KEY

```
1. 「Add New」をクリック
2. フォームに以下を入力:

   Name (required):
   GOOGLE_AI_API_KEY

   Value (required):
   [あなたのGoogle AI APIキーをペースト]
   例: AIzaSyABCDEFGHIJKLMNOPQRSTUVWXYZ123456

   Environments:
   ☑ Production
   ☑ Preview
   ☑ Development
   ※ 3つすべてにチェックを入れる

3. 「Save」をクリック
```

#### 変数2: ANTHROPIC_API_KEY

```
1. 「Add New」をクリック
2. フォームに以下を入力:

   Name (required):
   ANTHROPIC_API_KEY

   Value (required):
   [あなたのAnthropic APIキーをペースト]
   例: sk-ant-api03-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456

   Environments:
   ☑ Production
   ☑ Preview
   ☑ Development
   ※ 3つすべてにチェックを入れる

3. 「Save」をクリック
```

### 4.3 環境変数の確認

```
設定後、以下のように表示されます:

┌─────────────────────────┬─────────────────┬─────────────────┐
│ Name                    │ Value           │ Environments    │
├─────────────────────────┼─────────────────┼─────────────────┤
│ GOOGLE_AI_API_KEY       │ AIzaSy...       │ Pro, Pre, Dev   │
│ ANTHROPIC_API_KEY       │ sk-ant-...      │ Pro, Pre, Dev   │
└─────────────────────────┴─────────────────┴─────────────────┘

※ Pro = Production, Pre = Preview, Dev = Development
```

### 4.4 環境変数の編集・削除

**編集する場合:**
```
1. 環境変数の行にマウスオーバー
2. 右端の「⋮」（3点リーダー）をクリック
3. 「Edit」を選択
4. 値を変更
5. 「Save」をクリック
```

**削除する場合:**
```
1. 環境変数の行にマウスオーバー
2. 右端の「⋮」をクリック
3. 「Delete」を選択
4. 確認ダイアログで「Delete」をクリック
```

---

## 5. Blob Storageの設定

### 5.1 Blob Storageとは

```
用途: 画像・動画などのファイルを保存するストレージ
特徴:
- CDNによる高速配信
- 無制限のストレージ（従量課金）
- 自動バックアップ
- HTTPS対応
```

### 5.2 Blob Storage作成手順

**タイミング: デプロイ後に設定**

```
1. プロジェクトダッシュボードで「Storage」タブをクリック

2. 「Create Database」ボタンをクリック
   ※ 画面中央に大きく表示される

3. データベースタイプを選択
   ┌──────────────────────────────────────┐
   │ □ KV      - Key-Value Store          │
   │ □ Postgres - Relational Database     │
   │ ☑ Blob     - Object Storage          │ ← これを選択
   │ □ Edge Config - Global Config        │
   └──────────────────────────────────────┘

4. 「Continue」をクリック

5. データベース名を入力
   Database Name: ad-creative-storage
   ※ 任意の名前でOK（英数字とハイフンのみ）

6. リージョンを選択（推奨）
   Region: iad1 (Washington, D.C., USA)
   ※ 他のリージョンでもOK

7. 「Create」ボタンをクリック

8. 確認画面が表示される
   「Connect Project」ボタンをクリック

9. プロジェクト選択
   ☑ ad-creative-tool
   ※ 自動選択されている

10. 「Connect」をクリック
```

### 5.3 Blob Storage接続の確認

```
1. 「Environment Variables」をクリック

2. 以下の変数が自動追加されていることを確認:
   
   Name: BLOB_READ_WRITE_TOKEN
   Value: vercel_blob_rw_xxxxxxxxxx
   Environments: Production, Preview, Development
   
   ✅ この変数が表示されていれば成功！
```

### 5.4 Blob Storageの管理

**ストレージの確認:**
```
1. 「Storage」タブをクリック
2. 作成したBlob Storageをクリック
3. 以下が表示される:
   - ファイル一覧
   - 使用量
   - API Endpoints
```

**ファイルの削除:**
```
1. ファイル一覧でファイルを選択
2. 「Delete」ボタンをクリック
3. 確認ダイアログで「Delete」をクリック
```

---

## 6. デプロイ設定

### 6.1 初回デプロイ

**設定完了後にデプロイ:**

```
1. Configure Project画面で「Deploy」ボタンをクリック
   ※ 青色の大きなボタン

2. ビルドプロセスが開始される
   表示内容:
   - Installing dependencies...
   - Building...
   - Collecting page data...
   - Generating static pages...
   - Finalizing...

3. 進行状況を確認
   ログがリアルタイムで流れる
   所要時間: 約2-5分

4. デプロイ完了
   ✅ Deployment completed
   公開URLが表示される
   例: https://ad-creative-tool-xxx.vercel.app
```

### 6.2 デプロイ設定の詳細

**Settings → General:**

```yaml
Node.js Version:
  推奨: 20.x
  設定方法: ドロップダウンから選択

Function Region:
  推奨: iad1 (Washington, D.C., USA)
  設定方法: ドロップダウンから選択

Install Command:
  デフォルト: npm install
  カスタム: yarn install (Yarnを使う場合)
```

**Settings → Functions:**

```yaml
Function Memory (Proプランのみ):
  デフォルト: 1024 MB
  推奨: 1024 MB
  最大: 3008 MB

Function Timeout:
  Hobby: 10秒（固定）
  Pro: 60秒（maxDuration: 60 in vercel.json）
```

### 6.3 自動デプロイの設定

**デフォルト動作:**
```
✅ Productionブランチ（main）へのpush → 本番デプロイ
✅ 他のブランチへのpush → プレビューデプロイ
✅ Pull Request作成 → プレビューデプロイ
```

**設定の確認:**
```
1. Settings → Git
2. Production Branch: main
3. Deploy Hooks: 自動デプロイが有効
```

### 6.4 デプロイの確認

**デプロイ一覧:**
```
1. 「Deployments」タブをクリック
2. デプロイ履歴が表示される

各デプロイの情報:
- Status: ✓ Ready / ⚠ Error / ⏳ Building
- Branch: main / feature-xyz
- Commit: コミットメッセージ
- Duration: ビルド時間
- Created: デプロイ日時
```

**デプロイの詳細確認:**
```
1. デプロイをクリック
2. 詳細画面が表示される:
   - 公開URL
   - ビルドログ
   - 関数ログ
   - Source Code（GitHubリンク）
```

---

## 7. カスタムドメイン設定（オプション）

### 7.1 カスタムドメインの追加

```
1. Settings → Domains
2. 「Add」ボタンをクリック
3. ドメイン名を入力
   例: ad-creative.yourdomain.com
4. 「Add」をクリック
```

### 7.2 DNS設定

**Vercelが提供する設定値:**

```
Type: CNAME
Name: ad-creative
Value: cname.vercel-dns.com

または

Type: A
Name: @
Value: 76.76.21.21
```

**DNS設定手順（例: Cloudflare）:**

```
1. DNSプロバイダー（例: Cloudflare, AWS Route53）にログイン
2. ドメインのDNS設定を開く
3. 新しいレコードを追加:
   - Type: CNAME
   - Name: ad-creative
   - Target: cname.vercel-dns.com
   - TTL: Auto
4. 「Save」をクリック
5. Vercelに戻って「Verify」をクリック
```

### 7.3 SSL証明書

```
自動発行: ✅ Let's Encryptで自動発行
更新: ✅ 自動更新
所要時間: 数分〜最大24時間

確認方法:
1. Settings → Domains
2. ドメインの横に🔒マークが表示される
```

---

## 8. モニタリングとログ

### 8.1 Analytics（分析）

```
1. 「Analytics」タブをクリック
2. 以下のデータが表示される:
   - Page Views（ページビュー）
   - Unique Visitors（ユニークビジター）
   - Top Pages（人気ページ）
   - Referrers（流入元）
   - Devices（デバイス）
   - Countries（国別）

有効化方法:
1. Analyticsタブで「Enable」をクリック
2. 自動的にトラッキング開始
```

### 8.2 Speed Insights

```
1. 「Speed Insights」タブをクリック
2. Core Web Vitalsが表示される:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

有効化方法:
1. Speed Insightsタブで「Enable」をクリック
2. 自動的に計測開始
```

### 8.3 ログの確認

**リアルタイムログ:**
```
1. Deploymentsタブで最新のデプロイをクリック
2. 「Functions」タブをクリック
3. リアルタイムログが表示される

フィルター:
- All Logs（すべて）
- Errors Only（エラーのみ）
- Function Name（関数別）
```

**過去のログ:**
```
1. Settings → Log Drains
2. 外部ログサービスと連携可能:
   - Datadog
   - Logtail
   - Axiom
```

### 8.4 アラート設定

```
1. Settings → Notifications
2. 以下の通知を設定可能:
   
   ☑ Deployment Success（デプロイ成功）
   ☑ Deployment Failed（デプロイ失敗）
   ☑ Domain Configuration（ドメイン設定）
   ☑ Budget Alerts（予算アラート）

通知方法:
- Email（メール）
- Slack（Slackチャンネル）
- Webhook（カスタムWebhook）
```

---

## 9. トラブルシューティング

### 9.1 ビルドエラー

**症状:**
```
Error: Cannot find package.json
```

**解決策:**
```
1. Settings → General
2. Root Directory = ad-creative-tool に設定
3. 「Save」をクリック
4. Deploymentsタブで「Redeploy」をクリック
```

### 9.2 環境変数エラー

**症状:**
```
Error: GOOGLE_AI_API_KEY is required
```

**解決策:**
```
1. Settings → Environment Variables
2. 変数が正しく設定されているか確認
3. すべての環境（Production, Preview, Development）にチェックがあるか確認
4. 値に余分なスペースがないか確認
5. 「Redeploy」をクリック
```

### 9.3 Blob Storageエラー

**症状:**
```
Error: Blob storage not configured
```

**解決策:**
```
1. Storageタブを確認
2. Blob Storageが作成されているか確認
3. Environment Variablesで BLOB_READ_WRITE_TOKEN が設定されているか確認
4. 「Redeploy」をクリック
```

---

## 10. チェックリスト

### デプロイ前チェックリスト

```
□ Vercelアカウント作成済み
□ GitHubリポジトリ接続済み
□ プロジェクトインポート済み
□ Root Directory設定: ad-creative-tool
□ 環境変数設定: GOOGLE_AI_API_KEY
□ 環境変数設定: ANTHROPIC_API_KEY
□ すべての環境にチェック（Pro, Pre, Dev）
```

### デプロイ後チェックリスト

```
□ デプロイ成功（✓ Ready）
□ 公開URLにアクセス可能
□ Blob Storage作成済み
□ BLOB_READ_WRITE_TOKEN 自動設定確認
□ トップページが表示される
□ スクレイピング機能が動作する
□ エラーログにエラーなし
```

---

## 11. コスト管理

### 11.1 使用量の確認

```
1. Settings → Usage
2. 以下が表示される:
   - Bandwidth（帯域幅）
   - Build Minutes（ビルド時間）
   - Serverless Function Execution（関数実行時間）
   - Blob Storage（ストレージ使用量）
```

### 11.2 予算アラート

```
1. Settings → Billing
2. 「Budget Alerts」をクリック
3. 予算上限を設定:
   例: $50/月
4. アラート通知を有効化
```

### 11.3 料金プラン

**Hobby（無料）:**
```
- 100GB 帯域幅/月
- 100 時間 Function実行/月
- 無制限 ビルド
制限: Function timeout 10秒
```

**Pro（$20/月）:**
```
- 1TB 帯域幅/月
- 1000 時間 Function実行/月
- 無制限 ビルド
機能: Function timeout 60秒
```

---

## 📞 サポート

**Vercel公式:**
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://vercel-status.com

**プロジェクト:**
- GitHub Issues: https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues
- FAQ: [FAQ.md](./FAQ.md)

---

**これで Vercel の設定は完璧です！🎉**
