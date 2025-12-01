'use client';

/**
 * Main Page
 * 広告クリエイティブ自動生成ツールのメインページ
 */

import { useState } from 'react';
import { ProjectState } from '@/types/project';
import { ProgressSteps } from '@/components/ProgressSteps';
import { Step1Input } from '@/components/steps/Step1Input';
import { Step2Extraction } from '@/components/steps/Step2Extraction';
import { Step3Analysis } from '@/components/steps/Step3Analysis';
import { Step4Copywriting } from '@/components/steps/Step4Copywriting';
import { Step5BannerGeneration } from '@/components/steps/Step5BannerGeneration';

export default function Home() {
  const [project, setProject] = useState<ProjectState>({
    id: `project-${Date.now()}`,
    url: '',
    status: 'idle',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateProject = (updates: Partial<ProjectState>) => {
    setProject(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            広告クリエイティブ自動生成ツール
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            URL入力のみで、サイト分析・競合リサーチ・コピー作成・画像生成を一気通貫
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} />

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <Step1Input
              project={project}
              updateProject={updateProject}
              onNext={nextStep}
            />
          )}
          
          {currentStep === 2 && (
            <Step2Extraction
              project={project}
              updateProject={updateProject}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Analysis
              project={project}
              updateProject={updateProject}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          
          {currentStep === 4 && (
            <Step4Copywriting
              project={project}
              updateProject={updateProject}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          
          {currentStep === 5 && (
            <Step5BannerGeneration
              project={project}
              updateProject={updateProject}
              onBack={prevStep}
            />
          )}
        </div>

        {/* Error Display */}
        {project.error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  エラーが発生しました ({project.error.step})
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {project.error.message}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-12">
        <div className="text-center text-sm text-gray-500">
          <p>Powered by Next.js, Gemini, Claude, Imagen & Vercel</p>
        </div>
      </footer>
    </div>
  );
}
