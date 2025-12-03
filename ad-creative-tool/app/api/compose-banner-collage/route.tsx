/**
 * Banner Collage Composition API
 * 複数画像を使用したコラージュスタイルのバナーを生成
 * Uses @vercel/og for collage layout
 */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.url ? new URL(request.url) : { searchParams: new URLSearchParams() };
    
    const text = searchParams.get('text') || 'Sample Text';
    const color = searchParams.get('color') || '#3B82F6';
    const size = searchParams.get('size') || 'square';
    
    // 複数の画像URL（カンマ区切り）
    const bgParam = searchParams.get('bg') || '';
    const bgImages = bgParam ? bgParam.split(',').filter(url => url.trim()) : [];

    console.log('[compose-banner-collage] Parameters:', { 
      text, 
      color, 
      size, 
      imageCount: bgImages.length 
    });

    // サイズを決定
    const width = 1080;
    const height = size === 'square' ? 1080 : 1920;

    // フォントサイズをサイズに応じて調整
    const fontSize = size === 'square' ? 72 : 90;

    // コラージュレイアウトのパターン
    const getCollageLayout = (imageCount: number) => {
      if (imageCount === 1) {
        return [{ width: '100%', height: '100%', top: 0, left: 0 }];
      } else if (imageCount === 2) {
        return [
          { width: '50%', height: '100%', top: 0, left: 0 },
          { width: '50%', height: '100%', top: 0, left: '50%' },
        ];
      } else if (imageCount === 3) {
        return [
          { width: '50%', height: '100%', top: 0, left: 0 },
          { width: '50%', height: '50%', top: 0, left: '50%' },
          { width: '50%', height: '50%', top: '50%', left: '50%' },
        ];
      } else if (imageCount === 4) {
        return [
          { width: '50%', height: '50%', top: 0, left: 0 },
          { width: '50%', height: '50%', top: 0, left: '50%' },
          { width: '50%', height: '50%', top: '50%', left: 0 },
          { width: '50%', height: '50%', top: '50%', left: '50%' },
        ];
      } else {
        // 5枚以上の場合
        return [
          { width: '40%', height: '50%', top: 0, left: 0 },
          { width: '30%', height: '50%', top: 0, left: '40%' },
          { width: '30%', height: '50%', top: 0, left: '70%' },
          { width: '50%', height: '50%', top: '50%', left: 0 },
          { width: '50%', height: '50%', top: '50%', left: '50%' },
        ];
      }
    };

    const layout = bgImages.length > 0 ? getCollageLayout(Math.min(bgImages.length, 5)) : [];

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
            fontFamily: 'sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {/* Collage Background Images */}
          {bgImages.length > 0 && layout.map((pos, index) => {
            if (index >= bgImages.length) return null;
            const imageUrl = bgImages[index];
            
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  height: pos.height,
                  overflow: 'hidden',
                  display: 'flex',
                }}
              >
                <img
                  src={imageUrl}
                  alt={`collage-${index}`}
                  width={width}
                  height={height}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            );
          })}

          {/* Overlay for Better Text Readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
              display: 'flex',
            }}
          />

          {/* Text Overlay with Bold Shadow */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
              textAlign: 'center',
              zIndex: 10,
              maxWidth: '85%',
            }}
          >
            <div
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: 800,
                color: '#FFFFFF',
                textShadow: '0 4px 16px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              {text}
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (error) {
    console.error('Banner collage composition error:', error);
    
    // エラー時はシンプルなエラーバナーを返す
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            color: 'white',
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          コラージュバナー生成エラー
        </div>
      ),
      {
        width: 1080,
        height: 1080,
      }
    );
  }
}
