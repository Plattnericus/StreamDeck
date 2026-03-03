import React, { createContext, useContext, useState, useCallback } from 'react';

const AppStoreContext = createContext(null);

export function AppStoreProvider({ children }) {
  const [apps, setApps] = useState([]);

  const addOrOpenApp = useCallback((app) => {
    setApps((prev) => {
      let existingIndex = prev.findIndex((a) => a.id === app.id);
      if (existingIndex === -1) {
        existingIndex = prev.findIndex(
          (a) => a.name.toLowerCase() === app.name.toLowerCase()
        );
      }

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          open: true,
          minimized: false,
          zIndex: Math.max(...prev.map((a) => a.zIndex), 100) + 1,
        };
        return updated;
      }

      const newApp = {
        ...app,
        open: true,
        minimized: false,
        zIndex: Math.max(...prev.map((a) => a.zIndex), 100) + 1,
      };
      return [...prev, newApp];
    });
  }, []);

  return (
    <AppStoreContext.Provider value={{ apps, setApps, addOrOpenApp }}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
