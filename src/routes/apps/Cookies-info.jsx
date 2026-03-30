// Cookie information page — explains what cookies are used, their purpose,
// and user rights. Can be shown as a popup or embedded.
import React, { useEffect } from 'react';
import './legal-shared.css';

export default function CookiesInfo({ popup = false, onClose }) {
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
          <h2>Cookies – Mehr erfahren</h2>
          {popup && <button className="legal-close-btn" onClick={() => onClose?.()}>✕</button>}
        </div>
        <div className="legal-popup-body">
          <section>
            <h3>Was sind Cookies?</h3>
            <p>Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Endgerät abgelegt werden. Sie erlauben es, Ihre Einstellungen und Präferenzen zu speichern, die Nutzung der Website auszuwerten und Ihnen ein auf Ihre Bedürfnisse abgestimmtes Erlebnis zu bieten.</p>
            <p>Cookies richten auf Ihrem Gerät keinen Schaden an und enthalten keine Schadsoftware. Sie können jederzeit über Ihre Browser-Einstellungen verwaltet oder gelöscht werden.</p>
          </section>
          <div className="legal-section-divider" />
          <section>
            <h3>Welche Cookies setzen wir ein?</h3>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>Notwendige Cookies</strong>
                <span className="legal-badge active">Immer aktiv</span>
              </div>
              <p>Diese Cookies sind für den Betrieb der Website unerlässlich. Sie stellen sicher, dass grundlegende Funktionen wie Seitennavigation, Zugriff auf geschützte Bereiche und Sicherheitsfeatures zuverlässig arbeiten. Ohne diese Cookies kann die Website nicht ordnungsgemäß angezeigt oder genutzt werden. Sie speichern keine personenbezogenen Daten, die für Marketingzwecke verwendet werden.</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">Beispiel:</span><span>cookie-consent (speichert Ihre Cookie-Einstellung)</span></div>
              <div className="legal-cookie-detail"><span className="legal-detail-label">Speicherdauer:</span><span>Bis zur manuellen Löschung durch den Nutzer</span></div>
            </div>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>Funktionale localStorage-Einträge</strong>
                <span className="legal-badge active">Funktional</span>
              </div>
              <p>Zusätzlich speichert die Website funktionale Daten im localStorage Ihres Browsers, um Ihre Einstellungen und den Zustand der simulierten Desktop-Oberfläche zu erhalten. Diese Daten verlassen niemals Ihren Browser und werden nicht an Server übertragen.</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">Beispiele:</span><span>terminal-fs, streamdeck_settings_v2, control_center_settings_v1</span></div>
              <div className="legal-cookie-detail"><span className="legal-detail-label">Speicherdauer:</span><span>Bis zur manuellen Löschung durch den Nutzer</span></div>
            </div>
            <p style={{marginTop: '1rem'}}>
              <strong>Hinweis:</strong> Diese Website verwendet <strong>keine</strong> Analyse-, Tracking- oder Marketing-Cookies. Es werden keine Daten an Drittanbieter wie Google Analytics, Facebook Pixel oder vergleichbare Dienste übermittelt. Sämtliche gespeicherten Daten dienen ausschließlich der Funktionalität der Website.
            </p>
          </section>
          <div className="legal-major-divider" />
          <section>
            <h3>Wie lange werden Cookies gespeichert?</h3>
            <p>Die Speicherdauer ist abhängig von der Art des Cookies. Session-Cookies werden automatisch gelöscht, sobald Sie Ihren Browser schließen. Persistente Cookies verbleiben für einen definierten Zeitraum auf Ihrem Endgerät – in der Regel zwischen wenigen Tagen und maximal 12 Monaten – oder bis Sie sie manuell aus Ihren Browser-Einstellungen entfernen.</p>
          </section>
          <div className="legal-section-divider" />
          <section>
            <h3>Cookies verwalten und löschen</h3>
            <p>Sie haben jederzeit die Möglichkeit, Ihre Cookie-Einstellungen über Ihren Browser anzupassen. In den meisten Browsern finden Sie die entsprechenden Optionen im Bereich „Datenschutz" oder „Sicherheit" der Einstellungen. Sie können dort:</p>
            <ul>
              <li>Alle gespeicherten Cookies einsehen und einzeln löschen</li>
              <li>Cookies von Drittanbietern blockieren</li>
              <li>Cookies generell ablehnen (dies kann die Funktion der Website einschränken)</li>
              <li>Festlegen, dass Cookies nach jeder Sitzung gelöscht werden</li>
            </ul>
          </section>
          <div className="legal-major-divider" />
          <section>
            <h3>Ihre Rechte</h3>
            <p>Gemäß der DSGVO und der italienischen Datenschutzgesetzgebung können Sie jederzeit Auskunft über die zu Ihrer Person gespeicherten Daten verlangen sowie deren Berichtigung, Löschung oder Einschränkung der Verarbeitung fordern. Eine erteilte Einwilligung können Sie mit Wirkung für die Zukunft widerrufen.</p>
            <p>Bei Fragen wenden Sie sich an:<br/>Felix Plattner – felix.plattner89@plattnericus.dev</p>
          </section>
        </div>
      </div>
    </div>
  );
}
