// ─── Dock Component ───
// this is the macOS-style dock at the bottom of the screen
// it also manages ALL the app windows (open, close, minimize, maximize, drag, resize)
// basically the biggest and most important component in the whole app
// it handles: dock icons, window management, context menus, glass effects, and animations

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

// this maps component names (strings) to actual React components
// we need this to restore pinned apps from localStorage
// because you cant save React components as JSON
const COMPONENT_MAP = {
  Finder, Apps, Settings, Browser, Terminal, Github, Papierkorb,
  About, Changelog, Galerie, Impressum, Agb, Info, Datenschutz, Model, CookiesInfo,
};

// the key for saving pinned dock apps in localStorage
const DOCK_STORAGE_KEY = 'dock_pinned_apps_v1';

// load the user's pinned apps from localStorage
function loadPinnedApps() {
  try {
    const raw = localStorage.getItem(DOCK_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { }
  return []; // nothing saved or error — return empty list
}

// save the user's pinned apps to localStorage
// we only save non-default apps (the ones the user added themselves)
function savePinnedApps(apps) {
  const pinned = apps
    .filter((a) => !a.default) // skip default apps, they are always there
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

// these are the apps that always show up in the dock
// each one has a default size, position, and the component to render
const defaultApps = [
  { id: 1, name: 'Finder', icon: '/icons/finder.webp', open: false, minimized: false, maximized: false, component: Finder, default: true, x: 0, y: 0, width: 640, height: 400, zIndex: 0 },
  { id: 2, name: 'App Store', icon: '/icons/app-store.webp', open: false, minimized: false, maximized: false, component: Apps, default: true, x: 0, y: 0, width: 720, height: 480, zIndex: 0 },
  { id: 3, name: 'Settings', icon: '/icons/settings.webp', open: false, minimized: false, maximized: false, component: Settings, default: true, x: 0, y: 0, width: 460, height: 680, zIndex: 0 },
  { id: 4, name: 'Safari', icon: '/icons/safari.webp', open: false, minimized: false, maximized: false, component: Browser, default: true, x: 0, y: 0, width: 800, height: 500, zIndex: 0 },
  { id: 5, name: 'Terminal', icon: '/icons/terminal.webp', open: false, minimized: false, maximized: false, component: Terminal, default: true, x: 0, y: 0, width: 860, height: 480, zIndex: 0 },
  { id: 6, name: 'Github', icon: '/icons/github.webp', open: false, minimized: false, maximized: false, component: Github, default: true, x: 0, y: 0, width: 920, height: 600, zIndex: 0 },
  { id: 10, name: 'Trash', icon: '/icons/trash.webp', open: false, minimized: false, maximized: false, component: Papierkorb, default: true, x: 0, y: 0, width: 560, height: 360, zIndex: 0 },
];

// combine default apps with user-pinned apps to build the full dock
function buildInitialApps() {
  const pinned = loadPinnedApps();
  const base = defaultApps.map((a) => ({ ...a })); // make a copy so we dont change the original

  // insert pinned apps after Terminal in the dock order
  const terminalIdx = base.findIndex((a) => a.id === 5);
  const insertIdx = terminalIdx !== -1 ? terminalIdx + 1 : base.length - 1;

  // restore pinned apps with their components
  const restoredApps = pinned
    .filter((p) => !base.some((b) => b.id === p.id)) // skip if already in default apps
    .map((p) => ({
      id: p.id,
      name: p.name,
      icon: p.icon,
      component: COMPONENT_MAP[p.componentName] || null, // look up the React component
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
    .filter((a) => a.component); // only keep apps where we found the component

  // put restored apps in the right position
  base.splice(insertIdx, 0, ...restoredApps);
  return base;
}

export default function Dock({ onOpenApp }) {
  const t = useTranslation();

  // all the state we need to manage windows and the dock
  const [apps, setApps] = useState(() => buildInitialApps());
  const [contextMenu, setContextMenu] = useState(null); // right-click menu on dock icons
  const [headerHeight] = useState(28); // height of the menu bar at the top
  const [dockMouseX, setDockMouseX] = useState(null); // mouse X position for magnification effect
  const nextZIndex = useRef(10); // counter for window stacking order

  // animation state trackers
  const [enteringIds, setEnteringIds] = useState(new Set()); // apps being added to dock with animation
  const [draggingIds, setDraggingIds] = useState(new Set()); // windows currently being dragged
  const [minimizingIds, setMinimizingIds] = useState(new Set()); // windows being minimized
  const [restoringIds, setRestoringIds] = useState(new Set()); // windows being restored from minimized

  // save pinned apps whenever the app list changes
  useEffect(() => {
    savePinnedApps(apps);
  }, [apps]);

  // refs for the glass effect on the dock
  const glassCardRef = useRef(null);
  const glassSpecularRef = useRef(null);

  // the shiny glass effect that follows your mouse on the dock
  // it creates a radial gradient highlight where the cursor is
  const handleGlassMouseMove = useCallback((e) => {
    const card = glassCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // update the SVG displacement filter for the glass distortion
    const displace = document.querySelector('#glass-distortion feDisplacementMap');
    if (displace) {
      const scaleX = (x / rect.width) * 100;
      const scaleY = (y / rect.height) * 100;
      displace.setAttribute('scale', Math.min(scaleX, scaleY));
    }

    // update the specular highlight to follow the mouse
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

  // reset the glass effect when the mouse leaves
  const handleGlassMouseLeave = useCallback(() => {
    const displace = document.querySelector('#glass-distortion feDisplacementMap');
    if (displace) displace.setAttribute('scale', '77');

    const spec = glassSpecularRef.current;
    if (spec) spec.style.background = 'none';
  }, []);

  // figure out which window is currently on top (highest zIndex)
  // we use this to style the focused window differently
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

  // refs for tracking window drag and resize operations
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  // handle mouse movement for dragging and resizing windows
  const handleMouseMove = useCallback((e) => {
    // window dragging
    if (dragRef.current) {
      const { appId, startX, startY, origX, origY } = dragRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setApps((prev) =>
        prev.map((app) => {
          if (app.id !== appId) return app;
          const minVisible = 100; // keep at least 100px visible so the window cant disappear
          const newX = Math.max(-(app.width - minVisible), Math.min(window.innerWidth - minVisible, origX + dx));
          const newY = Math.max(headerHeight, Math.min(window.innerHeight - 50, origY + dy));
          return { ...app, x: newX, y: newY };
        })
      );
    }

    // window resizing
    if (resizeRef.current) {
      const { appId, startX, startY, origW, origH } = resizeRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setApps((prev) =>
        prev.map((app) =>
          app.id === appId
            ? { ...app, width: Math.max(200, origW + dx), height: Math.max(150, origH + dy) } // minimum size 200x150
            : app
        )
      );
    }
  }, [headerHeight]);

  // stop dragging or resizing when mouse button is released
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

  // listen for mouse move and mouse up globally
  // we do this on the window so dragging works even if the mouse leaves the window area
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // close the context menu when clicking anywhere
  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => setContextMenu(null);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [contextMenu]);



  // bring a window to the front by giving it the highest zIndex
  const focusApp = useCallback((id) => {
    nextZIndex.current += 1;
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, zIndex: nextZIndex.current } : app
      )
    );
  }, []);

  // open an app window and center it on screen
  const openApp = useCallback(
    (id) => {
      nextZIndex.current += 1;
      setApps((prev) =>
        prev.map((app) => {
          if (app.id !== id) return app;
          // use the openTab helper to calculate the centered position
          const opened = openTab({ ...app }, window.innerWidth, window.innerHeight);
          opened.zIndex = nextZIndex.current;
          return opened;
        })
      );
      // notify parent component that an app was opened
      if (onOpenApp) {
        const app = apps.find((a) => a.id === id);
        if (app) onOpenApp(app);
      }
    },
    [apps, onOpenApp]
  );

  // close a window and reset its state
  const closeApp = useCallback((id) => {
    // clean up any animation states
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

  // minimize a window (with animation) or restore it
  const toggleMinimize = useCallback((id) => {
    setApps((prev) => {
      const app = prev.find((a) => a.id === id);
      if (!app) return prev;

      if (!app.minimized) {
        // start the minimize animation, then actually minimize after 350ms
        setMinimizingIds((s) => new Set(s).add(id));
        setTimeout(() => {
          setMinimizingIds((s) => { const n = new Set(s); n.delete(id); return n; });
          setApps((p) => p.map((a) => a.id === id ? { ...a, minimized: true } : a));
        }, 350);
        return prev;
      } else {
        // restore from minimized with animation
        setRestoringIds((s) => new Set(s).add(id));
        setTimeout(() => {
          setRestoringIds((s) => { const n = new Set(s); n.delete(id); return n; });
        }, 350);
        return prev.map((a) => a.id === id ? { ...a, minimized: false } : a);
      }
    });
  }, []);

  // toggle maximize — window fills the whole screen or goes back to normal
  const toggleMaximize = useCallback((id) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, maximized: !app.maximized } : app
      )
    );
  }, []);

  // open an app from the App Store or another component
  // also handles pinning new apps to the dock
  const handleOpenApp = useCallback(
    (appOrName) => {
      // if just a name string, find and open the existing app
      if (typeof appOrName === 'string') {
        const existing = apps.find(
          (a) => a.name.toLowerCase() === appOrName.toLowerCase()
        );
        if (existing) openApp(existing.id);
        return;
      }

      const appData = appOrName;
      const pinOnly = !!appData.pinOnly; // sometimes we just want to pin without opening

      // check if this app is already in the dock
      const existing = apps.find((a) => a.id === appData.id);
      if (existing) {
        if (!pinOnly) openApp(existing.id);
      } else {
        // new app — add it to the dock
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

        // play the entering animation for the new dock icon
        setEnteringIds((prev) => new Set(prev).add(newApp.id));
        setTimeout(() => {
          setEnteringIds((prev) => { const s = new Set(prev); s.delete(newApp.id); return s; });
        }, 500);

        // insert the new app after Terminal in the dock order
        setApps((prev) => {
          const copy = [...prev];
          const termIdx = copy.findIndex((a) => a.id === 5);
          const insertIdx = termIdx !== -1 ? termIdx + 1 : copy.length - 1;
          if (copy.some((a) => a.id === newApp.id)) return prev; // already there
          copy.splice(insertIdx, 0, newApp);
          return copy;
        });

        // open the window after adding to dock (unless its pin-only)
        if (!pinOnly) setTimeout(() => openApp(appData.id), 0);
      }
    },
    [apps, openApp]
  );

  // show context menu when right-clicking a dock icon
  const handleDockContextMenu = useCallback((e, appId) => {
    e.preventDefault();
    setContextMenu({ appId, x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // handle actions from the context menu (open, close, minimize, maximize)
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

  // start dragging a window by its title bar
  const startDrag = useCallback(
    (e, id) => {
      e.preventDefault();
      focusApp(id); // bring window to front
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

  // start resizing a window from its bottom-right corner
  const startResize = useCallback(
    (e, id) => {
      e.preventDefault();
      e.stopPropagation(); // dont trigger drag at the same time
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

  // sort the dock so trash is always the last icon
  const withoutTrash = apps.filter((a) => a.id !== 10 && (a.default || !a.default));
  const trash = apps.filter((a) => a.id === 10);
  const sortedDockApps = [...withoutTrash, ...trash];

  return (
    <>
      {/* ── App Windows ── */}
      {/* render all open (and minimizing) windows */}
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
              {/* window title bar — drag to move, double-click to maximize */}
              <div
                className="title-bar"
                onMouseDown={(e) => !app.maximized && startDrag(e, app.id)}
                onDoubleClick={() => toggleMaximize(app.id)}
              >
                {/* traffic light buttons (close, minimize, maximize) */}
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

              {/* the actual app content goes here */}
              <div className="window-content">
                <AppComponent onOpenApp={handleOpenApp} onClose={() => closeApp(app.id)} />
              </div>

              {/* resize handle in the bottom-right corner (not shown when maximized) */}
              {!app.maximized && (
                <div
                  className="resizer"
                  onMouseDown={(e) => startResize(e, app.id)}
                />
              )}
            </div>
          );
        })}

      {/* ── SVG Filter for Glass Effect ── */}
      {/* this creates the glass distortion effect on the dock */}
      <svg style={{ display: 'none' }}>
        <filter id="glass-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>

      {/* ── The Dock Bar ── */}
      {/* the actual dock container at the bottom of the screen */}
      <div
        className="dock-container"
        onMouseMove={(e) => setDockMouseX(e.clientX)} // track mouse for magnification
        onMouseLeave={() => setDockMouseX(null)}
      >
        {/* glass card background for the dock */}
        <div
          className="glass-card"
          ref={glassCardRef}
          onMouseMove={handleGlassMouseMove}
          onMouseLeave={handleGlassMouseLeave}
        >
          <div className="glass-filter" />
          <div className="glass-overlay" />
          <div className="glass-specular" ref={glassSpecularRef} />

          {/* the dock icons */}
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

      {/* ── Right-Click Context Menu ── */}
      {/* shows options like Open, Close, Minimize when right-clicking a dock icon */}
      {contextMenu && (
        <div
          className="context-menu-overlay"
          onClick={closeContextMenu}
        >
          <div
            className="context-menu"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()} // dont close when clicking inside the menu
          >
            {(() => {
              const app = apps.find((a) => a.id === contextMenu.appId);
              if (!app) return null;
              return (
                <>
                  {/* show "Open" if the app is closed */}
                  {!app.open && (
                    <button onClick={() => handleContextAction('open')}>{t('dock_open')}</button>
                  )}
                  {/* show Close, Minimize, Maximize if the app is open */}
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
