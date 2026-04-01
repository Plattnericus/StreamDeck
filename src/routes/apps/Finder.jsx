// ─── Finder ───
// this is a macOS Finder clone with a fake file system
// it supports 4 view modes: icons, list, columns, and gallery
// the file system is all in memory — no real files, just looks realistic
// has a sidebar, toolbar, breadcrumb path bar, and status bar
import React, { useState, useMemo, useCallback } from 'react';
import './finder.css';
import { useTranslation } from '../../i18n/LanguageContext';

/* fake file system, all in memory */
const FS = {
  '/': {
    type: 'folder',
    children: ['AirDrop', 'Recents', 'Applications', 'Desktop', 'Documents', 'Downloads', 'Pictures', 'Music'],
  },
  '/AirDrop': { type: 'folder', children: [] },
  '/Recents': { type: 'folder', children: [], virtual: 'recents' },
  '/Applications': {
    type: 'folder',
    children: ['Finder.app', 'Settings.app', 'App Store.app', 'Safari.app', 'Terminal.app', 'GitHub.app', 'Galerie.app', 'Info.app'],
  },
  '/Applications/Finder.app': { type: 'file', ext: 'app', size: '12.4 MB', modified: '2026-01-15', icon: 'app' },
  '/Applications/Settings.app': { type: 'file', ext: 'app', size: '8.1 MB', modified: '2026-02-10', icon: 'app' },
  '/Applications/App Store.app': { type: 'file', ext: 'app', size: '22.7 MB', modified: '2026-03-01', icon: 'app' },
  '/Applications/Safari.app': { type: 'file', ext: 'app', size: '45.3 MB', modified: '2026-02-20', icon: 'app' },
  '/Applications/Terminal.app': { type: 'file', ext: 'app', size: '5.6 MB', modified: '2026-01-08', icon: 'app' },
  '/Applications/GitHub.app': { type: 'file', ext: 'app', size: '67.2 MB', modified: '2026-03-10', icon: 'app' },
  '/Applications/Galerie.app': { type: 'file', ext: 'app', size: '15.9 MB', modified: '2026-02-28', icon: 'app' },
  '/Applications/Info.app': { type: 'file', ext: 'app', size: '3.2 MB', modified: '2026-01-20', icon: 'app' },
  '/Desktop': {
    type: 'folder',
    children: ['StreamDeck', 'README.txt', 'Screenshot 2026-03-15.png'],
  },
  '/Desktop/StreamDeck': {
    type: 'folder',
    children: ['src', 'package.json', 'vite.config.js', 'index.html'],
  },
  '/Desktop/StreamDeck/src': { type: 'folder', children: ['App.jsx', 'main.jsx', 'global.css'] },
  '/Desktop/StreamDeck/src/App.jsx': { type: 'file', ext: 'jsx', size: '2.1 KB', modified: '2026-03-20', icon: 'code' },
  '/Desktop/StreamDeck/src/main.jsx': { type: 'file', ext: 'jsx', size: '0.4 KB', modified: '2026-03-20', icon: 'code' },
  '/Desktop/StreamDeck/src/global.css': { type: 'file', ext: 'css', size: '3.8 KB', modified: '2026-03-18', icon: 'code' },
  '/Desktop/StreamDeck/package.json': { type: 'file', ext: 'json', size: '1.2 KB', modified: '2026-03-22', icon: 'code' },
  '/Desktop/StreamDeck/vite.config.js': { type: 'file', ext: 'js', size: '0.3 KB', modified: '2026-03-15', icon: 'code' },
  '/Desktop/StreamDeck/index.html': { type: 'file', ext: 'html', size: '0.5 KB', modified: '2026-03-10', icon: 'code' },
  '/Desktop/README.txt': { type: 'file', ext: 'txt', size: '2.3 KB', modified: '2026-03-18', icon: 'text' },
  '/Desktop/Screenshot 2026-03-15.png': { type: 'file', ext: 'png', size: '1.8 MB', modified: '2026-03-15', icon: 'image' },
  '/Documents': {
    type: 'folder',
    children: ['Projektbericht.pdf', 'Notizen.txt', 'Schaltplan.pdf', 'Budget.xlsx'],
  },
  '/Documents/Projektbericht.pdf': { type: 'file', ext: 'pdf', size: '4.7 MB', modified: '2026-03-12', icon: 'pdf' },
  '/Documents/Notizen.txt': { type: 'file', ext: 'txt', size: '1.1 KB', modified: '2026-03-22', icon: 'text' },
  '/Documents/Schaltplan.pdf': { type: 'file', ext: 'pdf', size: '2.3 MB', modified: '2026-02-14', icon: 'pdf' },
  '/Documents/Budget.xlsx': { type: 'file', ext: 'xlsx', size: '156 KB', modified: '2026-03-20', icon: 'spreadsheet' },
  '/Downloads': {
    type: 'folder',
    children: ['firmware_v2.1.bin', 'ESP32_Datasheet.pdf', 'wallpaper.jpg', 'archive.zip'],
  },
  '/Downloads/firmware_v2.1.bin': { type: 'file', ext: 'bin', size: '892 KB', modified: '2026-03-21', icon: 'binary' },
  '/Downloads/ESP32_Datasheet.pdf': { type: 'file', ext: 'pdf', size: '8.4 MB', modified: '2026-03-19', icon: 'pdf' },
  '/Downloads/wallpaper.jpg': { type: 'file', ext: 'jpg', size: '3.2 MB', modified: '2026-03-17', icon: 'image' },
  '/Downloads/archive.zip': { type: 'file', ext: 'zip', size: '24.6 MB', modified: '2026-03-23', icon: 'archive' },
  '/Pictures': {
    type: 'folder',
    children: ['StreamDeck_v1.png', 'StreamDeck_v2.png', 'Gehaeuse_3D.png', 'Platine_closeup.jpg'],
  },
  '/Pictures/StreamDeck_v1.png': { type: 'file', ext: 'png', size: '2.4 MB', modified: '2025-12-10', icon: 'image' },
  '/Pictures/StreamDeck_v2.png': { type: 'file', ext: 'png', size: '3.1 MB', modified: '2026-01-22', icon: 'image' },
  '/Pictures/Gehaeuse_3D.png': { type: 'file', ext: 'png', size: '5.7 MB', modified: '2026-02-05', icon: 'image' },
  '/Pictures/Platine_closeup.jpg': { type: 'file', ext: 'jpg', size: '4.8 MB', modified: '2026-02-18', icon: 'image' },
  '/Music': {
    type: 'folder',
    children: ['Startup.mp3', 'Notification.wav'],
  },
  '/Music/Startup.mp3': { type: 'file', ext: 'mp3', size: '3.4 MB', modified: '2026-01-05', icon: 'audio' },
  '/Music/Notification.wav': { type: 'file', ext: 'wav', size: '0.2 MB', modified: '2026-01-05', icon: 'audio' },
};

