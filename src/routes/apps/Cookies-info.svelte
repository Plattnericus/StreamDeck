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
        <img style="width: 50px; height: 50px;" src="/icons/cookies.png" alt="Cookie Icon"/>
        <h2>Cookies – Mehr erfahren</h2>
        {#if popup}
        <button class="close-btn" on:click={() => dispatch('close')}>✕</button>
        {/if}
    </div>

        <div class="popup-body">
            <section>
                <h3>Was sind Cookies?</h3>
                <p>
                    Cookies sind kleine Textdateien, die beim Besuch einer Website
                    auf Ihrem Endgerät abgelegt werden. Sie erlauben es, Ihre
                    Einstellungen und Präferenzen zu speichern, die Nutzung der
                    Website auszuwerten und Ihnen ein auf Ihre Bedürfnisse
                    abgestimmtes Erlebnis zu bieten.
                </p>
                <p>
                    Cookies richten auf Ihrem Gerät keinen Schaden an und enthalten
                    keine Schadsoftware. Sie können jederzeit über Ihre
                    Browser-Einstellungen verwaltet oder gelöscht werden.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Welche Cookies setzen wir ein?</h3>

                <div class="cookie-type">
                    <div class="type-header">
                        <span class="dot green"></span>
                        <strong>Notwendige Cookies</strong>
                        <span class="badge active">Immer aktiv</span>
                    </div>
                    <p>
                        Diese Cookies sind für den Betrieb der Website unerlässlich.
                        Sie stellen sicher, dass grundlegende Funktionen wie
                        Seitennavigation, Zugriff auf geschützte Bereiche und
                        Sicherheitsfeatures zuverlässig arbeiten. Ohne diese Cookies
                        kann die Website nicht ordnungsgemäß angezeigt oder genutzt
                        werden. Sie speichern keine personenbezogenen Daten, die
                        für Marketingzwecke verwendet werden.
                    </p>
                    <div class="cookie-detail">
                        <span class="detail-label">Beispiel:</span>
                        <span>cookie-consent (speichert Ihre Cookie-Einstellung)</span>
                    </div>
                    <div class="cookie-detail">
                        <span class="detail-label">Speicherdauer:</span>
                        <span>Bis zur manuellen Löschung durch den Nutzer</span>
                    </div>
                </div>

                <div class="cookie-type">
                    <div class="type-header">
                        <span class="dot blue"></span>
                        <strong>Analyse &amp; Performance</strong>
                    </div>
                    <p>
                        Diese Cookies ermöglichen es uns, nachzuvollziehen, wie
                        Besucher die Website nutzen. Die gewonnenen Informationen –
                        etwa Seitenaufrufe, Verweildauer oder genutzte Funktionen –
                        werden ausschließlich in anonymisierter Form erhoben und
                        dienen der kontinuierlichen Verbesserung des Nutzererlebnisses
                        sowie der technischen Leistungsfähigkeit.
                    </p>
                    <div class="cookie-detail">
                        <span class="detail-label">Rechtsgrundlage:</span>
                        <span>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</span>
                    </div>
                    <div class="cookie-detail">
                        <span class="detail-label">Speicherdauer:</span>
                        <span>Maximal 12 Monate</span>
                    </div>
                </div>

                <div class="cookie-type">
                    <div class="type-header">
                        <span class="dot pink"></span>
                        <strong>Marketing &amp; Personalisierung</strong>
                    </div>
                    <p>
                        Marketing-Cookies dienen dazu, Besuchern über
                        verschiedene Websites hinweg relevante Inhalte
                        anzuzeigen. Sie werden eingesetzt, um das
                        Nutzungserlebnis zu personalisieren und die
                        Wirksamkeit von Kampagnen oder Inhalten zu messen.
                        Diese Cookies können von uns oder von Drittanbietern
                        gesetzt werden.
                    </p>
                    <div class="cookie-detail">
                        <span class="detail-label">Rechtsgrundlage:</span>
                        <span>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</span>
                    </div>
                    <div class="cookie-detail">
                        <span class="detail-label">Speicherdauer:</span>
                        <span>Maximal 12 Monate</span>
                    </div>
                </div>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>Wie lange werden Cookies gespeichert?</h3>
                <p>
                    Die Speicherdauer ist abhängig von der Art des Cookies.
                    Session-Cookies werden automatisch gelöscht, sobald Sie
                    Ihren Browser schließen. Persistente Cookies verbleiben
                    für einen definierten Zeitraum auf Ihrem Endgerät –
                    in der Regel zwischen wenigen Tagen und maximal
                    12 Monaten – oder bis Sie sie manuell aus Ihren
                    Browser-Einstellungen entfernen.
                </p>
            </section>

            <div class="section-divider"></div>

            <section>
                <h3>Cookies verwalten und löschen</h3>
                <p>
                    Sie haben jederzeit die Möglichkeit, Ihre
                    Cookie-Einstellungen über Ihren Browser anzupassen.
                    In den meisten Browsern finden Sie die entsprechenden
                    Optionen im Bereich „Datenschutz" oder „Sicherheit"
                    der Einstellungen. Sie können dort:
                </p>
                <ul>
                    <li>Alle gespeicherten Cookies einsehen und einzeln löschen</li>
                    <li>Cookies von Drittanbietern blockieren</li>
                    <li>Cookies generell ablehnen (dies kann die Funktion der Website einschränken)</li>
                    <li>Festlegen, dass Cookies nach jeder Sitzung gelöscht werden</li>
                </ul>
            </section>

            <div class="major-divider"></div>

            <section>
                <h3>Ihre Rechte</h3>
                <p>
                    Gemäß der DSGVO und der italienischen
                    Datenschutzgesetzgebung können Sie jederzeit Auskunft
                    über die zu Ihrer Person gespeicherten Daten verlangen
                    sowie deren Berichtigung, Löschung oder Einschränkung
                    der Verarbeitung fordern. Eine erteilte Einwilligung
                    können Sie mit Wirkung für die Zukunft widerrufen.
                </p>
                <p>
                    Bei Fragen wenden Sie sich an:<br>
                    Felix Plattner – felix.plattner89@plattnericus.dev
                </p>
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

    .cookie-type {
        margin: 10px 0;
        padding: 12px 16px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 0.5px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
    }

    .type-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
        font-size: 13px;
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .dot.green {
        background: #34d399;
        box-shadow: 0 0 6px rgba(52, 211, 153, 0.5);
    }

    .dot.blue {
        background: #60a5fa;
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.5);
    }

    .dot.pink {
        background: #f472b6;
        box-shadow: 0 0 6px rgba(244, 114, 182, 0.5);
    }

    .badge {
        margin-left: auto;
        font-size: 10px;
        padding: 2px 8px;
        border-radius: 999px;
    }

    .badge.active {
        background: rgba(52, 211, 153, 0.2);
        border: 0.5px solid rgba(52, 211, 153, 0.35);
        color: #6ee7b7;
    }

    .cookie-type p {
        font-size: 12px;
        line-height: 1.6;
        opacity: 0.78;
    }

    .cookie-detail {
        display: flex;
        gap: 6px;
        font-size: 11px;
        opacity: 0.65;
        margin-top: 4px;
    }

    .detail-label {
        font-weight: 600;
        opacity: 0.9;
        white-space: nowrap;
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

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes popup-in {
        0% { opacity: 0; transform: scale(0.92) translateY(16px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
    }
</style>
