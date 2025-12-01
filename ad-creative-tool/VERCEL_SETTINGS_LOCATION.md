# 📍 Vercel 設定項目の正確な場所

## 🎯 Production Branch の場所

### **正しい場所：**

```
Vercel Dashboard
  → Projects
  → ad-cr-banana01 (プロジェクトをクリック)
  → Settings タブ (上部のタブ)
  → Git (左側メニュー)
  → Production Branch (ページ中段)
```

---

## 🖼️ 画面の見方

### **Settings タブ内の左側メニュー：**

```
Settings
├─ General          ← Root Directory はここ
├─ Domains
├─ Git              ← Production Branch はここ！
├─ Environment Variables
├─ Serverless Functions
├─ Edge Functions
├─ Storage
└─ ...
```

---

## 📋 各設定の場所

### **1. Root Directory（最重要）**

```
Settings > General > Build & Development Settings
  → Root Directory
  → [Edit] ボタン
  → "ad-creative-tool" と入力
  → [Save]
```

### **2. Production Branch（最重要）**

```
Settings > Git > Git Configuration
  → Production Branch
  → [Edit] ボタン
  → ドロップダウンから "main" を選択
  → [Save]
```

**⚠️ これは Deploy Hooks ではありません！**

### **3. Environment Variables**

```
Settings > Environment Variables
  → [Add New] ボタン
  → Key: GOOGLE_AI_API_KEY
  → Value: (あなたのキー)
  → Environment: Production, Preview, Development
  → [Save]
```

---

## ❌ Deploy Hooks とは別物

### **Deploy Hooks の場所：**

```
Settings > Git > Deploy Hooks
```

**Deploy Hooks は：**
- Webhook URLを作成する機能
- 外部システムから手動でデプロイをトリガーするため
- 今回は使用しません

---

## 🎯 Production Branch の見つけ方（詳細）

### **ステップバイステップ：**

1. **Vercel Dashboard を開く**
   ```
   https://vercel.com/dashboard
   ```

2. **プロジェクト "ad-cr-banana01" をクリック**
   ```
   プロジェクト一覧から選択
   ```

3. **上部の "Settings" タブをクリック**
   ```
   Overview | Deployments | Analytics | Logs | Settings
                                                  ↑ここ
   ```

4. **左側メニューから "Git" を選択**
   ```
   General
   Domains
   Git        ← ここをクリック
   Environment Variables
   ...
   ```

5. **ページをスクロール**
   ```
   Git Configuration というセクションが表示される
   
   Connected Git Repository
     Repository: hagiwara-dokidoki/ad-cr-banana01
   
   Production Branch    ← これを探す！
     Branch: main (または別のブランチ)
     [Edit] ボタン
   ```

---

## 🔍 Production Branch の確認方法

### **現在の設定を確認：**

```
Settings > Git > Production Branch
```

**表示される情報：**
```
Production Branch
  The branch that triggers Production Deployments when pushed to.
  
  Branch: main          ← これが現在の設定
  [Edit]                ← このボタンをクリックして変更
```

### **編集方法：**

```
1. [Edit] ボタンをクリック
2. ドロップダウンメニューが表示される
3. 利用可能なブランチ一覧：
   - main
   - genspark_ai_developer
   - (その他のブランチ)
4. "main" を選択
5. [Save] をクリック
```

---

## 📊 Settings画面の全体像

```
Settings タブを開くと：

┌─────────────────────────────────────────────┐
│ 左側メニュー        │ 右側コンテンツ        │
├─────────────────────────────────────────────┤
│ General             │ Project Settings      │
│                     │ Root Directory: ...   │
│                     │                       │
│ Domains             │                       │
│                     │                       │
│ Git          ←選択  │ Git Configuration     │
│                     │ Connected Repository  │
│                     │ Production Branch ★   │
│                     │ Deploy Hooks          │
│                     │                       │
│ Environment Vars    │                       │
│                     │                       │
│ Functions           │                       │
│                     │                       │
│ Storage             │                       │
└─────────────────────────────────────────────┘
```

---

## ✅ 確認すべき3つの設定

### **1. Settings > General > Root Directory**
```
Root Directory: ad-creative-tool
```

### **2. Settings > Git > Production Branch**
```
Production Branch: main  ← 最重要！
```

### **3. Settings > Environment Variables**
```
GOOGLE_AI_API_KEY: 設定済み
ANTHROPIC_API_KEY: 設定済み
BLOB_READ_WRITE_TOKEN: 自動設定
```

---

## 🚨 よくある間違い

### ❌ 間違い1: Deploy Hooks を見ている
```
Deploy Hooks は別の機能
→ Production Branch ではない
```

### ❌ 間違い2: General で探している
```
Production Branch は General にはない
→ Git セクションにある
```

### ❌ 間違い3: Deployments タブで探している
```
Deployments タブは履歴を見る場所
→ 設定は Settings タブ
```

---

## 🎯 確実に見つける方法

### **URLで直接アクセス（最速）：**

```
https://vercel.com/[your-team]/ad-cr-banana01/settings/git
```

**[your-team]** の部分は：
- 個人アカウントの場合：あなたのユーザー名
- チームの場合：チーム名

**または：**

```
1. プロジェクトページを開く
2. URLに "/settings/git" を追加
```

---

## 📸 見た目の説明

### **Production Branch セクション：**

```
┌────────────────────────────────────────────┐
│ Production Branch                          │
│                                            │
│ The branch that triggers Production       │
│ Deployments when pushed to.               │
│                                            │
│ Branch: main                    [Edit]    │
│         ↑ここが現在の設定                   │
└────────────────────────────────────────────┘
```

---

## 🎯 今すぐ確認してください

1. **Vercel Dashboard > ad-cr-banana01**
2. **Settings タブ**
3. **左メニュー > Git**
4. **Production Branch を探す**
5. **現在の値が "main" か確認**
6. **違う場合は [Edit] で変更**

---

## 💡 補足：Deploy Hooks との違い

### **Production Branch:**
- GitHubからの自動デプロイに使用
- どのブランチをProductionとするか設定
- pushされると自動的にデプロイされる

### **Deploy Hooks:**
- 手動デプロイ用のWebhook URL
- 外部から `POST` リクエストでデプロイをトリガー
- CI/CDパイプラインなどで使用

**今回必要なのは：Production Branch（自動デプロイ）**

---

**🎯 Settings > Git > Production Branch を確認してください！**
