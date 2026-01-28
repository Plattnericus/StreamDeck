<!-- DesktopMarquee.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  type Rect = { x: number; y: number; w: number; h: number };

  const dispatch = createEventDispatcher<{
    start: { rect: Rect };
    change: { rect: Rect };
    end: { rect: Rect };
  }>();

  let host!: HTMLDivElement;

  let dragging = false;
  let startX = 0;
  let startY = 0;

  // current rect in HOST coordinates
  let rect: Rect = { x: 0, y: 0, w: 0, h: 0 };

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  function toHostXY(clientX: number, clientY: number) {
    const r = host.getBoundingClientRect();
    return {
      x: clamp(clientX - r.left, 0, r.width),
      y: clamp(clientY - r.top, 0, r.height),
      w: r.width,
      h: r.height
    };
  }

  function updateRect(currX: number, currY: number) {
    const x1 = Math.min(startX, currX);
    const y1 = Math.min(startY, currY);
    const x2 = Math.max(startX, currX);
    const y2 = Math.max(startY, currY);
    rect = { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
    dispatch("change", { rect });
  }

  function onPointerDown(e: PointerEvent) {
    // nur links-klick / primär (auf Touch auch ok)
    if (e.pointerType === "mouse" && e.button !== 0) return;

    // nur starten, wenn du NICHT auf einem interaktiven Element anfängst (optional)
    // if ((e.target as HTMLElement).closest("button,a,input,textarea,select,[contenteditable]")) return;

    host.setPointerCapture(e.pointerId);

    const p = toHostXY(e.clientX, e.clientY);
    dragging = true;
    startX = p.x;
    startY = p.y;
    rect = { x: startX, y: startY, w: 0, h: 0 };
    dispatch("start", { rect });
    e.preventDefault();
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    const p = toHostXY(e.clientX, e.clientY);
    updateRect(p.x, p.y);
    e.preventDefault();
  }

  function onPointerUp(e: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    dispatch("end", { rect });
    e.preventDefault();
  }

  // falls PointerCapture verloren geht
  function onPointerCancel() {
    if (!dragging) return;
    dragging = false;
    dispatch("end", { rect });
  }

  onMount(() => {
    // verhindert Touch-Scroll während Drag
    host.style.touchAction = "none";
  });
</script>

<div
  class="marquee-host"
  bind:this={host}
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointercancel={onPointerCancel}
  on:lostpointercapture={onPointerCancel}
>
  <slot />

  {#if dragging && (rect.w > 0 || rect.h > 0)}
    <div
      class="selection"
      style="
        left:{rect.x}px;
        top:{rect.y}px;
        width:{rect.w}px;
        height:{rect.h}px;
      "
    />
  {/if}
</div>

<style>
  .marquee-host {
    position: relative;
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
  }

  .selection {
    position: absolute;
    pointer-events: none;
    border: 1px solid rgba(80, 150, 255, 0.95);
    background: rgba(80, 150, 255, 0.20);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15) inset;
  }
</style>