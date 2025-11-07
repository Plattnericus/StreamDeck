<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { Draggable } from 'gsap/Draggable';
    import { theme, language, translations } from '$lib/stores.js';
    import { browser } from '$app/environment';
    import { get } from 'svelte/store';

    // ===== STATE MANAGEMENT =====
    let user = $state(null);
    let isLoading = $state(true);
    let isSaving = $state(false);
    let message = $state({ text: '', type: '' });

    // ===== FORM DATA =====
    let emailForm = $state({
        newEmail: '',
        confirmEmail: '',
        password: ''
    });

    let passwordForm = $state({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // ===== TOGGLE STATES =====
    let toggleStates = $state({
        darkMode: false,
        notifications: true,
        autoSave: false,
        analytics: true,
        privacyMode: false,
        emailUpdates: true,
        cookies: true,
        termsAccepted: false
    });

    let currentLanguage = $state('de');
    let currentTheme = $state('dark');
    let languageDropdownOpen = $state(false);

    const languageOptions = [
        { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { value: 'en', label: 'English', flag: '🇬🇧' },
        { value: 'it', label: 'Italiano', flag: '🇮🇹' }
    ];

    // Use $derived instead of $:
    let selectedLanguage = $derived(
        languageOptions.find(l => l.value === currentLanguage) || languageOptions[0]
    );
    
    let t = $derived(get(translations));

    // ===== LIFECYCLE =====
    onMount(async () => {
        if (!browser) return;

        gsap.registerPlugin(Draggable);
        
        currentLanguage = localStorage.getItem('language') || 'de';
        currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Sync language store
        language.set(currentLanguage);

        await checkAuthStatus();
        await loadToggleStates();
        
        // Warte bis DOM bereit ist
        setTimeout(() => {
            initializeLiquidToggles();
        }, 100);

        // Close dropdown when clicking outside
        const handleClickOutside = (e) => {
            if (!e.target.closest('.custom-select')) {
                languageDropdownOpen = false;
            }
        };
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    // ===== AUTH CHECK =====
    async function checkAuthStatus() {
        if (!browser) return;

        try {
            const response = await fetch('http://localhost:3000/api/session', {
                credentials: 'include'
            });
            const data = await response.json();

            if (data.loggedIn && data.user) {
                user = data.user;
            } else {
                window.location.href = '/auth';
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            window.location.href = '/auth';
        } finally {
            isLoading = false;
        }
    }

    // ===== TOGGLE STATE MANAGEMENT =====
    async function loadToggleStates() {
        if (!user || !browser) return;

        try {
            const response = await fetch('http://localhost:3000/api/user/toggle-states', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.toggleStates) {
                    toggleStates = { ...toggleStates, ...data.toggleStates };
                }
                
                // Sync darkMode mit theme store
                const currentThemeValue = get(theme);
                if (toggleStates.darkMode !== (currentThemeValue === 'dark')) {
                    toggleStates.darkMode = currentThemeValue === 'dark';
                }
            }
        } catch (error) {
            console.error('Toggle states load failed:', error);
        }
    }

    async function saveToggleStates() {
        if (!user || !browser) return;

        try {
            const response = await fetch('http://localhost:3000/api/user/update-toggle-states', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ toggleStates })
            });

            if (response.ok) {
                console.log('✅ Toggle states saved successfully');
            } else {
                console.error('❌ Failed to save toggle states');
                showMessage('Fehler beim Speichern', 'error');
            }
        } catch (error) {
            console.error('Toggle states save failed:', error);
            showMessage('Serverfehler beim Speichern', 'error');
        }
    }

    function handleToggleChange(toggleName, newValue) {
        if (!browser) return;

        console.log(`🔄 Toggle changed: ${toggleName} = ${newValue}`);
        
        toggleStates[toggleName] = newValue;

        // Special handling für darkMode
        if (toggleName === 'darkMode') {
            const newTheme = newValue ? 'dark' : 'light';
            theme.set(newTheme);
            currentTheme = newTheme;
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        }

        // Speichere die Änderungen
        saveToggleStates();
    }

    // ===== LIQUID TOGGLE INITIALIZATION =====
    function initializeLiquidToggles() {
        if (!browser) return;

        const toggles = document.querySelectorAll('.liquid-toggle');

        toggles.forEach((toggle) => {
            const toggleName = toggle.dataset.toggle;
            const isActive = toggleStates[toggleName];

            toggle.setAttribute('aria-pressed', isActive.toString());
            toggle.style.setProperty('--complete', isActive ? 100 : 0);

            const toggleState = () => {
                const currentPressed = toggle.getAttribute('aria-pressed') === 'true';
                const newPressed = !currentPressed;

                toggle.dataset.pressed = 'true';
                toggle.dataset.active = 'true';

                gsap.timeline({
                    onComplete: () => {
                        gsap.delayedCall(0.05, () => {
                            toggle.dataset.active = 'false';
                            toggle.dataset.pressed = 'false';
                            toggle.setAttribute('aria-pressed', newPressed.toString());
                            handleToggleChange(toggleName, newPressed);
                        });
                    },
                }).to(toggle, {
                    '--complete': newPressed ? 100 : 0,
                    duration: 0.12,
                    delay: 0.18
                });
            };

            const proxy = document.createElement('div');
            Draggable.create(proxy, {
                allowContextMenu: true,
                handle: toggle,
                onDragStart: function() {
                    const toggleBounds = toggle.getBoundingClientRect();
                    const pressed = toggle.matches('[aria-pressed=true]');
                    const bounds = pressed 
                        ? toggleBounds.left - this.pointerX
                        : toggleBounds.left + toggleBounds.width - this.pointerX;
                    this.dragBounds = bounds;
                    toggle.dataset.active = 'true';
                },
                onDrag: function() {
                    const pressed = toggle.matches('[aria-pressed=true]');
                    const dragged = this.x - this.startX;
                    const complete = gsap.utils.clamp(
                        0, 100,
                        pressed 
                            ? gsap.utils.mapRange(this.dragBounds, 0, 0, 100, dragged)
                            : gsap.utils.mapRange(0, this.dragBounds, 0, 100, dragged)
                    );
                    this.complete = complete;
                    gsap.set(toggle, { 
                        '--complete': complete, 
                        '--delta': Math.min(Math.abs(this.deltaX), 12) 
                    });
                },
                onDragEnd: function() {
                    const newPressed = this.complete >= 50;
                    
                    gsap.fromTo(toggle, {
                        '--complete': this.complete,
                    }, {
                        '--complete': newPressed ? 100 : 0,
                        duration: 0.15,
                        onComplete: () => {
                            gsap.delayedCall(0.05, () => {
                                toggle.dataset.active = 'false';
                                toggle.setAttribute('aria-pressed', newPressed);
                                handleToggleChange(toggleName, newPressed);
                            });
                        },
                    });
                },
                onPress: function() {
                    this.__pressTime = Date.now();
                    if ('ontouchstart' in window && navigator.maxTouchPoints > 0)
                        toggle.dataset.active = 'true';
                },
                onRelease: function() {
                    this.__releaseTime = Date.now();
                    gsap.set(toggle, { '--delta': 0 });
                    
                    if ('ontouchstart' in window && navigator.maxTouchPoints > 0 && 
                        ((this.startX !== undefined && this.endX !== undefined && 
                          Math.abs(this.endX - this.startX) < 4) || this.endX === undefined))
                        toggle.dataset.active = 'false';
                    
                    if (this.__releaseTime - this.__pressTime <= 150) {
                        toggleState();
                    }
                },
            });

            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    toggleState();
                }
                if (e.key === ' ') {
                    e.preventDefault();
                }
            });

            toggle.addEventListener('keyup', (e) => {
                if (e.key === ' ') {
                    toggleState();
                }
            });
        });
    }

    // ===== EMAIL CHANGE =====
    async function updateEmail(e) {
        e.preventDefault();
        
        if (emailForm.newEmail !== emailForm.confirmEmail) {
            return showMessage('E-Mails stimmen nicht überein', 'error');
        }

        isSaving = true;
        try {
            const res = await fetch('http://localhost:3000/api/user/update-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    newEmail: emailForm.newEmail,
                    password: emailForm.password
                })
            });

            const data = await res.json();
            if (res.ok) {
                showMessage('E-Mail erfolgreich aktualisiert', 'success');
                emailForm = { newEmail: '', confirmEmail: '', password: '' };
            } else {
                showMessage(data.error || 'Fehler beim Aktualisieren', 'error');
            }
        } catch {
            showMessage('Serverfehler', 'error');
        } finally {
            isSaving = false;
        }
    }

    // ===== PASSWORD CHANGE =====
    async function updatePassword(e) {
        e.preventDefault();
        
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            return showMessage('Passwörter stimmen nicht überein', 'error');
        }

        if (passwordForm.newPassword.length < 6) {
            return showMessage('Passwort zu kurz (min. 6 Zeichen)', 'error');
        }

        isSaving = true;
        try {
            const res = await fetch('http://localhost:3000/api/user/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword
                })
            });

            const data = await res.json();
            if (res.ok) {
                showMessage('Passwort erfolgreich geändert', 'success');
                passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
            } else {
                showMessage(data.error || 'Fehler beim Ändern', 'error');
            }
        } catch {
            showMessage('Serverfehler', 'error');
        } finally {
            isSaving = false;
        }
    }

    // ===== LANGUAGE CHANGE =====
    function changeLanguage(newLang) {
        if (!browser) return;

        currentLanguage = newLang;
        language.set(newLang);
        localStorage.setItem('language', newLang);
        languageDropdownOpen = false;
        showMessage(`Sprache geändert zu ${languageOptions.find(l => l.value === newLang)?.label}`, 'success');
    }

    function toggleLanguageDropdown() {
        languageDropdownOpen = !languageDropdownOpen;
    }

    // ===== HELPER FUNCTIONS =====
    function showMessage(text, type = 'success') {
        message = { text, type };
        setTimeout(() => {
            message = { text: '', type: '' };
        }, 5000);
    }

    function getToggleLabel(toggleName) {
        const labels = {
            darkMode: 'Dark Mode',
            notifications: 'Benachrichtigungen',
            autoSave: 'Auto-Save',
            analytics: 'Analytics',
            privacyMode: 'Privatsphäre-Modus',
            emailUpdates: 'E-Mail Updates',
            cookies: 'Cookies akzeptieren',
            termsAccepted: 'AGB akzeptiert'
        };
        return labels[toggleName] || toggleName;
    }

    function getToggleDescription(toggleName) {
        const descriptions = {
            darkMode: 'Aktiviert den Dunkelmodus für die gesamte Anwendung',
            notifications: 'Erhalte Benachrichtigungen über wichtige Aktivitäten',
            autoSave: 'Automatisches Speichern von Änderungen',
            analytics: 'Sammlung anonymisierter Nutzungsdaten zur Verbesserung',
            privacyMode: 'Beschränkt sichtbare Informationen für andere Nutzer',
            emailUpdates: 'Erhalte regelmäßige Updates per E-Mail',
            cookies: 'Cookies für eine bessere Nutzererfahrung',
            termsAccepted: 'Akzeptiere die Allgemeinen Geschäftsbedingungen'
        };
        return descriptions[toggleName] || '';
    }

    function getToggleIcon(toggleName) {
        const icons = {
            darkMode: 'fa-moon',
            notifications: 'fa-bell',
            autoSave: 'fa-save',
            analytics: 'fa-chart-bar',
            privacyMode: 'fa-shield-alt',
            emailUpdates: 'fa-envelope',
            cookies: 'fa-cookie-bite',
            termsAccepted: 'fa-file-contract'
        };
        return icons[toggleName] || 'fa-toggle-on';
    }
