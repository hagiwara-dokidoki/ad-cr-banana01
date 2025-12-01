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

/**
 * マーケティング分析を実行（Geminiの代替）
 */
export async function analyzeMarketingWithClaude(data: {
  title: string;
  description: string;
  textContent: {
    h1: string[];
    h2: string[];
    paragraphs: string[];
  };
  category?: string;
}): Promise<AnalysisResult> {
  const prompt = `以下のWebサイト情報を分析し、マーケティングの観点から詳細な分析を行ってください：

# Webサイト情報
- **タイトル**: ${data.title}
- **説明**: ${data.description}
- **見出し (H1)**: ${data.textContent.h1.join(', ')}
- **見出し (H2)**: ${data.textContent.h2.slice(0, 5).join(', ')}
- **本文**: ${data.textContent.paragraphs.slice(0, 3).join(' ')}
${data.category ? `- **商材カテゴリ**: ${data.category}` : ''}

以下の項目を含むJSON形式で分析結果を返してください（他のテキストは含めないでください）：

{
  "competitors": ["競合企業1", "競合企業2", "競合企業3"],
  "strengths": ["強み1", "強み2", "強み3"],
  "target": "ターゲットペルソナの詳細な説明（性別、年齢層、悩み、課題など）",
  "brandTone": "ブランドトーンの説明（例：信頼感、親しみやすさ、先進性など）"
}

※ 実際のビジネス環境を考慮した現実的な分析を行ってください。`;

  const message = await anthropic.messages.create({
    model: config.claudeModel,
    max_tokens: 2048,
    temperature: 0.3,
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
  
  // JSONを抽出
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse analysis data from Claude response');
  }

  const analysis = JSON.parse(jsonMatch[0]) as AnalysisResult;

  return analysis;
}
