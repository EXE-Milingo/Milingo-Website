import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../translations';
import { SUPPORTED_LANGUAGES, Language } from '../types';

interface LanguageContextType {
  currentLang: string;
  setLanguage: (lang: string) => void;
  t: any;
  selectedLanguageObj: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setUiLang] = useState<string>('vi');

  const t = translations[currentLang] || translations['en'];
  const selectedLanguageObj = SUPPORTED_LANGUAGES.find(l => l.id === currentLang) || SUPPORTED_LANGUAGES[0];

  const setLanguage = (lang: string) => {
    setUiLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, selectedLanguageObj }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};