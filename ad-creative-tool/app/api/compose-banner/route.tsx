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

    // 背景を決定（SVG data URIまたはグラデーション）
    let backgroundStyle: any = {};
    
    if (bg && bg.startsWith('data:image/svg+xml')) {
      // SVG data URIの場合、そのまま背景画像として使用
      backgroundStyle = {
        backgroundImage: `url("${bg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else if (bg) {
      // 通常の画像URLの場合
      backgroundStyle = {
        backgroundImage: `url("${bg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else {
      // 背景がない場合はデフォルトグラデーション
      backgroundStyle = {
        background: `linear-gradient(135deg, ${color}22 0%, ${color}88 100%)`,
      };
    }

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
            ...backgroundStyle,
          }}
        >
          {/* Dark Overlay for Better Text Readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
              display: 'flex',
            }}
          />

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
                textShadow: '0 8px 16px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
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
