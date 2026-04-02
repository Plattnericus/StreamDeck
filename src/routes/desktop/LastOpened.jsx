// ─── Zuletzt geöffnet ───
// zeigt eine Liste zuletzt geöffneter Apps mit Zeitangabe wie "vor 5m" oder "vor 2h"
// nutzt die Spracheinstellung für die richtige Zeitformatierung

import React from 'react';
import './LastOpened.css';
import { useTranslation, useLanguage } from '../../i18n/LanguageContext';

// Sprachcodes auf Locale-Strings mappen
const LOCALE_MAP = { de: 'de-DE', en: 'en-US', it: 'it-IT' };

export default function LastOpened({ lastOpened = [] }) {
  const t = useTranslation();
  const lang = useLanguage();
  const locale = LOCALE_MAP[lang] ?? 'de-DE';

  // Timestamp in eine lesbare Zeitangabe umwandeln wie "vor 3m", "vor 2h", "vor 5T"
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    // weniger als eine Minute
    if (minutes < 1) return t('time_just_now');

    // weniger als eine Stunde
    if (minutes < 60) return lang === 'de' ? `vor ${minutes}m` : lang === 'it' ? `${minutes}m fa` : `${minutes}m ago`;

    // weniger als ein Tag
    if (hours < 24) return lang === 'de' ? `vor ${hours}h` : lang === 'it' ? `${hours}h fa` : `${hours}h ago`;

    // weniger als eine Woche
    if (days < 7) return lang === 'de' ? `vor ${days}T` : lang === 'it' ? `${days}g fa` : `${days}d ago`;

    // älter als eine Woche — echtes Datum zeigen
    return date.toLocaleDateString(locale);
  }

  return (
    <div className="last-opened">
      {/* Kopfzeile mit Titel */}
      <div className="lo-header">
        <h3>{t('recently_opened')}</h3>
      </div>

      {/* Hinweis wenn noch keine Apps geöffnet wurden */}
      {lastOpened.length === 0 ? (
        <div className="empty">{t('no_recently_opened')}</div>
      ) : (
        /* Liste der zuletzt geöffneten Apps */
        <div className="list">
          {lastOpened.map((app) => (
            <div className="lo-item" key={app.id}>
              <img src={app.icon} alt={app.name} className="lo-icon" />
              <div className="lo-info">
                <div className="lo-name">{app.name}</div>
                <div className="lo-meta">
                  <span className="lo-time">{formatDate(app.timestamp)}</span>
                  <span className="lo-count">({app.openCount}x)</span> {/* wie oft geöffnet */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
