#!/bin/bash

# 広告クリエイティブ自動生成ツール - セットアップスクリプト

set -e

echo "🎨 広告クリエイティブ自動生成ツール - セットアップ"
echo "=============================================="
echo ""

# Node.jsバージョン確認
echo "📦 Node.jsバージョンを確認中..."
node --version
npm --version
echo ""

# 依存パッケージのインストール
echo "📥 依存パッケージをインストール中..."
npm install
echo "✅ 依存パッケージのインストール完了"
echo ""

# Playwrightブラウザのインストール
echo "🌐 Playwrightブラウザをインストール中..."
npx playwright install chromium
echo "✅ Playwrightブラウザのインストール完了"
echo ""

# 環境変数ファイルの確認
if [ ! -f .env.local ]; then
  echo "⚙️  環境変数ファイルを作成中..."
  cp .env.local.example .env.local
  echo "✅ .env.local を作成しました"
  echo ""
  echo "⚠️  重要: .env.local ファイルを編集して、以下のAPIキーを設定してください："
  echo "   - GOOGLE_AI_API_KEY"
  echo "   - ANTHROPIC_API_KEY"
  echo ""
else
  echo "✅ .env.local は既に存在します"
  echo ""
fi

# TypeScript型チェック
echo "🔍 TypeScript型チェックを実行中..."
npx tsc --noEmit
echo "✅ 型チェック完了"
echo ""

# ビルドテスト
echo "🏗️  ビルドテストを実行中..."
npm run build
echo "✅ ビルド成功"
echo ""

echo "=============================================="
echo "🎉 セットアップ完了！"
echo ""
echo "📝 次のステップ:"
echo "1. .env.local ファイルを編集してAPIキーを設定"
echo "2. npm run dev で開発サーバーを起動"
echo "3. http://localhost:3000 にアクセス"
echo ""
echo "📚 詳細はREADME.mdとDEPLOYMENT.mdを参照してください"
echo "=============================================="
