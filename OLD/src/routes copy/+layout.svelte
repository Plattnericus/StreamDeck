<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { writable, derived } from 'svelte/store';
    import { redirect } from '@sveltejs/kit';
    import favicon from '$lib/assets/favicon.svg';
    import { browser } from '$app/environment';
    import { theme } from '$lib/stores.js';

    // ===== STORES & LOCALSTORAGE =====
    let initialLanguage = 'de';
    let initialTheme = 'dark';
	
    if (browser) {
        const storedLang = localStorage.getItem('language');
        const storedTheme = localStorage.getItem('theme');
        
        initialLanguage = storedLang || 'de';
        initialTheme = storedTheme || 'dark';
        
        document.documentElement.setAttribute('data-theme', initialTheme);
    }

    function handleLoginClick() {
        closePopup();
        goto('/auth');
    }

    export const language = writable(initialLanguage);

    if (browser) {
        language.subscribe((value) => {
            localStorage.setItem('language', value);
        });
        
        theme.subscribe((value) => {
            localStorage.setItem('theme', value);
            document.documentElement.setAttribute('data-theme', value);
        });
    }

    // ===== TRANSLATIONS =====
    const translationsData = {
        de: {
            home: 'Startseite', about: 'Über uns', shop: 'Geschäft', contact: 'Kontakt',
            settings: 'Einstellungen', dark: 'Dunkel', light: 'Hell', darkMode: 'Dunkelmodus', 
            lightMode: 'Hellmodus', logout: 'Abmelden', login: 'Anmelden', profile: 'Profil',
            analytics: 'Analytik', messages: 'Nachrichten', menu: 'Menü', language: 'Sprache'
        },
        en: {
            home: 'Home', about: 'About', shop: 'Shop', contact: 'Contact',
            settings: 'Settings', dark: 'Dark', light: 'Light', darkMode: 'Dark Mode',
            lightMode: 'Light Mode', logout: 'Logout', login: 'Login', profile: 'Profile',
            analytics: 'Analytics', messages: 'Messages', menu: 'Menu', language: 'Language'
        },
        it: {
            home: 'Home', about: 'Chi siamo', shop: 'Negozio', contact: 'Contatto',
            settings: 'Impostazioni', dark: 'Scuro', light: 'Chiaro', darkMode: 'Modalità Scura',
            lightMode: 'Modalità Chiara', logout: 'Disconnetti', login: 'Accedi', profile: 'Profilo',
            analytics: 'Analisi', messages: 'Messaggi', menu: 'Menu', language: 'Lingua'
        }
    };

    export const translations = derived(language, ($language) => {
        const lang = $language || initialLanguage;
        return translationsData[lang as keyof typeof translationsData] || translationsData.en;
    });

    // ===== COMPONENT STATE =====
    let { children } = $props();
    let user = $state<any>(null);
    let profileImg = $state('/default-profile.png');
  	let backgroundImg = $state('/default-background.png');
    let showPopup = $state(false);
    let popupAnimation = $state('');
    let isMobile = $state(false);
    let currentPath = $state('/');
    let popupElement = $state<HTMLElement | null>(null);

    // Aktiven Pfad überwachen
    $effect(() => {
        const unsubscribe = page.subscribe(($page) => {
            currentPath = $page.url?.pathname || '/';
            checkAuthStatus(); // Profil- und Hintergrundbild bei Seitenwechsel neu laden
        });
        return unsubscribe;
    });

    onMount(async () => {
        await checkAuthStatus();
        checkViewport();
        window.addEventListener('resize', checkViewport);
        currentPath = window.location.pathname;

        // Theme aus localStorage holen
        theme.set(localStorage.getItem('theme') || 'light');
    });

    function checkViewport() {
        if (browser) {
            isMobile = window.innerWidth <= 768;
        }
    }

    // ===== CLICK OUTSIDE HANDLING =====
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target?.classList.contains('popup-overlay')) {
            closePopup();
        }
    }

