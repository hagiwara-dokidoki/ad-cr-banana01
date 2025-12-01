/**
 * Anthropic Claude AI Integration
 * キャッチコピー生成を担当
 */

import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config';
import type { AnalysisResult } from '@/types/project';

const anthropic = new Anthropic({
  apiKey: config.anthropicApiKey,
});

/**
 * キャッチコピーを生成
 */
export async function generateCopies(params: {
  analysis: AnalysisResult;
  productName?: string;
  category?: string;
  tone?: string;
  ngWords?: string[];
  count?: number;
}): Promise<string[]> {
  const {
    analysis,
    productName = '',
    category = '',
    tone = '',
    ngWords = [],
    count = config.maxCopyCandidates,
  } = params;

  const prompt = `あなたは日本の優秀な広告コピーライターです。以下の情報を基に、魅力的なキャッチコピーを${count}個作成してください。

# 商品/サービス情報
${productName ? `- 商品名: ${productName}` : ''}
${category ? `- カテゴリ: ${category}` : ''}

# マーケティング分析
- **ターゲット**: ${analysis.target}
- **強み (USP)**: 
  ${analysis.strengths.map((s, i) => `  ${i + 1}. ${s}`).join('\n  ')}
- **ブランドトーン**: ${analysis.brandTone}
- **競合**: ${analysis.competitors.join(', ')}

${tone ? `# 希望するトーン\n${tone}\n` : ''}
${ngWords.length > 0 ? `# NGワード（使用禁止）\n${ngWords.join(', ')}\n` : ''}

# キャッチコピー作成ルール
1. **15〜30文字**程度の読みやすい長さ
2. ターゲットの**感情**に訴えかける表現
3. 強み（USP）を**明確**に伝える
4. **行動を促す**要素を含める
5. 日本語として**自然**で魅力的な表現
6. 広告バナーに配置することを想定し、**視覚的にインパクト**のある言葉選び
7. 競合との**差別化**を意識する

# 出力形式
以下の形式で、キャッチコピーのみを番号付きリストで出力してください：

1. キャッチコピー1
2. キャッチコピー2
3. キャッチコピー3
...

説明や補足は不要です。キャッチコピーのみを出力してください。`;

  const message = await anthropic.messages.create({
    model: config.claudeModel,
    max_tokens: 4096,
    temperature: 0.8, // クリエイティブな出力のため高めに設定
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const responseText = message.content[0].type === 'text' 
    ? message.content[0].text 
    : '';

  // 番号付きリストから抽出
  const copies = responseText
    .split('\n')
    .filter((line) => /^\d+\./.test(line.trim())) // "1.", "2." などで始まる行
    .map((line) => line.replace(/^\d+\.\s*/, '').trim()) // 番号を削除
    .filter((copy) => copy.length > 0); // 空行を除外

  if (copies.length === 0) {
    throw new Error('Failed to generate copies from Claude response');
  }

  return copies;
}

/**
 * キャッチコピーを編集・改善
 */
export async function refineCopy(params: {
  originalCopy: string;
  feedback: string;
  analysis: AnalysisResult;
}): Promise<string> {
  const { originalCopy, feedback, analysis } = params;

  const prompt = `以下のキャッチコピーを、フィードバックに基づいて改善してください。

# 元のキャッチコピー
${originalCopy}

# フィードバック
${feedback}

# マーケティング情報
- ターゲット: ${analysis.target}
- ブランドトーン: ${analysis.brandTone}

# 出力
改善したキャッチコピーのみを出力してください（説明不要）。`;

  const message = await anthropic.messages.create({
    model: config.claudeModel,
    max_tokens: 1024,
    temperature: 0.7,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const refinedCopy = message.content[0].type === 'text' 
    ? message.content[0].text.trim() 
    : '';

  return refinedCopy;
}
