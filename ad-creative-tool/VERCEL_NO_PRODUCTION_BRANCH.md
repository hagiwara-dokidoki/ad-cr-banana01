# 🔍 "Production Branch" が見つからない場合の対処法

## 🚨 問題

Settings > Git を開いても "Production Branch" という項目が見つからない。

---

## 💡 考えられる原因と解決方法

### **原因1: GitHubとの接続が完了していない（最も可能性が高い）**

**症状：**
- Settings > Git を開いても項目が少ない
- "Connect Git Repository" ボタンが表示されている
- または Git 関連の設定が表示されない

**解決方法：**

#### ステップ1: 現在の接続状態を確認

```
Settings > Git
```

**以下のどれが表示されていますか？**

**A. "Connect Git Repository" ボタンがある**
```
→ GitHubと接続されていません
→ 次の「GitHubと接続する手順」へ
```

**B. "Connected Repository: hagiwara-dokidoki/ad-cr-banana01" が表示されている**
```
→ 接続されています
→ 次の「原因2」へ
```

**C. 何も表示されていない / エラーが出ている**
```
→ プロジェクトが正しく作成されていない
→ 次の「原因3」へ
```

---

### **解決策A: GitHubと接続する（初回設定）**

もしまだGitHubと接続していない場合：

```
1. Settings > Git に移動

2. "Connect Git Repository" ボタンをクリック

3. GitHub を選択

4. "Import Git Repository" 画面が表示される

5. Repository を検索：
   "hagiwara-dokidoki/ad-cr-banana01" と入力

6. 該当リポジトリが表示されたら選択

7. Configure Project 画面で設定：
   ┌────────────────────────────────────┐
   │ Framework Preset: Next.js          │
   │ Root Directory: ad-creative-tool   │
   │ Build Command: (空欄でOK)          │
   │ Output Directory: .next            │
   │ Install Command: (空欄でOK)        │
   └────────────────────────────────────┘

8. Environment Variables を追加：
   - GOOGLE_AI_API_KEY
   - ANTHROPIC_API_KEY

9. "Deploy" ボタンをクリック

10. デプロイが開始される
```

これで自動的に `main` ブランチが Production Branch として設定されます。

---

### **原因2: 新しいVercel UI（Production Branchが別の場所）**

Vercelの新しいUIでは、表示が異なる場合があります。

**探す場所（新UI）：**

```
Settings > Git > Git
  または
Settings > Git Repository
```

**または：**

```
Settings > Deployments
  または
Project Settings > Domains
```

---

### **原因3: プロジェクトが正しく作成されていない**

**症状：**
- Settings に Git タブがない
- または Git タブが空

**解決方法：新しくプロジェクトを作成**

#### 完全な手順：

```
1. Vercel Dashboard (https://vercel.com/dashboard) を開く

2. 右上の "Add New..." > "Project" をクリック

3. "Import Git Repository" を選択

4. GitHub タブで "Configure GitHub App" をクリック（必要に応じて）

5. Repository Access を確認：
   - "hagiwara-dokidoki/ad-cr-banana01" にアクセス権があるか
   - なければ追加

6. "Import" ボタンをクリック（ad-cr-banana01 の横）

7. "Configure Project" 画面で設定：

   ┌──────────────────────────────────────────┐
   │ Project Name                              │
   │   ad-cr-banana01                         │
   │                                          │
   │ Framework Preset                         │
   │   Next.js                                │
   │                                          │
   │ Root Directory                           │
   │   [Edit] をクリック                       │
   │   → "ad-creative-tool" を選択または入力  │
   │                                          │
   │ Build and Output Settings                │
   │   Build Command: (空欄)                  │
   │   Output Directory: .next                │
   │   Install Command: (空欄)                │
   │   Development Command: (空欄)            │
   │                                          │
   │ Environment Variables                    │
   │   [Add] をクリック                        │
   │   GOOGLE_AI_API_KEY = your_key          │
   │   ANTHROPIC_API_KEY = your_key          │
   └──────────────────────────────────────────┘

8. "Deploy" をクリック

9. デプロイが開始される（main ブランチが自動的に使用される）
```

---

## 🎯 Production Branch の代替確認方法

