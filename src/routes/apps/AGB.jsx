// ─── AGB-Seite ───
// zeigt die Allgemeinen Geschäftsbedingungen des StreamDeck-Projekts
// kann als eigenständige Seite oder als schließbares Popup angezeigt werden
import React, { useEffect } from 'react';
import './legal-shared.css';

export default function AGB({ popup = false, onClose }) {
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
          <h2>Allgemeine Geschäftsbedingungen</h2>
          {popup && <button className="legal-close-btn" onClick={() => onClose?.()}>✕</button>}
        </div>
        <div className="legal-popup-body">

          <section>
            <p className="intro-text">
              Allgemeine Geschäftsbedingungen für die Nutzung der Website von Felix Plattner.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>§ 1 Allgemeines</h3>
            <p>
              1.1 Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") regeln die Nutzung der Website von Felix Plattner (nachfolgend „Betreiber"). Die Website ist unter der Domain streamdeck.plattnericus.dev erreichbar.
            </p>
            <p>
              1.2 Die Website ist ein privates, nicht-kommerzielles Portfolio- und Showcase-Projekt. Sie dient ausschließlich der Präsentation persönlicher Arbeiten, dem Experimentieren mit Webtechnologien sowie zu Lern- und Demonstrationszwecken.
            </p>
            <p>
              1.3 Mit der Nutzung dieser Website erklären Sie sich mit diesen AGB einverstanden. Sofern Sie mit einzelnen Regelungen nicht einverstanden sind, bitten wir Sie, die Website nicht zu nutzen.
            </p>
            <p>
              1.4 Der Betreiber behält sich das Recht vor, diese AGB jederzeit ohne gesonderte Benachrichtigung zu ändern. Es gilt jeweils die zum Zeitpunkt der Nutzung aktuelle Fassung.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>§ 2 Leistungsbeschreibung</h3>
            <p>
              2.1 Die Website stellt eine interaktive Webplattform dar, die eine grafische Benutzeroberfläche im Stil eines Desktop-Betriebssystems (angelehnt an macOS von Apple) simuliert. Sie umfasst unter anderem simulierte Anwendungen, Fenster, einen Dock-Bereich sowie interaktive Elemente.
            </p>
            <p>
              2.2 Der Umfang der bereitgestellten Funktionen kann jederzeit verändert, erweitert oder eingeschränkt werden, ohne dass hieraus Ansprüche der Nutzer entstehen.
            </p>
            <p>
              2.3 Der Betreiber ist bemüht, die Website möglichst unterbrechungsfrei zur Verfügung zu stellen. Es besteht jedoch kein Anspruch auf ständige Verfügbarkeit. Wartungsarbeiten, technische Störungen oder höhere Gewalt können zu vorübergehenden Einschränkungen führen.
            </p>
            <p>
              2.4 Die auf der Website dargestellten Inhalte, Designs und Funktionen dienen ausschließlich Demonstrations- und Showcasezwecken. Sie begründen keinerlei Rechtsansprüche, Lizenzen oder exklusive Nutzungsrechte.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>§ 3 Zugang und Nutzerkonto</h3>
            <p>
              3.1 Die Website enthält einen simulierten Login-Bereich. Dieser dient ausschließlich der Demonstration und hat keine tatsächliche Authentifizierungsfunktion. Es werden dabei keine echten Benutzerkonten erstellt oder verwaltet.
            </p>
            <p>
              3.2 Sollten im Rahmen der Simulation Zugangsdaten angezeigt oder eingegeben werden, handelt es sich um rein fiktive Daten ohne jegliche reale Funktion.
            </p>
            <p>
              3.3 Der Nutzer ist dafür verantwortlich, dass er keine personenbezogenen oder sensiblen Daten in Eingabefelder eingibt, die über die simulierte Funktionalität hinausgehen.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>§ 4 Pflichten des Nutzers</h3>
            <p>
              4.1 Der Nutzer verpflichtet sich, die Website nur im Rahmen der geltenden Gesetze und dieser AGB zu nutzen. Insbesondere ist es untersagt:
            </p>
            <ul>
              <li>Die Website oder Teile davon ohne Zustimmung des Betreibers zu kopieren, zu vervielfältigen oder weiterzuverbreiten</li>
              <li>Automatisierte Zugriffe (z. B. durch Bots, Scraper oder Crawler) durchzuführen, sofern diese nicht ausdrücklich erlaubt sind</li>
              <li>Sicherheitsmechanismen der Website zu umgehen oder zu manipulieren</li>
              <li>Inhalte der Website für kommerzielle Zwecke zu verwenden</li>
              <li>Die Website in einer Weise zu nutzen, die den Betrieb beeinträchtigt oder andere Nutzer stört</li>
              <li>Schadsoftware oder andere schädliche Inhalte über die Website einzuschleusen</li>
            </ul>
            <p>
              4.2 Bei Verstößen gegen diese Pflichten behält sich der Betreiber das Recht vor, den Zugang zur Website zu beschränken oder zu sperren.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>§ 5 Geistiges Eigentum und Urheberrecht</h3>
            <p>
              5.1 Alle auf dieser Website veröffentlichten Inhalte (Texte, Grafiken, Bilder, Animationen, Code, Design, Layouts) sind urheberrechtlich geschützt und unterliegen dem italienischen Urheberrecht (Legge 22 aprile 1941, n. 633) sowie den einschlägigen EU-Richtlinien.
            </p>
            <p>
              5.2 Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der vorherigen schriftlichen Zustimmung des Betreibers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht-kommerziellen Gebrauch gestattet.
            </p>
            <p>
              5.3 Das Design der Website ist von der Benutzeroberfläche von macOS von Apple inspiriert. Alle Marken, Logos und Produktnamen von Apple sind Eigentum von Apple Inc. Diese Website steht in keiner Verbindung zu Apple Inc. und wird von Apple weder unterstützt noch autorisiert.
            </p>
            <p>
              5.4 Soweit Inhalte Dritter auf dieser Website verwendet werden, werden die jeweiligen Urheberrechte und Lizenzbestimmungen beachtet. Sollte dennoch eine Urheberrechtsverletzung vorliegen, bitten wir um einen entsprechenden Hinweis, damit wir die betreffenden Inhalte umgehend entfernen können.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>§ 6 Haftungsbeschränkung</h3>
            <p>
              6.1 Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Der Betreiber übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte.
            </p>
            <p>
              6.2 Die Nutzung der Website erfolgt auf eigene Gefahr des Nutzers. Der Betreiber haftet nicht für Schäden, die durch die Nutzung oder Nichtnutzung der Website entstehen, es sei denn, diese beruhen auf vorsätzlichem oder grob fahrlässigem Verhalten des Betreibers.
            </p>
            <p>
              6.3 Insbesondere haftet der Betreiber nicht für Schäden, die durch technische Störungen, Datenverlust, Viren oder sonstige schädliche Komponenten entstehen.
            </p>
            <p>
              6.4 Die Haftungsbeschränkung gilt nicht, soweit zwingende gesetzliche Regelungen (insbesondere nach dem italienischen Codice Civile oder dem Produkthaftungsgesetz) eine weitergehende Haftung vorsehen.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>§ 7 Verfügbarkeit</h3>
            <p>
              7.1 Der Betreiber ist bemüht, die Website dauerhaft zugänglich zu halten. Es besteht jedoch kein Anspruch auf ununterbrochene Verfügbarkeit. Wartungsarbeiten, Updates, technische Probleme oder äußere Umstände können zu vorübergehenden Unterbrechungen führen.
            </p>
            <p>
              7.2 Der Betreiber haftet nicht für Ausfälle oder Einschränkungen der Erreichbarkeit, die außerhalb seines Einflussbereichs liegen.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>§ 8 Links zu externen Websites</h3>
            <p>
              8.1 Diese Website kann Links zu externen Websites Dritter enthalten. Auf die Inhalte dieser Seiten hat der Betreiber keinen Einfluss und übernimmt daher keine Verantwortung oder Gewähr für deren Richtigkeit, Vollständigkeit oder Aktualität.
            </p>
            <p>
              8.2 Zum Zeitpunkt der Verlinkung wurden die externen Seiten auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht erkennbar. Eine permanente Kontrolle ist ohne konkrete Hinweise auf eine Rechtsverletzung nicht zumutbar.
            </p>
            <p>
              8.3 Bei Bekanntwerden von Rechtsverletzungen auf verlinkten Seiten werden die betreffenden Links unverzüglich entfernt.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>§ 9 Datenschutz</h3>
            <p>
              9.1 Der Schutz Ihrer personenbezogenen Daten ist dem Betreiber ein besonderes Anliegen. Weitere Informationen zur Erhebung, Verarbeitung und Nutzung Ihrer Daten finden Sie in der gesonderten Datenschutzerklärung.
            </p>
            <p>
              9.2 Die Datenschutzerklärung ist Bestandteil dieser AGB und kann jederzeit über die Website eingesehen werden.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>§ 10 Änderung der AGB</h3>
            <p>
              10.1 Der Betreiber behält sich das Recht vor, diese AGB jederzeit und ohne Vorankündigung zu ändern. Die jeweils aktuelle Fassung ist auf der Website einsehbar.
            </p>
            <p>
              10.2 Durch die fortgesetzte Nutzung der Website nach Änderung der AGB erklärt sich der Nutzer mit den geänderten Bedingungen einverstanden.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>§ 11 Anwendbares Recht und Gerichtsstand</h3>
            <p>
              11.1 Es gilt das Recht der Italienischen Republik unter Ausschluss des UN-Kaufrechts (CISG). Ergänzend finden die Bestimmungen der EU-Verordnungen, insbesondere der Datenschutz-Grundverordnung (DSGVO), Anwendung.
            </p>
            <p>
              11.2 Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit der Nutzung dieser Website ist, soweit gesetzlich zulässig, Bozen (Bolzano), Italien.
            </p>
            <p>
              11.3 Sollte der Nutzer Verbraucher im Sinne des Codice del Consumo (D.Lgs. 206/2005) sein, gelten die zwingenden Verbraucherschutzvorschriften des Staates, in dem der Nutzer seinen gewöhnlichen Aufenthalt hat, soweit diese einen weitergehenden Schutz bieten.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>§ 12 EU-Streitschlichtung</h3>
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

          <div className="legal-section-divider" />

          <section>
            <h3>§ 13 Salvatorische Klausel</h3>
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder nach Veröffentlichung unwirksam oder undurchführbar werden, so wird dadurch die Wirksamkeit der übrigen Bestimmungen nicht berührt. An die Stelle der unwirksamen oder undurchführbaren Bestimmung soll diejenige wirksame und durchführbare Regelung treten, deren Wirkungen der Zielsetzung am nächsten kommen, die mit der unwirksamen oder undurchführbaren Bestimmung verfolgt wurde.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>§ 14 Kontakt</h3>
            <p>Bei Fragen zu diesen AGB können Sie sich an den Betreiber wenden:</p>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>Strange 12</p>
              <p>39041 Gossensaß (Gossensass), Südtirol – Italien</p>
              <p>E-Mail: <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a></p>
              <p>Telefon: <a href="tel:+393898806833">+39 389 880 6833</a></p>
              <p>GitHub: <a href="https://github.com/Plattnericus" target="_blank" rel="noopener noreferrer">github.com/Plattnericus</a></p>
            </div>
          </section>

          <p className="legal-last-updated">Stand: März 2026</p>

        </div>
      </div>
    </div>
  );
}
