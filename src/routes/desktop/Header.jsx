import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Header.css';

/* ------------------------------------------------------------------ */
/*  Tracks                                                            */
/* ------------------------------------------------------------------ */
const tracks = [
  { title: 'emails i can\'t send', artist: 'Sabrina Carpenter', cover: '/songs/emails i cant send.jpg', src: '/songs/SpotiDownloader.com - emails i cant send - Sabrina Carpenter.mp3' },
  { title: 'Tornado Warnings', artist: 'Sabrina Carpenter', cover: '/songs/emails i cant send.jpg', src: '/songs/SpotiDownloader.com - Tornado Warnings - Sabrina Carpenter.mp3' },
  { title: 'Vicious', artist: 'Sabrina Carpenter', cover: '/songs/emails i cant send.jpg', src: '/songs/SpotiDownloader.com - Vicious - Sabrina Carpenter.mp3' },
  { title: 'bet u wanna', artist: 'Sabrina Carpenter', cover: '/songs/Short n Sweet (Deluxe).jpg', src: '/songs/SpotiDownloader.com - bet u wanna - Sabrina Carpenter.mp3' },
  { title: 'Couldn\'t Make It Any Harder', artist: 'Sabrina Carpenter', cover: '/songs/Short n Sweet (Deluxe).jpg', src: '/songs/SpotiDownloader.com - Couldnt Make It Any Harder - Sabrina Carpenter.mp3' },
  { title: 'Such A Funny Way', artist: 'Sabrina Carpenter', cover: '/songs/Mans Best Friend (Bonus Track Version).jpg', src: '/songs/SpotiDownloader.com - Such A Funny Way - Sabrina Carpenter.mp3' },
  { title: 'buy me presents', artist: 'Sabrina Carpenter', cover: '/songs/Mans Best Friend.jpg', src: '/songs/SpotiDownloader.com - buy me presents - Sabrina Carpenter.mp3' },
  { title: 'We Almost Broke Up Again Last Night', artist: 'Sabrina Carpenter', cover: '/songs/Mans Best Friend.jpg', src: '/songs/SpotiDownloader.com - We Almost Broke Up Again Last Night - Sabrina Carpenter.mp3' },
];

/* ------------------------------------------------------------------ */
/*  Default settings                                                  */
/* ------------------------------------------------------------------ */
const DEFAULT_SETTINGS = {
  wifi: true,
  bluetooth: false,
  airplane: false,
  cellular: false,
  lock: false,
  mirror: false,
  brightness: 100,
  volume: 50,
};

function loadSettings() {
  try {
    const raw = localStorage.getItem('control_center_settings_v1');
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_SETTINGS };
}

function saveSettings(s) {
  localStorage.setItem('control_center_settings_v1', JSON.stringify(s));
}

