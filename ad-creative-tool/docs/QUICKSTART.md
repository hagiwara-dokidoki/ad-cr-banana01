# クイックスタートガイド

5分で始める広告クリエイティブ自動生成ツール

## 🚀 最速スタート（ローカル開発）

### 前提条件

- Node.js 18.x 以上
- npm または yarn
- Git

### ステップ1: リポジトリのクローン

```bash
git clone https://github.com/hagiwara-dokidoki/ad-cr-banana01.git
cd ad-cr-banana01/ad-creative-tool
```

### ステップ2: 依存パッケージのインストール

```bash
npm install
```

### ステップ3: Playwrightのセットアップ

```bash
npm run playwright:install
```

### ステップ4: 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local`を編集して、以下のAPIキーを設定：

```env
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

#### APIキーの取得方法

**Google AI API Key**
1. [Google AI Studio](https://makersuite.google.com/app/apikey)にアクセス
2. 「Get API Key」をクリック
3. 新しいAPIキーを作成

**Anthropic API Key**
1. [Anthropic Console](https://console.anthropic.com/)にアクセス
2. アカウントを作成
3. API Keysから新しいキーを作成

### ステップ5: 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く

## 🎨 使い方

### Step 1: URL入力
1. 分析したいWebサイトのURLを入力
2. オプション設定（商材カテゴリ、トーン、NGワード）
3. 「解析を開始」をクリック

### Step 2: 素材確認
1. 自動抽出されたカラーパレットを確認
2. 画像ギャラリーから使用する画像を選択
3. 「次へ」をクリック

### Step 3: 分析レポート
1. AI生成された分析を確認
2. 必要に応じて編集
3. 「次へ」をクリック

### Step 4: コピー選択
1. 20個の生成されたキャッチコピーから選択
2. または自分でカスタム入力
3. 「次へ」をクリック

### Step 5: バナー生成
1. 「バナーを生成する」をクリック
2. Square/Verticalタブで確認
3. 個別または一括ダウンロード

## 📦 Vercelへのデプロイ（5分）

### ステップ1: Vercelアカウント作成

[Vercel](https://vercel.com)でGitHubアカウントと連携

### ステップ2: プロジェクトインポート

1. 「Import Project」を選択
2. GitHubリポジトリを選択
3. Root Directory: `ad-creative-tool`
4. Framework: Next.js（自動検出）

### ステップ3: 環境変数設定

以下をVercel環境変数に追加：

```
GOOGLE_AI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
```

### ステップ4: Blob Storage有効化

1. Storage → Create Database → Blob
2. 名前を入力して作成
3. `BLOB_READ_WRITE_TOKEN`が自動設定される

### ステップ5: デプロイ

「Deploy」をクリック → 完了！

## 🔧 トラブルシューティング

### Q: スクレイピングが失敗する

**A**: Playwrightが正しくインストールされているか確認
```bash
npm run playwright:install
```

### Q: AI生成でエラーが出る

**A**: APIキーが正しく設定されているか確認
```bash
# 環境変数を確認
cat .env.local
```

### Q: ビルドエラーが出る

**A**: 型チェックを実行
```bash
npm run type-check
npm run build
```

### Q: デモモードで試したい

**A**: 環境変数に追加
```env
NEXT_PUBLIC_DEMO_MODE=true
```

## 📚 次に読むべきドキュメント

- [README.md](../README.md) - プロジェクト概要
- [API.md](../API.md) - API仕様
- [DEPLOYMENT.md](../DEPLOYMENT.md) - 詳細なデプロイガイド
- [CONTRIBUTING.md](../CONTRIBUTING.md) - 貢献ガイド

## 💡 ヒント

### より良い結果を得るために

1. **明確なURLを使用**
   - LP（ランディングページ）が最適
   - 商品・サービスの情報が豊富なページを選ぶ

2. **カテゴリを指定**
   - 商材カテゴリを入力すると精度向上

3. **トーンを設定**
   - ブランドイメージに合ったトーンを選択

4. **複数回生成**
   - バナーは何度でも再生成可能
   - より良いバリエーションを探す

### パフォーマンス最適化

- 画像サイズは適切に（大きすぎない）
- 同時に複数のプロジェクトを実行しない
- APIレート制限に注意

## 🎯 サンプルURL

テスト用の推奨URL：

1. **SaaS**: https://www.notion.so
2. **EC**: https://www.apple.com
3. **メディア**: https://www.ted.com

## ✨ 次のステップ

1. 実際のプロジェクトで試す
2. 生成したバナーを評価
3. フィードバックをIssueで共有
4. 新機能のアイデアを提案

---

質問がある場合は[GitHub Issues](https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues)でお気軽にどうぞ！
