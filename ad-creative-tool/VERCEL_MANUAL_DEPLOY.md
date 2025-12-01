# 🔧 Vercel 手動デプロイガイド

## 🚨 問題：自動デプロイが開始されない

GitHubにプッシュしても、Vercelが自動的にデプロイを開始しない場合の対処法。

---

## ✅ 解決方法

### **方法1: 手動Redeploy（最も簡単）**

```
Vercel Dashboard
  → Projects
  → ad-cr-banana01
  → Deployments
  → 最新のデプロイをクリック
  → 右上の "..." メニュー
  → "Redeploy"
```

**⚠️ 重要な設定：**
```
□ Use existing Build Cache  ← このチェックを外す！
```

キャッシュを使わないことで、最新のGitコミットを取得します。

**Redeployボタンをクリック**

---

### **方法2: Git Integration を再接続**

もし方法1が効かない場合：

#### ステップ1: 現在の接続を切断

```
Settings > Git
  → "Disconnect" ボタンをクリック
  → 確認ダイアログで "Disconnect"
```

#### ステップ2: 再接続

```
"Connect Git Repository" ボタンが表示される
  → クリック
  → GitHub を選択
  → "hagiwara-dokidoki/ad-cr-banana01" を選択
  → "Connect" をクリック
```

#### ステップ3: プロジェクト設定

接続後、自動的に新しいデプロイが開始されます。
設定を確認：

```
Settings > General
  → Root Directory: ad-creative-tool

Settings > Git
  → Production Branch: main
```

---

### **方法3: GitHub Webhook の確認**

GitHubとVercelの連携を確認：

#### GitHub側の設定

```
1. GitHubにログイン
2. Repository: hagiwara-dokidoki/ad-cr-banana01
3. Settings タブをクリック
4. 左メニューから "Webhooks" を選択
```

**確認事項：**
```
✓ Vercel webhook が存在するか？
  URL: https://api.vercel.com/...
  
✓ Recent Deliveries で成功しているか？
  → 緑のチェックマーク ✓ が表示されている
  
❌ 失敗している場合：
  → 赤い ✗ が表示
  → "Redeliver" ボタンをクリックして再送
```

#### Webhook がない場合：

```
1. Vercel Dashboard > Settings > Git
2. "Disconnect" してから再接続
3. これにより webhook が自動的に再作成される
```

---

### **方法4: Vercel CLI を使用（上級者向け）**

ローカルから直接デプロイ：

```bash
# Vercel CLIをインストール（グローバル）
npm install -g vercel

# プロジェクトディレクトリに移動
cd /path/to/ad-creative-tool

# Vercelにログイン
vercel login

# プロジェクトをリンク
vercel link

# デプロイ実行
vercel --prod
```

**注意：** この方法は一時的な解決策です。GitHub連携を修正することをお勧めします。

---

## 🔍 トラブルシューティング

### 問題A: "Redeploy" ボタンが見つからない

**解決：**
```
Deployments タブ
  → 個別のデプロイをクリック（リストの項目）
  → デプロイ詳細ページの右上に "..." メニューがある
```

### 問題B: Redeployしても古いコミットを参照

**原因：** Production Branch が間違っている

**解決：**
```
Settings > Git > Production Branch
  → "main" に設定されているか確認
  → 違う場合は "Edit" で変更
```

### 問題C: GitHub Webhook が届かない

**原因：** Vercel GitHub App の権限問題

**解決：**
```
GitHub > Settings > Applications > Vercel
  → "Configure" をクリック
  → Repository access を確認
  → "hagiwara-dokidoki/ad-cr-banana01" にアクセス権があるか
  → なければ "Select repositories" で追加
```

---

## 📊 期待されるデプロイログ

手動Redeployが成功すると：

```
Building...
Cloning github.com/hagiwara-dokidoki/ad-cr-banana01 
  (Branch: main, Commit: bb77a59) ← 最新のコミット

✓ Cloning completed
✓ Using root directory: ad-creative-tool  ← これが表示される
✓ Detected Next.js
✓ Installing dependencies...
✓ Building application...
✓ Linting and checking validity of types...
✓ Compiled successfully
✓ Deploying...
✓ Build completed
✓ Deployment ready

URL: https://ad-cr-banana01.vercel.app
```

---

## ✅ 確認チェックリスト

手動Redeploy後：

```bash
□ Commit ID が bb77a59 または deb354a になっている
□ "Using root directory: ad-creative-tool" が表示されている
□ "The specified Root Directory does not exist" エラーが出ていない
□ ビルドが正常に進行している
□ デプロイが成功している
□ デプロイURLにアクセスできる
```

---

## 🎯 推奨される対応順序

1. **まず手動Redeploy を試す**（1分）
   - Deployments > ... > Redeploy
   - キャッシュなしで実行

2. **Production Branch を確認**（30秒）
   - Settings > Git > Production Branch = main

3. **Root Directory を確認**（30秒）
   - Settings > General > Root Directory = ad-creative-tool

4. **上記で解決しない場合、Git Integration を再接続**（2分）
   - Settings > Git > Disconnect > 再接続

5. **それでもダメなら、新しいプロジェクトを作成**（5分）
   - 最初から設定し直す

---

## 💡 自動デプロイが動作するための条件

Vercelが自動的にデプロイを開始するには：

```
✓ GitHub Repository と Vercel Project が正しく接続されている
✓ GitHub Webhook が正常に動作している
✓ Production Branch が正しく設定されている (main)
✓ Vercel GitHub App に適切な権限がある
✓ デプロイがブロックされていない（Build Minutesが残っている等）
```

---

## 🔗 便利なリンク

```
Vercel Dashboard:
https://vercel.com/dashboard

GitHub Webhooks:
https://github.com/hagiwara-dokidoki/ad-cr-banana01/settings/hooks

Vercel Status:
https://www.vercel-status.com/
```

---

## 🚀 今すぐやること

**最速の解決方法：**

```
1. Vercel Dashboard を開く
2. Deployments タブに移動
3. 失敗したデプロイをクリック
4. "..." > "Redeploy" (キャッシュなし)
5. ビルドログを監視
```

これで最新のコード（Commit: bb77a59）でビルドが開始されます！

---

**🎉 手動Redeployで確実に解決します！**
