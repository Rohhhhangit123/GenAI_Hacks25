import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languageLabels = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी'
};

export function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
        <Globe className="w-4 h-4 text-white/80" />
        {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              currentLanguage === lang
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {languageLabels[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}