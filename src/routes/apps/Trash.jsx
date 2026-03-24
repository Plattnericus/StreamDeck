import React from 'react';
import './trash.css';
import { useTranslation } from '../../i18n/LanguageContext';

export default function Trash() {
  const t = useTranslation();

  return (
    <div className="tr-root">
      {/* ── Toolbar ── */}
      <div className="tr-toolbar">
        <div className="tr-toolbar-left">
          <div className="tr-nav-buttons">
            <button className="tr-nav-btn" disabled aria-label={t('finder_back')}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="tr-nav-btn" disabled aria-label={t('finder_forward')}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <span className="tr-toolbar-title">{t('trash_title')}</span>
        </div>
        <div className="tr-toolbar-right">
          <div className="tr-view-modes">
            <button className="tr-view-btn active" aria-label={t('finder_view_icons')}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="#007AFF" strokeWidth="1.3"/>
                <rect x="9" y="1" width="6" height="6" rx="1" stroke="#007AFF" strokeWidth="1.3"/>
                <rect x="1" y="9" width="6" height="6" rx="1" stroke="#007AFF" strokeWidth="1.3"/>
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="#007AFF" strokeWidth="1.3"/>
              </svg>
            </button>
            <button className="tr-view-btn" disabled>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M1 3h14M1 6.5h14M1 10h14M1 13.5h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="tr-view-btn" disabled>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="6" y="1" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="11" y="1" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </button>
            <button className="tr-view-btn" disabled>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="1" y="13" width="3" height="2" rx="0.5" stroke="currentColor" strokeWidth="0.8"/>
                <rect x="5.5" y="13" width="3" height="2" rx="0.5" stroke="currentColor" strokeWidth="0.8"/>
                <rect x="10" y="13" width="3" height="2" rx="0.5" stroke="currentColor" strokeWidth="0.8"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Empty Content ── */}
      <div className="tr-body">
        <div className="tr-empty">
          <svg className="tr-empty-icon" viewBox="0 0 80 80" fill="none">
            <path d="M22 18h36l4 6H18l4-6z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
            <rect x="16" y="24" width="48" height="40" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
            <path d="M30 24v-4a2 2 0 012-2h16a2 2 0 012 2v4" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
            <line x1="32" y1="34" x2="32" y2="54" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="40" y1="34" x2="40" y2="54" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="48" y1="34" x2="48" y2="54" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="tr-empty-text">{t('trash_empty')}</p>
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div className="tr-statusbar">
        <span>{t('trash_zero_items')}</span>
      </div>
    </div>
  );
}
