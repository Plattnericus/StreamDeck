// ─── Datenschutzerklärung ───
// Erklärt, welche Daten gesammelt werden und wofür.
// Kann als eigenständige Seite oder als schließbares Popup angezeigt werden.
import React, { useEffect } from 'react';
import './legal-shared.css';

export default function Datenschutz({ popup = false, onClose }) {
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
          <h2>Datenschutzerklärung</h2>
          {popup && <button className="legal-close-btn" onClick={() => onClose?.()}>✕</button>}
        </div>
        <div className="legal-popup-body">

          <section className="section-hero">
            <h3>1. Einleitung</h3>
            <p className="intro-text">
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. In dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung personenbezogener Daten bei der Nutzung unserer Website.
            </p>
            <p>
              Verantwortlich im Sinne der EU-Datenschutz-Grundverordnung (DSGVO) sowie des italienischen Datenschutzgesetzes (Codice in materia di protezione dei dati personali, D.Lgs. 196/2003, aktualisiert durch D.Lgs. 101/2018) ist:
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>1.1 Kontaktdaten des Verantwortlichen</h3>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>Strange 12</p>
              <p>39041 Gossensaß (Gossensass), Südtirol – Italien</p>
              <p>E-Mail: <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a></p>
            </div>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>1.2 Umfang der Datenverarbeitung</h3>
            <p>
              Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt ausschließlich auf Grundlage einer gesetzlichen Erlaubnis oder Ihrer ausdrücklichen Einwilligung.
            </p>
            <p>Als Rechtsgrundlage dient uns insbesondere:</p>
            <ul>
              <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung der betroffenen Person</li>
              <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen</li>
              <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Wahrung berechtigter Interessen, sofern die Grundrechte der betroffenen Person nicht überwiegen</li>
            </ul>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>1.3 Datenverarbeitung außerhalb des EWR</h3>
            <p>
              Soweit wir Daten in einem Drittland (außerhalb des Europäischen Wirtschaftsraums) verarbeiten oder dies im Rahmen der Nutzung von Diensten Dritter geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer (vor-)vertraglichen Pflichten erforderlich ist, auf Grundlage Ihrer Einwilligung oder aufgrund eines berechtigten Interesses. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse verarbeiten wir die Daten in einem Drittland nur beim Vorliegen eines angemessenen Datenschutzniveaus (z. B. EU-Angemessenheitsbeschluss, Standardvertragsklauseln oder verbindliche interne Datenschutzvorschriften).
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>1.4 Speicherdauer</h3>
            <p>
              Personenbezogene Daten werden nur solange gespeichert, wie es für den jeweiligen Verarbeitungszweck erforderlich ist. Soweit gesetzliche Aufbewahrungsfristen bestehen, werden die Daten nach Ablauf dieser Fristen gelöscht oder anonymisiert. Server-Log-Dateien werden in der Regel nach 30 Tagen automatisch gelöscht.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>1.5 Rechte der Betroffenen</h3>
            <p>Im Rahmen der geltenden Datenschutzgesetze stehen Ihnen folgende Rechte zu:</p>
            <ul>
              <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO) – Sie können Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten verlangen.</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO) – Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO) – Sie können die Löschung Ihrer Daten verlangen, sofern die Voraussetzungen erfüllt sind.</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO) – Sie können unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO) – Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO) – Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen, wenn die Verarbeitung auf berechtigten Interessen basiert.</li>
            </ul>
            <p>
              Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Des Weiteren haben Sie das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen:
            </p>
            <div className="legal-contact-card">
              <p><strong>Garante per la protezione dei dati personali</strong></p>
              <p>Piazza Venezia 11, 00187 Roma – Italien</p>
              <p>Webseite: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a></p>
              <p>E-Mail: <a href="mailto:garante@gpdp.it">garante@gpdp.it</a></p>
            </div>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>1.6 Pflicht zur Bereitstellung von Daten</h3>
            <p>
              Sie sind nicht verpflichtet, uns personenbezogene Daten bereitzustellen. Ohne bestimmte Angaben können jedoch einzelne Funktionen der Website möglicherweise nicht oder nur eingeschränkt zur Verfügung stehen.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>1.7 Keine automatische Entscheidungsfindung</h3>
            <p>
              Es findet keine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und 4 DSGVO statt, die Ihnen gegenüber rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>1.8 Kontaktaufnahme</h3>
            <p>
              Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden die von Ihnen übermittelten Daten (z. B. Name, E-Mail-Adresse, Nachrichteninhalt) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet und gespeichert. Diese Daten werden ohne Ihre Einwilligung nicht an Dritte weitergegeben. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage).
            </p>
          </section>

          <div className="legal-major-divider" />

          <section className="section-hero">
            <h3>2. Datenverarbeitung auf unserer Website</h3>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>2.1 Hinweis für EU-Besucher</h3>
            <p>
              Diese Website richtet sich vorrangig an Besucher innerhalb der Europäischen Union und des Europäischen Wirtschaftsraums. Wir verpflichten uns zur Einhaltung der EU-Datenschutz-Grundverordnung (DSGVO) und der anwendbaren nationalen Datenschutzgesetze.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>2.2 Informatorische Nutzung der Website</h3>
            <p>
              Bei der rein informatorischen Nutzung der Website – also wenn Sie sich weder registrieren noch uns anderweitig Informationen übermitteln – werden automatisch technische Daten erhoben, die Ihr Browser an unseren Server übermittelt. Diese Daten sind technisch notwendig, um Ihnen die Website korrekt auszuliefern, und werden vorübergehend in sogenannten Server-Log-Dateien gespeichert:
            </p>
            <ul>
              <li>IP-Adresse des anfragenden Geräts (anonymisiert)</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Zeitzone des anfragenden Systems</li>
              <li>Inhalt der Anfrage (aufgerufene Seite / Ressource)</li>
              <li>HTTP-Statuscode</li>
              <li>Übertragene Datenmenge</li>
              <li>Referrer-URL (zuvor besuchte Seite)</li>
              <li>Verwendeter Browser und Betriebssystem</li>
              <li>Sprache und Version der Browsersoftware</li>
            </ul>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Gewährleistung eines stabilen, sicheren und optimierten Betriebs der Website. Die Daten werden nicht mit anderen Datenquellen zusammengeführt. Eine Weitergabe an Dritte findet nicht statt, es sei denn, es besteht eine gesetzliche Verpflichtung.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>2.3 Webhosting</h3>
            <p>
              Diese Website wird bei <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Beim Aufruf unserer Website erfasst Vercel automatisch technische Daten in Server-Log-Dateien, die Ihr Browser übermittelt (z. B. IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp). Diese Daten werden auf Servern von Vercel gespeichert, die sich auch außerhalb des EWR befinden können.
            </p>
            <p>
              Vercel hat sich zur Einhaltung der DSGVO verpflichtet und setzt EU-Standardvertragsklauseln (Standard Contractual Clauses, SCC) ein, um ein angemessenes Datenschutzniveau zu gewährleisten. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel:{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.
            </p>
            <p>
              Die Nutzung von Vercel erfolgt zum Zweck der sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>2.4 Technisch notwendige Cookies und localStorage</h3>
            <p>
              Unsere Website nutzt ausschließlich technisch notwendige Cookies sowie den lokalen Speicher (localStorage) Ihres Browsers. Diese dienen ausschließlich der Funktionalität der Website und speichern keine personenbezogenen Daten, die für Tracking oder Werbezwecke verwendet werden könnten.
            </p>
            <p>Folgende Einträge werden im localStorage abgelegt:</p>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>cookie-consent</strong>
                <span className="legal-badge active">Notwendig</span>
              </div>
              <p>Speichert Ihre Entscheidung zur Cookie-Einwilligung, um das Cookie-Banner bei erneutem Besuch nicht erneut anzuzeigen.</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">Speicherdauer:</span><span>Bis zur manuellen Löschung</span></div>
            </div>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>terminal-fs</strong>
                <span className="legal-badge active">Funktional</span>
              </div>
              <p>Speichert den Zustand des virtuellen Dateisystems der Terminal-Anwendung lokal im Browser.</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">Speicherdauer:</span><span>Bis zur manuellen Löschung</span></div>
            </div>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>streamdeck_settings_v2</strong>
                <span className="legal-badge active">Funktional</span>
              </div>
              <p>Speichert die vom Nutzer gewählten Einstellungen der Anwendung, z. B. Sprache, Erscheinungsbild und weitere Präferenzen.</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">Speicherdauer:</span><span>Bis zur manuellen Löschung</span></div>
            </div>
            <div className="legal-cookie-type">
              <div className="legal-type-header">
                <span className="legal-dot green" />
                <strong>control_center_settings_v1</strong>
                <span className="legal-badge active">Funktional</span>
              </div>
              <p>Speichert die Konfiguration des Kontrollzentrums (z. B. Helligkeit, Lautstärke und weitere Schnelleinstellungen).</p>
              <div className="legal-cookie-detail"><span className="legal-detail-label">Speicherdauer:</span><span>Bis zur manuellen Löschung</span></div>
            </div>
            <p>
              Die Rechtsgrundlage für die Verwendung technisch notwendiger Cookies und localStorage-Einträge ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht darin, Ihnen eine funktionsfähige, nutzerfreundliche Website bereitzustellen.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>2.5 Lokal eingebundene Schriftarten</h3>
            <p>
              Für die einheitliche Darstellung von Schriftarten nutzt diese Website lokal eingebundene Webfonts. Alle Schriftarten werden direkt vom eigenen Server geladen – es findet <strong>keine Verbindung zu externen Servern</strong> (z. B. Google Fonts) statt. Es werden keine Daten an Drittanbieter übermittelt.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>2.6 Lokal eingebundene Bibliotheken</h3>
            <p>
              Alle auf dieser Website verwendeten JavaScript-Bibliotheken und Frameworks werden lokal auf unserem eigenen Server gehostet und von dort geladen. Es werden <strong>keine externen CDN-Dienste</strong> (Content Delivery Networks) genutzt und somit keine Daten an externe Anbieter übertragen.
            </p>
          </section>

          <div className="legal-section-divider" />

          <section>
            <h3>2.7 Keine Drittanbieter-Tracking-Tools</h3>
            <p>
              Wir setzen auf dieser Website keine Analyse-, Tracking- oder Marketing-Tools von Drittanbietern ein. Es werden keine Daten an Dienste wie Google Analytics, Facebook Pixel oder vergleichbare Anbieter übermittelt. Die Website verwendet weder externe Tracking-Skripte noch Social-Media-Plugins, die Daten an Dritte weitergeben könnten.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>3. SSL/TLS-Verschlüsselung</h3>
            <p>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile Ihres Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in der Browserleiste. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>4. Online-Präsenzen in sozialen Netzwerken</h3>
            <p>
              Wir unterhalten eine Online-Präsenz auf der Plattform GitHub, um mit dort aktiven Nutzern, Entwicklern und Interessierten zu kommunizieren und über unsere Projekte und Leistungen zu informieren.
            </p>
            <p>
              Beim Aufruf unserer GitHub-Seite gelten die Datenschutzbestimmungen und Nutzungsbedingungen von GitHub Inc. (bzw. GitHub B.V. für Nutzer im EWR). Wir verweisen auf die Datenschutzerklärung von GitHub: <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Datenschutzerklärung</a>.
            </p>
            <p>
              Wir verarbeiten die Daten der Nutzer unserer Online-Präsenz nur insoweit, als uns GitHub aggregierte Statistiken oder Interaktionsdaten bereitstellt. Eine eigenständige Erhebung personenbezogener Daten über GitHub findet durch uns nicht statt.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>5. Änderungen dieser Datenschutzerklärung</h3>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte Rechtslagen, technische Neuerungen oder Änderungen unseres Angebots anzupassen. Es gilt stets die zum Zeitpunkt Ihres Besuchs aktuelle Fassung. Wir empfehlen Ihnen, diese Datenschutzerklärung regelmäßig einzusehen.
            </p>
          </section>

          <div className="legal-major-divider" />

          <section>
            <h3>6. Fragen und Kommentare</h3>
            <p>
              Für Fragen, Anregungen oder Beschwerden zum Thema Datenschutz stehen wir Ihnen gerne zur Verfügung:
            </p>
            <div className="legal-contact-card">
              <p><strong>Felix Plattner</strong></p>
              <p>E-Mail: <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a></p>
            </div>
          </section>

          <p className="legal-last-updated">Stand: März 2026</p>
        </div>
      </div>
    </div>
  );
}
