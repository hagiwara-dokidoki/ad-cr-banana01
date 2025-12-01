# 🔧 Vercel Root Directory エラーの解決方法

## ✅ 問題解決完了！

`ad-creative-tool` ディレクトリが **mainブランチ** にプッシュされました。

---

## 📋 Vercel での設定手順

### **ステップ1: Vercelプロジェクト設定を確認**

1. Vercelダッシュボードにアクセス
   - https://vercel.com/dashboard

2. プロジェクト（`ad-cr-banana01`）を選択

3. **Settings** > **General** に移動

---

### **ステップ2: Git設定を確認**

#### 重要：正しいブランチを選択

```
Connected Git Branch: main  ← これが重要！
```

もし `genspark_ai_developer` になっていたら、**main** に変更してください。

**変更方法：**
```
1. Settings > Git
2. Production Branch の "Edit" をクリック
3. "main" を選択
4. "Save" をクリック
```

---

### **ステップ3: Root Directory を設定**

```
Root Directory: ad-creative-tool
```

**設定手順：**
```
1. Settings > General に移動
2. "Root Directory" セクションを探す
3. "Edit" ボタンをクリック
4. 入力欄に `ad-creative-tool` と入力
5. "Save" をクリック
```

---

### **ステップ4: 再デプロイ**

```
1. Deployments タブに移動
2. 最新のデプロイを選択
3. 右上の "..." メニューをクリック
4. "Redeploy" を選択
5. "Redeploy" ボタンをクリック
```

---

## 🎯 確認ポイント

### ✅ チェックリスト

```bash
□ Git Branch が "main" になっている
□ Root Directory が "ad-creative-tool" になっている
□ 環境変数が設定されている
   ✓ GOOGLE_AI_API_KEY
   ✓ ANTHROPIC_API_KEY
   ✓ BLOB_READ_WRITE_TOKEN（Blob Storage有効化で自動）
□ 再デプロイが成功している
```

---

## 📂 リポジトリ構造（確認用）

現在のGitHubリポジトリ構造：

```
ad-cr-banana01/                    ← リポジトリルート
├── LICENSE
└── ad-creative-tool/              ← Root Directory: ここを指定！
    ├── package.json
    ├── next.config.ts
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── api/
    │       ├── scrape/
    │       ├── analyze/
    │       └── generate/
    ├── components/
    ├── lib/
    ├── types/
    └── docs/
```

---

## 🚨 トラブルシューティング

### **エラー: "Root Directory does not exist"**

**原因：**
- Vercelが間違ったブランチを見ている
- `ad-creative-tool` ディレクトリがそのブランチに存在しない

**解決方法：**
```
1. Settings > Git > Production Branch を "main" に変更
2. Redeploy を実行
```

---

### **エラー: ビルドが失敗する**

**原因：**
- Root Directory が設定されていない
- 環境変数が不足している

**解決方法：**
```
1. Settings > General > Root Directory = "ad-creative-tool"
2. Settings > Environment Variables を確認
3. Redeploy を実行
```

---

## 🎉 デプロイ成功の確認

デプロイが成功すると、以下のようなURLでアクセスできます：

```
https://ad-cr-banana01.vercel.app
```

トップページに以下が表示されればOK：

```
広告クリエイティブ自動生成ツール
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
URLを入力するだけで、AI が競合分析から
キャッチコピー、バナー画像まで自動生成
```

---

## 📞 サポート

問題が解決しない場合は、以下のドキュメントも参照してください：

- **`VERCEL_DETAILED_SETUP.md`** - 詳細設定ガイド
- **`VERCEL_CHECKLIST.md`** - デプロイ前チェックリスト
- **`TROUBLESHOOTING.md`** - 一般的な問題の解決方法

---

## ✅ 次のステップ

1. Vercelで上記の設定を実施
2. 再デプロイを実行
3. デプロイURLにアクセスして動作確認
4. 各機能をテスト（スクレイピング、分析、コピー生成、バナー生成）

---

**🚀 準備完了！Vercelでのデプロイを開始してください！**
