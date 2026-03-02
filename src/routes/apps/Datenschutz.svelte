<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let popup = true;
    const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wrapper" class:popup-backdrop={popup} on:click|self={() => { if (popup) dispatch('close'); }} on:keydown={(e) => { if (popup && e.key === 'Escape') dispatch('close'); }}>
<div class="container" class:popup-mode={popup} class:embedded-mode={!popup}>
    <div class="glass-shine"></div>
    <div class="glass-caustic"></div>

    <div class="popup-header">
        <img style="width: 50px; height: 50px;" src="/icons/datenschutz.webp" alt="Datenschutz Icon" />
        <h2>Datenschutzerklärung</h2>
        {#if popup}
        <button class="close-btn" on:click={() => dispatch('close')}>✕</button>
        {/if}
    </div>

        <div class="popup-body">
            <section class="section-hero">
                <h3>1. Einleitung</h3>
                <p>
                    Im Folgenden informieren wir über die Verarbeitung
                    personenbezogener Daten bei der Nutzung unserer Website.
                    Personenbezogene Daten sind alle Daten, die auf eine
                    konkrete natürliche Person beziehbar sind, z.&nbsp;B. ihr
                    Name oder ihre IP-Adresse.
                </p>
            </section>
            <div class="section-divider"></div>
            <section>
                <h3>1.1 Kontaktdaten</h3>
                <p>
                    Verantwortlicher gem. Art. 4 Abs. 7 EU-Datenschutz-Grundverordnung
                    (DSGVO) sowie Art. 28 D.Lgs. 196/2003 (Codice in materia di
                    protezione dei dati personali) ist:
                </p>
                <div class="contact-card">
                    <p>
                        <strong>Felix Plattner</strong><br>
                        Stramge 12<br>
                        Südtirol, Italien
                    </p>
                    <p>
                        E-Mail:
                        <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a><br>
                        Telefon: +39 389 880 6833
                    </p>
                </div>
                <p>
                    Da es sich um ein privates, nicht-kommerzielles Projekt
                    handelt, ist die Benennung eines Datenschutzbeauftragten
                    gemäß Art. 37 DSGVO nicht erforderlich. Für
                    datenschutzrechtliche Anfragen steht Ihnen der
                    Verantwortliche direkt unter den oben genannten
                    Kontaktdaten zur Verfügung.
                </p>
            </section>
            <section>
                <h3>1.2 Umfang der Datenverarbeitung, Verarbeitungszwecke und Rechtsgrundlagen</h3>
                <p>
                    Den Umfang der Verarbeitung der Daten, Verarbeitungszwecke
                    und Rechtsgrundlagen führen wir im Detail weiter unten aus.
                    Als Rechtsgrundlage für eine Datenverarbeitung kommen
                    grundsätzlich die folgenden in Betracht:
                </p>
                <ul>
                    <li>
                        <strong>Art. 6 Abs. 1 S. 1 lit. a DSGVO</strong> dient
                        als Rechtsgrundlage für Verarbeitungsvorgänge, für die
                        wir eine Einwilligung einholen (z.&nbsp;B.
                        Cookie-Einwilligung).
                    </li>
                    <li>
                        <strong>Art. 6 Abs. 1 S. 1 lit. b DSGVO</strong> ist
                        Rechtsgrundlage, soweit die Verarbeitung
                        personenbezogener Daten zur Erfüllung eines Vertrages
                        erforderlich ist. Diese Rechtsgrundlage gilt auch für
                        vorvertragliche Maßnahmen.
                    </li>
                    <li>
                        <strong>Art. 6 Abs. 1 S. 1 lit. c DSGVO</strong> findet
                        Anwendung, wenn wir mit der Verarbeitung
                        personenbezogener Daten eine rechtliche Verpflichtung
                        erfüllen.
                    </li>
                    <li>
                        <strong>Art. 6 Abs. 1 S. 1 lit. f DSGVO</strong> dient
                        als Rechtsgrundlage, wenn wir uns zur Verarbeitung
                        personenbezogener Daten auf berechtigte Interessen
                        berufen, z.&nbsp;B. für den technischen Betrieb unserer
                        Website.
                    </li>
                </ul>
                <p>
                    Ergänzend gelten die Bestimmungen des italienischen
                    Datenschutzgesetzes (D.Lgs. 196/2003, aktualisiert durch
                    D.Lgs. 101/2018 zur Anpassung an die DSGVO) sowie die
                    Richtlinien des Garante per la protezione dei dati
                    personali.
                </p>
            </section>
            <div class="section-divider"></div>
            <section>
                <h3>1.3 Datenverarbeitung außerhalb des EWR</h3>
                <p>
                    Soweit wir Daten an Dienstleister oder sonstige Dritte
                    außerhalb des EWR übermitteln, garantieren
                    Angemessenheitsbeschlüsse der EU-Kommission nach Art. 45
                    Abs. 3 DSGVO die Sicherheit der Daten bei der
                    Weitergabe, soweit diese vorhanden sind.
                </p>
                <p>
                    In anderen Fällen sind Rechtsgrundlage für die
                    Datenweitergabe im Regelfall Standardvertragsklauseln.
                    Diese sind ein von der EU-Kommission verabschiedetes
                    Regelwerk und Teil des Vertrags mit dem jeweiligen
                    Dritten. Nach Art. 46 Abs. 2 lit. c DSGVO
                    gewährleisten sie die Sicherheit der Datenweitergabe.
                </p>
                <p>
                    Zum Zeitpunkt dieser Erklärung werden auf unserer Website
                    keine Daten an Stellen außerhalb des EWR übermittelt.
                    Alle eingesetzten Bibliotheken werden lokal eingebunden
                    und verursachen keine Drittlandübermittlung.
                </p>
            </section>
            <section>
                <h3>1.4 Speicherdauer</h3>
                <p>
                    Sofern nicht im Rahmen dieser Datenschutzerklärung
                    ausdrücklich angegeben, werden die bei uns gespeicherten
                    Daten gelöscht, sobald sie für ihre Zweckbestimmung nicht
                    mehr erforderlich sind und der Löschung keine
                    gesetzlichen Aufbewahrungspflichten entgegenstehen.
                </p>
                <p>
                    Sofern die Daten nicht gelöscht werden, weil sie für
                    andere und gesetzlich zulässige Zwecke erforderlich sind,
                    wird ihre Verarbeitung eingeschränkt, d.&nbsp;h. die
                    Daten werden gesperrt und nicht für andere Zwecke
                    verarbeitet.
                </p>
            </section>
            <div class="section-divider"></div>
            <section>
                <h3>1.5 Rechte der Betroffenen</h3>
                <p>
                    Betroffene haben gegenüber uns folgende Rechte hinsichtlich
                    der sie betreffenden personenbezogenen Daten:
                </p>
                <ul>
                    <li><strong>Recht auf Auskunft</strong> (Art. 15 DSGVO) – Sie können Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten verlangen.</li>
                    <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO) – Sie haben das Recht auf Korrektur unrichtiger oder unvollständiger Daten.</li>
                    <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO) – Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht.</li>
                    <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO) – Unter bestimmten Voraussetzungen können Sie die eingeschränkte Verarbeitung Ihrer Daten verlangen.</li>
                    <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO) – Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
                    <li><strong>Recht auf Widerspruch</strong> (Art. 21 DSGVO) – Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen, sofern diese auf berechtigten Interessen beruht.</li>
                    <li><strong>Recht auf Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) – Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.</li>
                </ul>
                <p>
                    Zur Ausübung dieser Rechte genügt eine formlose
                    Mitteilung per E-Mail an
                    <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a>.
                </p>
                <p>
                    Betroffene haben zudem das Recht, sich bei einer
                    Datenschutz-Aufsichtsbehörde über die Verarbeitung ihrer
                    personenbezogenen Daten zu beschweren. Die in Italien
                    zuständige Aufsichtsbehörde ist:
                </p>
                <div class="contact-card">
                    <p>
                        <strong>Garante per la protezione dei dati personali</strong><br>
                        Piazza Venezia 11<br>
                        00187 Roma, Italien<br>
                        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">www.garanteprivacy.it</a>
                    </p>
                </div>
            </section>
            <section>
                <h3>1.6 Pflicht zur Bereitstellung von Daten</h3>
                <p>
                    Besucher unserer Website müssen uns nur diejenigen
                    personenbezogenen Daten bereitstellen, die für die Nutzung
                    der Website technisch erforderlich sind (z.&nbsp;B.
                    IP-Adresse bei Seitenaufruf). Ohne diese Daten können
                    wir die Website nicht bereitstellen.
                </p>
                <p>
                    Darüber hinausgehende Daten (z.&nbsp;B. bei
                    Kontaktaufnahme per E-Mail) sind freiwillig.
                    Pflichtangaben sind als solche gekennzeichnet.
                </p>
            </section>
            <section>
                <h3>1.7 Keine automatische Entscheidungsfindung im Einzelfall</h3>
                <p>
                    Wir nutzen keine vollautomatisierte Entscheidungsfindung
                    gemäß Artikel 22 DSGVO. Es findet kein Profiling statt.
                    Sollten wir diese Verfahren in Einzelfällen einsetzen,
                    werden wir hierüber gesondert informieren, sofern dies
                    gesetzlich geboten ist.
                </p>
            </section>
            <section>
                <h3>1.8 Kontaktaufnahme</h3>
                <p>
                    Bei der Kontaktaufnahme mit uns, z.&nbsp;B. per E-Mail
                    oder Telefon, werden die uns mitgeteilten Daten (z.&nbsp;B.
                    Namen und E-Mail-Adressen) von uns gespeichert, um Fragen
                    zu beantworten. Rechtsgrundlage für die Verarbeitung ist
                    unser berechtigtes Interesse (Art. 6 Abs. 1 S. 1 lit. f
                    DSGVO), an uns gerichtete Anfragen zu beantworten.
                </p>
                <p>
                    Die in diesem Zusammenhang anfallenden Daten löschen wir,
                    nachdem die Speicherung nicht mehr erforderlich ist, oder
                    schränken die Verarbeitung ein, falls gesetzliche
                    Aufbewahrungspflichten bestehen.
                </p>
            </section>

            <div class="major-divider"></div>

            <section class="section-hero">
                <h3>2. Datenverarbeitung auf unserer Website</h3>
            </section>
            <section>
                <h3>2.1 Hinweis für Websitebesucher aus der EU</h3>
                <p>
                    Unsere Website speichert Informationen in der
                    Endeinrichtung von Websitebesuchern (z.&nbsp;B. Cookies,
                    localStorage) oder greift auf Informationen zu, die
                    bereits in der Endeinrichtung gespeichert sind (z.&nbsp;B.
                    IP-Adressen). Welche Informationen dies im Einzelnen sind,
                    ist den folgenden Abschnitten zu entnehmen.
                </p>
                <p>
                    Diese Speicherung und dieser Zugriff erfolgt auf
                    Grundlage der folgenden Bestimmungen:
                </p>
                <ul>
                    <li>
                        Soweit diese Speicherung oder dieser Zugriff unbedingt
                        erforderlich ist, damit wir den von Websitebesuchern
                        ausdrücklich gewünschten Dienst unserer Website zur
                        Verfügung stellen (z.&nbsp;B. zur Sicherstellung der
                        IT-Sicherheit oder zur Speicherung der
                        Cookie-Einwilligung), erfolgt sie auf Grundlage von
                        Art. 5 Abs. 3 der ePrivacy-Richtlinie 2002/58/EG
                        (umgesetzt in Italien durch Art. 122 D.Lgs. 196/2003).
                    </li>
                    <li>
                        Im Übrigen erfolgt diese Speicherung oder dieser
                        Zugriff auf Grundlage der Einwilligung der
                        Websitebesucher.
                    </li>
                </ul>
                <p>
                    Die nachgelagerte Datenverarbeitung erfolgt nach Maßgabe
                    der folgenden Abschnitte und auf Grundlage der
                    Vorschriften der DSGVO.
                </p>
            </section>
            <section>
                <h3>2.2 Informatorische Nutzung der Website</h3>
                <p>
                    Bei der informatorischen Nutzung der Website, also wenn
                    Seitenbesucher uns nicht gesondert Informationen
                    übermitteln, erheben wir die personenbezogenen Daten,
                    die der Browser an unseren Server übermittelt, um die
                    Stabilität und Sicherheit unserer Website zu
                    gewährleisten. Darin liegt unser berechtigtes Interesse,
                    so dass Rechtsgrundlage Art. 6 Abs. 1 S. 1 lit. f DSGVO
                    ist.
                </p>
                <p>Diese Daten sind:</p>
                <ul>
                    <li>IP-Adresse</li>
                    <li>Datum und Uhrzeit der Anfrage</li>
                    <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
                    <li>Inhalt der Anfrage (konkrete Seite)</li>
                    <li>Zugriffsstatus/HTTP-Statuscode</li>
                    <li>Jeweils übertragene Datenmenge</li>
                    <li>Website, von der die Anfrage kommt (Referrer-URL)</li>
                    <li>Browser (Typ, Version und Spracheinstellung)</li>
                    <li>Betriebssystem und dessen Oberfläche</li>
                    <li>Sprache und Version der Browsersoftware</li>
                </ul>
                <p>
                    Diese Daten werden außerdem in Logfiles gespeichert. Sie
                    werden gelöscht, wenn ihre Speicherung nicht mehr
                    erforderlich ist, spätestens nach 14 Tagen. Eine
                    Zusammenführung dieser Daten mit anderen Datenquellen
                    erfolgt nicht.
                </p>
            </section>
            <section>
                <h3>2.3 Webhosting und Bereitstellung der Website</h3>
                <p>
                    Unsere Website wird über externe Hosting-Dienste
                    bereitgestellt. Die personenbezogenen Daten, die auf
                    dieser Website erfasst werden, werden auf den Servern des
                    Hosting-Anbieters gespeichert. Hierbei handelt es sich
                    insbesondere um die unter Abschnitt 2.2 genannten Daten.
                </p>
                <p>
                    Es ist unser berechtigtes Interesse, eine Website zur
                    Verfügung zu stellen, so dass die Rechtsgrundlage der
                    beschriebenen Datenverarbeitung Art. 6 Abs. 1 S. 1 lit.
                    f DSGVO ist.
                </p>
                <p>
                    Der Einsatz des Hosting-Anbieters erfolgt im Interesse
                    einer sicheren, schnellen und effizienten Bereitstellung
                    unseres Onlineangebots. Soweit ein
                    Auftragsverarbeitungsvertrag geschlossen wurde, erfolgt
                    die Verarbeitung auf Grundlage von Art. 28 DSGVO.
                </p>
            </section>
            <div class="section-divider"></div>
            <section>
                <h3>2.4 Technisch notwendige Cookies und localStorage</h3>
                <p>
                    Unsere Website setzt Cookies und nutzt den localStorage
                    Ihres Browsers. Cookies sind kleine Textdateien, die im
                    Webbrowser auf dem Endgerät eines Seitenbesuchers
                    gespeichert werden. Der localStorage ist ein
                    Browser-Speicher, der Daten dauerhaft auf Ihrem
                    Endgerät speichert, bis Sie sie manuell löschen.
                </p>
                <p>
                    Soweit diese Speicherungen für den Betrieb unserer
                    Website oder ihre Funktionen erforderlich sind, ist
                    Rechtsgrundlage der damit verbundenen Datenverarbeitung
                    Art. 6 Abs. 1 S. 1 lit. f DSGVO. Wir haben ein
                    berechtigtes Interesse, Nutzern eine funktionsfähige
                    Website zur Verfügung zu stellen.
                </p>
                <p>
                    Konkret speichern wir folgende Daten im localStorage
                    zu den genannten Zwecken:
                </p>
                <ul>
                    <li><strong>cookie-consent</strong> – Speichert Ihre Cookie-Einstellung (accepted/declined). Ohne Ablauf, bis zur manuellen Löschung.</li>
                    <li><strong>terminal-fs</strong> – Speichert den Zustand des simulierten Terminal-Dateisystems für ein konsistentes Nutzererlebnis.</li>
                    <li><strong>installed-apps</strong> – Speichert die Liste installierter Anwendungen im simulierten App Store.</li>
                    <li><strong>header-config</strong> – Speichert Einstellungen der Desktop-Oberfläche (z.&nbsp;B. Kontrollzentrum-Konfiguration).</li>
                </ul>
                <p>
                    Diese Daten werden ausschließlich lokal in Ihrem Browser
                    gespeichert und nicht an unsere Server oder Dritte
                    übermittelt. Sie können den localStorage jederzeit über
                    die Entwicklertools Ihres Browsers (F12 → Application →
                    Local Storage) einsehen und löschen.
                </p>
            </section>
            <section>
                <h3>2.5 Lokal eingebundene Schriftarten</h3>
                <p>
                    Diese Website verwendet die Schriftart „Inter" von Rasmus
                    Andersson (lizenziert unter der SIL Open Font License 1.1).
                    Die Schriftart wird lokal auf unserem eigenen Server
                    gehostet und von dort geladen.
                </p>
                <p>
                    Es findet keine Verbindung zu externen
                    Schriftarten-Diensten (wie z.&nbsp;B. Google Fonts)
                    statt. Es werden daher keine Daten an Dritte
                    übertragen, wenn Sie unsere Website besuchen.
                </p>
            </section>
            <section>
                <h3>2.6 Lokal eingebundene Bibliotheken</h3>
                <p>
                    Für die 3D-Darstellung auf unserer Website setzen wir die
                    Open-Source-Bibliothek Three.js ein. Diese Bibliothek wird
                    als Teil unseres Anwendungsbundles lokal ausgeliefert und
                    nicht von einem externen CDN (Content Delivery Network)
                    geladen.
                </p>
                <p>
                    Ebenso werden alle weiteren JavaScript-Bibliotheken und
                    Frameworks (SvelteKit, Popmotion) lokal eingebunden. Es
                    findet zu keinem Zeitpunkt eine automatische Verbindung
                    zu externen Paketquellen oder CDN-Servern statt.
                </p>
            </section>
            <div class="section-divider"></div>
            <section>
                <h3>2.7 Keine Drittanbieter-Tracking-Tools</h3>
                <p>
                    Unsere Website setzt keine Analyse-, Tracking- oder
                    Marketing-Tools von Drittanbietern ein. Insbesondere
                    verwenden wir nicht:
                </p>
                <ul>
                    <li>Google Analytics oder sonstige Web-Analyse-Tools</li>
                    <li>Facebook Pixel, Meta Pixel oder vergleichbare Tracking-Pixel</li>
                    <li>Google Tag Manager oder ähnliche Tag-Management-Systeme</li>
                    <li>Retargeting- oder Remarketing-Dienste</li>
                    <li>Heatmap- oder Session-Recording-Dienste</li>
                </ul>
                <p>
                    Wir betreiben kein Tracking Ihres Nutzerverhaltens. Die
                    oben unter 2.2 beschriebenen Server-Logfiles dienen
                    ausschließlich der technischen Betriebssicherheit.
                </p>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>3. SSL- bzw. TLS-Verschlüsselung</h3>
                <p>
                    Diese Seite nutzt aus Sicherheitsgründen und zum Schutz
                    der Übertragung personenbezogener Daten eine SSL- bzw.
                    TLS-Verschlüsselung. Eine verschlüsselte Verbindung
                    erkennen Sie daran, dass die Adresszeile des Browsers
                    von „http://" auf „https://" wechselt und an dem
                    Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p>
                    Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist,
                    können die Daten, die Sie an uns übermitteln, nicht
                    von Dritten mitgelesen werden.
                </p>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>4. Online-Präsenzen auf Social-Media-Plattformen</h3>
                <p>
                    Wir sind in sozialen Netzwerken vertreten, um dort unser
                    Projekt vorzustellen. Die Betreiber dieser Netzwerke
                    verarbeiten Daten ihrer Nutzer regelmäßig zu
                    Werbezwecken. Unter anderem erstellen sie aus dem
                    Onlineverhalten Nutzerprofile, die beispielsweise dazu
                    verwendet werden, auf den Seiten der Netzwerke und auch
                    sonst im Internet Werbung zu zeigen, die den Interessen
                    der Nutzer entspricht.
                </p>
                <p>
                    Wenn Nutzer der Netzwerke mit uns über unsere Profile in
                    Kontakt treten, verarbeiten wir die uns mitgeteilten
                    Daten, um die Anfragen zu beantworten. Darin liegt unser
                    berechtigtes Interesse, so dass Rechtsgrundlage Art. 6
                    Abs. 1 S. 1 lit. f DSGVO ist.
                </p>
                <p>
                    <strong>GitHub</strong> – Wir unterhalten ein Profil auf
                    GitHub. Betreiber ist GitHub Inc., 88 Colin P Kelly Jr
                    Street, San Francisco, CA 94107, USA. Die
                    Datenschutzerklärung ist hier abrufbar:
                    <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub Privacy Statement</a>.
                </p>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>5. Änderungen dieser Datenschutzerklärung</h3>
                <p>
                    Wir behalten uns das Recht vor, diese
                    Datenschutzerklärung mit Wirkung für die Zukunft zu
                    ändern. Eine aktuelle Version ist jeweils auf dieser
                    Website verfügbar. Wir empfehlen, diese
                    Datenschutzerklärung regelmäßig zu lesen, um über den
                    Schutz Ihrer Daten informiert zu bleiben.
                </p>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>6. Fragen und Kommentare</h3>
                <p>
                    Für Fragen oder Kommentare bezüglich dieser
                    Datenschutzerklärung stehen wir gern unter den oben
                    angegebenen Kontaktdaten zur Verfügung.
                </p>
                <div class="contact-card">
                    <p>
                        <strong>Felix Plattner</strong><br>
                        Stramge 12<br>
                        Südtirol, Italien<br>
                        E-Mail:
                        <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a><br>
                        Telefon: +39 389 880 6833
                    </p>
                </div>
                <p class="last-updated">Stand: März 2026</p>
            </section>
        </div>
    </div>
