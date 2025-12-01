# Vercel デプロイチェックリスト

## ✅ デプロイ前の確認事項

### 1. プロジェクト設定

- [ ] **Root Directory**: `ad-creative-tool` に設定されているか
- [ ] **Framework**: Next.js として検出されているか
- [ ] **Build Command**: `npm run build` (デフォルトでOK)
- [ ] **Output Directory**: `.next` (デフォルトでOK)
- [ ] **Install Command**: `npm install` (デフォルトでOK)

### 2. 環境変数の設定

以下の環境変数をVercelダッシュボードで設定してください：

#### 必須環境変数

```bash
# Google AI API Key (Gemini & Imagen)
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Anthropic API Key (Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

#### 設定手順

1. Vercelプロジェクトダッシュボードを開く
2. **Settings** タブをクリック
3. **Environment Variables** セクションを選択
4. **Add New** をクリック
5. 以下を入力：
   - Name: `GOOGLE_AI_API_KEY`
   - Value: あなたのGoogle AI APIキー
   - Environment: Production, Preview, Development（すべて選択）
6. **Save** をクリック
7. 同様に `ANTHROPIC_API_KEY` も追加

### 3. Vercel Blob Storageの設定

- [ ] **Storage** タブに移動
- [ ] **Create Database** をクリック
- [ ] **Blob** を選択
- [ ] データベース名を入力（例: `ad-creative-storage`）
- [ ] **Create** をクリック

**注意**: `BLOB_READ_WRITE_TOKEN` は自動的に環境変数として設定されます。

### 4. Function設定の確認

`vercel.json` で以下が設定されているか確認：

```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 60
    },
    "app/api/**/*.tsx": {
      "maxDuration": 60
    }
  }
}
```

これにより、AIの処理時間が長くてもタイムアウトしません。

### 5. Playwrightの動作確認

Vercel上でPlaywrightを動かすには特別な設定は不要ですが、以下を確認：

- [ ] `package.json` に `playwright` が含まれているか
- [ ] `playwright` が `dependencies` にあるか（`devDependencies` ではない）

### 6. デプロイ実行

- [ ] **Deployments** タブで最新のデプロイを確認
- [ ] ビルドログにエラーがないか確認
- [ ] デプロイが成功したら、公開URLをクリック

## 🧪 デプロイ後のテスト

### 基本動作確認

1. **Step 1: URL入力**
   - [ ] ページが正常に表示される
   - [ ] URLを入力できる
   - [ ] 「解析を開始」ボタンが動作する

2. **Step 2: スクレイピング**
   - [ ] スクリーンショットが表示される
   - [ ] カラーパレットが抽出される
   - [ ] 画像ギャラリーが表示される

3. **Step 3: マーケティング分析**
   - [ ] 競合分析が表示される
   - [ ] 強み（USP）が表示される
   - [ ] ターゲットペルソナが表示される
   - [ ] ブランドトーンが表示される

4. **Step 4: コピー生成**
   - [ ] 20個のコピーが生成される
   - [ ] コピーを選択できる
   - [ ] カスタムコピーを入力できる

5. **Step 5: バナー生成**
   - [ ] バナーが生成される
   - [ ] Square/Verticalタブが切り替わる
   - [ ] 画像をダウンロードできる

### エラーチェック

もしエラーが発生した場合、以下を確認：

#### APIキーエラー
```
Error: API key is required
```
→ 環境変数が正しく設定されているか確認

#### スクレイピングエラー
```
Error: Browser not initialized
```
→ Playwrightが正しくインストールされているか確認

#### タイムアウトエラー
```
Error: Function execution timed out
```
→ `vercel.json` の `maxDuration` が60秒に設定されているか確認

#### Blob Storageエラー
```
Error: Blob storage not configured
```
→ Vercel Blob Storageが有効化されているか確認

## 🔧 トラブルシューティング

### ビルドが失敗する場合

1. **ログを確認**
   - Deployments → 失敗したデプロイをクリック
   - Build Logs を確認

2. **よくあるエラー**
   
   **TypeScriptエラー**
   ```bash
   # ローカルで確認
   npm run type-check
   ```
   
   **依存パッケージエラー**
   ```bash
   # package-lock.json を削除して再生成
   rm package-lock.json
   npm install
   git add package-lock.json
   git commit -m "fix: update package-lock.json"
   git push
   ```

### デプロイは成功するが動作しない場合

1. **ブラウザのコンソールを確認**
   - F12 → Console タブ
   - エラーメッセージを確認

2. **Vercelのログを確認**
   - Deployments → Functions
   - リアルタイムログを確認

3. **環境変数を再確認**
   - Settings → Environment Variables
   - すべての必須変数が設定されているか

### パフォーマンスが悪い場合

1. **Region設定を確認**
   - Settings → General → Region
   - 推奨: `iad1` (Washington, D.C., USA)

2. **Function設定を確認**
   - `maxDuration` が適切か
   - メモリ設定（Proプランの場合）

## 📊 デプロイ成功の確認

すべてが正常に動作している場合：

✅ ビルドが成功  
✅ 公開URLにアクセスできる  
✅ 5つのステップすべてが動作  
✅ バナーが生成・ダウンロードできる  
✅ エラーが発生しない  

## 🎉 次のステップ

デプロイが成功したら：

1. **カスタムドメインの設定**（オプション）
   - Settings → Domains
   - カスタムドメインを追加

2. **Analytics設定**（オプション）
   - Analytics タブで有効化
   - パフォーマンスを監視

3. **本番運用開始**
   - 実際のプロジェクトで使用
   - フィードバック収集

## 💰 コスト見積もり

### Vercel
- **Hobby**: 無料（個人利用）
- **Pro**: $20/月（商用利用推奨）

### API使用料（目安）
- **100バナー/月**: $15-30
- **1000バナー/月**: $170-320

## 📞 サポート

問題が解決しない場合：

- [GitHub Issues](https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues)
- [Vercel Support](https://vercel.com/support)
- [FAQ.md](./docs/FAQ.md)

---

**注意**: 初回デプロイには5-10分かかる場合があります。焦らず待ちましょう！
