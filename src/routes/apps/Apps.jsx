// ─── App Store ───
// der simulierte App Store — zeigt Apps die man "herunterladen" kann
// simuliert den Download mit einer Fortschritts-Animation
// installierte Apps werden ans Dock gepinnt und können von hier geöffnet werden
import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Apps.css';
import { useTranslation } from '../../i18n/LanguageContext';

import Browser from './Browser';
import About from './About';
import Changelog from './Changelog';
import Galerie from './Galerie';
import Impressum from './Impressum';
import Agb from './AGB';
import Info from './Info';
import Datenschutz from './Datenschutz';
import Model from './Model';
import CookiesInfo from './Cookies-info';
import Settings from './settings/Settings';
import Description from './Description';

// Konfigurationswerte für den App Store
const CFG = {
  iconBase: '/icons/',       // Pfad zu den App-Icons
  fallbackIcon: 'fallback.png', // wird angezeigt wenn ein Icon fehlt
  cardMinWidth: 320,         // minimale Breite einer App-Karte im Grid
};

// Icon-URL berechnen — unterstützt verschiedene Formate
// das Icon kann eine volle URL, ein Pfad mit / oder nur ein Dateiname sein
function iconUrl(icon) {
  const s = (icon || '').trim();
  if (!s) return CFG.iconBase + CFG.fallbackIcon;
  if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) return s;
  if (s.startsWith('/')) return s;
  return CFG.iconBase + s.replace(/^\.\//, '');
}

// alle verfügbaren Apps im Store
// jede hat ID, Name, Icon, Komponente, Übersetzungs-Keys und Standard-Fenstergröße
const APP_LIST = [
  { id: 101, name: 'Info',        icon: 'info.webp',        component: Info,        subtitleKey: 'app_info_sub',        descKey: 'app_info_desc',        developer: 'System', version: '1.0.0',    width: 720, height: 580 },
  { id: 102, name: 'About',       icon: 'about.webp',       component: About,       subtitleKey: 'app_about_sub',       descKey: 'app_about_desc',       developer: 'System', version: '111.0.2g', width: 740, height: 560 },
  { id: 103, name: '3D-Modell',   icon: 'model.webp',       component: Model,       subtitleKey: 'app_model_sub',       descKey: 'app_model_desc',       developer: 'System', version: '1.0.0',    width: 520, height: 760 },
  { id: 104, name: 'Description', icon: 'docker.png',       component: Description, subtitleKey: 'app_description_sub', descKey: 'app_description_desc', developer: 'System', version: '1.0.0',    width: 720, height: 560 },
  { id: 105, name: 'Galerie',     icon: 'fotos.webp',       component: Galerie,     subtitleKey: 'app_galerie_sub',     descKey: 'app_galerie_desc',     developer: 'System', version: '8.0.0',    width: 720, height: 560 },
  { id: 106, name: 'Changelog',   icon: 'changelog.webp',   component: Changelog,   subtitleKey: 'app_changelog_sub',   descKey: 'app_changelog_desc',   developer: 'System', version: '9.4.2',    width: 640, height: 480 },
  { id: 107, name: 'Datenschutz', icon: 'datenschutz.webp', component: Datenschutz, subtitleKey: 'app_datenschutz_sub', descKey: 'app_datenschutz_desc', developer: 'System', version: '1.20b.0',  width: 720, height: 560 },
  { id: 108, name: 'Impressum',   icon: 'impressum.webp',   component: Impressum,   subtitleKey: 'app_impressum_sub',   descKey: 'app_impressum_desc',   developer: 'System', version: '21.0.0',   width: 720, height: 560 },
  { id: 109, name: 'AGB',         icon: 'agb.webp',         component: Agb,         subtitleKey: 'app_agb_sub',         descKey: 'app_agb_desc',         developer: 'System', version: '1.0.0',    width: 720, height: 560 },
  { id: 110, name: 'Cookies',     icon: 'cookies.png',      component: CookiesInfo, subtitleKey: 'app_cookies_sub',     descKey: 'app_cookies_desc',     developer: 'System', version: '1.0.1',    width: 720, height: 560 },
];

// installierte Apps in localStorage speichern damit sie nach Neuladen noch da sind
const INSTALLED_KEY = 'appstore_installed_v1';

