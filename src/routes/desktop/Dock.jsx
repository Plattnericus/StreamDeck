// the dock at the bottom, handles all the window stuff too
import React, { useState, useEffect, useRef, useCallback } from 'react';
import DockItemMagnified from './DockItemMagnified';
import Settings from '../apps/settings/Settings';
import Browser from '../apps/Browser';
import Terminal from '../apps/Terminal';
import Finder from '../apps/Finder';
import Papierkorb from '../apps/Trash';
import Apps from '../apps/Apps';
import Github from '../apps/Github';
import About from '../apps/About';
import Changelog from '../apps/Changelog';
import Galerie from '../apps/Galerie';
import Impressum from '../apps/Impressum';
import Agb from '../apps/AGB';
import Info from '../apps/Info';
import TerminalApp from '../apps/Terminal';
import Datenschutz from '../apps/Datenschutz';
import Model from '../apps/Model';
import CookiesInfo from '../apps/Cookies-info';
import { openTab, getCenterPosition } from '../../lib/openTab';
import { useTranslation } from '../../i18n/LanguageContext';
import './Dock.css';

// string to component lookup for restoring pined apps
const COMPONENT_MAP = {
  Finder, Apps, Settings, Browser, Terminal, Github, Papierkorb,
  About, Changelog, Galerie, Impressum, Agb, Info, Datenschutz, Model, CookiesInfo,
};

const DOCK_STORAGE_KEY = 'dock_pinned_apps_v1';

