# アーキテクチャドキュメント

## 📐 システムアーキテクチャ

### 全体構成

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Components (App Router)            │  │
│  │  • ProjectWizard                                      │  │
│  │  • Step1Input → Step2Extraction → Step3Analysis      │  │
│  │  • Step4Copywriting → Step5BannerGeneration          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                             │
                             ↓ API Calls
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Next.js API Routes)              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  /api/scrape          - Playwright スクレイピング    │  │
│  │  /api/analyze/colors  - Gemini カラー抽出           │  │
│  │  /api/analyze/marketing - Gemini マーケ分析         │  │
│  │  /api/generate/copies - Claude コピー生成           │  │
│  │  /api/generate/background - Imagen 背景生成         │  │
│  │  /api/generate/banner - Vercel OG テキスト合成      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
            │              │              │
            ↓              ↓              ↓
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │ Playwright│   │  AI APIs  │   │  Vercel  │
    │  Browser  │   │  • Gemini │   │   Blob   │
    │ Automation│   │  • Claude │   │ Storage  │
    │           │   │  • Imagen │   │          │
    └──────────┘   └──────────┘   └──────────┘
```

## 🔄 データフロー

### 1. スクレイピングフロー

```
User Input (URL)
    ↓
Playwright Browser Launch
    ↓
Page Navigation & Screenshot
    ↓
Extract: Images, Text, Meta
    ↓
Upload Screenshot to Vercel Blob
    ↓
Return: {screenshot, images, textContent}
```

### 2. カラー分析フロー

```
Screenshot URL
    ↓
Fetch Image Data
    ↓
Convert to Base64
    ↓
Gemini Vision API
    ↓
Parse JSON Response
    ↓
Return: {main, accent, base} colors
```

### 3. マーケティング分析フロー

```
Site Data (title, description, text)
    ↓
Construct Prompt
    ↓
Gemini Text API
    ↓
Parse Structured JSON
    ↓
Return: {competitors, strengths, target, brandTone}
```

### 4. コピー生成フロー

```
Analysis Data + Options
    ↓
Construct Creative Prompt
    ↓
Claude API (temperature: 0.8)
    ↓
Extract Numbered List
    ↓
Return: [copy1, copy2, ..., copy20]
```

### 5. バナー生成フロー

```
Background Generation:
  Category + Tone + Size
      ↓
  Imagen API
      ↓
  Upload to Vercel Blob
      ↓
  Return Background URL

Text Composition:
  Background URL + Copy + Color
      ↓
  @vercel/og (Edge Runtime)
      ↓
  Render with Noto Sans JP
      ↓
  Return Final Banner (PNG)
```

## 🏗️ コンポーネント構成

### Frontend Components

```
components/
├── ProjectWizard.tsx           # メインウィザード管理
├── ProgressSteps.tsx           # ステップインジケーター
└── steps/
    ├── Step1Input.tsx          # URL入力・オプション
    ├── Step2Extraction.tsx     # カラー・画像選択
    ├── Step3Analysis.tsx       # 分析レポート表示
    ├── Step4Copywriting.tsx    # コピー選択
    └── Step5BannerGeneration.tsx # バナー生成・DL
```

### Backend Modules

```
lib/
├── ai/
│   ├── gemini.ts              # Gemini API統合
│   │   • extractColors()
│   │   • analyzeMarketing()
│   │   • generateBackground()
│   └── claude.ts              # Claude API統合
│       • generateCopies()
│       • refineCopy()
├── scraper/
│   └── playwright-scraper.ts  # Playwright統合
│       • WebsiteScraper class
│       • scrape()
│       • extractImages()
│       • extractText()
└── config.ts                  # 設定管理
```

### Type Definitions

```
types/
└── project.ts
    • ProjectState
    • ColorPalette
    • AnalysisResult
    • Banner
    • API Response Types
```

## 🔐 セキュリティ設計

### API Key Management

```
Environment Variables (Vercel)
    ↓
Server-Side Only Access
    ↓
