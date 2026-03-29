// Settings store — handles loading, saving, and resetting user preferences.
// Settings are split between app settings and Control Center settings in localStorage.

export const DEFAULT_SETTINGS = {
  darkMode: false,
  accentColor: 'blue',
  fontSize: 'medium',
  reduceTransparency: false,
  soundEffects: true,
  startupSound: true,
  muted: false,
  language: 'de',
  autoLanguage: false,
  use24hClock: true,
  showSeconds: false,
  dateFormat: 'de',
  reduceMotion: false,
  autoLock: false,
  notifications: true,
  appBadges: true,
  notificationSound: true,
  showPreviews: 'always',
  doNotDisturb: false,
  allowCamera: false,
  allowMicrophone: false,
  analyticsEnabled: false,
  vpn: false,
};

export const DEFAULT_CC = {
  wifi: true,
  bluetooth: false,
  airplane: false,
  cellular: false,
  lock: false,
  mirror: false,
  brightness: 100,
  volume: 50,
};

export const ACCENT_COLORS = {
  blue:   '#007aff',
  purple: '#af52de',
  pink:   '#ff2d55',
  green:  '#34c759',
  orange: '#ff9500',
  red:    '#ff3b30',
};

// Keys that belong to app settings vs Control Center settings (stored separately)
const APP_KEYS = [
  'darkMode', 'accentColor', 'fontSize', 'reduceTransparency',
  'soundEffects', 'startupSound', 'muted',
  'language', 'autoLanguage', 'use24hClock', 'showSeconds', 'dateFormat', 'reduceMotion', 'autoLock',
  'notifications', 'appBadges', 'notificationSound', 'showPreviews', 'doNotDisturb',
  'allowCamera', 'allowMicrophone', 'analyticsEnabled', 'vpn',
];

const CC_KEYS = ['wifi', 'bluetooth', 'airplane', 'cellular', 'lock', 'mirror', 'brightness', 'volume'];

// Merge app + control center settings from localStorage into one object
export function loadSettings() {
  let app = { ...DEFAULT_SETTINGS };
  let cc = { ...DEFAULT_CC };
  try {
    const raw1 = localStorage.getItem('streamdeck_settings_v2');
    if (raw1) app = { ...app, ...JSON.parse(raw1) };
  } catch {}
  try {
    const raw2 = localStorage.getItem('control_center_settings_v1');
    if (raw2) cc = { ...cc, ...JSON.parse(raw2) };
  } catch {}
  return { ...app, ...cc };
}

// Split settings back into app and CC parts, then save each to localStorage
export function saveSettings(next) {
  try {
    const appPart = {};
    const ccPart = {};
    APP_KEYS.forEach(k => { appPart[k] = next[k]; });
    CC_KEYS.forEach(k => { ccPart[k] = next[k]; });
    localStorage.setItem('streamdeck_settings_v2', JSON.stringify(appPart));
    localStorage.setItem('control_center_settings_v1', JSON.stringify(ccPart));
  } catch {}
}

export function resetAppSettings() {
  try {
    localStorage.removeItem('streamdeck_settings_v2');
  } catch {}
}

// Notify other components (e.g. Header) that settings changed
export function broadcastSettingsChange() {
  try {
    window.dispatchEvent(new CustomEvent('streamdeck-settings-sync'));
  } catch {}
}
