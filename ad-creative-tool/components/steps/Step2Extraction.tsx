/**
 * Step 2: Extraction & Color Analysis
 * サイト解析とカラーパレット抽出
 */

'use client';

import { useEffect, useState } from 'react';
import { ProjectState, ColorPalette } from '@/types/project';
import { Button } from '@/components/ui/Button';

interface Step2ExtractionProps {
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Extraction({ project, updateProject, onNext, onBack }: Step2ExtractionProps) {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [colors, setColors] = useState<ColorPalette | null>(project.colors || null);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(
    new Set(project.selectedImages || [])
  );

  // 自動実行: スクレイピング
  useEffect(() => {
    if (!project.screenshot) {
      scrapeWebsite();
    }
  }, []);

  // 自動実行: カラー分析
  useEffect(() => {
    if (project.screenshot && !colors) {
      analyzeColors();
    }
  }, [project.screenshot]);

  const scrapeWebsite = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: project.url }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      updateProject({
        screenshot: result.data.screenshot,
        extractedImages: result.data.images,
        selectedImages: result.data.images.slice(0, 5), // デフォルトで最初の5枚を選択
      });

      setSelectedImages(new Set(result.data.images.slice(0, 5)));

    } catch (error) {
      console.error('Scraping error:', error);
      updateProject({
        status: 'error',
        error: {
          message: error instanceof Error ? error.message : 'スクレイピングに失敗しました',
          step: 'scraping',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeColors = async () => {
    if (!project.screenshot) return;
    
    setAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: project.screenshot }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setColors(result.colors);
      updateProject({ colors: result.colors });

    } catch (error) {
      console.error('Color analysis error:', error);
      updateProject({
        status: 'error',
        error: {
          message: error instanceof Error ? error.message : 'カラー分析に失敗しました',
          step: 'color-analysis',
        },
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const toggleImageSelection = (imageUrl: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageUrl)) {
      newSelection.delete(imageUrl);
    } else {
      newSelection.add(imageUrl);
    }
    setSelectedImages(newSelection);
    updateProject({ selectedImages: Array.from(newSelection) });
  };

  const handleNext = () => {
    if (!colors) {
      alert('カラー分析が完了するまでお待ちください');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          解析・素材抽出
        </h2>
        <p className="text-gray-600">
          Webサイトから情報とビジュアル素材を抽出しています
        </p>
      </div>

      {/* スクリーンショット */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          サイトプレビュー
        </h3>
        {loading && (
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">スクレイピング中...</p>
            </div>
          </div>
        )}
        {project.screenshot && (
          <img
            src={project.screenshot}
            alt="Website screenshot"
            className="w-full rounded-lg shadow-md"
          />
        )}
      </div>

      {/* カラーパレット */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          カラーパレット
        </h3>
        {analyzing && (
          <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">カラー分析中...</p>
            </div>
          </div>
        )}
        {colors && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div
                className="h-24 rounded-lg shadow-md mb-2"
                style={{ backgroundColor: colors.main }}
              />
              <p className="text-sm font-medium text-gray-700">メインカラー</p>
              <p className="text-xs text-gray-500">{colors.main}</p>
            </div>
            <div>
              <div
                className="h-24 rounded-lg shadow-md mb-2"
                style={{ backgroundColor: colors.accent }}
              />
              <p className="text-sm font-medium text-gray-700">アクセントカラー</p>
              <p className="text-xs text-gray-500">{colors.accent}</p>
            </div>
            <div>
              <div
                className="h-24 rounded-lg shadow-md mb-2"
                style={{ backgroundColor: colors.base }}
              />
              <p className="text-sm font-medium text-gray-700">ベースカラー</p>
              <p className="text-xs text-gray-500">{colors.base}</p>
            </div>
          </div>
        )}
      </div>

      {/* 抽出画像 */}
      {project.extractedImages && project.extractedImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            抽出された画像 ({selectedImages.size}枚選択中)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.extractedImages.map((imageUrl, index) => (
              <div
                key={index}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImages.has(imageUrl)
                    ? 'border-blue-600 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleImageSelection(imageUrl)}
              >
                <img
                  src={imageUrl}
                  alt={`Extracted ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                {selectedImages.has(imageUrl) && (
                  <div className="absolute top-2 right-2 bg-blue-600 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button onClick={handleNext} disabled={!colors || analyzing}>
          次へ
        </Button>
      </div>
    </div>
  );
}
