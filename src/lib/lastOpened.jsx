// ─── Last Opened Tracker ───
// this keeps a list of recently opened apps
// it saves the list to localStorage so it persists between page reloads
// the "Recently Opened" section on the desktop uses this data

import React, { createContext, useContext, useState, useCallback } from 'react';

// the key we use to store the data in localStorage
const STORAGE_KEY = 'streamdeck_last_opened_v1';
const MAX_ITEMS = 10; // we only keep the last 10 apps — nobody needs more

// context so all components can access the recently opened list
const LastOpenedContext = createContext(null);

// provider that wraps the app and manages the recently opened state
export function LastOpenedProvider({ children }) {
  // the list of recently opened apps
  const [lastOpened, setLastOpened] = useState([]);

  // load the list from localStorage when the app starts
  // we strip out the 'component' property because you cant serialize React components
  const loadLastOpened = useCallback(() => {
    if (typeof localStorage === 'undefined') return; // safety check for SSR
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return; // nothing saved yet
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        // remove the component property — we only need the metadata
        const cleanData = data.map(({ component, ...rest }) => rest);
        setLastOpened(cleanData);
      }
    } catch (e) {
      console.error('Failed to load last opened:', e);
    }
  }, []);

  // call this when a user opens an app
  // it moves the app to the top of the list and updates the timestamp
  const trackOpenedApp = useCallback((app) => {
    setLastOpened((items) => {
      // check if this app is already in the list (by id or name)
      const existing = items.findIndex(
        (a) => a.id === app.id || a.name.toLowerCase() === app.name.toLowerCase()
      );

      let updated;
      if (existing !== -1) {
        // app was opened before — update its timestamp and open count
        const item = { ...items[existing] };
        item.timestamp = Date.now();
        item.openCount = (item.openCount || 1) + 1;
        // move it to the front of the list
        updated = [item, ...items.slice(0, existing), ...items.slice(existing + 1)];
      } else {
        // first time opening this app — add it at the top
        updated = [
          { ...app, timestamp: Date.now(), openCount: 1, component: undefined },
          ...items,
        ];
      }

      // keep only the most recent items and save to localStorage
      updated = updated.slice(0, MAX_ITEMS);
      saveToLocalStorage(updated);
      return updated;
    });
  }, []);

  // clear the whole list (used in settings or when user wants a fresh start)
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

// hook to access the recently opened list from any component
export function useLastOpened() {
  const ctx = useContext(LastOpenedContext);
  if (!ctx) throw new Error('useLastOpened must be used within LastOpenedProvider');
  return ctx;
}

// helper to save the list to localStorage
// we remove the component property because React components cant be turned into JSON
function saveToLocalStorage(items) {
  if (typeof localStorage === 'undefined') return;
  try {
    const cleanData = items.map(({ component, ...rest }) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData));
  } catch (e) {
    console.error('Failed to save last opened:', e);
  }
}
