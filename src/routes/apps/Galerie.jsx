// ─── Foto-Galerie ───
// Bildergalerie mit Kategoriefiltern und Vollbild-Viewer.
// Lädt die Fotodaten aus /galerie/galerie.json —
// bei Fehler wird automatisch auf Demo-Daten zurückgefallen.
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation, useLanguage } from '../../i18n/LanguageContext';
import "./galerie.css";

// Fallback-Daten, falls die JSON-Datei nicht geladen werden kann
const DEMO = {
  titel: { de: "Stream Deck", en: "Stream Deck", it: "Stream Deck" },
  eintraege: [
    { id: 1,  bild: "/galerie/streamdeck-setup.jpg",   titel: { de: "Setup", en: "Setup", it: "Setup" },              text: { de: "Das perfekte Streaming-Setup.", en: "The perfect streaming setup.", it: "Il setup perfetto per lo streaming." }, datum: "2024-11-03", kategorie: { de: "Setup", en: "Setup", it: "Setup" } },
    { id: 2,  bild: "/galerie/streamdeck-profile.jpg", titel: { de: "Profile & Ordner", en: "Profiles & Folders", it: "Profili e cartelle" },   text: { de: "Für jede App ein eigenes Layout.", en: "A unique layout for every app.", it: "Un layout per ogni app." }, datum: "2024-10-18", kategorie: { de: "Profile", en: "Profiles", it: "Profili" } },
    { id: 3,  bild: "/galerie/streamdeck-obs.jpg",     titel: { de: "OBS Integration", en: "OBS Integration", it: "Integrazione OBS" },    text: { de: "Szenen und Aufnahme direkt steuern.", en: "Control scenes and recording directly.", it: "Controlla le scene direttamente." }, datum: "2024-09-25", kategorie: { de: "Plugins", en: "Plugins", it: "Plugin" } },
  ],
};

const IcoSuche = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const IcoSchliessen = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

const IcoBild = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="m21 15-5-5L5 21"/>
  </svg>
);

const IcoLinks = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const IcoRechts = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const IcoChevronLinks = () => (
  <svg width="10" height="16" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="m9 1-8 8 8 8"/>
  </svg>
);

const IcoWarn = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

// Hilfsfunktion: Übersetzten Wert aus einem Objekt oder String holen
const loc = (val, lang) =>
  val == null ? '' : typeof val === 'object' ? (val[lang] ?? val.de ?? '') : val;

const LOCALE_MAP = { de: 'de-DE', en: 'en-US', it: 'it-IT' };

const datumFormatieren = (s, lang = false, locale = 'de') =>
  s ? new Date(s).toLocaleDateString(LOCALE_MAP[locale] ?? 'de-DE', lang
    ? { weekday: "long", day: "2-digit", month: "long", year: "numeric" }
    : { day: "2-digit", month: "short", year: "numeric" })
  : null;

// Versucht, das EXIF-Datum aus dem Bild auszulesen
function exifAuslesen(imgEl) {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = Math.min(imgEl.naturalWidth, 200);
      canvas.height = Math.min(imgEl.naturalHeight, 200);
      canvas.getContext("2d").drawImage(imgEl, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) { resolve(null); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
          const buf = new Uint8Array(e.target.result);
          const str = String.fromCharCode(...buf.slice(0, 32768));
          const match = str.match(/(\d{4}):(\d{2}):(\d{2}) \d{2}:\d{2}:\d{2}/);
          resolve(match ? `${match[1]}-${match[2]}-${match[3]}` : null);
        };
        reader.onerror = () => resolve(null);
        reader.readAsArrayBuffer(blob);
      }, "image/jpeg", 0.3);
    } catch { resolve(null); }
  });
}

