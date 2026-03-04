import React from 'react';
import Header from './Header';
import Dock from './Dock';
import DesktopMarquee from './DesktopMarquee';
import { AppStoreProvider } from '../../lib/appStore';
import { LastOpenedProvider } from '../../lib/lastOpened';
import './DesktopPage.css';

export default function DesktopPage() {
  const handleOpenApp = (appName) => {
  };

  return (
    <AppStoreProvider>
      <LastOpenedProvider>
        <DesktopMarquee className="desktop">
          <Header onOpenApp={handleOpenApp} />
          <Dock onOpenApp={handleOpenApp} />
        </DesktopMarquee>
      </LastOpenedProvider>
    </AppStoreProvider>
  );
}
