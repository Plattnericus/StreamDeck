/**
 * Standard-Apps, die überall gefiltert werden sollten
 */
const STANDARD_APPS = [
  'appstore.svelte',
  'finder.svelte',
  'browser.svelte',
  'settings.svelte',
  'trash.svelte'
];

/**
 * Prüft ob eine App eine Standard-App ist
 */
export function isStandardApp(fileName: string): boolean {
  return STANDARD_APPS.includes(fileName.toLowerCase());
}

/**
 * Filtert Standard-Apps aus einer Liste
 */
export function filterOutStandardApps(fileName: string): boolean {
  return !isStandardApp(fileName);
}
