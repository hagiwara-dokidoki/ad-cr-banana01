# トラブルシューティングガイド

## 🔧 よくある問題と解決方法

---

## 問題1: 404 Not Found エラー

### 症状
```
404 : 見つかりません
コード：NOT_FOUND
```

### 原因
- ビルドキャッシュの問題
- ポート競合
- ルーティングの不具合

### 解決方法

#### 方法1: ビルドキャッシュをクリア

```bash
# .nextディレクトリを削除
rm -rf .next

# 開発サーバーを再起動
npm run dev
```

#### 方法2: ポートを変更

```bash
# 別のポートで起動
PORT=3001 npm run dev
```

#### 方法3: 完全なクリーンビルド

```bash
# すべてのビルド成果物を削除
rm -rf .next node_modules

# 依存パッケージを再インストール
npm install

# 開発サーバーを起動
npm run dev
```

---

## 問題2: スクレイピングが失敗する

### 症状
```
Error: Browser not initialized
```

### 原因
- Playwrightがインストールされていない
- ブラウザバイナリが見つからない

### 解決方法

```bash
# Playwrightブラウザをインストール
npm run playwright:install

# システム依存関係もインストール（Linux）
npx playwright install-deps
```

---

## 問題3: 環境変数エラー

### 症状
```
Error: GOOGLE_AI_API_KEY is required
```

### 原因
- .env.local ファイルが存在しない
- APIキーが設定されていない

### 解決方法

```bash
# .env.local ファイルを作成
cp .env.local.example .env.local

# エディタで開いて実際のAPIキーを設定
nano .env.local

# または直接編集
cat > .env.local << 'EOF'
GOOGLE_AI_API_KEY=your_actual_key_here
ANTHROPIC_API_KEY=your_actual_key_here
BLOB_READ_WRITE_TOKEN=your_blob_token_here
EOF

# サーバーを再起動
npm run dev
```

---

## 問題4: TypeScriptエラー

### 症状
```
Type error: Cannot find module '@/types/project'
```

### 原因
- tsconfig.jsonのパス設定
- 型定義ファイルの欠落

### 解決方法

```bash
# 型チェック
npm run type-check

# tsconfig.jsonを確認
cat tsconfig.json

# 必要に応じてnode_modulesを再インストール
rm -rf node_modules package-lock.json
npm install
```

---

## 問題5: ビルドエラー

### 症状
```
Error: Build failed with errors
```

### 原因
- 依存パッケージのバージョン不整合
- メモリ不足

### 解決方法

#### 方法1: 依存パッケージの再インストール

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 方法2: Node.jsメモリ増加

```bash
# メモリ上限を増やしてビルド
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## 問題6: APIレスポンスが遅い

### 症状
- スクレイピングに30秒以上かかる
- AIレスポンスがタイムアウトする

### 原因
- ネットワークの問題
- AI APIの制限
- 大きな画像の処理

### 解決方法

#### vercel.json で タイムアウトを調整

```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

#### 画像サイズを制限

```typescript
// lib/config.ts
export const config = {
  maxImagesExtract: 10,  // 20 → 10 に減らす
  minImageWidth: 800,
};
```

---

## 問題7: Blob Storage エラー

### 症状
```
Error: Blob storage not configured
```

### 原因（Vercel環境）
- Blob Storageが有効化されていない
- BLOB_READ_WRITE_TOKEN が設定されていない

### 解決方法

#### Vercel
1. Storage タブに移動
2. Create Database → Blob
3. データベース名を入力
4. Create → Connect

#### ローカル開発
```bash
# .env.local に追加
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

---

## 問題8: コンポーネントがレンダリングされない

### 症状
- 画面が真っ白
- コンソールにエラーが表示される

### 原因
- 'use client' ディレクティブの欠落
- インポートパスのエラー

### 解決方法

#### ブラウザコンソールを確認

```
F12 → Console タブ
```

#### 'use client' を追加

```typescript
'use client';

import { useState } from 'react';
// ...
```

#### パスエイリアスを確認

```typescript
// Good
import { ProjectState } from '@/types/project';

// Bad
import { ProjectState } from '../types/project';
```

---

## 問題9: Tailwind CSS が効かない

### 症状
- スタイルが適用されない
- デザインが崩れている

### 原因
- tailwind.config.js の設定
- globals.css のインポート忘れ

### 解決方法

#### globals.css を確認

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### layout.tsx で インポート確認

```typescript
import './globals.css';
```

#### ビルドキャッシュをクリア

```bash
rm -rf .next
npm run dev
```

---

## 問題10: Vercel デプロイ失敗

### 症状
```
Build failed: Root directory not found
```

### 原因
- Root Directory が設定されていない
- vercel.json の設定ミス

### 解決方法

#### Vercel Settings
1. Settings → General
2. Root Directory: `ad-creative-tool`
3. Save

#### vercel.json を確認

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

---

## デバッグ用コマンド

### 開発環境チェック

```bash
# 環境情報を表示
node --version
npm --version
pwd

# 依存パッケージを確認
npm list --depth=0

# ビルドログを詳細表示
npm run build -- --debug
```

### ログの確認

```bash
# Next.jsログ
npm run dev

# ビルドログ
npm run build 2>&1 | tee build.log

# Vercelログ（デプロイ後）
vercel logs
```

### ネットワーク診断

```bash
# APIキーの疎通確認
curl -H "Authorization: Bearer $GOOGLE_AI_API_KEY" \
  https://generativelanguage.googleapis.com/v1/models

# Vercel Blob接続確認
curl -I https://blob.vercel-storage.com
```

---

## クイックリファレンス

### よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run type-check

# Playwright インストール
npm run playwright:install

# デプロイ状態確認
bash scripts/check-deployment.sh

# キャッシュクリア
rm -rf .next
```

### ポート変更

```bash
# デフォルト（3000）
npm run dev

# カスタムポート
PORT=3001 npm run dev
```

### 環境変数確認

```bash
# .env.local の内容を表示
cat .env.local

# 環境変数が読み込まれているか確認
node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env)"
```

---

## サポートリソース

### 公式ドキュメント
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Playwright Docs](https://playwright.dev/)

### プロジェクトドキュメント
- [README.md](./README.md)
- [FAQ.md](./docs/FAQ.md)
- [VERCEL_SETUP_GUIDE.md](./docs/VERCEL_SETUP_GUIDE.md)

### コミュニティサポート
- [GitHub Issues](https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues)
- [GitHub Discussions](https://github.com/hagiwara-dokidoki/ad-cr-banana01/discussions)

---

## 緊急対応フローチャート

```
問題発生
  ↓
エラーメッセージを確認
  ↓
├─ 404エラー → キャッシュクリア
├─ APIエラー → 環境変数確認
├─ ビルドエラー → 依存パッケージ再インストール
├─ 画面真っ白 → ブラウザコンソール確認
└─ その他 → GitHubのIssuesで質問

それでも解決しない場合
  ↓
1. エラーログを保存
2. 再現手順を記録
3. GitHub Issueを作成
```

---

問題が解決しない場合は、遠慮なく [GitHub Issues](https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues) でお問い合わせください！
