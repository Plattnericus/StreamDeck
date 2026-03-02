<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { preloadCode } from "$app/navigation";
    import Cookies from "./apps/Cookies.svelte";

    let fill: HTMLDivElement | undefined;
    let showLogin = false;
    let showBoot = true;
    let showCookies = false;
    let password = "";
    let errorText = "";
    let isUnlocking = false;
    let slideActive = false;
    const correctPassword = "Kennwort0";
    let dateText = "";
    let timeText = "";
    let clockTimer: number | undefined;
    let wheelAccum = 0;
    let wheelTimer: number | undefined;
    let slideProgress = 0;
    let slideActiveTimer: number | undefined;
    let wheelHandler: ((e: WheelEvent) => void) | null = null;
    let declineCount = 0;

    onMount(() => {
        if (!fill) return;
        fill.style.transition = "width 4200ms cubic-bezier(0.4, 0, 0.2, 1)";
        requestAnimationFrame(() => {
            if (fill) fill.style.width = "100%";
        });
        setTimeout(() => {
            showLogin = true;
            showBoot = false;
        }, 4600);

        updateClock();
        clockTimer = window.setInterval(updateClock, 1000);

        preloadCode("/desktop").catch(() => undefined);

        wheelHandler = (e: WheelEvent) => {
            if (!showLogin || isUnlocking) return;
            if (!canSlide()) return;
            e.preventDefault();
            if (wheelTimer) window.clearTimeout(wheelTimer);
            if (slideActiveTimer) window.clearTimeout(slideActiveTimer);
            slideActive = true;
            slideActiveTimer = window.setTimeout(() => {
                slideActive = false;
            }, 120);
            wheelAccum += e.deltaY;
            wheelTimer = window.setTimeout(() => {
                wheelAccum = 0;
            }, 200);
            slideProgress = clamp(slideProgress + e.deltaY / 700, 0, 1);
            if (wheelAccum > 140 || slideProgress >= 0.98) {
                wheelAccum = 0;
                completeUnlock();
            }
        };

        window.addEventListener("wheel", wheelHandler, { passive: false });
    });

    onDestroy(() => {
        if (clockTimer) window.clearInterval(clockTimer);
        if (wheelTimer) window.clearTimeout(wheelTimer);
        if (slideActiveTimer) window.clearTimeout(slideActiveTimer);
        if (wheelHandler) window.removeEventListener("wheel", wheelHandler);
    });

    function updateClock(): void {
        const now = new Date();
        dateText = now.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
        timeText = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
        });
    }

    function clamp(value: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, value));
    }

    function handleSubmit(): void {
        completeUnlock();
    }

    function canSlide(): boolean {
        return password === "" || password === correctPassword;
    }

    function completeUnlock(): void {
        if (isUnlocking) return;
        if (canSlide()) {
            errorText = "";
            isUnlocking = true;
            slideProgress = 1;
            slideActive = false;
            setTimeout(() => {
                // Check if cookies already consented
                const consent = localStorage.getItem("cookie-consent");
                if (consent) {
                    window.location.href = "/desktop";
                } else {
                    showCookies = true;
                }
            }, 900);
            return;
        }
        errorText = "Falsches Kennwort";
        password = "";
    }

    function handleKeydown(e: KeyboardEvent): void {
        if (e.key === "Enter") handleSubmit();
    }

    function handleCookieConsent(): void {
        window.location.href = "/desktop";
    }

    function handleCookieDecline(): void {
        declineCount++;
        if (declineCount >= 2) {
            localStorage.setItem("cookie-consent", "declined");
            window.location.href = "/desktop";
            return;
        }
        showCookies = false;
        isUnlocking = false;
        slideProgress = 0;
        errorText = "Es wäre vorteilhaft die Cookies zu akzeptieren";
    }
</script>

