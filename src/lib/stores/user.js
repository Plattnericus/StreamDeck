import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// User Store für globale Benutzerdaten
export const userStore = writable(null);
export const profileImageStore = writable('/default-profile.png');
export const backgroundImageStore = writable('/default-background.png');

// Funktion zum Aktualisieren aller Stores
export function updateUserData(userData) {
    if (!userData) return;
    
    userStore.set(userData.user || null);
    profileImageStore.set(userData.profilePicture || '/default-profile.png');
    backgroundImageStore.set(userData.backgroundImage || '/default-background.png');
    
    // Background Image sofort anwenden
    if (browser) {
        document.documentElement.style.setProperty('--background-image', `url('${userData.backgroundImage || '/default-background.png'}')`);
        document.body.style.backgroundImage = `url('${userData.backgroundImage || '/default-background.png'}')`;
    }
}

// Automatische Updates alle 30 Sekunden
if (browser) {
    setInterval(async () => {
        try {
            const res = await fetch('http://localhost:3000/api/user/profile', {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                updateUserData(data);
            }
        } catch (error) {
            console.log('Auto-update failed:', error);
        }
    }, 30000);
}