
<script lang="ts">
  import { onMount, tick } from 'svelte';

  type ToggleState = {
    airplane: boolean;
    wifi: boolean;
    cellular: boolean;
    bluetooth: boolean;
    lock: boolean;
    mirror: boolean;
  };

  const CONFIG = {
    storageKey: 'control_center_settings_v1',
    status: {
      carrier: 'WINDTRE',
      net: '5G'
    },
    defaults: {
      brightness: 44,
      volume: 62,
      playing: false,
      trackIndex: 0,
      battery: 49,
      focusSelectedId: 'none',
      toggles: {
        airplane: false,
        wifi: true,
        cellular: true,
        bluetooth: false,
        lock: false,
        mirror: true
      }
    },
    media: {
      songsBase: '/songs',
      defaultCover: '/songs/no-song-found.png'
    }
  };

  const statusDefaults = CONFIG.status;

  const focusOptions = [
    { id: 'none', name: 'Kein Fokus' },
    { id: 'dnd', name: 'Nicht stoeren' },
    { id: 'sleep', name: 'Schlafen' },
    { id: 'work', name: 'Arbeit' },
    { id: 'study', name: 'Lernen' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'driving', name: 'Fahren' }
  ];

  const toggleOnRGB: Record<keyof ToggleState, string> = {
    airplane: '255 159 10',
    wifi: '27 130 255',
    cellular: '40 214 122',
    bluetooth: '175 110 255',
    lock: '255 255 255',
    mirror: '255 255 255'
  };

  const shortcutOrder = [
    { id: 'flashlight', label: 'Taschenlampe', rgb: '255 255 255' },
    { id: 'timer', label: 'Timer', rgb: '27 130 255' },
    { id: 'hearing', label: 'Hoeren', rgb: '40 214 122' },
    { id: 'eye', label: 'Anzeige', rgb: '255 159 10' },
    { id: 'record', label: 'Aufnahme', rgb: '255 59 48' },
    { id: 'voice', label: 'Voice', rgb: '175 110 255' },
    { id: 'battery', label: 'Batterie', rgb: '0 200 180' },
    { id: 'shazam', label: 'Shazam', rgb: '175 110 255' },
    { id: 'remote', label: 'Remote', rgb: '27 130 255' },
    { id: 'noise', label: 'Geraeusche', rgb: '255 159 10' },
    { id: 'globe', label: 'Internet', rgb: '40 214 122' }
  ];

  const songUrl = (name: string) => `${CONFIG.media.songsBase}/${encodeURIComponent(name)}`;
  const albumUrl = (name: string) => `${CONFIG.media.songsBase}/${encodeURIComponent(`${name}.jpg`)}`;
  const defaultCover = CONFIG.media.defaultCover;

  const tracks = [
    {
      title: 'bet u wanna',
      artist: 'Sabrina Carpenter',
      album: "Man's Best Friend",
      file: songUrl('SpotiDownloader.com - bet u wanna - Sabrina Carpenter.mp3')
    },
    {
      title: 'buy me presents',
      artist: 'Sabrina Carpenter',
      album: "Short n' Sweet (Deluxe)",
      file: songUrl('SpotiDownloader.com - buy me presents - Sabrina Carpenter.mp3')
    },
    {
      title: "Couldn't Make It Any Harder",
      artist: 'Sabrina Carpenter',
      album: "Short n' Sweet (Deluxe)",
      file: songUrl("SpotiDownloader.com - Couldn't Make It Any Harder - Sabrina Carpenter.mp3")
    },
    {
      title: "emails i can't send",
      artist: 'Sabrina Carpenter',
      album: "emails i can't send",
      file: songUrl("SpotiDownloader.com - emails i can't send - Sabrina Carpenter.mp3")
    },
    {
      title: 'Such A Funny Way',
      artist: 'Sabrina Carpenter',
      album: "Man's Best Friend (Bonus Track Version)",
      file: songUrl('SpotiDownloader.com - Such A Funny Way - Sabrina Carpenter.mp3')
    },
    {
      title: 'Tornado Warnings',
      artist: 'Sabrina Carpenter',
      album: "emails i can't send",
      file: songUrl('SpotiDownloader.com - Tornado Warnings - Sabrina Carpenter.mp3')
    },
    {
      title: 'Vicious',
      artist: 'Sabrina Carpenter',
      album: "emails i can't send",
      file: songUrl('SpotiDownloader.com - Vicious - Sabrina Carpenter.mp3')
    },
    {
      title: 'We Almost Broke Up Again Last Night',
      artist: 'Sabrina Carpenter',
      album: "Man's Best Friend",
      file: songUrl('SpotiDownloader.com - We Almost Broke Up Again Last Night - Sabrina Carpenter.mp3')
    }
  ];
  const icons: Record<string, string> = {
    airplane: '<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M2.5 13.2 3.9 12l6.2.9 3.8-3.8-8.9-4.8 1.5-1.5 10.7 3.2 3.1-3.1c.6-.6 1.7-.6 2.3 0 .6.6.6 1.7 0 2.3l-3.1 3.1 3.2 10.7-1.5 1.5-4.8-8.9-3.8 3.8.9 6.2-1.2 1.4-2.2-5.2-5.2-2.2Z" fill="currentColor"/></svg>',
    wifi: '<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M12 18.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" fill="currentColor"/><path d="M4.9 12.5a10.6 10.6 0 0 1 14.2 0" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path d="M7.8 15.2a6.7 6.7 0 0 1 8.4 0" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path d="M2.8 9.8a14.6 14.6 0 0 1 18.4 0" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" opacity=".9"/></svg>',
    cellular: '<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M4 20h2V10H4v10Zm4 0h2V6H8v14Zm4 0h2V12h-2v8Zm4 0h2V4h-2v16Z" fill="currentColor"/></svg>',
    bluetooth: '<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M12 2v8l5-4-5-4Zm0 12v8l5-4-5-4Z" fill="currentColor"/><path d="M12 10 7 6" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path d="M12 14 7 18" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none"><path d="M8.5 10V7.8A3.5 3.5 0 0 1 12 4.3a3.5 3.5 0 0 1 3.5 3.5V10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M8 10h8a2 2 0 0 1 2 2v5.2a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 17.2V12a2 2 0 0 1 2-2Z" fill="currentColor" opacity=".14"/><path d="M9.2 14.3h5.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    mirror: '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="7" width="10" height="8" rx="2" stroke="currentColor" stroke-width="2.2"/><rect x="9" y="9" width="10" height="8" rx="2" fill="currentColor" opacity=".18"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.8 21a8.7 8.7 0 0 1-9.8-11.4A9 9 0 0 0 15.8 20a9 9 0 0 0 1.6-.1A8.7 8.7 0 0 1 14.8 21Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/><path d="M12 2v2.3M12 19.7V22M2 12h2.3M19.7 12H22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M19.8 4.2l-1.6 1.6M5.8 18.2l-1.6 1.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 10v4h3l4 3V7L7 10H4Z"/><path d="M14.5 9.2a4.7 4.7 0 0 1 0 5.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.8 7a8 8 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".9"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6V6Zm3.5 6 10-6v12l-10-6Z"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2V6Zm-1.5 6-10 6V6l10 6Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 6h3v12H7V6Zm7 0h3v12h-3V6Z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 6v12l11-6L8 6Z"/></svg>',
    flashlight: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 2h8v3l-2 2v3H10V7L8 5V2Z" opacity=".9"/><path d="M10 10h4v10a2 2 0 0 1-2 2 2 2 0 0 1-2-2V10Z"/><path d="M9 5h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".6"/></svg>',
    timer: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 2h6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M12 7a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" stroke="currentColor" stroke-width="2.2"/><path d="M12 11v4l3 2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    hearing: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 4a6 6 0 0 1 6 6v3.5a3.5 3.5 0 0 1-3.5 3.5H14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M10.5 20a3.5 3.5 0 0 0 3.5-3.5V13" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M9 12a3 3 0 0 0 6 0V9a3 3 0 0 0-6 0v3Z" fill="currentColor" opacity=".16"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none"><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" fill="currentColor" opacity=".18"/><path d="M4 20 20 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".7"/></svg>',
    record: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.5" fill="currentColor" opacity=".25"/></svg>',
    voice: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 11v2c0 3.3 2.7 6 6 6s6-2.7 6-6v-2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M9 7.5a3 3 0 0 1 6 0V13a3 3 0 0 1-6 0V7.5Z" fill="currentColor" opacity=".18"/><path d="M12 19v3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    battery: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="16" height="10" rx="3" stroke="currentColor" stroke-width="2.2"/><path d="M20 12h1.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M7 13h7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    shazam: '<svg viewBox="0 0 24 24" fill="none"><path d="M8 9.2c.8-1.2 2-2.2 4-2.2 2.8 0 4.5 1.9 4.5 4.1 0 2-1.4 3.2-2.8 3.9-1 .5-1.7 1.3-1.7 2.4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M12 20.2v0" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>',
    remote: '<svg viewBox="0 0 24 24" fill="none"><rect x="7" y="3" width="10" height="18" rx="3" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="8" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor" opacity=".8"/><circle cx="12" cy="16" r="1.2" fill="currentColor" opacity=".65"/></svg>',
    noise: '<svg viewBox="0 0 24 24" fill="none"><path d="M8 8a6 6 0 0 1 8 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M10 10a3 3 0 0 1 4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M6.5 6.5c3-3 8-3 11 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.2"/><path d="M3 12h18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M12 3c2.6 2.6 4.2 5.6 4.2 9s-1.6 6.4-4.2 9c-2.6-2.6-4.2-5.6-4.2-9S9.4 5.6 12 3Z" fill="currentColor" opacity=".14"/></svg>',
    check: '<svg class="check" viewBox="0 0 24 24" fill="none"><path d="M6.5 12.5l3.2 3.2 7.8-8" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  let controlOpen = false;
  let focusOpen = false;
  let time = '';
  let date = '';

  let brightness = CONFIG.defaults.brightness;
  let volume = CONFIG.defaults.volume;
  let playing = CONFIG.defaults.playing;
  let trackIndex = CONFIG.defaults.trackIndex;
  let battery = CONFIG.defaults.battery;
  let focusSelectedId = CONFIG.defaults.focusSelectedId;
  let toggles: ToggleState = { ...CONFIG.defaults.toggles };
  let shortcutStates: Record<string, boolean> = {};

  let audioEl: HTMLAudioElement | null = null;
  let audioSrc = tracks[0]?.file || '';
  let brightnessTrack: HTMLDivElement | null = null;
  let volumeTrack: HTMLDivElement | null = null;
  let dragging: 'brightness' | 'volume' | null = null;

  const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const months = ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

  const uiScale = 1;
  const tileGap = 14;

  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    time = `${hours}:${minutes} ${ampm}`;
  };

  const updateDate = () => {
    const now = new Date();
    const weekday = weekdays[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    date = `${weekday} ${month} ${day}`;
  };

  const saveState = () => {
    const payload = {
      brightness,
      volume,
      playing,
      trackIndex,
      battery,
      focusSelectedId,
      toggles,
      shortcutStates
    };
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(payload));
  };

  const loadState = () => {
    try {
      const raw = localStorage.getItem(CONFIG.storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      brightness = saved.brightness ?? brightness;
      volume = saved.volume ?? volume;
      playing = saved.playing ?? playing;
      trackIndex = saved.trackIndex ?? trackIndex;
      battery = saved.battery ?? battery;
      focusSelectedId = saved.focusSelectedId ?? focusSelectedId;
      toggles = { ...toggles, ...(saved.toggles || {}) };
      shortcutStates = { ...shortcutStates, ...(saved.shortcutStates || {}) };
    } catch {
      // ignore
    }
  };

  const coverForTrack = (track: typeof tracks[number]) => albumUrl(track.album);

  const tryPlay = async () => {
    if (!audioEl) return;
    try {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (err) {
      console.warn('Audio playback failed:', err);
    }
  };

  const setTrack = (nextIndex: number) => {
    const total = tracks.length;
    trackIndex = (nextIndex + total) % total;
    if (audioEl) {
      const track = tracks[trackIndex];
      audioEl.src = track.file;
      audioEl.currentTime = 0;
      audioEl.load();
      if (playing) {
        setTimeout(() => tryPlay(), 50);
      }
    }
    saveState();
  };

  const togglePlay = async () => {
    if (!audioEl) return;
    if (playing) {
      audioEl.pause();
      playing = false;
    } else {
      playing = true;
      await tryPlay();
    }
    saveState();
  };

  const toggleControlCenter = async () => {
    controlOpen = !controlOpen;
    if (controlOpen) {
      await tick();
      document.querySelector('.control-center')?.classList.add('animate-in');
    }
  };

  const closeControlCenter = () => {
    const frame = document.querySelector('.control-center');
    if (frame) {
      frame.classList.remove('animate-in');
      frame.classList.add('animate-out');
      setTimeout(() => {
        controlOpen = false;
        focusOpen = false;
        frame.classList.remove('animate-out');
      }, 300);
    } else {
      controlOpen = false;
      focusOpen = false;
    }
  };

  const openFocusMenu = () => {
    focusOpen = true;
  };

  const closeFocusMenu = () => {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.classList.remove('show');
      overlay.classList.add('hide-anim');
      setTimeout(() => {
        focusOpen = false;
        overlay.classList.remove('hide-anim');
      }, 200);
    } else {
      focusOpen = false;
    }
  };

  const toggleState = (key: keyof ToggleState) => {
    toggles = { ...toggles, [key]: !toggles[key] };
    saveState();
  };

  const toggleShortcut = (id: string) => {
    shortcutStates = { ...shortcutStates, [id]: !shortcutStates[id] };

    if (id === 'battery') {
      battery = battery >= 95 ? 49 : Math.min(100, battery + 10);
    }

    saveState();
  };

  const handleCoverError = (event: Event) => {
    const img = event.currentTarget as HTMLImageElement;
    if (img && img.src !== defaultCover) {
      img.src = defaultCover;
    }
  };

  const setSliderFromPointer = (type: 'brightness' | 'volume', clientY: number) => {
    const track = type === 'brightness' ? brightnessTrack : volumeTrack;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clamped = Math.max(rect.top, Math.min(rect.bottom, clientY));
    const pct = ((rect.bottom - clamped) / (rect.bottom - rect.top)) * 100;
    const nextValue = Math.max(0, Math.min(100, Math.round(pct)));

    if (type === 'brightness') {
      brightness = nextValue;
    } else {
      volume = nextValue;
      if (audioEl) {
        audioEl.volume = volume / 100;
      }
    }

    saveState();
  };

  const handleSliderKey = (type: 'brightness' | 'volume', event: KeyboardEvent) => {
    const step = event.key === 'ArrowUp' ? 3 : event.key === 'ArrowDown' ? -3 : 0;
    if (!step) return;

    if (type === 'brightness') {
      brightness = Math.max(0, Math.min(100, brightness + step));
    } else {
      volume = Math.max(0, Math.min(100, volume + step));
      if (audioEl) {
        audioEl.volume = volume / 100;
      }
    }

    saveState();
    event.preventDefault();
  };

  $: focusLabel = focusOptions.find((option) => option.id === focusSelectedId)?.name || 'Kein Fokus';
  $: frameBrightness = 0.72 + (brightness / 100) * 0.55;
  $: currentTrack = tracks[trackIndex] || tracks[0];
  $: audioSrc = tracks[trackIndex]?.file || '';
  $: if (audioEl) audioEl.volume = volume / 100;

  onMount(() => {
    updateTime();
    updateDate();
    loadState();

    const timeInterval = setInterval(updateTime, 1000);
    const dateInterval = setInterval(updateDate, 1000);

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (focusOpen) {
          closeFocusMenu();
        } else if (controlOpen) {
          closeControlCenter();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    if (playing) {
      playing = false;
      saveState();
    }
    if (audioEl) {
      audioEl.pause();
    }

    return () => {
      clearInterval(timeInterval);
      clearInterval(dateInterval);
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>
<header>
  <div class="left">
    <button class="icon-container" onclick={toggleControlCenter}>
      <img src="/logos/apple-logo.png" alt="Logo" style="width: 20px; height: 20px" />
    </button>
    <button class="finder-text" style="font-weight: bold;">Finder</button>
    <button class="finder-text">Datei</button>
    <button class="finder-text">Bearbeiten</button>
    <button class="finder-text">Hilfe</button>
  </div>
  <div class="right">
    <button class="icon-container" onclick={toggleControlCenter}>
      <img src="/icons/battery.png" alt="BATTERY" style="width: 25px; height: 25px" />
    </button>
    <button class="icon-container" onclick={toggleControlCenter}>
      <img src="/icons/wifi.png" alt="WLAN" style="width: 25px; height: 25px" />
    </button>
    <button class="icon-container" onclick={toggleControlCenter}>
      <img src="/icons/control-menu.svg" alt="CONTROL MENU" style="width: 25px; height: 25px; color: black;" />
    </button>
    <button class="date" onclick={toggleControlCenter}>{date}</button>
    <button class="time" onclick={toggleControlCenter}>{time}</button>
  </div>
</header>

{#if controlOpen}
  <div class="control-overlay" onclick={closeControlCenter} onkeydown={(e) => e.key === 'Escape' && closeControlCenter()} role="button" tabindex="0">
    <div
      class="frame control-center"
      style={`--uiScale: ${uiScale}; --tileGap: ${tileGap}px; filter: brightness(${frameBrightness});`}
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
      role="dialog"
      tabindex="0"
      aria-label="Control Center"
    >
      <div class="frost"></div>

      <div class="cc">
        <section class="tile connect">
          <div class="conn-grid">
            {#each ['airplane', 'wifi', 'cellular', 'bluetooth'] as toggleId}
              <button
                class="btn"
                data-state={toggles[toggleId as keyof ToggleState] ? 'on' : 'off'}
                aria-pressed={toggles[toggleId as keyof ToggleState]}
                style={`--btnOnRGB: ${toggleOnRGB[toggleId as keyof ToggleState]};`}
                onclick={() => toggleState(toggleId as keyof ToggleState)}
              >
                {@html icons[toggleId]}
              </button>
            {/each}
          </div>

          <div class="conn-grid lower">
            <button
              class="btn"
              title="Fokus auswaehlen"
              data-state={focusSelectedId !== 'none' ? 'on' : 'off'}
              aria-pressed={focusSelectedId !== 'none'}
              style="--btnOnRGB: 0 200 180;"
              onclick={openFocusMenu}
            >
              {@html icons.moon}
            </button>
            <div class="tile info">
              <div class="info-text">{statusDefaults.carrier} • {statusDefaults.net}</div>
            </div>
          </div>
        </section>

        <section class="tile now">
          <div class="np-top">
            <div class="art">
              <img
                src={coverForTrack(currentTrack)}
                alt={currentTrack.album}
                onerror={handleCoverError}
              />
            </div>
            <div class="np-meta">
              <div class="np-title">{currentTrack.title}</div>
              <div class="np-sub">{currentTrack.artist}</div>
            </div>
          </div>
          <div class="np-controls">
            <button class="np-btn" title="Zurueck" onclick={() => setTrack(trackIndex - 1)}>
              {@html icons.prev}
            </button>
            <button class="np-btn play" title="Play/Pause" aria-pressed={playing} onclick={togglePlay}>
              {@html playing ? icons.pause : icons.play}
            </button>
            <button class="np-btn" title="Weiter" onclick={() => setTrack(trackIndex + 1)}>
              {@html icons.next}
            </button>
          </div>
        </section>
        <div class="pair">
          <section class="tile mini">
            <button
              class="circleBtn"
              title="Ausrichtungssperre"
              data-state={toggles.lock ? 'on' : 'off'}
              aria-pressed={toggles.lock}
              onclick={() => toggleState('lock')}
            >
              {@html icons.lock}
            </button>
          </section>
          <section class="tile mini">
            <button
              class="circleBtn"
              title="Bildschirm spiegeln"
              data-state={toggles.mirror ? 'on' : 'off'}
              aria-pressed={toggles.mirror}
              onclick={() => toggleState('mirror')}
            >
              {@html icons.mirror}
            </button>
          </section>
        </div>

        <section class="tile sliders">
          <div
            class="vslider"
            role="slider"
            tabindex="0"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={brightness}
            onkeydown={(event) => handleSliderKey('brightness', event)}
          >
            <div class="label">BRIGHT</div>
            <div
              class="trackHit"
              bind:this={brightnessTrack}
              onpointerdown={(event) => {
                dragging = 'brightness';
                (event.currentTarget as Element).setPointerCapture(event.pointerId);
                setSliderFromPointer('brightness', event.clientY);
              }}
              onpointermove={(event) => {
                if (dragging === 'brightness') {
                  setSliderFromPointer('brightness', event.clientY);
                }
              }}
              onpointerup={() => { dragging = null; }}
              onpointercancel={() => { dragging = null; }}
            ></div>
            <div class="fill" style={`height: ${brightness}%;`}></div>
            <button class="glyph" title="BRIGHT" onclick={() => {
              brightness = brightness > 0 ? 0 : 50;
              saveState();
            }}>
              {@html icons.sun}
            </button>
          </div>

          <div
            class="vslider"
            role="slider"
            tabindex="0"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={volume}
            onkeydown={(event) => handleSliderKey('volume', event)}
          >
            <div class="label">VOLUME</div>
            <div
              class="trackHit"
              bind:this={volumeTrack}
              onpointerdown={(event) => {
                dragging = 'volume';
                (event.currentTarget as Element).setPointerCapture(event.pointerId);
                setSliderFromPointer('volume', event.clientY);
              }}
              onpointermove={(event) => {
                if (dragging === 'volume') {
                  setSliderFromPointer('volume', event.clientY);
                }
              }}
              onpointerup={() => { dragging = null; }}
              onpointercancel={() => { dragging = null; }}
            ></div>
            <div class="fill" style={`height: ${volume}%;`}></div>
            <button class="glyph" title="VOLUME" onclick={() => {
              volume = volume > 0 ? 0 : 50;
              if (audioEl) {
                audioEl.volume = volume / 100;
              }
              saveState();
            }}>
              {@html icons.speaker}
            </button>
          </div>
        </section>

        <section class="tile focus">
          <button
            class="moon"
            title="Fokus auswaehlen"
            data-state={focusSelectedId !== 'none' ? 'on' : 'off'}
            aria-pressed={focusSelectedId !== 'none'}
            onclick={openFocusMenu}
          >
            {@html icons.moon}
          </button>
          <div class="txt" onclick={openFocusMenu} onkeydown={(e) => e.key === 'Enter' && openFocusMenu()} role="button" tabindex="0">
            <div class="title"><span>Fokus</span><span class="chev">^</span></div>
            <div class="current">{focusLabel}</div>
          </div>
        </section>

        <section class="tile shortcuts">
          {#each shortcutOrder as shortcut}
            <button
              class="sbtn"
              title={shortcut.label}
              data-state={shortcutStates[shortcut.id] ? 'on' : 'off'}
              aria-pressed={shortcutStates[shortcut.id] ? 'true' : 'false'}
              style={`--onrgb: ${shortcut.rgb};`}
              onclick={() => toggleShortcut(shortcut.id)}
            >
              {@html icons[shortcut.id]}
            </button>
          {/each}
        </section>
      </div>

      <div
        class={`overlay ${focusOpen ? 'show' : ''}`}
        aria-hidden={!focusOpen}
        onclick={(event) => {
          if (event.currentTarget === event.target) closeFocusMenu();
        }}
      >
        <div class="menu" role="dialog" aria-label="Fokus auswaehlen">
          <div class="menuHeader">
            <div class="hTitle">Fokus</div>
            <button class="close" title="Schliessen" onclick={closeFocusMenu}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="menuList">
            {#each focusOptions as option}
              <button
                class={`menuItem ${option.id === focusSelectedId ? 'selected' : ''}`}
                type="button"
                onclick={() => {
                  focusSelectedId = option.id;
                  saveState();
                  closeFocusMenu();
                }}
              >
                <div class="badge"></div>
                <div class="name">{option.name}</div>
                {@html icons.check}
              </button>
            {/each}
          </div>
        </div>
      </div>

    </div>
  </div>
{/if}

<audio bind:this={audioEl} src={audioSrc} onended={() => setTrack(trackIndex + 1)} preload="metadata" crossorigin="anonymous"></audio>

<style>
:global(:root) {
  --text: rgba(255,255,255,0.92);
  --muted: rgba(255,255,255,0.64);
  --glassA: rgba(255,255,255,0.14);
  --glassB: rgba(255,255,255,0.08);
  --stroke: rgba(255,255,255,0.14);
  --shadow: rgba(0,0,0,0.35);
  --rBig: 28px;
  --tileGap: 14px;
  --uiScale: 1;
  --pressRing: rgba(255,255,255,0.30);
  --pressGlow: rgba(255,255,255,0.22);
  --btnOff: rgba(255,255,255,0.10);
  --btnOffStroke: rgba(255,255,255,0.12);
  --btnOnStroke: rgba(255,255,255,0.14);
  --btnOnRGB: 255 255 255;
}

* {
  box-sizing: border-box;
}

button {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

header {
  height: 25px;
  width: 100%;
  background: rgba(30, 30, 30, 0.12);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  position: relative;
  z-index: 20;
}

.left,
.right {
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

.time,
.date {
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

.icon-container:hover,
.date:hover,
.time:hover {
  opacity: 0.7;
}

.control-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 40px 16px 16px;
  background: rgba(5, 5, 8, 0.35);
  backdrop-filter: blur(6px);
}

.frame {
  width: min(420px, 92vw);
  aspect-ratio: 9 / 19.5;
  border-radius: 48px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 120px rgba(0,0,0,0.70);
  outline: 1px solid rgba(255,255,255,0.08);
  transform: scale(var(--uiScale));
  background: rgba(0,0,0,0.08);
  font-family: "SF Pro Display", "SF Pro Text", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--text);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.frame.animate-in {
  animation: slideInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.frame.animate-out {
  animation: slideOutDown 0.3s cubic-bezier(0.3, 0, 0.8, 0.15);
}

@keyframes slideInUp {
  from {
    transform: scale(var(--uiScale)) translateY(60px);
    opacity: 0;
  }
  to {
    transform: scale(var(--uiScale)) translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutDown {
  from {
    transform: scale(var(--uiScale)) translateY(0);
    opacity: 1;
  }
  to {
    transform: scale(var(--uiScale)) translateY(40px);
    opacity: 0;
  }
}

.frost {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(28px) saturate(1.3);
  -webkit-backdrop-filter: blur(28px) saturate(1.3);
  background: rgba(0,0,0,0.20);
}

.status {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  text-shadow: 0 2px 12px rgba(0,0,0,0.45);
}

.status .left {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 800;
  letter-spacing: 0.2px;
  font-size: 18px;
}

.status .right {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 750;
  font-size: 16px;
  opacity: 0.95;
}

.battery {
  width: 34px;
  height: 16px;
  border-radius: 5px;
  border: 1.6px solid rgba(255,255,255,0.85);
  position: relative;
}

.battery::after {
  content: "";
  position: absolute;
  right: -4.5px;
  top: 4px;
  width: 3px;
  height: 8px;
  border-radius: 2px;
  background: rgba(255,255,255,0.85);
}

.battery .fill {
  position: absolute;
  left: 2px;
  top: 2px;
  bottom: 2px;
  background: rgba(255,255,255,0.9);
  border-radius: 3px;
}

.cc {
  position: absolute;
  inset: 48px 14px 14px 14px;
  z-index: 5;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: auto auto auto 1fr;
  gap: var(--tileGap);
}

.tile {
  border-radius: var(--rBig);
  background: linear-gradient(180deg, var(--glassA), var(--glassB));
  border: 1px solid var(--stroke);
  box-shadow: 0 20px 50px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.20);
  backdrop-filter: blur(20px) saturate(1.35);
  -webkit-backdrop-filter: blur(20px) saturate(1.35);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.tile::before {
  content: "";
  position: absolute;
  inset: -120px -140px auto auto;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.24), transparent 58%);
  opacity: 0.55;
  transform: rotate(18deg);
  pointer-events: none;
}

.btn {
  border: 1px solid var(--btnOffStroke);
  width: 100%;
  border-radius: 26px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  background: var(--btnOff);
  box-shadow: 0 14px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.14);
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease;
  position: relative;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

.btn:active {
  transform: scale(0.95);
  box-shadow: 0 8px 18px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.14), 0 0 0 3px rgba(255,255,255,0.12);
}

.btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(240px 110px at 50% 20%, rgba(255,255,255,0.22), transparent 65%);
  opacity: 0.55;
  pointer-events: none;
}

.btn .icon {
  width: 18px;
  height: 18px;
  filter: drop-shadow(0 10px 16px rgba(0,0,0,0.34));
}

.btn[data-state="off"] {
  background: var(--btnOff);
}

.btn[data-state="on"] {
  border-color: var(--btnOnStroke);
  background: rgba(var(--btnOnRGB), 0.98);
  box-shadow: 0 20px 50px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 0 3px var(--pressRing), 0 0 40px rgba(var(--btnOnRGB), 0.35);
  filter: saturate(1.15) brightness(1.08);
  transform: translateY(-1px);
}

.connect {
  grid-row: span 2;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.conn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.conn-grid.lower {
  grid-template-columns: 1fr 1fr;
  margin-top: auto;
}

.info {
  border-radius: 26px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  padding: 12px 14px;
  min-height: 74px;
}

.info-text {
  font-weight: 950;
  font-size: 13px;
  letter-spacing: 0.3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.now {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 172px;
}

.np-top {
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
}

.art {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: 0 16px 30px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.14);
  background: linear-gradient(135deg, rgba(255,190,220,0.42), rgba(90,180,255,0.25));
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.np-meta {
  flex: 1;
  min-width: 0;
}

.np-title {
  font-size: 19px;
  font-weight: 950;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  transition: opacity 0.3s ease;
}

.np-sub {
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.np-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding: 2px 2px 0;
}

.np-btn {
  width: 54px;
  height: 40px;
  border-radius: 16px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s ease, box-shadow 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.np-btn:active {
  transform: scale(0.92);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 3px rgba(255,255,255,0.12);
}

.np-btn svg {
  width: 14px;
  height: 14px;
  opacity: 0.92;
}

.np-btn.play svg {
  width: 20px;
  height: 20px;
}

.pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--tileGap);
}

.mini {
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 92px;
}

.circleBtn {
  width: 66px;
  height: 66px;
  border-radius: 999px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12);
  transition: transform 0.10s ease, background 0.12s ease, box-shadow 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}

.circleBtn:active {
  transform: scale(0.985);
  box-shadow: 0 10px 22px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 3px rgba(255,255,255,0.10);
}

.circleBtn svg {
  width: 16px;
  height: 16px;
  opacity: 0.92;
}

.circleBtn[data-state="on"] {
  background: rgba(255,255,255,0.18);
  box-shadow: 0 14px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.14), 0 0 0 2.5px rgba(255,255,255,0.16), 0 0 28px rgba(255,255,255,0.12);
  transform: translateY(-1px);
}

.focus {
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  min-height: 92px;
  position: relative;
}

.focus .moon {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.10s ease, background 0.12s ease, box-shadow 0.12s ease;
}

.focus .moonactive {
  transform: scale(0.985);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 3px rgba(255,255,255,0.10);
}

.focus .moon[data-state="on"] {
  background: rgba(255,255,255,0.16);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 2px rgba(255,255,255,0.14);
}

.focus .txt {
  display: flex;
  flex-direction: column;
  gap: 4px;
  user-select: none;
  min-width: 0;
}

.focus .txt .title {
  font-size: 18px;
  font-weight: 950;
  display: flex;
  align-items: center;
  gap: 8px;
}

.focus .txt .chev {
  opacity: 0.55;
  font-weight: 900;
  transform: translateY(-1px);
}

.focus .txt .current {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
}

.sliders {
  padding: 14px;
  display: flex;
  gap: 14px;
  min-height: 210px;
}

.vslider {
  flex: 1;
  border-radius: 26px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
  position: relative;
  overflow: hidden;
  padding: 12px 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.vslider .trackHit {
  position: absolute;
  inset: 10px;
  border-radius: 20px;
  background: rgba(255,255,255,0.06);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.10);
  cursor: ns-resize;
  touch-action: none;
}

.vslider .fill {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 18px;
  background: rgba(255,255,255,0.92);
  box-shadow: 0 14px 32px rgba(0,0,0,0.30);
  pointer-events: none;
}

.vslider .glyph {
  position: absolute;
  bottom: 16px;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(0,0,0,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 22px rgba(0,0,0,0.25);
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.10s ease, box-shadow 0.12s ease;
}

.vslider .glyph svg {
  width: 14px;
  height: 14px;
}

.vslider .glyph:active {
  transform: scale(0.98);
  box-shadow: 0 12px 28px rgba(0,0,0,0.28), 0 0 0 3.5px rgba(255,255,255,0.14);
}

.vslider .label {
  position: absolute;
  top: 14px;
  font-weight: 900;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.35);
  user-select: none;
  z-index: 2;
}

.vslider:focus-visible {
  outline: 2px solid rgba(255,255,255,0.28);
  outline-offset: 2px;
}

.shortcuts {
  grid-column: 1 / span 2;
  padding: 10px 8px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--tileGap);
  align-items: center;
  justify-items: center;
  min-height: 220px;
}

.sbtn {
  width: 76px;
  height: 76px;
  border-radius: 999px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 16px 36px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.10s ease, background 0.12s ease, box-shadow 0.12s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.sbtn:active {
  transform: scale(0.985);
  box-shadow: 0 14px 28px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 3px rgba(255,255,255,0.10);
}

.sbtn svg {
  width: 18px;
  height: 18px;
  opacity: 0.92;
}

.sbtn[data-state="on"] {
  background: rgba(var(--onrgb, 255 255 255), 0.28);
  border-color: rgba(255,255,255,0.16);
  box-shadow: 0 18px 42px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.16), 0 0 0 2.5px rgba(255,255,255,0.16), 0 0 24px rgba(255,255,255,0.08);
  filter: brightness(1.06);
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 50;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.overlay.show {
  display: flex;
  animation: fadeIn 0.25s ease;
}

.overlay.hide-anim {
  animation: fadeOut 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
  to {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
}

.menu {
  width: min(420px, calc(100% - 26px));
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10));
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: 0 30px 90px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.20);
  overflow: hidden;
  animation: slideMenuUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 24px 0;
}

@keyframes slideMenuUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.menuHeader {
  padding: 0 24px 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.12);
}

.menuHeader .hTitle {
  font-weight: 950;
  letter-spacing: 0.4px;
  font-size: 20px;
  color: rgba(255,255,255,0.95);
}

.menuHeader .close {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.12);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.10s ease, box-shadow 0.12s ease, background 0.12s ease;
}

.menuHeader .close:active {
  transform: scale(0.96);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25), 0 0 0 3px rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.14);
}

.menuHeader .close svg {
  width: 18px;
  height: 18px;
  opacity: 0.92;
}

.menuList {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menuItem {
  width: 100%;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.10);
  border-radius: 18px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  text-align: left;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s ease, box-shadow 0.15s ease;
  color: rgba(255,255,255,0.94);
}

.menuItem:active {
  transform: scale(0.97);
  box-shadow: 0 8px 24px rgba(0,0,0,0.22), 0 0 0 3px rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.12);
}

.menuItem .badge {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.32);
  box-shadow: 0 0 0 2px rgba(255,255,255,0.12);
  flex: 0 0 auto;
}

.menuItem .name {
  font-weight: 600;
  letter-spacing: 0.2px;
  font-size: 18px;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menuItem .check {
  width: 22px;
  height: 22px;
  opacity: 0;
  flex: 0 0 auto;
  transition: opacity 0.15s ease;
}

.menuItem.selected {
  background: rgba(255,255,255,0.16);
  border-color: rgba(255,255,255,0.20);
  box-shadow: 0 12px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.16);
}

.menuItem.selected .check {
  opacity: 0.98;
}

@media (max-width: 360px) {
  .shortcuts {
    grid-template-columns: repeat(3, 1fr);
    min-height: 240px;
  }

  .sbtn {
    width: 72px;
    height: 72px;
  }

  .art {
    width: 66px;
    height: 66px;
  }
}
</style>

