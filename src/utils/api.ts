import { ApiResponse } from '../types';

const API_BASE_URL = 'https://credscore-355089345579.europe-west1.run.app';

export async function analyzeContent(content: string): Promise<ApiResponse> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function extractTextFromImage(file: File): Promise<string> {
  // This would integrate with Google Cloud Vision API
  // For now, returning a placeholder
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Extracted text from image: Sample text for demonstration");
    }, 1500);
  });
}