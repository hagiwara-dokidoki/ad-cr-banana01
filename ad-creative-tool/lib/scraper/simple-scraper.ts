/**
 * Simple Website Scraper (Vercel完全対応版)
 * HTTPリクエストとCheerioを使用した軽量スクレイピング
 */

import * as cheerio from 'cheerio';
import { config } from '../config';

export interface ScrapedData {
  url: string;
  title: string;
  description: string;
  screenshot: Buffer;
  images: string[];
  textContent: {
    h1: string[];
    h2: string[];
    paragraphs: string[];
  };
}

export class WebsiteScraper {
  /**
   * Webサイトをスクレイピング
   */
  async scrape(url: string): Promise<ScrapedData> {
    try {
      // HTMLを取得
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // タイトル取得
      const title = $('title').text() || $('h1').first().text() || 'No title';

      // メタディスクリプション取得
      const description = $('meta[name="description"]').attr('content') || '';

      // 画像URL抽出
      const images = this.extractImages($, url);

      // テキストコンテンツ取得
      const textContent = this.extractText($);

      // スクリーンショット（ダミー画像を生成）
      const screenshot = await this.generateDummyScreenshot(title);

      return {
        url,
        title,
        description,
        screenshot,
        images,
        textContent,
      };
    } catch (error) {
      console.error('[Simple Scraper] Error:', error);
      throw error;
    }
  }

  /**
   * 画像URL抽出
   */
  private extractImages($: cheerio.CheerioAPI, baseUrl: string): string[] {
    const imageUrls = new Set<string>();

    // OG Image
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) {
      try {
        imageUrls.add(new URL(ogImage, baseUrl).href);
      } catch {}
    }

    // IMG タグ（大きい画像のみ）
    $('img').each((_, elem) => {
      const src = $(elem).attr('src');
      if (src) {
        try {
          const absoluteUrl = new URL(src, baseUrl).href;
          // 画像サイズの推定（URLから判断）
          if (!src.includes('icon') && !src.includes('logo') && !src.includes('sprite')) {
            imageUrls.add(absoluteUrl);
          }
        } catch {}
      }
    });

    return Array.from(imageUrls).slice(0, config.maxImagesExtract);
  }

  /**
   * テキストコンテンツ抽出
   */
  private extractText($: cheerio.CheerioAPI) {
    const h1 = $('h1')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean);

    const h2 = $('h2')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean);

    const paragraphs = $('p')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((text) => text.length > 20)
      .slice(0, 10);

    return {
      h1,
      h2,
      paragraphs,
    };
  }

  /**
   * ダミースクリーンショット生成
   * （実際のスクリーンショットの代わりに、シンプルな画像を生成）
   */
  private async generateDummyScreenshot(title: string): Promise<Buffer> {
    // より見栄えの良いSVGプレビューを生成
    const svg = `
      <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
        <!-- グラデーション背景 -->
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#bg)"/>
        
        <!-- 中央のカード -->
        <rect x="150" y="200" width="900" height="400" rx="20" fill="white" opacity="0.95"/>
        
        <!-- ブラウザバーのシミュレーション -->
        <rect x="150" y="200" width="900" height="50" rx="20" fill="#e2e8f0"/>
        <rect x="150" y="230" width="900" height="370" rx="0 0 20 20" fill="white"/>
        
        <!-- ブラウザドット -->
        <circle cx="180" cy="225" r="8" fill="#ff5f57"/>
        <circle cx="210" cy="225" r="8" fill="#febc2e"/>
        <circle cx="240" cy="225" r="8" fill="#28c840"/>
        
        <!-- タイトルテキスト -->
        <text x="600" y="350" 
              font-family="system-ui, -apple-system, sans-serif" 
              font-size="32" 
              font-weight="600"
              fill="#1a202c" 
              text-anchor="middle">
          ${this.escapeXml(title.slice(0, 50))}
        </text>
        
        <!-- サブテキスト -->
        <text x="600" y="420" 
              font-family="system-ui, -apple-system, sans-serif" 
              font-size="18" 
              fill="#718096" 
              text-anchor="middle">
          Webサイトプレビュー
        </text>
        
        <!-- フッター説明 -->
        <text x="600" y="480" 
              font-family="system-ui, -apple-system, sans-serif" 
              font-size="14" 
              fill="#a0aec0" 
              text-anchor="middle">
          ※ サーバーレス環境のため、スクリーンショット機能は簡易表示されています
        </text>
      </svg>
    `;

    return Buffer.from(svg);
  }

  /**
   * XML特殊文字のエスケープ
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * ブラウザをクローズ（互換性のため）
   */
  async close() {
    // 何もしない（HTTPリクエストベースなので不要）
  }
}

// シングルトンインスタンス
let scraperInstance: WebsiteScraper | null = null;

export function getScraper(): WebsiteScraper {
  if (!scraperInstance) {
    scraperInstance = new WebsiteScraper();
  }
  return scraperInstance;
}
