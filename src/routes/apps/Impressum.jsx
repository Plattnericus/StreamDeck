// ─── Impressum ───
// Nach deutschem und italienischem Recht vorgeschrieben.
// Zeigt Betreiber, Kontakt, Urheberrecht und Haftungsausschlüsse.
// Funktioniert als eigenständige Seite oder als schließbares Popup.
import React, { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import impressumContent from '../../i18n/impressum-content';
import './legal-shared.css';

export default function Impressum({ popup = false, onClose }) {
  const lang = useLanguage();
  const c = impressumContent[lang] || impressumContent.de;

  useEffect(() => {
    if (!popup) return;
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [popup, onClose]);

  return (
    <div
      className={`legal-wrapper ${popup ? 'legal-popup-backdrop' : ''}`}
      onClick={e => { if (popup && e.target === e.currentTarget) onClose?.(); }}
    >
      <div className={`legal-container ${popup ? 'legal-popup-mode' : 'legal-embedded-mode'}`}>
        <div className="legal-glass-shine" />
        <div className="legal-glass-caustic" />
        <div className="legal-popup-header">
          <h2>{c.title}</h2>
          {popup && <button className="legal-close-btn" onClick={() => onClose?.()}>✕</button>}
        </div>
        <div className="legal-popup-body">

          <section>
            <p className="intro-text">
              {c.intro}
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>{c.business_title}</h3>
            <p>
              {c.business_legal_ref}
            </p>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>Tschuggmallstraße 12</p>
              <p>39042 Brixen (Bressanone), Südtirol – Italien</p>
            </div>
            <p>
              {c.business_private}
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.contact_title}</h3>
            <p>
              E-Mail: <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a>
            </p>
            <p>
              Telefon: <a href="tel:+393898806833">+39 389 880 6833</a>
            </p>
            <p>
              {c.contact_phone_note}
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.online_title}</h3>
            <p>
              GitHub: <a href="https://github.com/Plattnericus" target="_blank" rel="noopener noreferrer">github.com/Plattnericus</a>
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.responsible_title}</h3>
            <p>
              {c.responsible_legal_ref}
            </p>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>Tschuggmallstraße 12</p>
              <p>39042 Brixen (Bressanone), Südtirol – Italien</p>
            </div>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>{c.eu_dispute_title}</h3>
            <p>
              {c.eu_dispute_p1}{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>
              {c.eu_dispute_p2}
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>{c.liability_content_title}</h3>
            <p>
              {c.liability_content_p1}
            </p>
            <p>
              {c.liability_content_p2}
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.liability_links_title}</h3>
            <p>
              {c.liability_links_p1}
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.copyright_title}</h3>
            <p>
              {c.copyright_p1}
            </p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>{c.credits_title}</h3>
            <p>
              {c.credits_icons}
            </p>
            <p>
              {c.credits_font}
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.tech_title}</h3>
            <p>
              {c.tech_p1}
            </p>
            <p>
              {c.tech_p2}
            </p>
            <p>
              {c.tech_p3}{' '}
              <a href="https://streamdeck.plattnericus.dev" target="_blank" rel="noopener noreferrer">streamdeck.plattnericus.dev</a>{' '}
              {c.tech_p3_suffix}
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.law_title}</h3>
            <p>
              {c.law_p1}
            </p>
          </section>

          <p className="legal-last-updated">{c.last_updated}</p>

        </div>
      </div>
    </div>
  );
}
