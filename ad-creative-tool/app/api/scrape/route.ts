/**
 * API Route: Website Scraping
 * POST /api/scrape
 * 指定URLのWebサイトをスクレイピングして情報を抽出
 */

import { NextRequest, NextResponse } from 'next/server';
import { getScraper } from '@/lib/scraper/playwright-scraper';
import { put } from '@vercel/blob';

export const maxDuration = 60; // Vercel Pro: 最大60秒

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // URLバリデーション
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    console.log('[Scrape API] Starting scrape for:', url);

    // Playwrightでスクレイピング
    const scraper = getScraper();
    const data = await scraper.scrape(url);

    console.log('[Scrape API] Scraping completed');

    // スクリーンショットをVercel Blobにアップロード
    const screenshotBlob = await put(
      `screenshots/${Date.now()}.png`,
      data.screenshot,
      {
        access: 'public',
        contentType: 'image/png',
      }
    );

    console.log('[Scrape API] Screenshot uploaded to blob storage');

    // レスポンス
    return NextResponse.json({
      success: true,
      data: {
        title: data.title,
        description: data.description,
        screenshot: screenshotBlob.url,
        images: data.images,
        textContent: data.textContent,
      },
    });

  } catch (error) {
    console.error('[Scrape API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
