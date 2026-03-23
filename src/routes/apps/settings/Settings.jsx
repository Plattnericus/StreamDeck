import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Settings.css';
import { loadSettings, saveSettings, resetAppSettings, DEFAULT_SETTINGS, DEFAULT_CC, ACCENT_COLORS, broadcastSettingsChange } from './settingsStore';
import { useTranslation } from '../../../i18n/LanguageContext';
import { IosRow } from './primitives';
import NetworkSection from './sections/NetworkSection';
import AppearanceSection from './sections/AppearanceSection';
import SoundSection from './sections/SoundSection';
import GeneralSection from './sections/GeneralSection';
import NotificationsSection from './sections/NotificationsSection';
import PrivacySection from './sections/PrivacySection';
import AboutSection from './sections/AboutSection';
import { WifiIcon, SunIcon, VolumeIcon, GlobeIcon, BellIcon, ShieldIcon, InfoIcon } from './icons';

const SECTION_NAV = [
  { id: 'network',       icon: <WifiIcon />,   iconClass: 'blue',   labelKey: 'nav_network' },
  { id: 'appearance',    icon: <SunIcon />,    iconClass: 'purple', labelKey: 'nav_appearance' },
  { id: 'sound',         icon: <VolumeIcon />, iconClass: 'orange', labelKey: 'nav_sound' },
  { id: 'general',       icon: <GlobeIcon />,  iconClass: 'blue',   labelKey: 'nav_general' },
  { id: 'notifications', icon: <BellIcon />,   iconClass: 'red',    labelKey: 'nav_notifications' },
  { id: 'privacy',       icon: <ShieldIcon />, iconClass: 'gray',   labelKey: 'nav_privacy' },
  { id: 'about',         icon: <InfoIcon />,   iconClass: 'blue',   labelKey: 'nav_about' },
];

const SEARCHABLE_ROWS = [
  { sectionId: 'network',       labelKey: 'wifi' },
  { sectionId: 'network',       labelKey: 'bluetooth' },
  { sectionId: 'network',       labelKey: 'airplane' },
  { sectionId: 'network',       labelKey: 'cellular' },
  { sectionId: 'network',       labelKey: 'vpn' },
  { sectionId: 'appearance',    labelKey: 'dark_mode' },
  { sectionId: 'appearance',    labelKey: 'brightness' },
  { sectionId: 'appearance',    labelKey: 'accent_color' },
  { sectionId: 'appearance',    labelKey: 'font_size' },
  { sectionId: 'appearance',    labelKey: 'reduce_transparency' },
  { sectionId: 'sound',         labelKey: 'volume' },
  { sectionId: 'sound',         labelKey: 'sound_effects' },
  { sectionId: 'sound',         labelKey: 'startup_sound' },
  { sectionId: 'sound',         labelKey: 'mute' },
  { sectionId: 'general',       labelKey: 'language' },
  { sectionId: 'general',       labelKey: 'clock_24h' },
  { sectionId: 'general',       labelKey: 'show_seconds' },
  { sectionId: 'general',       labelKey: 'date_format' },
  { sectionId: 'general',       labelKey: 'reduce_motion' },
  { sectionId: 'general',       labelKey: 'auto_lock' },
  { sectionId: 'general',       labelKey: 'reset_settings' },
  { sectionId: 'notifications',  labelKey: 'notifications' },
  { sectionId: 'notifications',  labelKey: 'app_badges' },
  { sectionId: 'notifications',  labelKey: 'notification_sound' },
  { sectionId: 'notifications',  labelKey: 'show_previews' },
  { sectionId: 'notifications',  labelKey: 'do_not_disturb' },
  { sectionId: 'privacy',        labelKey: 'cookie_consent' },
  { sectionId: 'privacy',        labelKey: 'camera' },
  { sectionId: 'privacy',        labelKey: 'microphone' },
  { sectionId: 'privacy',        labelKey: 'analytics' },
  { sectionId: 'privacy',        labelKey: 'delete_all' },
  { sectionId: 'about',          labelKey: 'version' },
  { sectionId: 'about',          labelKey: 'developer' },
  { sectionId: 'about',          labelKey: 'license' },
  { sectionId: 'about',          labelKey: 'hardware' },
];

