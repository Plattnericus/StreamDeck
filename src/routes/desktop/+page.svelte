<script lang="ts">
  import Dock from './Dock.svelte';
  import Header from './Header.svelte';

  import { onMount } from 'svelte';

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

  import DesktopMarquee from "./DesktopMarquee.svelte";


function onEnd(e: CustomEvent<{ rect: { x: number; y: number; w: number; h: number } }>) {
  const r = e.detail.rect;
  console.log("Selected rect:", r);
}
</script>

<Header />

<div style="width: 100%; height: 100%; position: absolute; overflow: hidden;">
  <DesktopMarquee on:end={onEnd}>
  </DesktopMarquee>
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
  :global(::-webkit-scrollbar-corner){ background: transparent !important; cursor: Url(/cursors/default-cursor.svg) !important; }
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-button { display: none; width: 0; height: 0; }

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

@media (prefers-color-scheme: dark) {
  .glass-card {
    --bg-color: rgba(0, 0, 0, 0.25);
    --highlight: rgba(255, 255, 255, 0.15);
  }
}
</style>
