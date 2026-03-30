// click and drag to make that cool selecton box
import React, { useState, useRef, useCallback } from 'react';
import './DesktopMarquee.css';

export default function DesktopMarquee({ children, className, onEnd }) {
  const hostRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [rect, setRect] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const startRef = useRef({ x: 0, y: 0 });

  // dont go outside the boundries
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  // turn screen coords into local coords
  function toHostXY(clientX, clientY) {
    const r = hostRef.current.getBoundingClientRect();
    return {
      x: clamp(clientX - r.left, 0, r.width),
      y: clamp(clientY - r.top, 0, r.height),
    };
  }

  // update the blue selecton rectangle
  function updateRect(currX, currY) {
    const x1 = Math.min(startRef.current.x, currX);
    const y1 = Math.min(startRef.current.y, currY);
    const x2 = Math.max(startRef.current.x, currX);
    const y2 = Math.max(startRef.current.y, currY);
    setRect({ x: x1, y: y1, w: x2 - x1, h: y2 - y1 });
  }

  const onPointerDown = useCallback((e) => {
    if (e.target !== hostRef.current) return; // only from background
    if (e.pointerType === 'mouse' && e.button !== 0) return; // left click pls
    hostRef.current.setPointerCapture(e.pointerId);
    const p = toHostXY(e.clientX, e.clientY);
    setDragging(true);
    startRef.current = { x: p.x, y: p.y };
    setRect({ x: p.x, y: p.y, w: 0, h: 0 });
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    const p = toHostXY(e.clientX, e.clientY);
    updateRect(p.x, p.y);
  }, [dragging]);

  const onPointerUp = useCallback((e) => {
    if (!dragging) return;
    setDragging(false);
    if (onEnd) onEnd(rect);
  }, [dragging, rect, onEnd]);

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
      style={{ touchAction: 'none' }}
    >
      {children}
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
