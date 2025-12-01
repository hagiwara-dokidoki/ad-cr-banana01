# 🚀 Vercel 新プロジェクト作成ガイド（完全版）

## 🎯 目的

古いプロジェクトの `Commit: 5b18e7f` 問題を解決するため、新しくプロジェクトを作成します。

---

## ✅ 事前準備

必要な情報を用意：

```
□ Google AI API Key (Gemini用)
  https://makersuite.google.com/app/apikey

□ Anthropic API Key (Claude用)
  https://console.anthropic.com/
```

---

## 📋 ステップバイステップ手順

### **ステップ1: プロジェクトをインポート**

```
1. Vercel Dashboard を開く
   https://vercel.com/dashboard

2. 右上の "Add New..." ボタンをクリック

3. "Project" を選択

4. "Import Git Repository" タブ

5. 検索バーに "ad-cr-banana01" と入力

6. "hagiwara-dokidoki/ad-cr-banana01" を探す

7. 右側の "Import" ボタンをクリック
```

---

### **ステップ2: プロジェクト名を設定**

**Configure Project** 画面：

```
Project Name
  ad-cr-banana01
  
  ※ もし既に使われている場合：
  - ad-cr-banana01-v2
  - ad-creative-tool-main
  など別の名前を使用
```

---

### **ステップ3: フレームワークを確認**

```
Framework Preset
  Next.js  ← 自動検出されるはず
  
  ※ されていない場合は手動で選択
```

---

### **ステップ4: Root Directory を設定（最重要！）**

#### 🔴 これを忘れると失敗します！

```
Root Directory

1. "Edit" ボタンをクリック

2. ディレクトリ選択画面が表示される：
   
   Select Directory:
   ○ . (root)
   ● ad-creative-tool  ← これを選択！
   
3. "ad-creative-tool" を選択

4. または、入力欄に直接 "ad-creative-tool" と入力

5. 選択を確認
```

**⚠️ 確認ポイント：**
```
Root Directory: ad-creative-tool
              ↑
        これが表示されているか確認！
```

---

### **ステップ5: Build & Output Settings（デフォルトでOK）**

```
Build Command
  (空欄) または npm run build

Output Directory
  .next

Install Command
  (空欄) または npm install

Development Command
  (空欄) または npm run dev
```

**→ すべて空欄でOKです（自動検出されます）**

---

### **ステップ6: 環境変数を設定（2つだけ）**

#### 🔴 重要：必要な変数だけを設定

**Environment Variables** セクション：

#### **変数1: GOOGLE_AI_API_KEY**

```
1. "Add New" ボタンをクリック

2. 入力：
   Key: GOOGLE_AI_API_KEY
   Value: AIzaSy... (あなたのキー)
   
3. Environment:
   ✅ Production
   ✅ Preview
   ✅ Development
   (すべてにチェック)

4. "Save" または "Add" をクリック
```

#### **変数2: ANTHROPIC_API_KEY**

```
1. 再度 "Add New" ボタンをクリック

2. 入力：
   Key: ANTHROPIC_API_KEY
   Value: sk-ant-... (あなたのキー)
   
3. Environment:
   ✅ Production
   ✅ Preview
   ✅ Development

4. "Save" または "Add" をクリック
```

#### ❌ 設定してはいけない環境変数

```
❌ NEXT_PUBLIC_BASE_URL
   → 不要（自動検出されます）

❌ BLOB_READ_WRITE_TOKEN
   → 後でBlob Storage有効化時に自動設定
```

---

### **ステップ7: デプロイを実行**

```
1. すべての設定を最終確認：
   ✅ Project Name: 入力済み
   ✅ Framework: Next.js
   ✅ Root Directory: ad-creative-tool
   ✅ Environment Variables: 2つ設定済み

2. "Deploy" ボタンをクリック

3. ビルドが開始される
```

---

## 📊 成功の確認

### **期待されるビルドログ**

```
Building...
Running build in Washington, D.C., USA (East) – iad1
Build machine configuration: 4 cores, 8 GB

Cloning github.com/hagiwara-dokidoki/ad-cr-banana01 
  (Branch: main, Commit: 65ce05c)  ← 最新のコミット！
                         ↑ これが重要！

✓ Cloning completed: 190.000ms

✓ Using root directory: ad-creative-tool  ← これが表示される！

✓ Detected Next.js
✓ Installing dependencies...
✓ Installing: npm install
✓ npm install completed
✓ Building Next.js application...
✓ Linting and checking validity of types...
✓ Type checking completed
✓ Creating an optimized production build...
✓ Compiled successfully
✓ Deploying...
✓ Build completed
✓ Deployment ready

Production: https://ad-cr-banana01.vercel.app
```

---

## 🎉 デプロイ成功後の作業

### **ステップ8: Blob Storage を有効化**

画像保存のために必須：

