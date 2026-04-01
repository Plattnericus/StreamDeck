// ─── Language Context ───
// this file handles everything about languages in the app
// basically it gives all components access to the current language
// and a helper function to translate text keys into real words

import React, { createContext, useContext, useState, useEffect } from 'react';
import T from './translations'; // this is the big translation dictionary

// we create a React context so every component can read the language
// default is 'de' (German) because that is the main language of the app
const LanguageContext = createContext('de');

// this just reads the saved language from localStorage
// we store all settings in one JSON blob under 'streamdeck_settings_v2'
// if nothing is saved yet, we fall back to German
function getStoredLanguage() {
  try {
    // try to read the settings from localStorage
    const raw = localStorage.getItem('streamdeck_settings_v2');
    if (raw) {
      const p = JSON.parse(raw); // parse the JSON string
      if (p.language) return p.language; // return the saved language if it exists
    }
  } catch {} // if something goes wrong (like bad JSON), just ignore it
  return 'de'; // default: German
}

// this is the provider component that wraps the whole app
// it makes the current language available to all child components
export function LanguageProvider({ children }) {
  // we start with whatever language is saved in localStorage
  const [language, setLanguage] = useState(getStoredLanguage);

  // we listen for a custom event so the language updates right away
  // when the user changes it in the settings page
  // pls note: we use a custom event 'streamdeck-settings-sync' for this
  useEffect(() => {
    const sync = () => {
      const next = getStoredLanguage(); // re-read from localStorage
      if (next !== language) setLanguage(next); // only update if it actually changed
    };
    window.addEventListener('streamdeck-settings-sync', sync);
    // clean up the listener when the component is removed
    return () => window.removeEventListener('streamdeck-settings-sync', sync);
  }, [language]);

  // wrap all children with the language value so they can access it
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

// simple hook — just returns the current language string (like 'de', 'en', 'it')
export function useLanguage() {
  return useContext(LanguageContext);
}

// this is the main translation hook that components use
// it returns a function t(key) that looks up a key in the translation dictionary
// fallback chain: current language -> German -> raw key
// so if a translation is missing, it shows German, and if that is also missing, just the key itself
export function useTranslation() {
  const lang = useContext(LanguageContext);
  return (key) => T[lang]?.[key] ?? T.de[key] ?? key;
}
