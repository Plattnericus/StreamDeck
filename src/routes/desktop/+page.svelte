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

// Zeit
  let time = '';
  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    time = `${hours}:${minutes} ${ampm}`;
  };
  updateTime();
  setInterval(updateTime, 1000);

  // Datum
  let date = '';
  const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

  const updateDate = () => {
    const now = new Date();
    const weekday = weekdays[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    date = `${weekday} ${month} ${day}`;
  };
  updateDate();
  setInterval(updateDate, 1000);

</script>
<header>
  <div class="left">
    <button class="icon-container">
      <img src="/logos/apple-logo.png" alt="Logo" style="width: 20px; height: 20px">
    </button>
    <button class="finder-text" style="font-weight: bold;">Finder</button>
    <button class="finder-text">Datei</button>
    <button class="finder-text">Bearbeiten</button>
    <button class="finder-text">Hilfe</button>
  </div>
  <div class="right">
    <button class="icon-container"><img src="/icons/wifi.png" alt="WLAN" style="width: 25px; height: 25px"></button>
    <button class="icon-container"><img src="/icons/search.png" alt="Search" style="width: 25px; height: 25px"></button>
    <button class="date">{date}</button>
    <button class="time">{time}</button>
  </div>
</header>

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
}

button {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}



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

/*header*/
header {
  height: 25px;
  width: 100%;
  background: rgba(30, 30, 30, 0.12);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
}

.left, .right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.finder-text {
  font-weight: 450;
  gap: 40px;
  width: auto;
  text-align: center;
}

.time, .date {
  font-weight: bold;
  width: 90px;
  text-align: center;
  cursor: default;
  user-select: none;
}

.icon-container {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s;
}

.icon-container:hover, .date:hover, .time:hover {
  opacity: 0.7;
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
  
  position:relative;
  width: auto;
  min-width: 150px;
  height: 60px;
  border-radius: 20px;
  overflow: visible;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);

  display: flex;
  padding: 10px;
  gap: 12px;
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

.glass-content h3 {
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: 600;
}

.glass-content p {
  margin: 0;
  opacity: 0.8;
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