```
1. プロジェクトダッシュボードを開く

2. "Storage" タブをクリック

3. "Create Database" ボタンをクリック

4. "Blob" を選択

5. Database name を入力：
   ad-creative-blob

6. "Create" をクリック

7. 完了すると、自動的に環境変数に追加される：
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

**確認方法：**
```
Settings > Environment Variables
  → BLOB_READ_WRITE_TOKEN が追加されているか確認
```

---

### **ステップ9: 動作確認**

```
1. デプロイURLにアクセス：
   https://ad-cr-banana01.vercel.app

2. トップページが表示されることを確認：
   「広告クリエイティブ自動生成ツール」

3. URLを入力してテスト：
   例: https://example.com

4. スクレイピングが動作するか確認
```

---

### **ステップ10: 古いプロジェクトを削除**

新しいプロジェクトが正常に動作することを確認したら：

```
1. 古いプロジェクト（問題があったもの）を開く

2. Settings > General

3. 一番下までスクロール

4. "Delete Project" セクション

5. プロジェクト名を入力して確認

6. "Delete" ボタンをクリック
```

---

## 🚨 トラブルシューティング

### **エラー1: Root Directory does not exist**

**原因：** Root Directory が設定されていない

**解決：**
```
Settings > General > Root Directory
  → "Edit" をクリック
  → "ad-creative-tool" を選択
  → "Save"
  → Deployments > Redeploy
```

---

### **エラー2: Environment Variable "NEXT_PUBLIC_BASE_URL" references Secret**

**原因：** 不要な環境変数が設定されている

**解決：**
```
Settings > Environment Variables
  → "NEXT_PUBLIC_BASE_URL" を探す
  → "..." > "Remove"
  → Deployments > Redeploy
```

---

### **エラー3: Invalid API Key**

**原因：** APIキーが間違っているか無効

**解決：**
```
1. APIキーを再取得：
   - Google AI: https://makersuite.google.com/app/apikey
   - Anthropic: https://console.anthropic.com/

2. Settings > Environment Variables > Edit
   → 正しいキーを入力

3. Redeploy
```

---

### **エラー4: 古いコミット (5b18e7f) を参照**

**原因：** 新プロジェクトなのに古いキャッシュが残っている

**解決：**
```
このプロジェクトも削除して、もう一度新規作成
  → 今度はさらに別の名前を使用
  → 例: ad-creative-tool-prod
```

---

## ✅ 最終チェックリスト

すべて完了したか確認：

```bash
□ 新しいプロジェクトを作成
□ Root Directory: ad-creative-tool を設定
□ GOOGLE_AI_API_KEY を設定
□ ANTHROPIC_API_KEY を設定
□ NEXT_PUBLIC_BASE_URL は設定していない
□ デプロイが成功（Commit: 65ce05c）
□ "Using root directory: ad-creative-tool" が表示
□ Blob Storage を有効化
□ BLOB_READ_WRITE_TOKEN が自動設定
□ デプロイURLにアクセスできる
□ トップページが表示される
□ 古いプロジェクトを削除
```

---

## 📊 環境変数まとめ

### **設定する環境変数（2つ）**

| Key | Value | Environment |
|-----|-------|-------------|
| `GOOGLE_AI_API_KEY` | `AIzaSy...` | All (Production, Preview, Development) |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | All |

### **自動設定される環境変数**

| Key | 設定タイミング | 値 |
|-----|--------------|-----|
| `VERCEL_URL` | デプロイ時 | 自動（例: ad-cr-banana01.vercel.app） |
| `BLOB_READ_WRITE_TOKEN` | Blob Storage有効化後 | 自動（例: vercel_blob_rw_...） |

### **不要な環境変数（設定しない）**

```
❌ NEXT_PUBLIC_BASE_URL
   → lib/config.ts で自動検出されます
```

---

## 🎯 推奨プロジェクト名

もし既存のプロジェクト名が使われている場合：

```
- ad-cr-banana01-v2
- ad-cr-banana01-new
- ad-creative-tool
- ad-creative-tool-main
- ad-creative-tool-prod
```

---

## 📞 サポート

問題が発生した場合：

1. **ビルドログを確認**
   - Deployments > 最新のデプロイ > Logs

2. **コミットIDを確認**
   - `Commit: 65ce05c` になっているか

3. **Root Directoryを確認**
   - `Using root directory: ad-creative-tool` が表示されるか

4. **環境変数を確認**
   - Settings > Environment Variables
   - 必要なもの：2つ
   - 不要なもの：NEXT_PUBLIC_BASE_URL は削除

---

## 🚀 成功のポイント

### **最も重要な3つの設定：**

1. **Root Directory: ad-creative-tool**
   ```
   これを忘れると 404 エラー
   ```

2. **環境変数は2つだけ**
   ```
   GOOGLE_AI_API_KEY
   ANTHROPIC_API_KEY
   ```

3. **NEXT_PUBLIC_BASE_URL は設定しない**
   ```
   自動検出されるので不要
   ```

---

**🎯 この手順通りに進めれば、確実に成功します！**

何か問題があれば、すぐにお知らせください！
