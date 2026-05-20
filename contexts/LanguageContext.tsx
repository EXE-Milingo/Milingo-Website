
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

/**
 * Robust Proxy utility for translations with deep fallback to English.
 */
const createDeepProxy = (target: any, fallback: any): any => {
  return new Proxy(target || {}, {
    get: (t, prop) => {
      const val = t[prop];
      const fbVal = fallback ? fallback[prop] : undefined;

      // If value is missing and we have a fallback, use fallback
      const result = val !== undefined ? val : fbVal;

      // If the result is a non-array object, wrap it in a proxy too
      if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
        return createDeepProxy(result, fbVal);
      }
      
      return result ?? "";
    }
  });
};

const getProxyTranslations = (lang: string) => {
  const current = translations[lang];
  const enFallback = translations['en'] || translations['vi'];
  return createDeepProxy(current, enFallback);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setUiLang] = useState<string>('vi');

  const t = getProxyTranslations(currentLang);
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
