import React, { useState, useMemo, useRef, useCallback } from 'react';
import './Browser.css';

function proxyUrl(url) {
  if (!url) return '';
  return `/api/proxy?url=${encodeURIComponent(url)}`;
}

export default function Browser({ onClose }) {
  const [tabs, setTabs] = useState([{ id: 1, title: 'Neuer Tab', url: '' }]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [nextId, setNextId] = useState(2);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const historyRef = useRef({});
  const [reloadKey, setReloadKey] = useState(0);

  const getHistory = (tabId) => {
    if (!historyRef.current[tabId]) historyRef.current[tabId] = { entries: [''], index: 0 };
    return historyRef.current[tabId];
  };

  const pushHistory = (tabId, url) => {
    const h = getHistory(tabId);
    h.entries = h.entries.slice(0, h.index + 1);
    h.entries.push(url);
    if (h.entries.length > 3) h.entries = h.entries.slice(h.entries.length - 3);
    h.index = h.entries.length - 1;
  };

  const activeTab = useMemo(() => tabs.find((t) => t.id === activeTabId), [tabs, activeTabId]);
  const canGoBack = useMemo(() => getHistory(activeTabId).index > 0, [activeTabId, tabs]);
  const canGoForward = useMemo(() => { const h = getHistory(activeTabId); return h.index < h.entries.length - 1; }, [activeTabId, tabs]);

  const navigateTo = useCallback((tabId, url, title) => {
    pushHistory(tabId, url);
    setTabs((p) => p.map((t) => (t.id === tabId ? { ...t, url, title } : t)));
    setQuery(url);
    setLoading(true);
    setLoadError(false);
  }, []);

  const goBack = useCallback(() => {
    const h = getHistory(activeTabId);
    if (h.index <= 0) return;
    h.index--;
    const url = h.entries[h.index];
    setTabs((p) => p.map((t) => (t.id === activeTabId ? { ...t, url, title: url || 'Neuer Tab' } : t)));
    setQuery(url);
    if (url) { setLoading(true); setLoadError(false); }
  }, [activeTabId]);

  const goForward = useCallback(() => {
    const h = getHistory(activeTabId);
    if (h.index >= h.entries.length - 1) return;
    h.index++;
    const url = h.entries[h.index];
    setTabs((p) => p.map((t) => (t.id === activeTabId ? { ...t, url, title: url || 'Neuer Tab' } : t)));
    setQuery(url);
    if (url) { setLoading(true); setLoadError(false); }
  }, [activeTabId]);

  const reload = useCallback(() => { setLoading(true); setLoadError(false); setReloadKey((k) => k + 1); }, []);

  const addTab = () => {
    setTabs((p) => [...p, { id: nextId, title: 'Neuer Tab', url: '' }]);
    setActiveTabId(nextId);
    setQuery('');
    setLoading(false);
    setLoadError(false);
    setNextId((n) => n + 1);
  };

  const closeTab = (id) => {
    if (tabs.length === 1) { onClose?.(); return; }
    delete historyRef.current[id];
    setTabs((p) => p.filter((t) => t.id !== id));
    if (activeTabId === id) setActiveTabId(tabs.find((t) => t.id !== id)?.id ?? 1);
  };

  const setActive = (id) => {
    setActiveTabId(id);
    const sel = tabs.find((t) => t.id === id);
    if (sel) { setQuery(sel.url); setLoadError(false); setLoading(false); }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    const isUrl = !term.includes(' ') && term.includes('.');
    const url = isUrl ? (term.startsWith('http') ? term : `https://${term}`) : `https://www.google.com/search?q=${encodeURIComponent(term)}`;
    navigateTo(activeTabId, url, isUrl ? term : `Google: ${term}`);
  };

  return (
    <div className="brave-shell">
      <div className="browser-topbar">
        <div className="browser-tabs">
          {tabs.map((tab) => (
            <div key={tab.id} className={`browser-tab${tab.id === activeTabId ? ' active' : ''}`} onClick={() => setActive(tab.id)}>
              <span className="tab-icon" />
              <span className="tab-title">{tab.title}</span>
              <button className="tab-close" onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}>×</button>
            </div>
          ))}
          <button className="browser-tab add" onClick={addTab}>+</button>
        </div>
      </div>

      <div className="browser-toolbar">
        {loading && <div className="browser-loading-bar" />}
        <div className="nav">
          <button className={`nav-btn left${!canGoBack ? ' disabled' : ''}`} onClick={goBack} disabled={!canGoBack} />
          <button className={`nav-btn right${!canGoForward ? ' disabled' : ''}`} onClick={goForward} disabled={!canGoForward} />
          <button className={`nav-btn reload${loading ? ' spinning' : ''}`} onClick={reload} />
        </div>
        <form className="address-bar" onSubmit={submitSearch}>
          <span className="brand-icon" />
          <input className="url-input" type="text" placeholder="Mit Google suchen oder eine URL eingeben" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className="go" type="submit">Suchen</button>
        </form>
      </div>

      <div className={`browser-page${activeTab?.url ? ' has-webview' : ''}`}>
        <div className="browser-viewport">
          {activeTab?.url ? (
            <>
              {loadError && (
                <div className="browser-error">
                  <div className="error-icon">⚠️</div>
                  <div className="error-title">Seite kann nicht geladen werden</div>
                  <div className="error-sub">{activeTab.url}</div>
                  <button className="error-retry" onClick={reload}>Erneut versuchen</button>
                  <button className="error-open-external" onClick={() => window.open(activeTab.url, '_blank')}>In neuem Tab öffnen ↗</button>
                </div>
              )}
              <iframe
                key={`${activeTab.id}-${activeTab.url}-${reloadKey}`}
                className="webview"
                title="Tab Ansicht"
                src={proxyUrl(activeTab.url)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                onLoad={() => setLoading(false)}
                onError={() => { setLoading(false); setLoadError(true); }}
                style={loadError ? { display: 'none' } : undefined}
              />
            </>
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
