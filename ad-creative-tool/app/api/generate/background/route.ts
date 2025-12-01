/**
 * API Route: Background Image Generation
 * POST /api/generate/background
 * Imagen 3で背景画像を生成
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateBackground } from '@/lib/ai/gemini';
import { put } from '@vercel/blob';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, tone, size } = body;

    if (!category || !tone || !size) {
      return NextResponse.json(
        { success: false, error: 'Category, tone, and size are required' },
        { status: 400 }
      );
    }

    if (size !== 'square' && size !== 'vertical') {
      return NextResponse.json(
        { success: false, error: 'Invalid size. Must be "square" or "vertical"' },
        { status: 400 }
      );
    }

    console.log('[Background Generation API] Generating background:', { category, tone, size });

    // 背景画像を生成
    const imageData = await generateBackground({ category, tone, size });

    // Base64データをBufferに変換
    let imageBuffer: Buffer;
    if (imageData.startsWith('data:')) {
      // data URL形式
      const base64Data = imageData.split(',')[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      // その他の形式（URLの場合はfetchする）
      const response = await fetch(imageData);
      const arrayBuffer = await response.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }

    // Vercel Blobにアップロード
    const blob = await put(
      `backgrounds/${Date.now()}-${size}.png`,
      imageBuffer,
      {
        access: 'public',
        contentType: 'image/png',
      }
    );

    console.log('[Background Generation API] Background uploaded to:', blob.url);

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
    });

  } catch (error) {
    console.error('[Background Generation API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
