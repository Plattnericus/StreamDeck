import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import DesktopPage from './routes/desktop/DesktopPage';
import ErrorPage from './routes/ErrorPage';
import { LanguageProvider } from './i18n/LanguageContext';
import './global.css';

function RequireCookieConsent({ children }) {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/desktop" element={<RequireCookieConsent><DesktopPage /></RequireCookieConsent>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
