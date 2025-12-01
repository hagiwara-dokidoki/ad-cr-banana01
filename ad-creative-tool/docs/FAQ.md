# よくある質問（FAQ）

## 📋 一般的な質問

### Q1: このツールは無料で使えますか？

**A**: アプリケーション自体は無料ですが、以下のコストが発生します：

- **Google AI API（Gemini/Imagen）**: 従量課金（無料枠あり）
- **Anthropic API（Claude）**: 従量課金
- **Vercel**: Hobbyプラン無料 / Proプラン $20/月
- **Vercel Blob Storage**: 従量課金

個人利用の範囲であれば、月額数ドル程度で利用可能です。

### Q2: 商用利用は可能ですか？

**A**: はい、可能です。ただし：

- Vercel Proプラン（$20/月）の契約が必要
- 各AI APIの利用規約に従う必要があります
- MITライセンスに基づき自由に利用可能

### Q3: 生成したバナーの著作権は？

**A**: 以下の通りです：

- **生成されたバナー**: あなたに帰属
- **AI生成コンテンツ**: 各AIサービスの規約に従う
- **スクレイピングした画像**: 元サイトの著作権に注意

商用利用時は必ず元サイトの利用規約を確認してください。

## 🔧 技術的な質問

### Q4: どのブラウザで動きますか？

**A**: モダンブラウザすべてに対応：

- ✅ Chrome（推奨）
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11はサポート外

### Q5: APIキーはどこで取得しますか？

**A**: 

