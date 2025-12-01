/**
 * Step 3: Marketing Analysis
 * マーケティング分析レポート
 */

'use client';

import { useEffect, useState } from 'react';
import { ProjectState, AnalysisResult } from '@/types/project';
import { Button } from '@/components/ui/Button';

interface Step3AnalysisProps {
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Analysis({ project, updateProject, onNext, onBack }: Step3AnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(project.analysis || null);
  const [editing, setEditing] = useState(false);

  // 自動実行: マーケティング分析
  useEffect(() => {
    if (!project.analysis) {
      analyzeMarketing();
    }
  }, []);

  const analyzeMarketing = async () => {
    setLoading(true);
    try {
      // まずスクレイピングデータを取得（textContentが必要）
      const scrapeResponse = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: project.url }),
      });

      const scrapeResult = await scrapeResponse.json();

      if (!scrapeResult.success) {
        throw new Error(scrapeResult.error);
      }

      // マーケティング分析を実行
      const response = await fetch('/api/analyze-marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: project.url,
          title: scrapeResult.data.title,
          description: scrapeResult.data.description,
          textContent: scrapeResult.data.textContent,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setAnalysis(result.analysis);
      updateProject({ analysis: result.analysis });

    } catch (error) {
      console.error('Marketing analysis error:', error);
      updateProject({
        status: 'error',
        error: {
          message: error instanceof Error ? error.message : 'マーケティング分析に失敗しました',
          step: 'marketing-analysis',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!analysis) {
      alert('分析が完了するまでお待ちください');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          マーケティング分析
        </h2>
        <p className="text-gray-600">
          AIがWebサイトを分析し、競合・強み・ターゲットを抽出しました
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">分析中...</p>
          </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* 競合分析 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              競合分析
            </h3>
            <ul className="space-y-2">
              {analysis.competitors.map((competitor, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-2">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{competitor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 強み (USP) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              強み (USP)
            </h3>
            <ul className="space-y-2">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 text-sm font-medium mr-2">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ターゲットペルソナ */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              ターゲットペルソナ
            </h3>
            <p className="text-gray-700 leading-relaxed">{analysis.target}</p>
          </div>

          {/* ブランドトーン */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              ブランドトーン
            </h3>
            <p className="text-gray-700 leading-relaxed">{analysis.brandTone}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button onClick={handleNext} disabled={!analysis || loading}>
          コピー生成へ
        </Button>
      </div>
    </div>
  );
}
