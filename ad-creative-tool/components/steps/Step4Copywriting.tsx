/**
 * Step 4: Copywriting
 * キャッチコピー生成と選択
 */

'use client';

import { useEffect, useState } from 'react';
import { ProjectState } from '@/types/project';
import { Button } from '@/components/ui/Button';

interface Step4CopywritingProps {
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Copywriting({ project, updateProject, onNext, onBack }: Step4CopywritingProps) {
  const [loading, setLoading] = useState(false);
  const [copies, setCopies] = useState<string[]>(project.copyCandidates || []);
  const [selectedCopy, setSelectedCopy] = useState<string>(project.selectedCopy || '');
  const [customCopy, setCustomCopy] = useState('');
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  // 自動実行: コピー生成
  useEffect(() => {
    if (!project.copyCandidates && project.analysis) {
      generateCopies();
    }
  }, []);

  const generateCopies = async () => {
    if (!project.analysis) return;

    setLoading(true);
    try {
      // スクレイピングデータを取得（titleとdescriptionが必要）
      const scrapeResponse = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: project.url }),
      });

      const scrapeResult = await scrapeResponse.json();

      if (!scrapeResult.success) {
        throw new Error(scrapeResult.error);
      }

      // コピー生成
      const response = await fetch('/api/generate/copies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: scrapeResult.data.title,
          description: scrapeResult.data.description,
          analysis: project.analysis,
          options: project.options,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setCopies(result.copies);
      updateProject({ copyCandidates: result.copies });

    } catch (error) {
      console.error('Copy generation error:', error);
      updateProject({
        status: 'error',
        error: {
          message: error instanceof Error ? error.message : 'コピー生成に失敗しました',
          step: 'copy-generation',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCopy = (copy: string) => {
    setSelectedCopy(copy);
    updateProject({ selectedCopy: copy });
    setIsEditingCustom(false);
  };

  const handleCustomCopy = () => {
    if (customCopy.trim()) {
      setSelectedCopy(customCopy);
      updateProject({ selectedCopy: customCopy });
    }
  };

  const handleNext = () => {
    if (!selectedCopy) {
      alert('コピーを選択してください');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          キャッチコピー生成
        </h2>
        <p className="text-gray-600">
          AIが生成したキャッチコピーから1つを選択してください
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">コピー生成中...</p>
          </div>
        </div>
      )}

      {copies.length > 0 && (
        <>
          {/* コピー候補一覧 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              生成されたコピー ({copies.length}個)
            </h3>
            <div className="grid gap-3">
              {copies.map((copy, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectCopy(copy)}
                  className={`
                    text-left p-4 rounded-lg border-2 transition-all
                    ${
                      selectedCopy === copy
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-start">
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700 text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-900 font-medium">{copy}</span>
                    {selectedCopy === copy && (
                      <svg className="ml-auto flex-shrink-0 w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* カスタムコピー入力 */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              カスタムコピーを入力
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCopy}
                onChange={(e) => setCustomCopy(e.target.value)}
                onFocus={() => setIsEditingCustom(true)}
                placeholder="独自のキャッチコピーを入力..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={handleCustomCopy} disabled={!customCopy.trim()}>
                使用する
              </Button>
            </div>
          </div>

          {/* 選択中のコピー */}
          {selectedCopy && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                選択中のコピー
              </h4>
              <p className="text-lg font-bold text-blue-900">{selectedCopy}</p>
            </div>
          )}
        </>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button onClick={handleNext} disabled={!selectedCopy || loading}>
          バナー生成へ
        </Button>
      </div>
    </div>
  );
}
