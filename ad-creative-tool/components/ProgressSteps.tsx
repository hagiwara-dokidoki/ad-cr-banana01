'use client';

/**
 * Progress Steps Indicator
 * 現在のステップを視覚的に表示
 */

interface Props {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: Props) {
  const steps = [
    { num: 1, label: 'URL入力' },
    { num: 2, label: '素材抽出' },
    { num: 3, label: '分析' },
    { num: 4, label: 'コピー' },
    { num: 5, label: 'バナー生成' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg
                  transition-colors duration-300
                  ${
                    currentStep === step.num
                      ? 'bg-blue-600 text-white shadow-lg scale-110'
                      : currentStep > step.num
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {currentStep > step.num ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`
                  mt-2 text-sm font-medium whitespace-nowrap
                  ${
                    currentStep === step.num
                      ? 'text-blue-600'
                      : currentStep > step.num
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 relative">
                <div className="absolute inset-0 bg-gray-200 rounded" />
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded
                    transition-all duration-500
                    ${currentStep > step.num ? 'w-full' : 'w-0'}
                  `}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
