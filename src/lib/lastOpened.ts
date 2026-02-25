import { writable } from 'svelte/store';

export type LastOpenedApp = {
  id: number;
  name: string;
  icon: string;
  component: any;
  timestamp: number;
  openCount: number;
};

const STORAGE_KEY = 'streamdeck_last_opened_v1';
const MAX_ITEMS = 10;

export const lastOpenedStore = writable<LastOpenedApp[]>([]);

export function loadLastOpened() {
  if (typeof localStorage === 'undefined') return;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      const cleanData = data.map(({ component, ...rest }: any) => rest);
      lastOpenedStore.set(cleanData);
    }
  } catch (e) {
    console.error('Failed to load last opened:', e);
  }
}

export function trackOpenedApp(app: Omit<LastOpenedApp, 'component'>) {
  lastOpenedStore.update(items => {
    const existing = items.findIndex(
      a => a.id === app.id || a.name.toLowerCase() === app.name.toLowerCase()
    );
    
    let updated: LastOpenedApp[];
    
    if (existing !== -1) {
      const item = items[existing];
      item.timestamp = Date.now();
      item.openCount = (item.openCount || 1) + 1;
      updated = [item, ...items.slice(0, existing), ...items.slice(existing + 1)];
    } else {
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

    updated = updated.slice(0, MAX_ITEMS);

    saveToLocalStorage(updated);

    return updated;
  });
}

function saveToLocalStorage(items: LastOpenedApp[]) {
  if (typeof localStorage === 'undefined') return;
  
  try {
    const cleanData = items.map(({ component, ...rest }: any) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData));
  } catch (e) {
    console.error('Failed to save last opened:', e);
  }
}

export function clearLastOpened() {
  lastOpenedStore.set([]);
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
