import React, { useState, useEffect } from 'react';
import { Shield, History, Zap, Sparkles, RefreshCw, AlertCircle, X } from 'lucide-react';
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
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const strings: LanguageStrings = translations[language];

  useEffect(() => {
    setAnalysisHistory(getAnalysisHistory());
    // Simulate loading for smooth entrance
    setTimeout(() => setIsFirstLoad(false), 500);
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

  const handleViewChange = (view: 'analyzer' | 'history') => {
    setCurrentView(view);
    setSelectedHistoryResult(null);
    if (view === 'analyzer') {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-indigo-800/40 animate-pulse"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className={`relative z-10 transition-all duration-1000 ${isFirstLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {/* Enhanced Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Logo and Title Section */}
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl font-black text-white drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                  {strings.title}
                </h1>
                <p className="text-white/90 text-lg font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  {strings.subtitle}
                </p>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI-Powered Analysis Ready</span>
                </div>
              </div>
            </div>
            
            {/* Controls Section with Language Toggle and Navigation */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Language Toggle with Higher Z-Index */}
              <div className="relative z-50">
                <LanguageToggle
                  currentLanguage={language}
                  onLanguageChange={setLanguage}
                />
              </div>
              
              {/* Enhanced Navigation */}
              <nav className="flex bg-white/15 backdrop-blur-xl rounded-2xl p-2 border border-white/30 shadow-2xl relative z-40">
                <button
                  onClick={() => handleViewChange('analyzer')}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    currentView === 'analyzer'
                      ? 'bg-white text-gray-900 shadow-lg scale-105'
                      : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  <Zap className={`w-5 h-5 transition-transform duration-300 ${currentView === 'analyzer' ? 'text-blue-600' : 'group-hover:rotate-12'}`} />
                  <span>Analyzer</span>
                  {currentView === 'analyzer' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </button>
                <button
                  onClick={() => handleViewChange('history')}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    currentView === 'history'
                      ? 'bg-white text-gray-900 shadow-lg scale-105'
                      : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  <History className={`w-5 h-5 transition-transform duration-300 ${currentView === 'history' ? 'text-purple-600' : 'group-hover:rotate-12'}`} />
                  <span>{strings.history}</span>
                  {analysisHistory.length > 0 && (
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {analysisHistory.length}
                    </div>
                  )}
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Enhanced Main Content */}
        <main className="container mx-auto px-4 pb-12">
          {currentView === 'analyzer' ? (
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
                <div className="p-10">
                  <ContentInput
                    content={content}
                    onContentChange={setContent}
                    selectedImage={selectedImage}
                    onImageSelect={setSelectedImage}
                    strings={strings}
                    disabled={isAnalyzing}
                  />

                  {/* Enhanced Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || (!content.trim() && !selectedImage)}
                        className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-2xl hover:shadow-blue-500/25 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:hover:scale-100 disabled:hover:translate-y-0"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                          <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          <span className="text-lg">
                            {isAnalyzing ? strings.analyzing : strings.analyze}
                          </span>
                          {!isAnalyzing && (
                            <Sparkles className="w-4 h-4 opacity-75 group-hover:opacity-100" />
                          )}
                        </div>
                      </button>

                      {(content || selectedImage || analysisResult) && (
                        <button
                          onClick={resetForm}
                          disabled={isAnalyzing}
                          className="flex items-center gap-2 px-6 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 transition-all duration-200 hover:scale-105"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Clear All</span>
                        </button>
                      )}
                    </div>

                    {/* Stats Display */}
                    {analysisHistory.length > 0 && (
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="font-medium">{analysisHistory.length} analyses completed</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Error Display */}
                  {error && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-500 rounded-full">
                          <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-red-800 mb-2">Analysis Error</h3>
                          <p className="text-red-700 leading-relaxed">{error}</p>
                          <button
                            onClick={() => setError('')}
                            className="mt-3 flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                          >
                            <RefreshCw className="w-4 h-4" />
                            {strings.tryAgain}
                          </button>
                        </div>
                        <button
                          onClick={() => setError('')}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Loading Section */}
                {isAnalyzing && (
                  <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
                    <LoadingSpinner text={strings.analyzing} />
                  </div>
                )}

                {/* Results Section */}
                {analysisResult && !isAnalyzing && (
                  <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50/50 to-blue-50/50 p-10">
                    <AnalysisResults result={analysisResult} strings={strings} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
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

      {/* Enhanced Custom Styles */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(-20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
