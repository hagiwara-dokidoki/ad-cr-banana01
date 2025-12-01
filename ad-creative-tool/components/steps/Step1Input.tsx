/**
 * Step 1: URL Input
 * プロジェクト作成と初期設定
 */

'use client';

import { useState } from 'react';
import { ProjectState } from '@/types/project';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Step1InputProps {
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
  onNext: () => void;
}

export function Step1Input({ project, updateProject, onNext }: Step1InputProps) {
  const [url, setUrl] = useState(project.url);
  const [category, setCategory] = useState(project.options?.category || '');
  const [tone, setTone] = useState(project.options?.tone || '');
  const [ngWords, setNgWords] = useState(project.options?.ngWords?.join(', ') || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // URLバリデーション
    try {
      new URL(url);
    } catch {
      setError('有効なURLを入力してください');
      return;
    }

    // プロジェクト更新
    updateProject({
      url,
      options: {
        category: category || undefined,
        tone: tone || undefined,
        ngWords: ngWords ? ngWords.split(',').map(w => w.trim()).filter(Boolean) : undefined,
      },
      status: 'idle',
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          プロジェクトを作成
        </h2>
        <p className="text-gray-600">
          広告クリエイティブを作成したいWebサイトのURLを入力してください
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL入力 */}
        <Input
          label="WebサイトURL *"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          error={error}
        />

        {/* オプション設定 */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            オプション設定
          </h3>
          
          <div className="space-y-4">
            <Input
              label="商材カテゴリ"
              type="text"
              placeholder="例: 化粧品、不動産、SaaS など"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <Input
              label="希望するトーン"
              type="text"
              placeholder="例: 信頼感、親近感、革新的 など"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            />

            <div>
              <Input
                label="NGワード"
                type="text"
                placeholder="使用禁止の言葉をカンマ区切りで入力"
                value={ngWords}
                onChange={(e) => setNgWords(e.target.value)}
              />
              <p className="mt-1 text-sm text-gray-500">
                例: 最安値, No.1, 絶対 など
              </p>
            </div>
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg">
            解析を開始
          </Button>
        </div>
      </form>

      {/* 説明 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          💡 このツールでできること
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Webサイトの自動スクレイピングとスクリーンショット撮影</li>
          <li>• AIによるカラーパレット抽出と分析</li>
          <li>• 競合分析とUSP（強み）の自動抽出</li>
          <li>• 最大20個のキャッチコピー自動生成</li>
          <li>• 複数サイズの広告バナー自動生成（Square / Vertical）</li>
        </ul>
      </div>
    </div>
  );
}
