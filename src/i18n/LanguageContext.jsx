// Language context — provides the current language and translation helpers to the app
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import T from './translations';

const LanguageContext = createContext('de');

// Read saved language from localStorage, default to German
function getStoredLanguage() {
  try {
    const raw = localStorage.getItem('streamdeck_settings_v2');
    if (raw) {
      const p = JSON.parse(raw);
      if (p.language) return p.language;
    }
  } catch {}
  return 'de';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getStoredLanguage);
  const [transitioning, setTransitioning] = useState(false);
  const prevLangRef = useRef(language);

  // Listen for settings changes and animate a fade transition when language switches
  useEffect(() => {
    const sync = () => {
      const next = getStoredLanguage();
      if (next !== prevLangRef.current) {
        setTransitioning(true);
        document.documentElement.classList.add('lang-fade-out');

        setTimeout(() => {
          prevLangRef.current = next;
          setLanguage(next);
          document.documentElement.classList.remove('lang-fade-out');
          document.documentElement.classList.add('lang-fade-in');

          setTimeout(() => {
            document.documentElement.classList.remove('lang-fade-in');
            setTransitioning(false);
          }, 200);
        }, 150);
      }
    };
    window.addEventListener('streamdeck-settings-sync', sync);
    return () => window.removeEventListener('streamdeck-settings-sync', sync);
  }, []);

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

// Returns a t() function that looks up a translation key, falling back to German then the raw key
export function useTranslation() {
  const lang = useContext(LanguageContext);
  return (key) => T[lang]?.[key] ?? T.de[key] ?? key;
}
