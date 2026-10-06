'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import en from '@/i18n/en.json';
import hi from '@/i18n/hi.json';
import pt from '@/i18n/pt.json';
import es from '@/i18n/es.json';
import fr from '@/i18n/fr.json';
import de from '@/i18n/de.json';
import ja from '@/i18n/ja.json';

export type Lang = 'en' | 'hi' | 'pt' | 'es' | 'fr' | 'de' | 'ja';
export type Translations = typeof en;

export interface LanguageOption {
  code: Lang;
  name: string;
  nativeName: string;
  flag: string;
}

export const availableLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
];

const translations: Record<Lang, Translations> = { en, hi, pt, es, fr, de, ja };

interface I18nContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  t: en,
  setLang: () => {},
  toggleLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arjun-lang') as Lang;
      if (saved && translations[saved]) {
        setLangState(saved);
      }
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    if (translations[l]) {
      setLangState(l);
      if (typeof window !== 'undefined') {
        localStorage.setItem('arjun-lang', l);
      }
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem('arjun-lang', next);
      }
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: translations[lang] || en, setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
