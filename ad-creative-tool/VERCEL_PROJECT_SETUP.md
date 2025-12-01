# 🚀 Vercel プロジェクト設定ガイド

## プロジェクト情報

```
プロジェクト名: ad-cr-banana01
リポジトリ: https://github.com/hagiwara-dokidoki/ad-cr-banana01
フレームワーク: Next.js 16
Root Directory: ad-creative-tool ← 重要！
```

---

## 📋 Vercel 完全設定手順

### **ステップ1: Vercelダッシュボードにアクセス**

```
URL: https://vercel.com/dashboard
```

1. Vercelにログイン
2. プロジェクト一覧から **ad-cr-banana01** を選択
3. もしプロジェクトが存在しない場合は新規作成：
   - 「Add New...」 > 「Project」
   - GitHub から `hagiwara-dokidoki/ad-cr-banana01` をインポート

---

### **ステップ2: Settings > General 設定**

#### 🔴 最重要：Root Directory を設定

```
Vercel Dashboard
  └─ Projects
      └─ ad-cr-banana01
          └─ Settings
              └─ General
                  └─ Root Directory
```

**設定値：**
```
Root Directory: ad-creative-tool
```

**設定手順：**
1. Settings タブをクリック
2. 左メニューから「General」を選択
3. 下にスクロールして「Root Directory」セクションを探す
4. 「Edit」ボタンをクリック
5. 入力欄に `ad-creative-tool` と入力
6. 「Save」をクリック

⚠️ **この設定を忘れると 404 エラーになります！**

---

### **ステップ3: Settings > Git 設定**

#### Production Branch を確認

```
Settings > Git > Production Branch
```

**確認事項：**
```
Production Branch: main  ← これが正しい設定
```

もし違うブランチになっていたら：
1. 「Edit」をクリック
2. `main` を選択
3. 「Save」をクリック

---

### **ステップ4: Build & Development Settings**

これらの設定は自動検出されますが、念のため確認：

```
Framework Preset: Next.js
Build Command: npm run build (または空欄でOK)
Output Directory: .next (デフォルト)
Install Command: npm install (または空欄でOK)
Development Command: npm run dev (または空欄でOK)
```

**Node.js Version:**
```
20.x (推奨)
```

---

### **ステップ5: Environment Variables 設定**

```
Settings > Environment Variables
```

#### 必須の環境変数（3つ）

