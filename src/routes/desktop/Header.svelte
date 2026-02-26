
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
      brightness: 100,
      volume: 40,
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
    { id: 'hearing', label: 'Hören', rgb: '40 214 122' },
    { id: 'eye', label: 'Anzeige', rgb: '255 159 10' },
    { id: 'record', label: 'Aufnahme', rgb: '255 59 48' },
    { id: 'voice', label: 'Sprachnotiz', rgb: '175 110 255' },
    { id: 'battery', label: 'Batterie', rgb: '0 200 180' },
    { id: 'shazam', label: 'Shazam', rgb: '175 110 255' },
    { id: 'remote', label: 'Fernbedienung', rgb: '27 130 255' },
    { id: 'noise', label: 'Geräusche', rgb: '255 159 10' },
    { id: 'globe', label: 'Internet', rgb: '40 214 122' }
  ];

  const songUrl = (name: string) => `${CONFIG.media.songsBase}/${encodeURIComponent(name)}`;
  const albumUrl = (name: string) => `${CONFIG.media.songsBase}/${encodeURIComponent(`${name}.jpg`)}`;
  const defaultCover = CONFIG.media.defaultCover;

  const tracks = [
    {
      title: 'Such A Funny Way',
      artist: 'Sabrina Carpenter',
      album: "Man's Best Friend (Bonus Track Version)",
      file: songUrl('SpotiDownloader.com - Such A Funny Way - Sabrina Carpenter.mp3')
    },
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
    airplane: '<img src="/icons/flugmodus.png" style="width: 40px; height: 40px;" class="icon-img" alt="airplane"/>',
    wifi: '<img src="/icons/wifi.png" style="width: 40px; height: 40px;" class="icon-img" alt="wifi"/>',
    cellular: '<img src="/icons/mobile-Daten.png" style="width: 40px; height: 40px;" class="icon-img" alt="cellular"/>',
    bluetooth: '<img src="/icons/bluetooth.png" style="width: 40px; height: 40px;" class="icon-img" alt="bluetooth"/>',
    lock: '<img src="/icons/lock.png" style="width: 40px; height: 40px;" class="icon-img" alt="lock"/>',
    mirror: '<img src="/icons/airplay.png" style="width: 40px; height: 40px;" class="icon-img" alt="mirror"/>',
    moon: '<img src="/icons/moon.png" style="width: 40px; height: 40px;" class="icon-img" alt="moon"/>',
    sun: '<img src="/icons/bright.png" style="width: 25px; height: 25px;" class="icon-img" alt="sun"/>',
    speaker: '<img src="/icons/volume.png" style="width: 25px; height: 25px;" class="icon-img" alt="speaker"/>',
    prev: '<img src="/icons/skip-backwards.png" style="width: 25px; height: 25px;" class="icon-img" alt="prev"/>',
    next: '<img src="/icons/skip-forwards.png" style="width: 25px; height: 25px;" class="icon-img" alt="next"/>',
    pause: '<img src="/icons/pause.png" style="width: 25px; height: 25px;" class="icon-img" alt="pause"/>',
    play: '<img src="/icons/play.png" style="width: 25px; height: 25px;" class="icon-img" alt="play"/>',
    battery: '<img src="/icons/battery.png" style="width: 40px; height: 40px;" class="icon-img" alt="battery"/>',
    flashlight: '<img src="/icons/bright.png" style="width: 40px; height: 40px;" class="icon-img" alt="flashlight"/>',
    timer: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="timer"/>',
    hearing: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="hearing"/>',
    eye: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="eye"/>',
    record: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="record"/>',
    voice: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="voice"/>',
    shazam: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="shazam"/>',
    remote: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="remote"/>',
    noise: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="noise"/>',
    globe: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="globe"/>',
    check: '<img src="/icons/search.png" style="width: 40px; height: 40px;" class="icon-img" alt="check"/>'
  };

  type MenuItem = {
    label: string;
    disabled?: boolean;
    divider?: boolean;
    action?: () => void;
  };

  type MenuGroup = {
    id: string;
    label?: string;
    icon?: string;
    items: MenuItem[];
  };

  const macInfo = {
    model: 'MacBook Pro',
    size: '15", 2023',
    chip: 'Apple M3 Pro',
    memory: '18 GB',
    serial: 'XY0XX0Y0X0',
    os: 'Tahoe 26.0.1',
    storage: '512 GB SSD',
    gpu: '19-core GPU',
    battery: '100% (Gut)',
    wifi: 'Wi-Fi 6E'
  };

  let showAboutMac = false;
  let winX = 0;
  let winY = 0;
  let draggingWin = false;
  let dragOX = 0;
  let dragOY = 0;

  function openAboutMac() {
    winX = Math.round(window.innerWidth / 2 - 180);
    winY = Math.round(window.innerHeight / 2 - 290);
    showAboutMac = true;
  }

  function closeAboutMac() {
    showAboutMac = false;
  }

  function startWinDrag(e: MouseEvent) {
    draggingWin = true;
    dragOX = e.clientX - winX;
    dragOY = e.clientY - winY;
    window.addEventListener('mousemove', onWinDrag);
    window.addEventListener('mouseup', stopWinDrag);
  }

  function onWinDrag(e: MouseEvent) {
    if (!draggingWin) return;
    winX = e.clientX - dragOX;
    winY = e.clientY - dragOY;
  }

  function stopWinDrag() {
    draggingWin = false;
    window.removeEventListener('mousemove', onWinDrag);
    window.removeEventListener('mouseup', stopWinDrag);
  }

  const menuGroups: MenuGroup[] = [
    {
      id: 'apple',
      icon: '/logos/apple-logo.png',
      items: [
        { label: 'Über diesen Mac', action: openAboutMac },
        { divider: true, label: '' },
        { label: 'Systemeinstellungen...' },
        { label: 'App Store...' },
        { divider: true, label: '' },
        { label: 'Letzte Elemente', disabled: true },
        { divider: true, label: '' },
        { label: 'Sofort beenden...' },
        { divider: true, label: '' },
        { label: 'Ruhezustand' },
        { label: 'Neu starten...' },
        { label: 'Ausschalten...' },
        { divider: true, label: '' },
        { label: 'Bildschirm sperren' },
        { label: 'Abmelden...' }
      ]
    },
    {
      id: 'finder',
      label: 'Finder',
      items: [
        { label: 'Über den Finder' },
        { divider: true, label: '' },
        { label: 'Einstellungen...' },
        { divider: true, label: '' },
        { label: 'Papierkorb leeren' },
        { divider: true, label: '' },
        { label: 'Finder ausblenden' },
        { label: 'Andere ausblenden' },
        { label: 'Alle anzeigen', disabled: true }
      ]
    },
    {
      id: 'file',
      label: 'Datei',
      items: [
        { label: 'Neues Finder Fenster' },
        { label: 'Neuer Ordner' },
        { label: 'Neuer Ordner mit Auswahl', disabled: true },
        { divider: true, label: '' },
        { label: 'Neuer Smart Ordner' },
        { divider: true, label: '' },
        { label: 'Neuer Tab' },
        { label: 'Öffnen', disabled: true },
        { label: 'Öffnen mit', disabled: true },
        { divider: true, label: '' },
        { label: 'Drucken', disabled: true },
        { label: 'Fenster schliessen', disabled: true },
        { divider: true, label: '' },
        { label: 'Informationen' },
        { label: 'Umbenennen', disabled: true },
        { divider: true, label: '' },
        { label: 'Komprimieren', disabled: true },
        { label: 'Duplizieren', disabled: true },
        { label: 'Alias erzeugen', disabled: true },
        { label: 'Schnellansicht', disabled: true },
        { divider: true, label: '' },
        { label: 'Zum Papierkorb', disabled: true },
        { label: 'Auswerfen', disabled: true },
        { divider: true, label: '' },
        { label: 'Suchen' },
        { label: 'Tags...', disabled: true }
      ]
    },
    {
      id: 'edit',
      label: 'Bearbeiten',
      items: [
        { label: 'Rückgängig', disabled: true },
        { label: 'Wiederholen', disabled: true },
        { divider: true, label: '' },
        { label: 'Ausschneiden', disabled: true },
        { label: 'Kopieren', disabled: true },
        { label: 'Einfügen', disabled: true },
        { label: 'Alles auswählen', disabled: true },
        { divider: true, label: '' },
        { label: 'Zwischenablage anzeigen' },
        { label: 'Diktat starten...' },
        { label: 'Emoji & Symbole' }
      ]
    },
    {
      id: 'view',
      label: 'Ansicht',
      items: [
        { label: 'Als Symbole', disabled: true },
        { label: 'Als Liste', disabled: true },
        { label: 'Als Spalten', disabled: true },
        { label: 'Als Galerie', disabled: true },
        { divider: true, label: '' },
        { label: 'Stapel verwenden' },
        { label: 'Sortieren nach', disabled: true },
        { divider: true, label: '' },
        { label: 'Seitenleiste ausblenden', disabled: true },
        { label: 'Vorschau einblenden', disabled: true },
        { divider: true, label: '' },
        { label: 'Vollbild starten' }
      ]
    },
    {
      id: 'go',
      label: 'Gehe zu',
      items: [
        { label: 'Zurück', disabled: true },
        { label: 'Vorwärts', disabled: true },
        { divider: true, label: '' },
        { label: 'Aktueller Ordner' },
        { divider: true, label: '' },
        { label: 'Zuletzt benutzt' },
        { label: 'Dokumente' },
        { label: 'Schreibtisch' },
        { label: 'Downloads' },
        { label: 'Benutzerordner' },
        { label: 'Computer' },
        { label: 'Netzwerk' },
        { divider: true, label: '' },
        { label: 'Zum Ordner...' },
        { label: 'Mit Server verbinden...' }
      ]
    },
    {
      id: 'window',
      label: 'Fenster',
      items: [
        { label: 'Minimieren', disabled: true },
        { label: 'Zoomen', disabled: true },
        { divider: true, label: '' },
        { label: 'Fenster nach links', disabled: true },
        { label: 'Fenster nach rechts', disabled: true },
        { divider: true, label: '' },
        { label: 'Durch Fenster wechseln' },
        { divider: true, label: '' },
        { label: 'Alle nach vorne' }
      ]
    },
    {
      id: 'help',
      label: 'Hilfe',
      items: [
        { label: 'Finder Feedback senden' },
        { divider: true, label: '' },
        { label: 'macOS Hilfe' }
      ]
    }
  ];

  let controlOpen = false;
  let menuOpen: string | null = null;
  let contextOpen = false;
  let contextX = 0;
  let contextY = 0;

  const contextItems = [
    { label: 'Neuer Ordner' },
    { label: 'Informationen' },
    { label: 'Schreibtischhintergrund ändern' },
    { divider: true },
    { label: 'Stapel verwenden' },
    { label: 'Sortieren nach' },
    { label: 'Aufräumen' },
    { label: 'Aufräumen nach' },
    { divider: true },
    { label: 'Darstellungsoptionen anzeigen' }
  ];
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
        frame.classList.remove('animate-out');
      }, 300);
    } else {
      controlOpen = false;
    }
  };

  const toggleState = (key: keyof ToggleState) => {
    if (key === 'airplane') {
      toggles = { ...toggles, airplane: !toggles.airplane };
      if (toggles.airplane) {
        toggles.wifi = false;
        toggles.bluetooth = false;
      }
    } else if (key === 'wifi' || key === 'bluetooth') {
      toggles = { ...toggles, [key]: !toggles[key] };
      if (toggles[key] && toggles.airplane) {
        toggles.airplane = false;
      }
    } else {
      toggles = { ...toggles, [key]: !toggles[key] };
    }
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

  $: frameBrightness = 0.72 + (brightness / 100) * 0.55;
  $: currentTrack = tracks[trackIndex] || tracks[0];
  $: audioSrc = tracks[trackIndex]?.file || '';
  $: if (audioEl) audioEl.volume = volume / 100;

  const toggleMenu = (id: string) => {
    menuOpen = menuOpen === id ? null : id;
  };

  const closeMenus = () => {
    menuOpen = null;
  };

  const openContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    contextX = event.clientX;
    contextY = event.clientY;
    contextOpen = true;
  };

  const closeContextMenu = () => {
    contextOpen = false;
  };

  onMount(() => {
    updateTime();
    updateDate();
    loadState();

    const timeInterval = setInterval(updateTime, 1000);
    const dateInterval = setInterval(updateDate, 1000);

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (controlOpen) {
          closeControlCenter();
        }
        closeMenus();
        closeContextMenu();
      }
    };

    const handleDocClick = () => {
      closeMenus();
      closeContextMenu();
    };

    window.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleDocClick);
    document.addEventListener('contextmenu', openContextMenu);

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
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('contextmenu', openContextMenu);
    };
  });
