// src/lib/i18n.js
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Theme store mit LocalStorage
const storedTheme = browser ? localStorage.getItem('theme') : 'light';
export const theme = writable(storedTheme || 'light');

// Language store mit LocalStorage
const storedLanguage = browser ? localStorage.getItem('language') : 'en';
export const language = writable(storedLanguage || 'en');

// LocalStorage Updates
if (browser) {
  theme.subscribe(value => {
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
  });
  
  language.subscribe(value => {
    localStorage.setItem('language', value);
  });
}

// Translations data
const translationsData = {
  de: {
    home: 'Startseite',
    about: 'Über uns',
    shop: 'Geschäft',
    contact: 'Kontakt',
    settings: 'Einstellungen',
    dark: 'Dunkel',
    light: 'Hell',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    logout: 'Abmelden',
    login: 'Anmelden',
    profile: 'Profil',
    analytics: 'Analytik',
    messages: 'Nachrichten',
    menu: 'Menü',
    language: 'Sprache'
  },
  en: {
    home: 'Home',
    about: 'About',
    shop: 'shop',
    contact: 'Contact',
    settings: 'Settings',
    dark: 'Dark',
    light: 'Light',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    logout: 'Logout',
    login: 'Login',
    profile: 'Profile',
    analytics: 'Analytics',
    messages: 'Messages',
    menu: 'Menu',
    language: 'Language'
  },
  it: {
    home: 'Home',
    about: 'Chi siamo',
    shop: 'Negozio',
    contact: 'Contatto',
    settings: 'Impostazioni',
    dark: 'Scuro',
    light: 'Chiaro',
    darkMode: 'Modalità Scura',
    lightMode: 'Modalità Chiara',
    logout: 'Disconnetti',
    login: 'Accedi',
    profile: 'Profilo',
    analytics: 'Analisi',
    messages: 'Messaggi',
    menu: 'Menu',
    language: 'Lingua'
  }
};

// Korrigierter derived store - verwende get() für den Zugriff
export const translations = {
  subscribe: (run) => {
    return derived(language, ($language) => {
      return translationsData[$language] || translationsData.en;
    }).subscribe(run);
  }
};