function ConfirmDialog({ message, onConfirm, onCancel, cancelLabel, confirmLabel, danger }) {
  return (
    <div className="st-confirm-overlay" onClick={onCancel}>
      <div className="st-confirm-box" onClick={e => e.stopPropagation()}>
        <p className="st-confirm-msg">{message}</p>
        <div className="st-confirm-btns">
          <button className="st-confirm-btn cancel" onClick={onCancel}>{cancelLabel}</button>
          <button className={`st-confirm-btn ${danger ? 'confirm-danger' : 'confirm-ok'}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(() => loadSettings());
  const [activePage, setActivePage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cookieConsent, setCookieConsent] = useState(() => {
    try { return localStorage.getItem('cookie-consent'); } catch { return null; }
  });
  const [confirm, setConfirm] = useState(null);
  const mounted = useRef(false);
  const searchBarRef = useRef(null);
  const dispMapRef = useRef(null);
  const specularRef = useRef(null);

  const t = useTranslation();
  const isSearching = searchQuery.trim().length > 0;

  const visibleSections = useMemo(() => {
    if (!isSearching) return SECTION_NAV.map(s => s.id);
    const q = searchQuery.toLowerCase().trim();
    const matched = SEARCHABLE_ROWS.filter(r => t(r.labelKey).toLowerCase().includes(q));
    const seen = new Set();
    const ids = [];
    matched.forEach(r => {
      if (!seen.has(r.sectionId)) { seen.add(r.sectionId); ids.push(r.sectionId); }
    });
    return ids;
  }, [searchQuery, t]);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveSettings(settings);
    broadcastSettingsChange();
  }, [settings]);

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', settings.darkMode === true);
  }, [settings.darkMode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--brightness', `${settings.brightness}%`);
  }, [settings.brightness]);

  useEffect(() => {
    const color = ACCENT_COLORS[settings.accentColor] ?? ACCENT_COLORS.blue;
    document.documentElement.style.setProperty('--accent-color', color);
  }, [settings.accentColor]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', !!settings.reduceMotion);
  }, [settings.reduceMotion]);

  useEffect(() => {
    document.documentElement.lang = settings.language;
  }, [settings.language]);

  useEffect(() => {
    document.documentElement.classList.remove('font-small', 'font-large');
    if (settings.fontSize === 'small') document.documentElement.classList.add('font-small');
    if (settings.fontSize === 'large') document.documentElement.classList.add('font-large');
  }, [settings.fontSize]);

  function update(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  function toggle(key) {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function batch(updates) {
    setSettings(prev => ({ ...prev, ...updates }));
  }

  function showConfirm(message, onConfirm, danger = false) {
    setConfirm({ message, onConfirm, danger });
  }

  function handleReset() {
    showConfirm(t('reset_confirm'), () => {
      resetAppSettings();
      setSettings({ ...DEFAULT_SETTINGS, ...DEFAULT_CC });
      setConfirm(null);
    }, false);
  }

  function handleResetCookies() {
    try { localStorage.removeItem('cookie-consent'); } catch {}
    setCookieConsent(null);
  }

  function handleDeleteAll() {
    showConfirm(t('delete_confirm'), () => {
      try { localStorage.clear(); } catch {}
      window.location.reload();
    }, true);
  }

  function handleMouseMove(e) {
    const el = searchBarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (dispMapRef.current) {
      dispMapRef.current.setAttribute('scale', Math.min((x / rect.width) * 100, (y / rect.height) * 100));
    }
    if (specularRef.current) {
      specularRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 60%)`;
    }
  }

  function handleMouseLeave() {
    if (dispMapRef.current) dispMapRef.current.setAttribute('scale', '77');
    if (specularRef.current) specularRef.current.style.background = 'none';
  }

  const sectionProps = { settings, update, toggle, batch };
  const fontClass = settings.fontSize === 'small' ? 'font-small' : settings.fontSize === 'large' ? 'font-large' : '';

  function renderSection(id) {
    switch (id) {
      case 'network':       return <NetworkSection key="network" {...sectionProps} />;
      case 'appearance':    return <AppearanceSection key="appearance" {...sectionProps} />;
      case 'sound':         return <SoundSection key="sound" {...sectionProps} />;
      case 'general':       return <GeneralSection key="general" {...sectionProps} onReset={handleReset} />;
      case 'notifications': return <NotificationsSection key="notifications" {...sectionProps} />;
      case 'privacy':       return <PrivacySection key="privacy" {...sectionProps} cookieConsent={cookieConsent} onResetCookies={handleResetCookies} onDeleteAll={handleDeleteAll} />;
      case 'about':         return <AboutSection key="about" />;
      default:              return null;
    }
  }

  const svgDefs = (
    <svg style={{ display: 'none' }}>
      <defs>
        <filter id="st-glass-dist">
          <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
          <feDisplacementMap ref={dispMapRef} in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </defs>
    </svg>
  );

  const confirmDialog = confirm && (
    <ConfirmDialog
      message={confirm.message}
      onConfirm={confirm.onConfirm}
      onCancel={() => setConfirm(null)}
      cancelLabel={t('cancel')}
      confirmLabel="OK"
      danger={confirm.danger}
    />
  );

  if (activePage) {
    const section = SECTION_NAV.find(s => s.id === activePage);
    return (
      <>
        {svgDefs}
        <div className={`st-root ${fontClass}`}>
          {confirmDialog}
          <div className="st-sub-header">
            <button className="st-back-btn" onClick={() => setActivePage(null)}>
              <svg viewBox="0 0 24 24" width="10" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              {t('settings')}
            </button>
            <div className="st-sub-title">{section ? t(section.labelKey) : ''}</div>
          </div>
          <div className="st-scroll">
            {renderSection(activePage)}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {svgDefs}
      <div className={`st-root ${fontClass}`}>
        {confirmDialog}
        <div className="st-page-title">{t('settings')}</div>

        <div className="st-scroll">
          <div className="st-profile-card" style={{ margin: '0 16px 16px' }}>
            <div className="st-profile-row">
              <div className="st-profile-avatar">FP</div>
              <div className="st-profile-info">
                <div className="st-profile-name">Felix Plattner</div>
                <div className="st-profile-sub">{t('profile_sub')}</div>
              </div>
              <span className="st-ios-chevron" />
            </div>
          </div>

          {isSearching && visibleSections.length === 0 ? (
            <div className="st-ios-empty">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>{t('no_results')}</p>
            </div>
          ) : isSearching ? (
            visibleSections.map(id => {
              const sec = SECTION_NAV.find(s => s.id === id);
              return (
                <React.Fragment key={id}>
                  <div className="st-search-section-label">{sec ? t(sec.labelKey) : id}</div>
                  {renderSection(id)}
                </React.Fragment>
              );
            })
          ) : (
            <div className="st-ios-group">
              <div className="st-ios-card">
                {SECTION_NAV.map(s => (
                  <IosRow
                    key={s.id}
                    icon={s.icon}
                    iconClass={s.iconClass}
                    label={t(s.labelKey)}
                    chevron
                    onClick={() => setActivePage(s.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="st-search-fixed">
          <div
            className="st-glass-search"
            ref={searchBarRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="st-glass-filter" />
            <div className="st-glass-overlay" />
            <div className="st-glass-specular" ref={specularRef} />
            <div className="st-glass-content">
              <svg className="st-search-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                className="st-search-input"
                type="search"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
              {isSearching && (
                <button className="st-search-clear" onClick={() => setSearchQuery('')} aria-label="clear">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
