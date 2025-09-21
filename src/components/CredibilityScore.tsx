import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, Shield, TrendingUp, TrendingDown, Zap } from 'lucide-react';

interface CredibilityScoreProps {
  score: number;
  label: string;
}

export function CredibilityScore({ score, label }: CredibilityScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = score / steps;
      let currentScore = 0;

      const interval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(Math.floor(currentScore));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(timer);
  }, [score]);

  const getScoreConfig = (score: number) => {
    if (score >= 70) return {
      textColor: 'text-emerald-700',
      bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
      borderGradient: 'from-emerald-400 to-green-500',
      progressGradient: 'from-emerald-500 via-green-500 to-teal-500',
      shadowColor: 'shadow-emerald-500/25',
      glowColor: 'shadow-emerald-500/40',
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      statusIcon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      label: 'High Credibility',
      description: 'Highly trustworthy content',
      accentColor: 'bg-emerald-500'
    };
    
    if (score >= 40) return {
      textColor: 'text-amber-700',
      bgGradient: 'from-amber-50 via-yellow-50 to-orange-50',
      borderGradient: 'from-amber-400 to-yellow-500',
      progressGradient: 'from-amber-500 via-yellow-500 to-orange-500',
      shadowColor: 'shadow-amber-500/25',
      glowColor: 'shadow-amber-500/40',
      icon: <AlertCircle className="w-8 h-8 text-amber-600" />,
      statusIcon: <Shield className="w-5 h-5 text-amber-600" />,
      label: 'Moderate Credibility',
      description: 'Requires verification',
      accentColor: 'bg-amber-500'
    };
    
    return {
      textColor: 'text-red-700',
      bgGradient: 'from-red-50 via-rose-50 to-pink-50',
      borderGradient: 'from-red-400 to-rose-500',
      progressGradient: 'from-red-500 via-rose-500 to-pink-500',
      shadowColor: 'shadow-red-500/25',
      glowColor: 'shadow-red-500/40',
      icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
      statusIcon: <TrendingDown className="w-5 h-5 text-red-600" />,
      label: 'Low Credibility',
      description: 'Potentially unreliable',
      accentColor: 'bg-red-500'
    };
  };

  const config = getScoreConfig(score);

  return (
    <div className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      {/* Background with gradient */}
      <div className={`bg-gradient-to-br ${config.bgGradient} border-2 border-transparent bg-clip-padding`}>
        {/* Gradient border effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${config.borderGradient} opacity-20`}></div>
        
        {/* Main content */}
        <div className="relative p-8">
          {/* Header section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {label && (
                <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                  {label}
                </p>
              )}
              
              {/* Score display */}
              <div className="flex items-end gap-2 mb-2">
                <span className={`text-5xl font-black ${config.textColor} transition-all duration-300`}>
                  {animatedScore}
                </span>
                <span className="text-2xl font-bold text-gray-500 mb-2">/100</span>
              </div>

              {/* Status label with icon */}
              <div className="flex items-center gap-3">
                <div className={`p-2 ${config.accentColor} rounded-full shadow-lg`}>
                  {config.statusIcon}
                </div>
                <div>
                  <p className={`text-lg font-bold ${config.textColor}`}>
                    {config.label}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    {config.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Main icon */}
            <div className="relative">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.borderGradient} opacity-20 scale-150 animate-pulse`}></div>
              <div className="relative p-4 bg-white/80 backdrop-blur-sm rounded-full border-2 border-white/50 shadow-xl">
                {config.icon}
              </div>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-medium text-gray-600">
              <span>Credibility Assessment</span>
              <span>{animatedScore}%</span>
            </div>
            
            {/* Progress container */}
            <div className="relative">
              <div className="w-full bg-gray-200/80 rounded-full h-4 shadow-inner backdrop-blur-sm">
                {/* Animated progress bar */}
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${config.progressGradient} transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
                  style={{ width: `${animatedScore}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-full ${config.glowColor} blur-sm`}></div>
                </div>
              </div>

              {/* Score markers */}
              <div className="absolute top-0 w-full h-4 flex items-center">
                {/* 40% marker */}
                <div className="absolute left-[40%] w-0.5 h-6 bg-gray-400 -translate-y-1">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 bg-white px-1 rounded">
                    40
                  </div>
                </div>
                
                {/* 70% marker */}
                <div className="absolute left-[70%] w-0.5 h-6 bg-gray-400 -translate-y-1">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 bg-white px-1 rounded">
                    70
                  </div>
                </div>
              </div>
            </div>

            {/* Score ranges legend */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-rose-500 rounded-full"></div>
                <span>Low (0-39)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></div>
                <span>Moderate (40-69)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                <span>High (70-100)</span>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 opacity-10">
            <Zap className="w-6 h-6 text-gray-400" />
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 ${config.accentColor} rounded-full opacity-30 animate-bounce`}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + i * 0.5}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
