/**
 * Banner Composition API
 * 背景画像とテキストを合成してバナーを生成
 * Uses @vercel/og for text overlay on background
 */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.url ? new URL(request.url) : { searchParams: new URLSearchParams() };
    
    const text = searchParams.get('text') || 'Sample Text';
    const bg = searchParams.get('bg') || '';
    const color = searchParams.get('color') || '#3B82F6';
    const size = searchParams.get('size') || 'square';

    // サイズを決定
    const width = 1080;
    const height = size === 'square' ? 1080 : 1920;

    // フォントサイズをサイズに応じて調整
    const fontSize = size === 'square' ? 80 : 100;

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
          }}
        >
          {/* Background - SVG gradient or image */}
          {bg && bg.startsWith('data:image/svg+xml') ? (
            // SVGの場合はそのまま使用
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
              }}
              dangerouslySetInnerHTML={{
                __html: decodeURIComponent(bg.replace('data:image/svg+xml,', '')),
              }}
            />
          ) : bg ? (
            // 通常の画像URLの場合
            <img
              src={bg}
              alt="background"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            // 背景がない場合はデフォルトグラデーション
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${color}22 0%, ${color}88 100%)`,
              }}
            />
          )}

          {/* Text Overlay with Shadow */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'center',
              zIndex: 10,
              maxWidth: '90%',
            }}
          >
            <div
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: 900,
                color: '#FFFFFF',
                textShadow: '0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: 1.2,
                wordWrap: 'break-word',
                letterSpacing: '-0.02em',
              }}
            >
              {text}
            </div>
          </div>

          {/* Subtle Overlay for Better Text Readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.3) 100%)',
              zIndex: 1,
            }}
          />
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (error) {
    console.error('Banner composition error:', error);
    
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
          バナー生成エラー
        </div>
      ),
      {
        width: 1080,
        height: 1080,
      }
    );
  }
}
