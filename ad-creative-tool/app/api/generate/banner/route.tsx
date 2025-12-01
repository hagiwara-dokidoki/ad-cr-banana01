/**
 * API Route: Banner Composition
 * GET /api/generate/banner
 * @vercel/ogを使用して背景画像にテキストを合成
 */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const backgroundUrl = searchParams.get('bg');
    const text = searchParams.get('text');
    const color = searchParams.get('color') || '#FFFFFF';
    const size = searchParams.get('size') || 'square';
    
    if (!backgroundUrl || !text) {
      return new Response('Missing required parameters: bg, text', { status: 400 });
    }

    const dimensions = size === 'vertical' 
      ? { width: 1080, height: 1920 }
      : { width: 1080, height: 1080 };

    // Noto Sans JPフォントをロード
    const fontData = await fetch(
      new URL('https://fonts.gstatic.com/s/notosansjp/v52/nKKZ-Go6G5tXcr4XfDb8OIhhaLY.woff2')
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            fontFamily: '"Noto Sans JP"',
          }}
        >
          {/* 背景画像 */}
          <img
            src={backgroundUrl}
            alt="Background"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          
          {/* テキストオーバーレイ */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              zIndex: 10,
            }}
          >
            {/* 背景座布団（半透明） */}
            <div
              style={{
                position: 'absolute',
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '40px 60px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
              }}
            />
            
            {/* キャッチコピー */}
            <div
              style={{
                fontSize: size === 'vertical' ? 72 : 64,
                fontWeight: 900,
                color: color,
                textAlign: 'center',
                textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
                lineHeight: 1.3,
                zIndex: 20,
                maxWidth: '90%',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
              }}
            >
              {text}
            </div>
          </div>
        </div>
      ),
      {
        ...dimensions,
        fonts: [
          {
            name: 'Noto Sans JP',
            data: fontData,
            style: 'normal',
            weight: 900,
          },
        ],
      }
    );

  } catch (error) {
    console.error('[Banner Generation API] Error:', error);
    return new Response(
      error instanceof Error ? error.message : 'Unknown error occurred',
      { status: 500 }
    );
  }
}
