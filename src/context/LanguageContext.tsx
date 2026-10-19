import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, LocalizedString } from '../types';
import { TRANSLATIONS, getTranslation } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS.en, params?: Record<string, string | number>) => string;
  localize: (obj: LocalizedString | undefined | null) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('pfe_language') as Language | null;
    if (saved === 'en' || saved === 'mr' || saved === 'hi') {
      return saved;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('pfe_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof typeof TRANSLATIONS.en, params?: Record<string, string | number>): string => {
    return getTranslation(language, key, params);
  };

  const localize = (obj: LocalizedString | undefined | null): string => {
    if (!obj) return '';
    return obj[language] || obj.en || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
