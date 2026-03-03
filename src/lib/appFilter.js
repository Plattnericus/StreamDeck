const STANDARD_APPS = [
  'apps.jsx',
  'finder.jsx',
  'browser.jsx',
  'settings.jsx',
  'trash.jsx',
];

export function isStandardApp(fileName) {
  return STANDARD_APPS.includes(fileName.toLowerCase());
}

export function filterOutStandardApps(fileName) {
  return !isStandardApp(fileName);
}