</script>
<header>
  <div class="left">
    <div class="menu-bar">
      {#each menuGroups as group}
        <div class="menu">
          <button
            class={`menu-btn ${menuOpen === group.id ? 'active' : ''} ${group.label === 'Finder' ? 'bold' : ''}`}
            onclick={(event) => {
              event.stopPropagation();
              toggleMenu(group.id);
            }}
            onmouseenter={() => {
              if (menuOpen) {
                menuOpen = group.id;
              }
            }}
            aria-haspopup="true"
            aria-expanded={menuOpen === group.id}
          >
            {#if group.icon}
              <img class="icon-img" src={group.icon} alt="Logo" />
            {:else}
              {group.label}
            {/if}
          </button>
          {#if menuOpen === group.id}
            <div class="menu-dropdown" role="menu">
              {#each group.items as item}
                {#if item.divider}
                  <div class="menu-divider"></div>
                {:else}
                  <button
                    class={`menu-item ${item.disabled ? 'disabled' : ''}`}
                    disabled={item.disabled}
                    role="menuitem"
                    onclick={(e) => { if (item.action) { e.stopPropagation(); closeMenus(); item.action(); } }}
                  >
                    {item.label}
                  </button>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  <div class="right">
    <button class="icon-container" onclick={toggleControlCenter}>
      <img class="icon-img icon-img-lg" src="/icons/battery.png" alt="Batterie" />
    </button>
    <button class="icon-container" onclick={toggleControlCenter}>
      <img class="icon-img icon-img-lg" src="/icons/wifi.png" alt="WLAN" />
    </button>
    <button class="icon-container" onclick={toggleControlCenter}>
      <img class="icon-img icon-img-lg" src="/icons/control-menu.svg" alt="Kontrollzentrum" />
    </button>
    <button class="date" style="font-size: 1em;" onclick={toggleControlCenter}>{date}</button>
    <button class="time" style="font-size: 1em;" onclick={toggleControlCenter}>{time}</button>
  </div>
</header>

{#if showAboutMac}
  <div
    class="am-overlay"
    onclick={closeAboutMac}
    onkeydown={(e) => e.key === 'Escape' && closeAboutMac()}
    role="button"
    tabindex="-1"
  >
    <div
      class="am-win"
      style="left:{winX}px;top:{winY}px"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.key === 'Escape' && closeAboutMac()}
      role="dialog"
      tabindex="0"
    >
      <div class="am-titlebar" role="toolbar" tabindex="0" onmousedown={startWinDrag}>
        <div class="am-controls">
          <button class="am-ctrl am-close" aria-label="Schließen" onclick={closeAboutMac}></button>
          <button class="am-ctrl am-minimize" aria-label="Minimieren"></button>
          <button class="am-ctrl am-maximize" aria-label="Vollbild"></button>
        </div>
      </div>
      <div class="am-body">
        <img class="am-mac-img" src="/MAC.png" alt="MacBook Pro" />
        <h1 class="am-title">{macInfo.model}</h1>
        <p class="am-subtitle">{macInfo.size}</p>
        <div class="am-specs">
          <div class="am-row"><span class="am-key">Chip</span><span class="am-val">{macInfo.chip}</span></div>
          <div class="am-row"><span class="am-key">Speicher</span><span class="am-val">{macInfo.memory}</span></div>
          <div class="am-row"><span class="am-key">Seriennummer</span><span class="am-val">{macInfo.serial}</span></div>
          <div class="am-row"><span class="am-key">macOS</span><span class="am-val">{macInfo.os}</span></div>
        </div>
        <button class="am-more-btn" onclick={() => window.open('https://www.apple.com/de/shop/buy-mac/macbook-pro', '_blank')}>Weitere Infos ...</button>
        <div class="am-footer">
          <span class="am-footer-link">Regulatorische Zertifizierung</span>
          <p class="am-footer-copy">™ und © 1983–2025 Apple Inc.<br />Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if contextOpen}
  <div
    class="context-overlay"
    onclick={closeContextMenu}
    onkeydown={(event) => (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') && closeContextMenu()}
    oncontextmenu={(event) => event.preventDefault()}
    role="button"
    tabindex="0"
  >
    <div
      class="context-menu"
      style={`left: ${contextX}px; top: ${contextY}px;`}
      onclick={(event) => event.stopPropagation()}
      oncontextmenu={(event) => event.preventDefault()}
      onkeydown={(event) => event.key === 'Escape' && closeContextMenu()}
      role="menu"
      tabindex="-1"
    >
      {#each contextItems as item}
        {#if item.divider}
          <div class="context-divider"></div>
        {:else}
          <button class="context-item" role="menuitem">{item.label}</button>
        {/if}
      {/each}
    </div>
  </div>
{/if}

{#if controlOpen}
  <div class="control-overlay" onclick={closeControlCenter} onkeydown={(e) => e.key === 'Escape' && closeControlCenter()} role="button" tabindex="0">
    <div
      class="frame control-center"
      style={`--uiScale: ${uiScale}; --tileGap: ${tileGap}px; filter: brightness(${frameBrightness});`}
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
      role="dialog"
      tabindex="0"
      aria-label="Kontrollzentrum"
    >
      <div class="frost"></div>

      <div class="cc">
        <section class="tile connect">
          <div class="conn-grid">
            {#each ['airplane', 'wifi', 'cellular', 'bluetooth'] as toggleId}
              <button
                class="btn"
                data-id={toggleId}
                data-state={toggles[toggleId as keyof ToggleState] ? 'on' : 'off'}
                aria-pressed={toggles[toggleId as keyof ToggleState]}
                style={`--btnOnRGB: ${toggleOnRGB[toggleId as keyof ToggleState]};`}
                onclick={() => toggleState(toggleId as keyof ToggleState)}
              >
                {@html icons[toggleId]}
              </button>
            {/each}
          </div>

          <section class="tile focus" data-toggle="focus" data-state={focusSelectedId !== 'none' ? 'on' : 'off'}>
          <button
            class="moon"
            data-id="focus"
            title="Fokus umschalten"
            data-state={focusSelectedId !== 'none' ? 'on' : 'off'}
            aria-pressed={focusSelectedId !== 'none'}
            onclick={() => {
              focusSelectedId = focusSelectedId !== 'none' ? 'none' : 'dnd';
              saveState();
            }}
          >
            {@html icons.moon}
          </button>
          <div class="txt">
            <div class="title"><span>Fokus</span></div>
            <div class="current">{focusSelectedId !== 'none' ? 'An' : 'Aus'}</div>
          </div>
        </section>
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
              data-id="lock"
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
            <button class="glyph" title="Helligkeit" onclick={() => {
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
            <button class="glyph" title="Lautstärke" onclick={() => {
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

:global(body) {
  cursor: url('/cursors/normal-select.svg') 8 8, default;
}

button {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

header {
  width: 100%;
  min-height: 28px;
  padding: 2px 10px;
  background: rgba(30, 30, 30, 0.12);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 12px;
  color: black;
  position: relative;
  z-index: 20;
  overflow: visible;
}

.left,
.right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}

.right {
  justify-content: flex-end;
}

.icon-img {
  width: 26px;
  height: 26px;
  display: block;
  object-fit: contain;
}

.icon-img-lg {
  width: 28px;
  height: 28px;
}

.finder-text {
  font-weight: 450;
  font-size: 13px;
  width: auto;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 0.1px;
}

.finder-bold {
  font-weight: 700;
}

.menu-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  position: relative;
  overflow: visible;
}

.menu {
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
}

.menu-btn {
  padding: 4px 10px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 450;
  color: #111;
  letter-spacing: 0.1px;
}

.menu-btn.bold {
  font-weight: 700;
}

.menu-btn.active,
.menu-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
}

.menu-btn .icon-img {
  width: 18px;
  height: 18px;
}

.menu-dropdown {
  align-items: center;
  overflow: visible;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;

  min-width: 230px;
  padding: 6px;

  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.402);

  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px);

  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);

  display: flex;
  flex-direction: column;
  gap: 2px;

  overflow: hidden;
  z-index: 50;

  transition: all 0.4s ease;
  animation: menuPop 160ms ease-out;
}

.menu-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
  color: rgba(20, 20, 20, 0.95);
  text-shadow: none;
  cursor: url('/cursors/link-select.svg') 5 2, pointer;
  transition: background 140ms ease, color 140ms ease, transform 140ms ease;
}

.menu-item:hover {
  background: rgba(200, 200, 200, 0.4);
  color: rgba(10, 10, 10, 0.99);
  transform: translateX(1px);
}

.menu-item.disabled {
  opacity: 0.55;
  pointer-events: none;
  cursor: url('/cursors/unavailable.svg') 5 5, not-allowed;
}

.menu-divider {
  height: 1px;
  margin: 6px 6px;
  background: rgba(0, 0, 0, 0.08);
}

.context-overlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
}

.context-menu {
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
}

.context-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
  color: rgba(20, 20, 20, 0.95);
  transition: background 140ms ease, color 140ms ease, transform 140ms ease;
}

.context-item:hover {
  background: rgba(200, 200, 200, 0.4);
  color: rgba(10, 10, 10, 0.99);
  transform: translateX(1px);
}

.context-divider {
  height: 1px;
  margin: 6px 6px;
  background: rgba(0, 0, 0, 0.08);
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

.time,
.date {
  font-weight: 600;
  font-size: 12px;
  width: auto;
  padding: 0 4px;
  text-align: center;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  letter-spacing: 0.05px;
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
  height: 600px;
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
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  background: var(--btnOff);
  box-shadow: 0 12px 28px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.14);
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

.btn[data-id="airplane"][data-state="on"] {
  background: rgba(255, 159, 10, 0.7);
}

.btn[data-id="wifi"][data-state="on"] {
  background: rgba(27, 130, 255, 0.7);
}

.btn[data-id="cellular"][data-state="on"] {
  background: rgba(40, 214, 122, 0.7);
}

.btn[data-id="bluetooth"][data-state="on"] {
  background: rgba(27, 130, 255, 0.7);
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
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.1px;
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
  width: 64px;
  height: 64px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: 0 14px 28px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.14);
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
  font-size: 17px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  transition: opacity 0.3s ease;
  letter-spacing: 0.05px;
}

.np-sub {
  margin-top: 3px;
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.02px;
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
  border-radius: 20px;
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


.circleBtn[data-state="on"] {
  background: rgba(255,255,255,0.18);
  box-shadow: 0 14px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.14), 0 0 0 2.5px rgba(255,255,255,0.16), 0 0 28px rgba(255,255,255,0.12);
  transform: translateY(-1px);
}

.circleBtn[data-id="lock"][data-state="on"] {
  background: rgba(255, 59, 48, 0.7);
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

.focus .moon[data-state="on"] {
  background: rgba(25, 45, 100, 0.8);
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
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.03px;
}


.focus .txt .current {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
  letter-spacing: 0.02px;
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
  inset: 10px 10px 50px 10px;
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
  bottom: 50px;
  border-radius: 18px;
  background: rgba(255,255,255,0.92);
  box-shadow: 0 12px 28px rgba(0,0,0,0.30);
  pointer-events: none;
  max-height: calc(100% - 60px);
  transition: all 0.05s ease-out;
}

.vslider .glyph {
  position: absolute;
  bottom: 12px;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(0,0,0,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.10s ease, box-shadow 0.12s ease;
}


.vslider .glyph:active {
  transform: scale(0.98);
  box-shadow: 0 12px 28px rgba(0,0,0,0.28), 0 0 0 3.5px rgba(255,255,255,0.14);
}


.vslider:focus-visible {
  outline: 2px solid rgba(255,255,255,0.28);
  outline-offset: 2px;
}

.shortcuts {
  padding: 10px 8px;
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
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 14px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.12);
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


@media (max-width: 360px) {
  .shortcuts {
    grid-template-columns: repeat(3, 1fr);
    min-height: 220px;
  }

  .sbtn {
    width: 66px;
    height: 66px;
  }

  .art {
    width: 60px;
    height: 60px;
  }

  .btn {
    height: 68px;
  }

  .cc {
    inset: 44px 12px 12px 12px;
  }
}

.am-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.28);
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: amOverlayIn 0.22s ease forwards;
}

@keyframes amOverlayIn {
  from { background: rgba(0, 0, 0, 0); }
  to   { background: rgba(0, 0, 0, 0.28); }
}

.am-win {
  position: fixed;
  width: 360px;
  background: #f2f2f2;
  border-radius: 14px;
  border: none;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
  animation: amWinIn 0.25s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
}

@keyframes amWinIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}

.am-titlebar {
  height: 36px;
  min-height: 36px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  cursor: move;
  background: #e8e8e8;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.am-controls {
  display: flex;
  gap: 8px;
  z-index: 10;
  flex-shrink: 0;
}

.am-ctrl {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: none;
  padding: 0;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: filter 120ms ease, transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: inset 0 0 0 0.5px rgba(0,0,0,.22), 0 0.5px 0 rgba(255,255,255,.12);
}

.am-close { background: #ff5f57; }
.am-minimize { background: #febc2e; }
.am-maximize { background: #28c840; }

.am-ctrl::after {
  content: "";
  width: 9px;
  height: 9px;
  opacity: 0;
  transition: opacity 120ms ease;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  filter: drop-shadow(0 0.25px 0 rgba(0,0,0,.25));
}

.am-titlebar:hover .am-ctrl::after { opacity: 1; }
.am-ctrl:focus-visible { outline: none; }

.am-close::after {
  background-image: url("/icons/close.png");
  width: 8px;
  height: 8px;
}

.am-minimize::after {
  background-image: url("/icons/minimize.png");
  width: 8px;
  height: 8px;
}

.am-maximize::after {
  background-image: url("/icons/maximize.png");
  width: 8px;
  height: 8px;
}

.am-controls:hover .am-ctrl { transform: scale(1.25); filter: brightness(0.92); }

.am-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 32px 28px;
  gap: 0;
  background: #f2f2f2;
}

.am-mac-img {
  width: 220px;
  height: auto;
  object-fit: contain;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.am-title {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0 0 4px;
  color: #1d1d1f;
  font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif;
}

.am-subtitle {
  font-size: 13px;
  color: #8e8e93;
  margin: 0 0 20px;
  font-weight: 400;
  font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
}

.am-specs {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  max-width: 280px;
  margin-bottom: 20px;
}

.am-row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 0;
}

.am-key {
  font-size: 13px;
  color: #6e6e73;
  font-weight: 400;
  white-space: nowrap;
  text-align: right;
  flex: 1;
  padding-right: 8px;
  font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
}

.am-val {
  font-size: 13px;
  color: #1d1d1f;
  font-weight: 400;
  flex: 1;
  font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
}

.am-more-btn {
  all: unset;
  padding: 7px 28px;
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.10);
  color: #1d1d1f;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  transition: background 0.15s ease;
  display: inline-block;
  text-align: center;
  margin-bottom: 20px;
}

.am-more-btn:hover {
  background: rgba(0, 0, 0, 0.10);
}

.am-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.am-footer-link {
  font-size: 12px;
  color: #8e8e93;
  text-decoration: underline;
  cursor: pointer;
  font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
}

.am-footer-copy {
  font-size: 11px;
  color: #aeaeb2;
  text-align: center;
  margin: 0;
  line-height: 1.5;
  font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
}
</style>

