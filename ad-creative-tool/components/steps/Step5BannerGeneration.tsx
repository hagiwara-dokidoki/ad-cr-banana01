/**
 * Step 5: Banner Generation
 * バナー生成と編集
 */

'use client';

import { useState } from 'react';
import { ProjectState, Banner } from '@/types/project';
import { Button } from '@/components/ui/Button';

interface Step5BannerGenerationProps {
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
  onBack: () => void;
}

export function Step5BannerGeneration({ project, updateProject, onBack }: Step5BannerGenerationProps) {
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'square' | 'vertical'>('square');
  const [banners, setBanners] = useState<Banner[]>(project.banners || []);

  const generateBanners = async (size: 'square' | 'vertical', count: number = 5) => {
    if (!project.selectedCopy || !project.colors) {
      alert('コピーとカラーパレットが必要です');
      return;
    }

    setGenerating(true);
    try {
      const newBanners: Banner[] = [];

      for (let i = 0; i < count; i++) {
        // 1. 背景画像を生成
        const bgResponse = await fetch('/api/generate/background', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: project.options?.category,
            tone: project.options?.tone,
            brandTone: project.analysis?.brandTone,
            size,
          }),
        });

        const bgResult = await bgResponse.json();

        if (!bgResult.success) {
          throw new Error(bgResult.error);
        }

        // 2. テキストを合成してバナーを生成
        const bannerUrl = `/api/compose-banner?text=${encodeURIComponent(
          project.selectedCopy
        )}&bg=${encodeURIComponent(bgResult.imageUrl)}&color=${encodeURIComponent(
          project.colors.accent
        )}&size=${size}`;

        const banner: Banner = {
          id: `banner-${Date.now()}-${i}`,
          size,
          backgroundUrl: bgResult.imageUrl,
          textOverlay: project.selectedCopy,
          finalImageUrl: bannerUrl,
          createdAt: new Date(),
        };

        newBanners.push(banner);
      }

      const updatedBanners = [...banners, ...newBanners];
      setBanners(updatedBanners);
      updateProject({ banners: updatedBanners });

    } catch (error) {
      console.error('Banner generation error:', error);
      updateProject({
        status: 'error',
        error: {
          message: error instanceof Error ? error.message : 'バナー生成に失敗しました',
          step: 'banner-generation',
        },
      });
    } finally {
      setGenerating(false);
    }
  };

  const filteredBanners = banners.filter(b => b.size === activeTab);

  const downloadBanner = (banner: Banner) => {
    const link = document.createElement('a');
    link.href = banner.finalImageUrl;
    link.download = `banner-${banner.size}-${banner.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          バナー生成
        </h2>
        <p className="text-gray-600">
          複数サイズの広告バナーを自動生成します
        </p>
      </div>

      {/* 生成ボタン */}
      <div className="flex gap-4">
        <Button
          onClick={() => generateBanners('square', 5)}
          loading={generating}
          disabled={generating}
        >
          Squareバナー生成 (1080x1080)
        </Button>
        <Button
          onClick={() => generateBanners('vertical', 5)}
          loading={generating}
          disabled={generating}
          variant="secondary"
        >
          Verticalバナー生成 (1080x1920)
        </Button>
      </div>

      {/* タブ切り替え */}
      {banners.length > 0 && (
        <>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-8">
              <button
                onClick={() => setActiveTab('square')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === 'square'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                Square (1080x1080)
                <span className="ml-2 py-0.5 px-2 rounded-full bg-gray-200 text-xs">
                  {banners.filter(b => b.size === 'square').length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('vertical')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === 'vertical'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                Vertical (1080x1920)
                <span className="ml-2 py-0.5 px-2 rounded-full bg-gray-200 text-xs">
                  {banners.filter(b => b.size === 'vertical').length}
                </span>
              </button>
            </nav>
          </div>

          {/* バナーグリッド */}
          <div className={`
            grid gap-6
            ${activeTab === 'square' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}
          `}>
            {filteredBanners.map((banner) => (
              <div key={banner.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`
                  relative
                  ${banner.size === 'square' ? 'aspect-square' : 'aspect-[9/16]'}
                `}>
                  <img
                    src={banner.finalImageUrl}
                    alt={`Banner ${banner.id}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* ホバーオーバーレイ */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      onClick={() => downloadBanner(banner)}
                      variant="secondary"
                      size="sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      ダウンロード
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 font-medium truncate">
                    {banner.textOverlay}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {banner.size === 'square' ? '1080x1080' : '1080x1920'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 生成中の表示 */}
      {generating && (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">バナー生成中...</p>
            <p className="text-sm text-gray-500 mt-2">背景画像生成とテキスト合成を行っています</p>
          </div>
        </div>
      )}

      {/* 空の状態 */}
      {banners.length === 0 && !generating && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">バナーがまだありません</h3>
          <p className="mt-1 text-sm text-gray-500">上のボタンからバナーを生成してください</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        {banners.length > 0 && (
          <Button variant="secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            すべてダウンロード (ZIP)
          </Button>
        )}
      </div>
    </div>
  );
}
