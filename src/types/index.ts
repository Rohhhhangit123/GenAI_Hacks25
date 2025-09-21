export interface AnalysisResult {
  id: string;
  content: string;
  credibilityScore: number;
  redFlags: string[];
  explanation: string;
  timestamp: number;
  language: string;
}

export interface LanguageStrings {
  title: string;
  subtitle: string;
  textPlaceholder: string;
  uploadImage: string;
  analyze: string;
  analyzing: string;
  credibilityScore: string;
  redFlags: string;
  explanation: string;
  history: string;
  noHistory: string;
  error: string;
  tryAgain: string;
  viewDetails: string;
  back: string;
  dragDropText: string;
  or: string;
  selectImage: string;
  imageSelected: string;
  removeImage: string;
}

export type Language = 'en' | 'hi' | 'mr';

export interface ApiResponse {
  credibilityScore: number;
  redFlags: string[];
  explanation: string;
}