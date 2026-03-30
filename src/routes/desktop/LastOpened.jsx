// list of apps you opend recently with "5m ago" and stuff
import React from 'react';
import './LastOpened.css';
import { useTranslation, useLanguage } from '../../i18n/LanguageContext';

const LOCALE_MAP = { de: 'de-DE', en: 'en-US', it: 'it-IT' };

export default function LastOpened({ lastOpened = [] }) {
  const t = useTranslation();
  const lang = useLanguage();
  const locale = LOCALE_MAP[lang] ?? 'de-DE';

  // makes "3 min ago" from a timestamp
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return t('time_just_now');
    if (minutes < 60) return lang === 'de' ? `vor ${minutes}m` : lang === 'it' ? `${minutes}m fa` : `${minutes}m ago`;
    if (hours < 24) return lang === 'de' ? `vor ${hours}h` : lang === 'it' ? `${hours}h fa` : `${hours}h ago`;
    if (days < 7) return lang === 'de' ? `vor ${days}T` : lang === 'it' ? `${days}g fa` : `${days}d ago`;
    return date.toLocaleDateString(locale);
  }

  return (
    <div className="last-opened">
      <div className="lo-header">
        <h3>{t('recently_opened')}</h3>
      </div>
      {lastOpened.length === 0 ? (
        <div className="empty">{t('no_recently_opened')}</div>
      ) : (
        <div className="list">
          {lastOpened.map((app) => (
            <div className="lo-item" key={app.id}>
              <img src={app.icon} alt={app.name} className="lo-icon" />
              <div className="lo-info">
                <div className="lo-name">{app.name}</div>
                <div className="lo-meta">
                  <span className="lo-time">{formatDate(app.timestamp)}</span>
                  <span className="lo-count">({app.openCount}x)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
