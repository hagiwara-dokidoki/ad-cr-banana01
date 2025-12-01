/**
 * Google Gemini AI Integration
 * カラー抽出とマーケティング分析を担当
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import type { ColorPalette, AnalysisResult } from '@/types/project';

const genAI = new GoogleGenerativeAI(config.googleAiApiKey);

/**
 * スクリーンショット画像からカラーパレットを抽出
 */
export async function extractColors(imageUrl: string): Promise<ColorPalette> {
  const model = genAI.getGenerativeModel({ model: config.geminiModel });

  // 画像を取得
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString('base64');

  const prompt = `この画像（Webサイトのスクリーンショット）を分析し、以下の3つのカラーを抽出してください：

1. **メインカラー (main)**: サイトで最も使用されている主要な色
2. **アクセントカラー (accent)**: ボタンやCTAなどで使われている目立つ色
3. **ベースカラー (base)**: 背景や基調となる色

必ず以下のJSON形式で返してください（他のテキストは含めないでください）：
{
  "main": "#RRGGBB",
  "accent": "#RRGGBB",
  "base": "#RRGGBB"
}`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: 'image/png',
        data: imageBase64,
      },
    },
  ]);

  const response = result.response;
  const text = response.text();
  
  // JSONを抽出（```json ``` で囲まれている場合も対応）
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse color data from Gemini response');
  }

  const colors = JSON.parse(jsonMatch[0]) as ColorPalette;
  
  return colors;
}

/**
 * Webサイト情報からマーケティング分析を実行
 */
export async function analyzeMarketing(data: {
  title: string;
  description: string;
  textContent: {
    h1: string[];
    h2: string[];
    paragraphs: string[];
  };
  category?: string;
}): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: config.geminiModel });

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

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // JSONを抽出
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse analysis data from Gemini response');
  }

  const analysis = JSON.parse(jsonMatch[0]) as AnalysisResult;

  return analysis;
}

/**
 * Imagen 3 で背景画像を生成
 */
export async function generateBackground(params: {
  category: string;
  tone: string;
  size: 'square' | 'vertical';
}): Promise<string> {
  const dimensions = config.bannerSizes[params.size];
  
  // Imagen 3のプロンプト構成
  const prompt = `Product photography style for ${params.category}, ${params.tone} mood, minimalist composition, high quality, 4k, clean background space in the center for text overlay, professional advertising style, negative space for copy placement`;

  // Google AI Studio の Imagen APIを使用
  const model = genAI.getGenerativeModel({ model: config.imagenModel });

  try {
    const result = await model.generateContent([
      {
        text: prompt,
      },
    ]);

    const response = result.response;
    
    // Imagenの場合、画像データはresponseに含まれる
    // 注: 実際のImagen APIの実装に応じて調整が必要
    if (response.candidates && response.candidates[0]?.content?.parts?.[0]) {
      const part = response.candidates[0].content.parts[0];
      
      // inlineDataがある場合
      if ('inlineData' in part && part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error('No image data returned from Imagen');
  } catch (error) {
    console.error('[Gemini] Image generation error:', error);
    throw new Error(`Failed to generate background image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
