const STANDARD_APPS = [
  'appstore.svelte',
  'finder.svelte',
  'browser.svelte',
  'settings.svelte',
  'trash.svelte'
];

export function isStandardApp(fileName: string): boolean {
  return STANDARD_APPS.includes(fileName.toLowerCase());
}

export function filterOutStandardApps(fileName: string): boolean {
  return !isStandardApp(fileName);
}
