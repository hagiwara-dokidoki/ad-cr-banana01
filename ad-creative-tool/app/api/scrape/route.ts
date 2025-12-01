/**
 * API Route: Website Scraping
 * POST /api/scrape
 * 指定URLのWebサイトをスクレイピングして情報を抽出
 */

import { NextRequest, NextResponse } from 'next/server';
import { getScraper } from '@/lib/scraper/simple-scraper';
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

    // スクリーンショットの処理
    let screenshotUrl: string;
    
    // Vercel Blob Storageが利用可能かチェック
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    
    if (hasBlobToken) {
      // 本番環境: Vercel Blobにアップロード
      try {
        const screenshotBlob = await put(
          `screenshots/${Date.now()}.png`,
          data.screenshot,
          {
            access: 'public',
            contentType: 'image/png',
          }
        );
        screenshotUrl = screenshotBlob.url;
        console.log('[Scrape API] Screenshot uploaded to blob storage');
      } catch (blobError) {
        console.warn('[Scrape API] Blob upload failed, falling back to base64:', blobError);
        // Blobアップロード失敗時はBase64にフォールバック
        screenshotUrl = `data:image/png;base64,${data.screenshot.toString('base64')}`;
      }
    } else {
      // 開発環境: Base64エンコードで返す
      screenshotUrl = `data:image/png;base64,${data.screenshot.toString('base64')}`;
      console.log('[Scrape API] Using base64 encoding (no blob token)');
    }

    // レスポンス
    return NextResponse.json({
      success: true,
      data: {
        title: data.title,
        description: data.description,
        screenshot: screenshotUrl,
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
