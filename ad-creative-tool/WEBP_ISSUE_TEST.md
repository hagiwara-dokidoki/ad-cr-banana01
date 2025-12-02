# WebP画像問題のテスト

## 🔍 問題の特定

Console ログから、バナーURLに背景画像が正しく渡されていることが確認できました：

```
[Banner 0] Full URL with bg: /api/compose-banner?...&bg=https%3A%2F%2Ffuwel.s3-accelerate.amazonaws.com%2Fimg%2F281%2F7c74c306-460e-4d9f-b01f-52e1ed95132c.webp
```

### 画像URL
```
https://fuwel.s3-accelerate.amazonaws.com/img/281/7c74c306-460e-4d9f-b01f-52e1ed95132c.webp
```

### 問題点

**画像形式**: **WebP** (.webp)

**可能性**: `@vercel/og` が WebP 形式をサポートしていない、または処理に失敗している

---

## ✅ 対処方法

### テスト1: Unsplash 画像を強制使用

**Commit**: `c173e25`

抽出画像（WebP）の代わりに、Unsplash の JPEG 画像を強制的に使用：

```typescript
// 常にテスト画像を使用（WebP画像の問題を回避）
const testImages = [
  'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1080',
  'https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=1080',
  'https://images.unsplash.com/photo-1661956602868-6ae368943878?w=1080',
];
backgroundImageUrl = testImages[i % testImages.length];
```

---

## 🧪 テスト手順

### 1. Vercel デプロイ確認

```
https://vercel.com/dashboard
→ ad-cr-banana01
→ Deployments
→ Commit c173e25 が「Ready」になるまで待つ（1〜3分）
```

### 2. バナー生成テスト

**URL**: `https://ad-cr-banana01.vercel.app`

1. 任意のURLを入力（例: `https://www.apple.com`）
2. Step 1〜4を進める
3. Step 5で「Squareバナー生成」をクリック

### 3. 結果確認

#### ケース A: Unsplash 画像が表示される

**結論**: WebP 画像が原因

**対処**: 抽出画像を WebP から JPEG/PNG に変換する処理を追加

#### ケース B: それでも画像が表示されない

**結論**: `@vercel/og` の外部画像読み込み自体に問題

**対処**: 別のアプローチを検討（Canvas API、別の画像合成ライブラリなど）

---

## 📊 期待される動作

### テスト成功時

```
Step 5: バナー生成
   ↓
Console ログ:
[Banner 0] Using test image (forced): https://images.unsplash.com/photo-1661956602116...
   ↓
compose-banner API:
[compose-banner] Using external image: https://images.unsplash.com/...
[compose-banner] Image format: undefined (JPEG)
   ↓
結果:
✅ Unsplash の画像が背景に表示される
✅ テキストがオーバーレイ表示される
✅ 画像が真っ黒ではない
```

---

## 🔧 根本原因の可能性

### 1. WebP フォーマット非対応

**@vercel/og の制限**:
- WebP 画像を `<img src="...">` で処理できない可能性
- Edge Runtime での WebP デコーダーの制限

**対処方法**:
- 画像を JPEG/PNG に変換
- または別の画像合成方法を使用

### 2. 画像読み込みタイムアウト

**可能性**:
- 外部画像の読み込みが30秒のタイムアウトを超える
- S3-accelerate URL の遅延

**対処方法**:
- 画像をVercel Blobに事前キャッシュ
- またはCDN経由で提供

### 3. CORS 問題

**可能性**:
- S3バケットのCORS設定が不適切
- Edge Runtimeからのアクセスが拒否される

**対処方法**:
- S3のCORS設定を確認
- または画像をプロキシ経由で提供

---

## 🎯 次のステップ

### 短期対応（テスト中）

1. ✅ Unsplash 画像を使用してテスト（Commit `c173e25`）
2. 結果を確認
3. 問題を特定

### 長期対応（根本解決）

#### パターン1: WebP が原因の場合

```typescript
// 画像変換APIを実装
async function convertWebPToJPEG(webpUrl: string): Promise<string> {
  // Vercel Blob に JPEG として保存
  // または変換サービスを使用
}
```

#### パターン2: @vercel/og の制限の場合

```typescript
// 代替案: Canvas API または Satori を直接使用
// または: 画像合成を別のサービスで実行
```

---

## 📝 デバッグ情報

### バナーURL（問題あり）

```
https://ad-cr-banana01.vercel.app/api/compose-banner?text=%E6%88%90%E5%8A%9F%E3%81%B8%E3%81%AE%E7%AC%AC%E4%B8%80%E6%AD%A9%E3%82%92%E3%81%93%E3%81%93%E3%81%8B%E3%82%89+-+20&color=%23F59E0B&size=square&category=business&bg=https%3A%2F%2Ffuwel.s3-accelerate.amazonaws.com%2Fimg%2F281%2F7c74c306-460e-4d9f-b01f-52e1ed95132c.webp
```

### 背景画像URL（WebP）

```
https://fuwel.s3-accelerate.amazonaws.com/img/281/7c74c306-460e-4d9f-b01f-52e1ed95132c.webp
```

### 直接テスト

ブラウザでこのURLを開いて、画像が生成されるか確認：
```
https://ad-cr-banana01.vercel.app/api/compose-banner?text=Test&color=%23F59E0B&size=square&category=business&bg=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1661956602116-aa6865609028%3Fw%3D1080
```

---

## ✨ まとめ

### 現在の状態

- ✅ バナーURLは正しく生成されている
- ✅ 背景画像URLは正しく渡されている
- ❓ WebP 画像が原因の可能性が高い
- 🔄 Unsplash 画像（JPEG）でテスト中

### 次のアクション

1. **Vercel デプロイ完了を待つ**（1〜3分）
2. **Unsplash 画像でバナー生成テスト**
3. **結果を確認**:
   - 画像が表示される → WebP が原因
   - 画像が表示されない → 別の問題

---

**Commit**: `c173e25`  
**Status**: テスト中  
**Vercel**: 自動デプロイ中  
**テストURL**: `https://ad-cr-banana01.vercel.app`

**デプロイ完了後、バナー生成をテストして、Unsplash 画像が表示されるか確認してください！**
