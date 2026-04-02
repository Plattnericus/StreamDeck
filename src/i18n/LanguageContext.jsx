// ─── Sprachkontext ───
// verwaltet alles rund um Sprachen in der App
// gibt allen Komponenten Zugriff auf die aktuelle Sprache
// und eine Hilfsfunktion um Text-Keys in echte Wörter zu übersetzen

import React, { createContext, useContext, useState, useEffect } from 'react';
import T from './translations'; // das große Übersetzungs-Dictionary

// React Context damit jede Komponente die Sprache lesen kann
// Standard ist 'de' weil das die Hauptsprache der App ist
const LanguageContext = createContext('de');

// gespeicherte Sprache aus localStorage lesen
// alle Einstellungen liegen in einem JSON-Blob unter 'streamdeck_settings_v2'
// Fallback ist Deutsch wenn noch nichts gespeichert ist
function getStoredLanguage() {
  try {
    const raw = localStorage.getItem('streamdeck_settings_v2');
    if (raw) {
      const p = JSON.parse(raw);
      if (p.language) return p.language;
    }
  } catch {} // bei Fehler (z.B. kaputtes JSON) einfach ignorieren
  return 'de'; // Standard: Deutsch
}

// Provider-Komponente die die ganze App einwickelt
// macht die aktuelle Sprache für alle Kind-Komponenten verfügbar
export function LanguageProvider({ children }) {
  // mit der in localStorage gespeicherten Sprache starten
  const [language, setLanguage] = useState(getStoredLanguage);

  // auf Custom Event hören damit die Sprache sofort wechselt
  // wenn der Nutzer sie in den Einstellungen ändert
  useEffect(() => {
    const sync = () => {
      const next = getStoredLanguage(); // aus localStorage neu lesen
      if (next !== language) setLanguage(next); // nur updaten wenn sich was geändert hat
    };
    window.addEventListener('streamdeck-settings-sync', sync);
    // Listener aufräumen wenn die Komponente entfernt wird
    return () => window.removeEventListener('streamdeck-settings-sync', sync);
  }, [language]);

  // alle Kinder mit dem Sprachkontext einwickeln
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

// gibt einfach den aktuellen Sprachstring zurück (z.B. 'de', 'en', 'it')
export function useLanguage() {
  return useContext(LanguageContext);
}

// der Haupt-Übersetzungs-Hook für Komponenten
// gibt eine Funktion t(key) zurück die einen Key im Übersetzungs-Dictionary nachschlägt
// Fallback-Kette: aktuelle Sprache -> Deutsch -> roher Key
export function useTranslation() {
  const lang = useContext(LanguageContext);
  return (key) => T[lang]?.[key] ?? T.de[key] ?? key;
}
