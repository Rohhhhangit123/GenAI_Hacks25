import { AnalysisResult } from '../types';

const STORAGE_KEY = 'misinformation-analyzer-history';

export function saveAnalysisResult(result: AnalysisResult): void {
  try {
    const history = getAnalysisHistory();
    const updatedHistory = [result, ...history.slice(0, 9)]; // Keep only 10 most recent
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving analysis result:', error);
  }
}

export function getAnalysisHistory(): AnalysisResult[] {
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading analysis history:', error);
    return [];
  }
}