import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { AnalysisResult, LanguageStrings } from '../types';
import { CredibilityScore } from './CredibilityScore';

interface AnalysisResultsProps {
  result: AnalysisResult;
  strings: LanguageStrings;
}

export function AnalysisResults({ result, strings }: AnalysisResultsProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <CredibilityScore score={result.credibilityScore} label={strings.credibilityScore} />

      {result.redFlags.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">{strings.redFlags}</h3>
          </div>
          <ul className="space-y-2">
            {result.redFlags.map((flag, index) => (
              <li key={index} className="flex items-start gap-2 text-red-700">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">{strings.explanation}</h3>
        </div>
        <p className="text-blue-700 leading-relaxed">{result.explanation}</p>
      </div>
    </div>
  );
}