// load saved dock apps
function loadPinnedApps() {
  try {
    const raw = localStorage.getItem(DOCK_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { }
  return [];
}

// save the user added apps
function savePinnedApps(apps) {
  const pinned = apps
    .filter((a) => !a.default)
    .map((a) => ({
      id: a.id,
      name: a.name,
      icon: a.icon,
      componentName: a.componentName || a.name,
      width: a.width,
      height: a.height,
    }));
  localStorage.setItem(DOCK_STORAGE_KEY, JSON.stringify(pinned));
}

const defaultApps = [
  { id: 1, name: 'Finder', icon: '/icons/finder.webp', open: false, minimized: false, maximized: false, component: Finder, default: true, x: 0, y: 0, width: 640, height: 400, zIndex: 0 },
  { id: 2, name: 'App Store', icon: '/icons/app-store.webp', open: false, minimized: false, maximized: false, component: Apps, default: true, x: 0, y: 0, width: 720, height: 480, zIndex: 0 },
  { id: 3, name: 'Settings', icon: '/icons/settings.webp', open: false, minimized: false, maximized: false, component: Settings, default: true, x: 0, y: 0, width: 460, height: 680, zIndex: 0 },
  { id: 4, name: 'Safari', icon: '/icons/safari.webp', open: false, minimized: false, maximized: false, component: Browser, default: true, x: 0, y: 0, width: 800, height: 500, zIndex: 0 },
  { id: 5, name: 'Terminal', icon: '/icons/terminal.webp', open: false, minimized: false, maximized: false, component: Terminal, default: true, x: 0, y: 0, width: 860, height: 480, zIndex: 0 },
  { id: 6, name: 'Github', icon: '/icons/github.webp', open: false, minimized: false, maximized: false, component: Github, default: true, x: 0, y: 0, width: 920, height: 600, zIndex: 0 },
  { id: 10, name: 'Trash', icon: '/icons/trash.webp', open: false, minimized: false, maximized: false, component: Papierkorb, default: true, x: 0, y: 0, width: 560, height: 360, zIndex: 0 },
];

// mix default apps with the ones user pined
function buildInitialApps() {
  const pinned = loadPinnedApps();
  const base = defaultApps.map((a) => ({ ...a }));

  const terminalIdx = base.findIndex((a) => a.id === 5);
  const insertIdx = terminalIdx !== -1 ? terminalIdx + 1 : base.length - 1;

  const restoredApps = pinned
    .filter((p) => !base.some((b) => b.id === p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      icon: p.icon,
      component: COMPONENT_MAP[p.componentName] || null,
      componentName: p.componentName,
      default: false,
      open: false,
      minimized: false,
      maximized: false,
      x: 0,
      y: 0,
      width: p.width || 640,
      height: p.height || 400,
      zIndex: 0,
    }))
    .filter((a) => a.component);

  base.splice(insertIdx, 0, ...restoredApps);
  return base;
}

export default function Dock({ onOpenApp }) {
  const t = useTranslation();
  const [apps, setApps] = useState(() => buildInitialApps());
  const [contextMenu, setContextMenu] = useState(null);
  const [headerHeight] = useState(28);
  const [dockMouseX, setDockMouseX] = useState(null);
  const nextZIndex = useRef(10);
  const [enteringIds, setEnteringIds] = useState(new Set());
  const [draggingIds, setDraggingIds] = useState(new Set());
  const [minimizingIds, setMinimizingIds] = useState(new Set());
  const [restoringIds, setRestoringIds] = useState(new Set());

  useEffect(() => {
    savePinnedApps(apps);
  }, [apps]);

  const glassCardRef = useRef(null);
  const glassSpecularRef = useRef(null);

  // shiny glass efect follows your mouse
  const handleGlassMouseMove = useCallback((e) => {
    const card = glassCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const displace = document.querySelector('#glass-distortion feDisplacementMap');
    if (displace) {
      const scaleX = (x / rect.width) * 100;
      const scaleY = (y / rect.height) * 100;
      displace.setAttribute('scale', Math.min(scaleX, scaleY));
    }

    const spec = glassSpecularRef.current;
    if (spec) {
      spec.style.background = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.15) 0%,
        rgba(255,255,255,0.05) 30%,
        rgba(255,255,255,0) 60%
      )`;
    }
  }, []);

  const handleGlassMouseLeave = useCallback(() => {
    const displace = document.querySelector('#glass-distortion feDisplacementMap');
    if (displace) displace.setAttribute('scale', '77');

    const spec = glassSpecularRef.current;
    if (spec) spec.style.background = 'none';
  }, []);

  // wich window is on top right now?
  const focusedId = (() => {
    let best = null;
    let bestZ = -Infinity;
    for (const app of apps) {
      if (app.open && !app.minimized && app.zIndex > bestZ) {
        bestZ = app.zIndex;
        best = app.id;
      }
    }
    return best;
  })();

  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  // drag and resize windows with mouse
  const handleMouseMove = useCallback((e) => {
    if (dragRef.current) {
      const { appId, startX, startY, origX, origY } = dragRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setApps((prev) =>
        prev.map((app) => {
          if (app.id !== appId) return app;
          const minVisible = 100; // dont let window escape the screen
          const newX = Math.max(-(app.width - minVisible), Math.min(window.innerWidth - minVisible, origX + dx));
          const newY = Math.max(headerHeight, Math.min(window.innerHeight - 50, origY + dy));
          return { ...app, x: newX, y: newY };
        })
      );
    }
    if (resizeRef.current) {
      const { appId, startX, startY, origW, origH } = resizeRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setApps((prev) =>
        prev.map((app) =>
          app.id === appId
            ? { ...app, width: Math.max(200, origW + dx), height: Math.max(150, origH + dy) }
            : app
        )
      );
    }
  }, [headerHeight]);

  const handleMouseUp = useCallback(() => {
    if (dragRef.current) {
      const id = dragRef.current.appId;
      setDraggingIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
    }
    if (resizeRef.current) {
      const id = resizeRef.current.appId;
      setDraggingIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
    }
    dragRef.current = null;
    resizeRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => setContextMenu(null);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [contextMenu]);



  const focusApp = useCallback((id) => {
    nextZIndex.current += 1;
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, zIndex: nextZIndex.current } : app
      )
    );
  }, []);

  const openApp = useCallback(
    (id) => {
      nextZIndex.current += 1;
      setApps((prev) =>
        prev.map((app) => {
          if (app.id !== id) return app;
          const opened = openTab({ ...app }, window.innerWidth, window.innerHeight);
          opened.zIndex = nextZIndex.current;
          return opened;
        })
      );
      if (onOpenApp) {
        const app = apps.find((a) => a.id === id);
        if (app) onOpenApp(app);
      }
    },
    [apps, onOpenApp]
  );

  const closeApp = useCallback((id) => {
    setMinimizingIds((s) => { const n = new Set(s); n.delete(id); return n; });
    setRestoringIds((s) => { const n = new Set(s); n.delete(id); return n; });
    setApps((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, open: false, minimized: false, maximized: false }
          : app
      )
    );
  }, []);

  // minimize or bring back with a litle animation
  const toggleMinimize = useCallback((id) => {
    setApps((prev) => {
      const app = prev.find((a) => a.id === id);
      if (!app) return prev;

      if (!app.minimized) {
        setMinimizingIds((s) => new Set(s).add(id));
        setTimeout(() => {
          setMinimizingIds((s) => { const n = new Set(s); n.delete(id); return n; });
          setApps((p) => p.map((a) => a.id === id ? { ...a, minimized: true } : a));
        }, 350);
        return prev;
      } else {
        setRestoringIds((s) => new Set(s).add(id));
        setTimeout(() => {
          setRestoringIds((s) => { const n = new Set(s); n.delete(id); return n; });
        }, 350);
        return prev.map((a) => a.id === id ? { ...a, minimized: false } : a);
      }
    });
  }, []);

  const toggleMaximize = useCallback((id) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, maximized: !app.maximized } : app
      )
    );
  }, []);

  // open an app, also pins new ones to the dock
  const handleOpenApp = useCallback(
    (appOrName) => {
      if (typeof appOrName === 'string') {
        const existing = apps.find(
          (a) => a.name.toLowerCase() === appOrName.toLowerCase()
        );
        if (existing) openApp(existing.id);
        return;
      }

      const appData = appOrName;
      const pinOnly = !!appData.pinOnly;
      const existing = apps.find((a) => a.id === appData.id);
      if (existing) {
        if (!pinOnly) openApp(existing.id);
      } else {
        const componentName = Object.keys(COMPONENT_MAP).find(
          (k) => COMPONENT_MAP[k] === appData.component
        ) || appData.name;

        nextZIndex.current += 1;
        const newApp = {
          id: appData.id,
          name: appData.name,
          icon: appData.icon,
          component: appData.component,
          componentName,
          default: false,
          open: false,
          minimized: false,
          maximized: false,
          x: 0,
          y: 0,
          width: appData.width || 640,
          height: appData.height || 400,
          zIndex: 0,
        };
        setEnteringIds((prev) => new Set(prev).add(newApp.id));
        setTimeout(() => {
          setEnteringIds((prev) => { const s = new Set(prev); s.delete(newApp.id); return s; });
        }, 500);

        setApps((prev) => {
          const copy = [...prev];
          const termIdx = copy.findIndex((a) => a.id === 5);
          const insertIdx = termIdx !== -1 ? termIdx + 1 : copy.length - 1;
          if (copy.some((a) => a.id === newApp.id)) return prev;
          copy.splice(insertIdx, 0, newApp);
          return copy;
        });
        if (!pinOnly) setTimeout(() => openApp(appData.id), 0);
      }
    },
    [apps, openApp]
  );

  const handleDockContextMenu = useCallback((e, appId) => {
    e.preventDefault();
    setContextMenu({ appId, x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleContextAction = useCallback(
    (action) => {
      if (!contextMenu) return;
      const { appId } = contextMenu;
      switch (action) {
        case 'open':
          openApp(appId);
          break;
        case 'close':
          closeApp(appId);
          break;
        case 'minimize':
          toggleMinimize(appId);
          break;
        case 'maximize':
          toggleMaximize(appId);
          break;
        default:
          break;
      }
      closeContextMenu();
    },
    [contextMenu, openApp, closeApp, toggleMinimize, toggleMaximize, closeContextMenu]
  );

  const startDrag = useCallback(
    (e, id) => {
      e.preventDefault();
      focusApp(id);
      const app = apps.find((a) => a.id === id);
      if (!app) return;
      setDraggingIds((prev) => new Set(prev).add(id));
      dragRef.current = {
        appId: id,
        startX: e.clientX,
        startY: e.clientY,
        origX: app.x,
        origY: app.y,
      };
    },
    [apps, focusApp]
  );

  const startResize = useCallback(
    (e, id) => {
      e.preventDefault();
      e.stopPropagation();
      focusApp(id);
      const app = apps.find((a) => a.id === id);
      if (!app) return;
      setDraggingIds((prev) => new Set(prev).add(id));
      resizeRef.current = {
        appId: id,
        startX: e.clientX,
        startY: e.clientY,
        origW: app.width,
        origH: app.height,
      };
    },
    [apps, focusApp]
  );

  // trash always goes last in the dock
  const withoutTrash = apps.filter((a) => a.id !== 10 && (a.default || !a.default));
  const trash = apps.filter((a) => a.id === 10);
  const sortedDockApps = [...withoutTrash, ...trash];

  return (
    <>
      
      {apps
        .filter((app) => app.open && (!app.minimized || minimizingIds.has(app.id)))
        .map((app) => {
          const isFocused = app.id === focusedId;
          const isMinimizing = minimizingIds.has(app.id);
          const isRestoring = restoringIds.has(app.id);
          const AppComponent = app.component;
          return (
            <div
              key={app.id}
              className={`app-window${app.maximized ? ' maximized' : ''}${isFocused ? ' focused' : ''}${draggingIds.has(app.id) ? ' no-transition' : ''}${isMinimizing ? ' minimizing' : ''}${isRestoring ? ' restoring' : ''}`}
              style={
                app.maximized
                  ? { left: 0, top: headerHeight, width: window.innerWidth, height: window.innerHeight - headerHeight - 85, zIndex: app.zIndex }
                  : { left: app.x, top: app.y, width: app.width, height: app.height, zIndex: app.zIndex }
              }
              onMouseDown={() => focusApp(app.id)}
            >
              <div
                className="title-bar"
                onMouseDown={(e) => !app.maximized && startDrag(e, app.id)}
                onDoubleClick={() => toggleMaximize(app.id)}
              >
                <div className="controls">
                  <button
                    className="ctrl close"
                    onClick={() => closeApp(app.id)}
                    aria-label="Close"
                  />
                  <button
                    className="ctrl minimize"
                    onClick={() => toggleMinimize(app.id)}
                    aria-label="Minimize"
                  />
                  <button
                    className="ctrl maximize"
                    onClick={() => toggleMaximize(app.id)}
                    aria-label="Maximize"
                  />
                </div>
                <span className="title-text">{app.name}</span>
              </div>
              <div className="window-content">
                <AppComponent onOpenApp={handleOpenApp} onClose={() => closeApp(app.id)} />
              </div>
              {!app.maximized && (
                <div
                  className="resizer"
                  onMouseDown={(e) => startResize(e, app.id)}
                />
              )}
            </div>
          );
        })}

      
      <svg style={{ display: 'none' }}>
        <filter id="glass-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>

      
      <div
        className="dock-container"
        onMouseMove={(e) => setDockMouseX(e.clientX)}
        onMouseLeave={() => setDockMouseX(null)}
      >
        <div
          className="glass-card"
          ref={glassCardRef}
          onMouseMove={handleGlassMouseMove}
          onMouseLeave={handleGlassMouseLeave}
        >
          <div className="glass-filter" />
          <div className="glass-overlay" />
          <div className="glass-specular" ref={glassSpecularRef} />
          <div className="glass-content">
            {sortedDockApps.map((app) => (
              <DockItemMagnified
                key={app.id}
                app_id={app.id}
                name={app.name}
                icon={app.icon}
                is_open={app.open}
                entering={enteringIds.has(app.id)}
                mouse_x={dockMouseX}
                onClick={() => (app.open ? (app.minimized ? toggleMinimize(app.id) : focusApp(app.id)) : openApp(app.id))}
                onContextMenu={(e) => handleDockContextMenu(e, app.id)}
              />
            ))}
          </div>
        </div>
      </div>

      
      {contextMenu && (
        <div
          className="context-menu-overlay"
          onClick={closeContextMenu}
        >
          <div
            className="context-menu"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const app = apps.find((a) => a.id === contextMenu.appId);
              if (!app) return null;
              return (
                <>
                  {!app.open && (
                    <button onClick={() => handleContextAction('open')}>{t('dock_open')}</button>
                  )}
                  {app.open && (
                    <>
                      <button onClick={() => handleContextAction('close')}>{t('dock_close')}</button>
                      <button onClick={() => handleContextAction('minimize')}>
                        {app.minimized ? t('dock_show') : t('dock_minimize')}
                      </button>
                      <button onClick={() => handleContextAction('maximize')}>
                        {app.maximized ? t('dock_restore') : t('dock_maximize')}
                      </button>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
