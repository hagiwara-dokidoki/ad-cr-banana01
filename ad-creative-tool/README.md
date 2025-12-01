# 広告クリエイティブ自動生成ツール

**バージョン:** 1.0  
**概要:** URL入力のみで、サイト分析・競合リサーチ・コピー作成・画像生成を一気通貫で行うWebツール

## 🎯 主な機能

- 🔍 **Webサイト自動スクレイピング** - Playwrightによる正確なDOM解析
- 🎨 **カラーパレット抽出** - Gemini AIによるブランドカラー分析
- 📊 **マーケティング分析** - 競合分析・USP抽出・ターゲット分析
- ✍️ **キャッチコピー自動生成** - Claude 3.5 Sonnetによる高品質な日本語コピー（最大20案）
- 🖼️ **バナー画像生成** - 背景AI生成 + プログラム文字合成のハイブリッド方式
- 📐 **複数サイズ対応** - Square (1080x1080) / Vertical (1080x1920)

## 🛠️ 技術スタック

| レイヤー | 技術 / サービス |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes (Serverless Functions) |
| **Scraping** | Playwright |
| **AI Analysis** | Gemini 1.5 Flash (Google AI Studio API) |
| **Copywriting** | Claude 3.5 Sonnet (Anthropic API) |
| **Image Gen** | Imagen 3 (Google AI Studio API) |
| **Compositing** | @vercel/og (Satori) |
| **Storage** | Vercel Blob |
| **Deployment** | Vercel |

## 📋 必要条件

- Node.js 18以上
- npm / yarn / pnpm / bun
- 以下のAPIキー:
  - Google AI Studio API Key（Gemini & Imagen用）
  - Anthropic API Key（Claude用）
  - Vercel Blob Storage Token

## 🚀 セットアップ

### 1. リポジトリのクローンと依存関係のインストール

```bash
cd ad-creative-tool
npm install
```

### 2. 環境変数の設定

`.env.local.example`をコピーして`.env.local`を作成:

```bash
cp .env.local.example .env.local
```

`.env.local`に以下のAPIキーを設定:

```env
# Google AI Studio API (Gemini & Imagen)
GOOGLE_AI_API_KEY=your_google_ai_studio_api_key_here

# Anthropic API (Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# Base URL (optional)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### APIキーの取得方法

**Google AI Studio API Key:**
1. [Google AI Studio](https://makersuite.google.com/app/apikey)にアクセス
2. 「Create API Key」をクリック
3. 生成されたAPIキーをコピー

**Anthropic API Key:**
1. [Anthropic Console](https://console.anthropic.com/)にアクセス
2. アカウント作成/ログイン
3. 「API Keys」セクションで新しいキーを作成

**Vercel Blob Token:**
1. Vercelプロジェクトダッシュボードにアクセス
2. 「Storage」タブから「Blob」を選択
3. トークンを生成

### 3. Playwrightのセットアップ

Playwrightブラウザをインストール:

```bash
npx playwright install chromium
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 📖 使い方

### Step 1: URL入力
- 広告クリエイティブを作成したいWebサイトのURLを入力
- オプションで商材カテゴリ、トーン、NGワードを設定

### Step 2: 解析・抽出
- 自動でWebサイトをスクレイピング
- スクリーンショット撮影、カラーパレット抽出、画像収集
- 使用する画像を選択

### Step 3: マーケティング分析
- AI が競合分析、USP抽出、ターゲット分析を実行
- 結果を確認・編集可能

### Step 4: コピー生成
- Claude が最大20個のキャッチコピーを自動生成
- リストから選択、または独自のコピーを入力

### Step 5: バナー生成
- Square (1080x1080) / Vertical (1080x1920) サイズでバナー生成
- 各サイズ5枚ずつ自動生成
- ダウンロード可能

## 🏗️ プロジェクト構造

```
ad-creative-tool/
├── app/
│   ├── api/                    # API Routes
│   │   ├── scrape/            # Webスクレイピング
│   │   ├── analyze-colors/    # カラー分析
│   │   ├── analyze-marketing/ # マーケティング分析
│   │   ├── generate-copies/   # コピー生成
│   │   ├── generate-background/ # 背景画像生成
│   │   └── compose-banner/    # バナー合成
│   ├── layout.tsx             # ルートレイアウト
│   └── page.tsx               # メインページ
├── components/
│   ├── steps/                 # ステップコンポーネント
│   │   ├── Step1Input.tsx
│   │   ├── Step2Extraction.tsx
│   │   ├── Step3Analysis.tsx
│   │   ├── Step4Copywriting.tsx
│   │   └── Step5BannerGeneration.tsx
│   ├── ui/                    # UIコンポーネント
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── ProgressSteps.tsx      # プログレスバー
├── lib/
│   ├── ai/                    # AI統合
│   │   ├── gemini.ts
│   │   ├── claude.ts
│   │   └── imagen.ts
│   ├── scraper/
│   │   └── playwright-scraper.ts
│   └── config.ts              # 設定
├── types/
│   └── project.ts             # TypeScript型定義
├── .env.local.example         # 環境変数サンプル
├── package.json
└── README.md
```

## 🔧 設定

### カスタマイズ可能な設定 (`lib/config.ts`)

- `maxCopyCandidates`: 生成するコピー案の最大数（デフォルト: 20）
- `maxBannersPerSize`: サイズごとのバナー生成数（デフォルト: 10）
- `maxImagesExtract`: 抽出する画像の最大数（デフォルト: 20）
- `minImageWidth`: 抽出する画像の最小幅（デフォルト: 800px）

## 🚢 デプロイ

### Vercelへのデプロイ

1. Vercelアカウントを作成/ログイン
2. GitHubリポジトリと連携
3. 環境変数を設定
4. デプロイ

```bash
npm install -g vercel
vercel
```

または、Vercel Dashboard から直接デプロイ可能

### 環境変数の設定

Vercel Dashboardの「Settings」→「Environment Variables」で以下を設定:

- `GOOGLE_AI_API_KEY`
- `ANTHROPIC_API_KEY`
- `BLOB_READ_WRITE_TOKEN`

## 📝 注意事項

### Imagen 3について

現在、Google AI Studio APIでのImagen 3サポートは限定的です。本実装では:

1. **プレースホルダー画像** - 開発時はSVGグラデーション画像を使用
2. **外部サービス統合** - 本番環境では以下のサービスを検討:
   - DALL-E 3 (OpenAI)
   - Stable Diffusion (Stability AI)
   - Midjourney API
   - Adobe Firefly

`lib/ai/imagen.ts`を編集して、適切な画像生成サービスと統合してください。

### パフォーマンス

- スクレイピング: 約10-30秒
- カラー分析: 約5-10秒
- マーケティング分析: 約10-15秒
- コピー生成: 約10-20秒
- バナー生成: 各バナー約30-60秒

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Google AI Studio](https://makersuite.google.com/)
- [Anthropic Claude](https://www.anthropic.com/)
- [Playwright](https://playwright.dev/)

---

Made with ❤️ for better ad creatives
