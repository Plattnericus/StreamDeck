<script lang="ts">
  import { scale, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { openTab, getCenterPosition } from '../../lib/openTab';
  import { appStore } from '../../lib/appStore';
  import { loadLastOpened, trackOpenedApp } from '../../lib/lastOpened';
  import Settings from '../apps/Settings.svelte';
  import Browser  from '../apps/Browser.svelte';
  import Terminal from '../apps/Terminal.svelte';
  import Finder   from '../apps/Finder.svelte';
  import Papierkorb from '../apps/Trash.svelte';
  import Apps from '../apps/Apps.svelte';

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

  let nextZIndex = 100;

  let apps: App[] = [
    { id: 1, name: 'Finder', icon: '/icons/finder.webp', open: false, minimized: false, maximized: false, component: Finder, default: true, x: 0, y: 0, width: 800, height: 600, zIndex: 100 },
    { id: 2, name: 'App Store', icon: '/icons/app-store.webp', open: false, minimized: false, maximized: false, component: Apps, default: true, x: 0, y: 0, width: 600, height: 400, zIndex: 101 },
    { id: 3, name: 'Settings', icon: '/icons/settings.webp', open: false, minimized: false, maximized: false, component: Settings, default: true, x: 0, y: 0, width: 600, height: 400, zIndex: 102 },
    { id: 4, name: 'Safari', icon: '/icons/safari.webp', open: false, minimized: false, maximized: false, component: Browser, default: true, x: 0, y: 0, width: 800, height: 500, zIndex: 103 },
    { id: 5, name: 'Terminal', icon: '/icons/terminal.webp', open: false, minimized: false, maximized: false, component: Terminal, default: false, x: 0, y: 0, width: 500, height: 350, zIndex: 104 },
    { id: 10, name: 'Trash', icon: '/icons/trash.webp', open: false, minimized: false, maximized: false, component: Papierkorb, default: true, x: 0, y: 0, width: 500, height: 350, zIndex: 105 },
  ];

  appStore.set(apps);

  $: appStore.set(apps);

  function draggable(node: HTMLElement, app: App) {
    let moving = false;
    function handleMouseDown(e: MouseEvent) {
      if (!(e.target as HTMLElement).classList.contains('title-bar') || app.maximized) return;
      moving = true;
      focusApp(app.id);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    function handleMouseMove(e: MouseEvent) {
      if (!moving) return;
      app.x += e.movementX;
      app.y += e.movementY;
      apps = apps; 
    }
    function handleMouseUp() {
      moving = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    node.addEventListener('mousedown', handleMouseDown);
    return { destroy() { node.removeEventListener('mousedown', handleMouseDown); } };
  }

  function resizable(node: HTMLElement, app: App) {
    function handleMouseDown(e: MouseEvent) {
      if (app.maximized) return;
      e.preventDefault();
      e.stopPropagation();
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    function handleMouseMove(e: MouseEvent) {
      app.width = Math.max(300, e.clientX - app.x);
      app.height = Math.max(200, e.clientY - app.y);
      apps = apps;
    }
    function handleMouseUp() {
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
    if(nextZIndex > 9999) nextZIndex = 100;
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

  onMount(() => {
    loadLastOpened();
    subscribeToStore();
  });
</script>

<div class="page-container">
  <div class="card-conatainer">
    {#each [...apps.filter(a => a.open && !a.default), ...apps.filter(a => a.default && a.name !== 'Trash'), ...apps.filter(a => a.name === 'Trash')] as app}
      <div class="dock-item"
           role="button"
           tabindex="0"
           on:click={() => openApp(app)}
           on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openApp(app)}>
        <span class="app-tooltip">{app.name}</span>
        <img src={app.icon} alt={app.name} />
        {#if app.open}
          <span class="dot"></span>
        {/if}
      </div>
    {/each}
  </div>
</div>

{#each apps as app (app.id)}
  {#if app.open && !app.minimized}
    <div 
      class="app-window shadow-xl" 
      class:maximized={app.maximized}
      role="button"
      tabindex="0"
      aria-label={app.name}
      use:draggable={app}
      on:mousedown={() => focusApp(app.id)}
      on:keydown={(e) => e.key === 'Escape' && closeApp(app)}
      transition:scale={{ duration: 300, start: 0.9, easing: cubicOut }}
      style="left: {app.maximized ? 0 : app.x}px; 
             top: {app.maximized ? 0 : app.y}px; 
             width: {app.maximized ? '100vw' : app.width + 'px'}; 
             height: {app.maximized ? '100vh' : app.height + 'px'}; 
             z-index: {app.zIndex}"
    >
      <div class="title-bar">
        <div class="controls">
          <button class="ctrl close" aria-label="Close window" title="Close window" on:click|stopPropagation={() => closeApp(app)}></button>
          <button class="ctrl minimize" aria-label="Minimize window" title="Minimize window" on:click|stopPropagation={() => toggleMinimize(app)}></button>
          <button class="ctrl maximize" aria-label="Maximize window" title="Maximize window" on:click|stopPropagation={() => toggleMaximize(app)}></button>
        </div>
        <span class="title-text">{app.name}</span>
      </div>
      
      <div class="window-content">
        <svelte:component this={app.component} on:openapp={handleOpenApp} />
      </div>

      {#if !app.maximized}
        <div class="resizer" use:resizable={app}></div>
      {/if}
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
    gap: 10px; 
    justify-content: center; 
    align-items: flex-end; 
  }

  .dock-item {
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    z-index: 10000000;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .app-tooltip {
    position: absolute;
    top: -20px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    color: white;
    padding: 5px 12px;
    border-radius: 8px;
    font-size: 13px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    border: 0.5px solid rgba(255, 255, 255, 0.2);
  }

  .dock-item:hover .app-tooltip {
    opacity: 1;
  }

  .dock-item:hover {
    z-index: 10000000;
    transform: scale(1.5) translateY(-10px);
  }

  .dock-item img {
    width: 60px;
    height: 60px;
  }

  .dot {
    position: absolute;
    bottom: 10px;
    width: 5px;
    height: 5px;
    background: black;
    border-radius: 50%;
  }

  .app-window {
    scrollbar-display: none;
    position: fixed; 
    background: rgba(30, 30, 30, 0.85);
    backdrop-filter: blur(25px);
    border-radius: 12px;
    border: 0.5px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), 
                height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), 
                top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), 
                left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
                border-radius 0.3s ease;
    will-change: width, height, top, left;
  }

  .app-window {
  position: fixed;
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}

  .app-window:active {
    transition: none;
  }

  .app-window.maximized {
    border-radius: 0;
  }

  .title-bar {
    height: 32px;
    display: flex;
    align-items: center;
    font-size: 4em;
    font-weight: bold;
    padding: 0 12px;
    cursor: default;
    user-select: none;
    flex-shrink: 0;
  }

  .controls{
    display:flex;
    gap:8px;
    z-index:10;
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
    box-shadow:
      inset 0 0 0 0.5px rgba(0,0,0,.22),
      0 0.5px 0 rgba(255,255,255,.18);
  }

  .close{background:#ff5f57;}
  .minimize{background:#febc2e;}
  .maximize{background:#28c840;}

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

  .controls:hover .ctrl::after{opacity:1; }
  .controls:hover .ctrl{
    transform: scale(1.15);
  }


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

  .ctrl:hover{filter:brightness(.97);}


  .title-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    pointer-events: none;
  }

  .window-content {
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
</style>
