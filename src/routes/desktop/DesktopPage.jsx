import React from 'react';
import Header from './Header';
import Dock from './Dock';
import DesktopMarquee from './DesktopMarquee';
import { AppStoreProvider } from '../../lib/appStore';
import { LastOpenedProvider } from '../../lib/lastOpened';
import './DesktopPage.css';
import { useTranslation } from '../../i18n/LanguageContext';

export default function DesktopPage() {
  const t = useTranslation();
  const handleOpenApp = (appName) => {
  };

  return (
    <AppStoreProvider>
      <LastOpenedProvider>
        <DesktopMarquee className="desktop">
          <Header onOpenApp={handleOpenApp} />
          <Dock onOpenApp={handleOpenApp} />
        </DesktopMarquee>

        {}
        <div className="mobile-lockscreen">
          <div className="mobile-lockscreen-content">
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
