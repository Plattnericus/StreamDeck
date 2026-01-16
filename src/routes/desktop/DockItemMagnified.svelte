<script lang="ts">
  import { spring } from 'svelte/motion';
  import { interpolate } from 'popmotion';

  const baseWidth = 96;
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

  interface Props {
    app_id: number;
    name: string;
    icon: string;
    is_open: boolean;
    mouse_x: number | null;
    onclick?: () => void;
  }

  let { app_id, name, icon, is_open, mouse_x, onclick }: Props = $props();

  const width_store = spring(baseWidth, {
    damping: 0.45,
    stiffness: 0.12,
    precision: 0.5,
  });

  const getWidthFromDistance = interpolate(distanceInput, widthOutput);

  let dock_item: HTMLElement;

  $effect(() => {
    if (mouse_x === null) {
      width_store.set(baseWidth);
    } else if (dock_item) {
      const rect = dock_item.getBoundingClientRect();
      const item_center_x = rect.left + rect.width / 2;
      const distance_delta = mouse_x - item_center_x;
      const new_width = getWidthFromDistance(distance_delta);
      width_store.set(new_width);
    }
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={dock_item}
  class="dock-item"
  data-app-id={app_id}
  role="button"
  tabindex="0"
  onclick={onclick}
  onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.currentTarget as HTMLElement).click()}
  style="width: {$width_store}px; height: {$width_store}px;"
>
  <span class="app-tooltip">{name}</span>
  <img src={icon} alt={name} />
  {#if is_open}
    <span class="dot"></span>
  {/if}
</div>

<style>
  .dock-item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    z-index: 10000000;
    will-change: width, height;
    transition: width 0.05s cubic-bezier(0.23, 1, 0.32, 1),
      height 0.05s cubic-bezier(0.23, 1, 0.32, 1),
      transform 0.2s ease,
      filter 0.2s ease;
    transform: translateZ(0);
  }

  .app-tooltip {
    position: absolute;
    top: -28px;
    background: rgba(12, 12, 14, 0.78);
    backdrop-filter: blur(10px);
    color: white;
    padding: 6px 12px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
    border: 1px solid rgba(255, 255, 255, 0.18);
    z-index: 1000;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .dock-item:hover .app-tooltip {
    opacity: 1;
  }

  .dock-item img {
    width: 52%;
    height: 52%;
    object-fit: contain;
    will-change: auto;
    transition: transform 0.2s ease;
  }

  .dock-item:hover {
    transform: translateY(-4px);
    filter: drop-shadow(0 12px 20px rgba(0, 0, 0, 0.25));
  }

  .dock-item:active img {
    transform: scale(0.96);
  }

  .dock-item:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 6px;
    border-radius: 14px;
  }

  .dot {
    position: absolute;
    bottom: 8px;
    width: 5px;
    height: 5px;
    background: black;
    border-radius: 50%;
  }
</style>
