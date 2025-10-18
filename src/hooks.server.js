import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
  const authCookie = event.cookies.get('auth'); // Name des Cookies anpassen

  // Wenn eingeloggt und auf /auth, weiterleiten zu /settings
  if (authCookie && event.url.pathname === '/auth') {
    throw redirect(303, '/settings');
  }

  // Wenn nicht eingeloggt und auf geschützte Seite, weiterleiten zu /auth
  const protectedRoutes = ['/settings']; // Hier weitere Routen ergänzen
  if (!authCookie && protectedRoutes.includes(event.url.pathname)) {
    throw redirect(303, '/auth');
  }

  return resolve(event);
}