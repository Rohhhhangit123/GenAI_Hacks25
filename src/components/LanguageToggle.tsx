import React, { useState } from 'react';
import { Language } from '../types';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languageConfig = {
  en: { 
    label: 'English', 
    nativeLabel: 'English',
    flag: '🇺🇸',
    code: 'EN'
  },
  hi: { 
    label: 'Hindi', 
    nativeLabel: 'हिन्दी',
    flag: '🇮🇳',
    code: 'HI'
  },
  mr: { 
    label: 'Marathi', 
    nativeLabel: 'मराठी',
    flag: '🇮🇳',
    code: 'MR'
  }
};

export function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentConfig = languageConfig[currentLanguage];

  return (
    <div className="relative">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex items-center gap-3 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/30 transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/50 hover:shadow-lg hover:shadow-white/10 ${
          isOpen ? 'from-white/25 to-white/15 border-white/50 shadow-lg shadow-white/10' : ''
        }`}
      >
        {/* Globe Icon with Animation */}
        <div className="relative">
          <Globe className={`w-5 h-5 text-white/90 transition-all duration-300 ${
            isHovered || isOpen ? 'rotate-12 scale-110' : ''
          }`} />
          <div className={`absolute inset-0 bg-blue-400 rounded-full blur-sm opacity-0 transition-opacity duration-300 ${
            isHovered || isOpen ? 'opacity-30' : ''
          }`}></div>
        </div>

        {/* Language Display */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentConfig.flag}</span>
          <div className="text-left">
            <p className="text-white font-bold text-sm leading-none">
              {currentConfig.nativeLabel}
            </p>
            <p className="text-white/70 text-xs font-medium">
              {currentConfig.label}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown className={`w-4 h-4 text-white/80 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`} />

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}></div>
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute top-full left-0 right-0 mt-2 transition-all duration-300 transform origin-top ${
        isOpen 
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}>
        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-gray-700">Select Language</span>
            </div>
          </div>

          {/* Language Options */}
          <div className="py-2">
            {(Object.keys(languageConfig) as Language[]).map((lang) => {
              const config = languageConfig[lang];
              const isSelected = currentLanguage === lang;
              
              return (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang);
                    setIsOpen(false);
                  }}
                  className={`group w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500' 
                      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'
                  }`}
                >
                  {/* Flag */}
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {config.flag}
                  </span>

                  {/* Language Info */}
                  <div className="flex-1 text-left">
                    <p className={`font-bold text-sm ${
                      isSelected ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-700'
                    } transition-colors duration-200`}>
                      {config.nativeLabel}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      {config.label}
                    </p>
                  </div>

                  {/* Language Code */}
                  <div className={`px-2 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                    isSelected 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}>
                    {config.code}
                  </div>

                  {/* Check Icon for Selected */}
                  {isSelected && (
                    <Check className="w-5 h-5 text-blue-600 animate-pulse" />
                  )}

                  {/* Hover Effect */}
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center font-medium">
              Language settings are saved automatically
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
