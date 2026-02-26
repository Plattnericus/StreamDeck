<script lang="ts">
  import { scale, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { openTab, getCenterPosition } from '../../lib/openTab';
  import { appStore } from '../../lib/appStore';
  import { loadLastOpened, trackOpenedApp } from '../../lib/lastOpened';
  import DockItemMagnified from './DockItemMagnified.svelte';

  import Settings from '../apps/Settings.svelte';
  import Browser  from '../apps/Browser.svelte';
  import Terminal from '../apps/Terminal.svelte';
  import Finder   from '../apps/Finder.svelte';
  import Papierkorb from '../apps/Trash.svelte';
  import Apps from '../apps/Apps.svelte';
  import Github from '../apps/Github.svelte';

  type App = {
    id: number;
    name: string;
    icon: string;
    open: boolean;
    minimized: boolean;
    maximized: boolean;
    component: any;
    default: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
  };

  let nextZIndex = -100;
  let contextMenu: { appId: number; x: number; y: number } | null = null;
  let headerHeight = 28;

  $: focusedId = [...apps]
    .filter(a => a.open && !a.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? -1;

const baseSize = 90;
const distanceLimit = baseSize * 6;

const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit
];

const sizeOutput = [
  baseSize,
  baseSize * 1.1,
  baseSize * 1.414,
  baseSize * 1.9,
  baseSize * 1.414,
  baseSize * 1.1,
  baseSize
];

  let dockMouseX: number | null = null;
let dockEls = new Map<number, HTMLElement>();
let dockSizes: Record<number, number> = {};

function setDockEl(id: number) {
  return (el: HTMLElement | null) => {
    if (el) dockEls.set(id, el);
    else dockEls.delete(id);
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolatePiecewise(x: number, input: number[], output: number[]) {
  if (x <= input[0]) return output[0];
  if (x >= input[input.length - 1]) return output[output.length - 1];

  for (let i = 0; i < input.length - 1; i++) {
    const x0 = input[i], x1 = input[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0);
      return lerp(output[i], output[i + 1], t);
    }
  }
  return baseSize;
}

let raf = 0;
function scheduleDockUpdate() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const next: Record<number, number> = {};

    if (dockMouseX === null) {
      for (const app of apps) next[app.id] = baseSize;
      dockSizes = next;
      return;
    }

    for (const app of apps) {
      const el = dockEls.get(app.id);
      if (!el) { next[app.id] = baseSize; continue; }

      const r = el.getBoundingClientRect();
      const centerX = r.left + r.width / 2;
      const dist = dockMouseX - centerX;

      next[app.id] = interpolatePiecewise(dist, distanceInput, sizeOutput);
    }

    dockSizes = next;
  });
}


  let apps: App[] = [
    { id: 1, name: 'Finder', icon: '/icons/finder.webp', open: false, minimized: false, maximized: false, component: Finder, default: true, x: 0, y: 0, width: 600, height: 400, zIndex: 100 },
    { id: 2, name: 'App Store', icon: '/icons/app-store.webp', open: false, minimized: false, maximized: false, component: Apps, default: true, x: 0, y: 0, width: 800, height: 600, zIndex: 101 },
    { id: 3, name: 'Settings', icon: '/icons/settings.webp', open: false, minimized: false, maximized: false, component: Settings, default: true, x: 0, y: 0, width: 600, height: 400, zIndex: 102 },
    { id: 4, name: 'Safari', icon: '/icons/safari.webp', open: false, minimized: false, maximized: false, component: Browser, default: true, x: 0, y: 0, width: 1000, height: 700, zIndex: 103 },
    { id: 5, name: 'Terminal', icon: '/icons/terminal.webp', open: false, minimized: false, maximized: false, component: Terminal, default: false, x: 0, y: 0, width: 500, height: 350, zIndex: 104 },
    { id: 6, name: 'Github', icon: '/icons/github.webp', open: false, minimized: false, maximized: false, component: Github, default: true, x: 0, y: 0, width: 820, height: 650, zIndex: 105 },
    { id: 10, name: 'Trash', icon: '/icons/trash.webp', open: false, minimized: false, maximized: false, component: Papierkorb, default: true, x: 0, y: 0, width: 500, height: 350, zIndex: 106 },
  ];

  appStore.set(apps);

  $: appStore.set(apps);

  function draggable(node: HTMLElement, app: App) {
    let moving = false;
    let liveX = app.x;
    let liveY = app.y;
    let cachedHH = 28;
    let maxX = 0;
    let maxY = 0;
    let rafId = 0;

    function handleMouseDown(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.title-bar')) return;
      if (app.maximized) {
        app.maximized = false;
        apps = apps;
      }
      liveX = app.x;
      liveY = app.y;
      const header = document.querySelector('header');
      cachedHH = header ? Math.ceil(header.getBoundingClientRect().height) : 28;
      maxX = Math.max(0, window.innerWidth - app.width);
      maxY = Math.max(cachedHH, window.innerHeight - app.height);
      moving = true;
      node.classList.add('is-dragging');
      node.style.left = liveX + 'px';
      node.style.top  = liveY + 'px';
      focusApp(app.id);
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(e: MouseEvent) {
      if (!moving) return;
      liveX = clamp(liveX + e.movementX, 0, maxX);
      liveY = clamp(liveY + e.movementY, cachedHH, maxY);
      app.x = liveX;
      app.y = liveY;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        node.style.left = liveX + 'px';
        node.style.top  = liveY + 'px';
      });
    }

    function handleMouseUp() {
      if (!moving) return;
      moving = false;
      cancelAnimationFrame(rafId);
      node.style.left = liveX + 'px';
      node.style.top  = liveY + 'px';
      app.x = liveX;
      app.y = liveY;
      requestAnimationFrame(() => node.classList.remove('is-dragging'));
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    node.addEventListener('mousedown', handleMouseDown);
    return { destroy() { node.removeEventListener('mousedown', handleMouseDown); } };
  }

  function resizable(node: HTMLElement, app: App) {
    let win: HTMLElement | null = null;
    let liveW = app.width;
    let liveH = app.height;
    function handleMouseDown(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      if (app.maximized) {
        app.maximized = false;
        apps = apps;
        return;
      }
      liveW = app.width;
      liveH = app.height;
      win = node.closest('.app-window') as HTMLElement | null;
      if (win) win.classList.add('is-resizing');
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseup', handleMouseUp);
    }
    function handleMouseMove(e: MouseEvent) {
      liveW = Math.max(300, e.clientX - app.x);
      liveH = Math.max(200, e.clientY - app.y);
      if (win) {
        win.style.width  = liveW + 'px';
        win.style.height = liveH + 'px';
      }
    }
    function handleMouseUp() {
      if (win) {
        win.classList.remove('is-resizing');
        win.style.width  = '';
        win.style.height = '';
      }
      app.width  = liveW;
      app.height = liveH;
      apps = apps;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    node.addEventListener('mousedown', handleMouseDown);
    return { destroy() { node.removeEventListener('mousedown', handleMouseDown); } };
  }

  function openApp(app: App) {
    if (app.open) {
      if (app.minimized) {
        app.minimized = false;
      }
      focusApp(app.id);
    } else {
      openTab(app);
      focusApp(app.id);
      trackOpenedApp({
        id: app.id,
        name: app.name,
        icon: app.icon,
        timestamp: Date.now(),
        openCount: 1
      });
      apps = apps;
    }
  }

  function closeApp(app: App) {
    app.open = false;
    apps = apps;
    appStore.set(apps);
  }

  function toggleMinimize(app: App) {
    app.minimized = true;
    apps = apps;
  }

  function toggleMaximize(app: App) {
    app.maximized = !app.maximized;
    apps = apps;
  }

  function focusApp(id: number) {
    nextZIndex++;
    if(nextZIndex > 9999) nextZIndex = -100;
    const app = apps.find(a => a.id === id);
    if (app) {
      app.zIndex = nextZIndex;
      apps = apps;
    }
  }

  function handleOpenApp(event: CustomEvent) {
    const externalApp = event.detail.app;
    if (externalApp) {
      openTab(externalApp);
      externalApp.zIndex = nextZIndex++;
      apps = [...apps];
    }
  }

  function subscribeToStore() {
    appStore.subscribe(storeApps => {
      if (storeApps && storeApps.length > 0) {
        apps = storeApps;
      }
    });
  }

  function handleDockContextMenu(event: MouseEvent, appId: number) {
    event.preventDefault();
    contextMenu = { appId, x: event.clientX, y: event.clientY };
  }

  function closeContextMenu() {
    contextMenu = null;
  }

  function handleContextAction(action: 'open' | 'close') {
    if (!contextMenu) return;
    const app = apps.find(a => a.id === contextMenu!.appId);
    if (!app) return;
    if (action === 'open') {
      openApp(app);
    } else if (action === 'close') {
      closeApp(app);
    }
    closeContextMenu();
  }

  onMount(() => {
    loadLastOpened();
    subscribeToStore();
    const handleClickOutside = () => closeContextMenu();
    document.addEventListener('click', handleClickOutside);
    
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) headerHeight = Math.ceil(header.getBoundingClientRect().height);
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', updateHeaderHeight);
    };
  });
