// ─── Desktop Auswahlrahmen ───
// zeichnet das blaue Auswahlrechteck wenn man auf dem Desktop klickt und zieht
// genau wie auf einem echten macOS Desktop
// aktuell wird der Rahmen nur gezeichnet, es wird noch nichts wirklich ausgewählt

import React, { useState, useRef, useCallback } from 'react';
import './DesktopMarquee.css';

export default function DesktopMarquee({ children, className, onEnd }) {
  const hostRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [rect, setRect] = useState({ x: 0, y: 0, w: 0, h: 0 }); // das Auswahlrechteck
  const startRef = useRef({ x: 0, y: 0 }); // Startpunkt des Ziehens

  // Hilfsfunktion: Wert zwischen min und max halten
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  // Bildschirmkoordinaten in lokale Koordinaten umrechnen
  // wird geclampd damit der Rahmen nicht außerhalb des Desktops geht
  function toHostXY(clientX, clientY) {
    const r = hostRef.current.getBoundingClientRect();
    return {
      x: clamp(clientX - r.left, 0, r.width),
      y: clamp(clientY - r.top, 0, r.height),
    };
  }

  // Auswahlrechteck anhand der aktuellen Mausposition aktualisieren
  function updateRect(currX, currY) {
    const x1 = Math.min(startRef.current.x, currX);
    const y1 = Math.min(startRef.current.y, currY);
    const x2 = Math.max(startRef.current.x, currX);
    const y2 = Math.max(startRef.current.y, currY);
    setRect({ x: x1, y: y1, w: x2 - x1, h: y2 - y1 });
  }

  // Ziehen starten — nur auf dem Hintergrund, nur linke Maustaste
  const onPointerDown = useCallback((e) => {
    if (e.target !== hostRef.current) return; // nicht von Kind-Elementen aus starten
    if (e.pointerType === 'mouse' && e.button !== 0) return; // nur linke Maustaste
    hostRef.current.setPointerCapture(e.pointerId); // Pointer capturen damit Events auch außerhalb kommen
    const p = toHostXY(e.clientX, e.clientY);
    setDragging(true);
    startRef.current = { x: p.x, y: p.y };
    setRect({ x: p.x, y: p.y, w: 0, h: 0 });
  }, []);

  // während dem Ziehen das Rechteck aktualisieren
  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    const p = toHostXY(e.clientX, e.clientY);
    updateRect(p.x, p.y);
  }, [dragging]);

  // Ziehen beenden und Parent benachrichtigen
  const onPointerUp = useCallback((e) => {
    if (!dragging) return;
    setDragging(false);
    if (onEnd) onEnd(rect);
  }, [dragging, rect, onEnd]);

  // abgebrochenes Ziehen abfangen (z.B. wenn das Fenster den Fokus verliert)
  const onPointerCancel = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (onEnd) onEnd(rect);
  }, [dragging, rect, onEnd]);

  const classes = ['marquee-host', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      ref={hostRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onLostPointerCapture={onPointerCancel}
      style={{ touchAction: 'none' }} // Browser-Touch-Gesten deaktivieren
    >
      {children}

      {/* das blaue Auswahlrechteck — nur beim Ziehen sichtbar */}
      {dragging && (rect.w > 0 || rect.h > 0) && (
        <div
          className="selection"
          style={{
            left: rect.x + 'px',
            top: rect.y + 'px',
            width: rect.w + 'px',
            height: rect.h + 'px',
          }}
        />
      )}
    </div>
  );
}
