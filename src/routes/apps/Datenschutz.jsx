// ─── Datenschutzerklärung ───
// Erklärt, welche Daten gesammelt werden und wofür.
// Kann als eigenständige Seite oder als schließbares Popup angezeigt werden.
import React, { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import datenschutzContent from '../../i18n/datenschutz-content';
import './legal-shared.css';

export default function Datenschutz({ popup = false, onClose }) {
  const lang = useLanguage();
  const c = datenschutzContent[lang] || datenschutzContent.de;

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
          <img style={{width:50,height:50}} src="/icons/datenschutz.webp" alt="Datenschutz Icon" />
          <h2>{c.title}</h2>
          {popup && <button className="legal-close-btn" onClick={() => onClose?.()}>✕</button>}
        </div>
        <div className="legal-popup-body">

          <section className="section-hero">
            <h3>{c.s1_title}</h3>
            <p className="intro-text">{c.s1_intro}</p>
            <p>{c.s1_legal_basis}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s11_title}</h3>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>Tschuggmallstraße 12</p>
              <p>39042 Brixen (Bressanone), Südtirol – Italien</p>
              <p>E-Mail: <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a></p>
            </div>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s12_title}</h3>
            <p>{c.s12_p1}</p>
            <p>{c.s12_p2}</p>
            <ul>
              <li><strong>{c.s12_li1_label}</strong> – {c.s12_li1_text}</li>
              <li><strong>{c.s12_li2_label}</strong> – {c.s12_li2_text}</li>
              <li><strong>{c.s12_li3_label}</strong> – {c.s12_li3_text}</li>
            </ul>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s13_title}</h3>
            <p>{c.s13_p1}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s14_title}</h3>
            <p>{c.s14_p1}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s15_title}</h3>
            <p>{c.s15_intro}</p>
            <ul>
              <li><strong>{c.s15_li1_label}</strong> ({c.s15_li1_ref}) – {c.s15_li1_text}</li>
              <li><strong>{c.s15_li2_label}</strong> ({c.s15_li2_ref}) – {c.s15_li2_text}</li>
              <li><strong>{c.s15_li3_label}</strong> ({c.s15_li3_ref}) – {c.s15_li3_text}</li>
              <li><strong>{c.s15_li4_label}</strong> ({c.s15_li4_ref}) – {c.s15_li4_text}</li>
              <li><strong>{c.s15_li5_label}</strong> ({c.s15_li5_ref}) – {c.s15_li5_text}</li>
              <li><strong>{c.s15_li6_label}</strong> ({c.s15_li6_ref}) – {c.s15_li6_text}</li>
            </ul>
            <p>{c.s15_revoke}</p>
            <div className="legal-contact-card">
              <p><strong>Garante per la protezione dei dati personali</strong></p>
              <p>Piazza Venezia 11, 00187 Roma – Italien</p>
              <p>{c.s15_garante_website_label}: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a></p>
              <p>E-Mail: <a href="mailto:garante@gpdp.it">garante@gpdp.it</a></p>
            </div>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s16_title}</h3>
            <p>{c.s16_p1}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s17_title}</h3>
            <p>{c.s17_p1}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s18_title}</h3>
            <p>{c.s18_p1}</p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>{c.s2_title}</h3>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s21_title}</h3>
            <p>{c.s21_p1}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s22_title}</h3>
            <p>{c.s22_p1}</p>
            <ul>
              <li>{c.s22_li1}</li>
              <li>{c.s22_li2}</li>
              <li>{c.s22_li3}</li>
              <li>{c.s22_li4}</li>
              <li>{c.s22_li5}</li>
              <li>{c.s22_li6}</li>
              <li>{c.s22_li7}</li>
              <li>{c.s22_li8}</li>
              <li>{c.s22_li9}</li>
            </ul>
            <p>{c.s22_p2}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s23_title}</h3>
            <p dangerouslySetInnerHTML={{ __html: c.s23_p1 }} />
            <p>
              {c.s23_p2_prefix}{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">{c.s23_p2_link_text}</a>.
            </p>
            <p>{c.s23_p3}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s24_title}</h3>
            <p>{c.s24_p1}</p>
            <p>{c.s24_p2}</p>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>cookie-consent</strong>
                <span className="legal-badge active">{c.s24_cookie1_badge}</span>
              </div>
              <p>{c.s24_cookie1_desc}</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">{c.s24_storage_duration}</span><span>{c.s24_storage_value}</span></div>
            </div>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>terminal-fs</strong>
                <span className="legal-badge active">{c.s24_cookie2_badge}</span>
              </div>
              <p>{c.s24_cookie2_desc}</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">{c.s24_storage_duration}</span><span>{c.s24_storage_value}</span></div>
            </div>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>streamdeck_settings_v2</strong>
                <span className="legal-badge active">{c.s24_cookie3_badge}</span>
              </div>
              <p>{c.s24_cookie3_desc}</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">{c.s24_storage_duration}</span><span>{c.s24_storage_value}</span></div>
            </div>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>control_center_settings_v1</strong>
                <span className="legal-badge active">{c.s24_cookie4_badge}</span>
              </div>
              <p>{c.s24_cookie4_desc}</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">{c.s24_storage_duration}</span><span>{c.s24_storage_value}</span></div>
            </div>
            <p>{c.s24_p3}</p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s25_title}</h3>
            <p dangerouslySetInnerHTML={{ __html: c.s25_p1 }} />
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s26_title}</h3>
            <p dangerouslySetInnerHTML={{ __html: c.s26_p1 }} />
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>{c.s27_title}</h3>
            <p>{c.s27_p1}</p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>{c.s3_title}</h3>
            <p>{c.s3_p1}</p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>{c.s4_title}</h3>
            <p>{c.s4_p1}</p>
            <p>
              {c.s4_p2_prefix}{' '}
              <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">{c.s4_p2_link_text}</a>.
            </p>
            <p>{c.s4_p3}</p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>{c.s5_title}</h3>
            <p>{c.s5_p1}</p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>{c.s6_title}</h3>
            <p>{c.s6_p1}</p>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>E-Mail: <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a></p>
            </div>
          </section>

          <p className="legal-last-updated">{c.last_updated}</p>
        </div>
      </div>
    </div>
  );
}
