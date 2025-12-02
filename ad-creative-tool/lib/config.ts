/**
 * Configuration and Environment Variables
 */

export const config = {
  // API Keys
  googleAiApiKey: process.env.GOOGLE_AI_API_KEY || '',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  blobToken: process.env.BLOB_READ_WRITE_TOKEN || '',
  
  // API Endpoints
  // gemini-pro is the most stable model available
  geminiModel: 'gemini-pro',
  // claude-3-opus-20240229 is the most capable and stable model
  claudeModel: 'claude-3-opus-20240229',
  imagenModel: 'imagen-3.0-generate-001',
  
  // Application Settings
  // Vercel automatically provides VERCEL_URL in production
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 
           (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  
  // Generation Settings
  maxCopyCandidates: 20,
  maxBannersPerSize: 10,
  bannerSizes: {
    square: { width: 1080, height: 1080 },
    vertical: { width: 1080, height: 1920 },
  },
  
  // Scraping Settings
  screenshotTimeout: 30000,
  maxImagesExtract: 20,
  minImageWidth: 800,
} as const;

// Validation
export function validateConfig() {
  const errors: string[] = [];
  
  if (!config.googleAiApiKey) {
    errors.push('GOOGLE_AI_API_KEY is required');
  }
  
  if (!config.anthropicApiKey) {
    errors.push('ANTHROPIC_API_KEY is required');
  }
  
  if (errors.length > 0) {
    console.warn('Configuration warnings:', errors);
  }
  
  return errors.length === 0;
}