function getNode(path) {
  return FS[path] || null;
}

function getChildren(path) {
  const node = getNode(path);
  if (!node || node.type !== 'folder') return [];
  return (node.children || []).map(name => {
    const childPath = path === '/' ? `/${name}` : `${path}/${name}`;
    const child = getNode(childPath);
    return {
      name,
      path: childPath,
      type: child?.type || 'file',
      ext: child?.ext || '',
      size: child?.size || '',
      modified: child?.modified || '',
      icon: child?.icon || (child?.type === 'folder' ? 'folder' : 'file'),
      children: child?.children || [],
    };
  });
}

// grab all files inside a folder
function getAllFiles(path = '/') {
  const results = [];
  const node = getNode(path);
  if (!node || node.type !== 'folder') return results;
  for (const name of node.children || []) {
    const childPath = path === '/' ? `/${name}` : `${path}/${name}`;
    const child = getNode(childPath);
    if (child?.type === 'file') {
      results.push({ name, path: childPath, ...child });
    } else if (child?.type === 'folder') {
      results.push(...getAllFiles(childPath));
    }
  }
  return results;
}

// last 10 changed files
function getRecents() {
  return getAllFiles('/')
    .sort((a, b) => b.modified.localeCompare(a.modified))
    .slice(0, 10)
    .map(f => ({
      name: f.name,
      path: f.path,
      type: 'file',
      ext: f.ext,
      size: f.size,
      modified: f.modified,
      icon: f.icon,
      children: [],
    }));
}

function pathSegments(path) {
  if (path === '/') return [{ name: 'Macintosh HD', path: '/' }];
  const parts = path.split('/').filter(Boolean);
  const segs = [{ name: 'Macintosh HD', path: '/' }];
  let cur = '';
  for (const p of parts) {
    cur += '/' + p;
    segs.push({ name: p, path: cur });
  }
  return segs;
}

/* icons */
function FolderIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M3 8a2 2 0 012-2h7.586a1 1 0 01.707.293L15 8h12a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" fill="#5AC8FA" />
      <path d="M3 11h26v13a2 2 0 01-2 2H5a2 2 0 01-2-2V11z" fill="#45B0E6" />
    </svg>
  );
}

