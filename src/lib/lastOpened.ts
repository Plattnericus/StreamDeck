import { writable } from 'svelte/store';

export type LastOpenedApp = {
  id: number;
  name: string;
  icon: string;
  component: any;
  timestamp: number; // Zeitstempel wann geöffnet
  openCount: number; // Wie oft geöffnet
};

const STORAGE_KEY = 'streamdeck_last_opened_v1';
const MAX_ITEMS = 10; // Maximal 10 zuletzt geöffnete Apps

export const lastOpenedStore = writable<LastOpenedApp[]>([]);

/**
 * Lädt die zuletzt geöffneten Apps aus localStorage
 */
export function loadLastOpened() {
  if (typeof localStorage === 'undefined') return;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      // Entferne component da es nicht serialisierbar ist
      const cleanData = data.map(({ component, ...rest }: any) => rest);
      lastOpenedStore.set(cleanData);
    }
  } catch (e) {
    console.error('Failed to load last opened:', e);
  }
}

/**
 * Speichert eine App als zuletzt geöffnet
 */
export function trackOpenedApp(app: Omit<LastOpenedApp, 'component'>) {
  lastOpenedStore.update(items => {
    const existing = items.findIndex(
      a => a.id === app.id || a.name.toLowerCase() === app.name.toLowerCase()
    );
    
    let updated: LastOpenedApp[];
    
    if (existing !== -1) {
      // App existiert - nach oben verschieben und openCount erhöhen
      const item = items[existing];
      item.timestamp = Date.now();
      item.openCount = (item.openCount || 1) + 1;
      updated = [item, ...items.slice(0, existing), ...items.slice(existing + 1)];
    } else {
      // Neue App hinzufügen
      updated = [
        {
          ...app,
          timestamp: Date.now(),
          openCount: 1,
          component: undefined as any
        },
        ...items
      ];
    }
    
    // Begrenize auf MAX_ITEMS
    updated = updated.slice(0, MAX_ITEMS);
    
    // Speichere in localStorage (ohne component)
    saveToLocalStorage(updated);
    
    return updated;
  });
}

/**
 * Speichert die Liste in localStorage
 */
function saveToLocalStorage(items: LastOpenedApp[]) {
  if (typeof localStorage === 'undefined') return;
  
  try {
    // Entferne component vor dem Speichern
    const cleanData = items.map(({ component, ...rest }: any) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData));
  } catch (e) {
    console.error('Failed to save last opened:', e);
  }
}

/**
 * Löscht die Last Opened History
 */
export function clearLastOpened() {
  lastOpenedStore.set([]);
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
