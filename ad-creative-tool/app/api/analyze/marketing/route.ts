/**
 * API Route: Marketing Analysis
 * POST /api/analyze/marketing
 * Webサイト情報からマーケティング分析を実行
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyzeMarketing } from '@/lib/ai/gemini';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, textContent, category } = body;

    if (!title || !textContent) {
      return NextResponse.json(
        { success: false, error: 'Title and textContent are required' },
        { status: 400 }
      );
    }

    console.log('[Marketing Analysis API] Analyzing website:', title);

    const analysis = await analyzeMarketing({
      title,
      description: description || '',
      textContent,
      category,
    });

    console.log('[Marketing Analysis API] Analysis completed');

    return NextResponse.json({
      success: true,
      analysis,
    });

  } catch (error) {
    console.error('[Marketing Analysis API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
