import { ApiResponse, AnalysisResult } from '../types';

const API_BASE_URL = '/api';  // proxy path

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(timeout) };
}

export async function analyzeContent(content: string): Promise<AnalysisResult> {
  const { signal, cancel } = withTimeout(20000);
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ content }),
      signal
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = (await response.json()) as ApiResponse;
    console.log('Raw API Response:', data);

    // 🔥 Normalize API response → UI format
    const credibilityScore = data.credibility_score ?? 0;
    const details = data.details ?? {};

    const redFlags: string[] = [];
    if (details.factual_alignment === 0) redFlags.push('Possible factual inaccuracies detected');
    if (details.language_manipulation === 1) redFlags.push('Language manipulation detected');
    if (details.logical_consistency === 0) redFlags.push('Logical inconsistencies detected');

    const explanation = redFlags.length > 0
      ? 'The analysis found potential issues with the content.'
      : 'The content appears consistent and credible.';

    const result: AnalysisResult = {
      credibilityScore,
      redFlags,
      explanation
    };

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  } finally {
    cancel();
  }
}

export async function extractTextFromImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Extracted text from image: Sample text for demonstration');
    }, 1500);
  });
}
