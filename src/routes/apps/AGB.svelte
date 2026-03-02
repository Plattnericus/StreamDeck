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
        <h2>Allgemeine Geschäftsbedingungen</h2>
        {#if popup}
        <button class="close-btn" on:click={() => dispatch('close')}>✕</button>
        {/if}
    </div>

        <div class="popup-body">
            <section>
                <p class="intro-text">
                    Allgemeine Geschäftsbedingungen für die Nutzung der Website
                    von Felix Plattner.
                </p>
            </section>

            <div class="major-divider"></div>

            <section class="section-hero">
                <h3>1. Allgemeines</h3>
                <p>
                    1.1 Die vorliegenden Allgemeinen Geschäftsbedingungen (AGB)
                    enthalten die zwischen Felix Plattner, Stramge 12,
                    Südtirol, Italien (im Folgenden „Betreiber") und dem
                    Nutzer (im Folgenden „Nutzer") ausschließlich geltenden
                    Bedingungen für die Nutzung der Website und aller damit
                    verbundenen Dienste.
                </p>
                <p>
                    1.2 Die Website wird als privates, nicht-kommerzielles
                    Portfolio- und Showcase-Projekt betrieben. Es handelt
                    sich nicht um ein gewerbliches Angebot. Auf der Website
                    werden keine Waren oder Dienstleistungen zum Kauf
                    angeboten.
                </p>
                <p>
                    1.3 Mit dem Zugriff auf die Website und der Nutzung der
                    angebotenen Dienste erkennen Sie diese AGB in ihrer
                    jeweils gültigen Fassung an. Abweichende Bedingungen des
                    Nutzers werden nicht anerkannt, es sei denn, der
                    Betreiber stimmt ihrer Geltung ausdrücklich schriftlich
                    zu.
                </p>
                <p>
                    1.4 Änderungen dieser Geschäftsbedingungen werden auf der
                    Website veröffentlicht. Es gilt die jeweils zum Zeitpunkt
                    der Nutzung auf der Website veröffentlichte Fassung.
                </p>
            </section>

            <div class="major-divider"></div>

            <section class="section-hero">
                <h3>2. Leistungsbeschreibung</h3>
                <p>
                    2.1 Der Betreiber stellt eine webbasierte Plattform bereit,
                    die ein macOS-ähnliches Desktop-Erlebnis im Browser
                    simuliert. Die Website enthält verschiedene interaktive
                    Anwendungen wie einen simulierten Browser, Terminal,
                    Finder, Galerie, 3D-Modell-Viewer, Einstellungen und
                    weitere Komponenten.
                </p>
                <p>
                    2.2 Art und Umfang der verfügbaren Dienste ergeben sich aus
                    der jeweiligen Beschreibung auf der Website zum Zeitpunkt
                    der Nutzung. Die Website dient ausschließlich zu
                    Demonstrations- und Präsentationszwecken.
                </p>
                <p>
                    2.3 Der Betreiber behält sich vor, das Angebot jederzeit
                    inhaltlich zu erweitern, zu ändern oder einzelne Bereiche
                    zeitweise oder dauerhaft einzustellen. Ein Anspruch auf
                    die Aufrechterhaltung bestimmter Funktionen oder Dienste
                    besteht nicht.
                </p>
                <p>
                    2.4 Bei digitalen Inhalten, die über die Website zugänglich
                    gemacht werden, räumt der Betreiber dem Nutzer ein nicht
                    ausschließliches, nicht übertragbares Recht ein, die
                    überlassenen Inhalte ausschließlich zu privaten Zwecken
                    zu nutzen. Eine Weitergabe der Inhalte an Dritte sowie
                    eine Vervielfältigung für Dritte ist nicht gestattet,
                    sofern keine Erlaubnis seitens des Betreibers erteilt
                    wurde.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>3. Zugang und Nutzerkonto</h3>
                <p>
                    3.1 Bestimmte Bereiche der Website können einen
                    Zugangsmechanismus erfordern (z.&nbsp;B. eine simulierte
                    Anmeldung). Dies dient der Demonstration und ist kein
                    reales Nutzerkonto im Sinne einer gewerblichen
                    Registrierung.
                </p>
                <p>
                    3.2 Soweit für die Nutzung bestimmter Dienste
                    Zugangsdaten erforderlich sind, sind diese vertraulich
                    zu behandeln und dürfen Dritten nicht zugänglich gemacht
                    werden.
                </p>
                <p>
                    3.3 Für sämtliche Aktivitäten, die unter Verwendung
                    Ihrer Zugangsdaten vorgenommen werden, tragen Sie die
                    Verantwortung. Bei Verdacht auf eine missbräuchliche
                    Nutzung sind Sie verpflichtet, den Betreiber
                    unverzüglich zu informieren.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>4. Pflichten des Nutzers</h3>
                <p>
                    4.1 Sie verpflichten sich, die Website ausschließlich zu
                    rechtmäßigen Zwecken zu nutzen. Insbesondere ist es
                    untersagt:
                </p>
                <ul>
                    <li>Inhalte zu verbreiten, die gegen geltendes Recht verstoßen oder Rechte Dritter verletzen</li>
                    <li>Schadsoftware, Viren oder vergleichbare technische Mittel einzusetzen oder zu verbreiten</li>
                    <li>Automatisierte Systeme (Bots, Scraper, Crawler o.&nbsp;ä.) ohne vorherige schriftliche Genehmigung des Betreibers einzusetzen</li>
                    <li>Die technische Infrastruktur der Website vorsätzlich zu überlasten, zu stören oder in ihrer Funktion zu beeinträchtigen</li>
                    <li>Sicherheitsmechanismen, Zugangskontrollen oder Schutzvorkehrungen zu umgehen, auszunutzen oder zu testen</li>
                    <li>Daten anderer Nutzer oder des Betreibers ohne Genehmigung zu erheben, zu speichern oder weiterzugeben</li>
                </ul>
                <p>
                    4.2 Bei einem Verstoß gegen diese Pflichten behält sich
                    der Betreiber das Recht vor, den Zugang zur Website zu
                    sperren und gegebenenfalls zivil- oder strafrechtliche
                    Ansprüche geltend zu machen.
                </p>
            </section>

            <div class="major-divider"></div>

            <section class="section-hero">
                <h3>5. Geistiges Eigentum und Urheberrecht</h3>
                <p>
                    5.1 Alle auf der Website veröffentlichten Inhalte –
                    einschließlich Texte, Grafiken, Logos, Icons, Bilder,
                    Audiodateien, Software, Quellcode und deren
                    Zusammenstellung – sind Eigentum des Betreibers oder der
                    jeweiligen Rechteinhaber und durch das italienische
                    Urheberrecht (Legge 22 aprile 1941, n. 633), das
                    europäische Urheberrecht sowie weitere Gesetze zum Schutz
                    geistigen Eigentums geschützt.
                </p>
                <p>
                    5.2 Ohne vorherige schriftliche Zustimmung des Betreibers
                    ist die Vervielfältigung, Verbreitung, Bearbeitung,
                    öffentliche Zugänglichmachung oder sonstige Verwertung
                    der Inhalte über den Rahmen der gesetzlich zulässigen
                    Privatnutzung hinaus nicht gestattet.
                </p>
                <p>
                    5.3 Downloads und Kopien dieser Seite sind nur für den
                    privaten, nicht kommerziellen Gebrauch gestattet. Soweit
                    die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                    wurden, werden die Urheberrechte Dritter beachtet und
                    Inhalte Dritter als solche gekennzeichnet.
                </p>
                <p>
                    5.4 Das Design der Website ist von Apple macOS inspiriert.
                    Alle Markenrechte an macOS und zugehörigen Designs liegen
                    bei Apple Inc. Dieses Projekt steht in keiner Verbindung
                    zu Apple Inc. und erhebt keinen Anspruch auf die
                    dargestellten Marken. Die Verwendung erfolgt
                    ausschließlich zu Demonstrations- und Lernzwecken.
                </p>
            </section>

            <div class="major-divider"></div>

            <section class="section-hero">
                <h3>6. Haftungsbeschränkung</h3>
                <p>
                    6.1 Die Inhalte dieser Website werden mit größtmöglicher
                    Sorgfalt erstellt. Der Betreiber übernimmt jedoch keine
                    Gewähr für die Richtigkeit, Vollständigkeit und
                    Aktualität der bereitgestellten Informationen.
                </p>
                <p>
                    6.2 Der Betreiber haftet nur für Schäden, die auf einer
                    vorsätzlichen oder grob fahrlässigen Pflichtverletzung
                    beruhen. Bei leichter Fahrlässigkeit haftet der
                    Betreiber nur bei Verletzung wesentlicher
                    Vertragspflichten (Kardinalpflichten), deren Erfüllung
                    die ordnungsgemäße Durchführung des Nutzungsverhältnisses
                    überhaupt erst ermöglicht, deren Verletzung die Erreichung
                    des Vertragszwecks gefährdet und auf deren Einhaltung ein
                    Nutzer regelmäßig vertraut. Im letztgenannten Fall haftet
                    der Betreiber jedoch nur für den vorhersehbaren,
                    vertragstypischen Schaden.
                </p>
                <p>
                    6.3 Die vorstehenden Haftungsausschlüsse gelten nicht bei
                    Verletzung von Leben, Körper und Gesundheit. Die Haftung
                    nach dem Produkthaftungsgesetz (italienisches D.P.R.
                    224/1988 bzw. D.Lgs. 206/2005 – Codice del Consumo)
                    bleibt unberührt.
                </p>
                <p>
                    6.4 Die Datenkommunikation über das Internet kann nach dem
                    derzeitigen Stand der Technik nicht fehlerfrei und/oder
                    jederzeit verfügbar gewährleistet werden. Der Betreiber
                    haftet insoweit weder für die ständige und
                    ununterbrochene Verfügbarkeit der Website noch für
                    technisch bedingte Ausfälle.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>7. Verfügbarkeit</h3>
                <p>
                    7.1 Der Betreiber ist bestrebt, die Website möglichst
                    unterbrechungsfrei verfügbar zu halten. Wartungsarbeiten,
                    Weiterentwicklungen, Sicherheitsupdates oder Störungen
                    können jedoch zu zeitweisen Einschränkungen oder
                    Unterbrechungen führen.
                </p>
                <p>
                    7.2 Ein Anspruch auf ununterbrochene Erreichbarkeit oder
                    eine bestimmte Verfügbarkeitsquote besteht nicht. Der
                    Betreiber wird Wartungsarbeiten nach Möglichkeit in
                    nutzungsarme Zeiten legen.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>8. Links zu externen Websites</h3>
                <p>
                    8.1 Diese Website kann Verknüpfungen (Hyperlinks) zu
                    Websites Dritter enthalten. Der Betreiber hat keinen
                    Einfluss auf die dortigen Inhalte und übernimmt daher
                    keine Gewähr für deren Richtigkeit, Vollständigkeit oder
                    Aktualität.
                </p>
                <p>
                    8.2 Für die Inhalte der verlinkten Seiten ist stets der
                    jeweilige Anbieter oder Betreiber der Seiten
                    verantwortlich. Die verlinkten Seiten wurden zum
                    Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                    überprüft. Rechtswidrige Inhalte waren zu diesem
                    Zeitpunkt nicht erkennbar.
                </p>
                <p>
                    8.3 Eine permanente inhaltliche Kontrolle der verlinkten
                    Seiten ist jedoch ohne konkrete Anhaltspunkte einer
                    Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                    Rechtsverletzungen werden wir derartige Links umgehend
                    entfernen.
                </p>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>9. Datenschutz</h3>
                <p>
                    9.1 Hinweise zur Erhebung und Verarbeitung
                    personenbezogener Daten entnehmen Sie bitte unserer
                    Datenschutzerklärung. Diese ist über die entsprechende
                    Verlinkung auf der Website jederzeit abrufbar.
                </p>
                <p>
                    9.2 Die Verarbeitung personenbezogener Daten erfolgt
                    auf Grundlage der Europäischen
                    Datenschutz-Grundverordnung (EU) 2016/679 (DSGVO)
                    sowie der italienischen Datenschutzgesetzgebung
                    (D.Lgs. 196/2003, aktualisiert durch D.Lgs. 101/2018).
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>10. Änderung der AGB</h3>
                <p>
                    10.1 Der Betreiber behält sich vor, diese AGB jederzeit
                    und ohne gesonderte Ankündigung zu ändern. Es gilt die
                    jeweils zum Zeitpunkt der Nutzung auf der Website
                    veröffentlichte Fassung.
                </p>
                <p>
                    10.2 Bei wesentlichen Änderungen werden Nutzer in
                    geeigneter Weise informiert, z.&nbsp;B. durch einen
                    Hinweis auf der Website.
                </p>
            </section>

            <div class="major-divider"></div>

            <section class="section-hero">
                <h3>11. Anwendbares Recht und Gerichtsstand</h3>
                <p>
                    11.1 Es gilt das Recht der Italienischen Republik unter
                    Berücksichtigung der Verordnung (EU) 2016/679 (DSGVO)
                    und des UN-Kaufrechts, soweit dieses anwendbar ist.
                    Zwingende Bestimmungen des Staates, in dem ein
                    Verbraucher seinen gewöhnlichen Aufenthalt hat, bleiben
                    unberührt.
                </p>
                <p>
                    11.2 Soweit ein Verbraucher bei Nutzung der Website
                    seinen Wohnsitz oder gewöhnlichen Aufenthalt in einem
                    Mitgliedsstaat der Europäischen Union hat, ist der
                    Gerichtsstand am Wohnsitz des Verbrauchers gegeben.
                </p>
                <p>
                    11.3 Handelt es sich bei dem Nutzer nicht um einen
                    Verbraucher, ist ausschließlicher Gerichtsstand für alle
                    Streitigkeiten aus dem oder im Zusammenhang mit dem
                    Nutzungsverhältnis der Wohnsitz des Betreibers in
                    Südtirol, Italien.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>12. EU-Streitschlichtung</h3>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur
                    Online-Streitbeilegung (OS) bereit, die Sie unter
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>
                    finden. Wir nehmen nicht an einem
                    Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teil.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>13. Salvatorische Klausel</h3>
                <p>
                    Sollten einzelne Bestimmungen dieses Vertrages unwirksam
                    sein oder den gesetzlichen Regelungen widersprechen, so
                    wird hierdurch der Vertrag im Übrigen nicht berührt. Die
                    unwirksame Bestimmung wird von den Vertragsparteien
                    einvernehmlich durch eine rechtswirksame Bestimmung
                    ersetzt, welche dem wirtschaftlichen Sinn und Zweck der
                    unwirksamen Bestimmung am nächsten kommt. Die
                    vorstehende Regelung gilt entsprechend bei
                    Regelungslücken.
                </p>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>14. Kontakt</h3>
                <p>
                    Bei Fragen oder Anliegen zu diesen AGB steht Ihnen der
                    Betreiber unter folgenden Kontaktdaten zur Verfügung:
                </p>
                <div class="contact-card">
                    <p>
                        <strong>Felix Plattner</strong><br>
                        Stramge 12<br>
                        Südtirol, Italien<br>
                        E-Mail:
                        <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a><br>
                        Telefon: +39 389 880 6833<br>
                        GitHub:
                        <a href="https://github.com/Plattnericus" target="_blank" rel="noopener">github.com/Plattnericus</a>
                    </p>
                </div>
            </section>

            <section>
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

    .intro-text {
        font-size: 13px;
        opacity: 0.9;
        font-weight: 500;
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
