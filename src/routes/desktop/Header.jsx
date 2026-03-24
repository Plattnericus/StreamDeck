import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Header.css';
import { useLanguage } from '../../i18n/LanguageContext';
import T from '../../i18n/translations';

const ALL_TRACKS = [
  /*0*/{ title: 'emails i can\'t send', artist: 'Sabrina Carpenter', cover: '/songs/emails i cant send.jpg', src: '/songs/SpotiDownloader.com - emails i cant send - Sabrina Carpenter.mp3' },
  /*1*/{ title: 'Tornado Warnings', artist: 'Sabrina Carpenter', cover: '/songs/emails i cant send.jpg', src: '/songs/SpotiDownloader.com - Tornado Warnings - Sabrina Carpenter.mp3' },
  /*2*/{ title: 'Vicious', artist: 'Sabrina Carpenter', cover: '/songs/emails i cant send.jpg', src: '/songs/SpotiDownloader.com - Vicious - Sabrina Carpenter.mp3' },
  /*3*/{ title: 'bet u wanna', artist: 'Sabrina Carpenter', cover: '/songs/Short n Sweet (Deluxe).jpg', src: '/songs/SpotiDownloader.com - bet u wanna - Sabrina Carpenter.mp3' },
  /*4*/{ title: 'Couldn\'t Make It Any Harder', artist: 'Sabrina Carpenter', cover: '/songs/Short n Sweet (Deluxe).jpg', src: '/songs/SpotiDownloader.com - Couldnt Make It Any Harder - Sabrina Carpenter.mp3' },
  /*5*/{ title: 'Such A Funny Way', artist: 'Sabrina Carpenter', cover: '/songs/Mans Best Friend (Bonus Track Version).jpg', src: '/songs/SpotiDownloader.com - Such A Funny Way - Sabrina Carpenter.mp3' },
  /*6*/{ title: 'buy me presents', artist: 'Sabrina Carpenter', cover: '/songs/Mans Best Friend.jpg', src: '/songs/SpotiDownloader.com - buy me presents - Sabrina Carpenter.mp3' },
  /*7*/{ title: 'We Almost Broke Up Again Last Night', artist: 'Sabrina Carpenter', cover: '/songs/Mans Best Friend.jpg', src: '/songs/SpotiDownloader.com - We Almost Broke Up Again Last Night - Sabrina Carpenter.mp3' },
];

const TRACK_ORDER = [4, 1, 5, 6, 2, 7, 0, 3];

const tracks = TRACK_ORDER.map((i) => ALL_TRACKS[i]);

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
  } catch {  }
  return { ...DEFAULT_SETTINGS };
}

function saveSettings(s) {
  localStorage.setItem('control_center_settings_v1', JSON.stringify(s));
}

const MUSIC_STORAGE_KEY = 'music_player_state_v1';

function loadMusicState() {
  try {
    const raw = localStorage.getItem(MUSIC_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        trackIdx: typeof parsed.trackIdx === 'number' && parsed.trackIdx >= 0 && parsed.trackIdx < tracks.length ? parsed.trackIdx : 0,
        playing: !!parsed.playing,
        currentTime: typeof parsed.currentTime === 'number' ? parsed.currentTime : 0,
      };
    }
  } catch {  }
  return { trackIdx: 0, playing: false, currentTime: 0 };
}

function saveMusicState(trackIdx, playing, currentTime) {
  localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify({ trackIdx, playing, currentTime }));
}

const LOCALE_MAP = { de: 'de-DE', en: 'en-US', it: 'it-IT' };