### **方法1: Deployments タブで確認**

```
Deployments タブを開く
  → 最新のデプロイをクリック
  → "Source" を確認
  → "Branch: main" と表示されているか
```

### **方法2: デプロイログで確認**

```
Deployments > 最新のデプロイ > Building セクション

ログの最初の方：
Cloning github.com/hagiwara-dokidoki/ad-cr-banana01 
  (Branch: main, Commit: ...)
         ↑
      これが Production Branch
```

---

## 🔧 手動でBranchを指定してデプロイ

もし Production Branch 設定が見つからなくても、手動で指定できます：

### **方法：Deploy Hooksを使用**

```
Settings > Git > Deploy Hooks

1. "Create Hook" をクリック
2. Hook Name: production-main
3. Git Branch Name: main  ← ここで指定！
4. "Create Hook" をクリック
5. 生成されたURLをコピー
```

**デプロイをトリガー：**
```bash
curl -X POST "生成されたURL"
```

---

## 🎯 最も簡単な解決方法

### **Vercel CLIを使用（ローカルから直接デプロイ）**

Vercelの設定に関係なく、ローカルから直接デプロイ：

```bash
# プロジェクトディレクトリに移動
cd /home/user/webapp/ad-creative-tool

# Vercel CLIがない場合はインストール
npm install -g vercel

# Vercelにログイン
vercel login

# プロジェクトをリンク（初回のみ）
vercel link
# → 既存のプロジェクト "ad-cr-banana01" を選択

# Productionデプロイ
vercel --prod
```

これでVercel UIの設定に関係なく、最新のコードがデプロイされます。

---

## ✅ 状況確認チェックリスト

以下を確認して、現在の状況を教えてください：

```bash
□ Settings タブは表示されている
□ 左側メニューに "Git" がある
□ Git をクリックすると何が表示されるか：
  □ "Connect Git Repository" ボタン
  □ "Connected Repository: ..." と表示
  □ 何も表示されない
  □ エラーメッセージ
  □ その他：___________

□ Deployments タブで過去のデプロイは表示される
  □ はい → どのブランチが使われているか確認
  □ いいえ → プロジェクトが正しく作成されていない
```

---

## 🎯 推奨される対応

### **シナリオ1: GitHubと未接続**
```
→ Settings > Git > Connect Git Repository
→ リポジトリを選択して接続
→ Root Directory: ad-creative-tool を設定
→ Deploy をクリック
```

### **シナリオ2: 設定が見つからない（新UI）**
```
→ Deploymentsタブで過去のデプロイを確認
→ "Source" で使用されているブランチを確認
→ 手動でRedeployを実行
```

### **シナリオ3: プロジェクトを作り直す**
```
→ 新しいプロジェクトを作成
→ 最初から正しく設定
→ 古いプロジェクトは削除
```

---

## 💡 よくある質問

### Q: Production Branchはどこで設定されるの？

**A:** 通常は以下のタイミングで自動設定されます：

1. **プロジェクト作成時：**
   - GitHubリポジトリをインポートすると自動的にデフォルトブランチ（main）が設定される

2. **Git接続時：**
   - 既存プロジェクトにGitを接続すると、そのリポジトリのデフォルトブランチが使用される

### Q: Production Branch を変更できないの？

**A:** 変更できます。通常は Settings > Git に表示されますが、UIによって場所が異なります。

### Q: 設定なしでデプロイできないの？

**A:** できます！
- 手動Redeploy を使用
- Vercel CLI でデプロイ
- Deploy Hooks でトリガー

---

## 🚀 今すぐ試すこと

### **最優先：手動Redeployで最新コードをデプロイ**

```
1. Deployments タブを開く
2. 最新のデプロイ（失敗しているもの）をクリック
3. 右上の "..." > "Redeploy"
4. "Use existing Build Cache" のチェックを外す
5. "Redeploy" をクリック
```

**これで最新のmainブランチ（コミット cce1b92）でビルドが開始されます。**

Production Branch 設定が見つからなくても、この方法でデプロイは成功します！

---

**🎯 手動Redeployを今すぐ試してください！**

設定を探すよりも、まずデプロイを成功させることが最優先です。
