import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface CredibilityScoreProps {
  score: number;
  label: string;
}

export function CredibilityScore({ score, label }: CredibilityScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 70) return 'bg-green-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (score >= 40) return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <AlertTriangle className="w-6 h-6 text-red-600" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'High Credibility';
    if (score >= 40) return 'Moderate Credibility';
    return 'Low Credibility';
  };

  return (
    <div className={`rounded-lg p-6 ${getScoreBackgroundColor(score)} border-l-4 ${
      score >= 70 ? 'border-green-500' : score >= 40 ? 'border-yellow-500' : 'border-red-500'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <div className="flex items-center gap-3">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-lg text-gray-500">/100</span>
          </div>
          <p className={`text-sm font-medium mt-1 ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </p>
        </div>
        <div className="flex-shrink-0">
          {getScoreIcon(score)}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}
