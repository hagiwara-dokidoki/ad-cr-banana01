/**
 * Demo Data for Testing
 * APIキーなしでアプリケーションをテストするためのモックデータ
 */

import type { ColorPalette, AnalysisResult } from '@/types/project';

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const mockColors: ColorPalette = {
  main: '#2563EB',
  accent: '#F59E0B',
  base: '#F3F4F6',
};

export const mockAnalysis: AnalysisResult = {
  competitors: [
    '株式会社A社 - 業界最大手、幅広い商品ラインナップ',
    '株式会社B社 - 高品質・高価格帯でのポジショニング',
    'C社 - オンライン特化、低価格戦略',
  ],
  strengths: [
    '独自の技術による高い品質保証',
    '24時間対応のカスタマーサポート',
    '初回購入者向けの充実した返金保証制度',
  ],
  target: '30〜45歳の働く女性。キャリアと家庭の両立を目指し、時短や効率化を重視。質の高い商品・サービスに対しては投資を惜しまない層。',
  brandTone: '信頼感と先進性のバランス。プロフェッショナルでありながら親しみやすい',
};

export const mockCopies = [
  'あなたの時間を、もっと大切なことに',
  '忙しいあなたに、最高の効率を',
  '品質で選ぶなら、やっぱりココ',
  '24時間、あなたのそばに',
  '始めよう、理想の毎日',
  '信頼の実績、10万人が選んだ',
  '今日から変わる、あなたの生活',
  'プロが認める、この品質',
  '時短でも、妥協しない',
  '初めてでも安心、充実サポート',
  'もっと自分らしく、もっと自由に',
  '毎日がもっと輝く',
  '選ばれる理由が、ここにある',
  '忙しさに負けない、賢い選択',
  'あなたらしさを、応援します',
  '質の高い毎日へ、一歩踏み出そう',
  '時間を味方に、夢を叶える',
  '満足度98%、試してわかる違い',
  '今すぐ始める、新しい自分',
  '後悔しない、最高の選択',
];

export const mockImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
];

export const mockScreenshot = 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200';

/**
 * デモモード用の遅延（リアルな動作を再現）
 */
export function demoDelay(seconds: number = 2): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * デモモード用のスクレイピング結果
 */
export async function getMockScrapeData(url: string) {
  await demoDelay(3); // 3秒待機
  
  return {
    success: true,
    data: {
      title: 'デモサイト - 高品質なサービスをあなたに',
      description: 'デモ用のサイト説明文です。実際のスクレイピングの代わりにモックデータを使用しています。',
      screenshot: mockScreenshot,
      images: mockImages,
      textContent: {
        h1: ['メインタイトル', 'サブタイトル'],
        h2: ['特徴1', '特徴2', '特徴3'],
        paragraphs: [
          'デモ用の本文です。実際にはスクレイピングで取得したコンテンツがここに入ります。',
          '詳細な説明文がここに続きます。',
        ],
      },
    },
  };
}

/**
 * デモモード用のカラー分析結果
 */
export async function getMockColorAnalysis() {
  await demoDelay(2);
  
  return {
    success: true,
    colors: mockColors,
  };
}

/**
 * デモモード用のマーケティング分析結果
 */
export async function getMockMarketingAnalysis() {
  await demoDelay(2);
  
  return {
    success: true,
    analysis: mockAnalysis,
  };
}

/**
 * デモモード用のコピー生成結果
 */
export async function getMockCopyGeneration() {
  await demoDelay(2);
  
  return {
    success: true,
    copies: mockCopies,
  };
}

/**
 * デモモード用の背景画像生成
 */
export async function getMockBackgroundGeneration() {
  await demoDelay(3);
  
  // Unsplashからランダムな画像を返す
  const randomId = Math.floor(Math.random() * 1000);
  return {
    success: true,
    imageUrl: `https://images.unsplash.com/photo-${1500000000000 + randomId}?w=1080&h=1080&fit=crop`,
  };
}
