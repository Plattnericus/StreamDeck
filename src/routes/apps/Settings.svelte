<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const defaultSettings = {
    darkMode: false,
    volume: 50,
    notifications: true
  };

  const settings = writable(defaultSettings);

  onMount(() => {
    const saved = localStorage.getItem('settings');
    if (saved) settings.set(JSON.parse(saved));
  });

  settings.subscribe((value) => {
    localStorage.setItem('settings', JSON.stringify(value));
  });

  function toggleDarkMode() {
    settings.update(s => ({ ...s, darkMode: !s.darkMode }));
  }

  function changeVolume(e: Event) {
    const value = +(e.target as HTMLInputElement).value;
    settings.update(s => ({ ...s, volume: value }));
  }

  function toggleNotifications() {
    settings.update(s => ({ ...s, notifications: !s.notifications }));
  }

  let activeTab: 'general' | 'sound' | 'notifications' = 'general';
  function selectTab(tab: 'general' | 'sound' | 'notifications') {
    activeTab = tab;
  }
</script>

<div class="settings-window">
  <div class="tabs">
    <button class:active={activeTab==='general'} on:click={() => selectTab('general')}>Allgemein</button>
    <button class:active={activeTab==='sound'} on:click={() => selectTab('sound')}>Sound</button>
    <button class:active={activeTab==='notifications'} on:click={() => selectTab('notifications')}>Benachrichtigungen</button>
  </div>

  <div class="tab-content">
    {#if activeTab === 'general'}
      <div class="setting">
        <label>
          <input type="checkbox" bind:checked={$settings.darkMode} on:change={toggleDarkMode} />
          Dark Mode
        </label>
      </div>
    {/if}

    {#if activeTab === 'sound'}
      <div class="setting">
        <label>
          Volume: {$settings.volume}
          <input type="range" min="0" max="100" value={$settings.volume} on:input={changeVolume} />
        </label>
      </div>
    {/if}

    {#if activeTab === 'notifications'}
      <div class="setting">
        <label>
          <input type="checkbox" bind:checked={$settings.notifications} on:change={toggleNotifications} />
          Notifications
        </label>
      </div>
    {/if}
  </div>
</div>

<style>
.settings-window {
  width: 380px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(40px) saturate(180%);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  color: #000;
  font-family: sans-serif;
}

.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.tabs button {
  flex: 1;
  padding: 8px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.tabs button.active {
  border-bottom: 2px solid #0078d4;
  color: #0078d4;
}

.tabs button:hover {
  background: rgba(0,0,0,0.05);
}

.tab-content .setting {
  margin-bottom: 16px;
}

input[type="range"] {
  width: 100%;
}
</style>
