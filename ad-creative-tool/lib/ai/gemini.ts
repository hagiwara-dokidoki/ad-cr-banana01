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
 * 背景画像を生成
 * 注: Imagen 3はGoogle AI Studio経由では現在利用不可のため、
 * プレースホルダー画像を生成します
 */
export async function generateBackground(params: {
  category: string;
  tone: string;
  size: 'square' | 'vertical';
}): Promise<string> {
  const dimensions = config.bannerSizes[params.size];
  
  // カテゴリとトーンに応じた色を選択
  const colorSchemes: Record<string, string[]> = {
    'technology': ['#667eea', '#764ba2'],
    'fashion': ['#f093fb', '#f5576c'],
    'food': ['#fa709a', '#fee140'],
    'health': ['#a8edea', '#fed6e3'],
    'business': ['#4facfe', '#00f2fe'],
    'education': ['#43e97b', '#38f9d7'],
    'default': ['#667eea', '#764ba2'],
  };
  
  const colors = colorSchemes[params.category?.toLowerCase()] || colorSchemes.default;
  
  // SVGでグラデーション背景を生成
  const svg = `
    <svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
        </linearGradient>
        <filter id="noise">
          <feTurbulence baseFrequency="0.9" numOctaves="4" />
          <feColorMatrix type="saturate" values="0"/>
        </filter>
      </defs>
      <rect width="${dimensions.width}" height="${dimensions.height}" fill="url(#bg)"/>
      <rect width="${dimensions.width}" height="${dimensions.height}" fill="white" opacity="0.05" filter="url(#noise)"/>
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}