**Google AI API Key**
1. [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Googleアカウントでログイン
3. 「Get API Key」から作成

**Anthropic API Key**
1. [Anthropic Console](https://console.anthropic.com/)
2. アカウント作成（クレジットカード必要）
3. API Keysセクションで作成

### Q6: Playwrightが動作しません

**A**: 以下を試してください：

```bash
# ブラウザを再インストール
npm run playwright:install

# システム依存関係をインストール
npx playwright install-deps

# Dockerを使用する場合
docker run -it mcr.microsoft.com/playwright:v1.40.0-focal /bin/bash
```

### Q7: ビルドエラーが出ます

**A**: よくあるエラーと対処法：

```bash
# 型エラー
npm run type-check
# エラー箇所を確認して修正

# 依存パッケージエラー
rm -rf node_modules package-lock.json
npm install

# キャッシュクリア
rm -rf .next
npm run build
```

## 💡 使い方に関する質問

### Q8: どんなURLが適していますか？

**A**: 以下のようなページが最適：

✅ **推奨**
- ランディングページ（LP）
- 商品・サービス紹介ページ
- 企業の公式サイト
- 情報が豊富なページ

❌ **非推奨**
- ログインが必要なページ
- JavaScriptで動的に生成されるページ
- 画像が少ないページ
- 404エラーページ

### Q9: 生成されるコピーが意図と違います

**A**: 以下を試してください：

1. **商材カテゴリを指定**
   - より正確な分析が可能に

2. **トーンを選択**
   - ブランドイメージに合わせる

3. **NGワードを設定**
   - 避けたい表現を指定

4. **再生成**
   - 複数回試すと多様なバリエーション

5. **手動編集**
   - 生成されたコピーを編集可能

### Q10: バナーの品質が低いです

**A**: 以下の改善方法があります：

1. **カテゴリを詳細に指定**
   ```
   × "EC"
   ○ "高級化粧品のEC"
   ```

2. **ブランドトーンを明確に**
   - 分析結果を編集して詳細化

3. **複数回生成**
   - 20枚×再生成で多数のバリエーション

4. **画像を手動選択**
   - Step 2で適切な画像を選ぶ

## 🚀 デプロイに関する質問

### Q11: Vercelへのデプロイに失敗します

**A**: チェックリスト：

- [ ] Root Directory が `ad-creative-tool` に設定されているか
- [ ] Framework が Next.js として検出されているか
- [ ] 環境変数が正しく設定されているか
- [ ] Blob Storage が有効化されているか

エラーログを確認して、具体的なエラーを特定してください。

### Q12: デプロイ後にエラーが出ます

**A**: よくある原因：

1. **環境変数未設定**
   ```
   GOOGLE_AI_API_KEY
   ANTHROPIC_API_KEY
   ```
   Vercelの設定で追加

2. **Blob Storage未設定**
   - Storage → Create Database → Blob

3. **Function Timeout**
   - `vercel.json` で60秒に設定

4. **APIキーの制限**
   - 各APIの利用制限を確認

### Q13: カスタムドメインを設定したいです

**A**: Vercelダッシュボードから：

1. プロジェクト → Settings → Domains
2. カスタムドメインを追加
3. DNSレコードを設定（A/CNAME）
4. SSL証明書が自動発行される

## 💰 コストに関する質問

### Q14: 月額いくらかかりますか？

**A**: 使用量により異なりますが、目安：

**個人利用（月100バナー生成）**
- Vercel Hobby: 無料
- Google AI API: $5-10
- Anthropic API: $10-20
- **合計**: $15-30/月

**ビジネス利用（月1000バナー生成）**
- Vercel Pro: $20
- Google AI API: $50-100
- Anthropic API: $100-200
- **合計**: $170-320/月

### Q15: APIコストを削減するには？

**A**: 以下の戦略：

1. **キャッシング**
   - 同じURLの再分析を避ける

2. **バッチ処理**
   - 複数のバナーをまとめて生成

3. **モデル選択**
   - Gemini Flash（安価）を活用

4. **生成数の最適化**
   - 必要な数だけ生成

## 🔒 セキュリティに関する質問

### Q16: APIキーが漏洩したらどうしますか？

**A**: 即座に以下を実行：

1. **キーを無効化**
   - 各サービスのコンソールで削除

2. **新しいキーを発行**
   - 新しいAPIキーを作成

3. **環境変数を更新**
   - Vercelで新しいキーに更新

4. **デプロイ**
   - 設定を反映させるため再デプロイ

### Q17: ユーザーデータは保存されますか？

**A**: いいえ、以下の方針です：

- **セッションデータ**: ブラウザのみ（サーバー保存なし）
- **生成画像**: Vercel Blob（期限なし）
- **スクレイピングデータ**: リクエスト後破棄
- **個人情報**: 一切収集しない

### Q18: スクレイピングは合法ですか？

**A**: 一般的には合法ですが注意が必要：

✅ **OK**
- 公開されている情報
- robots.txtに従う
- 過度なアクセスをしない

❌ **NG**
- ログイン後の情報
- 著作権で保護されたコンテンツの無断使用
- DoS攻撃のような大量アクセス

利用規約を必ず確認してください。

## 🤝 コントリビューションに関する質問

### Q19: バグを見つけました

**A**: 報告方法：

1. [GitHub Issues](https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues)で新しいIssueを作成
2. 以下の情報を含める：
   - 環境（OS、ブラウザ）
   - 再現手順
   - 期待される動作
   - 実際の動作
   - スクリーンショット

### Q20: 新機能を提案したいです

**A**: 大歓迎です！

1. [GitHub Issues](https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues)で Feature Request を作成
2. 以下を記載：
   - 機能の説明
   - ユースケース
   - 実装案（あれば）

3. または[GitHub Discussions](https://github.com/hagiwara-dokidoki/ad-cr-banana01/discussions)で議論

## 📚 その他の質問

### Q21: オフラインで使えますか？

**A**: いいえ、以下が必要です：

- インターネット接続
- 外部AI APIへのアクセス
- Vercel Blobへのアクセス

### Q22: モバイルアプリはありますか？

**A**: 現在はWebアプリのみです。ただし：

- レスポンシブデザイン対応
- スマホブラウザで動作
- PWA化も検討中

### Q23: 他の言語に対応していますか？

**A**: 現在は日本語のみですが：

- UIの多言語化は可能
- AI生成は多言語対応（Claude, Gemini）
- 貢献歓迎（i18n対応）

### Q24: エンタープライズ向けプランはありますか？

**A**: 現在は個別対応です。以下の場合はご相談ください：

- 大量のバナー生成が必要
- カスタマイズが必要
- SLA保証が必要
- オンプレミス展開を希望

GitHubのIssuesまたはメールでお問い合わせください。

---

## 💬 さらに質問がある場合

- [GitHub Issues](https://github.com/hagiwara-dokidoki/ad-cr-banana01/issues)
- [GitHub Discussions](https://github.com/hagiwara-dokidoki/ad-cr-banana01/discussions)
- [README.md](../README.md)
- [DEPLOYMENT.md](../DEPLOYMENT.md)

お気軽にお問い合わせください！
