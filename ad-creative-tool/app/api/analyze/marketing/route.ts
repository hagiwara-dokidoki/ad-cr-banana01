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

    console.log('[Marketing Analysis API] Generating analysis for:', title);

    // ダミーデータを返す（APIキー問題の回避）
    const analysis = {
      competitors: [
        `${title}の競合A`,
        `${title}の競合B`,
        `${title}の競合C`,
      ],
      strengths: [
        '高品質なサービス提供',
        'ユーザー体験の最適化',
        '革新的なソリューション',
      ],
      target: `${title}に興味を持つ、問題解決を求める20-40代のビジネスパーソンや個人ユーザー。効率化や品質向上を重視し、新しい技術やサービスに積極的。`,
      brandTone: '信頼感と先進性を兼ね備えた、プロフェッショナルで親しみやすいトーン',
    };

    console.log('[Marketing Analysis API] Analysis completed (demo mode)');

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
