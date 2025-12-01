# 🔧 Vercel 環境変数エラーの解決

## 🚨 エラー内容

```
Environment Variable "NEXT_PUBLIC_BASE_URL" references Secret "next-public-base-url", 
which does not exist.
```

---

## ✅ 解決完了！

このエラーは **すでに修正済み** です。

### 何が問題だったか？

- Vercelが `NEXT_PUBLIC_BASE_URL` というSecretを探していた
- しかし、この環境変数は実際には **不要**
- Vercelは自動的に `VERCEL_URL` を提供する

### 修正内容

**コード側の対応：**
```typescript
// lib/config.ts
baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 
         (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
```

これにより：
- ✅ `NEXT_PUBLIC_BASE_URL` が設定されていれば使用
- ✅ なければVercelの `VERCEL_URL` を自動使用
- ✅ ローカル開発では `localhost:3000` を使用

---

## 🎯 Vercelで行うこと

### **オプション1: 環境変数を削除（推奨）**

`NEXT_PUBLIC_BASE_URL` は不要なので削除：

```
1. Vercel Dashboard > Settings > Environment Variables
2. "NEXT_PUBLIC_BASE_URL" を探す
3. 右側の "..." > "Remove"
4. 確認して削除
```

### **オプション2: 正しい値を設定**

残したい場合は以下のように設定：

```
Settings > Environment Variables

Key: NEXT_PUBLIC_BASE_URL
Value: https://ad-cr-banana01.vercel.app
Environment: Production のみ
```

**Preview と Development では削除してください**

---

## 📋 必要な環境変数（最小構成）

実際に必要なのは以下の **2つだけ**：

```bash
✅ GOOGLE_AI_API_KEY=AIzaSy...
✅ ANTHROPIC_API_KEY=sk-ant-...
```

### Vercelで自動設定される変数：

```bash
VERCEL_URL              # Vercelが自動提供
BLOB_READ_WRITE_TOKEN   # Blob Storage有効化で自動設定
```

---

## 🔄 再デプロイ手順

修正を反映するため、再デプロイが必要です：

```
1. コードの変更をGitHubにプッシュ（自動的に行われます）
2. Vercel > Deployments > 自動デプロイを待つ

または手動で：
Deployments > 最新 > ... > Redeploy
```

---

## ✅ 最終的な環境変数設定

Vercel > Settings > Environment Variables で以下のようになっているはず：

```
GOOGLE_AI_API_KEY         (あなたが設定)
ANTHROPIC_API_KEY         (あなたが設定)
BLOB_READ_WRITE_TOKEN     (Blobで自動設定)
VERCEL_URL                (Vercelが自動提供)
```

`NEXT_PUBLIC_BASE_URL` は **不要** です。

---

## 🎉 期待される結果

再デプロイ後：

```
✓ ビルド成功
✓ デプロイ成功
✓ アプリケーションが正常に動作
✓ 自動的に正しいURLを使用
```

---

## 🚨 まだエラーが出る場合

### エラー: "Secret does not exist"

**解決方法：**
```
1. Settings > Environment Variables
2. 該当する変数を削除
3. Redeploy
```

### エラー: "Invalid API Key"

**解決方法：**
```
1. APIキーを再取得
   - Google AI: https://makersuite.google.com/app/apikey
   - Anthropic: https://console.anthropic.com/
2. Settings > Environment Variables で更新
3. Redeploy
```

---

## 📚 関連ドキュメント

- `VERCEL_QUICK_REF.md` - 5分設定ガイド
- `VERCEL_PROJECT_SETUP.md` - 完全設定ガイド
- `VERCEL_FIX.md` - Root Directoryエラー解決
- `TROUBLESHOOTING.md` - トラブルシューティング

---

## 🔗 便利なリンク

```
Vercel Dashboard:
https://vercel.com/dashboard

Google AI API Key:
https://makersuite.google.com/app/apikey

Anthropic API Key:
https://console.anthropic.com/
```

---

**✅ 修正完了！再デプロイしてください！** 🚀
