import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import DesktopPage from './routes/desktop/DesktopPage';
import ErrorPage from './routes/ErrorPage';
import './global.css';

function RequireCookieConsent({ children }) {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return <Navigate to="/" replace />;
  return children;

      useSEO({
      title: null,
      description: 'Stream Deck DIY mit React im macOS Tahoe Liquid Glass Design. Plugins bauen mit Node.js — open source Dokumentation.',
      path: '/',
    })
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/desktop" element={<RequireCookieConsent><DesktopPage /></RequireCookieConsent>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
