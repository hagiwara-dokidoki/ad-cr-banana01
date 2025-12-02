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

    console.log('[Copy Generation API] Generating copies (demo mode)...');

    // ダミーコピーを生成（APIキー問題の回避）
    const demoCount = count || 20;
    const copies = Array.from({ length: demoCount }, (_, i) => {
      const templates = [
        `${analysis.target}のための最適なソリューション`,
        `${analysis.strengths[0]}で実現する新しい体験`,
        `今すぐ始める、${category || '最高の'}サービス`,
        `選ばれる理由がここにある`,
        `あなたの課題を解決します`,
        `信頼と実績の${productName || 'サービス'}`,
        `${analysis.brandTone}を体現するブランド`,
        `革新的な${category || 'ソリューション'}をあなたに`,
        `プロフェッショナルが選ぶ理由`,
        `成功への第一歩をここから`,
      ];
      return templates[i % templates.length] + (i >= 10 ? ` - ${i + 1}` : '');
    });

    console.log('[Copy Generation API] Generated', copies.length, 'copies (demo)');

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
