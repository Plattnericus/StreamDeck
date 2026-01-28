<script lang="ts">
  import Dock from './Dock.svelte';
  import Header from './Header.svelte';
  import { createEventDispatcher, onMount } from "svelte";

  onMount(() => {
    const glassElements = document.querySelectorAll<HTMLElement>('.glass-card');

    function handleMouseMove(this: HTMLElement, e: MouseEvent) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const filter = this.querySelector('feDisplacementMap');
      if (filter) {
        const scaleX = (x / rect.width) * 100;
        const scaleY = (y / rect.height) * 100;
        filter.setAttribute('scale', Math.min(scaleX, scaleY).toString());
      }

      const specular = this.querySelector<HTMLElement>('.glass-specular');
      if (specular) {
        specular.style.background = `radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255,255,255,0.15) 0%,
          rgba(255,255,255,0.05) 30%,
          rgba(255,255,255,0) 60%
        )`;
      }
    }

    function handleMouseLeave(this: HTMLElement) {
      const filter = this.querySelector('feDisplacementMap');
      if (filter) {
        filter.setAttribute('scale', '77');
      }

      const specular = this.querySelector<HTMLElement>('.glass-specular');
      if (specular) {
        specular.style.background = 'none';
      }
    }

    glassElements.forEach(element => {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
  });

  type Rect = { x: number; y: number; w: number; h: number };

  const dispatch = createEventDispatcher<{
    start: { rect: Rect };
    change: { rect: Rect };
    end: { rect: Rect };
  }>();

  let host!: HTMLDivElement;

  let dragging = false;
  let startX = 0;
  let startY = 0;

  let rect: Rect = { x: 0, y: 0, w: 0, h: 0 };

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  function toHostXY(clientX: number, clientY: number) {
    const r = host.getBoundingClientRect();
    return {
      x: clamp(clientX - r.left, 0, r.width),
      y: clamp(clientY - r.top, 0, r.height),
      w: r.width,
      h: r.height
    };
  }

  function updateRect(currX: number, currY: number) {
    const x1 = Math.min(startX, currX);
    const y1 = Math.min(startY, currY);
    const x2 = Math.max(startX, currX);
    const y2 = Math.max(startY, currY);
    rect = { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
    dispatch("change", { rect });
  }

  function onPointerDown(e: PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    host.setPointerCapture(e.pointerId);

    const p = toHostXY(e.clientX, e.clientY);
    dragging = true;
    startX = p.x;
    startY = p.y;
    rect = { x: startX, y: startY, w: 0, h: 0 };
    dispatch("start", { rect });
    e.preventDefault();
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    const p = toHostXY(e.clientX, e.clientY);
    updateRect(p.x, p.y);
    e.preventDefault();
  }

  function onPointerUp(e: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    dispatch("end", { rect });
    e.preventDefault();
  }

  function onPointerCancel() {
    if (!dragging) return;
    dragging = false;
    dispatch("end", { rect });
  }

  onMount(() => {
    host.style.touchAction = "none";
  });
</script>

<Header />


<div
  class="marquee-host"
  bind:this={host}
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointercancel={onPointerCancel}
  on:lostpointercapture={onPointerCancel}
>
  <slot />

  {#if dragging && (rect.w > 0 || rect.h > 0)}
    <div
      class="selection"
      style="
        left:{rect.x}px;
        top:{rect.y}px;
        width:{rect.w}px;
        height:{rect.h}px;
      "
    />
  {/if}
</div>

<svg style="display: none">
  <filter id="glass-distortion">
    <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
  </filter>
</svg>

<div class="page-container">
  <div class="glass-card">
    <div class="glass-filter"></div>
    <div class="glass-distortion-overlay"></div>
    <div class="glass-overlay"></div>
    <div class="glass-specular"></div>
    <div class="glass-content">
      <Dock />
    </div>
  </div>
</div>

<style>
:global(body) {
  margin: 0;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background-image: url(/lake-tahoe.webp);
  background-size: cover;

  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
  :global(::-webkit-scrollbar-button){ display:none !important; width:0 !important; height:0 !important; }
  :global(::-webkit-scrollbar-corner){ background: transparent !important; }
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-button { display: none; width: 0; height: 0; }

/* Fonts */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

  .marquee-host {
    position: relative;
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
  }

  .selection {
    position: absolute;
    pointer-events: none;
    border: 1px solid rgba(80, 150, 255, 0.95);
    background: rgba(80, 150, 255, 0.20);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15) inset;
  }

/* Container */
.page-container {
  margin-top: auto;
  margin-bottom: 20px;
  align-self: center;

  display: flex;
  align-items: flex-end;
  padding: 10px;
  border-radius: 24px;
  gap: 12px;
  pointer-events: auto;
}

.glass-card {
  --bg-color: rgba(255, 255, 255, 0.25);
  --highlight: rgba(255, 255, 255, 0.75);
  --text: #ffffff;

  position: relative;
  width: auto;
  min-width: 150px;
  height: 60px;
  border-radius: 20px;
  overflow: visible;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);

  display: flex;
  padding: 10px;
  gap: 8px;
  pointer-events: auto;
}

.glass-filter,
.glass-overlay,
.glass-specular {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 100000;
}

.glass-filter {
  z-index: 10000;
  backdrop-filter: blur(4px);
  filter: url(#glass-distortion) saturate(120%) brightness(1.15);
}

.glass-distortion-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 80%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0%, transparent 80%);
  background-size: 300% 300%;
  animation: floatDistort 10s infinite ease-in-out;
  mix-blend-mode: overlay;
  z-index: 20000;
  pointer-events: none;
}

@keyframes floatDistort {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

.glass-overlay {
  z-index: 20000;
  background: var(--bg-color);
}

.glass-specular {
  z-index: 30000;
  box-shadow: inset 1px 1px 1px var(--highlight);
}

.glass-content {
  position: relative;
  z-index: 40000;
  color: var(--text);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 100000;
}


.glass-filter,
.glass-overlay,
.glass-specular,
.glass-content {
  z-index: 100000;
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .glass-card {
    --bg-color: rgba(0, 0, 0, 0.25);
    --highlight: rgba(255, 255, 255, 0.15);
  }
}
</style>
