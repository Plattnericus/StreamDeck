// ─── Last Opened Panel ───
// this shows a list of recently opened apps with how long ago they were used
// like "5m ago" or "2h ago" — displayed in the Apple menu or similar place
// it uses the language settings to format the time in the right language

import React from 'react';
import './LastOpened.css';
import { useTranslation, useLanguage } from '../../i18n/LanguageContext';

// map our language codes to proper locale strings for date formatting
const LOCALE_MAP = { de: 'de-DE', en: 'en-US', it: 'it-IT' };

export default function LastOpened({ lastOpened = [] }) {
  const t = useTranslation();
  const lang = useLanguage();
  const locale = LOCALE_MAP[lang] ?? 'de-DE';

  // turns a timestamp into a human-friendly "time ago" string
  // like "3m ago", "2h ago", "5d ago" depending on how long ago it was
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    // less than a minute — "just now"
    if (minutes < 1) return t('time_just_now');

    // less than an hour — show minutes
    if (minutes < 60) return lang === 'de' ? `vor ${minutes}m` : lang === 'it' ? `${minutes}m fa` : `${minutes}m ago`;

    // less than a day — show hours
    if (hours < 24) return lang === 'de' ? `vor ${hours}h` : lang === 'it' ? `${hours}h fa` : `${hours}h ago`;

    // less than a week — show days
    if (days < 7) return lang === 'de' ? `vor ${days}T` : lang === 'it' ? `${days}g fa` : `${days}d ago`;

    // older than a week — show the actual date
    return date.toLocaleDateString(locale);
  }

  return (
    <div className="last-opened">
      {/* header with the title */}
      <div className="lo-header">
        <h3>{t('recently_opened')}</h3>
      </div>

      {/* show empty message if no apps were opened yet */}
      {lastOpened.length === 0 ? (
        <div className="empty">{t('no_recently_opened')}</div>
      ) : (
        /* list of recently opened apps */
        <div className="list">
          {lastOpened.map((app) => (
            <div className="lo-item" key={app.id}>
              <img src={app.icon} alt={app.name} className="lo-icon" />
              <div className="lo-info">
                <div className="lo-name">{app.name}</div>
                <div className="lo-meta">
                  <span className="lo-time">{formatDate(app.timestamp)}</span>
                  <span className="lo-count">({app.openCount}x)</span> {/* how many times opened */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
