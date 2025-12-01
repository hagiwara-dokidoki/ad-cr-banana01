/**
 * API Route: Color Analysis
 * POST /api/analyze/colors
 * スクリーンショット画像からカラーパレットを抽出
 */

import { NextRequest, NextResponse } from 'next/server';
import { extractColors } from '@/lib/ai/gemini';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image URL is required' },
        { status: 400 }
      );
    }

    console.log('[Color Analysis API] Extracting colors from:', imageUrl);

    // SVGプレースホルダーの場合はデフォルトカラーを返す
    if (imageUrl.startsWith('data:image/svg')) {
      console.log('[Color Analysis API] SVG placeholder detected, using default colors');
      return NextResponse.json({
        success: true,
        colors: {
          main: '#3B82F6',    // ブルー
          accent: '#F59E0B',  // オレンジ
          base: '#F3F4F6',    // グレー
        },
      });
    }

    const colors = await extractColors(imageUrl);

    console.log('[Color Analysis API] Colors extracted:', colors);

    return NextResponse.json({
      success: true,
      colors,
    });

  } catch (error) {
    console.error('[Color Analysis API] Error:', error);
    
    // エラー時はデフォルトカラーを返す
    console.log('[Color Analysis API] Using fallback colors due to error');
    return NextResponse.json({
      success: true,
      colors: {
        main: '#3B82F6',
        accent: '#F59E0B',
        base: '#F3F4F6',
      },
    });
  }
}
