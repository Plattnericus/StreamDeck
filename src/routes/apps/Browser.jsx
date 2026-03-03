import React, { useState, useMemo } from 'react';
import './Browser.css';

export default function Browser() {
  const [tabs, setTabs] = useState([{ id: 1, title: 'Neuer Tab', url: '' }]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [nextId, setNextId] = useState(2);
  const [query, setQuery] = useState('');

  const activeTab = useMemo(() => tabs.find((t) => t.id === activeTabId), [tabs, activeTabId]);

  const addTab = () => {
    const newTab = { id: nextId, title: `Tab ${nextId}`, url: '' };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(nextId);
    setNextId((n) => n + 1);
  };

  const closeTab = (id) => {
    if (tabs.length === 1) return; // last tab — do nothing in standalone
    setTabs((prev) => prev.filter((t) => t.id !== id));
    if (activeTabId === id) {
      setActiveTabId(tabs.find((t) => t.id !== id)?.id ?? 1);
    }
  };

  const setActive = (id) => {
    setActiveTabId(id);
    const selected = tabs.find((t) => t.id === id);
    if (selected) setQuery(selected.url);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    const looksLikeUrl = !term.includes(' ') && term.includes('.');
    const url = looksLikeUrl
      ? term.startsWith('http') ? term : `https://${term}`
      : `https://www.google.com/search?q=${encodeURIComponent(term)}`;
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, url, title: looksLikeUrl ? term : `Google: ${term}` } : t))
    );
    setQuery(url);
  };

  return (
    <div className="brave-shell">
      {/* Tab bar */}
      <div className="browser-topbar">
        <div className="browser-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`browser-tab${tab.id === activeTabId ? ' active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              <span className="tab-icon" />
              <span className="tab-title">{tab.title}</span>
              <button className="tab-close" onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}>×</button>
            </div>
          ))}
          <button className="browser-tab add" onClick={addTab}>+</button>
        </div>
      </div>

      {/* Address bar */}
      <div className="browser-toolbar">
        <div className="nav">
          <span className="nav-btn left" />
          <span className="nav-btn right" />
          <span className="nav-btn reload" />
        </div>
        <form className="address-bar" onSubmit={submitSearch}>
          <span className="brand-icon" />
          <input
            className="url-input"
            type="text"
            placeholder="Mit Google suchen oder eine URL eingeben"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="go" type="submit">Suchen</button>
        </form>
      </div>

      {/* Page */}
      <div className={`browser-page${activeTab?.url ? ' has-webview' : ''}`}>
        <div className="browser-viewport">
          {activeTab?.url ? (
            <iframe className="webview" title="Tab Ansicht" src={activeTab.url} />
          ) : (
            <div className="browser-center">
              <div className="shortcut-row">
                {[1, 2, 3, 4, 5].map((n) => <div key={n} className="shortcut" />)}
              </div>
              <div className="wip-label">
                <span className="wip-icon" />
                <div>
                  <div className="wip-title">WIP</div>
                  <div className="wip-sub">Work in Progress</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
