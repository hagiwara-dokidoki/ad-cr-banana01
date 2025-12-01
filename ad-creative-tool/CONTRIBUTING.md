# コントリビューションガイド

広告クリエイティブ自動生成ツールへの貢献に興味を持っていただきありがとうございます！

## 🤝 貢献の方法

### バグ報告

バグを発見した場合は、以下の情報を含めてGitHub Issueを作成してください：

1. **環境情報**
   - OS
   - Node.jsバージョン
   - ブラウザ（該当する場合）

2. **再現手順**
   - 問題を再現するための詳細な手順

3. **期待される動作**
   - 何が起こるべきだったか

4. **実際の動作**
   - 実際に何が起こったか

5. **スクリーンショット**
   - 該当する場合は画像を添付

### 機能提案

新機能の提案は大歓迎です！以下を含めてIssueを作成してください：

1. **機能の説明**
   - 何を実装したいか

2. **ユースケース**
   - なぜこの機能が必要か

3. **実装案**
   - 可能であれば、実装のアイデア

### プルリクエスト

1. **フォークとクローン**
   ```bash
   git clone https://github.com/your-username/ad-cr-banana01.git
   cd ad-cr-banana01/ad-creative-tool
   ```

2. **ブランチを作成**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **開発環境のセットアップ**
   ```bash
   npm install
   npm run playwright:install
   cp .env.local.example .env.local
   # .env.localを編集してAPIキーを設定
   ```

4. **変更を実装**
   - コードスタイルに従う（ESLint/Prettier）
   - 型安全性を保つ（TypeScript）
   - コメントを適切に記述

5. **テスト**
   ```bash
   npm run type-check
   npm run lint
   npm run build
   npm run dev  # 動作確認
   ```

6. **コミット**
   ```bash
   git add .
   git commit -m "feat: 新機能の説明"
   ```

   コミットメッセージは[Conventional Commits](https://www.conventionalcommits.org/)に従ってください：
   - `feat:` 新機能
   - `fix:` バグ修正
   - `docs:` ドキュメント更新
   - `style:` コードスタイル修正
   - `refactor:` リファクタリング
   - `test:` テスト追加
   - `chore:` ビルド・設定変更

7. **プッシュ**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **プルリクエスト作成**
   - GitHubでプルリクエストを作成
   - 変更内容を詳しく説明
   - 関連するIssueを参照

## 📝 コーディング規約

### TypeScript

- **型定義を必ず使用**
  ```typescript
  // Good
  function processData(data: string): number {
    return data.length;
  }

  // Bad
  function processData(data) {
    return data.length;
  }
  ```

- **any型の使用を避ける**
  ```typescript
  // Good
  interface Response {
    success: boolean;
    data?: string;
  }

  // Bad
  const response: any = ...
  ```

### React/Next.js

- **Server ComponentとClient Componentを適切に使い分ける**
  ```tsx
  // Client Component
  'use client';
  import { useState } from 'react';
  
  // Server Component（デフォルト）
  export default function Page() {
    return <div>...</div>;
  }
  ```

- **コンポーネントは単一責任の原則に従う**
  - 1つのコンポーネントは1つの役割のみ
  - 複雑な場合は分割する

### ファイル構成

```
app/
├── api/              # API Routes
│   └── [feature]/
│       └── route.ts
├── [route]/          # ページ
│   └── page.tsx
components/           # Reactコンポーネント
├── steps/           # ステップコンポーネント
└── ui/              # 共通UIコンポーネント
lib/                 # ユーティリティ・ヘルパー
├── ai/              # AI統合
└── scraper/         # スクレイピング
types/               # TypeScript型定義
```

### 命名規則

- **ファイル名**: kebab-case
  - `user-profile.tsx`
  - `api-client.ts`

- **コンポーネント**: PascalCase
  - `UserProfile`
  - `ApiClient`

- **関数・変数**: camelCase
  - `getUserData`
  - `isLoading`

- **定数**: UPPER_SNAKE_CASE
  - `MAX_RETRY_COUNT`
  - `API_BASE_URL`

### コメント

```typescript
/**
 * 関数の説明
 * @param param1 パラメータの説明
 * @returns 戻り値の説明
 */
export function myFunction(param1: string): number {
  // 実装の詳細なコメント
  return 42;
}
```

## 🧪 テスト

現在、テストフレームワークは未実装ですが、以下を推奨：

- **単体テスト**: Jest + React Testing Library
- **E2Eテスト**: Playwright
- **型チェック**: TypeScript

貢献の一環としてテストを追加していただけると大変助かります！

## 📚 ドキュメント

コードと同様に、ドキュメントの改善も歓迎します：

- README.md
- API.md
- DEPLOYMENT.md
- このCONTRIBUTING.md

## 🔍 コードレビュー

プルリクエストは以下の観点でレビューされます：

1. **機能性**: 正しく動作するか
2. **コード品質**: 読みやすく保守しやすいか
3. **型安全性**: TypeScriptの型が適切か
4. **パフォーマンス**: 不要な再レンダリング等がないか
5. **セキュリティ**: 脆弱性がないか
6. **ドキュメント**: 適切なコメント・説明があるか

## 💬 コミュニケーション

- **GitHub Issues**: バグ報告・機能提案
- **GitHub Discussions**: 一般的な質問・アイデア
- **Pull Requests**: コードレビュー・フィードバック

## 📄 ライセンス

このプロジェクトに貢献することで、あなたのコントリビューションがMITライセンスの下でライセンスされることに同意したことになります。

## 🙏 謝辞

すべてのコントリビューターに感謝します！あなたの貢献がこのプロジェクトをより良いものにします。

---

質問がある場合は、遠慮なくIssueを作成してください！
