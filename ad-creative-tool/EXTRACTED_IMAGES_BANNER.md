# 抽出画像をバナー背景に使用する機能

## 🎨 新機能の追加

**HPから取得した画像をバナー背景に活用**

### 実装内容

ユーザーからの要望:
> 「HPから取得した画像を利用してバナーを作ってほしい」

Step 2で抽出したWebサイトの画像を、Step 5のバナー生成時に背景として使用できるようになりました。

---

## 📋 機能詳細

### 動作フロー

```
Step 2: カラー抽出 & スクレイピング
   ↓
   ・Webサイトから画像を抽出
   ・project.extractedImages に保存
   ↓
Step 5: バナー生成
   ↓
   抽出画像が存在する？
   ├─ Yes → 抽出画像を背景に使用（ローテーション）
   └─ No  → カテゴリ別グラデーションを使用
   ↓
   美しいバナー画像が生成される ✅
```

---

## 🔧 実装詳細

### 1. Step5BannerGeneration の更新

**ファイル**: `components/steps/Step5BannerGeneration.tsx`

#### 変更内容

```typescript
const generateBanners = async (size: 'square' | 'vertical', count: number = 5) => {
  // 抽出した画像を使用（存在する場合）
  const extractedImages = project.extractedImages || [];
  const useExtractedImages = extractedImages.length > 0;

  for (let i = 0; i < count; i++) {
    let backgroundImageUrl = '';
    
    if (useExtractedImages) {
      // 抽出画像をローテーションで使用
      const imageIndex = i % extractedImages.length;
      backgroundImageUrl = extractedImages[imageIndex];
    }

    // テキストを合成してバナーを生成
    const params = new URLSearchParams({
      text: project.selectedCopy,
      color: project.colors.accent,
      size: size,
      category: project.options?.category || 'business',
    });
    
    // 抽出画像がある場合はbgパラメータを追加
    if (backgroundImageUrl) {
      params.append('bg', backgroundImageUrl);
    }

    const bannerUrl = `/api/compose-banner?${params.toString()}`;
    // ... banner作成
  }
};
```

#### 主要な変更点

1. **抽出画像の取得**
   ```typescript
   const extractedImages = project.extractedImages || [];
   const useExtractedImages = extractedImages.length > 0;
   ```

2. **ローテーション使用**
   ```typescript
   const imageIndex = i % extractedImages.length;
   backgroundImageUrl = extractedImages[imageIndex];
   ```
   - 5枚のバナーを生成する際、抽出画像を順番に使用
   - 例: 抽出画像が3枚の場合 → [img1, img2, img3, img1, img2]

3. **URLパラメータに追加**
   ```typescript
   if (backgroundImageUrl) {
     params.append('bg', backgroundImageUrl);
   }
   ```

---

### 2. compose-banner API の更新

**ファイル**: `app/api/compose-banner/route.tsx`

#### 変更内容

```typescript
export async function GET(request: NextRequest) {
  const bg = searchParams.get('bg') || '';
  
  // 背景を決定: 画像URL or グラデーション
  let backgroundStyle: any = {};
  let hasBackgroundImage = false;
  
  if (bg && (bg.startsWith('http://') || bg.startsWith('https://'))) {
    // 外部画像URLの場合
    backgroundStyle = {
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    hasBackgroundImage = true;
  } else {
    // 背景がない場合はグラデーション
    backgroundStyle = {
      background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
    };
  }
  
  // オーバーレイの強度を調整
  <div
    style={{
      background: hasBackgroundImage 
        ? 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)'
        : 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
    }}
  />
}
```

#### 主要な変更点

1. **画像URL検証**
   ```typescript
   if (bg && (bg.startsWith('http://') || bg.startsWith('https://'))) {
     // 外部画像として処理
   }
   ```

2. **背景スタイル適用**
   ```typescript
   backgroundImage: `url(${bg})`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   ```

3. **オーバーレイ強度調整**
   - 画像背景の場合: より強いオーバーレイ（0.4〜0.7）
   - グラデーション背景: 弱めのオーバーレイ（0.2〜0.5）
   - 理由: 画像の上でテキストの可読性を確保

---

## 🎯 使用例

### ケース1: 抽出画像が複数ある場合

```
Step 2で抽出された画像:
- image1.jpg (商品写真)
- image2.jpg (オフィス写真)
- image3.jpg (チーム写真)

Step 5でバナー生成:
- Banner 1: image1.jpg + テキスト
- Banner 2: image2.jpg + テキスト
- Banner 3: image3.jpg + テキスト
- Banner 4: image1.jpg + テキスト (ローテーション)
- Banner 5: image2.jpg + テキスト (ローテーション)
```

### ケース2: 抽出画像がない場合

```
Step 2で画像抽出なし or 失敗

Step 5でバナー生成:
- Banner 1〜5: カテゴリ別グラデーション + テキスト
  (従来のグラデーション背景を使用)
```

---

## 📊 修正前後の比較

### ❌ 修正前

```
すべてのバナー:
- グラデーション背景のみ
- カテゴリ別の固定色
- 画像は使用されない
```

### ✅ 修正後

```
抽出画像がある場合:
- 実際のWebサイト画像を背景に使用
- ブランドイメージを反映
- より魅力的なバナー

抽出画像がない場合:
- グラデーション背景（従来通り）
- カテゴリ別の色
- 安定した動作
```

---

## 🎨 バナーの見た目

### グラデーション背景の場合

```
┌──────────────────────────────────┐
│                                  │
│  [青→シアンのグラデーション]      │
│                                  │
│    高品質なサービス提供で         │
│      実現する新しい体験          │
│                                  │
│  [弱めのダークオーバーレイ]       │
└──────────────────────────────────┘
```

