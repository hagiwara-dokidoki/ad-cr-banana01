# 🔴 Vercel "Root Directory does not exist" エラー解決

## エラー内容
```
The specified Root Directory "ad-creative-tool" does not exist. 
Please update your Project Settings.
```

---

## ✅ 確認済み：コードに問題なし

```bash
✓ ad-creative-tool ディレクトリは mainブランチに存在
✓ GitHubで確認可能
✓ すべてのファイルが正常にプッシュ済み
```

**→ これはVercel側の設定問題です**

---

## 🎯 解決方法

### **方法1: Production Branch を確認（最も可能性が高い）**

#### Vercelが間違ったブランチを見ている可能性

```
Vercel Dashboard 
  → Projects 
  → ad-cr-banana01 
  → Settings 
  → Git
```

**確認：**
```
Production Branch: main ← これが正しい設定
```

**❌ 間違った設定例：**
```
Production Branch: genspark_ai_developer
Production Branch: master
Production Branch: develop
```

**修正方法：**
```
1. Settings > Git に移動
2. "Production Branch" の "Edit" をクリック
3. ドロップダウンから "main" を選択
4. "Save" をクリック
5. Deployments > Redeploy を実行
```

---

### **方法2: Root Directory を再設定**

```
Settings > General > Root Directory
```

**手順：**
```
1. 現在の設定を確認
2. もし空欄または違う値なら：
   - "Edit" をクリック
   - "ad-creative-tool" と入力（引用符なし）
   - "Save" をクリック
3. Redeploy を実行
```

**⚠️ 注意：**
- スペースを入れない：`ad-creative-tool`（正）、`ad-creative-tool ` (誤)
- スラッシュは不要：`ad-creative-tool`（正）、`/ad-creative-tool`（誤）
- 大文字小文字を正確に：`ad-creative-tool`（正）、`Ad-Creative-Tool`（誤）

---

### **方法3: プロジェクトを再接続（最終手段）**

もし上記が効かない場合：

#### オプションA: Disconnect & Reconnect

```
1. Settings > Git
2. "Disconnect" ボタンをクリック
3. 確認して切断
4. "Connect Git Repository" をクリック
5. GitHub から "hagiwara-dokidoki/ad-cr-banana01" を選択
6. Production Branch: main
7. Root Directory: ad-creative-tool
8. 保存して再デプロイ
```

#### オプションB: 新しいプロジェクトを作成

```
1. Vercel Dashboard > Add New > Project
2. Import Git Repository
3. GitHub から "hagiwara-dokidoki/ad-cr-banana01" を選択
4. Configure Project:
   - Project Name: ad-cr-banana01-new
   - Framework Preset: Next.js
   - Root Directory: ad-creative-tool ← 必ず設定！
   - Build Command: (空欄でOK)
   - Output Directory: .next
   - Install Command: (空欄でOK)
5. Environment Variables を追加:
   - GOOGLE_AI_API_KEY
   - ANTHROPIC_API_KEY
6. Deploy をクリック
7. 成功したら、古いプロジェクトを削除
```

---

## 🔍 デバッグ：Vercelが見ているディレクトリを確認

デプロイログで確認する方法：

```
1. Deployments タブを開く
2. 最新（または失敗した）デプロイをクリック
3. "Building" セクションを展開
4. ログの最初の方を確認：

期待されるログ：
✓ Cloning repository...
✓ Cloning completed: 1.234s
✓ Running "vercel build"
✓ Detected Next.js
✓ Using root directory: ad-creative-tool  ← これを確認！
```

**もし以下のように表示されたら問題：**
```
✓ Using root directory: .
または
✓ Using root directory: (empty)
```

---

## 📊 GitHubリポジトリ構造（参考）

現在のリポジトリ構造：

```
hagiwara-dokidoki/ad-cr-banana01/    ← リポジトリルート
│
├── LICENSE
│
└── ad-creative-tool/                ← Root Directory: ここ！
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── api/
    ├── components/
    ├── lib/
    ├── types/
    └── public/
```

