// remembers what apps u opened recently
import React, { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'streamdeck_last_opened_v1';
const MAX_ITEMS = 10; // max 10, nobody needs more

const LastOpenedContext = createContext(null);

export function LastOpenedProvider({ children }) {
  const [lastOpened, setLastOpened] = useState([]);

  // grab recent apps from localStorage (without the react componets obv)
  const loadLastOpened = useCallback(() => {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        const cleanData = data.map(({ component, ...rest }) => rest);
        setLastOpened(cleanData);
      }
    } catch (e) {
      console.error('Failed to load last opened:', e);
    }
  }, []);

  // app was opend, move it to top of the list
  const trackOpenedApp = useCallback((app) => {
    setLastOpened((items) => {
      const existing = items.findIndex(
        (a) => a.id === app.id || a.name.toLowerCase() === app.name.toLowerCase()
      );

      let updated;
      if (existing !== -1) {
        const item = { ...items[existing] };
        item.timestamp = Date.now();
        item.openCount = (item.openCount || 1) + 1;
        updated = [item, ...items.slice(0, existing), ...items.slice(existing + 1)];
      } else {
        updated = [
          { ...app, timestamp: Date.now(), openCount: 1, component: undefined },
          ...items,
        ];
      }

      updated = updated.slice(0, MAX_ITEMS);
      saveToLocalStorage(updated);
      return updated;
    });
  }, []);

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

export function useLastOpened() {
  const ctx = useContext(LastOpenedContext);
  if (!ctx) throw new Error('useLastOpened must be used within LastOpenedProvider');
  return ctx;
}

function saveToLocalStorage(items) {
  if (typeof localStorage === 'undefined') return;
  try {
    const cleanData = items.map(({ component, ...rest }) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData));
  } catch (e) {
    console.error('Failed to save last opened:', e);
  }
}
