// ─── App Store (State Manager) ───
// this keeps track of which apps are currently open
// it uses React Context so all components can access the app list
// basically the "brain" that knows what windows are on screen right now

import React, { createContext, useContext, useState, useCallback } from 'react';

// create a context to share the app state across the whole app
const AppStoreContext = createContext(null);

// this provider wraps the app and gives everyone access to the open apps
export function AppStoreProvider({ children }) {
  // the list of all apps that are currently open (or were opened)
  const [apps, setApps] = useState([]);

  // this function opens an app or brings it to front if its already open
  // we check by id first, then by name as a fallback
  const addOrOpenApp = useCallback((app) => {
    setApps((prev) => {
      // first try to find the app by its id
      let existingIndex = prev.findIndex((a) => a.id === app.id);
      if (existingIndex === -1) {
        // not found by id? try matching by name (case insensitive)
        existingIndex = prev.findIndex(
          (a) => a.name.toLowerCase() === app.name.toLowerCase()
        );
      }

      // if the app is already in the list, just bring it to the front
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          open: true,         // make sure its marked as open
          minimized: false,   // un-minimize it if it was hidden
          zIndex: Math.max(...prev.map((a) => a.zIndex), 100) + 1, // put it on top
        };
        return updated;
      }

      // app is not in the list yet — add it as a new window
      const newApp = {
        ...app,
        open: true,
        minimized: false,
        zIndex: Math.max(...prev.map((a) => a.zIndex), 100) + 1, // highest z-index = on top
      };
      return [...prev, newApp];
    });
  }, []);

  // share the state and functions with all child components
  return (
    <AppStoreContext.Provider value={{ apps, setApps, addOrOpenApp }}>
      {children}
    </AppStoreContext.Provider>
  );
}

// hook to use the app store in any component
// will throw an error if used outside of the provider (to catch mistakes early)
export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
