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

    const colors = await extractColors(imageUrl);

    console.log('[Color Analysis API] Colors extracted:', colors);

    return NextResponse.json({
      success: true,
      colors,
    });

  } catch (error) {
    console.error('[Color Analysis API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
