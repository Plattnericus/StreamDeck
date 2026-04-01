// ─── App Filter ───
// this file helps us tell the difference between standard apps and user-installed ones
// standard apps are always there (like Finder, Browser, etc.)
// we use this in the dock and app store to decide what to show

// these are the apps that come with the system by default
// they are always installed and cant be removed
const STANDARD_APPS = [
  'apps.jsx',
  'finder.jsx',
  'browser.jsx',
  'settings.jsx',
  'trash.jsx',
];

// quick check: is this app one of the standard ones?
export function isStandardApp(fileName) {
  return STANDARD_APPS.includes(fileName.toLowerCase());
}

// the opposite — returns true if the app is NOT a standard app
// useful for filtering lists to only show user-installed apps
export function filterOutStandardApps(fileName) {
  return !isStandardApp(fileName);
}