</script>

<svelte:head>
    <title>Einstellungen</title>
</svelte:head>

<!-- SVG Filters -->
{#if browser}
<svg style="display: none">
    <filter id="glass-distortion">
        <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
    </filter>

    <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -10"
            result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo" />
    </filter>
</svg>
{/if}

{#if isLoading}
    <div class="loading-container">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Lade Einstellungen...</p>
    </div>
{:else}
    <div class="settings-container">
        <div class="settings-header">
            <h1><i class="fas fa-cog"></i> Einstellungen</h1>
        </div>

        {#if message.text}
            <div class="message {message.type}">{message.text}</div>
        {/if}

        <div class="settings-grid">
            <!-- Account Settings -->
            <div class="glass-card" data-theme={$theme}>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
                <div class="glass-content">
                    <h3><i class="fas fa-user-cog"></i> Account Einstellungen</h3>

                    <!-- Email Change -->
                    <form onsubmit={updateEmail} class="settings-form">
                        <h4>E-Mail Adresse ändern</h4>
                        <div class="form-group">
                            <label for="current-email">Aktuelle E-Mail</label>
                            <input
                                id="current-email"
                                type="email"
                                value={user?.email || ''}
                                disabled
                                class="disabled-input"
                            />
                        </div>
                        <div class="form-group">
                            <label for="new-email">Neue E-Mail</label>
                            <input
                                id="new-email"
                                type="email"
                                bind:value={emailForm.newEmail}
                                placeholder="neue@email.com"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="confirm-email">E-Mail bestätigen</label>
                            <input
                                id="confirm-email"
                                type="email"
                                bind:value={emailForm.confirmEmail}
                                placeholder="neue@email.com"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="email-password">Passwort zur Bestätigung</label>
                            <input
                                id="email-password"
                                type="password"
                                bind:value={emailForm.password}
                                placeholder="Dein Passwort"
                                required
                            />
                        </div>
                        <button type="submit" class="save-button" disabled={isSaving}>
                            {#if isSaving}
                                <i class="fas fa-spinner fa-spin"></i>
                            {:else}
                                <i class="fas fa-envelope"></i>
                            {/if}
                            E-Mail ändern
                        </button>
                    </form>

                    <div class="divider"></div>

                    <!-- Password Change -->
                    <form onsubmit={updatePassword} class="settings-form">
                        <h4>Passwort ändern</h4>
                        <div class="form-group">
                            <label for="current-password">Aktuelles Passwort</label>
                            <input
                                id="current-password"
                                type="password"
                                bind:value={passwordForm.currentPassword}
                                placeholder="Aktuelles Passwort"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="new-password">Neues Passwort</label>
                            <input
                                id="new-password"
                                type="password"
                                bind:value={passwordForm.newPassword}
                                placeholder="Neues Passwort (min. 6 Zeichen)"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Passwort bestätigen</label>
                            <input
                                id="confirm-password"
                                type="password"
                                bind:value={passwordForm.confirmPassword}
                                placeholder="Passwort wiederholen"
                                required
                            />
                        </div>
                        <button type="submit" class="save-button" disabled={isSaving}>
                            {#if isSaving}
                                <i class="fas fa-spinner fa-spin"></i>
                            {:else}
                                <i class="fas fa-key"></i>
                            {/if}
                            Passwort ändern
                        </button>
                    </form>
                </div>
            </div>

            <!-- Preferences -->
            <div class="glass-card" data-theme={$theme}>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
                <div class="glass-content">
                    <h3><i class="fas fa-sliders-h"></i> Präferenzen</h3>

                    <!-- Custom Language Dropdown -->
                    <div class="preference-item">
                        <div class="preference-info">
                            <i class="fas fa-globe preference-icon"></i>
                            <div>
                                <div class="preference-label">Sprache</div>
                                <div class="preference-description">Wähle deine bevorzugte Sprache</div>
                            </div>
                        </div>
                        <div class="custom-select" class:open={languageDropdownOpen}>
                            <button 
                                type="button"
                                class="select-button" 
                                onclick={toggleLanguageDropdown}
                            >
                                <span class="selected-option">
                                    <span class="flag">{selectedLanguage.flag}</span>
                                    <span>{selectedLanguage.label}</span>
                                </span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            {#if languageDropdownOpen}
                                <div class="select-dropdown">
                                    {#each languageOptions as option}
                                        <button
                                            type="button"
                                            class="select-option"
                                            class:active={option.value === currentLanguage}
                                            onclick={() => changeLanguage(option.value)}
                                        >
                                            <span class="flag">{option.flag}</span>
                                            <span>{option.label}</span>
                                            {#if option.value === currentLanguage}
                                                <i class="fas fa-check"></i>
                                            {/if}
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class="divider"></div>

                    <!-- Toggle Settings -->
                    {#each Object.keys(toggleStates) as toggleName}
                        <div class="preference-item">
                            <div class="preference-info">
                                <i class="fas {getToggleIcon(toggleName)} preference-icon"></i>
                                <div>
                                    <div class="preference-label">{getToggleLabel(toggleName)}</div>
                                    <div class="preference-description">{getToggleDescription(toggleName)}</div>
                                </div>
                            </div>

                            <button
                                aria-label={getToggleLabel(toggleName)}
                                aria-pressed={toggleStates[toggleName].toString()}
                                class="liquid-toggle"
                                data-toggle={toggleName}
                                type="button"
                            >
                                <div class="knockout">
                                    <div class="indicator indicator--masked">
                                        <div class="mask"></div>
                                    </div>
                                </div>
                                <div class="indicator__liquid">
                                    <div class="shadow"></div>
                                    <div class="wrapper">
                                        <div class="liquids">
                                            <div class="liquid__shadow"></div>
                                            <div class="liquid__track"></div>
                                        </div>
                                    </div>
                                    <div class="cover"></div>
                                </div>
                            </button>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Legal -->
            <div class="glass-card" data-theme={$theme}>
                <div class="glass-filter"></div>
                <div class="glass-overlay"></div>
                <div class="glass-specular"></div>
                <div class="glass-content">
                    <h3><i class="fas fa-gavel"></i> Rechtliches</h3>

                    <a href="/terms" class="legal-link">
                        <i class="fas fa-file-contract"></i>
                        <span>Allgemeine Geschäftsbedingungen</span>
                        <i class="fas fa-chevron-right"></i>
                    </a>

                    <a href="/privacy" class="legal-link">
                        <i class="fas fa-shield-alt"></i>
                        <span>Datenschutzerklärung</span>
                        <i class="fas fa-chevron-right"></i>
                    </a>

                    <a href="/cookies" class="legal-link">
                        <i class="fas fa-cookie-bite"></i>
                        <span>Cookie-Einstellungen</span>
                        <i class="fas fa-chevron-right"></i>
                    </a>

                    <a href="/imprint" class="legal-link">
                        <i class="fas fa-info-circle"></i>
                        <span>Impressum</span>
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Base Styles */
    :root {
        --transition: 0.2s;
        --ease: ease-out;
    }

    .settings-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .settings-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .settings-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        color: var(--text, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
        gap: 1rem;
        color: var(--text, #fff);
    }

    .loading-container i {
        font-size: 3rem;
    }

    /* Message */
    .message {
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 500;
        animation: slideDown 0.3s ease-out;
    }

    .message.success {
        background: rgba(52, 199, 89, 0.1);
        border: 1px solid rgba(52, 199, 89, 0.3);
        color: #34c759;
    }

    .message.error {
        background: rgba(255, 59, 48, 0.1);
        border: 1px solid rgba(255, 59, 48, 0.3);
        color: #ff3b30;
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Grid Layout */
    .settings-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
    }

    /* Glass Card */
    .glass-card {
        --bg-color: rgba(255, 255, 255, 0.25);
        --highlight: rgba(255, 255, 255, 0.75);
        --text: #ffffff;
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
        min-height: 300px;
    }
    /* Dark Mode Variante */
    .glass-card[data-theme='dark'] {
        --bg-color: rgba(0, 0, 0, 0.25);
        --highlight: rgba(255, 255, 255, 0.15);
        --text: #ffffff;
    }

    /* Light Mode Variante */
    .glass-card[data-theme='light'] {
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
        background: var(--bg-color);
    }

    .glass-specular {
        z-index: 3;
        box-shadow: inset 1px 1px 1px var(--highlight);
    }

    .glass-content {
        position: relative;
        z-index: 4;
        padding: 2rem;
        color: var(--text);
    }

    .glass-content h3 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .glass-content h4 {
        margin: 0 0 1rem 0;
        font-size: 1.1rem;
        font-weight: 500;
        opacity: 0.9;
    }

    /* Forms */
    .settings-form { margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        font-size: 0.9rem;
        opacity: 0.9;
    }

    .form-group input {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        color: var(--text);
        font-size: 1rem;
        transition: all 0.2s ease;
    }

    .form-group input:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.15);
    }

    .disabled-input {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .save-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #007aff, #5856d6);
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 1rem;
        width: 100%;
        justify-content: center;
    }

    .save-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
    }

    .save-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 2rem 0;
    }

    /* Preferences */
    .preference-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
        gap: 1rem;
    }

    .preference-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
    }

    .preference-icon {
        font-size: 1.25rem;
        opacity: 0.8;
    }

    .preference-label {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .preference-description {
        font-size: 0.85rem;
        opacity: 0.7;
    }

    /* Custom Select Dropdown */
    .custom-select {
        position: relative;
        min-width: 180px;
    }

    .select-button {
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        color: var(--text);
        padding: 0.65rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .select-button:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.4);
    }

    .custom-select.open .select-button {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.4);
    }

    .selected-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .select-button .fa-chevron-down {
        font-size: 0.75rem;
        transition: transform 0.2s ease;
    }

    .custom-select.open .select-button .fa-chevron-down {
        transform: rotate(180deg);
    }

    .select-dropdown {
        position: absolute;
        top: calc(100% + 0.5rem);
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        overflow: hidden;
        z-index: 1000;
        animation: dropdownSlide 0.2s ease-out;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    @keyframes dropdownSlide {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .select-option {
        width: 100%;
        background: transparent;
        border: none;
        color: var(--text);
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: space-between;
    }

    .select-option:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .select-option.active {
        background: rgba(255, 255, 255, 0.05);
    }

    .flag {
        font-size: 1.2rem;
    }

    .select-option .fa-check {
        font-size: 0.8rem;
        color: #34c759;
    }

    /* Legal Links */
    .legal-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        text-decoration: none;
        color: var(--text);
        transition: all 0.2s ease;
        margin-bottom: 0.75rem;
    }

    .legal-link:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(5px);
    }

    .legal-link span {
        flex: 1;
        font-weight: 500;
    }

    .legal-link .fa-chevron-right {
        opacity: 0.5;
        font-size: 0.9rem;
    }

    /* ===== LIQUID TOGGLE ===== */
    [data-pressed=true] .liquid__track {
        min-height: 30px;
    }


    .liquid-toggle:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.3);
    }

    .liquid-toggle:active { outline: none; }
    .liquid-toggle[data-active='true']:focus-visible { outline: 4px solid #0000; }

    .indicator {
        border-radius: 100px;
        pointer-events: none;
        height: 100%;
        width: 100%;
        background: var(--checked);
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
    }


    .indicator--masked {
        background: var(--checked);
        z-index: 12;
        height: 100%;
        width: 100%;
        translate: -50% -50%;
        container-type: inline-size;
    }

    .indicator--masked .mask {
        position: absolute;
        height: calc(100% - (2 * var(--border)));
        width: calc(60% - (2 * var(--border)));
        top: 50%;
        left: var(--border);
        border-radius: 100px;
        translate: calc((var(--complete) / 100) * (100cqi - 60cqi - (0 * var(--border)))) -50%;
        transition-property: height, width, margin, scale;
        transition-duration: var(--transition);
        transition-timing-function: var(--ease);
        will-change: height, width, margin;
        background: white;
    }

    [data-active='true'] .indicator--masked .mask,
    .liquid-toggle:active .indicator--masked .mask {
        height: calc((100% - (2 * var(--border))) * (1.65 - (var(--delta, 0) * 0.025)));
        width: calc((60% - (2 * var(--border))) * (1.65 + (var(--delta, 0) * 0.025)));
        margin-left: calc((60% - (2 * var(--border))) * ((.65 + (var(--delta, 0) * 0.025)) * -0.5));
    }

    .wrapper {
        position: absolute;
        inset: 0;
        border-radius: 100px;
        clip-path: inset(0 0 0 0 round 100px);
        filter: blur(6px);
        transition: filter var(--transition) var(--ease);
    }

    [data-active='true'] .wrapper,
    .liquid-toggle:active .wrapper {
        filter: blur(0px);
    }

    .liquids {
        position: absolute;
        inset: 0;
        transform: translate3d(0, 0, 0);
        border-radius: 100px;
        overflow: hidden;
        filter: url(#goo);
    }

    .liquid__shadow {
        position: absolute;
        inset: 0;
        box-shadow: inset 0px 0px 3px 4px var(--checked),
            inset calc(((var(--complete) / 100) * 8px) + -4px) 0px 3px 4px var(--checked);
        border-radius: 100px;
    }

    .liquid__track {
        content: '';
        height: calc((var(--height) * 1px) - (0 * var(--border)));
        width: calc((var(--width) * 1px) - (0 * var(--border)));
        background: var(--checked);
        border-radius: 100px;
        position: absolute;
        top: 50%;
        left: 0;
        translate: calc((var(--complete) / 100) * (100cqi - 100% - (6 * var(--border)))) -50%;
        transition-property: height, width, filter, left;
        transition-duration: var(--transition);
        transition-timing-function: var(--ease);
    }

    [aria-pressed='true']:not([data-active='true']) .liquid__track {
        left: calc(var(--border) * 6);
    }

    [data-active='true'] .indicator__liquid .liquid__track,
    .liquid-toggle:active .indicator__liquid .liquid__track {
        left: calc(var(--border) * 3);
        height: calc((var(--height) * 1px) - (6 * var(--border)));
    }

    .indicator__liquid {
        position: absolute;
        height: calc(100% - (2 * var(--border)));
        width: calc(60% - (2 * var(--border)));
        container-type: inline-size;
        top: 50%;
        background: #0000;
        left: var(--border);
        border-radius: 100px;
        translate: calc((var(--complete) / 100) * (100cqi - 100% - (2 * var(--border)))) -50%;
        transition-property: scale;
        transition-duration: var(--transition);
        transition-timing-function: var(--ease);
    }

    [data-active='true'] .indicator__liquid,
    .liquid-toggle:active .indicator__liquid {
        scale: calc(1.65 + (var(--delta, 0) * 0.025)) calc(1.65 - (var(--delta, 0) * 0.025));
    }


    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
        .glass-card {
            --bg-color: rgba(0, 0, 0, 0.25);
            --highlight: rgba(255, 255, 255, 0.15);
        }
    }



    @layer transitions {
  :root {
    --transition: 0.2s;
    --ease: ease-out;
  }
  [data-pressed=true] .liquid__track {
    min-height: 30px;
  }
  [data-bounce='true']:has(:is(button:active, [data-pressed="true"])) {
    --transition: 0.6s;
    --ease: linear(
      0 0%,
      0.6091 3.69%,
      1.0259 7.24%,
      1.1733 9.05%,
      1.283 10.92%,
      1.3562 12.87%,
      1.3948 14.95%,
      1.4014 16.03%,
      1.3999 17.16%,
      1.3731 19.64%,
      1.3202 22.27%,
      1.1394 29.39%,
      1.0582 33.17%,
      0.9943 37.45%,
      0.9734 39.64%,
      0.9593 41.92%,
      0.9505 45.08%,
      0.9517 48.7%,
      0.9924 63.02%,
      1.0046 71.2%,
      1.0061 78.24%,
      1 100%
    );
  }
  .indicator--masked .mask {
    translate: calc(
        (var(--complete) / 100) * (100cqi - 60cqi - (0 * var(--border)))
      ) -50%;
    /* transition-property: scale; */
    /* this would work with scale if not for Safari getting funny about the mask */
    transition-property: height, width, margin, scale;
    transition-duration: var(--transition);
    transition-timing-function: var(--ease);
    will-change: height, width, margin;
  }
  .wrapper {
    clip-path: inset(0 0 0 0 round 100px);
    filter: blur(6px);
    transition: filter var(--transition) var(--ease);
  }
  [aria-pressed='true']:not([data-active='true']) .liquid__track {
    left: calc(var(--border) * 6);
  }
  .liquid__track {
    left: 0;
    transition-property: height, width, filter, left;
    transition-duration: var(--transition);
    transition-timing-function: var(--ease);
    translate: calc(
        (var(--complete) / 100) * (100cqi - 100% - (6 * var(--border)))
      ) -50%;
  }
  [data-mapped=false] .liquid__track {
    transition-property: height, width, filter, left, background;
    transition-duration: var(--transition), var(--transition), var(--transition), var(--transition), calc(var(--transition) * 0.5);
    transition-timing-function: var(--ease), var(--ease), var(--ease), var(--ease), ease-out;
  }
  .indicator__liquid {
    translate: calc(
        (var(--complete) / 100) * (100cqi - 100% - (2 * var(--border)))
      ) -50%;
    transition-property: scale;
    transition-duration: var(--transition);
    transition-timing-function: var(--ease);
    /* transform: scale(var(--scale-x, 1), var(--scale-y, 1)); */
  }
  .indicator__liquid :is(.cover, .shadow) {
    transition: opacity var(--transition) var(--ease);
  }
  /* these are the actual changes when we scale up */
  /* these should also with a [data-active=true] when [data-debug=true] */
  [data-active='true'] .indicator--masked .mask,
  .liquid-toggle:active .indicator--masked .mask {
    height: calc((100% - (2 * var(--border))) * (1.65 - (var(--delta, 0) * 0.025)));
    width: calc((60% - (2 * var(--border))) * (1.65 + (var(--delta, 0) * 0.025)));
    margin-left: calc((60% - (2 * var(--border))) * ((.65 + (var(--delta, 0) * 0.025)) * -0.5));
    /* we can't use scale because of Safari flashing the mask color on change... */
    /* scale: 1.65; */
  }
  [data-active='true'] .indicator__liquid,
  .liquid-toggle:active .indicator__liquid {
    scale: calc(1.65 + (var(--delta, 0) * 0.025)) calc(1.65 - (var(--delta, 0) * 0.025));
  }

  [data-active='true'] .wrapper,
  .liquid-toggle:active .wrapper {
    filter: blur(0px);
  }

  [data-active='true'] .indicator__liquid .shadow,
  .liquid-toggle:active .indicator__liquid .shadow {
    opacity: 1;
  }

  [data-active='true'] .indicator__liquid .cover,
  .liquid-toggle:active .indicator__liquid .cover {
    opacity: 0;
  }

  [data-active='true'] .indicator__liquid .liquid__track,
  .liquid-toggle:active .indicator__liquid .liquid__track {
    left: calc(var(--border) * 3);
    height: calc((var(--height) * 1px) - (6 * var(--border)));
  }
}

@layer toggle {
  /* this is the button */
  [data-mapped=false] .liquid-toggle {
    --progress: round(down, var(--complete), 85);
    --checked: hsl(
      var(--hue, 144),
      calc((8 + (var(--progress) / 85 * (92))) * 1%),
      calc((81 - (var(--progress) / 85 * (81 - 43))) * 1%)
    );
    .indicator, .indicator--masked {
      transition: background calc(var(--transition) * 0.5) ease-out;
    }
    .liquid__shadow {
      transition: box-shadow calc(var(--transition) * 0.5) ease-out;
    }
  }

  .liquid-toggle {
    --unchecked: hsl(218, 8%, 81%);
    /* --checked: hsl(144, 100%, 43%); */
    --checked: hsl(
      var(--hue, 144),
      calc((8 + (var(--complete) / 100 * (92))) * 1%),
      calc((81 - (var(--complete) / 100 * (81 - 43))) * 1%)
    );
    --control: hsl(300, 100%, 100%);
    --border: 5px;
        --width: 80;
        --height: 40;
    height: calc(var(--height) * 1px);
    width: calc(var(--width) * 1px);
    border-radius: 100px;
    border: 0;
    padding: 0;
    cursor: pointer;
    position: relative;
    overflow: visible;
    container-type: inline-size;
    background: transparent;
    transition: outline var(--transition) var(--ease);
    outline-offset: 2px;
  }



  .liquid-toggle:focus-visible {
    outline: 4px solid color-mix(in oklch, var(--checked), #0000);
  }

  .liquid-toggle:active {
    outline: none;
  }
  .liquid-toggle[data-active='true']:focus-visible {
    outline: 4px solid #0000;
  }



  .knockout {
    height: calc(var(--height) * 1px);
    width: calc(var(--width) * 1px);
    border-radius: 100px;
    filter: url(#remove-black);
    position: absolute;
    inset: 0;
    will-change: filter, scale;
    transform: translate3d(0, 0, 0);
  }


  .wrapper {
    position: absolute;
    inset: 0;
    border-radius: 100px;
  }


    .indicator {
    border-radius: 100px;
    pointer-events: none;
    height: 100%;
    width: 100%;
    background: var(--checked);
    /* outline: 2px dashed canvasText; */
    position: absolute;
    top: 50%;
    scale: 1;
    left: 50%;
    translate: -50% -50%;
  }

    .indicator--masked {
    background: var(--checked);
    z-index: 12;
    height: 100%;
    width: 100%;
    translate: -50% -50%;
    container-type: inline-size;

    .mask {
      position: absolute;
      height: calc(100% - (2 * var(--border)));
      width: calc(60% - (2 * var(--border)));
      top: 50%;
      left: var(--border);
      border-radius: 100px;
    }
  }

  
  .liquids {
    position: absolute;
    inset: 0;
    transform: translate3d(0, 0, 0);
    border-radius: 100px;
    overflow: hidden;
    filter: url(#goo);

    .liquid__shadow {
      position: absolute;
      inset: 0;
      box-shadow: inset 0px 0px 3px 4px var(--checked),
        inset calc(((var(--complete) / 100) * 8px) + -4px) 0px 3px 4px
          var(--checked);
      border-radius: 100px;
    }

    .liquid__track {
      content: '';
      height: calc((var(--height) * 1px) - (0 * var(--border)));
      width: calc((var(--width) * 1px) - (0 * var(--border)));
      background: var(--checked);
      border-radius: 100px;
      position: absolute;
      top: 50%;
    }
  }

  .indicator__liquid {
    position: absolute;
    height: calc(100% - (2 * var(--border)));
    width: calc(60% - (2 * var(--border)));
    container-type: inline-size;
    top: 50%;
    /* only apply a background if you don't want to see underneath */
    background: #0000;
    left: var(--border);
    border-radius: 100px;

    .shadow {
      opacity: 0;
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 100px;
      box-shadow: 1px -1px 2px hsl(0 0% 100% / 0.5) inset,
        0px -1px 2px hsl(0 0% 100% / 0.5) inset,
        -1px -1px 2px hsl(0 0% 100% / 0.5) inset,
        1px 1px 2px hsl(0 0% 30% / 0.5) inset,
        -8px 4px 10px -6px hsl(0 0% 30% / 0.25) inset,
        -1px 1px 6px hsl(0 0% 30% / 0.25) inset,
        -1px -1px 8px hsl(0 0% 60% / 0.15), 1px 1px 2px hsl(0 0% 30% / 0.15),
        2px 2px 6px hsl(0 0% 30% / 0.15),
        -2px -1px 2px hsl(0 0% 100% / 0.25) inset,
        3px 6px 16px -6px hsl(0 0% 30% / 0.5);
      z-index: 20;
    }

    .cover {
      content: '';
      position: absolute;
      inset: 0;
      background: white;
      border-radius: 100px;
    }
  }
}

@layer base {
  :root {
    --font-size-min: 16;
    --font-size-max: 20;
    --font-ratio-min: 1.2;
    --font-ratio-max: 1.33;
    --font-width-min: 375;
    --font-width-max: 1500;
  }

  html {
    color-scheme: light dark;
  }

  [data-theme='light'] {
    color-scheme: light only;
  }

  [data-theme='dark'] {
    color-scheme: dark only;
  }

  :where(.fluid) {
    --fluid-min: calc(
      var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0))
    );
    --fluid-max: calc(
      var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0))
    );
    --fluid-preferred: calc(
      (var(--fluid-max) - var(--fluid-min)) /
        (var(--font-width-max) - var(--font-width-min))
    );
    --fluid-type: clamp(
      (var(--fluid-min) / 16) * 1rem,
      ((var(--fluid-min) / 16) * 1rem) -
        (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) +
        (var(--fluid-preferred) * var(--variable-unit, 100vi)),
      (var(--fluid-max) / 16) * 1rem
    );
    font-size: var(--fluid-type);
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  body {
    background: light-dark(#fff, #000);
    display: grid;
    place-items: center;
    min-height: 100vh;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif, system-ui;
  }

  body::before {
    --size: 45px;
    --line: color-mix(in hsl, canvasText, transparent 80%);
    content: '';
    height: 100vh;
    width: 100vw;
    position: fixed;
    background: linear-gradient(
          90deg,
          var(--line) 1px,
          transparent 1px var(--size)
        )
        calc(var(--size) * 0.36) 50% / var(--size) var(--size),
      linear-gradient(var(--line) 1px, transparent 1px var(--size)) 0%
        calc(var(--size) * 0.32) / var(--size) var(--size);
    mask: linear-gradient(-20deg, transparent 60%, tramsparent 100%);
    top: 0;
    transform-style: flat;
    pointer-events: none;
    z-index: -1;
  }

  .bear-link {
    color: canvasText;
    position: fixed;
    top: 1rem;
    left: 1rem;
    width: 48px;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    opacity: 0.8;
  }

  :where(.x-link, .bear-link):is(:hover, :focus-visible) {
    opacity: 1;
  }

  .bear-link svg {
    width: 75%;
  }

  /* Utilities */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}
</style>