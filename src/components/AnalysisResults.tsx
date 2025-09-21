import React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle, Shield, TrendingUp, TrendingDown } from 'lucide-react';
import { AnalysisResult, LanguageStrings } from '../types';
import { CredibilityScore } from './CredibilityScore';

interface AnalysisResultsProps {
  result: AnalysisResult;
  strings: LanguageStrings;
}

export function AnalysisResults({ result, strings }: AnalysisResultsProps) {
  const redFlags = result?.redFlags ?? [];
  const explanation = result?.explanation ?? '';
  const credibilityScore = result?.credibilityScore ?? 0;

  const getCredibilityStatus = (score: number) => {
    if (score >= 70) return {
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      status: 'Highly Credible',
      color: 'emerald',
      gradient: 'from-emerald-50 via-emerald-100 to-green-50',
      border: 'border-emerald-200',
      accent: 'bg-emerald-500'
    };
    if (score >= 40) return {
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      status: 'Moderately Credible',
      color: 'amber',
      gradient: 'from-amber-50 via-yellow-100 to-orange-50',
      border: 'border-amber-200',
      accent: 'bg-amber-500'
    };
    return {
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      status: 'Low Credibility',
      color: 'red',
      gradient: 'from-red-50 via-rose-100 to-pink-50',
      border: 'border-red-200',
      accent: 'bg-red-500'
    };
  };

  const credibilityInfo = getCredibilityStatus(credibilityScore);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Credibility Score Section - Enhanced */}
      {typeof result?.credibilityScore === 'number' && (
        <div className={`bg-gradient-to-br ${credibilityInfo.gradient} ${credibilityInfo.border} border-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}>
          {/* Header */}
          <div className={`bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm px-8 py-6 border-b ${credibilityInfo.border}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {credibilityInfo.icon}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{strings.credibilityScore}</h3>
                  <p className={`text-sm font-medium text-${credibilityInfo.color}-700`}>
                    {credibilityInfo.status}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-800 mb-1">
                  {result.credibilityScore}
                  <span className="text-2xl text-gray-500">/100</span>
                </div>
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-${credibilityInfo.color}-100 border border-${credibilityInfo.color}-200`}>
                  {credibilityScore >= 70 ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  <span className={`text-xs font-bold text-${credibilityInfo.color}-700`}>
                    {credibilityScore >= 70 ? 'Trustworthy' : credibilityScore >= 40 ? 'Questionable' : 'Suspicious'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar and Score */}
          <div className="px-8 py-6">
            <CredibilityScore
              score={result.credibilityScore}
              label=""
            />
          </div>
        </div>
      )}

      {/* Red Flags Section - Enhanced */}
      {redFlags.length > 0 && (
        <div className="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-2 border-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Header with Alert Design */}
          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-600 opacity-90"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{strings.redFlags}</h3>
                  <p className="text-red-100 text-sm font-medium">Critical issues detected</p>
                </div>
              </div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                {redFlags.length}
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid gap-4">
              {redFlags.map((flag, index) => (
                <div 
                  key={index} 
                  className="group bg-white/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-red-800 font-medium leading-relaxed group-hover:text-red-900 transition-colors duration-200">
                        {flag}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-2 h-8 bg-red-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Explanation Section - Enhanced */}
      {explanation && (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 opacity-90"></div>
            <div className="relative flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{strings.explanation}</h3>
                <p className="text-blue-100 text-sm font-medium">Detailed analysis breakdown</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 translate-x-14"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10"></div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-blue-800 leading-relaxed font-medium text-lg">
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