Never Exposed to Client
```

### Data Privacy

- **ユーザーデータ**: セッションベース、永続化なし
- **生成画像**: Vercel Blob（public access）
- **スクレイピングデータ**: 一時的、リクエスト後破棄

### Rate Limiting

現在未実装。今後の実装案：

```typescript
// lib/rate-limiter.ts
import { Redis } from '@upstash/redis';

export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
): Promise<boolean> {
  // Implementation with Redis
}
```

## 🚀 パフォーマンス最適化

### 1. API レスポンス

| API | Target | Strategy |
|-----|--------|----------|
| Scraping | <10s | Playwright optimization |
| Color Analysis | <5s | Gemini Flash model |
| Marketing Analysis | <8s | Prompt optimization |
| Copy Generation | <12s | Batched generation |
| Background Gen | <15s | Parallel processing |
| Banner Composition | <2s | Edge runtime |

### 2. Frontend Optimization

- **Code Splitting**: Dynamic imports for steps
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for heavy components

### 3. Caching Strategy

```typescript
// Future implementation
interface CacheStrategy {
  scraping: 'none';           // 毎回新規取得
  colorAnalysis: '1 hour';    // 同じURLは1時間キャッシュ
  marketing: '1 hour';        // 同じサイトは1時間キャッシュ
  copies: 'none';             // 毎回新規生成
  backgrounds: 'permanent';   // Blob storage
}
```

## 📊 監視とログ

### ログレベル

```typescript
enum LogLevel {
  ERROR = 'error',   // エラー発生時
  WARN = 'warn',     // 警告（リトライ可能）
  INFO = 'info',     // 通常動作
  DEBUG = 'debug'    // 開発時詳細
}
```

### メトリクス収集（推奨）

```
Vercel Analytics:
- Page Views
- Unique Visitors
- Core Web Vitals

Custom Metrics:
- API Response Times
- AI Generation Success Rate
- Banner Download Count
```

## 🔧 開発環境

### ローカル開発

```bash
# 開発サーバー
npm run dev          # localhost:3000

# 型チェック
npm run type-check   # TypeScript

# ビルド
npm run build        # Production build
```

### 環境変数

```env
# Development (.env.local)
GOOGLE_AI_API_KEY=...
ANTHROPIC_API_KEY=...
NEXT_PUBLIC_DEMO_MODE=true

# Production (Vercel)
GOOGLE_AI_API_KEY=...
ANTHROPIC_API_KEY=...
BLOB_READ_WRITE_TOKEN=auto
```

## 🧪 テスト戦略（今後の実装）

### Unit Tests

```typescript
// lib/ai/__tests__/gemini.test.ts
describe('extractColors', () => {
  it('should extract valid hex colors', async () => {
    const colors = await extractColors(mockImageUrl);
    expect(colors.main).toMatch(/^#[0-9A-F]{6}$/i);
  });
});
```

### Integration Tests

```typescript
// app/api/__tests__/scrape.test.ts
describe('POST /api/scrape', () => {
  it('should return scraped data', async () => {
    const response = await fetch('/api/scrape', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' })
    });
    expect(response.status).toBe(200);
  });
});
```

### E2E Tests

```typescript
// e2e/banner-generation.spec.ts
test('complete banner generation flow', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[name="url"]', 'https://example.com');
  await page.click('button[type="submit"]');
  // ... test all steps
});
```

## 📈 スケーラビリティ

### 現在の制限

- **Vercel Serverless**: 10秒（Hobby）/ 60秒（Pro）
- **Concurrent Requests**: プランによる
- **Blob Storage**: 無制限（従量課金）

### スケーリング戦略

1. **Queue System**: 長時間処理をキューに
2. **CDN**: 生成画像のキャッシング
3. **Database**: プロジェクト永続化
4. **Microservices**: 各AI処理を分離

## 🔄 CI/CD パイプライン

```yaml
# .github/workflows/ci.yml (推奨)
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
```

## 📝 今後の改善案

1. **State Management**: Zustand/Jotai導入
2. **Real-time Updates**: WebSocket for progress
3. **Batch Processing**: 複数URLの一括処理
4. **Analytics Dashboard**: 使用統計の可視化
5. **A/B Testing**: バナーパフォーマンス予測

---

詳細な実装については各ソースコードとドキュメントを参照してください。
