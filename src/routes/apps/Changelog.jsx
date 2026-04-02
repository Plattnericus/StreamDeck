// ─── Changelog-App ───
// zeigt das Projekt-Changelog mit Versionseinträgen und einem TO DO Bereich
// liest eine Markdown-Datei und parst sie zu gruppierten Einträgen
// aktualisiert sich alle 5 Sekunden automatisch
// unterstützt Filter: Alle, Hinzugefügt, Behoben, Aktualisiert, Entfernt, To Do
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Changelog.css';
import { useTranslation, useLanguage } from '../../i18n/LanguageContext';

// Markdown in gruppierte Daten umwandeln
function parseChangelog(raw) {
  const lines = raw.split('\n');
  const result = [];
  const todoItems = [];
  let current = null;
  let inTodo = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#{1,2}\s*TO\s*DO/i.test(trimmed)) { inTodo = true; continue; }
    const headingMatch = trimmed.match(/^#{1,2}\s+(.+)/);
    if (headingMatch && !inTodo) {
      const title = headingMatch[1].trim();
      if (title === 'Dependencies') continue;
      current = { date: title, items: [] };
      result.push(current);
      continue;
    }
    const bulletMatch = trimmed.match(/^-\s+(.+)/);
    if (bulletMatch) {
      const text = bulletMatch[1].trim();
      if (!text) continue;
      if (inTodo) todoItems.push(text);
      else if (current) current.items.push(text);
      continue;
    }
    const subMatch = line.match(/^\s+-\s+(.+)/);
    if (subMatch) {
      const text = subMatch[1].trim();
      if (!text) continue;
      if (inTodo) todoItems.push(text);
      else if (current) current.items.push(text);
    }
  }
  result.reverse();
  return { entries: result, todos: todoItems };
}

function formatDate(dateStr, locale) {
  const p = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!p) return { day: '', month: dateStr, weekday: '' };
  const d = new Date(+p[3], +p[2] - 1, +p[1]);
  return {
    day: p[1],
    month: new Intl.DateTimeFormat(locale, { month: 'short' }).format(d),
    weekday: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d),
  };
}

function isToday(dateStr) {
  const p = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!p) return false;
  const n = new Date();
  return +p[1] === n.getDate() && +p[2] === n.getMonth() + 1 && +p[3] === n.getFullYear();
}

// Typ des Eintrags bestimmen: Fix, Hinzufügen, etc.
function getType(text) {
  const l = text.toLowerCase();
  if (l.includes('fix') || l.includes('bug'))                                               return 'fix';
  if (l.includes('add') || l.includes('added') || l.includes('new') || l.includes('made')) return 'add';
  if (l.includes('delete') || l.includes('removed'))                                        return 'remove';
  if (l.includes('update') || l.includes('upgrade') || l.includes('rework') || l.includes('change')) return 'update';
  return 'default';
}

const Icon = {
  fix: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  add: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  remove: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  update: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
};

