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
        <h2>Impressum</h2>
        {#if popup}
        <button class="close-btn" on:click={() => dispatch('close')}>✕</button>
        {/if}
    </div>

        <div class="popup-body">
            <section>
                <p class="intro-text">
                    Diese Website wird betrieben von Felix Plattner als
                    privates, nicht-kommerzielles Portfolio- und Showcase-Projekt.
                </p>
            </section>

            <div class="major-divider"></div>

            <section class="section-hero">
                <h3>Geschäftsangaben</h3>
                <p>
                    Angaben gemäß Art. 2 D.Lgs. 70/2003 (Decreto legislativo 9 aprile 2003, n. 70)
                    sowie Art. 5 TMG:
                </p>
                <div class="contact-card">
                    <p>
                        <strong>Felix Plattner</strong><br>
                        Stramge 12<br>
                        Südtirol, Italien
                    </p>
                </div>
                <p>
                    Diese Website wird als privates, nicht-kommerzielles Projekt
                    betrieben. Es handelt sich nicht um eine gewerbliche Tätigkeit
                    im Sinne des italienischen Handelsrechts. Eine
                    Umsatzsteuer-Identifikationsnummer ist daher nicht erforderlich.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Kontakt</h3>
                <p>
                    E-Mail:
                    <a href="mailto:felix.plattner89@plattnericus.dev">felix.plattner89@plattnericus.dev</a><br>
                    Telefon: +39 389 880 6833
                </p>
                <p>
                    Wir bitten um Verständnis, dass telefonische Anfragen
                    nur zu den üblichen Geschäftszeiten (Mo–Fr 09:00–17:00 Uhr MEZ)
                    entgegengenommen werden können.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Online-Präsenzen</h3>
                <p>
                    Dieses Projekt ist zusätzlich auf folgenden Plattformen vertreten:
                </p>
                <ul>
                    <li>GitHub: <a href="https://github.com/Plattnericus" target="_blank" rel="noopener">github.com/Plattnericus</a></li>
                </ul>
                <p>
                    Die dort geltenden Nutzungsbedingungen und Datenschutzrichtlinien
                    der jeweiligen Plattformbetreiber finden Anwendung.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Verantwortlich für den Inhalt</h3>
                <p>
                    Verantwortlich für den Inhalt nach Art. 18 Abs. 2 MStV
                    (Medienstaatsvertrag) sowie Art. 5 TMG
                    (Telemediengesetz):
                </p>
                <div class="contact-card">
                    <p>
                        <strong>Felix Plattner</strong><br>
                        Stramge 12<br>
                        Südtirol, Italien
                    </p>
                </div>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>EU-Streitschlichtung</h3>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur
                    Online-Streitbeilegung (OS) bereit, die Sie unter
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>
                    finden.
                </p>
                <p>
                    Unsere E-Mail-Adresse entnehmen Sie dem obigen
                    Impressum. Wir sind weder verpflichtet noch bereit,
                    an einem Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </section>

            <div class="major-divider"></div>

            <section class="section-hero">
                <h3>Haftung für Inhalte</h3>
                <p>
                    Als Diensteanbieter sind wir gemäß Art. 7 Abs. 1
                    D.Lgs. 70/2003 bzw. § 7 Abs. 1 TMG für eigene Inhalte
                    auf diesen Seiten nach den allgemeinen Gesetzen
                    verantwortlich. Nach Art. 14–16 D.Lgs. 70/2003 bzw.
                    §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
                    nicht verpflichtet, übermittelte oder gespeicherte
                    fremde Informationen zu überwachen oder nach
                    Umständen zu forschen, die auf eine rechtswidrige
                    Tätigkeit hinweisen.
                </p>
                <p>
                    Verpflichtungen zur Entfernung oder Sperrung der
                    Nutzung von Informationen nach den allgemeinen
                    Gesetzen bleiben hiervon unberührt. Eine
                    diesbezügliche Haftung ist jedoch erst ab dem
                    Zeitpunkt der Kenntnis einer konkreten
                    Rechtsverletzung möglich. Bei Bekanntwerden von
                    entsprechenden Rechtsverletzungen werden wir diese
                    Inhalte umgehend entfernen.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Haftung für Links</h3>
                <p>
                    Unser Angebot enthält Links zu externen Websites
                    Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Deshalb können wir für diese fremden Inhalte auch
                    keine Gewähr übernehmen. Für die Inhalte der
                    verlinkten Seiten ist stets der jeweilige Anbieter
                    oder Betreiber der Seiten verantwortlich. Die
                    verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
                    auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                    Inhalte waren zum Zeitpunkt der Verlinkung nicht
                    erkennbar.
                </p>
                <p>
                    Eine permanente inhaltliche Kontrolle der verlinkten
                    Seiten ist jedoch ohne konkrete Anhaltspunkte einer
                    Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                    Rechtsverletzungen werden wir derartige Links umgehend
                    entfernen.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Urheberrecht</h3>
                <p>
                    Die durch den Seitenbetreiber erstellten Inhalte und
                    Werke auf diesen Seiten unterliegen dem italienischen
                    Urheberrecht (Legge 22 aprile 1941, n. 633 – Legge
                    sul diritto d'autore) sowie dem europäischen
                    Urheberrecht. Die Vervielfältigung, Bearbeitung,
                    Verbreitung und jede Art der Verwertung außerhalb der
                    Grenzen des Urheberrechtes bedürfen der schriftlichen
                    Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
                <p>
                    Downloads und Kopien dieser Seite sind nur für den
                    privaten, nicht kommerziellen Gebrauch gestattet.
                    Soweit die Inhalte auf dieser Seite nicht vom
                    Betreiber erstellt wurden, werden die Urheberrechte
                    Dritter beachtet. Insbesondere werden Inhalte Dritter
                    als solche gekennzeichnet. Sollten Sie trotzdem auf
                    eine Urheberrechtsverletzung aufmerksam werden,
                    bitten wir um einen entsprechenden Hinweis. Bei
                    Bekanntwerden von Rechtsverletzungen werden wir
                    derartige Inhalte umgehend entfernen.
                </p>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>Bildnachweise und Lizenzen</h3>
                <p>
                    Die auf dieser Website verwendeten Grafiken, Icons und
                    Bildelemente stammen zum Teil aus frei verfügbaren
                    Quellen oder wurden eigens für dieses Projekt
                    erstellt. Soweit Werke Dritter verwendet werden,
                    geschieht dies unter Beachtung der jeweiligen
                    Lizenzbestimmungen.
                </p>
                <p>
                    Die Website nutzt die Schriftart „Inter" von Rasmus
                    Andersson, lizenziert unter der SIL Open Font License 1.1.
                    Die Einbindung erfolgt lokal über eigene Server – es
                    findet keine Verbindung zu externen Schriftarten-Diensten statt.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Technologie und Design</h3>
                <p>
                    Diese Website wurde mit SvelteKit entwickelt und enthält
                    interaktive Elemente, die ein macOS-ähnliches
                    Desktop-Erlebnis simulieren. Die Gestaltung ist von
                    Apple macOS inspiriert. Alle Markenrechte an macOS und
                    zugehörigen Designs liegen bei Apple Inc. Dieses Projekt
                    steht in keiner Verbindung zu Apple Inc. und erhebt keinen
                    Anspruch auf die abgebildeten Marken.
                </p>
                <p>
                    Für die 3D-Darstellung kommt die Open-Source-Bibliothek
                    Three.js zum Einsatz. Die Bibliothek wird lokal geladen –
                    es findet keine Verbindung zu externen CDN-Servern statt.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Anwendbares Recht</h3>
                <p>
                    Dieses Impressum richtet sich nach dem italienischen
                    Recht, insbesondere dem D.Lgs. 70/2003 (Attuazione
                    della direttiva 2000/31/CE), sowie der Verordnung
                    (EU) 2016/679 (DSGVO). Ergänzend gelten die
                    Bestimmungen des Telemediengesetzes (TMG) und des
                    Medienstaatsvertrags (MStV), soweit diese für
                    deutschsprachige Inhalte relevant sind.
                </p>
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
