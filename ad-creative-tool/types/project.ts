/**
 * 広告クリエイティブ自動生成ツール - Type Definitions
 */

// プロジェクトステータス
export type ProjectStatus = 'idle' | 'analyzing' | 'generating' | 'completed' | 'error';

// バナーサイズ
export type BannerSize = 'square' | 'vertical';

// カラーパレット
export interface ColorPalette {
  main: string;      // メインカラー (Hex)
  accent: string;    // アクセントカラー (Hex)
  base: string;      // ベースカラー (Hex)
}

// 分析結果
export interface AnalysisResult {
  competitors: string[];     // 競合企業・サービス
  strengths: string[];       // 強み（USP）3点
  target: string;           // ターゲットペルソナ
  brandTone: string;        // ブランドトーン
}

// バナー成果物
export interface Banner {
  id: string;
  size: BannerSize;
  backgroundUrl: string;    // AI生成背景画像URL
  textOverlay: string;      // 重ねるテキスト
  finalImageUrl: string;    // 合成後の最終画像URL
  createdAt: Date;
}

// プロジェクト全体の状態
export interface ProjectState {
  id: string;
  url: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Step 1: 入力
  options?: {
    category?: string;      // 商材カテゴリ
    tone?: string;         // 希望するトーン
    ngWords?: string[];    // NGワード
  };
  
  // Step 2: 解析データ
  colors?: ColorPalette;
  extractedImages?: string[];       // 抽出した画像URL一覧
  selectedImages?: string[];        // ユーザーが選択した画像
  screenshot?: string;              // サイト全体のスクリーンショット
  
  // Step 3: 分析結果
  analysis?: AnalysisResult;
  
  // Step 4: コピーライティング
  copyCandidates?: string[];        // 生成されたコピー案（10〜20件）
  selectedCopy?: string;            // ユーザーが確定したコピー
  
  // Step 5: バナー生成
  banners?: Banner[];
  
  // エラー情報
  error?: {
    message: string;
    step: string;
  };
}

// API Request/Response Types

// サイト解析APIレスポンス
export interface ScrapeResponse {
  success: boolean;
  data?: {
    title: string;
    description: string;
    screenshot: string;          // Base64 or URL
    images: string[];           // 抽出された画像URL
    textContent: {
      h1: string[];
      h2: string[];
      paragraphs: string[];
    };
  };
  error?: string;
}

// カラー分析APIレスポンス
export interface ColorAnalysisResponse {
  success: boolean;
  colors?: ColorPalette;
  error?: string;
}

// マーケティング分析APIレスポンス
export interface MarketingAnalysisResponse {
  success: boolean;
  analysis?: AnalysisResult;
  error?: string;
}

// コピー生成APIレスポンス
export interface CopyGenerationResponse {
  success: boolean;
  copies?: string[];
  error?: string;
}

// 画像生成APIレスポンス
export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

// バナー合成APIレスポンス
export interface BannerCompositionResponse {
  success: boolean;
  banners?: Banner[];
  error?: string;
}
