// dock icon that gets big when u hover, like real mac
import React, { useRef, useEffect, useCallback } from 'react';
import { interpolate } from 'popmotion';
import './DockItemMagnified.css';

const baseWidth = 79; // normal size
const distanceLimit = baseWidth * 6; // how far the zoom reaches
// bigger when closer to mouse
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
  const curRef = useRef(baseWidth);
  const tgtRef = useRef(baseWidth);
  const rafRef = useRef(null);

  useEffect(() => {
    if (mouse_x === null) {
      tgtRef.current = baseWidth;
    } else if (elRef.current) {
      const rect = elRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      tgtRef.current = sizeInterp(mouse_x - cx);
    }
  }, [mouse_x]);

  // smooth animation, lerps every frame
  useEffect(() => {
    let running = true;
    const lerp = 0.22;

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