**Vercel設定：**
```
Repository: hagiwara-dokidoki/ad-cr-banana01
Branch: main
Root Directory: ad-creative-tool
```

---

## ✅ 正しい設定の確認方法

### **Settings > General**
```
✓ Framework Preset: Next.js
✓ Root Directory: ad-creative-tool
✓ Build Command: (空欄 or npm run build)
✓ Output Directory: .next
✓ Install Command: (空欄 or npm install)
✓ Development Command: (空欄 or npm run dev)
```

### **Settings > Git**
```
✓ Connected Repository: hagiwara-dokidoki/ad-cr-banana01
✓ Production Branch: main ← 重要！
✓ Git Integration: GitHub
```

### **Settings > Environment Variables**
```
✓ GOOGLE_AI_API_KEY (Production, Preview, Development)
✓ ANTHROPIC_API_KEY (Production, Preview, Development)
✓ BLOB_READ_WRITE_TOKEN (自動設定 - Blob有効化後)
```

---

## 🚨 よくある間違い

### ❌ 間違い1: Production Branch が main ではない
```
Production Branch: genspark_ai_developer
→ このブランチには ad-creative-tool が完全にはない可能性
```

### ❌ 間違い2: Root Directory にスペースが入っている
```
Root Directory: "ad-creative-tool " (末尾にスペース)
→ ディレクトリが見つからない
```

### ❌ 間違い3: Root Directory にスラッシュが入っている
```
Root Directory: "/ad-creative-tool" または "ad-creative-tool/"
→ 正しくは: "ad-creative-tool"
```

### ❌ 間違い4: 大文字小文字が違う
```
Root Directory: "Ad-Creative-Tool"
→ 正しくは: "ad-creative-tool" (すべて小文字)
```

---

## 🎯 即効性のある解決手順

**今すぐ試してください（5分）：**

```bash
1. Vercel > Settings > Git を開く
   → Production Branch が "main" か確認
   → 違う場合は "main" に変更

2. Settings > General を開く
   → Root Directory を確認
   → "ad-creative-tool" と正確に入力されているか
   → スペース、スラッシュ、大文字がないか

3. Deployments > 最新 > ... > Redeploy
   → 再デプロイを実行

4. ビルドログを確認
   → "Using root directory: ad-creative-tool" と表示されるか
```

---

## 📞 それでも解決しない場合

### デバッグ情報を確認：

1. **Vercel Deployment ログ**
   ```
   Deployments > 最新のデプロイ > View Details
   → ログ全体をコピー
   ```

2. **GitHub でのディレクトリ確認**
   ```
   https://github.com/hagiwara-dokidoki/ad-cr-banana01
   → mainブランチで ad-creative-tool が見えるか
   ```

3. **Vercel 設定のスクリーンショット**
   ```
   Settings > General > Root Directory
   Settings > Git > Production Branch
   ```

---

## 🎉 成功の確認

デプロイが成功すると：

```
✓ Building...
✓ Using root directory: ad-creative-tool
✓ Detected Next.js
✓ Installing dependencies...
✓ Building...
✓ Linting and checking validity of types...
✓ Creating an optimized production build...
✓ Compiled successfully
✓ Deploying...
✓ Build completed
✓ Deployment ready
```

**デプロイURL：**
```
https://ad-cr-banana01.vercel.app
```

---

## 📚 関連ドキュメント

- `VERCEL_PROJECT_SETUP.md` - プロジェクト完全設定ガイド
- `VERCEL_QUICK_REF.md` - 5分クイックリファレンス
- `VERCEL_FIX.md` - Root Directory エラー基本解決
- `TROUBLESHOOTING.md` - 一般トラブルシューティング

---

**🚀 まずは Production Branch を "main" に設定してください！**

これが最も可能性の高い原因です。
