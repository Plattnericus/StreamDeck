// ─── Haupt-App-Komponente ───
// die Wurzel der App — richtet Routing und Sprachsystem ein
// entscheidet welche Seite anhand der URL angezeigt wird

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import DesktopPage from './routes/desktop/DesktopPage';
import ErrorPage from './routes/ErrorPage';
import { LanguageProvider } from './i18n/LanguageContext'; // Sprachkontext für die ganze App
import './global.css'; // globale Styles

// Guard-Komponente — prüft ob Cookies akzeptiert wurden
// falls nicht: zurück zur Login-Seite
function RequireCookieConsent({ children }) {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return <Navigate to="/" replace />; // keine Zustimmung? zurück zum Login
  return children;
}

// Haupt-App — alles in LanguageProvider und Router eingewickelt
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Login-Seite ist das erste was der Nutzer sieht */}
          <Route path="/" element={<LoginPage />} />

          {/* Desktop ist geschützt — Cookie-Zustimmung nötig */}
          <Route path="/desktop" element={<RequireCookieConsent><DesktopPage /></RequireCookieConsent>} />

          {/* alles andere zeigt die Fehlerseite */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
