// ─── Dock-Icon mit Vergrößerungseffekt ───
// ein einzelnes Icon im Dock
// wird größer wenn die Maus nah dran ist — genau wie beim echten macOS Dock
// nutzt popmotion für weiche Interpolation zwischen den Größen

import React, { useRef, useEffect, useCallback } from 'react';
import { interpolate } from 'popmotion';
import './DockItemMagnified.css';

// normale Icon-Größe in Pixeln
const baseWidth = 79;

// wie weit der Vergrößerungseffekt reicht (in Pixeln vom Icon-Mittelpunkt)
const distanceLimit = baseWidth * 6;

// Eingabe: Abstand der Maus zum Icon-Mittelpunkt
// je näher die Maus, desto größer das Icon
const distanceInput = [
  -distanceLimit,        // ganz links
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,                     // direkt auf dem Icon — maximale Größe
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,         // ganz rechts
];

// Ausgabe: Icon-Breite bei jedem Abstand
// bei Abstand 0 ist das Icon 1,9x so groß
const widthOutput = [
  baseWidth,
  baseWidth * 1.1,
  baseWidth * 1.414,
  baseWidth * 1.9,       // maximale Vergrößerung
  baseWidth * 1.414,
  baseWidth * 1.1,
  baseWidth,
];

// glatte Funktion die Abstand -> Icon-Breite mappt
const sizeInterp = interpolate(distanceInput, widthOutput);

export default function DockItemMagnified({
  app_id,
  name,
  icon,
  is_open,
  entering,     // true when the icon is being added with animation
  mouse_x,      // current mouse X position (null when mouse is not on dock)
  onClick,
  onContextMenu,
}) {
  const elRef = useRef(null);      // Ref zum Icon-DOM-Element
  const curRef = useRef(baseWidth); // aktuelle animierte Größe
  const tgtRef = useRef(baseWidth); // Zielgröße zu der wir animieren
  const rafRef = useRef(null);      // requestAnimationFrame-Handle

  // wenn Maus sich bewegt, neue Zielgröße anhand des Abstands berechnen
  useEffect(() => {
    if (mouse_x === null) {
      // Maus hat den Dock verlassen — zurück zur normalen Größe
      tgtRef.current = baseWidth;
    } else if (elRef.current) {
      // Abstand der Maus zum Icon-Mittelpunkt berechnen
      const rect = elRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      tgtRef.current = sizeInterp(mouse_x - cx); // Zielgröße von der Kurve holen
    }
  }, [mouse_x]);

  // weiche Animations-Schleife — läuft jeden Frame
  // nutzt Lerp (lineare Interpolation) um weich zur Zielgröße zu gleiten
  useEffect(() => {
    let running = true;
    const lerp = 0.22; // wie schnell wir zur Zielgröße gehen (0 = nie, 1 = sofort)

    function tick() {
      if (!running) return;
      const diff = tgtRef.current - curRef.current;
      if (Math.abs(diff) > 0.25) {
        // noch in Bewegung — zur Zielgröße lerpen
        curRef.current += diff * lerp;
      } else {
        // nah genug — direkt auf Zielgröße snappen
        curRef.current = tgtRef.current;
      }
      // DOM-Element direkt updaten (nicht über React State, für Performance)
      const el = elRef.current;
      if (el) {
        const px = curRef.current + 'px';
        el.style.width = px;
        el.style.height = px;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    // aufräumen wenn die Komponente entfernt wird
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Apps per Tastatur öffnen (Enter oder Leertaste)
  const handleKey = useCallback(
    (e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); },
    [onClick],
  );

  return (
    <div
      ref={elRef}
      className={`dock-item${entering ? ' dock-item-enter' : ''}`}
      data-app-id={app_id}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onKeyDown={handleKey}
      style={{ width: baseWidth + 'px', height: baseWidth + 'px' }}
    >
      {/* Tooltip mit dem App-Namen beim Hovern */}
      <span className="app-tooltip">{name}</span>

      {/* das eigentliche App-Icon */}
      <img src={icon} alt={name} draggable={false} />

      {/* kleiner Punkt unter dem Icon wenn die App offen ist */}
      {is_open && <span className="dot" />}
    </div>
  );
}