| Key | Value | 取得方法 |
|-----|-------|---------|
| `GOOGLE_AI_API_KEY` | `AIzaSy...` | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | [Anthropic Console](https://console.anthropic.com/) |
| `BLOB_READ_WRITE_TOKEN` | 自動設定 | Blob Storage 有効化で自動生成 |

#### 環境変数の追加方法：

1. **GOOGLE_AI_API_KEY の追加**
   ```
   1. Settings > Environment Variables
   2. 「Add New」ボタンをクリック
   3. Key: GOOGLE_AI_API_KEY
   4. Value: (あなたのAPIキーを貼り付け)
   5. Environment: ✅ Production ✅ Preview ✅ Development (全てチェック)
   6. 「Save」をクリック
   ```

2. **ANTHROPIC_API_KEY の追加**
   ```
   同様に追加
   Key: ANTHROPIC_API_KEY
   Value: (あなたのAPIキーを貼り付け)
   ```

3. **BLOB_READ_WRITE_TOKEN**
   ```
   これはステップ6でBlob Storageを有効化すると自動的に設定されます
   ```

---

### **ステップ6: Vercel Blob Storage 有効化**

#### 画像保存に必須！

```
Project Dashboard > Storage タブ
```

**手順：**
```
1. プロジェクトダッシュボードで「Storage」タブをクリック
2. 「Create Database」ボタンをクリック
3. 「Blob」を選択
4. データベース名を入力（例: ad-creative-blob）
5. 「Create」をクリック
6. 自動的に BLOB_READ_WRITE_TOKEN が環境変数に追加される
```

**確認方法：**
```
Settings > Environment Variables で
BLOB_READ_WRITE_TOKEN が存在することを確認
```

---

### **ステップ7: 再デプロイ（重要！）**

設定を変更したら、必ず再デプロイが必要です。

```
Deployments タブ
```

**手順：**
```
1. 「Deployments」タブをクリック
2. 一番上（最新）のデプロイを選択
3. 右上の「...」（3点メニュー）をクリック
4. 「Redeploy」を選択
5. 確認ダイアログで「Redeploy」をクリック
```

**ビルドログを監視：**
```
✓ Cloning repository...
✓ Installing dependencies...
✓ Building...
✓ Deploying...
✓ Success! Deployment is live
```

---

## ✅ 設定完了チェックリスト

すべての設定が完了したか確認：

```bash
□ Root Directory = "ad-creative-tool" に設定済み
□ Production Branch = "main" に設定済み
□ 環境変数が3つ設定されている
   ✓ GOOGLE_AI_API_KEY
   ✓ ANTHROPIC_API_KEY
   ✓ BLOB_READ_WRITE_TOKEN
□ Blob Storage が有効化されている
□ 再デプロイが成功している（Status: Ready）
□ デプロイURLにアクセスして表示される
```

---

## 🌐 デプロイURL

デプロイが成功すると、以下のようなURLでアクセスできます：

```
https://ad-cr-banana01.vercel.app
または
https://ad-cr-banana01-<team-name>.vercel.app
```

**確認方法：**
```
1. Deployments タブを開く
2. 最新のデプロイをクリック
3. 「Visit」ボタンでサイトにアクセス
```

---

## 🎯 期待される表示

デプロイが成功すると、以下のような画面が表示されるはずです：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  広告クリエイティブ自動生成ツール
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

URLを入力するだけで、AI が競合分析から
キャッチコピー、バナー画像まで自動生成

┌─────────────────────────────────────┐
│ 🔗 分析対象のウェブサイトURL        │
│ https://example.com                  │
└─────────────────────────────────────┘

[次へ] ボタン

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Powered by Next.js, Gemini, Claude, Imagen & Vercel
```

---

## 🚨 トラブルシューティング

### **エラー1: 404 NOT_FOUND**

**症状：**
```
404: NOT_FOUND
Code: NOT_FOUND
ID: hnd1::xxxxx
```

**原因：**
- Root Directory が設定されていない
- 間違ったブランチを参照している

**解決方法：**
```
1. Settings > General > Root Directory を確認
   → "ad-creative-tool" に設定されているか？
2. Settings > Git > Production Branch を確認
   → "main" に設定されているか？
3. Deployments > Redeploy を実行
```

---

### **エラー2: Build Failed**

**症状：**
```
Error: Cannot find module '@/lib/...'
または
Module not found: Can't resolve '@/components/...'
```

**原因：**
- Root Directory が設定されていない
- ビルドが間違ったディレクトリで実行されている

**解決方法：**
```
1. Settings > General > Root Directory = "ad-creative-tool"
2. Redeploy を実行
```

---

### **エラー3: Vercel Blob Access Denied**

**症状：**
```
Error: Vercel Blob: Access denied, please provide a valid token
```

**原因：**
- Blob Storage が有効化されていない
- BLOB_READ_WRITE_TOKEN が設定されていない

**解決方法：**
```
1. Storage タブに移動
2. Create Database > Blob を選択
3. データベース作成後、BLOB_READ_WRITE_TOKEN が自動設定される
4. Settings > Environment Variables で確認
5. Redeploy を実行
```

---

### **エラー4: AI API エラー**

**症状：**
```
Error: Invalid API key
または
Error: 401 Unauthorized
```

**原因：**
- API キーが設定されていない
- API キーが無効

**解決方法：**
```
1. APIキーを再取得
   - Google AI: https://makersuite.google.com/app/apikey
   - Anthropic: https://console.anthropic.com/
2. Settings > Environment Variables で更新
3. Redeploy を実行
```

---

## 📊 リポジトリ構造（参考）

```
ad-cr-banana01/                          ← リポジトリルート
│
├── LICENSE
│
└── ad-creative-tool/                    ← Root Directory: ここ！
    │
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── vercel.json
    │
    ├── app/                             ← Next.js App Router
    │   ├── page.tsx                     ← メインページ
    │   ├── layout.tsx
    │   ├── globals.css
    │   └── api/                         ← API Routes
    │       ├── scrape/route.ts
    │       ├── analyze/
    │       │   ├── colors/route.ts
    │       │   └── marketing/route.ts
    │       └── generate/
    │           ├── copies/route.ts
    │           ├── background/route.ts
    │           └── banner/route.tsx
    │
    ├── components/                      ← React Components
    │   ├── step1-input.tsx
    │   ├── step2-extraction.tsx
    │   ├── step3-analysis.tsx
    │   ├── step4-copywriting.tsx
    │   └── step5-banner-generation.tsx
    │
    ├── lib/                             ← ライブラリ
    │   ├── ai/
    │   │   ├── gemini.ts
    │   │   ├── claude.ts
    │   │   └── imagen.ts
    │   ├── scraper/
    │   │   └── playwright-scraper.ts
    │   └── config.ts
    │
    ├── types/                           ← TypeScript型定義
    │   └── project.ts
    │
    ├── docs/                            ← ドキュメント
    │   ├── QUICKSTART.md
    │   ├── ARCHITECTURE.md
    │   ├── FAQ.md
    │   └── VERCEL_DETAILED_SETUP.md
    │
    └── scripts/
        ├── setup.sh
        └── check-deployment.sh
```

---

## 🎓 補足情報

### **Vercel プロジェクトの命名規則**

```
プロジェクト名: ad-cr-banana01
デプロイURL: ad-cr-banana01.vercel.app
               ↑
               プロジェクト名がそのままURLになる
```

### **カスタムドメインの設定（オプション）**

独自ドメインを使いたい場合：

```
1. Settings > Domains
2. 「Add」ボタンをクリック
3. ドメイン名を入力（例: ad-tool.example.com）
4. DNS設定の指示に従う
5. 設定完了後、カスタムドメインでアクセス可能
```

---

## 💰 料金プラン（参考）

### **Vercel 料金**

```
Hobby（無料）:
- デプロイ: 無制限
- 帯域幅: 100GB/月
- ビルド時間: 6000分/月
- Serverless Functions: 100時間/月

Pro（$20/月）:
- 帯域幅: 1TB/月
- ビルド時間: 24000分/月
- Serverless Functions: 1000時間/月
- チーム機能
```

### **Blob Storage 料金**

```
無料枠: 1GB
超過分: $0.15/GB

想定使用量（月100回利用）:
- スクリーンショット: ~50MB
- AI生成画像: ~200MB
→ 合計: ~250MB （無料枠内）
```

### **AI API 料金**

```
Google AI (Gemini 1.5 Flash):
- 入力: $0.075/100万トークン
- 出力: $0.30/100万トークン

Anthropic (Claude 3.5 Sonnet):
- 入力: $3/100万トークン
- 出力: $15/100万トークン

Google AI (Imagen 3):
- 画像生成: $0.04/画像

月100回利用の場合の想定コスト:
- Gemini: ~$1
- Claude: ~$2
- Imagen: ~$4
合計: 約 $7/月
```

---

## 🔗 便利なリンク

```
Vercel Dashboard:
https://vercel.com/dashboard

プロジェクト設定:
https://vercel.com/[your-team]/ad-cr-banana01/settings

GitHub リポジトリ:
https://github.com/hagiwara-dokidoki/ad-cr-banana01

Google AI Studio:
https://makersuite.google.com/app/apikey

Anthropic Console:
https://console.anthropic.com/

Vercel ドキュメント:
https://vercel.com/docs
```

---

## ✅ 次のステップ

1. ✅ Root Directory を `ad-creative-tool` に設定
2. ✅ Production Branch を `main` に設定
3. ✅ 環境変数（GOOGLE_AI_API_KEY, ANTHROPIC_API_KEY）を追加
4. ✅ Blob Storage を有効化
5. ✅ 再デプロイを実行
6. ✅ デプロイURLにアクセスして動作確認
7. ✅ 各機能をテスト

---

## 📞 サポート

問題が発生した場合は、以下のドキュメントも参照：

- `VERCEL_FIX.md` - Root Directory エラーの解決
- `VERCEL_DETAILED_SETUP.md` - 詳細設定ガイド
- `TROUBLESHOOTING.md` - トラブルシューティング
- `docs/FAQ.md` - よくある質問

---

**🚀 設定完了後、デプロイが成功することをお祈りします！**

何か問題があれば、すぐにお知らせください。
