// App store — manages the list of open/running apps using React context
import React, { createContext, useContext, useState, useCallback } from 'react';

const AppStoreContext = createContext(null);

export function AppStoreProvider({ children }) {
  const [apps, setApps] = useState([]);

  // Open an existing app (bring to front) or add a new one to the list
  const addOrOpenApp = useCallback((app) => {
    setApps((prev) => {
      // Try to find the app by id first, then by name
      let existingIndex = prev.findIndex((a) => a.id === app.id);
      if (existingIndex === -1) {
        existingIndex = prev.findIndex(
          (a) => a.name.toLowerCase() === app.name.toLowerCase()
        );
      }

      // If found, reopen it and bring it to the front
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