/* ------------------------------------------------------------------ */
/*  Helper — German date/time                                         */
/* ------------------------------------------------------------------ */
function formatDate(d) {
  const days = ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'];
  const months = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'];
  return `${days[d.getDay()]} ${d.getDate()}. ${months[d.getMonth()]}`;
}
function formatTime(d) {
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

/* ================================================================== */
/*  Header Component                                                  */
/* ================================================================== */
export default function Header({ onOpenApp }) {
  /* ---- clock ---- */
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);

  /* ---- control-center settings ---- */
  const [settings, setSettings] = useState(loadSettings);
  useEffect(() => saveSettings(settings), [settings]);
  const toggle = (key) => {
    setSettings((s) => {
      const next = { ...s, [key]: !s[key] };
      // Airplane mode: turning ON disables WiFi & Mobilfunk
      if (key === 'airplane' && next.airplane) {
        next.wifi = false;
        next.cellular = false;
      }
      // Turning on WiFi or Cellular disables airplane mode
      if ((key === 'wifi' || key === 'cellular') && next[key]) {
        next.airplane = false;
      }
      return next;
    });
  };

  /* ---- UI toggles ---- */
  const [openMenu, setOpenMenu] = useState(null);       // menu-bar dropdown id
  const [closingMenu, setClosingMenu] = useState(null);  // menu closing animation
  const [showCC, setShowCC] = useState(false);           // control center
  const [ccClosing, setCcClosing] = useState(false);     // CC close animation
  const [showAbout, setShowAbout] = useState(false);     // About Mac dialog
  const [ctxMenu, setCtxMenu] = useState(null);          // right-click {x,y}

  // Animated menu close
  const closeMenu = useCallback(() => {
    if (openMenu) {
      setClosingMenu(openMenu);
      setTimeout(() => { setClosingMenu(null); }, 150);
    }
    setOpenMenu(null);
  }, [openMenu]);

  const closeCC = useCallback(() => {
    setCcClosing(true);
    setTimeout(() => { setCcClosing(false); setShowCC(false); }, 200);
  }, []);

  /* ---- music ---- */
  const audioRef = useRef(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = tracks[trackIdx];

  // sync audio element
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = currentTrack.src;
    if (playing) a.play().catch(() => {});
  }, [trackIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => {});
    else a.pause();
  }, [playing]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = settings.volume / 100;
  }, [settings.volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const tick = () => {
      if (a.duration) setProgress((a.currentTime / a.duration) * 100);
    };
    const onEnded = () => {
      setTrackIdx((i) => (i + 1) % tracks.length);
    };
    a.addEventListener('timeupdate', tick);
    a.addEventListener('ended', onEnded);
    return () => {
      a.removeEventListener('timeupdate', tick);
      a.removeEventListener('ended', onEnded);
    };
  }, []);

  const prevTrack = () => { setTrackIdx((i) => (i - 1 + tracks.length) % tracks.length); };
  const nextTrack = () => { setTrackIdx((i) => (i + 1) % tracks.length); };

  /* ---- brightness as CSS var ---- */
  useEffect(() => {
    document.documentElement.style.setProperty('--brightness', `${settings.brightness}%`);
  }, [settings.brightness]);

  /* ---- About Mac dragging ---- */
  const aboutRef = useRef(null);
  const aboutDrag = useRef(null);
  const [aboutPos, setAboutPos] = useState({ x: 0, y: 0 });
  const startAboutDrag = (e) => {
    aboutDrag.current = { sx: e.clientX - aboutPos.x, sy: e.clientY - aboutPos.y };
  };
  useEffect(() => {
    const mv = (e) => {
      if (!aboutDrag.current) return;
      setAboutPos({ x: e.clientX - aboutDrag.current.sx, y: e.clientY - aboutDrag.current.sy });
    };
    const up = () => { aboutDrag.current = null; };
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
  }, []);

  /* ---- close overlays on outside click (left + right) ---- */
  const headerRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('contextmenu', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('contextmenu', handler);
    };
  }, [closeMenu]);

  /* ---- close CC on outside click (left + right) ---- */
  useEffect(() => {
    if (!showCC) return;
    const handler = (e) => {
      const panel = document.querySelector('.cc-panel');
      if (panel && panel.contains(e.target)) return;
      const btn = document.querySelector('.header-icon-btn.active');
      if (btn && btn.contains(e.target)) return;
      closeCC();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('contextmenu', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('contextmenu', handler);
    };
  }, [showCC, closeCC]);

  /* ---- right-click context menu ---- */
  useEffect(() => {
    const handler = (e) => {
      // only on desktop bg
      if (e.target.closest('.app-window') || e.target.closest('.dock-container') || e.target.closest('header')) return;
      e.preventDefault();
      setCtxMenu({ x: e.clientX, y: e.clientY });
    };
    const close = () => setCtxMenu(null);
    window.addEventListener('contextmenu', handler);
    window.addEventListener('mousedown', close);
    return () => { window.removeEventListener('contextmenu', handler); window.removeEventListener('mousedown', close); };
  }, []);

  /* ---- menu definitions ---- */
  const menus = useMemo(() => [
    {
      id: 'apple', label: '', icon: '/logos/apple-logo.png',
      items: [
        { label: 'Über diesen Mac', action: () => { setShowAbout(true); closeMenu(); } },
        { divider: true },
        { label: 'Systemeinstellungen …', action: () => { onOpenApp?.('Settings'); closeMenu(); } },
        { label: 'App Store …', action: () => { onOpenApp?.('App Store'); closeMenu(); } },
        { divider: true },
        { label: 'Ruhezustand', action: () => closeMenu() },
        { label: 'Neustart …', action: () => window.location.reload() },
        { label: 'Ausschalten …', action: () => { window.location.href = '/'; } },
        { divider: true },
        { label: 'Bildschirm sperren', action: () => { window.location.href = '/'; } },
        { label: 'Abmelden …', action: () => { window.location.href = '/'; } },
      ],
    },
    {
      id: 'finder', label: 'Finder',
      items: [
        { label: 'Über Finder', action: () => { onOpenApp?.('Finder'); closeMenu(); } },
        { divider: true },
        { label: 'Einstellungen …' },
        { label: 'Papierkorb leeren …' },
      ],
    },
    {
      id: 'datei', label: 'Datei',
      items: [
        { label: 'Neues Fenster', shortcut: '⌘N' },
        { label: 'Neuer Tab', shortcut: '⌘T' },
        { divider: true },
        { label: 'Öffnen', shortcut: '⌘O' },
        { label: 'Schließen', shortcut: '⌘W' },
      ],
    },
    {
      id: 'bearbeiten', label: 'Bearbeiten',
      items: [
        { label: 'Widerrufen', shortcut: '⌘Z' },
        { label: 'Wiederherstellen', shortcut: '⇧⌘Z' },
        { divider: true },
        { label: 'Ausschneiden', shortcut: '⌘X' },
        { label: 'Kopieren', shortcut: '⌘C' },
        { label: 'Einfügen', shortcut: '⌘V' },
        { label: 'Alles auswählen', shortcut: '⌘A' },
      ],
    },
    {
      id: 'ansicht', label: 'Ansicht',
      items: [
        { label: 'Als Symbole' },
        { label: 'Als Liste' },
        { label: 'Als Spalten' },
        { label: 'Als Galerie' },
        { divider: true },
        { label: 'Symbolleiste ausblenden' },
        { label: 'Pfadleiste einblenden' },
        { label: 'Statusleiste einblenden' },
      ],
    },
    {
      id: 'gehzu', label: 'Gehe zu',
      items: [
        { label: 'Zuletzt' },
        { label: 'Dokumente' },
        { label: 'Schreibtisch' },
        { label: 'Downloads' },
        { label: 'Privat' },
        { label: 'Computer' },
        { divider: true },
        { label: 'AirDrop' },
        { label: 'Netzwerk' },
      ],
    },
    {
      id: 'fenster', label: 'Fenster',
      items: [
        { label: 'Minimieren', shortcut: '⌘M' },
        { label: 'Zoomen' },
        { divider: true },
        { label: 'Alle nach vorn' },
      ],
    },
    {
      id: 'hilfe', label: 'Hilfe',
      items: [
        { label: 'macOS-Hilfe' },
        { label: 'Tipps für den Mac' },
      ],
    },
  ], [onOpenApp, closeMenu]);

  /* ---- shortcuts for CC ---- */
  const shortcuts = [
    { icon: '/icons/moon.png', label: 'Nicht stören' },
    { icon: '/icons/bright.png', label: 'Nachtmodus' },
    { icon: '/icons/airplay.png', label: 'AirPlay' },
  ];

  /* ================================================================ */
  /*  RENDER                                                          */
  /* ================================================================ */
  return (
    <>
      {/* Brightness overlay */}
      <div className="brightness-overlay" style={{ opacity: 1 - settings.brightness / 100 }} />

      {/* ---- HEADER BAR ---- */}
      <header className="header-bar" ref={headerRef}>
        {/* Left — Menus */}
        <div className="header-left">
          {menus.map((menu) => {
            const isOpen = openMenu === menu.id;
            const isClosing = closingMenu === menu.id && !isOpen;
            const showDropdown = isOpen || isClosing;
            return (
              <div key={menu.id} className="menu-wrapper">
                <button
                  className={`menu-trigger${isOpen ? ' active' : ''}`}
                  onMouseDown={() => {
                    if (isOpen) closeMenu();
                    else { setClosingMenu(null); setOpenMenu(menu.id); }
                  }}
                  onMouseEnter={() => openMenu && setOpenMenu(menu.id)}
                >
                  {menu.icon
                    ? <img src={menu.icon} alt="Apple" className="apple-logo" />
                    : <span>{menu.label}</span>}
                </button>

                {showDropdown && (
                  <div className={`menu-dropdown${isClosing ? ' closing' : ''}`}>
                    {menu.items.map((item, i) =>
                      item.divider
                        ? <div key={i} className="menu-divider" />
                        : (
                          <button key={i} className="menu-item" onClick={item.action || (() => closeMenu())}>
                            <span>{item.label}</span>
                            {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
                          </button>
                        )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right — status icons + date/time */}
        <div className="header-right">
          {/* Battery */}
          <div className="header-icon-group">
            <img src="/icons/battery.png" alt="Battery" className="header-status-icon" />
          </div>

          {/* Wi-Fi */}
          <button
            className="header-icon-btn"
            onClick={() => toggle('wifi')}
            title={settings.wifi ? 'Wi-Fi: On' : 'Wi-Fi: Off'}
          >
            <img
              src="/icons/wifi.png"
              alt="Wi-Fi"
              className="header-status-icon"
              style={{ opacity: settings.wifi ? 1 : 0.4 }}
            />
          </button>

          {/* Control Center toggle */}
          <button
            className={`header-icon-btn${showCC ? ' active' : ''}`}
            onClick={() => { if (showCC) closeCC(); else setShowCC(true); }}
          >
            <img src="/icons/control-menu.svg" alt="Control Center" className="header-status-icon" />
          </button>

          {/* Date & Time */}
          <span className="header-datetime">
            {formatDate(now)}&ensp;{formatTime(now)}
          </span>
        </div>
      </header>

      {/* ---- ABOUT THIS MAC ---- */}
      {showAbout && (
        <div className="about-overlay" onClick={() => setShowAbout(false)}>
          <div
            className="about-window"
            ref={aboutRef}
            style={{ transform: `translate(${aboutPos.x}px, ${aboutPos.y}px)` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="about-titlebar" onMouseDown={startAboutDrag}>
              <div className="about-btns">
                <button className="about-btn close" onClick={() => setShowAbout(false)} />
                <button className="about-btn minimize" />
                <button className="about-btn maximize" />
              </div>
            </div>
            <div className="about-body">
              <img src="/MAC.png" alt="macOS Tahoe" className="about-apple-logo" />
              <h2>macOS Tahoe</h2>
              <p className="about-version">Version 26.0</p>
              <div className="about-specs">
                <div className="about-spec-row"><span>Chip</span><span>Apple M3 Pro</span></div>
                <div className="about-spec-row"><span>Arbeitsspeicher</span><span>18 GB</span></div>
                <div className="about-spec-row"><span>Seriennummer</span><span>XXXXXXXXXX</span></div>
                <div className="about-spec-row"><span>macOS</span><span>Tahoe 26.0</span></div>
              </div>
              <button className="about-more-btn" onClick={() => { onOpenApp?.('Settings'); setShowAbout(false); }}>
                Weitere Informationen …
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- CONTROL CENTER ---- */}
      {showCC && (
        <div className="cc-overlay" onClick={closeCC}>
          <div className={`cc-panel${ccClosing ? ' closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            {/* Connectivity toggles */}
            <div className="cc-section cc-toggles">
              <div className="cc-toggle-grid">
                <button className={`cc-toggle-btn${settings.wifi ? ' on' : ''}`} onClick={() => toggle('wifi')}>
                  <img src="/icons/wifi.png" alt="" className="cc-toggle-icon" />
                  <span>WLAN</span>
                </button>
                <button className={`cc-toggle-btn${settings.bluetooth ? ' on' : ''}`} onClick={() => toggle('bluetooth')}>
                  <img src="/icons/bluetooth.png" alt="" className="cc-toggle-icon" />
                  <span>Bluetooth</span>
                </button>
                <button className={`cc-toggle-btn cc-airplane${settings.airplane ? ' on' : ''}`} onClick={() => toggle('airplane')}>
                  <img src="/icons/flugmodus.png" alt="" className="cc-toggle-icon" />
                  <span>Flugmodus</span>
                </button>
                <button className={`cc-toggle-btn cc-cellular${settings.cellular ? ' on' : ''}`} onClick={() => toggle('cellular')}>
                  <img src="/icons/mobile-Daten.png" alt="" className="cc-toggle-icon" />
                  <span>Mobilfunk</span>
                </button>
              </div>
            </div>

            {/* Music player */}
            <div className="cc-section cc-music">
              <div className="cc-music-info">
                <img
                  className="cc-music-cover"
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  onError={(e) => { e.target.src = '/songs/no-song-found.png'; }}
                />
                <div className="cc-music-text">
                  <span className="cc-music-title">{currentTrack.title}</span>
                  <span className="cc-music-artist">{currentTrack.artist}</span>
                </div>
              </div>
              <div className="cc-music-progress">
                <div className="cc-music-progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <div className="cc-music-controls">
                <button onClick={prevTrack}>
                  <img src="/icons/skip-backwards.png" alt="Previous" />
                </button>
                <button onClick={() => setPlaying(!playing)}>
                  <img src={playing ? '/icons/pause.png' : '/icons/play.png'} alt={playing ? 'Pause' : 'Play'} />
                </button>
                <button onClick={nextTrack}>
                  <img src="/icons/skip-forwards.png" alt="Next" />
                </button>
              </div>
            </div>

            {/* Brightness */}
            <div className="cc-section cc-slider-section">
              <div className="cc-slider-label">
                <img src="/icons/bright.png" alt="" className="cc-slider-icon" />
                <span>Helligkeit</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={settings.brightness}
                onChange={(e) => setSettings((s) => ({ ...s, brightness: Number(e.target.value) }))}
                className="cc-slider"
              />
            </div>

            {/* Volume */}
            <div className="cc-section cc-slider-section">
              <div className="cc-slider-label">
                <img src="/icons/volume.png" alt="" className="cc-slider-icon" />
                <span>Lautstärke</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.volume}
                onChange={(e) => setSettings((s) => ({ ...s, volume: Number(e.target.value) }))}
                className="cc-slider"
              />
            </div>

            {/* Extra toggles */}
            <div className="cc-section cc-extra-toggles">
              <button className={`cc-toggle-sm cc-lock${settings.lock ? ' on' : ''}`} onClick={() => toggle('lock')}>
                <img src="/icons/lock.png" alt="" />
                <span>Sperren</span>
              </button>
              <button className={`cc-toggle-sm${settings.mirror ? ' on' : ''}`} onClick={() => toggle('mirror')}>
                <img src="/icons/airplay.png" alt="" />
                <span>Spiegeln</span>
              </button>
            </div>

            {/* Shortcuts */}
            <div className="cc-section cc-shortcuts">
              {shortcuts.map((s, i) => (
                <button key={i} className="cc-shortcut-btn">
                  <img src={s.icon} alt="" />
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---- DESKTOP CONTEXT MENU ---- */}
      {ctxMenu && (
        <div className="desktop-ctx-overlay" onClick={() => setCtxMenu(null)}>
          <div className="desktop-ctx" style={{ left: ctxMenu.x, top: ctxMenu.y }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setCtxMenu(null); }}>Neuer Ordner</button>
            <div className="menu-divider" />
            <button onClick={() => { onOpenApp?.('Info'); setCtxMenu(null); }}>Informationen</button>
            <button onClick={() => { setCtxMenu(null); }}>Darstellung aufräumen</button>
            <button onClick={() => { setCtxMenu(null); }}>Hintergrundbild ändern …</button>
            <div className="menu-divider" />
            <button onClick={() => { setCtxMenu(null); }}>Einfügen</button>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />
    </>
  );
}