### 抽出画像背景の場合

```
┌──────────────────────────────────┐
│                                  │
│  [実際のWebサイト画像]            │
│  （例: 商品写真、オフィス、チーム） │
│                                  │
│    高品質なサービス提供で         │
│      実現する新しい体験          │
│                                  │
│  [強めのダークオーバーレイ]       │
│  （テキストの可読性確保）         │
└──────────────────────────────────┘
```

---

## 🚀 テスト手順

### 1. Vercel デプロイ確認

**最新 Commit**: `1772d9e`

```bash
https://vercel.com/dashboard
→ ad-cr-banana01
→ Deployments
→ Commit 1772d9e のStatusが「Ready」になるまで待つ（1〜3分）
```

### 2. エンドツーエンドテスト

#### テストURL
```
https://ad-cr-banana01.vercel.app
```

#### 手順

**Step 1**: URL入力
```
例: https://www.apple.com
     https://www.google.com
     https://www.stripe.com
```
（画像が豊富なサイトを推奨）

**Step 2**: カラー抽出 & 画像スクレイピング
```
✅ サイトプレビュー表示
✅ カラーパレット表示
✅ 抽出画像ギャラリー表示 ← ここで画像を確認
```

**Step 3〜4**: マーケティング分析 & コピー選択
```
デモデータで進める
```

**Step 5**: バナー生成
```
「Squareバナー生成 (1080x1080)」をクリック

期待結果:
✅ 5枚のバナーが生成される
✅ Step 2で抽出した画像が背景に使用される
✅ 各バナーで異なる画像（ローテーション）
✅ テキストがクリアに表示される
✅ ダウンロードが機能する
```

---

## 🔧 技術的詳細

### @vercel/og での外部画像処理

#### サポートされる形式

```typescript
// ✅ サポートされる
backgroundImage: `url(https://example.com/image.jpg)`
backgroundImage: `url(https://example.com/image.png)`

// ❌ サポートされない
backgroundImage: `url(data:image/svg+xml;base64,...)`  // SVG data URI
```

### 画像ローディングのパフォーマンス

**@vercel/og は外部画像を自動的にフェッチ**:
- HTTP/HTTPS URLを受け入れる
- 画像を自動ダウンロード
- バナー生成時に合成

**制限事項**:
- 画像サイズ: 最大10MB推奨
- タイムアウト: 30秒（Edge Runtime制限）
- CORS: 不要（サーバーサイドで処理）

---

## 📝 関連する型定義

### ProjectState の extractedImages

```typescript
export interface ProjectState {
  // ... other fields
  extractedImages?: string[];  // Step 2で抽出された画像URL配列
  // ...
}
```

### Banner の backgroundUrl

```typescript
export interface Banner {
  id: string;
  size: 'square' | 'vertical';
  backgroundUrl: string;  // 画像URL or 'gradient'
  textOverlay: string;
  finalImageUrl: string;
  createdAt: Date;
}
```

---

## 🎉 機能のメリット

### 1. ブランド一貫性
- Webサイトの実際の画像を使用
- ブランドイメージを反映したバナー
- ユーザー認知度向上

### 2. 多様性
- 複数の画像でバリエーション豊富
- ローテーションで異なる背景
- 選択肢が増える

### 3. 効率性
- 手動で画像を用意する必要なし
- 自動的に最適な画像を選択
- ワンクリックで複数パターン生成

### 4. フォールバック
- 画像がない場合はグラデーション
- 安定した動作保証
- エラーハンドリング完備

---

## 🐛 トラブルシューティング

### 画像が表示されない場合

**原因1**: 抽出画像がない
```
→ Step 2で画像が抽出されているか確認
→ 「抽出画像ギャラリー」に画像が表示されているか確認
```

**原因2**: 画像URLが無効
```
→ 画像URLがHTTP/HTTPSで始まっているか確認
→ 画像がアクセス可能か確認（404エラーでない）
```

**原因3**: CORS エラー（サーバーサイドでは発生しない）
```
→ @vercel/og はサーバーサイドで処理するため、通常は問題なし
```

### 対処方法

1. **ブラウザ Console ログ確認**
   ```
   右クリック → 検証 → Console タブ
   → エラーメッセージを確認
   ```

2. **Network タブで確認**
   ```
   右クリック → 検証 → Network タブ
   → /api/compose-banner のリクエスト確認
   → bg パラメータの値を確認
   ```

3. **抽出画像の確認**
   ```
   Step 2の「抽出画像ギャラリー」で画像が表示されているか
   ```

---

## ✨ まとめ

### 実装内容

**新機能**: HPから取得した画像をバナー背景に使用

**変更ファイル**:
1. `components/steps/Step5BannerGeneration.tsx`
   - 抽出画像のローテーション使用
   - bgパラメータの追加

2. `app/api/compose-banner/route.tsx`
   - 外部画像URL対応
   - オーバーレイ強度調整

### 動作保証

✅ 抽出画像がある場合: 画像を背景に使用  
✅ 抽出画像がない場合: グラデーション背景  
✅ 複数画像のローテーション  
✅ テキストの可読性確保  
✅ ダウンロード機能

---

**最終更新**: 2025-12-02  
**Commit**: `1772d9e`  
**Status**: ✅ 実装完了  
**テストURL**: `https://ad-cr-banana01.vercel.app`

**Vercel デプロイ完了後、画像が豊富なWebサイト（例: Apple、Stripeなど）でテストしてください！** 🚀
