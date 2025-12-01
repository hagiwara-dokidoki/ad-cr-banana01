# 広告クリエイティブ自動生成ツール 統合仕様書

**バージョン:** 1.0 (Final)
**作成日:** 2024/12/01
**概要:** URL入力のみで、サイト分析・競合リサーチ・コピー作成・画像生成を一気通貫で行うWebツール。

---

## 1. 基本方針とシステム構成
Google Cloud (GCP) の複雑なコンソール設定や権限管理（IAM）を極力排除し、各サービスの **APIキー管理のみ** で完結する「軽量・高速・高品質」な構成を採用する。

### 1.1 技術スタック
| レイヤー | 技術 / サービス | 選定理由・役割 |
| :--- | :--- | :--- |
| **Frontend** | **Next.js (App Router)** | アプリケーション本体。Vercelへデプロイ。 |
| **Infra** | **Vercel** | ホスティング、Serverless Functions、画像ストレージ(Blob)。 |
| **Scraping** | **Playwright** | 正確なDOM解析、スクリーンショット撮影、画像抽出。 |
| **Analysis** | **Gemini 1.5 Flash** | **(Google AI Studio API)** 高速かつ安価にサイト解析・カラー抽出を行う。 |
| **Copywriting** | **Claude 3.5 Sonnet** | **(Anthropic API)** 日本語のニュアンス表現、キャッチコピー生成を担当。 |
| **Image Gen** | **Imagen 3** | **(Google AI Studio API)** `imagen-3.0-generate-001` 等を使用。高品質な背景素材を生成。 |
| **Compositing** | **@vercel/og** (Satori) | **【重要】** AI生成背景とコピーをプログラムで合成し、文字化けを100%防ぐ。 |

---

## 2. ユーザー体験フロー (UX Flow)

### Step 1: プロジェクト作成 (Input)
* ユーザーがLPや公式サイトのURLを入力。
* 任意オプション: 「商材カテゴリ」「トーン（信頼感/親近感など）」「NGワード」の指定。

### Step 2: 自動解析・素材抽出 (Extraction)
* **処理:** Playwrightによるサイト情報のスクレイピング。
* **UI表示:**
    * **カラーパレット:** Geminiが抽出したメイン/サブ/アクセントカラーを表示（手動で色変更も可能）。
    * **画像ギャラリー:** サイトから抽出した画像一覧。「使用する/しない」の選択、および手動アップロード機能。

### Step 3: 分析レポート (Analysis)
* **処理:** Gemini 1.5 Flashによる構造化データ生成。
* **UI表示 (編集可能):**
    * **競合分析:** 競合他社・類似サービスと、その特徴。
    * **強み (USP):** 3つの主要な訴求ポイント。
    * **ターゲット:** ペルソナ（性別・年齢・悩み）。
    * **ポジショニング:** 競合との差別化ポイント。

### Step 4: キャッチコピー生成 (Copywriting)
* **処理:** Claude 3.5 Sonnetによるコピー生成（10〜20案）。
* **UI表示:**
    * 生成されたコピーをリスト表示。
    * ユーザーが「採用するコピー」を1つ選択（または編集して確定）。

### Step 5: バナー生成・編集 (Creative Generation)
* **処理:** ハイブリッド方式（背景AI生成 ＋ 文字プログラム合成）で20枚生成。
* **UI表示:**
    * `1080x1080` (Square) と `1080x1920` (Vertical) のタブ切り替え。
    * 生成結果のグリッド表示。
    * **編集機能:** 画像をクリックし、キャッチコピーのテキスト変更、フォントサイズ/色の微調整が可能。
    * **ダウンロード:** 生成画像をZIPまたは個別に保存。

---

## 3. 機能詳細要件

### 3.1 サイト解析・カラー抽出
* **Playwright:**
    * ページ全体のスクリーンショット撮影。
    * `og:image`, `img`タグ、CSS背景画像から、大きめの画像（横800px以上推奨）を収集。
    * `title`, `meta description`, `h1`, `h2`, 本文テキストを取得。
* **Color Analysis (Gemini):**
    * スクリーンショット画像を解析し、サイトの配色（Hexコード）を抽出する。

### 3.2 マーケティング分析 (Gemini 1.5 Flash)
以下のプロンプトを用いてJSONを出力させる。
> 「このWebサイトの情報を分析し、以下のキーを持つJSONを出力してください: `competitors`(競合), `strengths`(強み3点), `target_persona`(ターゲット詳細), `brand_tone`(トーン)」

### 3.3 クリエイティブ生成 (Hybrid System)
**本ツールの品質を担保する核心部分。**

* **A. 背景画像生成 (Imagen 3 via API):**
    * プロンプト構成:
      `Product photography style for [Product Category], [Tone Keywords], minimalist composition, high quality, 4k, clean background space in the center/top for text overlay.`
    * **ポイント:** 文字を配置するための「余白（Negative Space）」を意識した構図を指定する。
* **B. 文字合成 (@vercel/og):**
    * 生成された背景画像の上に、Step 4で確定したキャッチコピーを配置する。
    * **フォント:** `Noto Sans JP` (Google Fonts) 等を使用し、可読性を担保。
    * **文字色:** Step 2で抽出した「アクセントカラー」または「視認性の高い白/黒」を自動適用。
    * **装飾:** 必要に応じてテキストにドロップシャドウや、半透明の背景帯（座布団）をプログラムで描画。

---

## 4. データモデル (TypeScript Interface Example)

```typescript
// プロジェクト全体の状態
interface ProjectState {
  id: string;
  url: string;
  status: 'idle' | 'analyzing' | 'generating' | 'completed';
  
  // 解析データ
  colors: { main: string; accent: string; base: string };
  extractedImages: string[]; // URL list
  
  // 分析結果
  analysis: {
    competitors: string[];
    strengths: string[];
    target: string;
  };

  // 生成アセット
  copyCandidates: string[]; // コピー案
  selectedCopy: string;     // 確定コピー
  
  // 最終成果物
  banners: Banner[];
}

// バナー成果物
interface Banner {
  id: string;
  size: 'square' | 'vertical';
  backgroundUrl: string; // AI生成された背景 (Blob URL)
  textOverlay: string;   // 重ねた文字
  finalImageUrl: string; // 合成後の画像URL
}