function formatDate(d, lang) {
  const locale = LOCALE_MAP[lang] ?? 'de-DE';
  return d.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
}
function formatTime(d, lang) {
  const locale = LOCALE_MAP[lang] ?? 'de-DE';
  return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

export default function Header({ onOpenApp }) {
  const lang = useLanguage();
  const t = useCallback((key) => T[lang]?.[key] ?? T.de[key] ?? key, [lang]);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);

  const [settings, setSettings] = useState(loadSettings);
  useEffect(() => saveSettings(settings), [settings]);
  useEffect(() => {
    const sync = () => setSettings(loadSettings());
    window.addEventListener('streamdeck-settings-sync', sync);
    return () => window.removeEventListener('streamdeck-settings-sync', sync);
  }, []);
  const toggle = (key) => {
    setSettings((s) => {
      const next = { ...s, [key]: !s[key] };
      if (key === 'airplane' && next.airplane) {
        next.wifi = false;
        next.cellular = false;
      }
      if ((key === 'wifi' || key === 'cellular') && next[key]) {
        next.airplane = false;
      }
      return next;
    });
  };

  const [openMenu, setOpenMenu] = useState(null);
  const [closingMenu, setClosingMenu] = useState(null);
  const [showCC, setShowCC] = useState(false);
  const [ccClosing, setCcClosing] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [ctxMenu, setCtxMenu] = useState(null);
  const ccGlassRef = useRef(null);
  const ccGlassDispRef = useRef(null);
  const ccGlassSpecRef = useRef(null);

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

  const audioRef = useRef(null);
  const savedMusic = useRef(loadMusicState());
  const [trackIdx, setTrackIdx] = useState(() => savedMusic.current.trackIdx);
  const [playing, setPlaying] = useState(() => savedMusic.current.playing);
  const [progress, setProgress] = useState(0);

  // Save full state (incl. currentTime) periodically
  useEffect(() => {
    const a = audioRef.current;
    saveMusicState(trackIdx, playing, a ? a.currentTime : 0);
  }, [trackIdx, playing]);

  useEffect(() => {
    const id = setInterval(() => {
      const a = audioRef.current;
      if (a) saveMusicState(trackIdx, playing, a.currentTime);
    }, 2000);
    return () => clearInterval(id);
  }, [trackIdx, playing]);

  const currentTrack = tracks[trackIdx];

  // When track changes, load src and restore saved time on first load
  const isFirstLoad = useRef(true);
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = currentTrack.src;
    if (isFirstLoad.current && savedMusic.current.currentTime > 0) {
      a.currentTime = savedMusic.current.currentTime;
      isFirstLoad.current = false;
    }
    if (playing) a.play().catch(() => {});
  }, [trackIdx]);

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

  const seekingRef = useRef(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const tick = () => {
      if (seekingRef.current) return;
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

  const handleCCGlassMove = useCallback((e) => {
    const el = ccGlassRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (ccGlassDispRef.current) {
      ccGlassDispRef.current.setAttribute('scale', Math.min((x / rect.width) * 100, (y / rect.height) * 100));
    }
    if (ccGlassSpecRef.current) {
      ccGlassSpecRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 60%)`;
    }
  }, []);

  const handleCCGlassLeave = useCallback(() => {
    if (ccGlassDispRef.current) ccGlassDispRef.current.setAttribute('scale', '77');
    if (ccGlassSpecRef.current) ccGlassSpecRef.current.style.background = 'none';
  }, []);

  const progressRef = useRef(null);

  const seekTo = useCallback((e) => {
    const bar = progressRef.current;
    const a = audioRef.current;
    if (!bar || !a || !a.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setProgress(pct * 100);
    a.currentTime = pct * a.duration;
  }, []);

  const onProgressDown = useCallback((e) => {
    e.preventDefault();
    seekingRef.current = true;
    seekTo(e);
    const onMove = (ev) => { if (seekingRef.current) seekTo(ev); };
    const onUp = () => {
      seekingRef.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [seekTo]);

  useEffect(() => {
    document.documentElement.style.setProperty('--brightness', `${settings.brightness}%`);
  }, [settings.brightness]);

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

  useEffect(() => {
    const handler = (e) => {
      if (e.target.closest('.app-window') || e.target.closest('.dock-container') || e.target.closest('header')) return;
      e.preventDefault();
      setCtxMenu({ x: e.clientX, y: e.clientY });
    };
    const close = () => setCtxMenu(null);
    window.addEventListener('contextmenu', handler);
    window.addEventListener('mousedown', close);
    return () => { window.removeEventListener('contextmenu', handler); window.removeEventListener('mousedown', close); };
  }, []);

  const menus = useMemo(() => [
    {
      id: 'apple', label: '', icon: '/icons/apple.png',
      items: [
        { label: t('menu_apple_about'), action: () => { setShowAbout(true); closeMenu(); } },
        { divider: true },
        { label: t('menu_apple_syspreferences'), action: () => { onOpenApp?.('Settings'); closeMenu(); } },
        { label: t('menu_apple_appstore'), action: () => { onOpenApp?.('App Store'); closeMenu(); } },
        { divider: true },
        { label: t('menu_apple_sleep'), action: () => closeMenu() },
        { label: t('menu_apple_restart'), action: () => window.location.reload() },
        { label: t('menu_apple_shutdown'), action: () => { window.location.href = '/'; } },
        { divider: true },
        { label: t('menu_apple_lock'), action: () => { window.location.href = '/'; } },
        { label: t('menu_apple_logout'), action: () => { window.location.href = '/'; } },
      ],
    },
    {
      id: 'finder', label: t('menu_finder'),
      items: [
        { label: t('menu_finder_about'), action: () => { onOpenApp?.('Finder'); closeMenu(); } },
        { divider: true },
        { label: t('menu_finder_prefs') },
        { label: t('menu_finder_emptytrash') },
      ],
    },
    {
      id: 'file', label: t('menu_file'),
      items: [
        { label: t('menu_file_newwindow'), shortcut: '⌘N' },
        { label: t('menu_file_newtab'), shortcut: '⌘T' },
        { divider: true },
        { label: t('menu_file_open'), shortcut: '⌘O' },
        { label: t('menu_file_close'), shortcut: '⌘W' },
      ],
    },
    {
      id: 'edit', label: t('menu_edit'),
      items: [
        { label: t('menu_edit_undo'), shortcut: '⌘Z' },
        { label: t('menu_edit_redo'), shortcut: '⇧⌘Z' },
        { divider: true },
        { label: t('menu_edit_cut'), shortcut: '⌘X' },
        { label: t('menu_edit_copy'), shortcut: '⌘C' },
        { label: t('menu_edit_paste'), shortcut: '⌘V' },
        { label: t('menu_edit_selectall'), shortcut: '⌘A' },
      ],
    },
    {
      id: 'view', label: t('menu_view'),
      items: [
        { label: t('menu_view_icons') },
        { label: t('menu_view_list') },
        { label: t('menu_view_columns') },
        { label: t('menu_view_gallery') },
        { divider: true },
        { label: t('menu_view_hidetoolbar') },
        { label: t('menu_view_pathbar') },
        { label: t('menu_view_statusbar') },
      ],
    },
    {
      id: 'go', label: t('menu_go'),
      items: [
        { label: t('menu_go_recent') },
        { label: t('menu_go_documents') },
        { label: t('menu_go_desktop') },
        { label: t('menu_go_downloads') },
        { label: t('menu_go_private') },
        { label: t('menu_go_computer') },
        { divider: true },
        { label: t('menu_go_airdrop') },
        { label: t('menu_go_network') },
      ],
    },
    {
      id: 'window', label: t('menu_window'),
      items: [
        { label: t('menu_window_minimize'), shortcut: '⌘M' },
        { label: t('menu_window_zoom') },
        { divider: true },
        { label: t('menu_window_allfront') },
      ],
    },
    {
      id: 'help', label: t('menu_help'),
      items: [
        { label: t('menu_help_macos') },
        { label: t('menu_help_tips') },
      ],
    },
  ], [t, onOpenApp, closeMenu]);

  const shortcuts = useMemo(() => [
    { icon: '/icons/moon.png', label: t('cc_dnd') },
    { icon: '/icons/bright.png', label: t('cc_nightmode') },
    { icon: '/icons/airplay.png', label: t('cc_airplay') },
  ], [t]);

  return (
    <>
      <div className="brightness-overlay" style={{ opacity: 1 - settings.brightness / 100 }} />

      <header className="header-bar" ref={headerRef}>
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

        <div className="header-right">
          <div className="header-icon-group">
            <img src="/icons/battery.png" alt="Battery" className="header-status-icon" />
          </div>

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

          <button
            className={`header-icon-btn${showCC ? ' active' : ''}`}
            onClick={() => { if (showCC) closeCC(); else setShowCC(true); }}
          >
            <img src="/icons/control-center.png" alt="Control Center" className="header-status-icon" />
          </button>

          <span className="header-datetime">
            {formatDate(now, lang)}&ensp;{formatTime(now, lang)}
          </span>
        </div>
      </header>

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
                <div className="about-spec-row"><span>{t('about_chip')}</span><span>Apple M3 Pro</span></div>
                <div className="about-spec-row"><span>{t('about_memory')}</span><span>18 GB</span></div>
                <div className="about-spec-row"><span>{t('about_serial')}</span><span>XXXXXXXXXX</span></div>
                <div className="about-spec-row"><span>macOS</span><span>Tahoe 26.0</span></div>
              </div>
              <button className="about-more-btn" onClick={() => { onOpenApp?.('Settings'); setShowAbout(false); }}>
                {t('about_more_info')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCC && (
        <div className="cc-overlay" onClick={closeCC}>
          <div
            className={`cc-panel${ccClosing ? ' closing' : ''}`}
            ref={ccGlassRef}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleCCGlassMove}
            onMouseLeave={handleCCGlassLeave}
          >
            <svg style={{ display: 'none' }}>
              <filter id="cc-glass-dist">
                <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
                <feDisplacementMap ref={ccGlassDispRef} in="SourceGraphic" in2="noise" scale="77" />
              </filter>
            </svg>
            <div className="cc-glass-filter" />
            <div className="cc-glass-overlay" />
            <div className="cc-glass-specular" ref={ccGlassSpecRef} />
            <div className="cc-glass-content">
              <div className="cc-section cc-toggles">
                <div className="cc-toggle-grid">
                  <button className={`cc-toggle-btn${settings.wifi ? ' on' : ''}`} onClick={() => toggle('wifi')}>
                    <img src="/icons/wifi.png" alt="" className="cc-toggle-icon" />
                    <span>{t('cc_wifi')}</span>
                  </button>
                  <button className={`cc-toggle-btn${settings.bluetooth ? ' on' : ''}`} onClick={() => toggle('bluetooth')}>
                    <img src="/icons/bluetooth.png" alt="" className="cc-toggle-icon" />
                    <span>{t('cc_bluetooth')}</span>
                  </button>
                  <button className={`cc-toggle-btn cc-airplane${settings.airplane ? ' on' : ''}`} onClick={() => toggle('airplane')}>
                    <img src="/icons/flugmodus.png" alt="" className="cc-toggle-icon" />
                    <span>{t('cc_airplane')}</span>
                  </button>
                  <button className={`cc-toggle-btn cc-cellular${settings.cellular ? ' on' : ''}`} onClick={() => toggle('cellular')}>
                    <img src="/icons/mobile-Daten.png" alt="" className="cc-toggle-icon" />
                    <span>{t('cc_cellular')}</span>
                  </button>
                </div>
              </div>

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
                <div className="cc-music-progress" ref={progressRef} onMouseDown={onProgressDown}>
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

              <div className="cc-section cc-slider-section">
                <div className="cc-slider-label">
                  <img src="/icons/bright.png" alt="" className="cc-slider-icon" />
                  <span>{t('cc_brightness')}</span>
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

              <div className="cc-section cc-slider-section">
                <div className="cc-slider-label">
                  <img src="/icons/volume.png" alt="" className="cc-slider-icon" />
                  <span>{t('cc_volume')}</span>
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

              <div className="cc-section cc-extra-toggles">
                <button className={`cc-toggle-sm cc-lock${settings.lock ? ' on' : ''}`} onClick={() => toggle('lock')}>
                  <img src="/icons/lock.png" alt="" />
                  <span>{t('cc_lock')}</span>
                </button>
                <button className={`cc-toggle-sm${settings.mirror ? ' on' : ''}`} onClick={() => toggle('mirror')}>
                  <img src="/icons/airplay.png" alt="" />
                  <span>{t('cc_mirror')}</span>
                </button>
              </div>

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
        </div>
      )}

      {ctxMenu && (
        <div className="desktop-ctx-overlay" onClick={() => setCtxMenu(null)}>
          <div className="desktop-ctx" style={{ left: ctxMenu.x, top: ctxMenu.y }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setCtxMenu(null); }}>{t('ctx_new_folder')}</button>
            <div className="menu-divider" />
            <button onClick={() => { onOpenApp?.('Info'); setCtxMenu(null); }}>{t('ctx_info')}</button>
            <button onClick={() => { setCtxMenu(null); }}>{t('ctx_arrange')}</button>
            <button onClick={() => { setCtxMenu(null); }}>{t('ctx_change_wallpaper')}</button>
            <div className="menu-divider" />
            <button onClick={() => { setCtxMenu(null); }}>{t('ctx_paste')}</button>
          </div>
        </div>
      )}

      <audio ref={audioRef} preload="metadata" />
    </>
  );
}
