// ─── Cookie-Informationsseite ───
// erklärt welche Cookies auf der Seite verwendet werden und welche Rechte Nutzer haben
// kann als Popup aus dem Cookie-Banner oder aus dem App Store geöffnet werden
import React, { useEffect } from 'react';
import './legal-shared.css';
import { useLanguage } from '../../i18n/LanguageContext';
import cookiesContent from '../../i18n/cookies-content';

export default function CookiesInfo({ popup = false, onClose }) {
  const lang = useLanguage();
  const c = cookiesContent[lang] || cookiesContent.de;

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
          <img style={{width:50,height:50}} src="/icons/cookies.png" alt="Cookie Icon" />
          <h2>{c.title}</h2>
          {popup && <button className="legal-close-btn" onClick={() => onClose?.()}>✕</button>}
        </div>
        <div className="legal-popup-body">
          <section>
            <h3>{c.s1_title}</h3>
            <p>{c.s1_p1}</p>
            <p>{c.s1_p2}</p>
          </section>
          <div className="legal-section-divider" />
          <section>
            <h3>{c.s2_title}</h3>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>{c.s2_necessary}</strong>
                <span className="legal-badge active">{c.s2_always_active}</span>
              </div>
              <p>{c.s2_necessary_desc}</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">{c.s2_example_label}</span><span>{c.s2_example_val}</span></div>
              <div className="legal-cookie-detail"><span className="legal-detail-label">{c.s2_duration_label}</span><span>{c.s2_duration_val}</span></div>
            </div>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>{c.s2_functional}</strong>
                <span className="legal-badge active">{c.s2_functional_badge}</span>
              </div>
              <p>{c.s2_functional_desc}</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">{c.s2_functional_examples_label}</span><span>{c.s2_functional_examples_val}</span></div>
              <div className="legal-cookie-detail"><span className="legal-detail-label">{c.s2_functional_duration_label}</span><span>{c.s2_functional_duration_val}</span></div>
            </div>
            <p style={{marginTop: '1rem'}}>
              <strong>{c.s2_notice_label}</strong> {c.s2_notice_text}
            </p>
          </section>
          <div className="legal-major-divider" />
          <section>
            <h3>{c.s3_title}</h3>
            <p>{c.s3_p1}</p>
          </section>
          <div className="legal-section-divider" />
          <section>
            <h3>{c.s4_title}</h3>
            <p>{c.s4_p1}</p>
            <ul>
              <li>{c.s4_li1}</li>
              <li>{c.s4_li2}</li>
              <li>{c.s4_li3}</li>
              <li>{c.s4_li4}</li>
            </ul>
          </section>
          <div className="legal-major-divider" />
          <section>
            <h3>{c.s5_title}</h3>
            <p>{c.s5_p1}</p>
            <p>{c.s5_contact}<br/>Felix Plattner – felix.plattner89@plattnericus.dev</p>
          </section>
        </div>
      </div>
    </div>
  );
}
