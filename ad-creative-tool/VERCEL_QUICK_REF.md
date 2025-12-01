# ⚡ Vercel 設定クイックリファレンス

## 🎯 プロジェクト: ad-cr-banana01

---

## 📝 5分でできる！最小設定

### **1️⃣ Root Directory（最重要！）**
```
Settings > General > Root Directory
→ ad-creative-tool
```

### **2️⃣ Production Branch**
```
Settings > Git > Production Branch
→ main
```

### **3️⃣ 環境変数（2つ）**
```
Settings > Environment Variables

GOOGLE_AI_API_KEY=AIzaSy...
ANTHROPIC_API_KEY=sk-ant-...
```

### **4️⃣ Blob Storage**
```
Storage タブ > Create Database > Blob
→ 自動的に BLOB_READ_WRITE_TOKEN が設定される
```

### **5️⃣ 再デプロイ**
```
Deployments > 最新 > ... > Redeploy
```

---

## ✅ チェックリスト

```bash
□ Root Directory = "ad-creative-tool"
□ Production Branch = "main"
□ GOOGLE_AI_API_KEY 設定済み
□ ANTHROPIC_API_KEY 設定済み
□ Blob Storage 有効化済み
□ 再デプロイ成功
```

---

## 🔗 必要なリンク

| 項目 | URL |
|------|-----|
| Vercel Dashboard | https://vercel.com/dashboard |
| Google AI API Key | https://makersuite.google.com/app/apikey |
| Anthropic API Key | https://console.anthropic.com/ |
| GitHub Repo | https://github.com/hagiwara-dokidoki/ad-cr-banana01 |

---

## 🚨 よくあるエラー

### **404 NOT_FOUND**
→ Root Directory を確認（`ad-creative-tool`）

### **Blob Access Denied**
→ Storage > Blob を有効化

### **Build Failed**
→ Root Directory 設定後、Redeploy

---

## 📚 詳細ガイド

完全な設定手順は以下を参照：
- `VERCEL_PROJECT_SETUP.md` - 完全設定ガイド
- `VERCEL_FIX.md` - エラー解決方法
- `TROUBLESHOOTING.md` - トラブルシューティング

---

**🚀 準備完了！デプロイを開始してください！**
