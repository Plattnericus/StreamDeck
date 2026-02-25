<script lang="ts">
  let tabs = [{ id: 1, title: "Neuer Tab", url: "" }];
  let activeTabId = 1;
  let nextId = 2;
  let query = "";

  const addTab = () => {
    const newTab = { id: nextId, title: `Tab ${nextId}`, url: "" };
    tabs = [...tabs, newTab];
    activeTabId = newTab.id;
    nextId += 1;
  };

  const closeTab = (id: number) => {
    if (tabs.length === 1) return;
    tabs = tabs.filter((tab) => tab.id !== id);
    if (activeTabId === id) {
      activeTabId = tabs[0]?.id ?? 1;
    }
  };

  const setActive = (id: number) => {
    activeTabId = id;
    const selected = tabs.find((tab) => tab.id === id);
    if (selected) query = selected.url;
  };

  const updateActiveTab = (patch: Record<string, unknown>) => {
    tabs = tabs.map((tab) => (tab.id === activeTabId ? { ...tab, ...patch } : tab));
  };

  const submitSearch = () => {
    const term = query.trim();
    if (!term) return;
    const looksLikeUrl = !term.includes(" ") && term.includes(".");
    const url = looksLikeUrl
      ? term.startsWith("http")
        ? term
        : `https://${term}`
      : `https://www.google.com/search?q=${encodeURIComponent(term)}`;
    updateActiveTab({ url, title: looksLikeUrl ? term : `Google: ${term}` });
    query = url;
  };

  $: activeTab = tabs.find((tab) => tab.id === activeTabId);
</script>

