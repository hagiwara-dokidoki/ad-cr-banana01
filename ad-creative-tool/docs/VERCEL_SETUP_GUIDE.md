# Vercel セットアップガイド（画像付き詳細手順）

## 🎯 概要

このガイドでは、Vercelに広告クリエイティブ自動生成ツールをデプロイする手順を詳しく説明します。

## ⏱️ 所要時間

約10分（APIキー取得済みの場合）

## 📋 前提条件

- [ ] GitHubアカウント
- [ ] Google AI API Key
- [ ] Anthropic API Key
- [ ] クレジットカード（Blob Storage使用のため）

---

## Step 1: Vercelアカウントの作成

### 1.1 Vercelにアクセス

1. https://vercel.com にアクセス
2. 「Sign Up」をクリック

### 1.2 GitHubで連携

1. 「Continue with GitHub」を選択
2. GitHubの認証画面で「Authorize Vercel」をクリック

---

## Step 2: プロジェクトのインポート

### 2.1 新規プロジェクト作成

1. Vercelダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで `ad-cr-banana01` を検索
3. リポジトリの横にある「Import」をクリック

### 2.2 プロジェクト設定

#### Project Name
```
ad-creative-tool
```

#### Framework Preset
```
Next.js (自動検出されます)
```

#### Root Directory
⚠️ **重要**: これを設定しないと動作しません！

1. 「Edit」をクリック
2. `ad-creative-tool` を入力
3. 「Continue」をクリック

#### Build Settings（デフォルトでOK）
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 2.3 環境変数の設定

「Environment Variables」セクションで以下を追加：

#### 変数1: GOOGLE_AI_API_KEY

```
Name: GOOGLE_AI_API_KEY
Value: [あなたのGoogle AI APIキー]
Environments: ✅ Production ✅ Preview ✅ Development
```

#### 変数2: ANTHROPIC_API_KEY

```
Name: ANTHROPIC_API_KEY
Value: [あなたのAnthropicAPIキー]
Environments: ✅ Production ✅ Preview ✅ Development
```

### 2.4 デプロイ開始

1. すべての設定を確認
2. 「Deploy」ボタンをクリック
3. ビルドプロセスを待つ（約2-3分）

---

## Step 3: Blob Storageの設定

デプロイが完了したら、Blob Storageを有効化します。

### 3.1 Storageタブに移動

1. プロジェクトダッシュボードで「Storage」タブをクリック
2. 「Create Database」をクリック

### 3.2 Blobを選択

1. 「Blob」カードを選択
2. 「Continue」をクリック

### 3.3 データベース作成

```
Database Name: ad-creative-storage
```

1. 名前を入力
2. 「Create」をクリック
3. 確認画面で「Connect」をクリック

### 3.4 自動設定の確認

`BLOB_READ_WRITE_TOKEN` が自動的に環境変数に追加されます。

1. 「Settings」→「Environment Variables」で確認
2. `BLOB_READ_WRITE_TOKEN` が表示されていればOK

---

## Step 4: デプロイの確認

### 4.1 公開URLにアクセス

1. 「Deployments」タブで最新のデプロイをクリック
2. 「Visit」ボタンをクリック
3. アプリケーションが開く

### 4.2 動作テスト

#### Test 1: トップページ
- [ ] ページが正常に表示される
- [ ] URL入力フォームが表示される

#### Test 2: スクレイピング
- [ ] テストURL（例: https://www.google.com）を入力
- [ ] 「解析を開始」をクリック
- [ ] スクリーンショットが表示される

#### Test 3: カラー分析
- [ ] カラーパレットが表示される
- [ ] 3色（main, accent, base）が抽出される

#### Test 4: マーケティング分析
- [ ] 競合分析が表示される
- [ ] 強み・ターゲット・トーンが表示される

#### Test 5: コピー生成
- [ ] 20個のコピーが生成される
- [ ] コピーを選択できる

#### Test 6: バナー生成
- [ ] バナーが生成される
- [ ] ダウンロードできる

---

## Step 5: カスタム設定（オプション）

### 5.1 カスタムドメイン

