import React, { useRef, useEffect, useCallback } from 'react';
import { interpolate } from 'popmotion';
import './DockItemMagnified.css';

const baseWidth = 76;
const distanceLimit = baseWidth * 6;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.1,
  baseWidth * 1.414,
  baseWidth * 1.9,
  baseWidth * 1.414,
  baseWidth * 1.1,
  baseWidth,
];

const sizeInterp = interpolate(distanceInput, widthOutput);

/* ------------------------------------------------------------------ */
/*  120 fps dock icon — all sizing via refs + direct DOM, zero rerenders */
/* ------------------------------------------------------------------ */
export default function DockItemMagnified({
  app_id,
  name,
  icon,
  is_open,
  entering,
  mouse_x,
  onClick,
  onContextMenu,
}) {
  const elRef = useRef(null);
  const curRef = useRef(baseWidth);   // current rendered width
  const tgtRef = useRef(baseWidth);   // target width
  const rafRef = useRef(null);

  /* — update target whenever mouse_x changes — */
  useEffect(() => {
    if (mouse_x === null) {
      tgtRef.current = baseWidth;
    } else if (elRef.current) {
      const rect = elRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      tgtRef.current = sizeInterp(mouse_x - cx);
    }
  }, [mouse_x]);

  /* — single persistent rAF loop — direct DOM writes, no setState — */
  useEffect(() => {
    let running = true;
    const lerp = 0.22;               // spring-like smoothing factor

    function tick() {
      if (!running) return;
      const diff = tgtRef.current - curRef.current;
      if (Math.abs(diff) > 0.25) {
        curRef.current += diff * lerp;
      } else {
        curRef.current = tgtRef.current;
      }
      const el = elRef.current;
      if (el) {
        const px = curRef.current + 'px';
        el.style.width = px;
        el.style.height = px;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
      <span className="app-tooltip">{name}</span>
      <img src={icon} alt={name} draggable={false} />
      {is_open && <span className="dot" />}
    </div>
  );
}
