// ─── Desktop Marquee (Selection Box) ───
// this creates the blue selection rectangle when you click and drag on the desktop
// just like on a real macOS desktop — click and drag to select files
// right now it just draws the box but doesnt actually select anything

import React, { useState, useRef, useCallback } from 'react';
import './DesktopMarquee.css';

export default function DesktopMarquee({ children, className, onEnd }) {
  const hostRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [rect, setRect] = useState({ x: 0, y: 0, w: 0, h: 0 }); // the selection rectangle
  const startRef = useRef({ x: 0, y: 0 }); // where the user started dragging

  // helper to keep a number between min and max
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  // convert screen coordinates to local coordinates inside the host element
  // also clamps so the selection box cant go outside the desktop area
  function toHostXY(clientX, clientY) {
    const r = hostRef.current.getBoundingClientRect();
    return {
      x: clamp(clientX - r.left, 0, r.width),
      y: clamp(clientY - r.top, 0, r.height),
    };
  }

  // update the blue selection rectangle based on current mouse position
  // we calculate top-left corner and dimensions from start and current position
  function updateRect(currX, currY) {
    const x1 = Math.min(startRef.current.x, currX);
    const y1 = Math.min(startRef.current.y, currY);
    const x2 = Math.max(startRef.current.x, currX);
    const y2 = Math.max(startRef.current.y, currY);
    setRect({ x: x1, y: y1, w: x2 - x1, h: y2 - y1 });
  }

  // start dragging — only from the background, only left mouse button
  const onPointerDown = useCallback((e) => {
    if (e.target !== hostRef.current) return; // dont start from child elements
    if (e.pointerType === 'mouse' && e.button !== 0) return; // left click only
    hostRef.current.setPointerCapture(e.pointerId); // capture pointer so we get events even outside
    const p = toHostXY(e.clientX, e.clientY);
    setDragging(true);
    startRef.current = { x: p.x, y: p.y };
    setRect({ x: p.x, y: p.y, w: 0, h: 0 });
  }, []);

  // while dragging, update the rectangle
  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    const p = toHostXY(e.clientX, e.clientY);
    updateRect(p.x, p.y);
  }, [dragging]);

  // stop dragging and notify parent (if they want the selection result)
  const onPointerUp = useCallback((e) => {
    if (!dragging) return;
    setDragging(false);
    if (onEnd) onEnd(rect);
  }, [dragging, rect, onEnd]);

  // handle cancelled drags (like when the window loses focus)
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
      style={{ touchAction: 'none' }} // prevent browser touch gestures from interfering
    >
      {children}

      {/* the blue selection rectangle — only shown while dragging */}
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