<div class="brave-shell">
  <div class="topbar">
    <div class="tabs">
      {#each tabs as tab}
        <div
          class="tab {tab.id === activeTabId ? 'active' : ''}"
          role="button"
          tabindex="0"
          on:click={() => setActive(tab.id)}
          on:keydown={(event) => event.key === "Enter" && setActive(tab.id)}
        >
          <span class="tab-icon"></span>
          <span class="tab-title">{tab.title}</span>
          <button
            class="tab-close"
            type="button"
            aria-label="Tab schliessen"
            on:click|stopPropagation={() => closeTab(tab.id)}
          >
            ×
          </button>
        </div>
      {/each}
      <button class="tab add" type="button" on:click={addTab} aria-label="Neuen Tab erstellen">
        +
      </button>
    </div>

    <div class="actions">
      <span class="action"></span>
      <span class="action"></span>
      <span class="action"></span>
    </div>
  </div>

  <div class="toolbar">
    <div class="nav">
      <span class="nav-btn left" aria-hidden="true"></span>
      <span class="nav-btn right" aria-hidden="true"></span>
      <span class="nav-btn reload" aria-hidden="true"></span>
    </div>
    <form class="address-bar" on:submit|preventDefault={submitSearch}>
      <span class="brand-icon"></span>
      <input
        class="url-input"
        type="text"
        placeholder="Mit Google suchen oder eine URL eingeben"
        bind:value={query}
        aria-label="Google Suche"
      />
      <button class="go" type="submit">Suchen</button>
    </form>
    <div class="toolbar-actions">
      <span class="tool"></span>
      <span class="tool"></span>
      <span class="tool"></span>
    </div>
  </div>

  <div class="page {activeTab?.url ? 'has-webview' : ''}">
    <div class="viewport">
      {#if activeTab?.url}
        <iframe class="webview" title="Tab Ansicht" src={activeTab.url}></iframe>
      {:else}
        <div class="center">
          <div class="shortcut-row">
            <div class="shortcut"></div>
            <div class="shortcut"></div>
            <div class="shortcut"></div>
            <div class="shortcut"></div>
            <div class="shortcut"></div>
          </div>
          <div class="wip-label">
            <span class="wip-icon"></span>
            <div>
              <div class="wip-title">WIP</div>
              <div class="wip-sub">Work in Progress</div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(body) {
    background: none;
  }

  .brave-shell {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
    color: #f7f7f9;
    font-family: "Space Grotesk", "Segoe UI", sans-serif;
    background: transparent;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 12px 18px;
    background: rgba(20, 22, 28, 0.78);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(10px);
  }

  .tabs {
    display: flex;
    gap: 8px;
    align-items: center;
    flex: 1;
    overflow: hidden;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 12px;
    background: rgba(36, 41, 52, 0.85);
    color: #cfd4df;
    font-size: 12px;
    border: none;
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, color 180ms ease;
  }

  .tab-close {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: #cfd4df;
    font-size: 14px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .tab-close:hover {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
  }

  .tab.active {
    background: rgba(62, 70, 86, 0.9);
    color: #fff;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  .tab-icon {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: linear-gradient(135deg, #ff7a18, #ffcc00);
  }

  .tab.add {
    width: 30px;
    justify-content: center;
    padding: 7px 0;
    font-weight: 600;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .action {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    background: rgba(45, 51, 64, 0.9);
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px 12px;
    background: rgba(23, 26, 34, 0.72);
    backdrop-filter: blur(10px);
  }

  .nav {
    display: flex;
    gap: 8px;
  }

  .nav-btn {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    background: rgba(44, 50, 64, 0.9);
    position: relative;
  }

  .nav-btn::after {
    content: "";
    position: absolute;
    inset: 8px;
    border: 2px solid #9aa3b2;
    border-top: none;
    border-right: none;
    transform: rotate(45deg);
  }

  .nav-btn.right::after {
    transform: rotate(225deg);
  }

  .nav-btn.reload::after {
    border: none;
    border-radius: 50%;
    border: 2px solid #9aa3b2;
    border-right-color: transparent;
  }

  .address-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 260px;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(14, 16, 22, 0.92);
    color: #a9b0bc;
    font-size: 13px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
  }

  .brand-icon {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    background: linear-gradient(135deg, #ff5f2c, #ffb21a);
    box-shadow: 0 4px 10px rgba(255, 124, 36, 0.35);
  }

  .url-input {
    flex: 1;
    background: transparent;
    border: none;
    color: #e6e9ef;
    font-size: 13px;
    outline: none;
  }

  .url-input::placeholder {
    color: #9ea7b4;
  }

  .go {
    padding: 6px 12px;
    border-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    transition: transform 160ms ease, background 160ms ease;
  }

  .go:hover {
    background: rgba(255, 255, 255, 0.16);
    transform: translateY(-1px);
  }

  .toolbar-actions {
    display: flex;
    gap: 8px;
  }

  .tool {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    background: rgba(44, 50, 64, 0.9);
  }

  .page {
    flex: 1;
    min-height: 0;
    background: url("/WIP.jpg") center / cover no-repeat;
    position: relative;
    padding: 56px 32px 32px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .page.has-webview {
    background: none;
    padding: 0;
  }

  .viewport {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
  }

  .webview {
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: none;
    border-radius: 0;
    background: #0c0f14;
    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.35);
  }

  .center {
    display: flex;
    flex-direction: column;
    gap: 28px;
    align-items: center;
    margin-top: 30px;
  }

  .shortcut-row {
    display: flex;
    gap: 14px;
  }

  .shortcut {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(6px);
    animation: popIn 480ms ease both;
  }

  .shortcut:nth-child(2) {
    animation-delay: 80ms;
  }

  .shortcut:nth-child(3) {
    animation-delay: 140ms;
  }

  .shortcut:nth-child(4) {
    animation-delay: 200ms;
  }

  .shortcut:nth-child(5) {
    animation-delay: 260ms;
  }

  .wip-label {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 18px;
    border-radius: 16px;
    background: rgba(10, 12, 18, 0.7);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(8px);
    animation: floatIn 520ms ease both;
  }

  .wip-icon {
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: linear-gradient(135deg, #ff7a18, #ffcc00);
  }

  .wip-title {
    font-size: 14px;
    font-weight: 700;
  }

  .wip-sub {
    font-size: 12px;
    color: #c7ced9;
  }

  @keyframes floatIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes popIn {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 760px) {
    .tabs {
      display: none;
    }

    .toolbar-actions {
      display: none;
    }

    .address-bar {
      width: 92%;
      margin-top: -14px;
    }

    .page {
      padding: 30px 20px 60px;
    }
  }
</style>
