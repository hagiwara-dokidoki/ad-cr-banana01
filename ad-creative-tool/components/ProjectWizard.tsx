'use client';

/**
 * プロジェクト作成ウィザード
 * 5つのステップを順番に表示するメインコンポーネント
 */

import { useState } from 'react';
import type { ProjectState } from '@/types/project';
import { Step1Input } from './steps/Step1Input';
import { Step2Extraction } from './steps/Step2Extraction';
import { Step3Analysis } from './steps/Step3Analysis';
import { Step4Copywriting } from './steps/Step4Copywriting';
import { Step5BannerGeneration } from './steps/Step5BannerGeneration';

export function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [project, setProject] = useState<ProjectState>({
    id: '',
    url: '',
    status: 'idle',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const updateProject = (updates: Partial<ProjectState>) => {
    setProject((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  };

  const goToStep = (step: 1 | 2 | 3 | 4 | 5) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎨 広告クリエイティブ自動生成ツール
          </h1>
          <p className="text-gray-600">
            URL入力のみで、プロ品質のバナー広告を一気通貫で作成
          </p>
        </header>

        {/* ステップインジケーター */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { num: 1, label: 'URL入力' },
              { num: 2, label: '素材抽出' },
              { num: 3, label: '分析' },
              { num: 4, label: 'コピー' },
              { num: 5, label: 'バナー生成' },
            ].map((step) => (
              <div key={step.num} className="flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full font-bold
                    ${
                      currentStep === step.num
                        ? 'bg-blue-600 text-white'
                        : currentStep > step.num
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {currentStep > step.num ? '✓' : step.num}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {step.label}
                </span>
                {step.num < 5 && (
                  <div className="w-8 h-1 mx-2 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && (
            <Step1Input
              project={project}
              updateProject={updateProject}
              onNext={() => goToStep(2)}
            />
          )}

          {currentStep === 2 && (
            <Step2Extraction
              project={project}
              updateProject={updateProject}
              onNext={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}

          {currentStep === 3 && (
            <Step3Analysis
              project={project}
              updateProject={updateProject}
              onNext={() => goToStep(4)}
              onBack={() => goToStep(2)}
            />
          )}

          {currentStep === 4 && (
            <Step4Copywriting
              project={project}
              updateProject={updateProject}
              onNext={() => goToStep(5)}
              onBack={() => goToStep(3)}
            />
          )}

          {currentStep === 5 && (
            <Step5BannerGeneration
              project={project}
              updateProject={updateProject}
              onBack={() => goToStep(4)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
