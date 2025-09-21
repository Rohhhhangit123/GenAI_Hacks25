import React from 'react';
import { Clock, Eye, ArrowLeft, Calendar, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { AnalysisResult, LanguageStrings } from '../types';
import { CredibilityScore } from './CredibilityScore';

interface AnalysisHistoryProps {
  history: AnalysisResult[];
  strings: LanguageStrings;
  selectedResult: AnalysisResult | null;
  onSelectResult: (result: AnalysisResult | null) => void;
}

export function AnalysisHistory({
  history,
  strings,
  selectedResult,
  onSelectResult
}: AnalysisHistoryProps) {
  const getCredibilityIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    if (score >= 40) return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 70) return 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-800';
    if (score >= 40) return 'from-amber-50 to-amber-100 border-amber-200 text-amber-800';
    return 'from-red-50 to-red-100 border-red-200 text-red-800';
  };

  if (selectedResult) {
    return (
      <div className="space-y-8 animate-slideIn">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onSelectResult(null)}
            className="group flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
          >
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-300" />
            <span className="font-medium">{strings.back}</span>
          </button>
          <div className="h-6 w-px bg-white/20"></div>
          <h1 className="text-2xl font-bold text-white">Analysis Details</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">
                {new Date(selectedResult.timestamp).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            {/* Content Preview */}
            <div className="bg-white/70 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-800 leading-relaxed text-sm">
                {selectedResult.content.length > 300 
                  ? `${selectedResult.content.substring(0, 300)}...` 
                  : selectedResult.content}
              </p>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="p-8 space-y-6">
            {/* Credibility Score - Enhanced */}
            <div className={`bg-gradient-to-r ${getCredibilityColor(selectedResult.credibilityScore)} rounded-xl p-6 border`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCredibilityIcon(selectedResult.credibilityScore)}
                  <h3 className="text-lg font-bold">{strings.credibilityScore}</h3>
                </div>
                <div className="text-3xl font-bold">
                  {selectedResult.credibilityScore}/100
                </div>
              </div>
              <CredibilityScore score={selectedResult.credibilityScore} label="" />
            </div>

            {/* Red Flags Section */}
            {selectedResult.redFlags.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl overflow-hidden">
                <div className="bg-red-600 text-white px-6 py-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <h4 className="font-bold text-lg">{strings.redFlags}</h4>
                    <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                      {selectedResult.redFlags.length}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid gap-3">
                    {selectedResult.redFlags.map((flag, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-red-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-red-800 font-medium text-sm leading-relaxed">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Explanation Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5" />
                  <h4 className="font-bold text-lg">{strings.explanation}</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-blue-800 leading-relaxed font-medium">{selectedResult.explanation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Clock className="w-8 h-8 text-blue-400" />
          {strings.history}
        </h2>
        {history.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
            <span className="text-white/80 text-sm font-medium">
              {history.length} {history.length === 1 ? 'Analysis' : 'Analyses'}
            </span>
          </div>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-white/20">
            <Clock className="w-12 h-12 text-white/40" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Analysis History</h3>
          <p className="text-white/60 max-w-md mx-auto">{strings.noHistory}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((result) => (
            <div
              key={result.id}
              className="group bg-gradient-to-r from-white/90 to-white/85 backdrop-blur-xl rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-[1.02] overflow-hidden"
              onClick={() => onSelectResult(result)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      {new Date(result.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <Eye className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <p className="text-gray-800 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                  {result.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border ${getCredibilityColor(result.credibilityScore)}`}>
                      {getCredibilityIcon(result.credibilityScore)}
                      {result.credibilityScore}/100
                    </div>
                    
                    {result.redFlags.length > 0 && (
                      <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 rounded-full border border-red-200">
                        <AlertTriangle className="w-3 h-3" />
                        <span className="text-xs font-bold">
                          {result.redFlags.length} {result.redFlags.length === 1 ? 'Flag' : 'Flags'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500 font-medium">
                    View Details →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