// Eine einzelne Foto-Kachel im Raster
function Kachel({ eintrag, index, onClick, locale }) {
  const [geladen, setGeladen] = useState(false);
  const [fehler,  setFehler]  = useState(false);

  return (
    <div
      className="galerie-kachel"
      style={{ animationDelay: `${Math.min(index * 40, 600)}ms` }}
      onClick={() => onClick(eintrag)}
    >
      {fehler ? (
        <div className="galerie-kachel-platzhalter"><IcoBild /></div>
      ) : (
        <>
          {!geladen && <div className="galerie-kachel-ladebalken" />}
          <img
            src={eintrag.bild}
            alt={loc(eintrag.titel, locale)}
            className={`galerie-kachel-foto${geladen ? " galerie-kachel-foto-geladen" : ""}`}
            onLoad={() => setGeladen(true)}
            onError={() => setFehler(true)}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
}

// Vollbild-Viewer mit Links/Rechts-Navigation und Swipe-Unterstützung
function FotoViewer({ eintraege, startIndex, onClose, t, locale }) {
  const [index,      setIndex]      = useState(startIndex);
  const [geladen,    setGeladen]    = useState(false);
  const [fehler,     setFehler]     = useState(false);
  const [versteckt,  setVersteckt]  = useState(false);
  const [schliessen, setSchliessen] = useState(false);
  const [exif,       setExif]       = useState(null);
  const touchStartX = useRef(null);
  const timerRef    = useRef(null);

  const eintrag = eintraege[index];

  const bildWechseln = useCallback((richtung) => {
    const neu = index + richtung;
    if (neu >= 0 && neu < eintraege.length) {
      setGeladen(false);
      setFehler(false);
      setExif(null);
      setIndex(neu);
    }
  }, [index, eintraege.length]);

  const uiZeigen = useCallback(() => {
    setVersteckt(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVersteckt(true), 3500);
  }, []);

  const zumachen = useCallback(() => {
    setSchliessen(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    uiZeigen();
    return () => clearTimeout(timerRef.current);
  }, [index, uiZeigen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape")      zumachen();
      if (e.key === "ArrowLeft")   bildWechseln(-1);
      if (e.key === "ArrowRight")  bildWechseln(1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [bildWechseln, zumachen]);

  const imgRef = useCallback((el) => {
    if (el && geladen && !eintrag.datum) {
      exifAuslesen(el).then(setExif);
    }
  }, [geladen, eintrag]);

  const aufTippen = () => {
    setVersteckt(v => {
      clearTimeout(timerRef.current);
      if (!v) return true;
      timerRef.current = setTimeout(() => setVersteckt(true), 3500);
      return false;
    });
  };

  const touchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const touchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) bildWechseln(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const anzeigedatum = eintrag.datum || exif;
  const istExif = !eintrag.datum && exif;

  return (
    <div
      className={`foto-viewer ${schliessen ? "foto-viewer-ausblenden" : "foto-viewer-einblenden"}`}
      onClick={aufTippen}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
    >
      <div className={`foto-viewer-kopf${versteckt ? " foto-viewer-kopf-versteckt" : ""}`}>
        <button className="foto-viewer-zurueck" onClick={e => { e.stopPropagation(); zumachen(); }}>
          <IcoChevronLinks />
          {t('galerie_back')}
        </button>
        <span className="foto-viewer-zaehler">{index + 1} / {eintraege.length}</span>
      </div>

      <div className="foto-viewer-mitte">
        {fehler ? (
          <div style={{ color: "rgba(255,255,255,0.20)" }}><IcoBild /></div>
        ) : (
          <img
            ref={imgRef}
            key={eintrag.bild}
            src={eintrag.bild}
            alt={loc(eintrag.titel, locale)}
            className={`foto-viewer-bild${geladen ? " foto-viewer-bild-geladen" : ""}`}
            onLoad={() => setGeladen(true)}
            onError={() => { setFehler(true); setGeladen(true); }}
            crossOrigin="anonymous"
          />
        )}

        {index > 0 && (
          <button
            className="foto-viewer-pfeil foto-viewer-pfeil-links"
            onClick={e => { e.stopPropagation(); bildWechseln(-1); }}
          >
            <IcoLinks />
          </button>
        )}
        {index < eintraege.length - 1 && (
          <button
            className="foto-viewer-pfeil foto-viewer-pfeil-rechts"
            onClick={e => { e.stopPropagation(); bildWechseln(1); }}
          >
            <IcoRechts />
          </button>
        )}
      </div>

      <div className={`foto-viewer-fuss${versteckt ? " foto-viewer-fuss-versteckt" : ""}`}>
        <span className="foto-viewer-name">{loc(eintrag.titel, locale)}</span>
        <div className="foto-viewer-meta-zeile">
          {anzeigedatum && (
            <time className={istExif ? "foto-viewer-datum-exif" : "foto-viewer-datum"}>
              {datumFormatieren(anzeigedatum, true, locale)}{istExif ? " (EXIF)" : ""}
            </time>
          )}
          {loc(eintrag.kategorie, locale) && (
            <span className="foto-viewer-kategorie">{loc(eintrag.kategorie, locale)}</span>
          )}
        </div>
        {loc(eintrag.text, locale) && (
          <p className="foto-viewer-text">{loc(eintrag.text, locale)}</p>
        )}
      </div>
    </div>
  );
}

export default function GaleriePage() {
  const t = useTranslation();
  const locale = useLanguage();
  const [daten,   setDaten]   = useState(null);
  const [laedt,   setLaedt]   = useState(true);
  const [hinweis, setHinweis] = useState(null);
  const [viewer,  setViewer]  = useState(null);
  const [filter,  setFilter]  = useState(null);
  const [suche,   setSuche]   = useState("");

  useEffect(() => {
    fetch("/galerie/galerie.json")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setDaten(d); setLaedt(false); })
      .catch(() => {
        setDaten(DEMO);
        setHinweis("demo");
        setLaedt(false);
      });
  }, []);

  const kategorien = daten
    ? [t('galerie_all'), ...new Set(daten.eintraege.map(e => loc(e.kategorie, locale)).filter(Boolean))]
    : [t('galerie_all')];

  const activeFilter = filter ?? t('galerie_all');

  const gefiltert = (daten?.eintraege ?? []).filter(e =>
    (activeFilter === t('galerie_all') || loc(e.kategorie, locale) === activeFilter) &&
    (!suche || [loc(e.titel, locale), loc(e.text, locale)].some(t => t?.toLowerCase().includes(suche.toLowerCase())))
  );

  const oeffnen = (eintrag) => {
    const idx = gefiltert.findIndex(e => e.id === eintrag.id);
    if (idx !== -1) setViewer(idx);
  };

  return (
    <div className="galerie-app">
      <header className="galerie-kopf">
        <div className="galerie-kopf-oben">
          <h1 className="galerie-kopf-titel">
            {laedt ? t('galerie_title') : (loc(daten?.titel, locale) || t('galerie_title'))}
          </h1>
          {!laedt && (
            <span className="galerie-kopf-anzahl">
              {gefiltert.length} {gefiltert.length === 1 ? t('galerie_photo') : t('galerie_photos')}
            </span>
          )}
        </div>

        <div className="galerie-suchleiste">
          <span className="galerie-suchleiste-icon"><IcoSuche /></span>
          <input
            type="text"
            placeholder={t('galerie_search')}
            value={suche}
            onChange={e => setSuche(e.target.value)}
            className="galerie-suchleiste-eingabe"
          />
          {suche && (
            <button className="galerie-suchleiste-loeschen" onClick={() => setSuche("")}>
              <IcoSchliessen />
            </button>
          )}
        </div>

        {kategorien.length > 1 && (
          <div className="galerie-filter-leiste">
            {kategorien.map(k => (
              <button
                key={k}
                className={`galerie-filter-knopf${activeFilter === k ? " galerie-filter-knopf-aktiv" : ""}`}
                onClick={() => setFilter(k)}
              >
                {k}
              </button>
            ))}
          </div>
        )}

        {hinweis && (
          <div className="galerie-hinweis">
            <span className="galerie-hinweis-icon"><IcoWarn /></span>
            {t('galerie_demo_mode')}
          </div>
        )}
      </header>

      <main className="galerie-raster">
        {laedt ? (
          [...Array(12)].map((_, i) => (
            <div
              key={i}
              className="galerie-kachel"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="galerie-kachel-ladebalken" />
            </div>
          ))
        ) : gefiltert.length === 0 ? (
          <div className="galerie-leer">
            <span className="galerie-leer-icon"><IcoBild /></span>
            {t('galerie_no_photos')}
          </div>
        ) : (
          gefiltert.map((e, i) => (
            <Kachel key={e.id ?? i} eintrag={e} index={i} onClick={oeffnen} locale={locale} />
          ))
        )}
      </main>

      {viewer !== null && (
        <FotoViewer
          eintraege={gefiltert}
          startIndex={viewer}
          onClose={() => setViewer(null)}
          t={t}
          locale={locale}
        />
      )}
    </div>
  );
}