1. 「Settings」→「Domains」
2. 「Add」をクリック
3. ドメイン名を入力
4. DNS設定を行う

### 5.2 Analytics有効化

1. 「Analytics」タブをクリック
2. 「Enable」をクリック
3. パフォーマンスデータが収集される

### 5.3 パフォーマンス設定

#### Function Region（Proプランのみ）
```
Recommended: iad1 (Washington, D.C., USA)
```

#### Function Memory（Proプランのみ）
```
Recommended: 1024 MB
```

---

## 🐛 トラブルシューティング

### エラー1: ビルドが失敗する

**症状**
```
Error: Cannot find module 'next'
```

**解決策**
1. `package.json` を確認
2. 依存パッケージが正しいか確認
3. `package-lock.json` を更新

### エラー2: 環境変数エラー

**症状**
```
Error: GOOGLE_AI_API_KEY is required
```

**解決策**
1. Settings → Environment Variables
2. 変数が設定されているか確認
3. すべての環境（Production, Preview, Development）にチェックがあるか確認
4. デプロイを再実行

### エラー3: Root Directoryエラー

**症状**
```
Error: No such file or directory: package.json
```

**解決策**
1. Settings → General
2. Root Directory が `ad-creative-tool` に設定されているか確認
3. 設定を変更して再デプロイ

### エラー4: Blob Storageエラー

**症状**
```
Error: Blob storage not configured
```

**解決策**
1. Storage タブで Blob が作成されているか確認
2. `BLOB_READ_WRITE_TOKEN` が環境変数にあるか確認
3. プロジェクトを再接続

### エラー5: Playwrightエラー

**症状**
```
Error: Browser not found
```

**解決策**
1. `package.json` で `playwright` が `dependencies` にあるか確認
2. `devDependencies` ではなく `dependencies` に移動
3. 再デプロイ

---

## 📊 デプロイ後の監視

### メトリクスの確認

1. **Deployments**: デプロイ履歴
2. **Analytics**: トラフィック分析
3. **Functions**: API実行ログ
4. **Logs**: リアルタイムログ

### 推奨設定

```yaml
Alerts:
  - Build Failed
  - Function Error Rate > 5%
  - Response Time > 10s
```

---

## 💰 コスト管理

### 無料枠（Hobby）

- 帯域幅: 100GB/月
- ビルド: 無制限
- Function実行時間: 100時間/月

### 有料プラン（Pro: $20/月）

- 帯域幅: 1TB/月
- Function実行時間: 60秒
- チーム機能
- Analytics

### Blob Storage

- 最初の1GB: 無料
- 追加: $0.15/GB/月

### API使用料

- Google AI: 従量課金
- Anthropic: 従量課金

**推定月額コスト（100バナー生成）**
```
Vercel Hobby: $0
Google AI: $5-10
Anthropic: $10-20
Blob Storage: $1-2
---
Total: $16-32/月
```

---

## ✅ 完了チェックリスト

- [ ] Vercelアカウント作成
- [ ] プロジェクトインポート
- [ ] Root Directory設定（`ad-creative-tool`）
- [ ] 環境変数設定（GOOGLE_AI_API_KEY, ANTHROPIC_API_KEY）
- [ ] Blob Storage有効化
- [ ] デプロイ成功
- [ ] 公開URLアクセス可能
- [ ] 5つのステップすべて動作確認
- [ ] バナー生成・ダウンロード確認

---

## 🎉 次のステップ

デプロイが成功したら：

1. **本番URLをシェア**
   - チームメンバーと共有
   - テストユーザーに配布

2. **フィードバック収集**
   - 実際に使ってもらう
   - 改善点を記録

3. **パフォーマンス監視**
   - Analytics を定期的に確認
   - エラーログをチェック

4. **機能追加検討**
   - [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md)の拡張計画を参照

---

## 📞 サポート

問題が解決しない場合：

- [GitHub Issues](https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues)
- [Vercel Documentation](https://vercel.com/docs)
- [FAQ.md](./FAQ.md)

---

**成功を祈ります！🚀**
