# デプロイガイド

## 📦 Vercelへのデプロイ手順

### 1. Vercelアカウントの準備

1. [Vercel](https://vercel.com)にアクセスしてサインアップ（GitHubアカウントで連携推奨）
2. 新しいプロジェクトを作成

### 2. GitHubリポジトリの接続

1. Vercelダッシュボードから「Import Project」を選択
2. GitHubリポジトリ `ad-cr-banana01` を選択
3. Root Directoryを `ad-creative-tool` に設定
4. Framework Presetは「Next.js」を選択（自動検出されます）

### 3. 環境変数の設定

Vercelプロジェクト設定で以下の環境変数を追加：

#### 必須の環境変数

```
GOOGLE_AI_API_KEY=your_actual_google_ai_api_key
ANTHROPIC_API_KEY=your_actual_anthropic_api_key
```

#### API Keyの取得方法

**Google AI API Key (Gemini & Imagen)**
1. [Google AI Studio](https://makersuite.google.com/app/apikey)にアクセス
2. 「Get API Key」をクリック
3. 新しいAPIキーを作成
4. キーをコピーしてVercelに設定

**Anthropic API Key (Claude)**
1. [Anthropic Console](https://console.anthropic.com/)にアクセス
2. アカウントを作成（要クレジットカード登録）
3. API Keysセクションから新しいキーを作成
4. キーをコピーしてVercelに設定

### 4. Vercel Blob Storageの有効化

1. Vercelプロジェクトダッシュボードで「Storage」タブを選択
2. 「Create Database」→「Blob」を選択
3. データベース名を入力（例: `ad-creative-storage`）
4. 「Create」をクリック

**注意**: `BLOB_READ_WRITE_TOKEN`は自動的に環境変数として設定されます。

### 5. デプロイの実行

1. 「Deploy」ボタンをクリック
2. ビルドプロセスが完了するまで待機（約2-3分）
3. デプロイ完了後、公開URLが表示されます

### 6. デプロイ後の確認

1. 公開URLにアクセス
2. Step 1でテストURLを入力（例: `https://www.google.com`）
3. 各ステップが正常に動作することを確認

## 🔧 トラブルシューティング

### ビルドエラーが発生する場合

**症状**: TypeScriptエラーやビルド失敗

**解決策**:
```bash
# ローカルでビルドテスト
npm run build

# 型チェック
npx tsc --noEmit
```

### Playwrightが動作しない場合

**症状**: スクレイピングAPIでエラー

**解決策**:
Vercelの設定で以下を確認：
- Function Timeoutが60秒に設定されているか
- Regionが適切か（推奨: iad1）

### API Keyエラーが発生する場合

**症状**: 「API Key is required」エラー

**解決策**:
1. Vercelプロジェクト設定で環境変数を確認
2. 変数名が正確か確認（大文字小文字も含む）
3. デプロイを再実行

### Blob Storageエラーが発生する場合

**症状**: 画像アップロードでエラー

**解決策**:
1. Vercel Blob Storageが有効化されているか確認
2. `BLOB_READ_WRITE_TOKEN`が自動設定されているか確認
3. プロジェクトを再デプロイ

## 🚀 カスタムドメインの設定

1. Vercelプロジェクト設定で「Domains」タブを選択
2. カスタムドメインを追加
3. DNSレコードを設定（VercelのガイダンスESに従う）
4. SSL証明書が自動的に発行されます

## 📊 パフォーマンスモニタリング

Vercelは以下の機能を提供：
- **Analytics**: ページビュー、ユニークビジターの追跡
- **Speed Insights**: Core Web Vitalsの測定
- **Logs**: リアルタイムログの確認

プロジェクトダッシュボードからアクセス可能です。

## 💰 料金について

### Vercel料金プラン

- **Hobby（無料）**: 
  - 100GB帯域幅/月
  - Serverless Function実行時間制限あり
  - 個人プロジェクトに最適

- **Pro（$20/月）**:
  - 1TB帯域幅/月
  - Function実行時間60秒
  - 商用利用可能

### API料金

**Google AI Studio**
- Gemini 1.5 Flash: 無料枠あり（詳細は公式サイト確認）
- Imagen 3: 従量課金

**Anthropic Claude**
- Claude 3.5 Sonnet: 従量課金
- 価格詳細: [Anthropic Pricing](https://www.anthropic.com/pricing)

## 🔒 セキュリティベストプラクティス

1. **API Keyの管理**
   - 環境変数に保存（コードに直接書かない）
   - 定期的にローテーション
   - 権限を最小限に設定

2. **Rate Limiting**
   - 必要に応じてAPIリクエストの制限を実装
   - Vercel Edge Configを使用した制御

3. **エラーログの監視**
   - Vercelのログ機能で異常を検知
   - 必要に応じてSentryなどの監視ツールを導入

## 📝 デプロイ後のチェックリスト

- [ ] 公開URLにアクセス可能
- [ ] 環境変数が正しく設定されている
- [ ] Blob Storageが有効化されている
- [ ] Step 1: URL入力が動作する
- [ ] Step 2: スクレイピングが成功する
- [ ] Step 3: AI分析が動作する
- [ ] Step 4: コピー生成が成功する
- [ ] Step 5: バナー生成・ダウンロードが動作する
- [ ] エラーハンドリングが適切に機能する
- [ ] レスポンス時間が許容範囲内
- [ ] モバイルでも正常に表示される

## 🎯 次のステップ

デプロイが完了したら：
1. 実際のLPでテスト実行
2. ユーザーフィードバックの収集
3. パフォーマンスの最適化
4. 新機能の追加検討

---

質問や問題がある場合は、GitHubのIssuesでお知らせください！
