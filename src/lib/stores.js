import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Exportiere User-Stores
export * from './stores/user.js';

// ===== HELPER =====
function getLocalStorage(key, fallback) {
	if (browser) return localStorage.getItem(key) || fallback;
	return fallback;
}

// ===== INITIAL VALUES =====
const initialLanguage = getLocalStorage('language', 'de');
const initialTheme = getLocalStorage('theme', 'light');

if (browser) {
	document.documentElement.setAttribute('data-theme', initialTheme);
}

// Theme-Handling (dark/light) im localStorage
const getInitialTheme = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('theme') || 'light';
  }
  return 'light';
};

// ===== STORES =====
export const language = writable(initialLanguage);
export const theme = writable(getInitialTheme());

// ===== SYNC LOCALSTORAGE =====
if (browser) {
	language.subscribe((value) => localStorage.setItem('language', value));
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
	});
}

// ===== TRANSLATIONS =====
const translationsData = {
	de: {
		home: 'Startseite', about: 'Über uns', shop: 'Geschäft', contact: 'Kontakt',
		settings: 'Einstellungen', dark: 'Dunkel', light: 'Hell', darkMode: 'Dunkelmodus',
		lightMode: 'Hellmodus', logout: 'Abmelden', login: 'Anmelden', profile: 'Profil',
		analytics: 'Analytik', messages: 'Nachrichten', menu: 'Menü', language: 'Sprache',
		manageAccountSettings: 'Verwalten Sie Ihre Kontoeinstellungen', profilePicture: 'Profilbild',
		backgroundImage: 'Hintergrundbild', profileInformation: 'Profilinformationen',
		changeEmail: 'E-Mail ändern', changePassword: 'Passwort ändern', username: 'Benutzername',
		aboutMe: 'Über mich', currentEmail: 'Aktuelle E-Mail', newEmail: 'Neue E-Mail',
		confirmEmail: 'E-Mail bestätigen', currentPassword: 'Aktuelles Passwort',
		newPassword: 'Neues Passwort', confirmPassword: 'Passwort bestätigen',
		selectImage: 'Bild auswählen', selectBackground: 'Hintergrund auswählen',
		resetToDefault: 'Standard zurücksetzen', saveProfile: 'Profil speichern',
		updateEmail: 'E-Mail aktualisieren', updatePassword: 'Passwort aktualisieren',
		usernamePlaceholder: 'Ihr Benutzername', aboutMePlaceholder: 'Erzählen Sie etwas über sich...',
		newEmailPlaceholder: 'neue-email@beispiel.de', currentPasswordPlaceholder: 'Ihr aktuelles Passwort',
		newPasswordPlaceholder: 'Neues Passwort (min. 6 Zeichen)', confirmPasswordPlaceholder: 'Passwort wiederholen',
		profileLoadError: 'Fehler beim Laden der Profildaten', pleaseSelectImage: 'Bitte wählen Sie ein Bild aus',
		imageTooLarge: 'Bild darf nicht größer als 5MB sein', backgroundImageTooLarge: 'Bild darf nicht größer als 10MB sein',
		profileImageUpdated: 'Profilbild erfolgreich aktualisiert', profileImageError: 'Fehler beim Hochladen des Profilbilds',
		backgroundImageUpdated: 'Hintergrundbild erfolgreich aktualisiert', backgroundImageError: 'Fehler beim Hochladen des Hintergrundbilds',
		emailsDontMatch: 'E-Mail-Adressen stimmen nicht überein', emailUpdateSuccess: 'E-Mail wurde aktualisiert. Bitte bestätigen Sie Ihre neue E-Mail.',
		emailUpdateError: 'Fehler beim Aktualisieren der E-Mail', passwordsDontMatch: 'Passwörter stimmen nicht überein',
		passwordTooShort: 'Passwort muss mindestens 6 Zeichen lang sein', passwordUpdateSuccess: 'Passwort erfolgreich aktualisiert',
		passwordUpdateError: 'Fehler beim Aktualisieren des Passworts', profileUpdateSuccess: 'Profil erfolgreich aktualisiert',
		profileUpdateError: 'Fehler beim Aktualisieren des Profils', backgroundReset: 'Hintergrund zurückgesetzt',
		backgroundResetError: 'Fehler beim Zurücksetzen des Hintergrunds'
	},
	en: {
		home: 'Home', about: 'About', shop: 'Shop', contact: 'Contact',
		settings: 'Settings', dark: 'Dark', light: 'Light', darkMode: 'Dark Mode',
		lightMode: 'Light Mode', logout: 'Logout', login: 'Login', profile: 'Profile',
		analytics: 'Analytics', messages: 'Messages', menu: 'Menu', language: 'Language',
		manageAccountSettings: 'Manage your account settings', profilePicture: 'Profile Picture',
		backgroundImage: 'Background Image', profileInformation: 'Profile Information',
		changeEmail: 'Change Email', changePassword: 'Change Password', username: 'Username',
		aboutMe: 'About Me', currentEmail: 'Current Email', newEmail: 'New Email',
		confirmEmail: 'Confirm Email', currentPassword: 'Current Password',
		newPassword: 'New Password', confirmPassword: 'Confirm Password',
		selectImage: 'Select Image', selectBackground: 'Select Background',
		resetToDefault: 'Reset to Default', saveProfile: 'Save Profile',
		updateEmail: 'Update Email', updatePassword: 'Update Password',
		usernamePlaceholder: 'Your username', aboutMePlaceholder: 'Tell us something about yourself...',
		newEmailPlaceholder: 'new-email@example.com', currentPasswordPlaceholder: 'Your current password',
		newPasswordPlaceholder: 'New password (min. 6 characters)', confirmPasswordPlaceholder: 'Repeat password',
		profileLoadError: 'Error loading profile data', pleaseSelectImage: 'Please select an image',
		imageTooLarge: 'Image must not be larger than 5MB', backgroundImageTooLarge: 'Image must not be larger than 10MB',
		profileImageUpdated: 'Profile picture updated successfully', profileImageError: 'Error uploading profile picture',
		backgroundImageUpdated: 'Background image updated successfully', backgroundImageError: 'Error uploading background image',
		emailsDontMatch: 'Email addresses do not match', emailUpdateSuccess: 'Email has been updated. Please confirm your new email.',
		emailUpdateError: 'Error updating email', passwordsDontMatch: 'Passwords do not match',
		passwordTooShort: 'Password must be at least 6 characters long', passwordUpdateSuccess: 'Password updated successfully',
		passwordUpdateError: 'Error updating password', profileUpdateSuccess: 'Profile updated successfully',
		profileUpdateError: 'Error updating profile', backgroundReset: 'Background reset',
		backgroundResetError: 'Error resetting background'
	},
	it: {
		home: 'Home', about: 'Chi siamo', shop: 'Negozio', contact: 'Contatto',
		settings: 'Impostazioni', dark: 'Scuro', light: 'Chiaro', darkMode: 'Modalità Scura',
		lightMode: 'Modalità Chiara', logout: 'Disconnetti', login: 'Accedi', profile: 'Profilo',
		analytics: 'Analisi', messages: 'Messaggi', menu: 'Menu', language: 'Lingua',
		manageAccountSettings: 'Gestisci le impostazioni del tuo account', profilePicture: 'Immagine del Profilo',
		backgroundImage: 'Immagine di Sfondo', profileInformation: 'Informazioni Profilo',
		changeEmail: 'Cambia Email', changePassword: 'Cambia Password', username: 'Nome Utente',
		aboutMe: 'Su di Me', currentEmail: 'Email Attuale', newEmail: 'Nuova Email',
		confirmEmail: 'Conferma Email', currentPassword: 'Password Attuale',
		newPassword: 'Nuova Password', confirmPassword: 'Conferma Password',
		selectImage: 'Seleziona Immagine', selectBackground: 'Seleziona Sfondo',
		resetToDefault: 'Ripristina Predefinito', saveProfile: 'Salva Profilo',
		updateEmail: 'Aggiorna Email', updatePassword: 'Aggiorna Password',
		usernamePlaceholder: 'Il tuo nome utente', aboutMePlaceholder: 'Raccontaci qualcosa di te...',
		newEmailPlaceholder: 'nuova-email@esempio.it', currentPasswordPlaceholder: 'La tua password attuale',
		newPasswordPlaceholder: 'Nuova password (min. 6 caratteri)', confirmPasswordPlaceholder: 'Ripeti password',
		profileLoadError: 'Errore nel caricamento dei dati del profilo', pleaseSelectImage: 'Seleziona un\'immagine',
		imageTooLarge: 'L\'immagine non deve essere più grande di 5MB', backgroundImageTooLarge: 'L\'immagine non deve essere più grande di 10MB',
		profileImageUpdated: 'Immagine del profilo aggiornata con successo', profileImageError: 'Errore nel caricamento dell\'immagine del profilo',
		backgroundImageUpdated: 'Immagine di sfondo aggiornata con successo', backgroundImageError: 'Errore nel caricamento dell\'immagine di sfondo',
		emailsDontMatch: 'Gli indirizzi email non corrispondono', emailUpdateSuccess: 'Email aggiornata. Conferma la tua nuova email.',
		emailUpdateError: 'Errore nell\'aggiornamento dell\'email', passwordsDontMatch: 'Le password non corrispondono',
		passwordTooShort: 'La password deve essere di almeno 6 caratteri', passwordUpdateSuccess: 'Password aggiornata con successo',
		passwordUpdateError: 'Errore nell\'aggiornamento della password', profileUpdateSuccess: 'Profilo aggiornato con successo',
		profileUpdateError: 'Errore nell\'aggiornamento del profilo', backgroundReset: 'Sfondo ripristinato',
		backgroundResetError: 'Errore nel ripristino dello sfondo'
	}
};

export const translations = derived(language, ($language) => {
	const lang = $language || initialLanguage;
	return translationsData[lang] || translationsData.en;
});
