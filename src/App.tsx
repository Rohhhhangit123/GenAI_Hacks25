import React, { useState, useEffect } from 'react';
import { Shield, History, Zap } from 'lucide-react';
import { Language, AnalysisResult, LanguageStrings } from './types';
import { translations } from './utils/translations';
import { analyzeContent, extractTextFromImage } from './utils/api';
import { saveAnalysisResult, getAnalysisHistory } from './utils/storage';
import { LanguageToggle } from './components/LanguageToggle';
import { ContentInput } from './components/ContentInput';
import { AnalysisResults } from './components/AnalysisResults';
import { AnalysisHistory } from './components/AnalysisHistory';
import { LoadingSpinner } from './components/LoadingSpinner';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<'analyzer' | 'history'>('analyzer');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [selectedHistoryResult, setSelectedHistoryResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');

  const strings: LanguageStrings = translations[language];

  useEffect(() => {
    setAnalysisHistory(getAnalysisHistory());
  }, []);

  const handleAnalyze = async () => {
    if (!content.trim() && !selectedImage) return;

    setIsAnalyzing(true);
    setError('');
    setAnalysisResult(null);

    try {
      let textToAnalyze = content;

      if (selectedImage) {
        const extractedText = await extractTextFromImage(selectedImage);
        textToAnalyze = content ? `${content}\n\n${extractedText}` : extractedText;
      }

      const response = await analyzeContent(textToAnalyze);

      const result: AnalysisResult = {
        id: Date.now().toString(),
        content: textToAnalyze,
        credibilityScore: response.credibilityScore,
        redFlags: response.redFlags,
        explanation: response.explanation,
        timestamp: Date.now(),
        language
      };

      setAnalysisResult(result);
      saveAnalysisResult(result);
      setAnalysisHistory(getAnalysisHistory());

    } catch (error) {
      console.error('Analysis failed:', error);
      if (error instanceof Error) {
        setError(`${strings.error}: ${error.message}`);
      } else {
        setError(strings.error);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setContent('');
    setSelectedImage(null);
    setAnalysisResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{strings.title}</h1>
                <p className="text-white/80 text-sm">{strings.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageToggle
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              
              <nav className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                <button
                  onClick={() => {
                    setCurrentView('analyzer');
                    setSelectedHistoryResult(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    currentView === 'analyzer'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  Analyzer
                </button>
                <button
                  onClick={() => {
                    setCurrentView('history');
                    setSelectedHistoryResult(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    currentView === 'history'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <History className="w-4 h-4" />
                  {strings.history}
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-8">
          {currentView === 'analyzer' ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-8">
                  <ContentInput
                    content={content}
                    onContentChange={setContent}
                    selectedImage={selectedImage}
                    onImageSelect={setSelectedImage}
                    strings={strings}
                    disabled={isAnalyzing}
                  />

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-3">
                      <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || (!content.trim() && !selectedImage)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <Zap className="w-4 h-4" />
                        {isAnalyzing ? strings.analyzing : strings.analyze}
                      </button>

                      {(content || selectedImage || analysisResult) && (
                        <button
                          onClick={resetForm}
                          disabled={isAnalyzing}
                          className="px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700">{error}</p>
                      <button
                        onClick={() => setError('')}
                        className="mt-2 text-red-600 underline text-sm hover:text-red-800"
                      >
                        {strings.tryAgain}
                      </button>
                    </div>
                  )}
                </div>

                {isAnalyzing && (
                  <div className="border-t border-gray-200 bg-gray-50/50">
                    <LoadingSpinner text={strings.analyzing} />
                  </div>
                )}

                {analysisResult && !isAnalyzing && (
                  <div className="border-t border-gray-200 bg-gray-50/50 p-8">
                    <AnalysisResults result={analysisResult} strings={strings} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <AnalysisHistory
                history={analysisHistory}
                strings={strings}
                selectedResult={selectedHistoryResult}
                onSelectResult={setSelectedHistoryResult}
              />
            </div>
          )}
        </main>
      </div>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}