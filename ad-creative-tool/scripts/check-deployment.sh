#!/bin/bash

# デプロイ状態確認スクリプト

echo "🔍 Vercel デプロイ状態チェック"
echo "================================"
echo ""

# プロジェクト情報
echo "📦 プロジェクト情報:"
echo "   名前: ad-creative-tool"
echo "   リポジトリ: hagiwara-dokidoki/ad-cr-banana01"
echo ""

# 環境変数チェック
echo "⚙️  必須環境変数チェック:"
if [ -f .env.local ]; then
    echo "   ✅ .env.local ファイルが存在します"
    
    if grep -q "GOOGLE_AI_API_KEY=" .env.local; then
        if grep -q "GOOGLE_AI_API_KEY=placeholder" .env.local; then
            echo "   ⚠️  GOOGLE_AI_API_KEY: プレースホルダーのまま（要更新）"
        else
            echo "   ✅ GOOGLE_AI_API_KEY: 設定済み"
        fi
    else
        echo "   ❌ GOOGLE_AI_API_KEY: 未設定"
    fi
    
    if grep -q "ANTHROPIC_API_KEY=" .env.local; then
        if grep -q "ANTHROPIC_API_KEY=placeholder" .env.local; then
            echo "   ⚠️  ANTHROPIC_API_KEY: プレースホルダーのまま（要更新）"
        else
            echo "   ✅ ANTHROPIC_API_KEY: 設定済み"
        fi
    else
        echo "   ❌ ANTHROPIC_API_KEY: 未設定"
    fi
else
    echo "   ⚠️  .env.local ファイルが見つかりません"
    echo "      .env.local.example をコピーして作成してください"
fi
echo ""

# ビルドチェック
echo "🏗️  ビルドチェック:"
if [ -d ".next" ]; then
    echo "   ✅ .next ディレクトリが存在します（ビルド済み）"
else
    echo "   ⚠️  .next ディレクトリが存在しません"
    echo "      npm run build を実行してください"
fi
echo ""

# 依存パッケージチェック
echo "📦 依存パッケージチェック:"
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules が存在します"
    
    if [ -d "node_modules/playwright" ]; then
        echo "   ✅ Playwright インストール済み"
    else
        echo "   ❌ Playwright 未インストール"
        echo "      npm install を実行してください"
    fi
    
    if [ -d "node_modules/@anthropic-ai/sdk" ]; then
        echo "   ✅ Anthropic SDK インストール済み"
    else
        echo "   ❌ Anthropic SDK 未インストール"
    fi
    
    if [ -d "node_modules/@google/generative-ai" ]; then
        echo "   ✅ Google Generative AI インストール済み"
    else
        echo "   ❌ Google Generative AI 未インストール"
    fi
else
    echo "   ❌ node_modules が存在しません"
    echo "      npm install を実行してください"
fi
echo ""

# 設定ファイルチェック
echo "📝 設定ファイルチェック:"
if [ -f "vercel.json" ]; then
    echo "   ✅ vercel.json が存在します"
else
    echo "   ⚠️  vercel.json が見つかりません"
fi

if [ -f "next.config.ts" ]; then
    echo "   ✅ next.config.ts が存在します"
else
    echo "   ❌ next.config.ts が見つかりません"
fi

if [ -f "package.json" ]; then
    echo "   ✅ package.json が存在します"
else
    echo "   ❌ package.json が見つかりません"
fi
echo ""

# Gitステータスチェック
echo "📂 Gitステータス:"
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "   ✅ Gitリポジトリが初期化されています"
    
    BRANCH=$(git branch --show-current)
    echo "   現在のブランチ: $BRANCH"
    
    if git diff-index --quiet HEAD --; then
        echo "   ✅ コミットされていない変更はありません"
    else
        echo "   ⚠️  コミットされていない変更があります"
        echo "      git add . && git commit でコミットしてください"
    fi
else
    echo "   ❌ Gitリポジトリが見つかりません"
fi
echo ""

# Vercel推奨設定
echo "🚀 Vercelデプロイ推奨設定:"
echo "   Root Directory: ad-creative-tool"
echo "   Framework: Next.js (自動検出)"
echo "   Build Command: npm run build"
echo "   Output Directory: .next"
echo "   Install Command: npm install"
echo "   Node.js Version: 20.x"
echo ""

# 必須環境変数リスト
echo "🔑 Vercelで設定する環境変数:"
echo "   1. GOOGLE_AI_API_KEY"
echo "   2. ANTHROPIC_API_KEY"
echo "   3. BLOB_READ_WRITE_TOKEN (自動設定)"
echo ""

# チェックリスト
echo "✅ デプロイ前チェックリスト:"
echo "   [ ] GitHubにプッシュ済み"
echo "   [ ] Vercelプロジェクト作成済み"
echo "   [ ] Root Directory設定済み"
echo "   [ ] 環境変数設定済み"
echo "   [ ] Blob Storage有効化済み"
echo ""

echo "================================"
echo "詳細は VERCEL_CHECKLIST.md を参照してください"
