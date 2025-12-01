# API ドキュメント

広告クリエイティブ自動生成ツールのAPI仕様書

## 📋 目次

1. [スクレイピングAPI](#1-スクレイピングapi)
2. [カラー分析API](#2-カラー分析api)
3. [マーケティング分析API](#3-マーケティング分析api)
4. [コピー生成API](#4-コピー生成api)
5. [背景画像生成API](#5-背景画像生成api)
6. [バナー合成API](#6-バナー合成api)

---

## 1. スクレイピングAPI

### `POST /api/scrape`

Webサイトをスクレイピングしてコンテンツとメタデータを抽出します。

#### Request Body

```json
{
  "url": "https://example.com"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "title": "サイトタイトル",
    "description": "メタディスクリプション",
    "screenshot": "https://blob.vercel-storage.com/screenshot.png",
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    "textContent": {
      "h1": ["メインタイトル"],
      "h2": ["セクション1", "セクション2"],
      "paragraphs": ["本文1", "本文2"]
    }
  }
}
```

#### エラーレスポンス

```json
{
  "success": false,
  "error": "Invalid URL format"
}
```

#### 技術仕様
- **Timeout**: 60秒
- **使用技術**: Playwright (Chromium)
- **画像条件**: 横幅800px以上
- **最大画像数**: 20枚

---

## 2. カラー分析API

### `POST /api/analyze/colors`

スクリーンショット画像からカラーパレットを抽出します。

#### Request Body

```json
{
  "imageUrl": "https://blob.vercel-storage.com/screenshot.png"
}
```

#### Response

```json
{
  "success": true,
  "colors": {
    "main": "#2563EB",
    "accent": "#F59E0B",
    "base": "#F3F4F6"
  }
}
```

#### 技術仕様
- **Timeout**: 30秒
- **使用AI**: Gemini 1.5 Flash
- **カラーフォーマット**: Hex (#RRGGBB)

---

## 3. マーケティング分析API

### `POST /api/analyze/marketing`

Webサイトの情報からマーケティング分析を実行します。

#### Request Body

```json
{
  "title": "サイトタイトル",
  "description": "メタディスクリプション",
  "textContent": {
    "h1": ["メインタイトル"],
    "h2": ["セクション1", "セクション2"],
    "paragraphs": ["本文1", "本文2"]
  },
  "category": "SaaS"  // オプション
}
```

#### Response

```json
{
  "success": true,
  "analysis": {
    "competitors": [
      "競合A社 - 特徴の説明",
      "競合B社 - 特徴の説明"
    ],
    "strengths": [
      "強み1の詳細",
      "強み2の詳細",
      "強み3の詳細"
    ],
    "target": "ターゲットペルソナの詳細説明",
    "brandTone": "ブランドトーンの説明"
  }
}
```

#### 技術仕様
- **Timeout**: 30秒
- **使用AI**: Gemini 1.5 Flash
- **出力形式**: 構造化JSON

---

## 4. コピー生成API

### `POST /api/generate/copies`

マーケティング分析結果を基にキャッチコピーを生成します。

#### Request Body

```json
{
  "analysis": {
    "competitors": ["..."],
    "strengths": ["..."],
    "target": "...",
    "brandTone": "..."
  },
  "productName": "商品名",  // オプション
  "category": "SaaS",       // オプション
  "tone": "信頼感",         // オプション
  "ngWords": ["激安"],      // オプション
  "count": 20              // オプション (デフォルト: 20)
}
```

#### Response

```json
{
  "success": true,
  "copies": [
    "あなたの時間を、もっと大切なことに",
    "忙しいあなたに、最高の効率を",
    "品質で選ぶなら、やっぱりココ",
    "..."
  ]
}
```

#### 技術仕様
- **Timeout**: 30秒
- **使用AI**: Claude 3.5 Sonnet
- **生成数**: 10〜20個
- **文字数**: 15〜30文字推奨

---

## 5. 背景画像生成API

### `POST /api/generate/background`

AI画像生成により広告用の背景画像を作成します。

#### Request Body

```json
{
  "category": "SaaS",
  "tone": "信頼感と先進性",
  "size": "square"  // "square" | "vertical"
}
```

#### Response

```json
{
  "success": true,
  "imageUrl": "https://blob.vercel-storage.com/background.png"
}
```

#### 技術仕様
- **Timeout**: 60秒
- **使用AI**: Imagen 3 (Google AI Studio)
- **サイズ**:
  - square: 1080x1080
  - vertical: 1080x1920
- **フォーマット**: PNG

---

## 6. バナー合成API

### `GET /api/generate/banner`

背景画像にテキストを合成してバナーを生成します。

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| bg | string | Yes | 背景画像のURL（URLエンコード必須） |
| text | string | Yes | 表示するテキスト（URLエンコード必須） |
| color | string | No | テキストカラー（Hex形式、デフォルト: #FFFFFF） |
| size | string | No | バナーサイズ（square/vertical、デフォルト: square） |

#### Example Request

```
GET /api/generate/banner?bg=https%3A%2F%2Fexample.com%2Fbg.png&text=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E6%99%82%E9%96%93%E3%82%92&color=%23FFFFFF&size=square
```

#### Response

画像データ（PNG形式）を直接返します。

#### 技術仕様
- **Runtime**: Edge
- **使用技術**: @vercel/og (Satori)
- **フォント**: Noto Sans JP
- **エフェクト**: ドロップシャドウ、半透明背景座布団

---

## 🔒 認証とセキュリティ

現在、APIは認証なしで利用可能です。本番環境では以下の実装を推奨：

1. **API Key認証**
   - リクエストヘッダーに `X-API-Key` を要求
   - 環境変数で管理

2. **Rate Limiting**
   - IPアドレスベースの制限
   - Vercel Edge Configの利用

3. **CORS設定**
   - 許可するオリジンの制限
   - Next.jsのCORS設定

## 📊 レスポンス時間の目安

| API | 平均レスポンス時間 |
|-----|-------------------|
| スクレイピング | 5-10秒 |
| カラー分析 | 3-5秒 |
| マーケティング分析 | 5-8秒 |
| コピー生成 | 8-12秒 |
| 背景画像生成 | 10-15秒 |
| バナー合成 | 1-2秒 |

## ⚠️ 制限事項

1. **Function Timeout**: 最大60秒（Vercel設定）
2. **画像サイズ**: 最大10MB
3. **同時リクエスト**: Vercelプランにより異なる
4. **API使用量**: 各AIサービスの制限に準拠

## 🐛 エラーコード

| HTTP Status | 説明 |
|-------------|------|
| 200 | 成功 |
| 400 | 不正なリクエスト（パラメータエラー） |
| 500 | サーバーエラー（AI API エラー等） |
| 504 | タイムアウト |

## 📝 使用例

### JavaScriptでの使用例

```javascript
// スクレイピング
const scrapeResponse = await fetch('/api/scrape', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com' })
});
const scrapeData = await scrapeResponse.json();

// カラー分析
const colorResponse = await fetch('/api/analyze/colors', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ imageUrl: scrapeData.data.screenshot })
});
const colorData = await colorResponse.json();

// バナー生成（画像として取得）
const bannerUrl = `/api/generate/banner?bg=${encodeURIComponent(bgUrl)}&text=${encodeURIComponent(copyText)}&color=%23FFFFFF&size=square`;
```

---

詳細な実装については、`app/api/` ディレクトリ内の各ルートファイルを参照してください。
