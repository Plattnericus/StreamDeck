import React, { useEffect } from 'react';
import './legal-shared.css';

export default function Impressum({ popup = false, onClose }) {
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
          <h2>Impressum</h2>
          {popup && <button className="legal-close-btn" onClick={() => onClose?.()}>✕</button>}
        </div>
        <div className="legal-popup-body">

          <section>
            <p className="intro-text">
              Diese Website wird betrieben von Felix Plattner als privates, nicht-kommerzielles Portfolio- und Showcase-Projekt.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>Geschäftsangaben</h3>
            <p>
              Angaben gemäß Art. 2 D.Lgs. 70/2003 (Decreto legislativo 9 aprile 2003, n. 70 – Umsetzung der E-Commerce-Richtlinie 2000/31/EG) sowie § 5 TMG (Telemediengesetz):
            </p>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>Stramge 12</p>
              <p>39040 Vahrn, Südtirol – Italien</p>
            </div>
            <p>
              Diese Website ist ein privates, nicht-kommerzielles Projekt. Es handelt sich weder um ein Gewerbe noch um eine freiberufliche Tätigkeit. Eine Umsatzsteuer-Identifikationsnummer ist daher nicht vorhanden.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>Kontakt</h3>
            <p>
              E-Mail: <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a>
            </p>
            <p>
              Telefon: <a href="tel:+393898806833">+39 389 880 6833</a>
            </p>
            <p>
              Bitte beachten Sie, dass eine telefonische Erreichbarkeit nur zu üblichen Bürozeiten gewährleistet werden kann.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>Online-Präsenzen</h3>
            <p>
              GitHub: <a href="https://github.com/Plattnericus" target="_blank" rel="noopener noreferrer">github.com/Plattnericus</a>
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>Verantwortlich für den Inhalt</h3>
            <p>
              Verantwortlich gemäß Art. 18 Abs. 2 MStV (Medienstaatsvertrag) sowie § 5 TMG:
            </p>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>Stramge 12</p>
              <p>39040 Vahrn, Südtirol – Italien</p>
            </div>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>EU-Streitschlichtung</h3>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>
              Da es sich bei dieser Website um ein privates, nicht-kommerzielles Projekt handelt, besteht keine Verpflichtung und keine Bereitschaft, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß Art. 7 Abs. 1 D.Lgs. 70/2003 bzw. § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
            <p>
              Nach Art. 14–16 D.Lgs. 70/2003 bzw. §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>Urheberrecht</h3>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem italienischen Urheberrecht (Legge 22 aprile 1941, n. 633 – Protezione del diritto d'autore e di altri diritti connessi al suo esercizio). Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht-kommerziellen Gebrauch gestattet.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>Bildnachweise und Lizenzen</h3>
            <p>
              Die auf dieser Website verwendeten Icons stammen aus frei verfügbaren Quellen und werden im Rahmen der jeweiligen Lizenzbestimmungen eingesetzt.
            </p>
            <p>
              Die verwendete Schriftart „Inter" von Rasmus Andersson steht unter der SIL Open Font License 1.1 und wird lokal auf diesem Server gehostet – es erfolgt keine Einbindung über externe Dienste wie Google Fonts.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>Technologie und Design</h3>
            <p>
              Diese Website wurde mit React entwickelt und orientiert sich visuell an der Benutzeroberfläche von macOS von Apple. Es handelt sich um ein rein privates Showcase- und Lernprojekt ohne kommerzielle Absicht.
            </p>
            <p>
              Für die Darstellung des 3D-Modells wird Three.js verwendet. Das Modell wird lokal geladen – es erfolgt keine Verbindung zu externen Servern oder CDNs.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>Anwendbares Recht</h3>
            <p>
              Dieses Impressum wurde unter Berücksichtigung der folgenden Rechtsgrundlagen erstellt: Decreto legislativo 9 aprile 2003, n. 70 (D.Lgs. 70/2003) – Umsetzung der E-Commerce-Richtlinie, Datenschutz-Grundverordnung (DSGVO), Telemediengesetz (TMG) sowie Medienstaatsvertrag (MStV).
            </p>
          </section>

          <p className="legal-last-updated">Stand: März 2026</p>

        </div>
      </div>
    </div>
  );
}
