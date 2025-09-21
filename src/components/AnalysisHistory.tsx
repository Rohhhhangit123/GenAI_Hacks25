import React from 'react';
import { Clock, Eye, ArrowLeft } from 'lucide-react';
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
  if (selectedResult) {
    return (
      <div className="space-y-6 animate-slideIn">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectResult(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {strings.back}
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              {new Date(selectedResult.timestamp).toLocaleString()}
            </p>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">
              {selectedResult.content.length > 200 
                ? `${selectedResult.content.substring(0, 200)}...` 
                : selectedResult.content}
            </p>
          </div>

          <div className="space-y-4">
            <CredibilityScore score={selectedResult.credibilityScore} label={strings.credibilityScore} />
            
            {selectedResult.redFlags.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">{strings.redFlags}</h4>
                <ul className="space-y-1">
                  {selectedResult.redFlags.map((flag, index) => (
                    <li key={index} className="text-red-700 text-sm flex items-start gap-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">{strings.explanation}</h4>
              <p className="text-blue-700 text-sm leading-relaxed">{selectedResult.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">{strings.history}</h2>
      
      {history.length === 0 ? (
        <div className="text-center py-8 text-white/60">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{strings.noHistory}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((result) => (
            <div
              key={result.id}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/90 transition-all duration-200 cursor-pointer group"
              onClick={() => onSelectResult(result)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 mb-1">
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                  <p className="text-gray-800 text-sm line-clamp-2 mb-2">
                    {result.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.credibilityScore >= 70
                        ? 'bg-green-100 text-green-700'
                        : result.credibilityScore >= 40
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {result.credibilityScore}/100
                    </div>
                    {result.redFlags.length > 0 && (
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        {result.redFlags.length} {result.redFlags.length === 1 ? 'flag' : 'flags'}
                      </span>
                    )}
                  </div>
                </div>
                <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}