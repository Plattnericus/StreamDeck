// ─── AGB-Seite ───
// zeigt die Allgemeinen Geschäftsbedingungen des StreamDeck-Projekts
// kann als eigenständige Seite oder als schließbares Popup angezeigt werden
import React, { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import agbContent from '../../i18n/agb-content';
import './legal-shared.css';

export default function AGB({ popup = false, onClose }) {
  const lang = useLanguage();
  const c = agbContent[lang] || agbContent.de;

  // Popup bei Escape-Taste schließen
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
            <h3>{c.s1_title}</h3>
            <p>{c.s1_p1}</p>
            <p>{c.s1_p2}</p>
            <p>{c.s1_p3}</p>
            <p>{c.s1_p4}</p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>{c.s2_title}</h3>
            <p>{c.s2_p1}</p>
            <p>{c.s2_p2}</p>
            <p>{c.s2_p3}</p>
            <p>{c.s2_p4}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s3_title}</h3>
            <p>{c.s3_p1}</p>
            <p>{c.s3_p2}</p>
            <p>{c.s3_p3}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s4_title}</h3>
            <p>{c.s4_intro}</p>
            <ul>
              <li>{c.s4_li1}</li>
              <li>{c.s4_li2}</li>
              <li>{c.s4_li3}</li>
              <li>{c.s4_li4}</li>
              <li>{c.s4_li5}</li>
              <li>{c.s4_li6}</li>
            </ul>
            <p>{c.s4_p2}</p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>{c.s5_title}</h3>
            <p>{c.s5_p1}</p>
            <p>{c.s5_p2}</p>
            <p>{c.s5_p3}</p>
            <p>{c.s5_p4}</p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>{c.s6_title}</h3>
            <p>{c.s6_p1}</p>
            <p>{c.s6_p2}</p>
            <p>{c.s6_p3}</p>
            <p>{c.s6_p4}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s7_title}</h3>
            <p>{c.s7_p1}</p>
            <p>{c.s7_p2}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s8_title}</h3>
            <p>{c.s8_p1}</p>
            <p>{c.s8_p2}</p>
            <p>{c.s8_p3}</p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>{c.s9_title}</h3>
            <p>{c.s9_p1}</p>
            <p>{c.s9_p2}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s10_title}</h3>
            <p>{c.s10_p1}</p>
            <p>{c.s10_p2}</p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>{c.s11_title}</h3>
            <p>{c.s11_p1}</p>
            <p>{c.s11_p2}</p>
            <p>{c.s11_p3}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s12_title}</h3>
            <p>
              {c.s12_p1}{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>{c.s12_p2}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s13_title}</h3>
            <p>{c.s13_p1}</p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>{c.s14_title}</h3>
            <p>{c.s14_intro}</p>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>Tschuggmallstraße 12</p>
              <p>39042 Brixen (Bressanone), Südtirol – Italien</p>
              <p>E-Mail: <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a></p>
              <p>Telefon: <a href="tel:+393898806833">+39 389 880 6833</a></p>
              <p>GitHub: <a href="https://github.com/Plattnericus" target="_blank" rel="noopener noreferrer">github.com/Plattnericus</a></p>
            </div>
          </section>

          <p className="legal-last-updated">{c.last_updated}</p>

        </div>
      </div>
    </div>
  );
}
