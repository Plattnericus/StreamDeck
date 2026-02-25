import { writable } from 'svelte/store';

export type App = {
  id: number;
  name: string;
  file?: string;
  icon: string;
  component: any;
  category?: string;
  subtitle?: string;
  description?: string;
  developer?: string;
  version?: string;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  default: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  priority?: number;
};

export const appStore = writable<App[]>([]);

export function addOrOpenApp(app: App) {
  appStore.update(apps => {
    let existingIndex = apps.findIndex(a => a.id === app.id);
    if (existingIndex === -1) {
      existingIndex = apps.findIndex(a => a.name.toLowerCase() === app.name.toLowerCase());
    }

    if (existingIndex !== -1) {
      const existing = apps[existingIndex];
      existing.open = true;
      existing.minimized = false;
      existing.zIndex = Math.max(...apps.map(a => a.zIndex), 100) + 1;
      return apps;
    }
    const newApp = { ...app };
    newApp.open = true;
    newApp.minimized = false;
    newApp.zIndex = Math.max(...apps.map(a => a.zIndex), 100) + 1;
    return [...apps, newApp];
  });
}
