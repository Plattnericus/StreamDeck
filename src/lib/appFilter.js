// ─── App-Filter ───
// unterscheidet Standard-Apps von nutzerinstallierten Apps
// Standard-Apps sind immer da (Finder, Browser, etc.) und können nicht entfernt werden
// wird im Dock und App Store genutzt um zu entscheiden was angezeigt wird

// Standard-Apps die immer installiert sind
const STANDARD_APPS = [
  'apps.jsx',
  'finder.jsx',
  'browser.jsx',
  'settings.jsx',
  'trash.jsx',
];

// schnelle Prüfung: ist das eine Standard-App?
export function isStandardApp(fileName) {
  return STANDARD_APPS.includes(fileName.toLowerCase());
}

// das Gegenteil — true wenn die App KEINE Standard-App ist
// nützlich um Listen auf nutzerinstallierte Apps zu filtern
export function filterOutStandardApps(fileName) {
  return !isStandardApp(fileName);
}