<div class="body-mock">
    {#if showLogin}
        <div class="wallpaper"></div>
    {/if}

    {#if showBoot}
        <div class="main-container boot-screen">
            <div class="logo-area">
                <img class="logo" src="/logos/apple-logo.png" style="filter: invert(1);" alt="Mac">
            </div>
            <div class="boot-bar-container">
                <div bind:this={fill} class="boot-bar-fill"></div>
            </div>
        </div>
    {/if}

    {#if showLogin}
        <div
            class="login-screen {isUnlocking ? 'unlocking' : ''} {slideActive ? 'slide-active' : ''}"
            style={`--slide:${slideProgress};`}
        >
            <div class="wallpaper-sheen"></div>
            <div class="status-icons">
                <span>U.S.</span>
                <span>⌁</span>
                <span>◔</span>
                <span>◔</span>
            </div>
            <div class="clock">
                <div class="date">{dateText}</div>
                <div class="time">{timeText}</div>
            </div>
            <div class="login-card liquid-glass">
                <div class="avatar-ring">
                    <img class="avatar" src="/logo.jpg" alt="NEXOR">
                </div>
                <div class="user-name">NEXOR</div>
                <div class="password-row">
                    <input
                        type="password"
                        placeholder="Password"
                        bind:value={password}
                        on:keydown={handleKeydown}
                    />
                    <button class="go" on:click={handleSubmit} aria-label="Log in">
                        ↵
                    </button>
                </div>
                <div class="hint">(or swipe finger across reader)</div>

                {#if errorText}
                    <div class="error">{errorText}</div>
                {/if}
            </div>
        </div>
    {/if}

    {#if showCookies}
        <Cookies on:consent={handleCookieConsent} on:decline={handleCookieDecline} />
    {/if}
</div>

<style>
    :global(body) { margin: 0; padding: 0; background: #000; overflow: hidden; }

    .body-mock { 
        width: 100vw; 
        height: 100vh; 
        color: #ffffff; 
        font-family: "Segoe UI", sans-serif; 
        background-color: #000;
        position: relative;
    }

    .wallpaper {
        position: absolute;
        inset: 0;
        background: url("/lake-tahoe.webp") center center / cover no-repeat;
        filter: saturate(1.05);
        transform: scale(1.01);
        animation: wallpaper-drift 18s ease-in-out infinite;
    }

    .wallpaper::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            radial-gradient(900px 500px at 20% 25%, rgba(255,255,255,0.22), transparent 60%),
            radial-gradient(700px 500px at 85% 70%, rgba(120,170,255,0.2), transparent 62%);
        mix-blend-mode: screen;
        opacity: 0.65;
    }

    .main-container { 
        position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        width: 90%; 
        max-width: 420px; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        text-align: center; 
        z-index: 2;
        animation: boot-fade-in 600ms ease-out;
    }

    .boot-screen {
        background: #000;
    }

    .logo-area {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
    }

    .logo { 
        width: 90px; 
        height: auto; 
    }

    .boot-bar-container { width: 100%; height: 4px; background: rgba(255,255,255,0.18); border-radius: 2px; }
    .boot-bar-fill { width: 0%; height: 100%; background: white; }

    .login-screen {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        z-index: 3;
        animation: login-fade-in 700ms ease-out;
        transform: translateY(calc(var(--slide) * -22vh));
        opacity: calc(1 - (var(--slide) * 0.9));
        transition: transform 220ms ease-out, opacity 220ms ease-out;
    }

    .login-screen.slide-active {
        transition: none;
    }

    .login-screen.unlocking {
        transition: transform 700ms ease, opacity 700ms ease;
    }

    .wallpaper-sheen {
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02), rgba(255,255,255,0.12));
        opacity: 0.35;
        animation: sheen-sweep 8s ease-in-out infinite;
        pointer-events: none;
    }

    .status-icons {
        position: absolute;
        top: 18px;
        right: 26px;
        display: flex;
        gap: 10px;
        font-size: 12px;
        opacity: 0.85;
        text-shadow: 0 8px 20px rgba(0,0,0,0.4);
    }

    .clock {
        position: absolute;
        top: 60px;
        height: 60px;
        text-align: center;
        letter-spacing: 0.6px;
        text-shadow: 0 12px 30px rgba(0,0,0,0.35);
    }

    .clock .date {
        height: 80px;
        font-size: 16px;
        opacity: 0.9;
        font-weight: 700;
    }

    .clock .time {
        font-size: 72px;
        font-weight: 700;
        letter-spacing: -0.5px;
    }

    .login-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 18px 18px 14px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.12);
        min-width: 240px;
        animation: float 6s ease-in-out infinite;
        text-shadow: 0 8px 22px rgba(0,0,0,0.35);
        position: relative;
        overflow: hidden;
    }

    .liquid-glass {
        backdrop-filter: blur(26px) saturate(1.4);
        border: 1px solid rgba(255,255,255,0.28);
        box-shadow:
            0 20px 60px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.4),
            inset 0 -18px 28px rgba(255,255,255,0.08);
    }

    .liquid-glass::before {
        content: "";
        position: absolute;
        inset: -50% -20% auto -20%;
        height: 70%;
        background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.06));
        transform: rotate(-6deg);
        opacity: 0.5;
        pointer-events: none;
    }

    .liquid-glass::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            radial-gradient(160px 90px at 78% 18%, rgba(255,255,255,0.38), transparent 70%),
            radial-gradient(220px 140px at 20% 80%, rgba(255,255,255,0.14), transparent 75%);
        opacity: 0.55;
        mix-blend-mode: screen;
        pointer-events: none;
    }

    .avatar-ring {
        width: 74px;
        height: 74px;
        border-radius: 50%;
        padding: 2px;
        background: rgba(255,255,255,0.35);
    }

    .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);
    }

    .user-name {
        font-size: 16px;
        letter-spacing: 0.3px;
    }

    .hint {
        font-size: 12px;
        opacity: 0.7;
    }

    .password-row {
        width: 210px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(255,255,255,0.14);
        border: 1px solid rgba(255,255,255,0.45);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
    }

    .password-row input {
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        width: 100%;
        font-size: 14px;
    }

    .password-row .go {
        background: rgba(255,255,255,0.22);
        border: 1px solid rgba(255,255,255,0.35);
        color: #fff;
        border-radius: 999px;
        width: 28px;
        height: 28px;
        cursor: pointer;
    }

    .error {
        font-size: 12px;
        color: #ffd2d2;
        background: rgba(120, 20, 20, 0.4);
        padding: 6px 10px;
        border-radius: 10px;
        margin-top: 4px;
    }

    @keyframes boot-fade-in {
        from { opacity: 0; transform: translate(-50%, -46%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }

    @keyframes login-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes wallpaper-drift {
        0%, 100% { transform: scale(1.01) translateY(0px); }
        50% { transform: scale(1.03) translateY(-8px); }
    }

    @keyframes sheen-sweep {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.5; }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
    }

</style>
