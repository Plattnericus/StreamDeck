import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Changelog.css';

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
    const subBulletMatch = line.match(/^\s+-\s+(.+)/);
    if (subBulletMatch) {
      const text = subBulletMatch[1].trim();
      if (!text) continue;
      if (inTodo) todoItems.push(text);
      else if (current) current.items.push(text);
    }
  }
  result.reverse();
  return { entries: result, todos: todoItems };
}

function formatDate(dateStr) {
  const parts = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (parts) {
    const d = new Date(+parts[3], +parts[2] - 1, +parts[1]);
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return { day: parts[1], month: months[d.getMonth()], weekday: weekdays[d.getDay()] };
  }
  return { day: '', month: dateStr, weekday: '' };
}

function isToday(dateStr) {
  const parts = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!parts) return false;
  const now = new Date();
  return +parts[1] === now.getDate() && +parts[2] === (now.getMonth() + 1) && +parts[3] === now.getFullYear();
}

function getItemType(text) {
  const l = text.toLowerCase();
  if (l.includes('fix') || l.includes('bug')) return 'fix';
  if (l.includes('add') || l.includes('added') || l.includes('new') || l.includes('start') || l.includes('made')) return 'add';
  if (l.includes('delete') || l.includes('removed')) return 'remove';
  if (l.includes('update') || l.includes('upgrade') || l.includes('rework') || l.includes('change')) return 'update';
  return 'default';
}

const typeIcon = {
  fix: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  add: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  remove: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  update: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
  default: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/></svg>,
};

export default function Changelog() {
  const [entries, setEntries] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedCount, setAnimatedCount] = useState(0);
  const lastHashRef = useRef('');

  const fetchChangelog = useCallback(async () => {
    try {
      const res = await fetch('/Changelog.md?t=' + Date.now());
      if (!res.ok) throw new Error('Fehler beim Laden');
      const raw = await res.text();
      const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(raw));
      const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (hash === lastHashRef.current) return;
      lastHashRef.current = hash;
      const parsed = parseChangelog(raw);
      setEntries(parsed.entries);
      setTodos(parsed.todos);
      setError(null);
      setAnimatedCount(0);
      parsed.entries.forEach((_, i) => {
        setTimeout(() => setAnimatedCount(i + 1), i * 40);
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChangelog();
    const id = setInterval(fetchChangelog, 5000);
    return () => clearInterval(id);
  }, [fetchChangelog]);

  const totalChanges = entries.reduce((sum, e) => sum + e.items.length, 0);

  if (loading) return <div className="cl-wrap"><div className="cl-center"><div className="cl-spinner" /></div></div>;
  if (error) return <div className="cl-wrap"><div className="cl-center"><span className="cl-err">{error}</span></div></div>;

  return (
    <div className="cl-wrap">
      <div className="cl-bar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cl-bar-svg"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
        <span className="cl-bar-t">Changelog</span>
        <span className="cl-bar-s">{totalChanges}</span>
      </div>
      <div className="cl-scroll">
        {entries.map((entry, i) => {
          if (i >= animatedCount) return null;
          const fd = formatDate(entry.date);
          const today = isToday(entry.date);
          return (
            <div key={i} className={`cl-card${today ? ' today' : ''}`} style={{ animationDelay: `${i * 35}ms` }}>
              <div className="cl-card-head">
                <div className={`cl-cal${today ? ' today' : ''}`}>
                  <span className="cl-cal-d">{fd.day || '-'}</span>
                  <span className="cl-cal-m">{fd.month}</span>
                </div>
                <span className="cl-card-date">{fd.weekday} {entry.date}</span>
                <span className="cl-card-n">{entry.items.length}</span>
                {today && <span className="cl-now">Heute</span>}
              </div>
              <div className="cl-rows">
                {entry.items.map((item, j) => {
                  const t = getItemType(item);
                  return (
                    <div key={j} className="cl-row" style={{ animationDelay: `${i * 35 + j * 20}ms` }}>
                      <span className={`cl-ic ${t}`}>{typeIcon[t]}</span>
                      <span className="cl-txt">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {todos.length > 0 && (
          <div className="cl-card todo">
            <div className="cl-card-head">
              <span className="cl-ic todo-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              </span>
              <span className="cl-card-date">To Do</span>
              <span className="cl-card-n todo-n">{todos.length}</span>
            </div>
            <div className="cl-rows">
              {todos.map((td, i) => (
                <div key={i} className="cl-row" style={{ animationDelay: `${i * 20}ms` }}>
                  <span className="cl-circ" />
                  <span className="cl-txt dim">{td}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