function loadInstalled() {
  try {
    const raw = localStorage.getItem(INSTALLED_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {  }
  return new Set();
}

function saveInstalled(set) {
  localStorage.setItem(INSTALLED_KEY, JSON.stringify([...set]));
}

export default function Apps({ onOpenApp }) {
  const t = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [installed, setInstalled] = useState(() => loadInstalled());
  const [downloading, setDownloading] = useState(new Set());
  const [downloadProgress, setDownloadProgress] = useState({});
  const [loading, setLoading] = useState(new Set());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    saveInstalled(installed);
  }, [installed]);

  const apps = APP_LIST.map((a) => ({
    ...a,
    icon: iconUrl(a.icon),
    subtitle: t(a.subtitleKey),
    description: t(a.descKey),
    category: t('app_category_system'),
  }));

  const filteredApps = searchQuery.trim() === ''
    ? apps
    : apps.filter((a) => {
        const q = searchQuery.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q) ||
          (a.description ?? '').toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
      });

  // App-Download simulieren mit Fortschritts-Animation
  // dauert etwa 2-3 Sekunden, dann als installiert markieren und ans Dock pinnen
  const simulateDownload = useCallback((app) => {
    setDownloading((prev) => new Set(prev).add(app.id));
    setDownloadProgress((prev) => ({ ...prev, [app.id]: 0 }));

    const duration = 1800 + Math.random() * 1200;
    const start = performance.now();

    function step() {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setDownloadProgress((prev) => ({ ...prev, [app.id]: pct }));
      if (pct < 100) {
        requestAnimationFrame(step);
      } else {
        setDownloading((prev) => { const s = new Set(prev); s.delete(app.id); return s; });
        setDownloadProgress((prev) => { const p = { ...prev }; delete p[app.id]; return p; });
        setInstalled((prev) => new Set(prev).add(app.id));

        if (onOpenApp) {
          const original = APP_LIST.find((a) => a.id === app.id);
          if (original) {
            onOpenApp({
              id: original.id,
              name: original.name,
              icon: iconUrl(original.icon),
              component: original.component,
              width: original.width,
              height: original.height,
              pinOnly: true,
            });
          }
        }
      }
    }
    requestAnimationFrame(step);
  }, [onOpenApp]);

  const openApp = useCallback((app) => {
    setLoading((prev) => new Set(prev).add(app.id));
    setInstalled((prev) => new Set(prev).add(app.id));

    if (onOpenApp) {
      const original = APP_LIST.find((a) => a.id === app.id);
      if (original) {
        onOpenApp({
          id: original.id,
          name: original.name,
          icon: iconUrl(original.icon),
          component: original.component,
          width: original.width,
          height: original.height,
        });
      }
    }

    setTimeout(() => {
      setLoading((prev) => { const s = new Set(prev); s.delete(app.id); return s; });
    }, 100);
  }, [onOpenApp]);

  const handleAppAction = useCallback((app) => {
    if (downloading.has(app.id) || loading.has(app.id)) return;
    if (installed.has(app.id)) {
      openApp(app);
    } else {
      simulateDownload(app);
    }
  }, [downloading, loading, installed, openApp, simulateDownload]);

  return (
    <div className="app-store-glass">
      <div className="app-store-search-bar">
        <svg className="app-store-search-icon" viewBox="0 0 20 20">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          className="app-store-search-input"
          type="search"
          placeholder={t('apps_search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        {searchQuery.length > 0 && (
          <button className="app-store-search-clear" onClick={() => setSearchQuery('')} aria-label={t('search_placeholder')}>
            <svg viewBox="0 0 20 20">
              <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="app-store-scroller" style={{ '--min': `${CFG.cardMinWidth}px` }}>
        {filteredApps.length === 0 ? (
          <div className="app-store-empty">
            <p>{t('no_results')}: „{searchQuery}"</p>
          </div>
        ) : (
          filteredApps.map((app) => {
            const isDown = downloading.has(app.id);
            const isLoad = loading.has(app.id);
            const isInst = installed.has(app.id);
            const pct = downloadProgress[app.id] ?? 0;
            const r = 11;
            const circ = 2 * Math.PI * r;
            const offset = circ * (1 - pct / 100);

            return (
              <div
                key={app.id}
                className={`app-store-card${isDown || isLoad ? ' loading' : ''}${errors[app.id] ? ' error' : ''}`}
                onDoubleClick={() => handleAppAction(app)}
              >
                <div className="app-store-top">
                  <img className="app-store-icon" src={app.icon} alt={app.name} loading="lazy" />
                  <div className="app-store-meta">
                    <div className="app-store-name">{app.name}</div>
                    <div className="app-store-sub">{app.subtitle}</div>
                  </div>
                  <button
                    className={`app-store-btn${isDown ? ' btn-downloading' : ''}${!isDown && !isLoad && isInst ? ' btn-installed' : ''}`}
                    disabled={isDown || isLoad}
                    onClick={(e) => { e.stopPropagation(); handleAppAction(app); }}
                  >
                    {isDown ? (
                      <svg className="progress-ring" viewBox="0 0 32 32">
                        <circle className="ring-track" cx="16" cy="16" r={r} />
                        <circle className="ring-fill" cx="16" cy="16" r={r} style={{ strokeDasharray: circ, strokeDashoffset: offset }} />
                      </svg>
                    ) : isLoad ? (
                      <span className="spinner" />
                    ) : isInst ? (
                      t('apps_open')
                    ) : (
                      t('apps_install')
                    )}
                  </button>
                </div>
                <div className="app-store-desc">{app.description ?? '—'}</div>
                <div className="app-store-bot">
                  <span className="app-store-pill">{app.category}</span>
                  <span className="app-store-ver">v{app.version}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
