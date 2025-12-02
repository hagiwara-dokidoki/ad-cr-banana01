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
    const category = searchParams.get('category') || 'business';

    console.log('[compose-banner] Parameters:', { text, bg: bg ? bg.substring(0, 50) + '...' : 'none', color, size, category });

    // サイズを決定
    const width = 1080;
    const height = size === 'square' ? 1080 : 1920;

    // フォントサイズをサイズに応じて調整
    const fontSize = size === 'square' ? 80 : 100;

    // カテゴリとトーンに応じた色を選択
    const colorSchemes: Record<string, [string, string]> = {
      'technology': ['#667eea', '#764ba2'],
      'fashion': ['#f093fb', '#f5576c'],
      'food': ['#fa709a', '#fee140'],
      'health': ['#a8edea', '#fed6e3'],
      'business': ['#4facfe', '#00f2fe'],
      'education': ['#43e97b', '#38f9d7'],
      'default': ['#667eea', '#764ba2'],
    };
    
    const colors = colorSchemes[category?.toLowerCase()] || colorSchemes.default;

    // 背景を決定: 外部画像 or グラデーション
    let backgroundStyle: any = {};
    let hasBackgroundImage = false;
    let processedBg = bg;
    
    if (bg && (bg.startsWith('http://') || bg.startsWith('https://'))) {
      // 外部画像URLの場合、imgタグを使用
      hasBackgroundImage = true;
      
      // WebP画像の場合、JPGに変換を試みる（可能であれば）
      // ただし、まずはそのまま使用してみる
      console.log('[compose-banner] Using external image:', bg.substring(0, 100));
      console.log('[compose-banner] Image format:', bg.split('.').pop());
      
      processedBg = bg;
    } else {
      // 背景がない場合はグラデーション
      backgroundStyle = {
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
      };
      console.log('[compose-banner] Using gradient background:', colors);
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
          {/* Background Image (if provided) */}
          {hasBackgroundImage && processedBg && (
            <img
              src={processedBg}
              alt="background"
              width={width}
              height={height}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}

          {/* Dark Overlay for Better Text Readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: hasBackgroundImage
                ? 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)'
                : 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
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
