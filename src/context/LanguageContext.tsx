import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { LanguageCode, Translations, translations, LANGUAGES, LanguageOption } from '../i18n/translations';
import { playTactileAudio } from '../utils/soundEffects';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  languages: LanguageOption[];
  t: Translations;
  isLoading: boolean;
  isInitialLoading: boolean;
  isLanguageSwitching: boolean;
  loadingProgress: number;
  loadingStatusText: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_language') as LanguageCode;
      if (saved && (saved === 'EN' || saved === 'ES' || saved === 'FR' || saved === 'HI')) {
        return saved;
      }
    }
    return 'EN';
  });

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatusText, setLoadingStatusText] = useState('');

  const animFrameRef = useRef<number | null>(null);

  // Active translation dictionary
  const t = translations[currentLanguage] || translations.EN;

  // Initial Page Loading Sequence (Runs once when website opens)
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400; // 1.4 seconds for initial cinematic boot

    const steps = [
      { at: 0, text: t.loading.initStep1 },
      { at: 28, text: t.loading.initStep2 },
      { at: 64, text: t.loading.initStep3 },
      { at: 92, text: t.loading.initStep4 },
    ];

    const animateInitial = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setLoadingProgress(progress);

      for (let i = steps.length - 1; i >= 0; i--) {
        if (progress >= steps[i].at) {
          setLoadingStatusText(steps[i].text);
          break;
        }
      }

      if (progress < 100) {
        animFrameRef.current = requestAnimationFrame(animateInitial);
      } else {
        setTimeout(() => {
          setIsInitialLoading(false);
        }, 220);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateInitial);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Language Change Sequence with High-Tech Loading Screen
  const setLanguage = useCallback((newLang: LanguageCode) => {
    if (newLang === currentLanguage) return;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    setIsLanguageSwitching(true);
    setLoadingProgress(0);

    const targetDict = translations[newLang] || translations.EN;
    const startTime = performance.now();
    const duration = 850; // 850ms for language switch

    const steps = [
      { at: 0, text: targetDict.loading.langStep1 },
      { at: 35, text: targetDict.loading.langStep2 },
      { at: 70, text: targetDict.loading.langStep3 },
      { at: 94, text: targetDict.loading.langStep4 },
    ];

    const animateLangSwitch = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setLoadingProgress(progress);

      for (let i = steps.length - 1; i >= 0; i--) {
        if (progress >= steps[i].at) {
          setLoadingStatusText(steps[i].text);
          break;
        }
      }

      // Halfway through the sequence, commit the language state change
      if (progress >= 50 && currentLanguage !== newLang) {
        setCurrentLanguageState(newLang);
        localStorage.setItem('user_language', newLang);
      }

      if (progress < 100) {
        animFrameRef.current = requestAnimationFrame(animateLangSwitch);
      } else {
        // Complete transition
        playTactileAudio('tick');
        setTimeout(() => {
          setIsLanguageSwitching(false);
        }, 180);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateLangSwitch);
  }, [currentLanguage]);

  const isLoading = isInitialLoading || isLanguageSwitching;

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        languages: LANGUAGES,
        t,
        isLoading,
        isInitialLoading,
        isLanguageSwitching,
        loadingProgress,
        loadingStatusText,
      }}
    >
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
