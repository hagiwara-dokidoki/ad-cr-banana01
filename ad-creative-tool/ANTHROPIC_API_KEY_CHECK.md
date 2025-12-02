# 🔑 Anthropic APIキー確認ガイド

## 🚨 全てのClaudeモデルで404エラーが出る場合

**原因**: Anthropic APIキーが正しく設定されていない可能性が高い

---

## ✅ APIキーの確認手順

### 1. Anthropic APIキーを取得

```
https://console.anthropic.com/
→ ログイン
→ API Keys
→ Create Key
```

**キーの形式**:
```
sk-ant-api03-...（長い文字列）
```

### 2. Vercel環境変数を確認

```
https://vercel.com/dashboard
→ Projects → ad-cr-banana01
→ Settings → Environment Variables
```

**確認ポイント**:

#### ✅ 正しい設定
```
Name: ANTHROPIC_API_KEY
Value: sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Environment: ✓ Production ✓ Preview ✓ Development
```

#### ❌ よくある間違い

1. **変数名が違う**
   - ❌ `ANTHROPIC_KEY`
   - ❌ `CLAUDE_API_KEY`
   - ✅ `ANTHROPIC_API_KEY`

2. **キーが不完全**
   - ❌ `sk-ant-...`（省略されている）
   - ✅ `sk-ant-api03-...`（完全な文字列）

3. **環境が選択されていない**
   - ❌ Productionのみ選択
   - ✅ Production, Preview, Development すべて選択

4. **引用符が入っている**
   - ❌ `"sk-ant-api03-..."`
   - ✅ `sk-ant-api03-...`

### 3. Redeployを実行

**環境変数を追加/変更した後は必ずRedeployが必要！**

```
Vercel Dashboard
→ Projects → ad-cr-banana01
→ Deployments
→ Latest deployment → "..." → Redeploy
```

**重要**: "Use existing Build Cache" のチェックを**外す**

---

## 🧪 APIキーのテスト方法

### Anthropic Console でテスト

```
https://console.anthropic.com/workbench
```

**テストプロンプト**:
```
こんにちは。簡単な自己紹介をしてください。
```

**期待される応答**:
- ✅ Claudeが日本語で応答 → APIキー正常
- ❌ エラーメッセージ → APIキー問題

---

## 📊 利用可能なClaudeモデル一覧

### 2024年12月時点で確実に動作するモデル

| モデル名 | 説明 | 推奨度 |
|---------|------|--------|
| `claude-3-sonnet-20240229` | バランス型 | ⭐⭐⭐⭐⭐ 推奨 |
| `claude-3-opus-20240229` | 最高品質 | ⭐⭐⭐⭐ 高コスト |
| `claude-3-haiku-20240307` | 高速・安価 | ⭐⭐⭐ 軽量タスク |

**現在の設定**: `claude-3-sonnet-20240229` ✅

---

## 🔍 エラーメッセージ別診断

### エラー1: `404 not_found_error model`

```json
{
  "type": "error",
  "error": {
    "type": "not_found_error",
    "message": "model: claude-3-sonnet-20240229"
  }
}
```

**原因**:
1. ❌ APIキーが設定されていない
2. ❌ APIキーが間違っている
3. ❌ APIキーが期限切れ

**対処法**:
1. Anthropic Consoleでキーを再生成
2. Vercel環境変数に正しく設定
3. Redeploy実行

### エラー2: `401 authentication_error`

```json
{
  "type": "error",
  "error": {
    "type": "authentication_error",
    "message": "Invalid API Key"
  }
}
```

**原因**: APIキーが無効

**対処法**:
1. 新しいAPIキーを生成
2. Vercelに設定
3. Redeploy

### エラー3: `429 rate_limit_error`

```json
{
  "type": "error",
  "error": {
    "type": "rate_limit_error",
    "message": "Rate limit exceeded"
  }
}
```

**原因**: リクエスト制限超過

**対処法**:
1. 1分待つ
2. Anthropic Consoleで利用状況確認
3. 必要に応じてプランアップグレード

---

## 🎯 Vercel Runtime Logsの確認

### ログの見方

```
Vercel Dashboard
→ Deployments
→ Latest deployment
→ Runtime Logs
```

### 正常なログ

```
[Marketing Analysis API] Analyzing website with Claude: Example Site
[Claude] Starting marketing analysis
[Claude] Model: claude-3-sonnet-20240229
[Claude] Response received
[Marketing Analysis API] Claude analysis completed
```

### エラーログ

```
[Marketing Analysis API] Error: 404
[Claude] API Error: not_found_error
Error: model: claude-3-sonnet-20240229
```

**→ APIキーが設定されていない証拠**

---

## ✅ 確認チェックリスト

### Anthropic側
- [ ] Anthropic Consoleにログインできる
- [ ] APIキーを新規作成した
- [ ] キーをコピーした（完全な文字列）
- [ ] Workbenchでテストして動作確認

### Vercel側
- [ ] 環境変数名: `ANTHROPIC_API_KEY`
- [ ] 値: `sk-ant-api03-...`（完全）
- [ ] 環境: Production, Preview, Development すべて選択
- [ ] Redeployを実行（キャッシュなし）

### デプロイ
- [ ] 最新デプロイが Ready 状態
- [ ] Runtime Logsにエラーがない
- [ ] アプリで Step 3 がエラーなく動作

---

## 💡 代替案

### もしAnthropicが使えない場合

#### オプション1: OpenAI GPT-4を使用

**環境変数**:
```
OPENAI_API_KEY=sk-...
```

**コード変更**:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [{ role: 'user', content: prompt }],
});
```

#### オプション2: Geminiのテキスト分析を使用

**既存のGeminiを活用**:
```typescript
// Gemini Proはテキスト分析も可能
const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro' 
});
```

---

## 🚀 次のアクション

### 今すぐ実行すること

1. **Anthropic Console確認**
   ```
   https://console.anthropic.com/
   → API Keys → Create Key
   ```

2. **キーをコピー**
   ```
   sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Vercel設定**
   ```
   Settings → Environment Variables
   → Add New
   → Name: ANTHROPIC_API_KEY
   → Value: (コピーしたキー)
   → すべての環境を選択
   → Save
   ```

4. **Redeploy**
   ```
   Deployments → Latest → Redeploy
   → "Use existing Build Cache" のチェックを外す
   → Redeploy
   ```

5. **テスト**
   ```
   https://ad-cr-banana01.vercel.app
   → Step 3まで進む
   → エラーが出ないことを確認
   ```

---

## 🎉 成功の確認

### Step 3で以下が表示されればOK

```
マーケティング分析

競合分析
1. 競合企業A
2. 競合企業B  
3. 競合企業C

強み (USP)
1. 強み1
2. 強み2
3. 強み3

ターゲットペルソナ
詳細な説明...

ブランドトーン
説明...
```

---

**APIキーが正しく設定されていれば、必ず動作します！** ✨

**作成日**: 2025-12-01  
**ステータス**: 確認必須
