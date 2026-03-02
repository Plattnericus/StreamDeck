<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import CookiesInfo from "./Cookies-info.svelte";
    import Datenschutz from "./Datenschutz.svelte";

    const dispatch = createEventDispatcher();
    let visible = false;
    let closing = false;
    let showCookiesInfo = false;
    let showDatenschutz = false;

    onMount(() => {
        // Check if cookies were already accepted
        const consent = localStorage.getItem("cookie-consent");
        if (consent) {
            dispatch("consent", { accepted: consent === "accepted" });
            return;
        }
        setTimeout(() => (visible = true), 300);
    });

    function accept() {
        closing = true;
        localStorage.setItem("cookie-consent", "accepted");
        setTimeout(() => {
            visible = false;
            dispatch("consent", { accepted: true });
        }, 400);
    }

    function decline() {
        closing = true;
        setTimeout(() => {
            visible = false;
            dispatch("decline");
        }, 400);
    }
</script>

{#if visible}
    <div class="cookie-overlay">
        <div class="cookie-banner liquid-glass" class:closing>
            <div class="glass-shine"></div>
            <div class="glass-caustic"></div>

            <div class="cookie-icon"><img style="width: 70px; height: 70px;" src="/icons/cookies.png" alt="Cookie Icon" /></div>

            <div class="cookie-content">
                <h3 class="cookie-title">Cookies & Datenschutz</h3>
                <p class="cookie-text">
                    Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten. 
                    Sie können wählen, ob Sie alle Cookies akzeptieren oder nur die notwendigen zulassen möchten.
                </p>
            </div>

            <div class="cookie-actions">
                <button class="btn btn-decline" on:click={decline}>Ablehnen</button>
                <button class="btn btn-accept" on:click={accept}>Alle akzeptieren</button>
            </div>

            <div class="cookie-links">
                <button class="link-btn" on:click={() => showCookiesInfo = true}>
                    Mehr erfahren
                </button>
                <span class="link-sep">·</span>
                <button class="link-btn" on:click={() => showDatenschutz = true}>
                    Datenschutzerklärung
                </button>
            </div>
        </div>
    </div>
{/if}

{#if showCookiesInfo}
    <CookiesInfo on:close={() => showCookiesInfo = false} />
{/if}

{#if showDatenschutz}
    <Datenschutz on:close={() => showDatenschutz = false} />
{/if}

<style>
    .cookie-overlay {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        pointer-events: auto;
    }

    .cookie-banner {
        position: relative;
        width: 370px;
        padding: 22px 24px 18px;
        border-radius: 22px;
        color: #fff;
        display: flex;
        flex-direction: column;
        gap: 14px;
        overflow: hidden;

        /* Liquid Glass Background */
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.08) 40%,
            rgba(200, 220, 255, 0.12) 70%,
            rgba(255, 255, 255, 0.06) 100%
        );
        backdrop-filter: blur(32px) saturate(1.6) brightness(1.05);
        -webkit-backdrop-filter: blur(32px) saturate(1.6) brightness(1.05);
        border: 1px solid rgba(255, 255, 255, 0.32);
        box-shadow:
            0 24px 80px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -20px 40px rgba(255, 255, 255, 0.06);

        animation: banner-slide-in 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    }

    .cookie-banner.closing {
        animation: banner-slide-out 400ms cubic-bezier(0.55, 0, 1, 0.45) forwards;
    }

    /* Top specular highlight - Tahoe glass effect */
    .glass-shine {
        position: absolute;
        inset: -50% -20% auto -20%;
        height: 65%;
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.15) 30%,
            rgba(255, 255, 255, 0.02) 100%
        );
        transform: rotate(-5deg);
        opacity: 0.55;
        pointer-events: none;
        border-radius: 50%;
    }

    /* Caustic light spots */
    .glass-caustic {
        position: absolute;
        inset: 0;
        background:
            radial-gradient(140px 80px at 80% 15%, rgba(255, 255, 255, 0.35), transparent 70%),
            radial-gradient(200px 120px at 15% 85%, rgba(180, 210, 255, 0.15), transparent 70%),
            radial-gradient(100px 100px at 50% 50%, rgba(255, 255, 255, 0.08), transparent 70%);
        opacity: 0.6;
        mix-blend-mode: screen;
        pointer-events: none;
        animation: caustic-drift 6s ease-in-out infinite;
    }

    .cookie-icon {
        font-size: 32px;
        text-align: center;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        animation: cookie-bounce 2s ease-in-out infinite;
        position: relative;
        z-index: 1;
    }

    .cookie-content {
        position: relative;
        z-index: 1;
    }

    .cookie-title {
        margin: 0 0 6px;
        font-size: 17px;
        font-weight: 700;
        letter-spacing: 0.2px;
    }

    .cookie-text {
        margin: 0;
        font-size: 12.5px;
        line-height: 1.5;
        opacity: 0.88;
    }

    .cookie-actions {
        display: flex;
        gap: 10px;
        position: relative;
        z-index: 1;
    }

    .btn {
        flex: 1;
        padding: 10px 16px;
        border-radius: 14px;
        border: none;
        cursor: pointer;
        font-size: 13.5px;
        font-weight: 600;
        letter-spacing: 0.2px;
        transition: all 200ms ease;
        position: relative;
        overflow: hidden;
    }

    .btn-decline {
        background: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .btn-decline:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-1px);
        box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .btn-accept {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(99, 102, 241, 0.7));
        color: #fff;
        border: 1px solid rgba(130, 170, 255, 0.4);
        box-shadow:
            0 4px 16px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }

    .btn-accept:hover {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.85), rgba(99, 102, 241, 0.85));
        transform: translateY(-1px);
        box-shadow:
            0 8px 24px rgba(59, 130, 246, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }

    .btn:active {
        transform: translateY(0px) scale(0.98);
    }

    .cookie-links {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        position: relative;
        z-index: 1;
    }

    .link-btn {
        background: none;
        border: none;
        color: #93c5fd;
        font-size: 11.5px;
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 2px;
        opacity: 0.7;
        padding: 0;
        transition: opacity 200ms, color 200ms;
    }

    .link-btn:hover {
        color: #bfdbfe;
        opacity: 1;
    }

    .link-sep {
        color: rgba(255, 255, 255, 0.35);
        font-size: 12px;
    }

    @keyframes banner-slide-in {
        0% {
            opacity: 0;
            transform: translateY(40px) scale(0.92);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes banner-slide-out {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
    }

    @keyframes cookie-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
    }

    @keyframes caustic-drift {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.7; }
    }

    @media (max-width: 440px) {
        .cookie-overlay {
            bottom: 12px;
            right: 12px;
            left: 12px;
        }

        .cookie-banner {
            width: auto;
        }
    }
</style>
