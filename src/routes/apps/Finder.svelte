<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { openTab } from "../../lib/openTab";
  import { addOrOpenApp } from "../../lib/appStore";
  import { filterOutStandardApps } from "../../lib/appFilter";

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
    persistKey: "appstore_installed_v5",
    cardMinWidth: 320,

    icons: {
      // "Browser": "safari.webp",
      // "Settings": "settings.webp",
      // "Galerie": "photos.webp",
      // "Terminal": "/icons/terminal.webp"
    } as Record<string, string>,

    priority: {
      // higher = higher in list
      // "Settings": 1000,
      // "Browser": 900
    } as Record<string, number>
  } as const;

  const dispatch = createEventDispatcher<{ openapp: { app: App } }>();

  let nextZIndex = 1000;
  const installed = new Set<number>();
  let installedTick = 0;

  function stableId(s: string) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h % 1000000;
  }

  function fileNameOnly(path: string) {
    return (path.split("/").pop() || path).trim();
  }

  function fileBase(path: string) {
    const f = fileNameOnly(path);
    return f.toLowerCase().endsWith(".svelte") ? f.slice(0, -6) : f;
  }

  function normalizeIcon(icon?: string) {
    const raw = (icon ?? "").trim();
    if (!raw) return CFG.iconBase + CFG.fallbackIcon;
    if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("data:")) return raw;
    if (raw.startsWith("/")) return raw;
    return CFG.iconBase + raw.replace(/^\.\//, "");
  }

  function iconFor(name: string, file: string, metaIcon?: string) {
    if (metaIcon?.trim()) return normalizeIcon(metaIcon);
    const byName = CFG.icons[name] ?? CFG.icons[name.toLowerCase()];
    if (byName) return normalizeIcon(byName);
    const byFile = CFG.icons[file] ?? CFG.icons[file.toLowerCase()];
    if (byFile) return normalizeIcon(byFile);
    return CFG.iconBase + CFG.fallbackIcon;
  }

  function prioFor(name: string, file: string) {
    const p =
      CFG.priority[name] ??
      CFG.priority[name.toLowerCase()] ??
      CFG.priority[file] ??
      CFG.priority[file.toLowerCase()] ??
      0;
    return typeof p === "number" ? p : 0;
  }

  function isImageLike(s: string) {
    return s.startsWith("/") || s.startsWith("http") || s.startsWith("data:") || s.includes(".");
  }

  const modules = import.meta.glob("./*.svelte", { eager: true }) as Record<
    string,
    {
      default: any;
      app?: {
        id?: number;
        name?: string;
        icon?: string;
        subtitle?: string;
        description?: string;
        category?: string;
        developer?: string;
        version?: string;
        width?: number;
        height?: number;
        default?: boolean;
      };
    }
  >;

  let apps: App[] = Object.entries(modules)
    .filter(([p]) => filterOutStandardApps(fileNameOnly(p)))
    .map(([path, mod]) => {
      const meta = mod.app ?? {};
      const file = fileNameOnly(path);
      const base = fileBase(path);
      const name = meta.name ?? base;
      const category = meta.category ?? "Other";
      const subtitle = meta.subtitle ?? category;

      return {
        id: meta.id ?? stableId(name),
        name,
        file,
        icon: iconFor(name, file, meta.icon),
        component: mod.default,
        category,
        subtitle,
        description: meta.description,
        developer: meta.developer ?? "Unknown Developer",
        version: meta.version ?? "1.0.0",

        open: false,
        minimized: false,
        maximized: false,
        default: meta.default ?? true,
        x: 0,
        y: 0,
        width: meta.width ?? 740,
        height: meta.height ?? 560,
        zIndex: nextZIndex++,

        priority: prioFor(name, file)
      };
    })
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
      <div class="card" role="button" tabindex="0" on:dblclick={() => open(app)} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && open(app)}>
        <div class="top">
          {#if isImageLike(app.icon)}
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
::-webkit-scrollbar-button {
  display: none;
}

  .glass{
    width: 100%;
    height: 100%;
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

  .scroller::-webkit-scrollbar{
    width: 10px;
    height: 10px;
  }
  .scroller::-webkit-scrollbar-thumb{
    background: rgba(255,255,255,0.18);
    border-radius: 999px;
    border: 3px solid rgba(0,0,0,0);
    background-clip: padding-box;
  }
  .scroller::-webkit-scrollbar-track{
    background: transparent;
  }
  .scroller::-webkit-scrollbar-button{
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

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
    transition: transform .12s ease, background .12s ease, border-color .12s ease;
  }
  .card:hover{
    transform: translateY(-2px);
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.14);
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
  }

  .meta{flex:1;min-width:0}
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
  }
  .btn:hover{ background: rgba(0,122,255,0.30); }

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
  }
  .ver{
    font-size: 11px;
    color: rgba(255,255,255,0.56);
  }

  @media (max-width: 740px){
    .card{ max-width: 100%; }
  }
</style>
