// ─── Main App Component ───
// this is the root of the app — it sets up routing and the language system
// basically it decides which page to show based on the URL

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import DesktopPage from './routes/desktop/DesktopPage';
import ErrorPage from './routes/ErrorPage';
import { LanguageProvider } from './i18n/LanguageContext'; // wraps app with language support
import './global.css'; // global styles for the whole app

// this is a guard component — it checks if the user accepted cookies
// if not, it sends them back to the login page
// we do this because the desktop needs cookies to work properly
function RequireCookieConsent({ children }) {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return <Navigate to="/" replace />; // no consent? back to login
  return children; // all good, show the page
}

// the main app component — wraps everything in language provider and router
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* login page is the first thing the user sees */}
          <Route path="/" element={<LoginPage />} />

          {/* desktop page is protected — needs cookie consent first */}
          <Route path="/desktop" element={<RequireCookieConsent><DesktopPage /></RequireCookieConsent>} />

          {/* anything else shows the error page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
