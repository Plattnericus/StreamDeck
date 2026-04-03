// ─── Docker-Seite ───
// zeigt alle Projektfragen als Docker-Container an (wie Portainer)
// jede Frage ist ein aufklappbarer Container
import { useState } from 'react';
import './Docker.css';
import { useTranslation } from '../../i18n/LanguageContext';

// alle Container — thematisch sortiert, Duplikate zusammengefuehrt
const CONTAINERS = [
  { id: 'f0a1', nameKey: 'dq1_name',  textKey: 'dq1_text',  tags: ['Einfuehrung', 'Projekt'],    running: true },
  { id: 'f0a2', nameKey: 'dq2_name',  textKey: 'dq2_text',  tags: ['DIY', 'Kosten'],             running: true },
  { id: 'f0a3', nameKey: 'dq3_name',  textKey: 'dq3_text',  tags: ['Arduino', 'HID'],            running: true },
  { id: 'f0a4', nameKey: 'dq4_name',  textKey: 'dq4_text',  tags: ['Nextion', 'Touchscreen'],    running: true },
  { id: 'f0a5', nameKey: 'dq5_name',  textKey: 'dq5_text',  tags: ['UI', 'Nextion-Editor'],      running: true },
  { id: 'f0a6', nameKey: 'dq6_name',  textKey: 'dq6_text',  tags: ['C/C++', 'Python'],           running: true },
  { id: 'f0a7', nameKey: 'dq7_name',  textKey: 'dq7_text',  tags: ['UART', 'Protokoll'],         running: true },
  { id: 'f0a8', nameKey: 'dq8_name',  textKey: 'dq8_text',  tags: ['HID', 'F13-F24'],            running: true },
  { id: 'f0a9', nameKey: 'dq9_name',  textKey: 'dq9_text',  tags: ['Touch', 'Eingabe'],          running: true },
  { id: 'f0b0', nameKey: 'dq10_name', textKey: 'dq10_text', tags: ['Bauteile', 'Kosten'],        running: true },
  { id: 'f0b1', nameKey: 'dq11_name', textKey: 'dq11_text', tags: ['USB', 'Strom', 'Flash'],     running: true },
  { id: 'f0b2', nameKey: 'dq12_name', textKey: 'dq12_text', tags: ['Sicherheit'],                running: false },
  { id: 'f0b3', nameKey: 'dq13_name', textKey: 'dq13_text', tags: ['Debug', 'Tools'],            running: true },
  { id: 'f0b4', nameKey: 'dq14_name', textKey: 'dq14_text', tags: ['Alltag', 'Haltbarkeit'],     running: true },
  { id: 'f0b5', nameKey: 'dq15_name', textKey: 'dq15_text', tags: ['Portabel', 'USB'],           running: true },
  { id: 'f0b6', nameKey: 'dq16_name', textKey: 'dq16_text', tags: ['Vergleich', 'Elgato'],       running: false },
  { id: 'f0b7', nameKey: 'dq17_name', textKey: 'dq17_text', tags: ['3D-Druck', 'Gehaeuse'],      running: true },
  { id: 'f0b8', nameKey: 'dq18_name', textKey: 'dq18_text', tags: ['Updates', 'Erweiterung'],    running: true },
  { id: 'f0b9', nameKey: 'dq19_name', textKey: 'dq19_text', tags: ['Workflow', 'Nutzen'],        running: true },
  { id: 'f0c0', nameKey: 'dq20_name', textKey: 'dq20_text', tags: ['Lernen', 'Skills'],          running: true },
  { id: 'f0c1', nameKey: 'dq21_name', textKey: 'dq21_text', tags: ['Schwierigkeit', 'Zeit'],     running: true },
  { id: 'f0c2', nameKey: 'dq22_name', textKey: 'dq22_text', tags: ['Doku', 'Praesentation'],     running: true },
  { id: 'f0c3', nameKey: 'dq23_name', textKey: 'dq23_text', tags: ['Zukunft', 'Beruf'],          running: true },
  { id: 'f0c4', nameKey: 'dq24_name', textKey: 'dq24_text', tags: ['Fazit'],                     running: true },
];

export default function Docker() {
  const t = useTranslation();
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState(new Set());

  // Karte auf-/zuklappen
  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // nach Name, Text oder Tags filtern
  const filtered = search.trim() === ''
    ? CONTAINERS
    : CONTAINERS.filter((c) => {
        const q = search.toLowerCase();
        return t(c.nameKey).toLowerCase().includes(q) ||
          t(c.textKey).toLowerCase().includes(q) ||
          c.tags.some((tag) => tag.toLowerCase().includes(q));
      });

  // Statistiken berechnen
  const running = CONTAINERS.filter((c) => c.running).length;
  const stopped = CONTAINERS.length - running;

  return (
    <div className="docker">
      {/* Header mit Logo und Statistiken */}
      <div className="docker-header">
        <img className="docker-logo" src="/icons/docker.png" alt="Docker" />
        <div className="docker-header-info">
          <div className="docker-header-title">{t('docker_title')}</div>
          <div className="docker-header-sub">{t('docker_subtitle')}</div>
        </div>
        <div className="docker-stats">
          <div className="docker-stat">
            <div className="docker-stat-val">{running}</div>
            <div className="docker-stat-label">{t('docker_running')}</div>
          </div>
          <div className="docker-stat">
            <div className="docker-stat-val">{stopped}</div>
            <div className="docker-stat-label">{t('docker_stopped')}</div>
          </div>
          <div className="docker-stat">
            <div className="docker-stat-val">{CONTAINERS.length}</div>
            <div className="docker-stat-label">{t('docker_total')}</div>
          </div>
        </div>
      </div>

      {/* Suchleiste */}
      <div className="docker-search">
        <svg className="docker-search-icon" viewBox="0 0 20 20">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          className="docker-search-input"
          type="search"
          placeholder={t('docker_search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* scrollbare Container-Liste ohne sichtbare Scrollbar */}
      <div className="docker-list">
        {filtered.length === 0 ? (
          <div className="docker-empty">{t('no_results')}</div>
        ) : (
          filtered.map((c, i) => (
            <div
              key={c.id}
              className={`docker-card${openIds.has(c.id) ? ' open' : ''}`}
              style={{ animationDelay: `${i * 0.03}s` }}
              onClick={() => toggle(c.id)}
            >
              <div className="docker-card-top">
                <div className={`docker-card-status ${c.running ? 'running' : 'stopped'}`} />
                <div className="docker-card-name">{t(c.nameKey)}</div>
                <div className="docker-card-id">{c.id}</div>
                <div className="docker-card-arrow">▸</div>
              </div>
              <div className="docker-card-body">
                <div className="docker-card-text">{t(c.textKey)}</div>
                <div className="docker-card-tags">
                  {c.tags.map((tag) => (
                    <span key={tag} className="docker-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
