// ─── Zuletzt-geöffnet Tracker ───
// speichert eine Liste zuletzt geöffneter Apps
// in localStorage damit sie über Neuladen hinweg erhalten bleibt

import React, { createContext, useContext, useState, useCallback } from 'react';

// localStorage-Key für die Daten
const STORAGE_KEY = 'streamdeck_last_opened_v1';
const MAX_ITEMS = 10; // maximal 10 Apps merken

// Context damit alle Komponenten auf die zuletzt-geöffnet Liste zugreifen können
const LastOpenedContext = createContext(null);

// Provider der die App einwickelt und den Zuletzt-geöffnet State verwaltet
export function LastOpenedProvider({ children }) {
  // die Liste der zuletzt geöffneten Apps
  const [lastOpened, setLastOpened] = useState([]);

  // Liste aus localStorage laden wenn die App startet
  // 'component' Property wird entfernt weil React-Komponenten nicht serialisierbar sind
  const loadLastOpened = useCallback(() => {
    if (typeof localStorage === 'undefined') return; // SSR-Sicherheitscheck
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return; // noch nichts gespeichert
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        // component-Property entfernen — wir brauchen nur die Metadaten
        const cleanData = data.map(({ component, ...rest }) => rest);
        setLastOpened(cleanData);
      }
    } catch (e) {
      console.error('Failed to load last opened:', e);
    }
  }, []);

  // aufrufen wenn der Nutzer eine App öffnet
  // verschiebt die App an den Anfang der Liste und aktualisiert den Timestamp
  const trackOpenedApp = useCallback((app) => {
    setLastOpened((items) => {
      // prüfen ob diese App schon in der Liste ist (nach ID oder Name)
      const existing = items.findIndex(
        (a) => a.id === app.id || a.name.toLowerCase() === app.name.toLowerCase()
      );

      let updated;
      if (existing !== -1) {
        // App war schon mal offen — Timestamp und Öffnungs-Zähler aktualisieren
        const item = { ...items[existing] };
        item.timestamp = Date.now();
        item.openCount = (item.openCount || 1) + 1;
        // an den Anfang verschieben
        updated = [item, ...items.slice(0, existing), ...items.slice(existing + 1)];
      } else {
        // App zum ersten Mal geöffnet — am Anfang hinzufügen
        updated = [
          { ...app, timestamp: Date.now(), openCount: 1, component: undefined },
          ...items,
        ];
      }

      // nur die neuesten Items behalten und in localStorage speichern
      updated = updated.slice(0, MAX_ITEMS);
      saveToLocalStorage(updated);
      return updated;
    });
  }, []);

  // ganze Liste leeren (in Einstellungen oder für einen Neustart)
  const clearLastOpened = useCallback(() => {
    setLastOpened([]);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <LastOpenedContext.Provider value={{ lastOpened, loadLastOpened, trackOpenedApp, clearLastOpened }}>
      {children}
    </LastOpenedContext.Provider>
  );
}

// Hook um die Zuletzt-geöffnet Liste in einer Komponente zu nutzen
export function useLastOpened() {
  const ctx = useContext(LastOpenedContext);
  if (!ctx) throw new Error('useLastOpened must be used within LastOpenedProvider');
  return ctx;
}

// Hilfsfunktion zum Speichern in localStorage
// component-Property wird entfernt weil React-Komponenten kein JSON sind
function saveToLocalStorage(items) {
  if (typeof localStorage === 'undefined') return;
  try {
    const cleanData = items.map(({ component, ...rest }) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData));
  } catch (e) {
    console.error('Failed to save last opened:', e);
  }
}