// ===== AUTH FUNCTIONS =====
async function checkAuthStatus() {
    try {
        const response = await fetch('http://localhost:3000/api/session', { credentials: 'include' });
        const data = await response.json();
        if (data.loggedIn && data.user) {
            user = data.user;
            await Promise.all([
                fetchProfilePicture(data.user.id),
                fetchBackgroundPicture(data.user.id)
            ]);
        } else {
            user = null;
            profileImg = '/default-profile.png';
            backgroundImg = '/default-background.png';
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        user = null;
        profileImg = '/default-profile.png';
        backgroundImg = '/default-background.png';
    }
}

async function fetchProfilePicture(userId: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}/profile-picture`);
        if (response.ok) {
            const data = await response.json();
            profileImg = data.profilePictureUrl || '/default-profile.png';
        } else {
            profileImg = '/default-profile.png';
        }
    } catch (error) {
        console.error('Profile picture fetch failed:', error);
        profileImg = '/default-profile.png';
    }
}

async function fetchBackgroundPicture(userId: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}/background-picture`);
        if (response.ok) {
            const data = await response.json();
            backgroundImg = data.backgroundPictureUrl || '/default-background.png';
        } else {
            backgroundImg = '/default-background.png';
        }
    } catch (error) {
        console.error('Background picture fetch failed, using fallback:', error);
        backgroundImg = '/default-background.png';
    }
}

    async function logout() {
        try {
            const response = await fetch('http://localhost:3000/api/logout', { 
                method: 'POST', 
                credentials: 'include' 
            });
            
            if (response.ok) {
                user = null;
                profileImg = '/default-profile.png';
                showPopup = false;
                goto('/auth');
            }
        } catch (error) {
            console.error('Logout failed:', error);
            document.cookie = 'auth=; Max-Age=0; path=/';
            user = null;
            profileImg = '/default-profile.png';
            showPopup = false;
            goto('/auth');
        }
    }

    // ===== UI FUNCTIONS =====
    function changeLang(lang: string) {
        language.set(lang);
    }

    function toggleTheme() {
        theme.update(t => t === 'light' ? 'dark' : 'light');
    }

    async function togglePopup() {
        if (!showPopup) {
            await checkAuthStatus();
            showPopup = true;
            popupAnimation = 'slideIn';
            await tick();
            if (browser) {
                setTimeout(() => {
                    document.addEventListener('click', handleClickOutside);
                }, 10);
            }
        } else {
            closePopup();
        }
    }

    function closePopup() {
        if (!showPopup) return;
        popupAnimation = 'slideOut';
        setTimeout(() => {
            showPopup = false;
            popupAnimation = '';
            if (browser) {
                document.removeEventListener('click', handleClickOutside);
            }
        }, 300);
    }

    function handleMouseMove(e: MouseEvent, element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const filter = element.querySelector('filter feDisplacementMap');
        if (filter) {
            const scaleX = (x / rect.width) * 100;
            const scaleY = (y / rect.height) * 100;
            filter.setAttribute('scale', Math.min(scaleX, scaleY).toString());
        }
        
        const specular = element.querySelector('.glass-specular') as HTMLElement;
        if (specular) {
            specular.style.background = `radial-gradient(
                circle at ${x}px ${y}px,
                rgba(255,255,255,0.15) 0%,
                rgba(255,255,255,0.05) 30%,
                rgba(255,255,255,0) 60%
            )`;
        }
    }

    function handleMouseLeave(element: HTMLElement) {
        const filter = element.querySelector('filter feDisplacementMap');
        if (filter) {
            filter.setAttribute('scale', '77');
        }
        
        const specular = element.querySelector('.glass-specular') as HTMLElement;
        if (specular) {
            specular.style.background = 'none';
        }
    }

    function handleLanguageChange(e: Event) {
        const target = e.target as HTMLSelectElement;
        changeLang(target.value);
    }

    function handleOverlayKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            closePopup();
        }
    }

    function isActiveTab(path: string) {
        return currentPath === path;
    }

    function setPopupRef(element: HTMLElement) {
        popupElement = element;
    }

	$effect(() => {
        if (browser) {
            document.documentElement.style.setProperty('--background-image', `url('${backgroundImg}')`);
        }
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji" rel="stylesheet">
</svelte:head>

<!-- SVG FILTER -->
<svg style="display: none">
    <filter id="glass-distortion">
        <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
    </filter>
</svg>

<!-- MAIN NAVIGATION -->
<div class="navbar-container">
    <nav class="glass-nav" data-theme={$theme}>
        <div class="glass-filter"></div>
        <div class="glass-overlay"></div>
        <div class="glass-specular"></div>
        <div class="glass-content">
            {#if isMobile}
                <button class="mobile-menu-btn" onclick={togglePopup} aria-label="Menu">
                    <i class="fas fa-bars"></i>
                </button>
            {/if}

            <ul class="nav-list {isMobile ? 'mobile-hidden' : ''}">
                <li>
                    <a href="/" class="nav-item {isActiveTab('/') ? 'active' : ''}">
                        <i class="fas fa-home"></i>
                        <span>{$translations.home}</span>
                        {#if isActiveTab('/')}
                            <div class="active-indicator"></div>
                        {/if}
                    </a>
                </li>
                <li>
                    <a href="/about" class="nav-item {isActiveTab('/about') ? 'active' : ''}">
                        <i class="fas fa-info-circle"></i>
                        <span>{$translations.about}</span>
                        {#if isActiveTab('/about')}
                            <div class="active-indicator"></div>
                        {/if}
                    </a>
                </li>
                <li>
                    <a href="/shop" class="nav-item {isActiveTab('/shop') ? 'active' : ''}">
                        <i class="fas fa-concierge-bell"></i>
                        <span>{$translations.shop}</span>
                        {#if isActiveTab('/shop')}
                            <div class="active-indicator"></div>
                        {/if}
                    </a>
                </li>
                <li>
                    <a href="/contact" class="nav-item {isActiveTab('/contact') ? 'active' : ''}">
                        <i class="fas fa-envelope"></i>
                        <span>{$translations.contact}</span>
                        {#if isActiveTab('/contact')}
                            <div class="active-indicator"></div>
                        {/if}
                    </a>
                </li>
            </ul>
            
            <div class="right-controls">
                <div class="desktop-controls {isMobile ? 'mobile-hidden' : ''}">
                    <a href="/settings" class="settings-link {isActiveTab('/settings') ? 'active' : ''}">
                        <i class="fas fa-cog"></i>
                        {#if isActiveTab('/settings')}
                            <div class="active-dot"></div>
                        {/if}
                    </a>
                </div>

                <button class="profile-button {isActiveTab('/profile') ? 'active' : ''}" onclick={togglePopup} aria-label="User menu" type="button">
                    <img src={profileImg} alt="Profile" width="36" height="36" class="profile-image" />
                    {#if isActiveTab('/profile')}
                        <div class="active-dot"></div>
                    {/if}
                </button>
            </div>
        </div>
    </nav>

    {#if showPopup}
        <!-- Overlay -->
        <div
            class="popup-overlay"
            onclick={handleClickOutside}
            onkeydown={handleOverlayKeydown}
            role="button"
            tabindex="0"
            aria-label="Close menu"
        >
            <!-- Dialog -->
            <div
                class="glass-sidebar popup-menu {popupAnimation}"
                onclick="{() => {}}"
                onmousemove={(e) => handleMouseMove(e, e.currentTarget)}
                onmouseleave={(e) => handleMouseLeave(e.currentTarget)}
                bind:this={popupElement}
                role="dialog"
                aria-modal="true"
            >
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>

                <div class="glass-content">
                    <nav class="sidebar-nav">

<!--

                        <button class="nav-item" onclick={toggleTheme} type="button">
                            <i class="fas fa-{$theme === 'light' ? 'moon' : 'sun'}"></i>
                            <span>{$theme === 'light' ? $translations.darkMode : $translations.lightMode}</span>
                        </button>

                        <div class="nav-item language-selector">
                            <i class="fas fa-globe"></i>
                            <span>{$translations.language}</span>
                            <div class="language-select-wrapper">
                                <select class="language-select" value={$language} onchange={handleLanguageChange}>
                                    <option class="language-options" value="de">🇩🇪</option>
                                    <option class="language-options" value="en">🇬🇧</option>
                                    <option class="language-options" value="it">🇮🇹</option>
                                </select>
                                <i class="fas fa-chevron-down language-arrow"></i>
                            </div>
                        </div>
-->





                        <!-- Login / Logout -->
                        {#if user}
                            <div class="user-info">
                                <div class="user-welcome">
                                    <img src={profileImg} alt="Profile" width="64" height="64" class="profile-image profile-image--large" />
                                    <div class="greeting">Hallo, {user.username || 'User'}!</div>
                                </div>

                        <!-- Mobile Hauptnavigation -->
                            {#if isMobile}
                                {#each [
                                    {href:'/',       icon:'fa-home',        label:$translations.home},
                                    {href:'/about',  icon:'fa-info-circle', label:$translations.about},
                                    {href:'/shop',icon:'fa-concierge-bell',label:$translations.shop},
                                    {href:'/contact',icon:'fa-envelope',   label:$translations.contact}
                                ] as nav}
                                    <a href={nav.href} class="nav-item {isActiveTab(nav.href)?'active':''}" onclick={closePopup}>
                                        <i class="fas {nav.icon}"></i>
                                        <span>{nav.label}</span>
                                    </a>
                                {/each}
                            <div class="menu-divider"></div>
                            {/if}
                            <!-- Weitere Links -->
                        {#each [
                            {href:'/settings', icon:'fa-cog',      label:$translations.settings},
                            {href:'/profile',  icon:'fa-user',     label:$translations.profile},
                        ] as link}
                            <a href={link.href} class="nav-item {isActiveTab(link.href)?'active':''}" onclick={closePopup}>
                                <i class="fas {link.icon}"></i>
                                <span>{link.label}</span>
                            </a>
                        {/each}
                       <div class="menu-divider"></div>
                                <button class="nav-item logout-button" onclick={logout} type="button">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span>{$translations.logout}</span>
                                </button>
                            </div>
                        {:else}
                        
                            <button class="nav-item login-button" onclick={handleLoginClick} type="button">
                                <i class="fas fa-sign-in-alt"></i>
                                <span>{$translations.login}</span>
                            </button>
                        {/if}
                    </nav>
                </div>
            </div>
        </div>
    {/if}
</div>

<main class="main-content">
    {@render children?.()}
</main>

<style>
    /* APPLE FONT & RESET */
    :global(*) {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		font-family: system-ui, "Segoe UI Emoji", "Noto Color Emoji", "Apple Color Emoji", sans-serif;
        box-sizing: border-box;
    }

		:global(body) {
			background-image: var(--background-image, url('/default-background.png')) !important;
			background-size: cover !important;
			background-position: center !important;
			background-attachment: fixed !important;
			background-repeat: no-repeat !important;
			min-height: 100vh;
			margin: 0;
			padding: 0;
			font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			padding-top: 80px;
            color: white;
		}

		/* Fallback direkt auf body */
		:global(body) {
			background-image: url('/default-background.png');
			background-size: cover;
			background-position: center;
			background-attachment: fixed;
			background-repeat: no-repeat;
		}

		:global(body) {
			background-image: var(--background-image) !important;
		}

    :global(html) {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    /* FIXIERTE NAVBAR */
    .navbar-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
		height: auto;
        z-index: 1000;
        padding: 1rem;
        background: transparent;
        pointer-events: none;
    }

    /* ORIGINAL GLASS NAVIGATION DESIGN */
    .glass-nav {
        --bg-color: rgba(255, 255, 255, 0.25);
        --highlight: rgba(255, 255, 255, 0.75);
        --text: #ffffff;
        
        position: relative;
        width: 95%;
        max-width: 1200px;
        border-radius: 12px;
        overflow: hidden;
        background: transparent;
        margin: 0 auto;
        pointer-events: all;
    }

    .glass-nav[data-theme='dark'] {
        --bg-color: rgba(0, 0, 0, 0.25);
        --highlight: rgba(255, 255, 255, 0.15);
    }

    .glass-nav[data-theme='light'] {
        --bg-color: rgba(255, 255, 255, 0.25);
        --highlight: rgba(255, 255, 255, 0.75);
        --text: #1d1d1f;
    }

    .glass-filter, .glass-overlay, .glass-specular {
        position: absolute;
        inset: 0;
        border-radius: inherit;
    }

    .glass-filter {
        z-index: 1;
        backdrop-filter: blur(4px);
        filter: url(#glass-distortion) saturate(120%) brightness(1.15);
    }

    .glass-overlay {
        z-index: 2;
        cursor: pointer;
        background: var(--bg-color);
    }

    .glass-specular {
        z-index: 3;
        box-shadow: inset 1px 1px 1px var(--highlight);
    }

    .glass-content {
        position: relative;
        z-index: 4;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    /* NAVIGATION LIST */
    .nav-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1.5rem;
        align-items: center;
        flex: 1;
    }

    .nav-item {
        color: var(--text);
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        padding: 8px 16px;
        border-radius: 8px;
        transition: background-color 0.2s ease;
        cursor: pointer;
        background: transparent;
        border: none;
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0.9;
        position: relative;
    }

    .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
        opacity: 1;
    }

    .nav-item.active {
        background-color: rgba(255, 255, 255, 0.2);
        opacity: 1;
    }

    /* AKTIVER TAB INDICATOR */
    .active-indicator {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        background: var(--text);
        border-radius: 50%;
        opacity: 0.8;
    }

    .active-dot {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 6px;
        height: 6px;
        background: var(--text);
        border-radius: 50%;
        opacity: 0.8;
    }

    /* RIGHT CONTROLS */
    .right-controls {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .desktop-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* SPRACHAUSWAHL */
    .language-select-wrapper {
        position: relative;
        display: inline-block;
		font-family: "Noto Color Emoji", system-ui, sans-serif;
    }

    .language-select {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        color: var(--text);
        padding: 8px 32px 8px 12px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        appearance: none;
        min-width: 70px;
        text-align: center;
		font-family: "Noto Color Emoji", system-ui, sans-serif;
    }

    .language-select:hover {
        background: rgba(255, 255, 255, 0.2);
		color: var(--text);
		background-color: #1d1d1f;
    }

	select.language-select option {
		background-color: var(--bg-color) !important;
		color: var(--text) !important;
	}


	.language-options {
		background: var(--bg-color);
		color: var(--text);
		border-radius: 10px;
		text-align: center;
		font-family: "Noto Color Emoji", system-ui, sans-serif;
	}

	.language-options:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.language-options:focus {
		outline: none;
		border-color: rgba(255, 255, 255, 0.6);
	}

	.language-dropdown option.language-options
	{
		background: var(--bg-color);
		color: var(--text);
		border-radius: 10px;
	}
    .language-arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text);
        font-size: 12px;
        pointer-events: none;
        opacity: 0.7;
    }

    .theme-toggle, .settings-link {
        border: none;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        color: var(--text);
        padding: 8px 12px;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background-color 0.2s ease;
    }

    .theme-toggle:hover, .settings-link:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .profile-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        transition: background-color 0.2s ease;
        position: relative;
    }

    .profile-button:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }

    .profile-image {
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.4);
    }

    /* MOBILE MENU BUTTON */
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: var(--text);
        font-size: 1.2rem;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .mobile-menu-btn:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    /* POPUP MENU ANIMATIONEN */
	.popup-overlay {
	position: fixed;
	pointer-events: all;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
	padding: 100px 16px 0 0;
	z-index: 1000; /* Overlay etwas niedriger */
	}

	/* Sidebar */
	.glass-sidebar {
	position: relative;
	pointer-events: auto;
	width: 280px;
	max-height: 700px;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
	transform: translateX(100%);
	opacity: 0;
	cursor: default;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	z-index: 1001; /* Sidebar über Overlay */
	}


    .glass-sidebar[data-theme='dark'] {
        --bg-color: rgba(0, 0, 0, 0.25);
        --highlight: rgba(255, 255, 255, 0.15);	
    }

    .glass-sidebar[data-theme='light'] {
        --bg-color: rgba(255, 255, 255, 0.25);
		--highlight: rgba(255, 255, 255, 0.75);
		--text: #1d1d1f;
        background-repeat: no-repeat;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        padding-top: 80px;
    }

    :global(html) {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    /* FIXIERTE NAVBAR */
    .navbar-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        padding: 1rem;
        background: transparent;
        pointer-events: none;
    }

    /* ORIGINAL GLASS NAVIGATION DESIGN */
    .glass-nav {
        --bg-color: rgba(255, 255, 255, 0.25);
        --highlight: rgba(255, 255, 255, 0.75);
        --text: #ffffff;
        
        position: relative;
        width: 95%;
        max-width: 1200px;
        border-radius: 12px;
        overflow: hidden;
        background: transparent;
        margin: 0 auto;
        pointer-events: all;
    }

    .glass-nav[data-theme='dark'] {
        --bg-color: rgba(0, 0, 0, 0.25);
        --highlight: rgba(255, 255, 255, 0.15);
    }

    .glass-nav[data-theme='light'] {
        --bg-color: rgba(255, 255, 255, 0.25);
        --highlight: rgba(255, 255, 255, 0.75);
        --text: #1d1d1f;
    }

    .glass-filter, .glass-overlay, .glass-specular {
        position: absolute;
        inset: 0;
        border-radius: inherit;
    }

    .glass-filter {
        z-index: 1;
        backdrop-filter: blur(4px);
        filter: url(#glass-distortion) saturate(120%) brightness(1.15);
    }

    .glass-overlay {
        z-index: 2;
        cursor: pointer;
        background: var(--bg-color);
    }

    .glass-specular {
        z-index: 3;
        box-shadow: inset 1px 1px 1px var(--highlight);
    }

    .glass-content {
        position: relative;
        z-index: 4;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    /* NAVIGATION LIST */
    .nav-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1.5rem;
        align-items: center;
        flex: 1;
    }

    .nav-item {
        color: var(--text);
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        padding: 8px 16px;
        border-radius: 8px;
        transition: background-color 0.2s ease;
        cursor: pointer;
        background: transparent;
        border: none;
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0.9;
        position: relative;
    }

    .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
        opacity: 1;
    }

    .nav-item.active {
        background-color: rgba(255, 255, 255, 0.2);
        opacity: 1;
    }

    /* AKTIVER TAB INDICATOR */
    .active-indicator {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        background: var(--text);
        border-radius: 50%;
        opacity: 0.8;
    }

    .active-dot {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 6px;
        height: 6px;
        background: var(--text);
        border-radius: 50%;
        opacity: 0.8;
    }

    /* RIGHT CONTROLS */
    .right-controls {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .desktop-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* SPRACHAUSWAHL */
    .language-select-wrapper {
        position: relative;
        display: inline-block;
    }

    .language-select {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        color: var(--text);
        padding: 8px 32px 8px 12px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        appearance: none;
        min-width: 70px;
        text-align: center;
    }

    .language-select:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .language-arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text);
        font-size: 12px;
        pointer-events: none;
        opacity: 0.7;
    }

    .theme-toggle, .settings-link {
        border: none;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        color: var(--text);
        padding: 8px 12px;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background-color 0.2s ease;
    }

    .theme-toggle:hover, .settings-link:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .profile-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        transition: background-color 0.2s ease;
        position: relative;
    }

    .profile-button:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }

    .profile-image {
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.4);
    }

    /* MOBILE MENU BUTTON */
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: var(--text);
        font-size: 1.2rem;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .mobile-menu-btn:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    /* POPUP MENU ANIMATIONEN */
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 100px 16px 0 0;
        z-index: 1001;
    }

    /* ORIGINAL GLASS SIDEBAR DESIGN */
    .glass-sidebar {
        --bg-color: rgba(255, 255, 255, 0.25);
        --highlight: rgba(255, 255, 255, 0.75);
        --text: #ffffff;
        
        position: relative;
        width: 280px;
        height: auto;
        max-height: 500px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        opacity: 0;
        cursor: default;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .glass-sidebar[data-theme='dark'] {
        --bg-color: rgba(0, 0, 0, 0.25);
        --highlight: rgba(255, 255, 255, 0.15);
    }

    .glass-sidebar[data-theme='light'] {
        --bg-color: rgba(255, 255, 255, 0.25);
        --highlight: rgba(255, 255, 255, 0.75);
        --text: #1d1d1f;
    }

    .popup-menu.slideIn {
        transform: translateX(0);
        opacity: 1;
    }

    .popup-menu.slideOut {
        transform: translateX(100%);
        opacity: 0;
    }

    .sidebar-header {
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar-header h3 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: var(--text);
    }

    .sidebar-nav {
        padding: 20px 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .sidebar-nav .nav-item {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        color: var(--text);
        text-decoration: none;
        transition: all 0.3s ease;
        gap: 12px;
        width: 100%;
        text-align: left;
        justify-content: flex-start;
        border: none;
        background: none;
        font-family: inherit;
        font-size: 16px;
        opacity: 0.9;
        border-radius: 0;
        margin: 0;
    }

    .sidebar-nav .nav-item:hover,
    .sidebar-nav .nav-item.active {
        background: rgba(255, 255, 255, 0.1);
        opacity: 1;
    }

    .sidebar-nav .nav-item i {
        font-size: 18px;
        width: 24px;
        text-align: center;
    }

    .sidebar-nav .nav-item span {
        font-size: 16px;
        opacity: 0.9;
    }

    .language-selector {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .language-dropdown-wrapper {
        position: relative;
        display: inline-block;
    }

  .language-dropdown {
  appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  padding: 4px 28px 4px 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: all 0.2s ease;
}

.language-dropdown:hover {
  background: rgba(204, 204, 204, 0.3);
}



@media (prefers-color-scheme: dark) {
  .language-dropdown {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
  .language-dropdown:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}

    .dropdown-arrow {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text);
        font-size: 12px;
        pointer-events: none;
        opacity: 0.7;
    }

    .language-dropdown:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .menu-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 8px 20px;
    }

    .user-info {
        margin-top: 8px;
        padding-top: 16px;
    }

    .user-welcome {
        padding: 8px 20px 16px 20px; 
        color: var(--text);
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 8px;
    }

    .user-welcome .greeting {
        font-size: 18px;
        font-weight: 700;
        opacity: 1;     
    }

    .profile-image--large {
        width: 64px !important;
        height: 64px !important;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.4);
        object-fit: cover;
    }
    /* Dark/Light Kontrast für Rahmen leicht anpassen */
    [data-theme='light'] .profile-image--large {
        border-color: rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 480px) {
        .user-welcome .greeting { font-size: 16px; }
        .profile-image--large { width: 56px !important; height: 56px !important; }
    }

    .logout-button, .login-button {
        width: 100%;
        border-radius: 0 !important;
    }

    .logout-button:hover {
        background: rgba(255, 59, 48, 0.2) !important;
    }

    .login-button:hover {
        background: rgba(52, 199, 89, 0.2) !important;
    }

    .main-content {
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }

    /* RESPONSIVE DESIGN */
    @media (max-width: 768px) {
        .navbar-container {
            padding: 0.5rem;
        }

        .mobile-menu-btn {
            display: block;
        }

        .mobile-hidden {
            display: none !important;
        }

        .glass-content {
            padding: 12px 16px;
        }

        .nav-list {
            gap: 0.5rem;
        }

        .nav-item {
            font-size: 14px;
            padding: 6px 12px;
        }

        .right-controls {
            gap: 0.5rem;
        }

        .popup-overlay {
            padding: 90px 8px 0 0;
        }

        .glass-sidebar {
            width: 280px;
        }

        .glass-nav {
            width: 97%;
        }

        :global(body) {
            padding-top: 70px;
        }
    }

    @media (max-width: 480px) {
        .glass-content {
            padding: 8px 12px;
        }

        .glass-sidebar {
            width: 260px;
        }

        .popup-overlay {
            padding: 90px 4px 0 0;
        }
    }

</style>
