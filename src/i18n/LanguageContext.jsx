import React, { createContext, useContext, useState, useEffect } from 'react';
import T from './translations';

const LanguageContext = createContext('de');

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

  useEffect(() => {
    const sync = () => setLanguage(getStoredLanguage());
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

export function useTranslation() {
  const lang = useContext(LanguageContext);
  return (key) => T[lang]?.[key] ?? T.de[key] ?? key;
}
