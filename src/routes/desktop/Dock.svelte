<script lang="ts">
  import Settings from '../apps/Settings.svelte';
  import Browser  from '../apps/Browser.svelte';
  import Terminal from '../apps/Terminal.svelte';
  import Finder from '../apps/Finder.svelte';
  import Papierkorb from '../apps/Trash.svelte';

  type App = {
    id: number;
    name: string;
    icon: string;
    open: boolean;
    component: any;
    default: boolean;
    x: number;
    y: number;
    zIndex: number;
  };

  let nextZIndex = 100;

  let apps: App[] = [
    { id: 1, name: 'Finder', icon: '/icons/finder.webp', open: false, component: Finder, default: true, x: 100, y: 100, zIndex: 100 },
    { id: 2, name: 'Settings', icon: '/icons/settings.webp', open: false, component: Settings, default: true, x: 150, y: 150, zIndex: 101 },
    { id: 3, name: 'Safari', icon: '/icons/safari.webp', open: false, component: Browser, default: true, x: 200, y: 200, zIndex: 102 },
    { id: 4, name: 'Terminal', icon: '/icons/terminal.webp', open: false, component: Terminal, default: false, x: 250, y: 250, zIndex: 103 },
    { id: 10, name: 'Trash', icon: '/icons/trash.webp', open: false, component: Papierkorb, default: true, x: 300, y: 300, zIndex: 104 },
  ];

  // Svelte Action für das Verschieben (Draggable)
  function draggable(node: HTMLElement, app: App) {
    let moving = false;

    function handleMouseDown(e: MouseEvent) {
      // Nur wenn auf die Title-Bar geklickt wird
      if (!(e.target as HTMLElement).classList.contains('title-bar')) return;
      
      moving = true;
      focusApp(app.id); // Fenster in den Vordergrund bringen

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(e: MouseEvent) {
      if (!moving) return;
      app.x += e.movementX;
      app.y += e.movementY;
      
      // UI Update triggern
      apps = apps; 
    }

    function handleMouseUp() {
      moving = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    node.addEventListener('mousedown', handleMouseDown);

    return {
      destroy() {
        node.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }

  function openApp(app: App) {
    app.open = true;
    focusApp(app.id);
    apps = apps;
  }

  function closeApp(app: App) {
    app.open = false;
    apps = apps;
  }

  function focusApp(id: number) {
    nextZIndex++;
    const app = apps.find(a => a.id === id);
    if (app) {
      app.zIndex = nextZIndex;
      apps = apps;
    }
  }
</script>

<div class="page-container">
  <div class="card-conatainer">
    {#each apps.filter(a => a.default) as app}
      <div class="dock-item"
           role="button"
           tabindex="0"
           on:click={() => openApp(app)}
           on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openApp(app)}>
        <img src={app.icon} alt={app.name} />
        {#if app.open}
          <span class="dot"></span>
        {/if}
      </div>
    {/each}
  </div>
</div>

{#each apps as app (app.id)}
  {#if app.open}
    <div 
      class="app-window shadow-xl" 
      use:draggable={app}
      on:mousedown={() => focusApp(app.id)}
      style="left: {app.x}px; top: {app.y}px; z-index: {app.zIndex}"
    >
      <div class="title-bar">
        <div class="controls">
          <button class="ctrl close" on:click|stopPropagation={() => closeApp(app)}></button>
          <button class="ctrl minimize"></button>
          <button class="ctrl maximize"></button>
        </div>
        <span class="title-text">{app.name}</span>
      </div>
      
      <div class="window-content">
        <svelte:component this={app.component} />
      </div>
    </div>
  {/if}
{/each}

<style>
  /* Container für Zentrierung des Docks */

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
    bottom: -5px;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
  }

  /* Fenster-Styles */
  .app-window {
    position: fixed; 
    width: 500px;
    height: 350px;
    background: rgba(30, 30, 30, 0.85);
    backdrop-filter: blur(25px);
    border-radius: 12px;
    border: 0.5px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
  }

  .title-bar {
    height: 32px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: default; /* Handle für Drag */
    user-select: none;
  }

  .controls {
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  .ctrl {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }

  .close { background: #ff5f56; }
  .minimize { background: #ffbd2e; }
  .maximize { background: #27c93f; }

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
</style>