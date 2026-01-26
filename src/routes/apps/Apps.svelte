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
    persistInstalled: true,
    persistKey: "appstore_installed_manual_v1",
    cardMinWidth: 320
  } as const;

  const APP_LIST: Omit<App, "open" | "minimized" | "maximized" | "default" | "x" | "y" | "zIndex" | "priority">[] = [
    { id: 101, name: "About", file: "About.svelte", icon: "about.webp", component: About, category: "System", subtitle: "Über das Projekt", description: "Allgemeine Informationen über das StreamDeck-Projekt.", developer: "System", version: "1.0.0", width: 740, height: 560 },
    { id: 102, name: "Info", file: "Info.svelte", icon: "info.webp", component: Info, category: "System", subtitle: "Produktinformationen", description: "Informationen zum Produkt StreamDeck und dessen Funktionen.", developer: "System", version: "1.0.0", width: 320, height: 480 },
    { id: 103, name: "Galerie", file: "Galerie.svelte", icon: "fotos.webp", component: Galerie, category: "System", subtitle: "Bilder", description: "Durchsuchen und Anzeigen von Bildern.", developer: "System", version: "1.0.0", width: 720, height: 560 },
    { id: 104, name: "Terminal", file: "Terminal.svelte", icon: "terminal.webp", component: Terminal, category: "System", subtitle: "Kommandozeile", description: "Ausführen von Befehlen über eine integrierte Konsole.", developer: "System", version: "1.0.0", width: 720, height: 560 },
    { id: 105, name: "Changelog", file: "Changelog.svelte", icon: "changelog.webp", component: Changelog, category: "System", subtitle: "Änderungen", description: "Versionsverlauf und Neuerungen des Projekts.", developer: "System", version: "1.0.0", width: 640, height: 480 },
    { id: 106, name: "Datenschutz", file: "Datenschutz.svelte", icon: "datenschutz.webp", component: Datenschutz, category: "System", subtitle: "Datenschutzrichtlinie", description: "Informationen zur Verarbeitung und zum Schutz personenbezogener Daten.", developer: "System", version: "1.0.0", width: 720, height: 560 },
    { id: 107, name: "Impressum", file: "Impressum.svelte", icon: "impressum.webp", component: Impressum, category: "System", subtitle: "Rechtliche Angaben", description: "Gesetzlich vorgeschriebene Angaben zum Anbieter.", developer: "System", version: "1.0.0", width: 720, height: 560 },
    { id: 108, name: "AGB", file: "AGB.svelte", icon: "agb.webp", component: Agb, category: "System", subtitle: "Nutzungsbedingungen", description: "Allgemeine Geschäfts- und Nutzungsbedingungen.", developer: "System", version: "1.0.0", width: 720, height: 560 }
  ];


  const dispatch = createEventDispatcher<{ openapp: { app: App } }>();

  let nextZIndex = 1000;
  const installed = new Set<number>();
  let installedTick = 0;

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
      installedTick++;
    } catch {}
  }

  function saveInstalled() {
    if (!CFG.persistInstalled) return;
    try {
      localStorage.setItem(CFG.persistKey, JSON.stringify([...installed]));
    } catch {}
  }

  function get(app: App) {
    installed.add(app.id);
    installedTick++;
    saveInstalled();
  }

  function open(app: App) {
    installed.add(app.id);
    openTab(app);
    addOrOpenApp(app);
    app.zIndex = nextZIndex++;
    installedTick++;
    saveInstalled();
    dispatch("openapp", { app });
  }

  onMount(loadInstalled);
</script>

<div class="glass">
  <div class="scroller" style={`--min:${CFG.cardMinWidth}px`}>
    {#each apps as app (app.id)}
      <div
        class="card"
        role="button"
        tabindex="0"
        on:dblclick={() => open(app)}
        on:keydown={(e) => (e.key === "Enter" || e.key === " ") && open(app)}
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

          <button class="btn" type="button" on:click|stopPropagation={() => (isInstalled(app.id) ? open(app) : get(app))}>
            {#key installedTick}{isInstalled(app.id) ? "Open" : "Get"}{/key}
          </button>
        </div>

        <div class="desc">{app.description ?? "—"}</div>

        <div class="bot">
          <span class="pill">{app.category}</span>
          <span class="ver">v{app.version}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  :global(::-webkit-scrollbar-button){ display:none !important; width:0 !important; height:0 !important; }
  :global(::-webkit-scrollbar-corner){ background: transparent !important; }

  .glass{
    border-radius: 18px;
    overflow: hidden;
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
    height: 100%;
    overflow: auto;
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-content: flex-start;
    scrollbar-width: none;
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
    flex: 1 1 var(--min);
    max-width: calc(50% - 6px);
    min-width: min(var(--min), 100%);
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    transform: translateY(0) scale(1);
    opacity: 0;
    animation: pop .22s ease forwards;
    transition: transform .14s ease, background .14s ease, border-color .14s ease;
  }

  .card:hover{
    transform: translateY(-2px) scale(1.01);
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.14);
  }

  .card:active{
    transform: translateY(0px) scale(0.99);
  }

  .top{
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon{
    width: 54px;
    height: 54px;
    border-radius: 18px;
    object-fit: cover;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.08);
    transition: transform .14s ease, filter .14s ease;
  }

  .card:hover .icon{
    transform: scale(1.04);
    filter: saturate(1.05);
  }

  .iconEmoji{
    width: 54px;
    height: 54px;
    border-radius: 18px;
    display:flex;
    align-items:center;
    justify-content:center;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.08);
    font-size: 24px;
    transition: transform .14s ease;
  }

  .card:hover .iconEmoji{
    transform: scale(1.04);
  }

  .meta{ flex: 1; min-width: 0; }

  .name{
    color: rgba(255,255,255,0.92);
    font-weight: 950;
    letter-spacing: -0.25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sub{
    margin-top: 2px;
    font-size: 12px;
    color: rgba(255,255,255,0.72);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn{
    border: 1px solid rgba(0,122,255,0.32);
    background: rgba(0,122,255,0.22);
    color: rgba(255,255,255,0.92);
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 950;
    cursor: pointer;
    transition: transform .14s ease, background .14s ease, border-color .14s ease;
  }

  .btn:hover{
    background: rgba(0,122,255,0.30);
    transform: translateY(-1px);
  }

  .btn:active{
    transform: translateY(0px) scale(0.98);
  }

  .desc{
    color: rgba(255,255,255,0.72);
    font-size: 12px;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bot{
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .pill{
    font-size: 11px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.72);
    transition: transform .14s ease, background .14s ease;
  }

  .card:hover .pill{
    transform: translateY(-1px);
    background: rgba(255,255,255,0.06);
  }

  .ver{
    font-size: 11px;
    color: rgba(255,255,255,0.56);
  }

  @keyframes pop{
    from { opacity: 0; transform: translateY(6px) scale(0.99); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 740px){
    .card{ max-width: 100%; }
  }

  @media (prefers-reduced-motion: reduce){
    .card{ animation: none; opacity: 1; }
    .card, .icon, .iconEmoji, .btn, .pill{ transition: none; }
  }
</style>
