/**
 * API Route: Copy Generation
 * POST /api/generate/copies
 * Claudeを使用してキャッチコピーを生成
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateCopies } from '@/lib/ai/claude';
import type { AnalysisResult } from '@/types/project';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      analysis, 
      productName, 
      category, 
      tone, 
      ngWords,
      count 
    } = body;

    if (!analysis) {
      return NextResponse.json(
        { success: false, error: 'Analysis data is required' },
        { status: 400 }
      );
    }

    console.log('[Copy Generation API] Generating copies...');

    const copies = await generateCopies({
      analysis: analysis as AnalysisResult,
      productName,
      category,
      tone,
      ngWords: ngWords || [],
      count: count || 20,
    });

    console.log('[Copy Generation API] Generated', copies.length, 'copies');

    return NextResponse.json({
      success: true,
      copies,
    });

  } catch (error) {
    console.error('[Copy Generation API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
