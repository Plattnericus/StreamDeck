<script lang="ts">
  import { lastOpenedStore } from '../../lib/lastOpened';
  import type { LastOpenedApp } from '../../lib/lastOpened';

  let lastOpened: LastOpenedApp[] = [];

  lastOpenedStore.subscribe(items => {
    lastOpened = items;
  });

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  }
</script>

<div class="last-opened">
  <div class="header">
    <h3>Recently Opened</h3>
  </div>
  
  {#if lastOpened.length === 0}
    <div class="empty">No recently opened apps</div>
  {:else}
    <div class="list">
      {#each lastOpened as app (app.id)}
        <div class="item">
          <img src={app.icon} alt={app.name} class="icon" />
          <div class="info">
            <div class="name">{app.name}</div>
            <div class="meta">
              <span class="time">{formatDate(app.timestamp)}</span>
              <span class="count">({app.openCount}x)</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
    :global(::-webkit-scrollbar-button){ display:none !important; width:0 !important; height:0 !important; }
  :global(::-webkit-scrollbar-corner){ background: transparent !important; }
::-webkit-scrollbar-button {
  display: none;
}
  .last-opened {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    color: white;
    max-width: 300px;
  }

  .header {
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }

  .empty {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    padding: 20px 0;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.02);
    transition: background 0.2s ease;
    cursor: default;
  }

  .item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    object-fit: cover;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
  }

  .info {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .time {
    margin-right: 4px;
  }
</style>