</script>

<div class="page-container">
  <div class="card-conatainer" role="none" onmousemove={(e) => (dockMouseX = e.clientX)} onmouseleave={() => (dockMouseX = null)}>
    {#each [...apps.filter(a => a.open && !a.default), ...apps.filter(a => a.default && a.name !== 'Trash'), ...apps.filter(a => a.name === 'Trash')] as app}
      <DockItemMagnified
        app_id={app.id}
        name={app.name}
        icon={app.icon}
        is_open={app.open}
        mouse_x={dockMouseX}
        is_hovering={dockMouseX !== null}
        onclick={() => openApp(app)}
        oncontextmenu={(e: MouseEvent) => handleDockContextMenu(e, app.id)}
      />
    {/each}
  </div>
</div>

{#if contextMenu}
  <div 
    class="dock-context-overlay"
    role="button"
    tabindex="0"
    onclick={closeContextMenu}
    onkeydown={(e) => e.key === 'Escape' && closeContextMenu()}
  >
    <div 
      class="dock-context-menu"
      style={`left: ${contextMenu.x}px; top: ${contextMenu.y}px;`}
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.key === 'Escape' && closeContextMenu()}
      role="menu"
      tabindex="0"
    >
      {#if contextMenu !== null && apps.find(a => a.id === contextMenu!.appId)?.open}
        <button class="context-item" role="menuitem" onclick={() => handleContextAction('close')}>
          Close
        </button>
      {/if}
      {#if contextMenu !== null && !apps.find(a => a.id === contextMenu!.appId)?.open}
        <button class="context-item" role="menuitem" onclick={() => handleContextAction('open')}>
          Open
        </button>
      {/if}
    </div>
  </div>
{/if}

{#each apps as app (app.id)}
  {#if app.open && !app.minimized}
    <div 
      class="app-window" 
      class:maximized={app.maximized}
      class:focused={app.id === focusedId}
      role="button"
      tabindex="0"
      aria-label={app.name}
      use:draggable={app}
      onmousedown={() => focusApp(app.id)}
      onkeydown={(e) => (e.key === 'Escape') && closeApp(app)}
      transition:fade={{ duration: 200 }}
      style:left="{app.maximized ? 0 : app.x}px"
      style:top="{app.maximized ? headerHeight : app.y}px"
      style:width="{app.maximized ? '100vw' : app.width + 'px'}"
      style:height="{app.maximized ? `calc(100vh - ${headerHeight}px)` : app.height + 'px'}"
      style:z-index={app.zIndex}
    >
      <div class="title-bar" ondblclick={(e) => { e.stopPropagation(); toggleMaximize(app); }}>
        <div class="controls">
          <button class="ctrl close" aria-label="Close window" title="Close window" onclick={(e) => {e.stopPropagation(); closeApp(app);}}></button>
          <button class="ctrl minimize" aria-label="Minimize window" title="Minimize window" onclick={(e) => {e.stopPropagation(); toggleMinimize(app);}}></button>
          <button class="ctrl maximize" aria-label="Maximize window" title="Maximize window" onclick={(e) => {e.stopPropagation(); toggleMaximize(app);}}></button>
        </div>
        <span class="title-text">{app.name}</span>
      </div>
      
      <div class="window-content">
        <svelte:component this={app.component} on:openapp={handleOpenApp} />
      </div>

      <div class="resizer" use:resizable={app}></div>
    </div>
  {/if}
{/each}

<style>
   :global(::-webkit-scrollbar-button){ display:none !important; width:0 !important; height:0 !important; }
  :global(::-webkit-scrollbar-corner){ background: transparent !important; }
  :global(html, body) { overflow: hidden; }
  * { scrollbar-width: none; }
  *::-webkit-scrollbar { width: 0; height: 0; display: none; }

  .card-conatainer {
    display: flex;
    flex-direction: row;
    gap: 2px;
    justify-content: center; 
    align-items: flex-end;
    height: 76px;
    overflow: visible;
  }

  .app-window {
    position: fixed;
    background: rgba(28, 28, 30, 0.82);
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border-radius: 12px;
    border: 0.5px solid rgba(255, 255, 255, 0.14);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow:
      0 0 0 0.5px rgba(0,0,0,0.28),
      0 2px 6px rgba(0,0,0,0.18),
      0 8px 24px rgba(0,0,0,0.22),
      0 32px 64px rgba(0,0,0,0.3);
    transition:
      width  0.38s cubic-bezier(0.25, 1, 0.5, 1),
      height 0.38s cubic-bezier(0.25, 1, 0.5, 1),
      top    0.38s cubic-bezier(0.25, 1, 0.5, 1),
      left   0.38s cubic-bezier(0.25, 1, 0.5, 1),
      border-radius 0.38s ease,
      box-shadow 0.2s ease,
      opacity 0.2s ease;
    will-change: transform;
    opacity: 0.92;
  }

  .app-window.focused {
    opacity: 1;
    box-shadow:
      0 0 0 0.5px rgba(0,0,0,0.32),
      0 2px 8px rgba(0,0,0,0.22),
      0 12px 32px rgba(0,0,0,0.28),
      0 40px 80px rgba(0,0,0,0.36);
  }

  .app-window.is-dragging,
  .app-window.is-resizing {
    transition: none;
  }

  .app-window.maximized {
    border-radius: 0;
  }

  .title-bar {
    position: relative;
    z-index: 10;
    height: 32px;
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: move;
    user-select: none;
    flex-shrink: 0;
    background: rgba(58, 58, 60, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 0.5px solid rgba(255,255,255,0.08);
    transition: background 180ms ease;
  }

  .app-window:not(.focused) .title-bar {
    background: rgba(44, 44, 46, 0.88);
  }

  .controls{
    display:flex;
    gap:8px;
    z-index:10;
    flex-shrink: 0;
  }

  .ctrl{
    width:14px;
    height:14px;
    border-radius:999px;
    border:none;
    padding:0;
    position:relative;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    cursor:default;
    transition: filter 120ms ease, transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow:
      inset 0 0 0 0.5px rgba(0,0,0,.22),
      0 0.5px 0 rgba(255,255,255,.12);
  }

  .close{background:#ff5f57;}
  .minimize{background:#febc2e;}
  .maximize{background:#28c840;}

  .app-window:not(.focused) .close,
  .app-window:not(.focused) .minimize,
  .app-window:not(.focused) .maximize { background: #5a5a5e; }

  .ctrl::after{
    content:"";
    width:9px;
    height:9px;
    opacity:0;
    transition:opacity 120ms ease;
    background-repeat:no-repeat;
    background-position:center;
    background-size:contain;
    filter: drop-shadow(0 0.25px 0 rgba(255,255,255,.18));
  }

  .title-bar:hover .ctrl::after { opacity: 1; }
  .ctrl:focus-visible { outline: none; }


  .close::after{
    background-image:url("/icons/close.png");
    width:8px;
    height:8px;
  }

  .minimize::after{
    background-image:url("/icons/minimize.png");
    width:8px;
    height:8px;
  }

  .maximize::after{
    background-image:url("/icons/maximize.png");
    width:8px;
    height:8px;
  }

  .controls:hover .ctrl { transform: scale(1.25); filter: brightness(0.92); }


  .title-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: rgba(255, 255, 255, 0.85);
    pointer-events: none;
    transition: color 180ms ease;
    white-space: nowrap;
  }

  .app-window:not(.focused) .title-text {
    color: rgba(255,255,255,0.4);
  }

  .window-content {
    position: relative;
    flex: 1;
    padding: 15px;
    color: white;
    overflow: auto;
  }

  .resizer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 15px;
    height: 15px;
    cursor: nwse-resize;
    z-index: 20;
  }

  .dock-context-overlay {
    position: fixed;
    inset: 0;
    z-index: 1200;
  }

  .dock-context-menu {
    position: fixed;
    min-width: 230px;
    padding: 6px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(80px) saturate(180%);
    color: rgba(20, 20, 20, 0.95);
    z-index: 1201;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
    animation: menuPop 160ms ease-out;
    pointer-events: auto;
  }

  .context-item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 14px;
    color: rgba(20, 20, 20, 0.95);
    border: none;
    background: none;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease, transform 140ms ease;
  }

  .context-item:hover {
    background: rgba(200, 200, 200, 0.4);
    color: rgba(10, 10, 10, 0.99);
    transform: translateX(1px);
  }

  @keyframes menuPop {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
