// ─── Desktop Page ───
// this is the main desktop screen — like the macOS desktop
// it shows the header (menu bar), dock, and handles the drag-selection box
// on mobile devices, it shows a message that says "please use a desktop"

import React from 'react';
import Header from './Header';
import Dock from './Dock';
import DesktopMarquee from './DesktopMarquee'; // the drag-selection box on the desktop
import { AppStoreProvider } from '../../lib/appStore'; // manages which apps are open
import { LastOpenedProvider } from '../../lib/lastOpened'; // tracks recently opened apps
import './DesktopPage.css';
import { useTranslation } from '../../i18n/LanguageContext';

export default function DesktopPage() {
  const t = useTranslation(); // get the translation function

  // this handler gets passed down to Header and Dock
  // right now its empty because app opening is handled inside Dock
  const handleOpenApp = (appName) => {
  };

  return (
    // wrap everything in providers so all child components can access app state
    <AppStoreProvider>
      <LastOpenedProvider>
        {/* the actual desktop — DesktopMarquee adds the drag-selection box */}
        <DesktopMarquee className="desktop">
          <Header onOpenApp={handleOpenApp} />
          <Dock onOpenApp={handleOpenApp} />
        </DesktopMarquee>

        {/* mobile users see this instead of the desktop */}
        {/* we show a friendly message telling them to use a computer */}
        <div className="mobile-lockscreen">
          <div className="mobile-lockscreen-content">
            {/* a simple toggle switch icon */}
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
