// ─── App Store (State-Manager) ───
// verfolgt welche Apps gerade offen sind
// nutzt React Context damit alle Komponenten auf die App-Liste zugreifen können

import React, { createContext, useContext, useState, useCallback } from 'react';

// Context damit alle Komponenten auf den App-State zugreifen können
const AppStoreContext = createContext(null);

// Provider der die App einwickelt und allen Zugriff auf die offenen Apps gibt
export function AppStoreProvider({ children }) {
  // Liste aller aktuell offenen Apps
  const [apps, setApps] = useState([]);

  // öffnet eine App oder bringt sie in den Vordergrund wenn sie schon offen ist
  // zuerst nach ID suchen, dann nach Name als Fallback
  const addOrOpenApp = useCallback((app) => {
    setApps((prev) => {
      // zuerst nach ID suchen
      let existingIndex = prev.findIndex((a) => a.id === app.id);
      if (existingIndex === -1) {
        // nicht per ID gefunden? nach Name suchen (Groß/Kleinschreibung egal)
        existingIndex = prev.findIndex(
          (a) => a.name.toLowerCase() === app.name.toLowerCase()
        );
      }

      // App ist schon in der Liste — in den Vordergrund bringen
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          open: true,         // sicherstellen dass sie als offen markiert ist
          minimized: false,   // minimierung aufheben
          zIndex: Math.max(...prev.map((a) => a.zIndex), 100) + 1, // ganz nach oben
        };
        return updated;
      }

      // App noch nicht in der Liste — als neues Fenster hinzufügen
      const newApp = {
        ...app,
        open: true,
        minimized: false,
        zIndex: Math.max(...prev.map((a) => a.zIndex), 100) + 1, // höchster z-index = ganz oben
      };
      return [...prev, newApp];
    });
  }, []);

  // State und Funktionen mit allen Kind-Komponenten teilen
  return (
    <AppStoreContext.Provider value={{ apps, setApps, addOrOpenApp }}>
      {children}
    </AppStoreContext.Provider>
  );
}

// Hook um den App Store in einer Komponente zu nutzen
// wirft einen Fehler wenn er außerhalb des Providers verwendet wird
export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
