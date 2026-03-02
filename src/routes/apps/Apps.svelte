<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { openTab } from "../../lib/openTab";
  import { addOrOpenApp } from "../../lib/appStore";

  import Browser from "./Browser.svelte";
  import About from "./About.svelte";
  import Apps from "./Apps.svelte";
  import Changelog from "./Changelog.svelte";
  import Galerie from "./Galerie.svelte";
  import Impressum from "./Impressum.svelte";
  import Agb from "./AGB.svelte";
  import Info from "./Info.svelte";
  import Settings from "./Settings.svelte";
  import Terminal from "./Terminal.svelte";
  import Datenschutz from "./Datenschutz.svelte";
  import Model from "./Model.svelte";
  import Cookies from "./Cookies-info.svelte";

  type App = {
    id: number;
    name: string;
    file: string;
    icon: string;
    component: any;
    category: string;
    subtitle: string;
    description?: string;
    developer: string;
    version: string;

    open: boolean;
    minimized: boolean;
    maximized: boolean;
    default: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;

    priority: number;
  };

  const CFG = {
    iconBase: "/icons/",
    fallbackIcon: "fallback.png",
    persistInstalled: false,
    persistKey: "appstore_installed_manual_v1",
    cardMinWidth: 320
  } as const;

  let loading = new Set<number>();
  let downloading = new Set<number>();
  let downloadProgress = new Map<number, number>();
  let errors = new Map<number, string>();
  let tick = 0;
  let searchQuery = "";

  const APP_LIST: Omit<App, "open" | "minimized" | "maximized" | "default" | "x" | "y" | "zIndex" | "priority">[] = [
    { id: 101, name: "About", file: "About.svelte", icon: "about.webp", component: About, category: "System", subtitle: "Über das Projekt", description: "Allgemeine Informationen über das StreamDeck-Projekt.", developer: "System", version: "111.0.2g", width: 740, height: 560 },
    { id: 102, name: "Info", file: "Info.svelte", icon: "info.webp", component: Info, category: "System", subtitle: "Produktinformationen", description: "Informationen zum Produkt StreamDeck und dessen Funktionen.", developer: "System", version: "1.0.0", width: 320, height: 480 },
    { id: 103, name: "3D-Modell", file: "Model.svelte", icon: "model.webp", component: Model, category: "System", subtitle: "3D-Modellviewer", description: "Anzeigen und Interagieren mit 3D-Modellen.", developer: "System", version: "1.0.0", width: 520, height: 760 },
    { id: 104, name: "Galerie", file: "Galerie.svelte", icon: "fotos.webp", component: Galerie, category: "System", subtitle: "Bilder", description: "Durchsuchen und Anzeigen von Bildern.", developer: "System", version: "8.0.0", width: 720, height: 560 },
    { id: 105, name: "Terminal", file: "Terminal.svelte", icon: "terminal.webp", component: Terminal, category: "System", subtitle: "Kommandozeile", description: "Ausführen von Befehlen über eine integrierte Konsole.", developer: "System", version: "1.0.0", width: 920, height: 760 },
    { id: 106, name: "Changelog", file: "Changelog.svelte", icon: "changelog.webp", component: Changelog, category: "System", subtitle: "Änderungen", description: "Versionsverlauf und Neuerungen des Projekts.", developer: "System", version: "9.4.2", width: 640, height: 480 },
    { id: 107, name: "Datenschutz", file: "Datenschutz.svelte", icon: "datenschutz.webp", component: Datenschutz, category: "System", subtitle: "Datenschutzrichtlinie", description: "Informationen zur Verarbeitung und zum Schutz personenbezogener Daten.", developer: "System", version: "1.20b.0", width: 720, height: 560 },
    { id: 108, name: "Impressum", file: "Impressum.svelte", icon: "impressum.webp", component: Impressum, category: "System", subtitle: "Rechtliche Angaben", description: "Gesetzlich vorgeschriebene Angaben zum Anbieter.", developer: "System", version: "21.0.0", width: 720, height: 560 },
    { id: 109, name: "AGB", file: "AGB.svelte", icon: "agb.webp", component: Agb, category: "System", subtitle: "Nutzungsbedingungen", description: "Allgemeine Geschäfts- und Nutzungsbedingungen.", developer:"System" , version:"1.0.0" , width : 720 , height : 560 },
    { id: 110, name: "Cookies", file: "Cookies-info.svelte", icon: "cookies.png", component: Cookies, category: "System", subtitle: "Cookie-Richtlinie", description: "Informationen zu Cookies und deren Verwendung.", developer:"System" , version:"1.0.1" , width : 720 , height : 560 }
  ];


  const dispatch = createEventDispatcher<{ openapp: { app: App } }>();

  let nextZIndex = 1000;
  const installed = new Set<number>();

  function iconUrl(icon: string) {
    const s = (icon || "").trim();
    if (!s) return CFG.iconBase + CFG.fallbackIcon;
    if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:")) return s;
    if (s.startsWith("/")) return s;
    return CFG.iconBase + s.replace(/^\.\//, "");
  }

  function isImg(s: string) {
    return s.startsWith("/") || s.startsWith("http") || s.startsWith("data:") || s.includes(".");
  }

  function prioFromId(id: number) {
    return 1000000 - id;
  }

  let apps: App[] = APP_LIST
    .map((a) => ({
      ...a,
      icon: iconUrl(a.icon),
      priority: prioFromId(a.id),
      open: false,
      minimized: false,
      maximized: false,
      default: true,
      x: 0,
      y: 0,
      zIndex: nextZIndex++
    }))
    .sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name));

  function isInstalled(id: number) {
    return installed.has(id);
  }

  function loadInstalled() {
    if (!CFG.persistInstalled) return;
    try {
      const raw = localStorage.getItem(CFG.persistKey);
      if (!raw) return;
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) arr.forEach((n) => typeof n === "number" && installed.add(n));
      tick++;
    } catch {}
  }

  function saveInstalled() {
    if (!CFG.persistInstalled) return;
    try {
      localStorage.setItem(CFG.persistKey, JSON.stringify([...installed]));
    } catch {}
  }

  function get(app: App) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        downloading.add(app.id);
        downloadProgress.set(app.id, 0);
        tick++;

        const duration = 1800 + Math.random() * 1200; // 1.8s–3s
        const start = performance.now();
        await new Promise<void>((res) => {
          function step() {
            const elapsed = performance.now() - start;
            const pct = Math.min(100, Math.round((elapsed / duration) * 100));
            downloadProgress.set(app.id, pct);
            tick++;
            if (pct < 100) {
              requestAnimationFrame(step);
            } else {
              res();
            }
          }
          requestAnimationFrame(step);
        });

        installed.add(app.id);
        errors.delete(app.id);
        downloading.delete(app.id);
        downloadProgress.delete(app.id);
        tick++;
        saveInstalled();
        resolve();
      } catch (err) {
        errors.set(app.id, err instanceof Error ? err.message : "Installation fehlgeschlagen");
        downloading.delete(app.id);
        downloadProgress.delete(app.id);
        tick++;
        reject(err);
      }
    });
  }

  function open(app: App) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        loading.add(app.id);
        tick++;
        
        installed.add(app.id);
        openTab(app);
        addOrOpenApp(app);
        app.zIndex = nextZIndex++;
        errors.delete(app.id);
        saveInstalled();
        dispatch("openapp", { app });
        
        await new Promise(r => setTimeout(r, 100));
        
        loading.delete(app.id);
        tick++;
        resolve();
      } catch (err) {
        errors.set(app.id, err instanceof Error ? err.message : "App konnte nicht geöffnet werden");
        loading.delete(app.id);
        tick++;
        reject(err);
      }
    });
  }

  async function handleAppAction(app: App) {
    try {
      if (downloading.has(app.id) || loading.has(app.id)) return;
      if (isInstalled(app.id)) {
        await open(app);
      } else {
        await get(app);
      }
    } catch (err) {
      console.error("App-Aktion fehlgeschlagen:", err);
    }
  }

  $: filteredApps = searchQuery.trim() === ""
    ? apps
    : apps.filter((a) => {
        const q = searchQuery.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          (a.description ?? "").toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
        );
      });

  onMount(loadInstalled);
