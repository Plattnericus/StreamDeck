// ─── Dock-Komponente ───
// der macOS-Dock am unteren Bildschirmrand
// verwaltet auch ALLE App-Fenster (öffnen, schließen, minimieren, maximieren, ziehen, skalieren)
// die größte und wichtigste Komponente der ganzen App
// zuständig für: Dock-Icons, Fensterverwaltung, Kontextmenüs, Glaseffekte und Animationen

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
import Contact from '../apps/Contact';
import Docker from '../apps/Docker';
import { openTab, getCenterPosition } from '../../lib/openTab';
import { useTranslation } from '../../i18n/LanguageContext';
import './Dock.css';

// Komponentennamen (Strings) auf echte React-Komponenten mappen
// brauchen wir um gepinnte Apps aus localStorage wiederherzustellen
// weil man React-Komponenten nicht als JSON speichern kann
const COMPONENT_MAP = {
  Finder, Apps, Settings, Browser, Terminal, Github, Papierkorb,
  About, Changelog, Galerie, Impressum, Agb, Info, Datenschutz, Model, CookiesInfo, Contact, Docker,
};

// localStorage-Key für gepinnte Dock-Apps
const DOCK_STORAGE_KEY = 'dock_pinned_apps_v1';

// Gepinnte Apps aus localStorage laden
function loadPinnedApps() {
  try {
    const raw = localStorage.getItem(DOCK_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { }
  return []; // nichts gespeichert oder Fehler
}

// Gepinnte Apps in localStorage speichern
// nur nicht-Standard-Apps werden gespeichert (die der Nutzer selbst hinzugefügt hat)
function savePinnedApps(apps) {
  const pinned = apps
    .filter((a) => !a.default) // Standard-Apps überspringen, die sind immer da
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

// Apps die immer im Dock sind — mit Standardgröße, Position und Komponente
const defaultApps = [
  { id: 1, name: 'Finder', icon: '/icons/finder.webp', open: false, minimized: false, maximized: false, component: Finder, default: true, x: 0, y: 0, width: 640, height: 400, zIndex: 0 },
  { id: 2, name: 'App Store', icon: '/icons/app-store.webp', open: false, minimized: false, maximized: false, component: Apps, default: true, x: 0, y: 0, width: 720, height: 480, zIndex: 0 },
  { id: 3, name: 'Settings', icon: '/icons/settings.webp', open: false, minimized: false, maximized: false, component: Settings, default: true, x: 0, y: 0, width: 460, height: 680, zIndex: 0 },
  { id: 4, name: 'Safari', icon: '/icons/safari.webp', open: false, minimized: false, maximized: false, component: Browser, default: true, x: 0, y: 0, width: 800, height: 500, zIndex: 0 },
  { id: 5, name: 'Terminal', icon: '/icons/terminal.webp', open: false, minimized: false, maximized: false, component: Terminal, default: true, x: 0, y: 0, width: 860, height: 480, zIndex: 0 },
  { id: 6, name: 'Github', icon: '/icons/github.webp', open: false, minimized: false, maximized: false, component: Github, default: true, x: 0, y: 0, width: 920, height: 600, zIndex: 0 },
  { id: 10, name: 'Trash', icon: '/icons/trash.webp', open: false, minimized: false, maximized: false, component: Papierkorb, default: true, x: 0, y: 0, width: 560, height: 360, zIndex: 0 },
];

// Standard-Apps mit gepinnten Apps zusammenbauen
function buildInitialApps() {
  const pinned = loadPinnedApps();
  const base = defaultApps.map((a) => ({ ...a })); // Kopie damit wir das Original nicht ändern

  // gepinnte Apps nach Terminal einfügen
  const terminalIdx = base.findIndex((a) => a.id === 5);
  const insertIdx = terminalIdx !== -1 ? terminalIdx + 1 : base.length - 1;

  // gepinnte Apps mit ihren Komponenten wiederherstellen
  const restoredApps = pinned
    .filter((p) => !base.some((b) => b.id === p.id)) // überspringen wenn schon in Standard-Apps
    .map((p) => ({
      id: p.id,
      name: p.name,
      icon: p.icon,
      component: COMPONENT_MAP[p.componentName] || null, // React-Komponente nachschlagen
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
    .filter((a) => a.component); // nur Apps behalten wo wir die Komponente gefunden haben

  // wiederhergestellte Apps an der richtigen Position einfügen
  base.splice(insertIdx, 0, ...restoredApps);
  return base;
}

export default function Dock({ onOpenApp }) {
  const t = useTranslation();

  // State für Fenster und Dock-Verwaltung
  const [apps, setApps] = useState(() => buildInitialApps());
  const [contextMenu, setContextMenu] = useState(null); // Rechtsklick-Menü auf Dock-Icons
  const [headerHeight] = useState(28); // Höhe der Menüleiste oben
  const [dockMouseX, setDockMouseX] = useState(null); // Maus-X für den Vergrößerungseffekt
  const nextZIndex = useRef(10); // Zähler für die Fenster-Stapelreihenfolge

  // Animationsstatus-Tracker
  const [enteringIds, setEnteringIds] = useState(new Set()); // Icons die gerade hinzukommen
  const [draggingIds, setDraggingIds] = useState(new Set()); // Fenster die gerade gezogen werden
  const [minimizingIds, setMinimizingIds] = useState(new Set()); // Fenster die minimiert werden
  const [restoringIds, setRestoringIds] = useState(new Set()); // Fenster die wiederhergestellt werden

  // gepinnte Apps speichern wenn sich die Liste ändert
  useEffect(() => {
    savePinnedApps(apps);
  }, [apps]);

  // Refs für den Glaseffekt am Dock
  const glassCardRef = useRef(null);
  const glassSpecularRef = useRef(null);

  // glänzender Glaseffekt der der Maus folgt — radialer Gradient wo der Cursor ist
  const handleGlassMouseMove = useCallback((e) => {
    const card = glassCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // SVG-Displacement-Filter für die Glasverzerrung aktualisieren
    const displace = document.querySelector('#glass-distortion feDisplacementMap');
    if (displace) {
      const scaleX = (x / rect.width) * 100;
      const scaleY = (y / rect.height) * 100;
      displace.setAttribute('scale', Math.min(scaleX, scaleY));
    }

    // Glanzlicht der Maus folgen lassen
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

  // Glaseffekt zurücksetzen wenn die Maus den Dock verlässt
  const handleGlassMouseLeave = useCallback(() => {
    const displace = document.querySelector('#glass-distortion feDisplacementMap');
    if (displace) displace.setAttribute('scale', '77');

    const spec = glassSpecularRef.current;
    if (spec) spec.style.background = 'none';
  }, []);

  // welches Fenster gerade ganz oben liegt (höchster zIndex)
  // damit wir das fokussierte Fenster anders stylen können
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

  // Refs für Fenster-Ziehen und -Skalieren
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  // Mausbewegung für Ziehen und Größenänderung verarbeiten
  const handleMouseMove = useCallback((e) => {
    // Fenster ziehen
    if (dragRef.current) {
      const { appId, startX, startY, origX, origY } = dragRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setApps((prev) =>
        prev.map((app) => {
          if (app.id !== appId) return app;
          const minVisible = 100; // mindestens 100px sichtbar damit das Fenster nicht verschwindet
          const newX = Math.max(-(app.width - minVisible), Math.min(window.innerWidth - minVisible, origX + dx));
          const newY = Math.max(headerHeight, Math.min(window.innerHeight - 50, origY + dy));
          return { ...app, x: newX, y: newY };
        })
      );
    }

    // Fenstergröße ändern
    if (resizeRef.current) {
      const { appId, startX, startY, origW, origH } = resizeRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setApps((prev) =>
        prev.map((app) =>
          app.id === appId
            ? { ...app, width: Math.max(200, origW + dx), height: Math.max(150, origH + dy) } // Mindestgröße 200x150
            : app
        )
      );
    }
  }, [headerHeight]);

  // Ziehen oder Skalieren beenden wenn Maustaste losgelassen wird
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

  // Mausbewegung und -loslassen global hören
  // damit Ziehen auch funktioniert wenn die Maus den Fensterbereich verlässt
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Kontextmenü schließen wenn irgendwo geklickt wird
  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => setContextMenu(null);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [contextMenu]);



  // Fenster in den Vordergrund bringen durch höchsten zIndex
  const focusApp = useCallback((id) => {
    nextZIndex.current += 1;
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, zIndex: nextZIndex.current } : app
      )
    );
  }, []);

  // App-Fenster öffnen und zentrieren
  const openApp = useCallback(
    (id) => {
      nextZIndex.current += 1;
      setApps((prev) =>
        prev.map((app) => {
          if (app.id !== id) return app;
          // openTab-Helfer berechnet die zentrierte Position
          const opened = openTab({ ...app }, window.innerWidth, window.innerHeight);
          opened.zIndex = nextZIndex.current;
          return opened;
        })
      );
      // Parent-Komponente informieren dass eine App geöffnet wurde
      if (onOpenApp) {
        const app = apps.find((a) => a.id === id);
        if (app) onOpenApp(app);
      }
    },
    [apps, onOpenApp]
  );

  // Fenster schließen und State zurücksetzen
  const closeApp = useCallback((id) => {
    // Animationsstatus aufräumen
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

  // Fenster minimieren (mit Animation) oder wiederherstellen
  const toggleMinimize = useCallback((id) => {
    setApps((prev) => {
      const app = prev.find((a) => a.id === id);
      if (!app) return prev;

      if (!app.minimized) {
        // Minimier-Animation starten, nach 350ms wirklich minimieren
        setMinimizingIds((s) => new Set(s).add(id));
        setTimeout(() => {
          setMinimizingIds((s) => { const n = new Set(s); n.delete(id); return n; });
          setApps((p) => p.map((a) => a.id === id ? { ...a, minimized: true } : a));
        }, 350);
        return prev;
      } else {
        // mit Animation aus der Minimierung wiederherstellen
        setRestoringIds((s) => new Set(s).add(id));
        setTimeout(() => {
          setRestoringIds((s) => { const n = new Set(s); n.delete(id); return n; });
        }, 350);
        return prev.map((a) => a.id === id ? { ...a, minimized: false } : a);
      }
    });
  }, []);

  // Vollbild ein/aus — Fenster füllt den ganzen Bildschirm oder geht zurück zur normalen Größe
  const toggleMaximize = useCallback((id) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, maximized: !app.maximized } : app
      )
    );
  }, []);

  // App vom App Store oder einer anderen Komponente öffnen
  // kümmert sich auch darum neue Apps ans Dock zu pinnen
  const handleOpenApp = useCallback(
    (appOrName) => {
      // wenn nur ein Name als String, existierende App suchen und öffnen
      if (typeof appOrName === 'string') {
        const existing = apps.find(
          (a) => a.name.toLowerCase() === appOrName.toLowerCase()
        );
        if (existing) openApp(existing.id);
        return;
      }

      const appData = appOrName;
      const pinOnly = !!appData.pinOnly; // manchmal nur pinnen ohne zu öffnen

      // prüfen ob die App schon im Dock ist
      const existing = apps.find((a) => a.id === appData.id);
      if (existing) {
        if (!pinOnly) openApp(existing.id);
      } else {
        // neue App — ans Dock hinzufügen
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

        // Eintritts-Animation für das neue Dock-Icon abspielen
        setEnteringIds((prev) => new Set(prev).add(newApp.id));
        setTimeout(() => {
          setEnteringIds((prev) => { const s = new Set(prev); s.delete(newApp.id); return s; });
        }, 500);

        // neue App nach Terminal in den Dock einfügen
        setApps((prev) => {
          const copy = [...prev];
          const termIdx = copy.findIndex((a) => a.id === 5);
          const insertIdx = termIdx !== -1 ? termIdx + 1 : copy.length - 1;
          if (copy.some((a) => a.id === newApp.id)) return prev; // schon drin
          copy.splice(insertIdx, 0, newApp);
          return copy;
        });

        // Fenster öffnen nach dem Hinzufügen zum Dock (außer nur pinnen)
        if (!pinOnly) setTimeout(() => openApp(appData.id), 0);
      }
    },
    [apps, openApp]
  );

  // Kontextmenü bei Rechtsklick auf ein Dock-Icon zeigen
  const handleDockContextMenu = useCallback((e, appId) => {
    e.preventDefault();
    setContextMenu({ appId, x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Aktionen aus dem Kontextmenü ausführen (öffnen, schließen, minimieren, maximieren)
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

  // Fenster an der Titelleiste ziehen
  const startDrag = useCallback(
    (e, id) => {
      e.preventDefault();
      focusApp(id); // Fenster in den Vordergrund bringen
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

  // Fenster von der rechten unteren Ecke aus skalieren
  const startResize = useCallback(
    (e, id) => {
      e.preventDefault();
      e.stopPropagation(); // nicht gleichzeitig Ziehen auslösen
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

  // Dock sortieren damit Papierkorb immer das letzte Icon ist
  const withoutTrash = apps.filter((a) => a.id !== 10 && (a.default || !a.default));
  const trash = apps.filter((a) => a.id === 10);
  const sortedDockApps = [...withoutTrash, ...trash];

  return (
    <>
      {/* ── App-Fenster ── */}
      {/* alle offenen (und gerade minimierenden) Fenster rendern */}
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
              {/* Titelleiste — ziehen zum Bewegen, Doppelklick zum Maximieren */}
              <div
                className="title-bar"
                onMouseDown={(e) => !app.maximized && startDrag(e, app.id)}
                onDoubleClick={() => toggleMaximize(app.id)}
              >
                {/* Ampel-Buttons (schließen, minimieren, maximieren) */}
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

              {/* der eigentliche App-Inhalt */}
              <div className="window-content">
                <AppComponent onOpenApp={handleOpenApp} onClose={() => closeApp(app.id)} />
              </div>

              {/* Größenänderungs-Griff in der rechten unteren Ecke (nicht bei Vollbild) */}
              {!app.maximized && (
                <div
                  className="resizer"
                  onMouseDown={(e) => startResize(e, app.id)}
                />
              )}
            </div>
          );
        })}

      {/* ── SVG-Filter für den Glaseffekt ── */}
      {/* erzeugt die Glasverzerrung am Dock */}
      <svg style={{ display: 'none' }}>
        <filter id="glass-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>

      {/* ── Die Dock-Leiste ── */}
      {/* der eigentliche Dock-Container am unteren Bildschirmrand */}
      <div
        className="dock-container"
        onMouseMove={(e) => setDockMouseX(e.clientX)} // Maus tracken für den Vergrößerungseffekt
        onMouseLeave={() => setDockMouseX(null)}
      >
        {/* Glas-Hintergrund des Docks */}
        <div
          className="glass-card"
          ref={glassCardRef}
          onMouseMove={handleGlassMouseMove}
          onMouseLeave={handleGlassMouseLeave}
        >
          <div className="glass-filter" />
          <div className="glass-overlay" />
          <div className="glass-specular" ref={glassSpecularRef} />

          {/* die Dock-Icons */}
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

      {/* ── Rechtsklick-Kontextmenü ── */}
      {/* zeigt Optionen wie Öffnen, Schließen, Minimieren beim Rechtsklick auf ein Dock-Icon */}
      {contextMenu && (
        <div
          className="context-menu-overlay"
          onClick={closeContextMenu}
        >
          <div
            className="context-menu"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()} // nicht schließen wenn man ins Menü klickt
          >
            {(() => {
              const app = apps.find((a) => a.id === contextMenu.appId);
              if (!app) return null;
              return (
                <>
                  {/* "Öffnen" wenn die App zu ist */}
                  {!app.open && (
                    <button onClick={() => handleContextAction('open')}>{t('dock_open')}</button>
                  )}
                  {/* Schließen, Minimieren, Maximieren wenn die App offen ist */}
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