</div>

<style>
    .popup-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(6px);
        z-index: 10000;
        display: grid;
        place-items: center;
        animation: fade-in 300ms ease;
    }

    .wrapper:not(.popup-backdrop) {
        display: contents;
    }

    .container {
        position: relative;
        color: #fff;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .popup-mode {
        width: 90%;
        max-width: 560px;
        max-height: 80vh;
        border-radius: 22px;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.08) 40%,
            rgba(200, 220, 255, 0.12) 70%,
            rgba(255, 255, 255, 0.06) 100%
        );
        backdrop-filter: blur(40px) saturate(1.8) brightness(1.08);
        -webkit-backdrop-filter: blur(40px) saturate(1.8) brightness(1.08);
        border: 0.5px solid rgba(255, 255, 255, 0.35);
        box-shadow:
            0 24px 80px rgba(0, 0, 0, 0.45),
            0 8px 32px rgba(0, 0, 0, 0.22),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.6),
            inset 0 -0.5px 0 rgba(255, 255, 255, 0.08);
        text-shadow: 0 0.5px 3px rgba(0, 0, 0, 0.18);
        animation: popup-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .embedded-mode {
        width: 100%;
        height: 100%;
        border-radius: 18px;
        background:
            radial-gradient(520px 260px at 20% 0%, rgba(0, 122, 255, 0.16), transparent 60%),
            radial-gradient(520px 260px at 80% 0%, rgba(255, 120, 210, 0.12), transparent 62%),
            rgba(14, 14, 18, 0.72);
        border: 1px solid rgba(255, 255, 255, 0.10);
        backdrop-filter: blur(18px) saturate(165%);
        box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .glass-shine {
        position: absolute;
        inset: -50% -20% auto -20%;
        height: 65%;
        background: linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0.01));
        transform: rotate(-5deg);
        opacity: 0.45;
        pointer-events: none;
        border-radius: 50%;
    }

    .embedded-mode .glass-shine { display: none; }

    .glass-caustic {
        position: absolute;
        inset: 0;
        background:
            radial-gradient(140px 80px at 80% 15%, rgba(255,255,255,0.25), transparent 70%),
            radial-gradient(200px 120px at 15% 85%, rgba(180,210,255,0.1), transparent 70%);
        opacity: 0.45;
        mix-blend-mode: screen;
        pointer-events: none;
    }

    .embedded-mode .glass-caustic { display: none; }

    .popup-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 24px 14px;
        position: relative;
        z-index: 1;
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.15);
        flex-shrink: 0;
    }

    .embedded-mode .popup-header {
        padding: 14px 20px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    }

    .popup-header img {
        border-radius: 10px;
        flex-shrink: 0;
    }

    .popup-header h2 {
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        letter-spacing: -0.2px;
        flex: 1;
    }

    .close-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 0.5px solid rgba(255, 255, 255, 0.18);
        color: rgba(255, 255, 255, 0.7);
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 13px;
        display: grid;
        place-items: center;
        transition: all 200ms ease;
        flex-shrink: 0;
    }

    .close-btn:hover {
        background: rgba(255, 255, 255, 0.22);
        color: #fff;
    }

    .popup-body {
        padding: 20px 24px 28px;
        overflow-y: auto;
        position: relative;
        z-index: 1;
        flex: 1;
        min-height: 0;
    }

    .popup-body::-webkit-scrollbar {
        width: 4px;
    }

    .popup-body::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 4px;
    }

    .popup-body::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.25);
    }

    section {
        margin-bottom: 20px;
    }

    section:last-child {
        margin-bottom: 0;
    }

    .section-hero h3 {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.3px;
        opacity: 1;
        margin-bottom: 8px;
    }

    section h3 {
        margin: 0 0 8px;
        font-size: 13.5px;
        font-weight: 650;
        opacity: 0.95;
        letter-spacing: -0.1px;
    }

    section p {
        margin: 0 0 8px;
        font-size: 12.5px;
        line-height: 1.65;
        opacity: 0.8;
        letter-spacing: 0.05px;
    }

    section a {
        color: #64b5f6;
        text-decoration: none;
        transition: color 150ms ease;
    }

    section a:hover {
        color: #90caf9;
        text-decoration: underline;
        text-underline-offset: 2px;
    }

    section ul {
        margin: 8px 0 10px;
        padding-left: 0;
        list-style: none;
        font-size: 12.5px;
        line-height: 1.65;
        opacity: 0.8;
    }

    section li {
        margin-bottom: 6px;
        padding-left: 16px;
        position: relative;
    }

    section li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 7px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(100, 181, 246, 0.6);
    }

    .section-divider {
        height: 0.5px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.12) 20%,
            rgba(255, 255, 255, 0.12) 80%,
            transparent
        );
        margin: 6px 0;
    }

    .major-divider {
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(100, 181, 246, 0.2) 15%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(100, 181, 246, 0.2) 85%,
            transparent
        );
        margin: 10px 0;
    }

    .contact-card {
        margin: 10px 0;
        padding: 12px 16px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 0.5px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
    }

    .contact-card p {
        margin: 0 0 4px;
    }

    .contact-card p:last-child {
        margin: 0;
    }

    .contact-card strong {
        opacity: 1;
        font-weight: 600;
    }

    .last-updated {
        text-align: center;
        font-size: 11px;
        opacity: 0.4;
        font-style: italic;
        margin-top: 12px;
        letter-spacing: 0.3px;
    }

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes popup-in {
        0% { opacity: 0; transform: scale(0.92) translateY(16px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
    }
</style>
