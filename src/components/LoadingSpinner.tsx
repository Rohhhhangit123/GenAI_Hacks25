import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, Zap, Brain, Search } from 'lucide-react';

interface LoadingSpinnerProps {
  text: string;
}

export function LoadingSpinner({ text }: LoadingSpinnerProps) {
  const [dots, setDots] = useState('');
  const [currentPhase, setCurrentPhase] = useState(0);

  // Animated dots for text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Phase animation for multi-step loading
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const phases = [
    { icon: <Search className="w-6 h-6" />, label: 'Analyzing content', color: 'from-blue-500 to-cyan-500' },
    { icon: <Brain className="w-6 h-6" />, label: 'Processing data', color: 'from-purple-500 to-pink-500' },
    { icon: <Zap className="w-6 h-6" />, label: 'Generating insights', color: 'from-yellow-500 to-orange-500' },
    { icon: <Sparkles className="w-6 h-6" />, label: 'Finalizing results', color: 'from-green-500 to-emerald-500' }
  ];

  const currentPhaseData = phases[currentPhase];

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Main Spinner Container */}
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl scale-150 animate-pulse"></div>
        
        {/* Outer Ring */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
        </div>

        {/* Middle Ring */}
        <div className="absolute inset-2 w-20 h-20">
          <div className="absolute inset-0 border-3 border-white/30 rounded-full"></div>
          <div className="absolute inset-0 border-3 border-transparent border-b-cyan-500 border-l-indigo-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>

        {/* Inner Ring */}
        <div className="absolute inset-4 w-16 h-16">
          <div className="absolute inset-0 border-2 border-white/40 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-transparent border-t-pink-500 border-r-yellow-500 rounded-full animate-spin" style={{ animationDuration: '0.8s' }}></div>
        </div>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`p-3 bg-gradient-to-r ${currentPhaseData.color} rounded-full shadow-lg text-white transition-all duration-500 transform hover:scale-110`}>
            {currentPhaseData.icon}
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
            style={{
              top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}px`,
              left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 40}px`,
              animation: `float ${2 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-white mb-2">
          {text}
          <span className="inline-block w-8 text-left text-blue-400 animate-pulse">
            {dots}
          </span>
        </h3>
        
        {/* Phase Indicator */}
        <div className="flex items-center justify-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <div className={`p-2 bg-gradient-to-r ${currentPhaseData.color} rounded-full text-white shadow-lg`}>
            {currentPhaseData.icon}
          </div>
          <span className="text-white font-medium">
            {currentPhaseData.label}
          </span>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentPhase 
                  ? 'bg-white scale-125 shadow-lg' 
                  : index < currentPhase 
                    ? 'bg-green-400 scale-100' 
                    : 'bg-white/30 scale-75'
              }`}
            />
          ))}
        </div>

        {/* Estimated Time */}
        <p className="text-white/70 text-sm font-medium">
          This usually takes a few seconds...
        </p>
      </div>

      {/* Background Wave Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse rounded-full blur-3xl"></div>
      </div>

      {/* Custom Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
