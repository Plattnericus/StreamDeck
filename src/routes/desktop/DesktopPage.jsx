// ─── Desktop-Seite ───
// der Hauptbildschirm des Desktops — wie der macOS Desktop
// zeigt Menüleiste, Dock und den Auswahlrahmen beim Ziehen
// auf Mobilgeräten kommt stattdessen eine Hinweismeldung

import React from 'react';
import Header from './Header';
import Dock from './Dock';
import DesktopMarquee from './DesktopMarquee'; // Auswahlrahmen auf dem Desktop
import { AppStoreProvider } from '../../lib/appStore'; // verwaltet welche Apps offen sind
import { LastOpenedProvider } from '../../lib/lastOpened'; // merkt sich zuletzt geöffnete Apps
import './DesktopPage.css';
import { useTranslation } from '../../i18n/LanguageContext';

export default function DesktopPage() {
  const t = useTranslation();

  // wird an Header und Dock weitergegeben
  // aktuell leer, da das App-Öffnen direkt im Dock passiert
  const handleOpenApp = (appName) => {
  };

  return (
    // alles in Provider einwickeln damit Kind-Komponenten auf den App-State zugreifen können
    <AppStoreProvider>
      <LastOpenedProvider>
        {/* der eigentliche Desktop — DesktopMarquee fügt den Auswahlrahmen hinzu */}
        <DesktopMarquee className="desktop">
          <Header onOpenApp={handleOpenApp} />
          <Dock onOpenApp={handleOpenApp} />
        </DesktopMarquee>

        {/* auf Mobilgeräten kommt diese Meldung statt dem Desktop */}
        <div className="mobile-lockscreen">
          <div className="mobile-lockscreen-content">
            {/* einfaches Toggle-Icon als Symbolbild */}
            <div className="mobile-lockscreen-icon">
              <svg width="72" height="72" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {}
                <rect x="40" y="60" width="240" height="90" rx="45" fill="none" stroke="#fff" strokeWidth="22"/>
                <circle cx="90" cy="105" r="30" fill="none" stroke="#fff" strokeWidth="22"/>
                {}
                <rect x="40" y="170" width="240" height="90" rx="45" fill="#fff"/>
                <circle cx="230" cy="215" r="30" fill="none" stroke="#fff" strokeWidth="22"/>
              </svg>
            </div>
            <h1 className="mobile-lockscreen-title">{t('desktop_only')}</h1>
            <p className="mobile-lockscreen-text">{t('mobile_not_optimized')}</p>
            <p className="mobile-lockscreen-subtext">{t('mobile_open_desktop')}</p>
          </div>
        </div>
      </LastOpenedProvider>
    </AppStoreProvider>
  );
}