function FileIcon({ icon, className }) {
  const colors = {
    app: '#007AFF',
    code: '#FF9500',
    text: '#8E8E93',
    pdf: '#FF3B30',
    image: '#34C759',
    spreadsheet: '#34C759',
    binary: '#AF52DE',
    archive: '#636366',
    audio: '#FF2D55',
    file: '#8E8E93',
  };
  const c = colors[icon] || colors.file;
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M7 3h12l8 8v18a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" fill={c} opacity="0.15" />
      <path d="M7 3h12l8 8v18a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M19 3v6a2 2 0 002 2h6" stroke={c} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ItemIcon({ item, size }) {
  const cls = `fd-item-icon fd-item-icon--${size || 'md'}`;
  if (item.type === 'folder') return <FolderIcon className={cls} />;
  return <FileIcon icon={item.icon} className={cls} />;
}

/* sidebar icons */
function SidebarIcon({ type }) {
  const s = { width: 16, height: 16, flexShrink: 0 };
  switch (type) {
    case 'airdrop':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M4 10.5a5 5 0 018 0" stroke="currentColor" strokeWidth="1.3" fill="none"/><path d="M2 13a8 8 0 0112 0" stroke="currentColor" strokeWidth="1.3" fill="none"/></svg>;
    case 'recents':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M8 4.5V8l2.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
    case 'applications':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>;
    case 'desktop':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
    case 'documents':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><path d="M4 2h5.5L13 5.5V13a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M9.5 2v3.5H13" stroke="currentColor" strokeWidth="1.2"/></svg>;
    case 'downloads':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7.5L8 10.5 11 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 11v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
    case 'pictures':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="5.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1"/><path d="M2 11l3-3 2 2 3-3 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'music':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><path d="M6 12V4l7-2v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="12" r="2" stroke="currentColor" strokeWidth="1.2"/><circle cx="11" cy="10" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>;
    case 'computer':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 14h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
    case 'network':
      return <svg style={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="8" cy="8" rx="3" ry="6" stroke="currentColor" strokeWidth="1.2"/><path d="M2 8h12M3 5h10M3 11h10" stroke="currentColor" strokeWidth="0.8"/></svg>;
    default:
      return <svg style={s} viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/></svg>;
  }
}

/* view mode icons */
function ViewIcon({ mode, active }) {
  const color = active ? '#007AFF' : 'currentColor';
  switch (mode) {
    case 'icons':
      return <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke={color} strokeWidth="1.3"/><rect x="9" y="1" width="6" height="6" rx="1" stroke={color} strokeWidth="1.3"/><rect x="1" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.3"/><rect x="9" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.3"/></svg>;
    case 'list':
      return <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1 3h14M1 6.5h14M1 10h14M1 13.5h14" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>;
    case 'columns':
      return <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="4" height="14" rx="1" stroke={color} strokeWidth="1.2"/><rect x="6" y="1" width="4" height="14" rx="1" stroke={color} strokeWidth="1.2"/><rect x="11" y="1" width="4" height="14" rx="1" stroke={color} strokeWidth="1.2"/></svg>;
    case 'gallery':
      return <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="10" rx="1.5" stroke={color} strokeWidth="1.2"/><rect x="1" y="13" width="3" height="2" rx="0.5" stroke={color} strokeWidth="0.8"/><rect x="5.5" y="13" width="3" height="2" rx="0.5" stroke={color} strokeWidth="0.8"/><rect x="10" y="13" width="3" height="2" rx="0.5" stroke={color} strokeWidth="0.8"/></svg>;
    default:
      return null;
  }
}

/* sidebar favs */
const SIDEBAR_FAVORITES = [
  { id: 'airdrop', path: '/AirDrop', iconType: 'airdrop', labelKey: 'finder_airdrop' },
  { id: 'recents', path: '/Recents', iconType: 'recents', labelKey: 'finder_recents' },
  { id: 'applications', path: '/Applications', iconType: 'applications', labelKey: 'finder_applications' },
  { id: 'desktop', path: '/Desktop', iconType: 'desktop', labelKey: 'finder_desktop' },
  { id: 'documents', path: '/Documents', iconType: 'documents', labelKey: 'finder_documents' },
  { id: 'downloads', path: '/Downloads', iconType: 'downloads', labelKey: 'finder_downloads' },
  { id: 'pictures', path: '/Pictures', iconType: 'pictures', labelKey: 'finder_pictures' },
  { id: 'music', path: '/Music', iconType: 'music', labelKey: 'finder_music' },
];

const SIDEBAR_LOCATIONS = [
  { id: 'computer', path: '/', iconType: 'computer', labelKey: 'finder_computer' },
  { id: 'network', path: '/', iconType: 'network', labelKey: 'finder_network' },
];

/* the actual finder component */
export default function Finder() {
  const t = useTranslation();
  const [currentPath, setCurrentPath] = useState('/Desktop');
  const [viewMode, setViewMode] = useState('icons');
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState(['/Desktop']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [columnPaths, setColumnPaths] = useState(['/Desktop']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigateTo = useCallback((path) => {
    setCurrentPath(path);
    setSelectedItem(null);
    setSearchQuery('');
    setHistory(prev => {
      const newHist = prev.slice(0, historyIndex + 1);
      newHist.push(path);
      return newHist;
    });
    setHistoryIndex(prev => prev + 1);
    if (viewMode === 'columns') {
      setColumnPaths([path]);
    }
  }, [historyIndex, viewMode]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedItem(null);
      if (viewMode === 'columns') setColumnPaths([history[newIndex]]);
    }
  }, [history, historyIndex, viewMode]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedItem(null);
      if (viewMode === 'columns') setColumnPaths([history[newIndex]]);
    }
  }, [history, historyIndex, viewMode]);

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item.path);
    if (viewMode === 'columns' && item.type === 'folder') {
      const idx = columnPaths.indexOf(currentPath);
      const base = idx >= 0 ? columnPaths.slice(0, idx + 1) : [currentPath];
      setColumnPaths([...base, item.path]);
    }
  }, [viewMode, columnPaths, currentPath]);

  const handleItemDoubleClick = useCallback((item) => {
    if (item.type === 'folder') {
      navigateTo(item.path);
    }
  }, [navigateTo]);

  const items = useMemo(() => {
    const node = getNode(currentPath);
    if (!node) return [];
    if (node.virtual === 'recents') return getRecents();
    return getChildren(currentPath);
  }, [currentPath]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    if (searchQuery.trim()) {
      return getAllFiles('/').filter(f => f.name.toLowerCase().includes(q)).map(f => ({
        name: f.name,
        path: f.path,
        type: 'file',
        ext: f.ext,
        size: f.size,
        modified: f.modified,
        icon: f.icon,
        children: [],
      }));
    }
    return items;
  }, [items, searchQuery]);

  const segments = pathSegments(currentPath);
  const folderName = segments[segments.length - 1]?.name || 'Finder';
  const itemCount = filteredItems.length;

  return (
    <div className="fd-root">
      {/* ── Toolbar ── */}
      <div className="fd-toolbar">
        <div className="fd-toolbar-left">
          <div className="fd-nav-buttons">
            <button
              className="fd-nav-btn"
              disabled={historyIndex <= 0}
              onClick={goBack}
              aria-label={t('finder_back')}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="fd-nav-btn"
              disabled={historyIndex >= history.length - 1}
              onClick={goForward}
              aria-label={t('finder_forward')}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <span className="fd-toolbar-title">{folderName}</span>
        </div>
        <div className="fd-toolbar-right">
          <div className="fd-view-modes">
            {['icons', 'list', 'columns', 'gallery'].map(mode => (
              <button
                key={mode}
                className={`fd-view-btn${viewMode === mode ? ' active' : ''}`}
                onClick={() => {
                  setViewMode(mode);
                  if (mode === 'columns') setColumnPaths([currentPath]);
                }}
                aria-label={t(`finder_view_${mode}`)}
                title={t(`finder_view_${mode}`)}
              >
                <ViewIcon mode={mode} active={viewMode === mode} />
              </button>
            ))}
          </div>
          <div className="fd-search-box">
            <svg className="fd-search-icon" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              className="fd-search-input"
              type="search"
              placeholder={t('finder_search')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <div className="fd-body">
        {/* ── Sidebar ── */}
        {!sidebarCollapsed && (
          <div className="fd-sidebar">
            <div className="fd-sidebar-section">
              <div className="fd-sidebar-heading">{t('finder_favorites')}</div>
              {SIDEBAR_FAVORITES.map(item => (
                <button
                  key={item.id}
                  className={`fd-sidebar-item${currentPath === item.path ? ' active' : ''}`}
                  onClick={() => navigateTo(item.path)}
                >
                  <SidebarIcon type={item.iconType} />
                  <span>{t(item.labelKey)}</span>
                </button>
              ))}
            </div>
            <div className="fd-sidebar-section">
              <div className="fd-sidebar-heading">{t('finder_locations')}</div>
              {SIDEBAR_LOCATIONS.map(item => (
                <button
                  key={item.id}
                  className={`fd-sidebar-item${item.id === 'computer' && currentPath === '/' ? ' active' : ''}`}
                  onClick={() => navigateTo(item.path)}
                >
                  <SidebarIcon type={item.iconType} />
                  <span>{t(item.labelKey)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Content Area ── */}
        <div className="fd-content">
          {viewMode === 'icons' && (
            <div className="fd-grid">
              {filteredItems.map(item => (
                <div
                  key={item.path}
                  className={`fd-grid-item${selectedItem === item.path ? ' selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                >
                  <ItemIcon item={item} size="lg" />
                  <span className="fd-grid-name">{item.name}</span>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="fd-empty">{searchQuery ? t('finder_no_results') : t('finder_empty_folder')}</div>
              )}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="fd-list">
              <div className="fd-list-header">
                <span className="fd-list-col fd-list-col-name">{t('finder_col_name')}</span>
                <span className="fd-list-col fd-list-col-modified">{t('finder_col_modified')}</span>
                <span className="fd-list-col fd-list-col-size">{t('finder_col_size')}</span>
                <span className="fd-list-col fd-list-col-kind">{t('finder_col_kind')}</span>
              </div>
              {filteredItems.map(item => (
                <div
                  key={item.path}
                  className={`fd-list-row${selectedItem === item.path ? ' selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                >
                  <span className="fd-list-col fd-list-col-name">
                    <ItemIcon item={item} size="sm" />
                    <span>{item.name}</span>
                  </span>
                  <span className="fd-list-col fd-list-col-modified">{item.modified || '—'}</span>
                  <span className="fd-list-col fd-list-col-size">{item.size || '—'}</span>
                  <span className="fd-list-col fd-list-col-kind">
                    {item.type === 'folder' ? t('finder_kind_folder') : (item.ext?.toUpperCase() || t('finder_kind_file'))}
                  </span>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="fd-empty">{searchQuery ? t('finder_no_results') : t('finder_empty_folder')}</div>
              )}
            </div>
          )}

          {viewMode === 'columns' && (
            <div className="fd-columns">
              {columnPaths.map((colPath, idx) => {
                const colNode = getNode(colPath);
                const colItems = colNode?.virtual === 'recents' ? getRecents() : getChildren(colPath);
                return (
                  <div key={colPath + idx} className="fd-column">
                    {colItems.map(item => (
                      <div
                        key={item.path}
                        className={`fd-column-item${selectedItem === item.path ? ' selected' : ''}${
                          columnPaths[idx + 1] === item.path ? ' expanded' : ''
                        }`}
                        onClick={() => {
                          setSelectedItem(item.path);
                          if (item.type === 'folder') {
                            setColumnPaths(prev => [...prev.slice(0, idx + 1), item.path]);
                          } else {
                            setColumnPaths(prev => prev.slice(0, idx + 1));
                          }
                        }}
                        onDoubleClick={() => {
                          if (item.type === 'folder') navigateTo(item.path);
                        }}
                      >
                        <ItemIcon item={item} size="sm" />
                        <span className="fd-column-name">{item.name}</span>
                        {item.type === 'folder' && (
                          <svg className="fd-column-chevron" width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    ))}
                    {colItems.length === 0 && (
                      <div className="fd-column-empty">{t('finder_empty_folder')}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'gallery' && (
            <div className="fd-gallery">
              <div className="fd-gallery-preview">
                {selectedItem ? (
                  <>
                    <ItemIcon item={filteredItems.find(i => i.path === selectedItem) || { type: 'file', icon: 'file' }} size="xl" />
                    <div className="fd-gallery-preview-name">
                      {filteredItems.find(i => i.path === selectedItem)?.name || ''}
                    </div>
                  </>
                ) : (
                  <div className="fd-gallery-hint">{t('finder_gallery_hint')}</div>
                )}
              </div>
              <div className="fd-gallery-strip">
                {filteredItems.map(item => (
                  <div
                    key={item.path}
                    className={`fd-gallery-thumb${selectedItem === item.path ? ' selected' : ''}`}
                    onClick={() => setSelectedItem(item.path)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                  >
                    <ItemIcon item={item} size="md" />
                    <span className="fd-gallery-thumb-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Path Bar ── */}
      <div className="fd-pathbar">
        {segments.map((seg, i) => (
          <React.Fragment key={seg.path}>
            {i > 0 && <span className="fd-pathbar-sep">/</span>}
            <button className="fd-pathbar-item" onClick={() => navigateTo(seg.path)}>
              {seg.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* ── Status Bar ── */}
      <div className="fd-statusbar">
        <span>{itemCount} {itemCount === 1 ? t('finder_item') : t('finder_items')}</span>
      </div>
    </div>
  );
}