const NAV_CONFIG = [
  { key: 'all',    labelKey: 'changelog_all',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { key: 'add',    labelKey: 'changelog_added',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
  { key: 'fix',    labelKey: 'changelog_fixed',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> },
  { key: 'update', labelKey: 'changelog_updated',  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg> },
  { key: 'remove', labelKey: 'changelog_removed',  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg> },
  { key: 'todo',   labelKey: 'changelog_todo',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> },
];

export default function Changelog() {
  const [entries, setEntries] = useState([]);
  const [todos, setTodos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [filter, setFilter]   = useState('all');
  const lastHashRef           = useRef('');

  const t    = useTranslation();
  const lang = useLanguage();
  const locale = lang === 'de' ? 'de-DE' : lang === 'it' ? 'it-IT' : 'en-US';

  // Changelog-Datei laden und nur neu parsen wenn sich der Hash geändert hat
  const fetchChangelog = useCallback(async () => {
    try {
      const res = await fetch('/Changelog.md?t=' + Date.now());
      if (!res.ok) throw new Error('fetch_failed');
      const raw = await res.text();
      const buf  = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(raw));
      const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (hash === lastHashRef.current) return;
      lastHashRef.current = hash;
      const parsed = parseChangelog(raw);
      setEntries(parsed.entries);
      setTodos(parsed.todos);
      setError(null);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChangelog();
    const id = setInterval(fetchChangelog, 5000);
    return () => clearInterval(id);
  }, [fetchChangelog]);

  const allItems = entries.flatMap(e => e.items);
  const counts = {
    all:    allItems.length,
    add:    allItems.filter(i => getType(i) === 'add').length,
    fix:    allItems.filter(i => getType(i) === 'fix').length,
    update: allItems.filter(i => getType(i) === 'update').length,
    remove: allItems.filter(i => getType(i) === 'remove').length,
    todo:   todos.length,
  };

  const visibleEntries = filter === 'all' || filter === 'todo'
    ? entries
    : entries
        .map(e => ({ ...e, items: e.items.filter(item => getType(item) === filter) }))
        .filter(e => e.items.length > 0);

  if (loading) return <div className="changelog"><div className="cl-loading"><div className="cl-spinner" /></div></div>;
  if (error)   return <div className="changelog"><div className="cl-loading"><span className="cl-err">{t('changelog_error')}</span></div></div>;

  return (
    <div className="changelog">
      <div className="cl-sidebar">
        <div className="cl-sidebar-label">{t('changelog_title')}</div>

        {NAV_CONFIG.map(n => (
          <button
            key={n.key}
            className={`cl-nav-btn${filter === n.key ? ' active' : ''}`}
            onClick={() => setFilter(n.key)}
          >
            <span className="cl-nav-icon">{n.icon}</span>
            {t(n.labelKey)}
            <span className="cl-nav-count">{counts[n.key]}</span>
          </button>
        ))}

        <div className="cl-sidebar-divider" />

        <div className="cl-stat-row">
          <span className="cl-stat-key">{t('changelog_entries')}</span>
          <span className="cl-stat-val">{entries.length}</span>
        </div>
        <div className="cl-stat-row">
          <span className="cl-stat-key">{t('changelog_total')}</span>
          <span className="cl-stat-val">{counts.all}</span>
        </div>
      </div>

      <div className="cl-main">
        <div className="cl-content">
          {filter === 'todo' ? (
            todos.length === 0 ? (
              <div className="cl-empty">{t('changelog_no_todo')}</div>
            ) : (
              <div className="cl-section">
                <div className="cl-section-header">
                  <span className="cl-date-label">{t('changelog_todo')}</span>
                  <div className="cl-section-line" />
                </div>
                <div className="cl-card">
                  {todos.map((td, i) => (
                    <div key={i} className="cl-row">
                      <span className="cl-circ" />
                      <span className="cl-row-text dim">{td}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : visibleEntries.length === 0 ? (
            <div className="cl-empty">{t('changelog_no_entries')}</div>
          ) : (
            visibleEntries.map((entry, i) => {
              const fd    = formatDate(entry.date, locale);
              const today = isToday(entry.date);
              return (
                <div key={i} className="cl-section" style={{ animationDelay: `${i * 35}ms` }}>
                  <div className="cl-section-header">
                    <div className={`cl-cal${today ? ' today' : ''}`}>
                      <span className="cl-cal-d">{fd.day || '\u2014'}</span>
                      <span className="cl-cal-m">{fd.month}</span>
                    </div>
                    <span className="cl-date-label">{fd.weekday} {entry.date}</span>
                    <div className="cl-section-line" />
                    {today && <span className="cl-today-pill">{t('changelog_today')}</span>}
                  </div>
                  <div className="cl-card">
                    {entry.items.map((item, j) => {
                      const type = getType(item);
                      return (
                        <div key={j} className="cl-row">
                          <span className={`cl-ic ${type}`}>{Icon[type]}</span>
                          <span className="cl-row-text">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
