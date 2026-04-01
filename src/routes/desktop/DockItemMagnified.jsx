// ─── Dock Item with Magnification ───
// this is a single icon in the dock
// it gets bigger when the mouse is close to it — just like the real macOS dock
// uses the popmotion library for smooth interpolation between sizes

import React, { useRef, useEffect, useCallback } from 'react';
import { interpolate } from 'popmotion';
import './DockItemMagnified.css';

// the normal size of a dock icon in pixels
const baseWidth = 79;

// how far the magnification effect reaches (in pixels from the icon center)
const distanceLimit = baseWidth * 6;

// input: distance from mouse to icon center
// the closer the mouse, the bigger the icon gets
const distanceInput = [
  -distanceLimit,        // far left
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,                     // directly on the icon — maximum size
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,         // far right
];

// output: the width of the icon at each distance
// at center (distance 0) the icon is 1.9x its normal size
const widthOutput = [
  baseWidth,
  baseWidth * 1.1,
  baseWidth * 1.414,
  baseWidth * 1.9,       // maximum magnification
  baseWidth * 1.414,
  baseWidth * 1.1,
  baseWidth,
];

// this creates a smooth function that maps distance -> icon width
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
  const elRef = useRef(null);      // ref to the icon DOM element
  const curRef = useRef(baseWidth); // current animated size
  const tgtRef = useRef(baseWidth); // target size we are animating towards
  const rafRef = useRef(null);      // requestAnimationFrame handle

  // when mouse moves, calculate the new target size based on distance
  useEffect(() => {
    if (mouse_x === null) {
      // mouse left the dock — go back to normal size
      tgtRef.current = baseWidth;
    } else if (elRef.current) {
      // calculate how far the mouse is from this icon's center
      const rect = elRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      tgtRef.current = sizeInterp(mouse_x - cx); // get the target size from the curve
    }
  }, [mouse_x]);

  // smooth animation loop — runs every frame
  // uses lerp (linear interpolation) to smoothly move towards the target size
  useEffect(() => {
    let running = true;
    const lerp = 0.22; // how fast to move towards target (0 = never, 1 = instant)

    function tick() {
      if (!running) return;
      const diff = tgtRef.current - curRef.current;
      if (Math.abs(diff) > 0.25) {
        // still moving — lerp towards target
        curRef.current += diff * lerp;
      } else {
        // close enough — snap to target
        curRef.current = tgtRef.current;
      }
      // update the DOM element size directly (not through React state, for performance)
      const el = elRef.current;
      if (el) {
        const px = curRef.current + 'px';
        el.style.width = px;
        el.style.height = px;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    // clean up on unmount
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // allow opening apps with keyboard (Enter or Space)
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
      {/* tooltip that shows the app name on hover */}
      <span className="app-tooltip">{name}</span>

      {/* the actual app icon image */}
      <img src={icon} alt={name} draggable={false} />

      {/* small dot under the icon to show the app is open */}
      {is_open && <span className="dot" />}
    </div>
  );
}