</script>

<div class="glass">
  <div class="search-bar">
    <svg class="search-icon" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
    <input
      class="search-input"
      type="search"
      placeholder="Apps durchsuchen…"
      bind:value={searchQuery}
      autocomplete="off"
      spellcheck="false"
    />
    {#if searchQuery.length > 0}
      <button class="search-clear" type="button" on:click={() => (searchQuery = "")} aria-label="Suche löschen">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
    {/if}
  </div>
  <div class="scroller" style={`--min:${CFG.cardMinWidth}px`}>
    {#if filteredApps.length === 0}
      <div class="empty-state">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="21" cy="21" r="13" fill="none" stroke="currentColor" stroke-width="2.5"/>
          <line x1="30" y1="30" x2="43" y2="43" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="16" y1="21" x2="26" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>Keine Apps für „{searchQuery}" gefunden.</p>
      </div>
    {:else}
    {#each filteredApps as app (app.id)}
      <div
        class="card"
        class:loading={tick >= 0 && (loading.has(app.id) || downloading.has(app.id))}
        class:error={errors.has(app.id)}
        role="button"
        tabindex="0"
        on:dblclick={() => handleAppAction(app)}
        on:keydown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !loading.has(app.id) && !downloading.has(app.id)) {
            e.preventDefault();
            handleAppAction(app);
          }
        }}
      >
        <div class="top">
          {#if isImg(app.icon)}
            <img class="icon" src={app.icon} alt={app.name} loading="lazy" />
          {:else}
            <div class="iconEmoji">{app.icon}</div>
          {/if}

          <div class="meta">
            <div class="name">{app.name}</div>
            <div class="sub">{app.subtitle}</div>
          </div>

          <button 
            class="btn"
            class:btn-downloading={tick >= 0 && downloading.has(app.id)}
            class:btn-installed={tick >= 0 && !downloading.has(app.id) && !loading.has(app.id) && installed.has(app.id)}
            type="button" 
            disabled={tick >= 0 && (loading.has(app.id) || downloading.has(app.id))}
            on:click|stopPropagation={() => handleAppAction(app)}
          >
            {#key tick}
              {#if downloading.has(app.id)}
                {@const pct = downloadProgress.get(app.id) ?? 0}
                {@const r = 11}
                {@const circ = 2 * Math.PI * r}
                {@const offset = circ * (1 - pct / 100)}
                <svg class="progress-ring" viewBox="0 0 32 32" aria-hidden="true">
                  <circle class="ring-track" cx="16" cy="16" r={r}/>
                  <circle class="ring-fill" cx="16" cy="16" r={r}
                    style="stroke-dasharray:{circ};stroke-dashoffset:{offset}"
                  />
                </svg>
              {:else if loading.has(app.id)}
                <span class="spinner"></span>
              {:else if installed.has(app.id)}
                Öffnen
              {:else}
                Laden
              {/if}
            {/key}
          </button>
        </div>

        <div class="desc">{app.description ?? "—"}</div>

        <div class="bot">
          <span class="pill">{app.category}</span>
          <span class="ver">v{app.version}</span>
          {#if errors.has(app.id)}
            <span class="error-badge" title={errors.get(app.id)}>Fehler</span>
          {/if}
        </div>

        {#if errors.has(app.id)}
          <div class="error-message">{errors.get(app.id)}</div>
        {/if}
      </div>
    {/each}
    {/if}
  </div>
</div>

<style>
  :global(::-webkit-scrollbar-button){ display:none !important; width:0 !important; height:0 !important; }
  :global(::-webkit-scrollbar-corner){ background: transparent !important; }

  .glass{
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(520px 260px at 20% 0%, rgba(0,122,255,0.16), transparent 60%),
      radial-gradient(520px 260px at 80% 0%, rgba(255,120,210,0.12), transparent 62%),
      rgba(14,14,18,0.72);
    border: 1px solid rgba(255,255,255,0.10);
    backdrop-filter: blur(18px) saturate(165%);
    box-shadow:
      0 24px 70px rgba(0,0,0,0.45),
      inset 0 1px 0 rgba(255,255,255,0.06);
  }

  .scroller{
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 12px 16px 16px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--min), 1fr));
    gap: 16px;
    align-content: flex-start;
    scrollbar-width: none;
  }

  .search-bar{
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .search-icon{
    width: 16px;
    height: 16px;
    color: rgba(255,255,255,0.40);
    flex-shrink: 0;
    pointer-events: none;
  }

  .search-input{
    flex: 1;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.11);
    border-radius: 10px;
    padding: 7px 12px;
    font-size: 13px;
    color: rgba(255,255,255,0.92);
    outline: none;
    font-family: inherit;
    transition: background .15s ease, border-color .15s ease, box-shadow .15s ease;
  }

  .search-input::placeholder{
    color: rgba(255,255,255,0.32);
  }

  .search-input:focus{
    background: rgba(255,255,255,0.10);
    border-color: rgba(0,122,255,0.55);
    box-shadow: 0 0 0 3px rgba(0,122,255,0.18);
  }

  .search-input::-webkit-search-cancel-button{ display: none; }

  .search-clear{
    all: unset;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255,255,255,0.09);
    cursor: pointer;
    flex-shrink: 0;
    transition: background .14s ease;
  }

  .search-clear svg{
    width: 12px;
    height: 12px;
    color: rgba(255,255,255,0.60);
  }

  .search-clear:hover{
    background: rgba(255,255,255,0.17);
  }

  .empty-state{
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 56px 24px;
    color: rgba(255,255,255,0.35);
    text-align: center;
  }

  .empty-state svg{
    width: 46px;
    height: 46px;
    opacity: 0.35;
  }

  .empty-state p{
    font-size: 13px;
    font-weight: 500;
    margin: 0;
    line-height: 1.5;
  }

  .scroller::-webkit-scrollbar{ width: 10px; height: 10px; }
  .scroller::-webkit-scrollbar-thumb{
    background: rgba(255,255,255,0.18);
    border-radius: 999px;
    border: 3px solid rgba(0,0,0,0);
    background-clip: padding-box;
  }
  .scroller::-webkit-scrollbar-track{ background: transparent; }
  .scroller::-webkit-scrollbar-button{ display:none !important; width:0 !important; height:0 !important; }

  .card{
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    cursor: pointer;
    transform: translateY(0) scale(1);
    opacity: 0;
    animation: pop .22s ease forwards;
    transition: transform .16s cubic-bezier(0.34, 1.56, 0.64, 1), background .16s ease, border-color .16s ease, box-shadow .16s ease;
  }

  .card:hover{
    transform: translateY(-3px) scale(1.01);
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.16);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }

  .card:active{
    transform: translateY(-1px) scale(0.995);
  }

  .card.loading{
    opacity: 0.85;
  }

  .card.error{
    border-color: rgba(255,100,100,0.3);
    background: rgba(255,100,100,0.05);
  }

  .card.error:hover{
    border-color: rgba(255,100,100,0.4);
    background: rgba(255,100,100,0.08);
  }

  .top{
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: nowrap;
  }

  .icon{
    width: 56px;
    height: 56px;
    border-radius: 20px;
    object-fit: cover;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.08);
    transition: transform .18s cubic-bezier(0.34, 1.56, 0.64, 1), filter .18s ease, box-shadow .18s ease;
    flex-shrink: 0;
  }

  .card:hover .icon{
    transform: scale(1.06);
    filter: saturate(1.08) brightness(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .iconEmoji{
    width: 56px;
    height: 56px;
    border-radius: 20px;
    display:flex;
    align-items:center;
    justify-content:center;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.08);
    font-size: 26px;
    transition: transform .18s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
  }

  .card:hover .iconEmoji{
    transform: scale(1.06);
  }

  .meta{ 
    flex: 1; 
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .name{
    color: rgba(255,255,255,0.95);
    font-weight: 950;
    font-size: 15px;
    letter-spacing: -0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  .sub{
    font-size: 12px;
    color: rgba(255,255,255,0.68);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    letter-spacing: 0.1px;
  }

  .btn{
    position: relative;
    border: 1px solid rgba(0,122,255,0.32);
    background: rgba(0,122,255,0.22);
    color: rgba(255,255,255,0.92);
    border-radius: 999px;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 950;
    cursor: pointer;
    transition: transform .14s ease, background .14s ease, border-color .14s ease, min-width .2s ease, padding .2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-width: 70px;
    height: 34px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .btn-downloading{
    border-color: rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.06);
    min-width: 40px;
    padding: 4px;
    cursor: default;
  }

  .btn-installed{
    border-color: rgba(0,122,255,0.50);
    background: rgba(0,122,255,0.32);
  }

  .btn:hover:not(:disabled){
    background: rgba(0,122,255,0.35);
    border-color: rgba(0,122,255,0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  }

  .btn:active:not(:disabled){
    transform: translateY(0px) scale(0.98);
  }

  .btn:disabled{
    opacity: 0.65;
    cursor: not-allowed;
  }

  .spinner{
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: rgba(255,255,255,0.9);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin{
    to { transform: rotate(360deg); }
  }

  .progress-ring{
    width: 26px;
    height: 26px;
    display: block;
  }

  .ring-track{
    fill: none;
    stroke: rgba(255,255,255,0.15);
    stroke-width: 3;
  }

  .ring-fill{
    fill: none;
    stroke: rgba(255,255,255,0.92);
    stroke-width: 3;
    stroke-linecap: round;
    transform-origin: 16px 16px;
    transform: rotate(-90deg);
    transition: stroke-dashoffset 0.08s linear;
  }

  .desc{
    color: rgba(255,255,255,0.72);
    font-size: 12px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 34px;
  }

  .bot{
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .pill{
    font-size: 11px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.75);
    font-weight: 600;
    transition: all .18s cubic-bezier(0.34, 1.56, 0.64, 1);
    letter-spacing: 0.2px;
  }

  .card:hover .pill{
    transform: translateY(-2px);
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.18);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .ver{
    font-size: 11px;
    color: rgba(255,255,255,0.56);
  }

  .error-badge{
    font-size: 10px;
    padding: 4px 8px;
    border-radius: 4px;
    background: rgba(255,100,100,0.3);
    color: rgba(255,150,150,0.9);
    border: 1px solid rgba(255,100,100,0.4);
    cursor: help;
  }

  .error-message{
    margin-top: 8px;
    padding: 8px 10px;
    border-radius: 8px;
    background: rgba(255,100,100,0.15);
    border: 1px solid rgba(255,100,100,0.3);
    color: rgba(255,150,150,0.9);
    font-size: 11px;
    line-height: 1.3;
    animation: slideDown .2s ease;
  }

  @keyframes slideDown{
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pop{
    from { opacity: 0; transform: translateY(6px) scale(0.99); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 740px){
    .scroller{ grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce){
    .card{ animation: none; opacity: 1; }
    .card, .icon, .iconEmoji, .btn, .pill{ transition: none; }
    .ring-fill{ animation: none; stroke-dashoffset: 0; }
  }
</style>
