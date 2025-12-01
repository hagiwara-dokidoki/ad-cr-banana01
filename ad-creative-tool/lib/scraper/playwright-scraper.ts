/**
 * Playwright Website Scraper
 * サイトのスクリーンショット、画像抽出、テキスト取得を行う
 */

import { chromium, Browser, Page } from 'playwright';
import { config } from '../config';

export interface ScrapedData {
  url: string;
  title: string;
  description: string;
  screenshot: Buffer;          // スクリーンショット画像
  images: string[];           // 抽出された画像URL
  textContent: {
    h1: string[];
    h2: string[];
    paragraphs: string[];
  };
}

export class WebsiteScraper {
  private browser: Browser | null = null;

  /**
   * ブラウザを起動
   */
  async init() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }
  }

  /**
   * ブラウザをクローズ
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Webサイトをスクレイピング
   */
  async scrape(url: string): Promise<ScrapedData> {
    await this.init();
    
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    const page = await this.browser.newPage();
    
    try {
      // ページにアクセス
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: config.screenshotTimeout,
      });

      // タイトル取得
      const title = await page.title();

      // メタディスクリプション取得
      const description = await page
        .$eval('meta[name="description"]', (el) => el.getAttribute('content'))
        .catch(() => '');

      // スクリーンショット撮影
      const screenshot = await page.screenshot({
        fullPage: true,
        type: 'png',
      });

      // 画像URL抽出
      const images = await this.extractImages(page);

      // テキストコンテンツ取得
      const textContent = await this.extractText(page);

      return {
        url,
        title,
        description: description || '',
        screenshot,
        images,
        textContent,
      };
    } finally {
      await page.close();
    }
  }

  /**
   * 画像URL抽出
   * - og:image
   * - img タグ
   * - CSS 背景画像
   */
  private async extractImages(page: Page): Promise<string[]> {
    const imageUrls = new Set<string>();

    // OG Image
    const ogImage = await page
      .$eval('meta[property="og:image"]', (el) => el.getAttribute('content'))
      .catch(() => null);
    if (ogImage) imageUrls.add(ogImage);

    // IMG タグ
    const imgElements = await page.$$eval('img', (imgs) =>
      imgs
        .map((img) => ({
          src: img.src,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
        }))
        .filter((img) => img.width >= 800) // 最小幅フィルタ
        .map((img) => img.src)
    );
    imgElements.forEach((src) => imageUrls.add(src));

    // CSS背景画像（オプション）
    const bgImages = await page.$$eval('[style*="background-image"]', (elements) =>
      elements
        .map((el) => {
          const style = (el as HTMLElement).style.backgroundImage;
          const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
          return match ? match[1] : null;
        })
        .filter((url): url is string => url !== null)
    );
    bgImages.forEach((src) => imageUrls.add(src));

    // 相対URLを絶対URLに変換
    const baseUrl = page.url();
    const absoluteUrls = Array.from(imageUrls).map((url) => {
      try {
        return new URL(url, baseUrl).href;
      } catch {
        return null;
      }
    }).filter((url): url is string => url !== null);

    // 最大数まで制限
    return absoluteUrls.slice(0, config.maxImagesExtract);
  }

  /**
   * テキストコンテンツ抽出
   */
  private async extractText(page: Page) {
    const h1 = await page.$$eval('h1', (elements) =>
      elements.map((el) => el.textContent?.trim() || '').filter(Boolean)
    );

    const h2 = await page.$$eval('h2', (elements) =>
      elements.map((el) => el.textContent?.trim() || '').filter(Boolean)
    );

    const paragraphs = await page.$$eval('p', (elements) =>
      elements
        .map((el) => el.textContent?.trim() || '')
        .filter((text) => text.length > 20) // 短すぎるものを除外
        .slice(0, 10) // 最大10段落
    );

    return {
      h1,
      h2,
      paragraphs,
    };
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
