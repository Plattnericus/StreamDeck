<div align="center">

<br/>

# 📖 UNDERSTANDING — Vollständige Code-Dokumentation

### Stream Deck DIY · macOS Tahoe · Liquid Glass · React

**Jede Datei. Jede Funktion. Jede Zeile — einfach erklärt.**

<br/>

*Dieses Dokument erklärt den gesamten Quellcode so, dass ihn jeder versteht — auch ohne Programmierkenntnisse.*

<br/>

---

</div>

<br/>

## 📋 Inhaltsverzeichnis

| Nr. | Kapitel | Beschreibung |
|-----|---------|--------------|
| 1 | [🎯 Was ist dieses Projekt?](#-1-was-ist-dieses-projekt) | Überblick und Ziel |
| 2 | [🧰 Technologien erklärt](#-2-technologien-erklärt) | Jede Technologie einfach erklärt |
| 3 | [📁 Projektstruktur](#-3-projektstruktur--welche-datei-macht-was) | Jede Datei und ihre Aufgabe |
| 4 | [⚡ Wie startet die App?](#-4-wie-startet-die-app--der-weg-vom-browser-zum-desktop) | Der komplette Startvorgang |
| 5 | [🔐 Die Login-Seite](#-5-die-login-seite-loginpagejsx) | Boot, Passwort, Cookies |
| 6 | [🖥️ Der Desktop](#-6-der-desktop-desktoppagejsx) | Aufbau der Hauptseite |
| 7 | [📊 Die Menüleiste](#-7-die-menüleiste-headerjsx) | Header mit allen Features |
| 8 | [🚀 Das Dock](#-8-das-dock-dockjsx) | Taskleiste und Fenster-System |
| 9 | [✨ Liquid Glass Effekt](#-9-der-liquid-glass-effekt) | CSS-Magie erklärt |
| 10 | [📱 Alle Apps im Detail](#-10-alle-apps-im-detail) | Jede einzelne App erklärt |
| 11 | [🌍 Mehrsprachigkeit](#-11-mehrsprachigkeit-i18n) | Deutsch, Englisch, Italienisch |
| 12 | [💾 Datenspeicherung](#-12-datenspeicherung) | localStorage erklärt |
| 13 | [⚙️ Das Einstellungs-System](#-13-das-einstellungs-system) | Settings von A bis Z |
| 14 | [🌓 Dark Mode & Light Mode](#-14-dark-mode--light-mode) | Wie der Themenwechsel funktioniert |
| 15 | [🔌 Die API](#-15-die-api-apiproxyjs) | Der Proxy-Server |
| 16 | [🔍 SEO & Meta-Tags](#-16-seo--meta-tags) | Suchmaschinen-Optimierung |
| 17 | [🚢 Deployment](#-17-deployment-veröffentlichung) | Vercel + Cloudflare |
| 18 | [🧩 Hilfsfunktionen](#-18-hilfsfunktionen-srclib) | Wiederverwendbare Logik |
| 19 | [📝 Glossar](#-19-glossar--wichtige-begriffe) | Alle Fachbegriffe erklärt |

<br/>

---

<br/>

## 🎯 1. Was ist dieses Projekt?

<br/>

> **In einem Satz:** Eine Website, die wie ein echtes macOS-Betriebssystem aussieht und gleichzeitig als DIY-Stream-Deck-Controller funktioniert.

<br/>

### Das Projekt macht zwei Dinge gleichzeitig:

<br/>

#### 🖥️ Teil 1: macOS Tahoe im Browser

Die Website **sieht aus und fühlt sich an wie ein echtes macOS-Betriebssystem**. Man sieht:

- Einen Desktop mit Hintergrundbild
- Fenster die man öffnen, schließen, ziehen und vergrößern kann
- Eine Dock-Leiste unten (wie bei einem echten Mac)
- Eine Menüleiste oben mit Apple-Logo, Uhrzeit, WLAN
- Glas-Effekte, die aussehen wie echtes Milchglas
- Dark Mode und Light Mode

**Wichtig:** Es ist KEIN echtes Betriebssystem! Es ist eine Website, die mit React und CSS gebaut wurde und einen Mac perfekt nachahmt.

<br/>

#### 🎛️ Teil 2: DIY Stream Deck

Ein **Stream Deck** ist normalerweise ein teures Gerät von Elgato mit programmierbaren Knöpfen, das Streamer benutzen. Hier wurde das Konzept **komplett im Browser nachgebaut** — ganz ohne Hardware.

<br/>

#### 🌐 Live ansehen

Die Website ist live unter: **[streamdeck.plattnericus.dev](https://streamdeck.plattnericus.dev)**

<br/>

---

<br/>

## 🧰 2. Technologien erklärt

<br/>

> Hier wird jede verwendete Technologie so erklärt, dass man sie ohne Vorwissen versteht.

<br/>

### 🔵 React 18

| | |
|---|---|
| **Was ist das?** | Eine JavaScript-Bibliothek von Meta (Facebook) zum Bauen von Benutzeroberflächen |
| **Einfach erklärt** | Stell dir **Lego-Bausteine** vor. Jedes Element der Website (ein Button, ein Fenster, ein Menü) ist ein eigener Baustein. Diese Bausteine heißen **Komponenten**. Man kann sie wiederverwenden und ineinander stecken. |
| **Warum hier?** | Ein Fenster-System wie bei macOS besteht aus vielen einzelnen Teilen. React macht es einfach, diese Teile zu bauen und zu verwalten. |
| **Beispiel** | `<Finder />` ist eine Komponente. Sie enthält den kompletten Dateimanager als wiederverwendbaren Baustein. |

<br/>

### ⚡ Vite 5

| | |
|---|---|
| **Was ist das?** | Ein Build-Tool — es nimmt unseren Quellcode und macht ihn browser-fertig |
| **Einfach erklärt** | Stell dir einen **Übersetzer** vor. Der Browser versteht unseren modernen Code nicht direkt. Vite übersetzt ihn in eine Sprache, die der Browser versteht. Und das extrem schnell. |
| **Warum hier?** | Wenn man eine Datei ändert, sieht man die Änderung **sofort** im Browser — in unter 100 Millisekunden. Das macht die Entwicklung viel schneller als mit älteren Tools wie Webpack. |
| **Konfiguration** | `vite.config.js` — hier steht, welche Plugins Vite nutzen soll und wo die statischen Dateien liegen. |

<br/>

### 📝 JavaScript (JSX)

| | |
|---|---|
| **Was ist das?** | Die Programmiersprache des Internets |
| **Einfach erklärt** | JavaScript macht Webseiten **interaktiv**. Ohne JavaScript wäre jede Seite nur ein statisches Bild. JSX ist eine Erweiterung, die es erlaubt, **HTML direkt in JavaScript** zu schreiben. |
| **Warum JSX?** | Statt HTML und JavaScript in getrennten Dateien zu haben, kann man beides in einer Datei kombinieren. Das macht den Code lesbarer. |
| **Beispiel** | `return <div className="dock">Hallo</div>` — das sieht aus wie HTML, ist aber JavaScript! |

<br/>

### 🎨 CSS Modules

| | |
|---|---|
| **Was ist das?** | CSS (Cascading Style Sheets) bestimmt das **Aussehen** einer Website |
| **Einfach erklärt** | CSS sagt dem Browser: "Mach diesen Text rot, diesen Button rund, und dieses Fenster 500px breit." CSS Modules bedeutet: **Jede Komponente hat ihr eigenes CSS**, das sich nicht mit dem CSS anderer Komponenten vermischt. |
| **Warum hier?** | In einem Projekt mit 50+ Dateien würden sich CSS-Klassennamen sonst gegenseitig überschreiben. CSS Modules verhindert das. |
| **Beispiel** | `Dock.css` gilt NUR für die Dock-Komponente. Eine Klasse `.button` in `Dock.css` stört nicht eine Klasse `.button` in `Settings.css`. |

<br/>

### 🟢 Node.js 20

| | |
|---|---|
| **Was ist das?** | Ermöglicht es, JavaScript auch außerhalb des Browsers auszuführen |
| **Einfach erklärt** | Normalerweise läuft JavaScript nur im Browser. Node.js ist wie ein **Motor**, der JavaScript auch auf einem Server laufen lässt. |
| **Warum hier?** | Für den Proxy-Server (`api/proxy.js`), der externe Websites für den eingebauten Browser lädt. |

<br/>

### 🧊 Three.js

| | |
|---|---|
| **Was ist das?** | Eine 3D-Bibliothek für den Browser |
| **Einfach erklärt** | Three.js macht es möglich, **3D-Modelle** direkt im Browser anzuzeigen und zu drehen — wie ein 3D-Videospiel, aber in einer Website. |
| **Warum hier?** | Die 3D-Modell-App zeigt das physische Stream Deck Gehäuse als drehbares 3D-Modell an. Man kann es von allen Seiten betrachten. |

<br/>

### ☁️ Vercel

| | |
|---|---|
| **Was ist das?** | Ein Hosting-Service — er macht die Website im Internet verfügbar |
| **Einfach erklärt** | Vercel ist wie ein **Grundstück im Internet**. Man lädt seinen Code hoch und Vercel stellt ihn der ganzen Welt zur Verfügung. |
| **Warum hier?** | Automatisches Deployment: Bei jedem `git push` baut Vercel die Website neu und veröffentlicht sie. Null Konfiguration nötig. |

<br/>

### 🛡️ Cloudflare

| | |
|---|---|
| **Was ist das?** | Ein CDN und Sicherheits-Service |
| **Einfach erklärt** | Cloudflare sitzt wie ein **Türsteher** vor der Website. Es schützt vor Angriffen (DDoS), macht die Seite schneller (durch weltweites Caching) und erzwingt sichere Verbindungen (HTTPS). |

<br/>

### 🎬 Popmotion

| | |
|---|---|
| **Was ist das?** | Eine kleine Animations-Bibliothek |
| **Einfach erklärt** | Stellt mathematische Funktionen bereit, um sanfte Übergänge zu berechnen. |
| **Warum hier?** | Wird für die **Dock-Vergrößerung** verwendet. Die `interpolate`-Funktion berechnet, wie stark jedes Icon vergrößert wird basierend auf dem Mausabstand. |

<br/>

---

<br/>

## 📁 3. Projektstruktur — Welche Datei macht was?

<br/>

> Hier wird JEDE Datei im Projekt erklärt. Die Struktur ist wie ein Haus: Jeder Raum hat eine klare Aufgabe.

<br/>

### 🏠 Wurzelverzeichnis (Hauptordner)

```
StreamDeck/
├── 📄 index.html          ← Hauptseite, die der Browser zuerst lädt
├── 📄 package.json         ← "Einkaufsliste" der benötigten Bibliotheken
├── 📄 package-lock.json    ← Exakte Versionen aller Bibliotheken (automatisch)
├── 📄 vite.config.js       ← Konfiguration für den Build-Prozess
├── 📄 vercel.json          ← Konfiguration für den Hosting-Service
├── 📄 jsconfig.json        ← Kurze Import-Pfade ermöglichen
├── 📄 .gitignore           ← Welche Dateien NICHT auf GitHub hochgeladen werden
├── 📄 .npmrc               ← npm-Einstellungen
├── 📄 LICENSE              ← MIT-Lizenz (jeder darf den Code verwenden)
├── 📄 README.md            ← Projekt-Beschreibung für GitHub
│
├── 📁 api/                 ← Server-Code (API)
├── 📁 src/                 ← Der gesamte Website-Code (Quellcode)
└── 📁 static/              ← Statische Dateien (Bilder, Icons, Fonts)
```

<br/>

#### 📄 index.html — Die Hauptseite

**Was macht sie?** Das ist die EINZIGE HTML-Datei des Projekts. Der Browser lädt sie zuerst.

**Was steht drin?**
- 🏷️ **Meta-Tags** — Über 100 Meta-Tags für Google, Social Media, Twitter, Dublin Core
- 📊 **Schema.org JSON-LD** — Strukturierte Daten, damit Google versteht, was die Seite ist
- 🎨 **Theme-Colors** — Verschiedene Farben für Dark/Light Mode
- 📱 **Viewport** — Macht die Seite responsive (passt sich an Bildschirmgrößen an)
- 🔗 **Favicons** — Icons für Browser-Tabs, iOS, Android
- 📦 **`<div id="root">`** — Der Container, in den React die gesamte App einfügt
- 🚀 **`<script src="/src/main.jsx">`** — Startet die React-App

**Einfach erklärt:** Die index.html ist wie die **Eingangstür** des Hauses. Sie sagt dem Browser: "Hier ist die Website" und lädt dann React, das den Rest übernimmt.

<br/>

#### 📄 package.json — Die Einkaufsliste

```json
{
  "dependencies": {
    "react": "^19.2.4",           // ← Die UI-Bibliothek
    "react-dom": "^19.2.4",       // ← Verbindet React mit dem Browser
    "react-router-dom": "^7.13.1", // ← Navigation zwischen Seiten
    "three": "^0.183.1",          // ← 3D-Modelle im Browser
    "popmotion": "^11.0.5"        // ← Animations-Mathematik
  },
  "devDependencies": {
    "vite": "^7.2.6",             // ← Build-Tool
    "@vitejs/plugin-react": "^5.1.4" // ← React-Unterstützung für Vite
  },
  "scripts": {
    "dev": "vite",                 // ← Startet den Entwicklungsserver
    "build": "vite build",         // ← Baut die fertige Website
    "preview": "vite preview"      // ← Zeigt die fertige Website lokal
  }
}
```

**Einfach erklärt:** Wie ein Kochrezept. `dependencies` sind die Zutaten, die man braucht. `devDependencies` sind die Küchengeräte. `scripts` sind die Kochbefehle.

<br/>

#### 📄 vite.config.js — Die Build-Konfiguration

**Was steht drin?**
- 🔌 **React Plugin** — Ermöglicht JSX-Syntax
- 🌐 **Browser-Proxy Plugin** — Ein lokaler Proxy für die Browser-App (nur während der Entwicklung)
- 📁 **publicDir: 'static'** — Sagt Vite, dass der `static/` Ordner direkt serviert werden soll
- 🔗 **Alias: `@lib`** — Ermöglicht kurze Import-Pfade (statt `../../lib/` schreibt man `@lib/`)
- 🖥️ **Server: host '0.0.0.0'** — Macht den Server im lokalen Netzwerk erreichbar

<br/>

#### 📄 vercel.json — Hosting-Konfiguration

**Was steht drin?**
- 🔄 **Rewrites** — Alle URLs (außer `/api/`) werden auf `index.html` umgeleitet. Das ist nötig, weil React die Navigation selbst übernimmt.
- 🔒 **Sicherheits-Header:**
  - `X-Frame-Options: DENY` — Verhindert, dass die Seite in einem iframe eingebettet wird
  - `X-Content-Type-Options: nosniff` — Verhindert MIME-Typ-Sniffing
  - `Referrer-Policy` — Kontrolliert, welche Info an andere Seiten gesendet wird
- ⚡ **Cache-Header** — Statische Dateien werden ein Jahr lang gecacht (schnellere Ladezeiten)

<br/>

---

### 📁 src/ — Der Quellcode (Herzstück)

```
src/
├── 📄 main.jsx                    ← Startpunkt der React-App
├── 📄 App.jsx                     ← Router — entscheidet welche Seite gezeigt wird
├── 📄 global.css                  ← Globale Styles (Schriftart, Scrollbar, etc.)
│
├── 📁 hooks/                      ← Wiederverwendbare React-Funktionen
│   └── 📄 useSEO.js              ← Setzt Meta-Tags pro Seite
│
├── 📁 i18n/                       ← Mehrsprachigkeit
│   ├── 📄 LanguageContext.jsx     ← Stellt die aktuelle Sprache bereit
│   └── 📄 translations.js        ← Alle Texte in DE/EN/IT
│
├── 📁 lib/                        ← Hilfsfunktionen
│   ├── 📄 openTab.js             ← Berechnet Fenster-Positionen
│   ├── 📄 appStore.jsx           ← Verwaltet installierte Apps
│   ├── 📄 lastOpened.jsx         ← "Zuletzt geöffnet"-Feature
│   └── 📄 appFilter.js           ← Unterscheidet Standard- und installierte Apps
│
├── 📁 routes/                     ← Die Seiten der Website
│   ├── 📄 LoginPage.jsx          ← Anmeldeseite
│   ├── 📄 LoginPage.css
│   ├── 📄 ErrorPage.jsx          ← 404-Fehlerseite
│   ├── 📄 ErrorPage.css
│   │
│   ├── 📁 desktop/               ← Desktop-Seite (Hauptseite)
│   │   ├── 📄 DesktopPage.jsx    ← Baut den Desktop zusammen
│   │   ├── 📄 DesktopPage.css
│   │   ├── 📄 Header.jsx         ← Menüleiste oben
│   │   ├── 📄 Header.css
│   │   ├── 📄 Dock.jsx           ← Dock + Fenster-System
│   │   ├── 📄 Dock.css
│   │   ├── 📄 DockItemMagnified.jsx  ← Einzelnes Dock-Icon mit Vergrößerung
│   │   ├── 📄 DockItemMagnified.css
│   │   ├── 📄 DesktopMarquee.jsx ← Auswahl-Rechteck auf dem Desktop
│   │   ├── 📄 DesktopMarquee.css
│   │   ├── 📄 LastOpened.jsx     ← "Zuletzt geöffnet"-Widget
│   │   └── 📄 LastOpened.css
│   │
│   └── 📁 apps/                   ← Alle Apps
│       ├── 📄 Finder.jsx + finder.css       ← Dateimanager
│       ├── 📄 Browser.jsx + Browser.css     ← Webbrowser
│       ├── 📄 Terminal.jsx + Terminal.css   ← Terminal/Kommandozeile
│       ├── 📄 Apps.jsx + Apps.css           ← App Store
│       ├── 📄 Trash.jsx + trash.css         ← Papierkorb
│       ├── 📄 Github.jsx + Github.css       ← GitHub-Profil
│       ├── 📄 Model.jsx + Model.css         ← 3D-Modell-Viewer
│       ├── 📄 Galerie.jsx + galerie.css     ← Foto-Galerie
│       ├── 📄 Changelog.jsx + Changelog.css ← Versions-Historie
│       ├── 📄 Info.jsx + Info.css           ← Hardware-Infos
│       ├── 📄 About.jsx + About.css         ← Projekt-Infos
│       ├── 📄 Cookies.jsx + Cookies.css     ← Cookie-Banner
│       ├── 📄 Cookies-info.jsx              ← Cookie-Infoseite
│       ├── 📄 Datenschutz.jsx               ← Datenschutzerklärung
│       ├── 📄 Impressum.jsx                 ← Impressum
│       ├── 📄 AGB.jsx                       ← AGB
│       ├── 📄 legal-shared.css              ← Gemeinsame Styles für Rechtstexte
│       │
│       └── 📁 settings/                      ← Einstellungs-App
│           ├── 📄 Settings.jsx              ← Haupt-Einstellungen
│           ├── 📄 Settings.css
│           ├── 📄 settingsStore.js          ← Speicher-Logik
│           ├── 📄 primitives.jsx            ← UI-Bausteine (Toggle, Slider, etc.)
│           ├── 📄 icons.jsx                 ← Alle SVG-Icons
│           ├── 📄 translations.js           ← (Alt) Übersetzungen
│           ├── 📄 AboutMac.jsx + AboutMac.css ← "Über diesen Mac"
│           └── 📁 sections/                  ← Einstellungs-Bereiche
│               ├── 📄 NetworkSection.jsx
│               ├── 📄 AppearanceSection.jsx
│               ├── 📄 SoundSection.jsx
│               ├── 📄 GeneralSection.jsx
│               ├── 📄 NotificationsSection.jsx
│               ├── 📄 PrivacySection.jsx
│               └── 📄 AboutSection.jsx
```

<br/>

---

<br/>

## ⚡ 4. Wie startet die App? — Der Weg vom Browser zum Desktop

<br/>

> Hier wird Schritt für Schritt erklärt, was passiert, wenn man die Website aufruft.

<br/>

```
🌐 Nutzer öffnet streamdeck.plattnericus.dev
         │
         ▼
📄 index.html wird geladen
    └── Enthält <div id="root"></div>
    └── Lädt <script src="/src/main.jsx">
         │
         ▼
📄 main.jsx wird ausgeführt
    └── ReactDOM.createRoot(document.getElementById('root'))
    └── Rendert <App /> in das root-Element
         │
         ▼
📄 App.jsx — Der Router entscheidet
    ├── URL ist "/" → Zeige LoginPage
    ├── URL ist "/desktop" → Prüfe Cookie-Consent → Zeige DesktopPage
    └── Alles andere → Zeige ErrorPage (404)
         │
         ▼
🔐 LoginPage.jsx
    ├── 1. Boot-Animation (4.2 Sekunden)
    ├── 2. Login-Screen mit Uhr + Passwort
    ├── 3. Scroll oder Passwort zum Entsperren
    ├── 4. Cookie-Banner erscheint
    └── 5. Weiterleitung zu /desktop
         │
         ▼
🖥️ DesktopPage.jsx
    ├── Header (Menüleiste oben)
    ├── DesktopMarquee (Desktop-Fläche)
    ├── Dock (Taskleiste unten)
    └── App-Fenster (öffnen sich bei Klick)
```

<br/>

### 🔑 Wichtiges Konzept: React Router

**Was ist das?** React Router ist eine Bibliothek, die **URLs** in React verwaltet.

**Einfach erklärt:** Normalerweise lädt der Browser bei jeder neuen URL eine neue HTML-Seite. Bei React gibt es aber nur EINE HTML-Seite (`index.html`). React Router "täuscht" verschiedene Seiten vor, indem es den Inhalt wechselt, ohne die Seite neu zu laden. Das ist schneller und fühlt sich flüssiger an.

```jsx
// App.jsx — vereinfacht
<BrowserRouter>
  <Routes>
    <Route path="/"        element={<LoginPage />} />     {/* Startseite */}
    <Route path="/desktop"  element={<DesktopPage />} />   {/* Desktop */}
    <Route path="*"        element={<ErrorPage />} />      {/* Alles andere = 404 */}
  </Routes>
</BrowserRouter>
```

<br/>

### 🔑 Wichtiges Konzept: RequireCookieConsent

```jsx
function RequireCookieConsent({ children }) {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return <Navigate to="/" replace />;
  return children;
}
```

**Was macht das?** Bevor der Desktop angezeigt wird, prüft diese Funktion, ob der Nutzer die Cookies akzeptiert (oder abgelehnt) hat. Wenn nicht, wird er zurück zur Login-Seite geschickt.

**Einfach erklärt:** Ein Türsteher, der prüft, ob man sein Cookie-Ticket hat.

<br/>

---

<br/>

## 🔐 5. Die Login-Seite (LoginPage.jsx)

<br/>

> Die Login-Seite ist das Erste, was der Nutzer sieht. Sie simuliert einen echten macOS-Startvorgang.

<br/>

### 🎬 Phase 1: Boot-Animation

```
⬛ Schwarzer Bildschirm
     │
     ▼
🍎 Apple-Logo erscheint (weiß auf schwarz)
     │
     ▼
▓▓▓▓▓▓░░░░ Ladebalken füllt sich (4.2 Sekunden)
     │
     ▼
✨ Login-Screen erscheint mit Fade-In
```

**Wie funktioniert der Ladebalken?**

```jsx
// Der Ladebalken startet bei 0% Breite
fill.style.transition = 'width 4200ms cubic-bezier(0.4, 0, 0.2, 1)';
fill.style.width = '100%';
// CSS-Transition animiert die Breite über 4.2 Sekunden
// cubic-bezier macht die Animation am Anfang langsam, in der Mitte schnell
```

**Einfach erklärt:** Der Balken wird einfach von `width: 0%` auf `width: 100%` gesetzt. Die CSS-Transition macht den Rest — sie animiert die Breitenänderung über 4.2 Sekunden mit einer natürlich aussehenden Kurve.

<br/>

### 🔓 Phase 2: Login-Screen

**Was sieht man?**
- 🕐 **Uhr** oben — aktualisiert sich jede Sekunde
- 👤 **Avatar** — das NEXOR-Logo
- 🔑 **Passwort-Feld** — das korrekte Passwort ist `Kennwort0`
- 📜 **Scroll zum Entsperren** — man kann mit dem Mausrad nach oben scrollen

**Wie funktioniert das Scroll-Entsperren?**

```
Mausrad dreht sich
      │
      ▼
wheel-Event fängt das ab
      │
      ▼
slideProgress wird berechnet (0.0 bis 1.0)
      │
      ▼
CSS-Variable --slide bewegt den Screen nach oben
      │
      ▼
Bei slideProgress >= 0.98 → Entsperren!
```

**Der Code dahinter:**

```jsx
// Der Login-Screen hat eine CSS-Variable --slide
transform: translateY(calc(var(--slide) * -22vh));
opacity: calc(1 - (var(--slide) * 0.9));

// Beim Scrollen wird --slide von 0 auf 1 erhöht
// Das bewegt den Screen nach oben und blendet ihn aus
```

<br/>

### 🍪 Phase 3: Cookie-Banner

Nach dem Entsperren erscheint ein Cookie-Banner:

- **"Alle akzeptieren"** → `localStorage.setItem('cookie-consent', 'accepted')` → Weiter zum Desktop
- **"Ablehnen"** → Beim ersten Mal: Zurück zum Login mit Hinweis. Beim zweiten Mal: `cookie-consent: declined` → Weiter zum Desktop
- **"Mehr erfahren"** → Öffnet Cookie-Info-Popup
- **"Datenschutzerklärung"** → Öffnet Datenschutz-Popup

<br/>

### 🧊 Der Liquid Glass Effekt auf dem Login

Die Login-Karte hat einen speziellen Glaseffekt mit mehreren CSS-Schichten:

```css
.liquid-glass {
  backdrop-filter: blur(26px) saturate(1.4);        /* Verwischung */
  border: 1px solid rgba(255,255,255,0.28);         /* Weißer Rand */
  box-shadow: 0 20px 60px rgba(0,0,0,0.35),        /* Schatten */
              inset 0 1px 0 rgba(255,255,255,0.4),  /* Oberer Glanz */
              inset 0 -18px 28px rgba(255,255,255,0.08); /* Unterer Schimmer */
}

.liquid-glass::before {  /* Lichtreflex oben */
  background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.06));
  transform: rotate(-6deg);
}

.liquid-glass::after {   /* Lichtpunkte (Kaustiken) */
  background: radial-gradient(...) , radial-gradient(...);
  mix-blend-mode: screen;
}
```

**Einfach erklärt:** Drei Schichten übereinander:
1. Die Glasfläche selbst (verwischt den Hintergrund)
2. Ein schräger Lichtstreifen oben (::before)
3. Lichtpunkte wie bei echtem Glas (::after)

<br/>

---

<br/>

## 🖥️ 6. Der Desktop (DesktopPage.jsx)

<br/>

> Die Hauptseite — hier läuft alles zusammen.

<br/>

### 🏗️ Aufbau

```jsx
<AppStoreProvider>        {/* Stellt App-Daten bereit */}
  <LastOpenedProvider>    {/* Stellt "Zuletzt geöffnet"-Daten bereit */}
    <DesktopMarquee>      {/* Desktop-Fläche mit Auswahl-Rechteck */}
      <Header />          {/* Menüleiste oben */}
      <Dock />            {/* Dock + alle Fenster */}
    </DesktopMarquee>
    <MobileLockscreen />  {/* Warnung für Mobilgeräte */}
  </LastOpenedProvider>
</AppStoreProvider>
```

<br/>

### 🔑 Wichtiges Konzept: Provider (Context)

**Was ist ein Provider?**

In React können normalerweise nur Eltern Daten an Kinder weitergeben. Aber was, wenn eine Komponente tief im Baum Daten braucht, die ganz oben definiert sind?

**Einfach erklärt:** Stell dir ein **Walkie-Talkie** vor. Der Provider ist die Basisstation, die Daten sendet. Jede Komponente mit dem passenden Empfänger (Hook) kann die Daten empfangen — egal wie tief sie im Komponentenbaum ist.

```
AppStoreProvider (sendet App-Daten)
  └── DesktopPage
        └── Dock
              └── Apps.jsx → useAppStore() empfängt die Daten ✅
```

Ohne Context müsste man die Daten durch JEDE Zwischenschicht manuell durchreichen.

<br/>

### 📱 Mobil-Warnung

```jsx
<div className="mobile-lockscreen">
  <h1>Nur Desktop</h1>
  <p>Diese Seite ist nicht für Mobilgeräte optimiert!</p>
</div>
```

Wird per CSS nur auf Bildschirmen unter 768px Breite angezeigt (`@media (max-width: 768px)`). Auf Desktop-Browsern ist sie unsichtbar.

<br/>

### 🖱️ DesktopMarquee — Das Auswahl-Rechteck

**Was ist das?** Wenn man auf dem Desktop klickt und zieht, erscheint ein blaues Auswahl-Rechteck — genau wie bei Windows oder macOS.

**Wie funktioniert es?**

```
1. onPointerDown → Startpunkt merken (x, y)
2. onPointerMove → Aktuelles Rechteck berechnen
3. onPointerUp → Auswahl beenden
```

Das Rechteck wird als absolut positioniertes `<div>` gezeichnet mit blauem Rand und halbtransparentem blauem Hintergrund.

<br/>

---

<br/>

## 📊 7. Die Menüleiste (Header.jsx)

<br/>

> Der Header ist die Leiste ganz oben — die komplexeste Einzelkomponente des Projekts mit ~500 Zeilen Code.

<br/>

### 🏗️ Aufbau der Menüleiste

```
┌─────────────────────────────────────────────────────────────────┐
│ 🍎 │ Finder │ Datei │ Bearbeiten │ Ansicht │ ... │ 🔋 📶 ⚙ │ Di 24. Mär │
└─────────────────────────────────────────────────────────────────┘
  ↑       ↑                                           ↑        ↑
  Apple   Menü-Einträge                    Status-Icons   Uhrzeit
  Menü    (Dropdowns)                    + Control Center
```

<br/>

### 🍎 Das Apple-Menü

Klickt man auf das Apple-Logo, öffnet sich ein Dropdown mit:

| Eintrag | Was passiert? |
|---------|--------------|
| Über diesen Mac | Öffnet ein draggable Popup-Fenster mit MacBook-Info |
| Systemeinstellungen | Öffnet die Settings-App |
| App Store | Öffnet den App Store |
| Ruhezustand | Schließt das Menü (simuliert) |
| Neustart | `window.location.reload()` — Seite wird neu geladen |
| Ausschalten | `window.location.href = '/'` — Zurück zum Login |
| Abmelden | `window.location.href = '/'` — Zurück zum Login |

<br/>

### 📋 Die Datei/Bearbeiten/Ansicht-Menüs

Jedes Menü hat realistische Einträge mit Tastaturkürzel-Anzeige:

```jsx
{
  id: 'edit', label: 'Bearbeiten',
  items: [
    { label: 'Widerrufen',       shortcut: '⌘Z' },
    { label: 'Wiederherstellen',  shortcut: '⇧⌘Z' },
    { divider: true },  // ← Trennlinie
    { label: 'Ausschneiden',     shortcut: '⌘X' },
    { label: 'Kopieren',         shortcut: '⌘C' },
    { label: 'Einfügen',         shortcut: '⌘V' },
  ]
}
```

**Wichtig:** Die Tastaturkürzel funktionieren nicht wirklich — sie werden nur angezeigt, um den macOS-Look zu vervollständigen.

<br/>

### 🎛️ Control Center

Das Control Center ist ein großes Panel, das sich öffnet, wenn man auf das Control Center Icon klickt:

```
┌────────────────────────┐
│  📶 WLAN    🔷 Bluetooth │
│  ✈ Flugmodus  📱 Mobilfunk │
│                          │
│  🎵 Now Playing          │
│  ┌──┐ Sabrina Carpenter  │
│  │🖼│ Tornado Warnings    │
│  └──┘ ▶ ███████░░ 2:45   │
│                          │
│  ☀ Helligkeit  ████████░ │
│  🔊 Lautstärke ██████░░░ │
│                          │
│  🔒 Sperren  📺 Spiegeln  │
│                          │
│  🌙 Nachtm. ☀ Night 📡 Air│
└────────────────────────┘
```

<br/>

### 🎵 Der Musik-Player im Detail

**Das ist ein ECHTER Musik-Player!** Er spielt wirklich MP3-Dateien ab.

**Die 8 eingebauten Tracks:**

| Nr. | Titel | Album |
|-----|-------|-------|
| 1 | Couldn't Make It Any Harder | Short n' Sweet (Deluxe) |
| 2 | Tornado Warnings | emails i can't send |
| 3 | Such A Funny Way | Man's Best Friend (Bonus) |
| 4 | buy me presents | Man's Best Friend |
| 5 | Vicious | emails i can't send |
| 6 | We Almost Broke Up Again Last Night | Man's Best Friend |
| 7 | emails i can't send | emails i can't send |
| 8 | bet u wanna | Short n' Sweet (Deluxe) |

**Wie funktioniert er technisch?**

```jsx
// 1. Ein unsichtbares <audio>-Element spielt die Musik
<audio ref={audioRef} preload="metadata" />

// 2. Der Track wird geladen
audioRef.current.src = currentTrack.src;

// 3. Play/Pause
if (playing) audioRef.current.play();
else audioRef.current.pause();

// 4. Fortschritt wird als Prozent berechnet
setProgress((currentTime / duration) * 100);

// 5. Der Fortschrittsbalken ist klickbar!
// Klick → Position berechnen → Audio springt dort hin
```

**Persistenz:** Der aktuelle Song und die Position werden alle 2 Sekunden in localStorage gespeichert. Beim nächsten Besuch spielt die Musik ab der gleichen Stelle weiter!

<br/>

### ☀️ Helligkeitsregler — Wie funktioniert das?

```jsx
// Ein schwarzes Overlay liegt ÜBER dem gesamten Bildschirm
<div className="brightness-overlay"
     style={{ opacity: 1 - settings.brightness / 100 }} />
```

- Bei Helligkeit = 100 → `opacity: 0` → komplett durchsichtig (normal)
- Bei Helligkeit = 50 → `opacity: 0.5` → halb schwarz
- Bei Helligkeit = 10 → `opacity: 0.9` → fast komplett schwarz

**Einfach erklärt:** Es ist einfach eine schwarze Folie über dem ganzen Bildschirm. Je dunkler die Einstellung, desto undurchsichtiger wird die Folie.

<br/>

### 🔄 "Über diesen Mac" — Draggable Popup

```jsx
// Das Popup merkt sich, wo man angefangen hat zu ziehen
const startAboutDrag = (e) => {
  aboutDrag.current = {
    sx: e.clientX - aboutPos.x,   // Maus X minus aktuelle Position
    sy: e.clientY - aboutPos.y    // Maus Y minus aktuelle Position
  };
};

// Bei Mausbewegung wird die Position aktualisiert
const mv = (e) => {
  if (!aboutDrag.current) return;
  setAboutPos({
    x: e.clientX - aboutDrag.current.sx,
    y: e.clientY - aboutDrag.current.sy
  });
};
```

**Einfach erklärt:** Man merkt sich den Abstand zwischen Maus und Fenster-Ecke. Beim Ziehen wird das Fenster so verschoben, dass dieser Abstand gleich bleibt.

<br/>

---

<br/>

## 🚀 8. Das Dock (Dock.jsx)

<br/>

> Das Dock ist die Leiste unten am Bildschirm. Es verwaltet auch alle App-Fenster.

<br/>

### 🏗️ Was macht Dock.jsx alles?

Dock.jsx ist die **größte Datei** des Projekts (~450 Zeilen) und macht gleich mehrere Dinge:

```
Dock.jsx
  ├── 🎯 Zeigt das Dock mit allen App-Icons an
  ├── 🪟 Verwaltet ALLE App-Fenster (öffnen, schließen, ziehen, resizen)
  ├── 📦 Speichert gepinnte Apps in localStorage
  ├── 🖱️ Handhabt Rechtsklick-Kontextmenüs
  └── ✨ Verwaltet Animationen (Minimieren, Wiederherstellen, Eintreten)
```

<br/>

### 📋 Die Standard-Apps im Dock

```javascript
const defaultApps = [
  { id: 1, name: 'Finder',    icon: '/icons/finder.webp',    component: Finder,    width: 640,  height: 400 },
  { id: 2, name: 'App Store', icon: '/icons/app-store.webp', component: Apps,      width: 720,  height: 480 },
  { id: 3, name: 'Settings',  icon: '/icons/settings.webp',  component: Settings,  width: 460,  height: 680 },
  { id: 4, name: 'Safari',    icon: '/icons/safari.webp',    component: Browser,   width: 800,  height: 500 },
  { id: 5, name: 'Terminal',  icon: '/icons/terminal.webp',  component: Terminal,  width: 860,  height: 480 },
  { id: 6, name: 'Github',    icon: '/icons/github.webp',    component: Github,    width: 920,  height: 600 },
  { id: 10, name: 'Trash',    icon: '/icons/trash.webp',     component: Papierkorb, width: 560, height: 360 },
];
```

Jede App hat: eine `id`, einen `name`, ein `icon`, eine React-`component` und Standard-Maße (`width`/`height`).

<br/>

### 🪟 Das Fenster-System

Wenn man auf ein Dock-Icon klickt, öffnet sich ein **Fenster**. So sieht ein Fenster aus:

```
┌─ ● ● ● ─────────── Finder ──────────────┐ ← Titelleiste (ziehbar)
│  🔴 🟡 🟢                                 │ ← Ampel-Buttons
│                                           │
│         (App-Inhalt wird hier gerendert)  │ ← window-content
│                                           │
│                                           │
│                                      ◢   │ ← Resize-Ecke
└───────────────────────────────────────────┘
```

**Jedes Fenster hat diese Daten:**

```javascript
{
  id: 1,               // Eindeutige ID
  name: 'Finder',      // Name in der Titelleiste
  open: true,          // Ist das Fenster offen?
  minimized: false,    // Ist es minimiert?
  maximized: false,    // Ist es maximiert (Vollbild)?
  x: 120,              // Position von links
  y: 80,               // Position von oben
  width: 640,          // Breite in Pixeln
  height: 400,         // Höhe in Pixeln
  zIndex: 5,           // Welches Fenster ist "oben"?
}
```

<br/>

### 🖱️ Fenster ziehen (Drag)

```
1. Maus drücken auf Titelleiste → startDrag()
   └── Merkt sich: welches Fenster, Mausposition, Fensterposition

2. Maus bewegen → handleMouseMove()
   └── Berechnet: neue Position = alte Position + (aktuelle Maus - Start Maus)
   └── Begrenzt: Fenster darf nicht komplett aus dem Bildschirm verschwinden

3. Maus loslassen → handleMouseUp()
   └── Ziehen beendet
```

**Wichtig:** Während des Ziehens wird die CSS-Transition abgeschaltet (`no-transition` Klasse), damit das Fenster sofort der Maus folgt und nicht "hinterhergleitet".

<br/>

### 📐 Fenster resizen

Funktioniert genau wie das Ziehen, aber statt der Position wird die **Größe** geändert:

```javascript
// Neue Breite = alte Breite + (aktuelle Maus - Start Maus)
width:  Math.max(200, origW + dx)   // Minimum 200px breit
height: Math.max(150, origH + dy)   // Minimum 150px hoch
```

<br/>

### 🃏 Z-Index (Fenster-Stapel)

**Problem:** Wenn mehrere Fenster offen sind, welches ist "oben"?

**Lösung:** Jedes Fenster hat einen `zIndex`. Bei jedem Klick auf ein Fenster wird ein globaler Zähler erhöht:

```javascript
const nextZIndex = useRef(10);  // Startet bei 10

function focusApp(id) {
  nextZIndex.current += 1;     // Zähler erhöhen
  // Dieses Fenster bekommt den höchsten zIndex → ist oben
}
```

**Einfach erklärt:** Wie ein Stapel Papierblätter. Klickt man auf ein Blatt, legt man es obendrauf.

<br/>

### ✨ Minimier-Animation

```
Fenster sichtbar
      │
      ▼ Animation "windowMinimize" (0.35s)
      │  - Schrumpft auf 40% Größe
      │  - Bewegt sich nach unten (40vh)
      │  - Blendet aus (opacity: 0)
      │
      ▼
Fenster wird auf minimized: true gesetzt
→ Verschwindet aus dem DOM
```

Beim Wiederherstellen läuft die Animation rückwärts ("windowRestore").

<br/>

### 🔍 DockItemMagnified — Der Vergrößerungseffekt

**Das ist der coolste Effekt im Dock:** Icons werden größer, je näher die Maus ist.

```
Maus hier
    ↓
 ┌─┐ ┌──┐ ┌────┐ ┌──────┐ ┌────┐ ┌──┐ ┌─┐
 │ │ │  │ │    │ │      │ │    │ │  │ │ │
 └─┘ └──┘ └────┘ └──────┘ └────┘ └──┘ └─┘
 60   70    90      120     90    70   60  (Pixelgröße)
```

**Wie funktioniert es?**

```javascript
// 1. Basis-Größe: 83px
const baseWidth = 83;

// 2. Maximale Entfernung für den Effekt: 83 × 6 = 498px
const distanceLimit = baseWidth * 6;

// 3. Interpolation: Je näher die Maus, desto größer
// Entfernung 0 → 1.9× Größe (157px)
// Entfernung 498 → 1.0× Größe (83px)

// 4. Ein requestAnimationFrame-Loop aktualisiert die Größe 60× pro Sekunde
// mit Lerp (Linear Interpolation) für sanfte Übergänge
function tick() {
  const diff = targetSize - currentSize;
  currentSize += diff * 0.22;  // 22% des Weges pro Frame
  element.style.width = currentSize + 'px';
  requestAnimationFrame(tick);
}
```

**Einfach erklärt:** Die Mausposition wird ständig beobachtet. Für jedes Icon wird der Abstand zur Maus berechnet. Je kleiner der Abstand, desto größer das Icon. Statt sofort die Größe zu ändern, "gleitet" das Icon sanft zur Zielgröße (22% pro Frame).

<br/>

---

<br/>

## ✨ 9. Der Liquid Glass Effekt

<br/>

> Das visuelle Herzstück des Projekts. macOS Tahoe's Design-Sprache in CSS nachgebaut.

<br/>

### 🧊 Was ist Liquid Glass?

Apple's neues Design-System in macOS Tahoe. Flächen sind **nicht mehr solid**, sondern **halbtransparent** mit Unschärfe-Effekt. Sie passen sich an den Hintergrund an — wie echtes Milchglas.

<br/>

### 🏗️ Die 3 Grundschichten

#### Schicht 1: Unschärfe (backdrop-filter)

```css
backdrop-filter: blur(40px) saturate(180%);
```

- `blur(40px)` → Verwischt alles HINTER dem Element um 40 Pixel
- `saturate(180%)` → Macht die verwischten Farben kräftiger

**Einfach erklärt:** Wie wenn man durch eine Milchglasscheibe schaut. Man sieht die Farben dahinter, aber unscharf.

<br/>

#### Schicht 2: Halbtransparenter Hintergrund

```css
background: rgba(255, 255, 255, 0.12);
```

- `rgba(255, 255, 255, 0.12)` → Weiß mit 12% Deckkraft

**Einfach erklärt:** Ein kaum sichtbarer weißer Schleier über der Unschärfe.

<br/>

#### Schicht 3: Rand und Schatten

```css
border: 0.5px solid rgba(255, 255, 255, 0.25);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
```

- Ein dünner weißer Rand (wie der Rand einer Glasscheibe)
- Ein weicher Schatten unter dem Element (gibt Tiefe)

<br/>

### 🌟 Erweiterte Effekte (Dock & Login)

Für besonders schöne Glasflächen gibt es noch mehr:

```
┌──────────────────────────┐
│  ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱  │ ← ::before (Lichtreflex oben, schräg)
│                          │
│        ◐  ◑              │ ← ::after (Kaustik-Lichtpunkte)
│    ⊙                     │
│                          │
│  [SVG Verzerrungsfilter] │ ← feTurbulence + feDisplacementMap
│                          │
│     ★ Maus-Specular      │ ← JS: Glanzpunkt folgt der Maus
└──────────────────────────┘
```

**Der Maus-Specular-Effekt:**
```javascript
// Bei Mausbewegung über dem Dock:
specular.style.background = `radial-gradient(
  circle at ${mouseX}px ${mouseY}px,
  rgba(255,255,255,0.15) 0%,
  rgba(255,255,255,0.05) 30%,
  rgba(255,255,255,0) 60%
)`;
```

**Einfach erklärt:** Ein heller Punkt, der der Maus folgt — wie wenn man eine Taschenlampe über eine Glasscheibe bewegt.

<br/>

### 🎨 Dark Mode vs Light Mode Werte

| Eigenschaft | Dark Mode | Light Mode |
|------------|-----------|------------|
| Glass Background | `rgba(30, 30, 30, 0.55)` | `rgba(255, 255, 255, 0.12)` |
| Glass Border | `rgba(255, 255, 255, 0.12)` | `rgba(255, 255, 255, 0.25)` |
| Menubar | `rgba(28, 28, 28, 0.72)` | `rgba(255, 255, 255, 0.72)` |
| Text Primary | `rgba(255, 255, 255, 0.88)` | `rgba(0, 0, 0, 0.85)` |
| Text Secondary | `rgba(255, 255, 255, 0.42)` | `rgba(0, 0, 0, 0.45)` |

<br/>

---

<br/>

## 📱 10. Alle Apps im Detail

<br/>

> Jede App ist eine eigene React-Komponente. Hier wird jede einzelne App erklärt.

<br/>

### 📂 10.1 Finder (Finder.jsx) — Der Dateimanager

**Zeilen:** ~430 | **Komplexität:** Hoch

**Was kann er?**
- 📁 Virtuelles Dateisystem mit Ordnern und Dateien
- 👁️ 4 Ansichten: Icons, Liste, Spalten, Galerie
- 🔍 Suchfunktion, die alle Dateien durchsucht
- 📍 Sidebar mit Favoriten und Orten
- ⬅️➡️ Vor/Zurück-Navigation mit History
- 📊 Statusleiste mit Dateizähler
- 🔗 Pfadleiste (klickbare Breadcrumbs)

**Das virtuelle Dateisystem:**

```javascript
// Ordner = Array von Kindernamen
// Datei = String (Inhalt) oder Objekt (Metadaten)
const FS = {
  '/':           { type: 'folder', children: ['Desktop', 'Documents', ...] },
  '/Desktop':    { type: 'folder', children: ['StreamDeck', 'README.txt'] },
  '/Desktop/README.txt': { type: 'file', ext: 'txt', size: '2.3 KB', modified: '2026-03-18' },
};
```

**Einfach erklärt:** Das Dateisystem ist ein JavaScript-Objekt, das wie ein echtes Dateisystem aussieht. Ordner enthalten eine Liste von Dateinamen, Dateien haben Größe und Änderungsdatum. Alles existiert nur im Speicher — es gibt keine echten Dateien auf dem Server.

**Die 4 Ansichten:**

| Ansicht | Beschreibung |
|---------|-------------|
| 🔲 Icons | Großes Gitter mit Icons und Namen (wie macOS Finder Standard) |
| 📋 Liste | Tabelle mit Name, Änderungsdatum, Größe, Art |
| 📊 Spalten | Mehrere Spalten nebeneinander — Klick auf Ordner öffnet neue Spalte rechts |
| 🖼️ Galerie | Große Vorschau oben, Filmstreifen unten |

<br/>

### ⚙️ 10.2 Settings (Settings.jsx) — Die Einstellungen

**Zeilen:** ~300 (+ 7 Sections, Store, Primitives, Icons) | **Komplexität:** Sehr hoch

**Was kann man einstellen?**

| Bereich | Einstellungen |
|---------|--------------|
| 🌐 Netzwerk | WLAN, Bluetooth, Flugmodus, Mobilfunk, VPN |
| 🎨 Darstellung | Helligkeit, Akzentfarbe (6 Farben), Schriftgröße (Klein/Mittel/Groß), Transparenz reduzieren |
| 🔊 Ton | Lautstärke, Stummschalten, Soundeffekte, Startton |
| ⚙️ Allgemein | Sprache (DE/EN/IT), 24h-Uhr, Sekunden anzeigen, Datumsformat, Bewegung reduzieren |
| 🔔 Benachrichtigungen | An/Aus, App-Badges, Töne, Vorschau, Nicht stören |
| 🔒 Datenschutz | Cookie-Status, Kamera, Mikrofon, Analyse, Alle Daten löschen |
| ℹ️ Über | Version, Build, Entwickler, Hardware-Infos |

**Die Architektur:**

```
Settings.jsx          ← Hauptkomponente (Navigation + Suche)
  ├── settingsStore.js  ← Laden/Speichern der Einstellungen
  ├── primitives.jsx    ← Wiederverwendbare UI-Elemente:
  │     ├── IosToggle   ← Schalter (An/Aus)
  │     ├── IosRow      ← Zeile mit Icon, Label, Wert
  │     ├── IosSlider   ← Schieberegler
  │     ├── IosSelect   ← Dropdown-Auswahl
  │     └── IosGroup    ← Gruppierte Karte
  ├── icons.jsx         ← 30+ SVG-Icons als Komponenten
  └── sections/
        ├── NetworkSection.jsx
        ├── AppearanceSection.jsx
        ├── SoundSection.jsx
        ├── GeneralSection.jsx
        ├── NotificationsSection.jsx
        ├── PrivacySection.jsx
        └── AboutSection.jsx
```

**Die Suchfunktion:**

Die Settings haben eine "Liquid Glass" Suchleiste unten mit SVG-Verzerrungsfilter. Wenn man tippt, werden alle Einstellungs-Bereiche gefiltert und nur passende Ergebnisse angezeigt.

```javascript
// Alle durchsuchbaren Zeilen sind definiert:
const SEARCHABLE_ROWS = [
  { sectionId: 'network', labelKey: 'wifi' },
  { sectionId: 'network', labelKey: 'bluetooth' },
  // ... über 35 Einträge
];

// Suche findet Bereiche, die mindestens einen Treffer haben
const q = searchQuery.toLowerCase();
const matched = SEARCHABLE_ROWS.filter(r => t(r.labelKey).toLowerCase().includes(q));
```

<br/>

### 🌐 10.3 Browser (Browser.jsx) — Der Webbrowser

**Zeilen:** ~180 | **Komplexität:** Mittel

**Features:**
- 📑 **Tab-System** — Mehrere Tabs öffnen, schließen, wechseln
- 🔗 **Adressleiste** — URL eingeben oder Google-Suche
- ⬅️➡️ **Navigation** — Vor, Zurück, Neu laden
- 🔄 **Lade-Animation** — Blauer Balken oben
- ⚠️ **Fehlerbehandlung** — Fehlerseite wenn eine URL nicht lädt

**Wie werden externe Websites geladen?**

```
1. Nutzer gibt "example.com" ein
2. Browser-App erkennt: Das ist eine URL (nicht eine Google-Suche)
3. URL wird an den Proxy geschickt: /api/proxy?url=https://example.com
4. Der Proxy lädt die Seite serverseitig
5. Die Seite wird in einem <iframe> angezeigt
```

**Warum ein Proxy?** Browser blockieren normalerweise Anfragen an andere Domains (CORS-Sicherheit). Der Proxy umgeht das, indem er die Seite serverseitig lädt.

<br/>

### 💻 10.4 Terminal (Terminal.jsx) — Die Kommandozeile

**Zeilen:** ~570 | **Komplexität:** Sehr hoch

**Das Terminal ist die zweitgrößte App und voll funktionsfähig!**

**Alle Befehle:**

| Befehl | Was er macht |
|--------|-------------|
| `help` | Zeigt alle Befehle an |
| `clear` | Leert das Terminal |
| `echo [text]` | Gibt Text aus |
| `echo [text] > [datei]` | Schreibt Text in Datei (überschreibt) |
| `echo [text] >> [datei]` | Hängt Text an Datei an |
| `date` | Zeigt Datum und Uhrzeit |
| `whoami` | Zeigt Benutzernamen ("nexor") |
| `hostname` | Zeigt Hostnamen ("MacOS") |
| `pwd` | Zeigt aktuelles Verzeichnis |
| `cd [pfad]` | Wechselt Verzeichnis |
| `ls [pfad]` | Listet Dateien auf |
| `cat [datei]` | Zeigt Dateiinhalt |
| `mkdir [name]` | Erstellt Ordner |
| `touch [name]` | Erstellt leere Datei |
| `rm [name]` | Löscht Datei/Ordner |
| `mv [a] [b]` | Benennt um |
| `cp [a] [b]` | Kopiert Datei |
| `find [name]` | Sucht Dateien |
| `grep [text] [datei]` | Sucht Text in Datei |
| `head [datei]` | Erste Zeile |
| `tail [datei]` | Letzte Zeile |
| `wc [datei]` | Zählt Zeilen/Wörter/Zeichen |
| `uptime` | Zeigt Laufzeit des Terminals |
| `uname [-a/-s/-o/-m/-b]` | Systeminfo (erkennt echten Browser + OS!) |
| `history` | Zeigt Befehlshistorie |
| `rev [text]` | Kehrt Text um |
| `base64 [text]` | Base64-Kodierung |
| `calc [ausdruck]` | Taschenrechner |
| `color [xy]` | Ändert Terminal-Farben |
| `cowsay [text]` | ASCII-Kuh sagt etwas |
| `neofetch` | System-Info im ASCII-Art-Stil |
| `export KEY=VALUE` | Umgebungsvariable setzen |
| `env` | Alle Variablen anzeigen |
| `alias [name]=[befehl]` | Alias erstellen |
| `sudo apt install opsec` | Simulierte Paket-Installation |
| `shutdown` | Terminal beenden |

**Besondere Features:**
- 📜 **Befehls-Historie** — Pfeiltasten hoch/runter blättern durch vorherige Befehle
- 📝 **Tab-Vervollständigung** — Tab drücken vervollständigt Befehle und Dateinamen
- 🎨 **Farbsystem** — 16 Farben (0-f), Vorder- und Hintergrund änderbar
- 📂 **Persistentes Dateisystem** — Dateien werden in localStorage gespeichert
- 🔀 **Pipe-Unterstützung** — `cat datei.txt | grep suchbegriff` funktioniert!
- ⌨️ **Ctrl+C** — Bricht aktuellen Befehl ab
- ⌨️ **Ctrl+L** — Leert den Bildschirm

<br/>

### 🏪 10.5 App Store (Apps.jsx)

**Was kann er?**
- 📋 Zeigt 9 installierbare Apps als Karten an
- 🔍 Suchfunktion
- ⬇️ Download-Animation mit Fortschrittsring
- ✅ Installierte Apps bekommen "Öffnen"-Button und erscheinen im Dock
- 💾 Installationsstatus wird gespeichert

**Download-Simulation:**
```javascript
// Simuliert einen Download über 1.8 - 3 Sekunden
const duration = 1800 + Math.random() * 1200;
// requestAnimationFrame aktualisiert den Fortschritt alle ~16ms
// Am Ende: App wird als installiert markiert + im Dock angezeigt
```

<br/>

### 🧊 10.6 3D Modell (Model.jsx)

**Was kann er?**
- 🔄 Zeigt STL-3D-Modelle an (Base Model + Lid Model)
- 🖱️ Drehen mit Maus (OrbitControls)
- 🔍 Zoom rein/raus
- 🎬 Auto-Rotation ein/aus
- 📐 Orientierungswürfel (zeigt Blickrichtung)
- ⬇️ Modell herunterladen
- 📐 Vollbildmodus
- ✨ Fade-In/Out bei Modellwechsel

**Technisch:** Verwendet Three.js mit Scene, Camera, Renderer, STLLoader und OrbitControls. Das Modell wird als Mesh mit Standard-Material (metalness: 0.3, roughness: 0.8) gerendert.

<br/>

### 🖼️ 10.7 Galerie (Galerie.jsx)

- 📷 Kachel-Gitter mit Bildern (responsive: 3-8 Spalten je nach Bildschirmgröße)
- 🔍 Suche und Kategoriefilter
- 🖼️ Vollbild-Viewer mit Swipe-Navigation
- ⬅️➡️ Pfeiltasten-Navigation
- 📊 EXIF-Datum-Erkennung aus Bildern
- ⏳ Lazy Loading und Skeleton-Platzhalter
- 🎬 Öffne/Schließe-Animationen

<br/>

### 📝 10.8 Changelog (Changelog.jsx)

- 📄 Liest `/Changelog.md` vom Server und parsed sie
- 📊 Kategorisiert: Added, Fixed, Updated, Removed, Todo
- 🗓️ Zeigt Kalender-Icons mit Datum
- 🔄 Auto-Refresh alle 5 Sekunden (prüft SHA-1 Hash auf Änderungen!)
- 📊 Statistiken in der Sidebar

<br/>

### 📋 10.9 Weitere Apps

| App | Datei | Beschreibung |
|-----|-------|-------------|
| ℹ️ Info | Info.jsx | 8 Tabs: Overview, Hardware, Wiring, Software, 3D Print, Build Steps, Features, Inspiration |
| 📖 About | About.jsx | Sidebar mit Icon + Badge, Haupt-Bereich mit App/Developer/System Infos |
| 🗑️ Trash | Trash.jsx | Leerer Papierkorb mit macOS-Finder-Toolbar |
| 🐙 GitHub | Github.jsx | Simuliertes GitHub-Profil mit 3 Repositories |
| 🔒 Datenschutz | Datenschutz.jsx | Vollständige DSGVO-konforme Datenschutzerklärung |
| 📜 Impressum | Impressum.jsx | Rechtliche Angaben nach TMG und D.Lgs. 70/2003 |
| 📋 AGB | AGB.jsx | Allgemeine Geschäftsbedingungen (14 Paragraphen) |
| 🍪 Cookies-Info | Cookies-info.jsx | Detaillierte Cookie-Erklärung |

**Alle Rechtstexte** (Datenschutz, Impressum, AGB, Cookies) teilen sich das `legal-shared.css` und können sowohl als eingebetteter Inhalt in einem Fenster als auch als Popup angezeigt werden.

<br/>

---

<br/>

## 🌍 11. Mehrsprachigkeit (i18n)

<br/>

> Die Website spricht drei Sprachen: 🇩🇪 Deutsch, 🇬🇧 Englisch, 🇮🇹 Italienisch

<br/>

### 🏗️ Aufbau

```
i18n/
├── translations.js      ← ~800 Zeilen: Alle Texte in 3 Sprachen
└── LanguageContext.jsx   ← React Context + Hooks
```

<br/>

### 📖 translations.js — Das Wörterbuch

```javascript
const T = {
  de: {
    wifi: 'WLAN',
    bluetooth: 'Bluetooth',
    settings: 'Einstellungen',
    // ... über 250 Schlüssel
  },
  en: {
    wifi: 'Wi-Fi',
    bluetooth: 'Bluetooth',
    settings: 'Settings',
    // ...
  },
  it: {
    wifi: 'Wi-Fi',
    bluetooth: 'Bluetooth',
    settings: 'Impostazioni',
    // ...
  }
};
```

<br/>

### 🔌 Wie benutzt man es?

```jsx
// 1. In jeder Komponente:
import { useTranslation } from '../../i18n/LanguageContext';

// 2. Hook aufrufen:
const t = useTranslation();

// 3. Text abrufen:
<span>{t('wifi')}</span>
// → Zeigt "WLAN" auf Deutsch
// → Zeigt "Wi-Fi" auf Englisch
// → Zeigt "Wi-Fi" auf Italienisch
```

<br/>

### 🔄 Sprache wechseln

```
Settings → Allgemein → Sprache → "English" auswählen
    │
    ▼
update('language', 'en')  →  localStorage speichern
    │
    ▼
broadcastSettingsChange()  →  Event senden
    │
    ▼
LanguageContext empfängt Event  →  Sprache aktualisieren
    │
    ▼
Alle Komponenten mit useTranslation() rendern neu
    │
    ▼
✅ Gesamte Website ist jetzt auf Englisch!
```

<br/>

---

<br/>

## 💾 12. Datenspeicherung

<br/>

> Alle Daten werden NUR im Browser gespeichert. Kein Server. Keine Datenbank. Kein Account.

<br/>

### 📦 Was ist localStorage?

localStorage ist ein Speicher im Browser. Jede Website kann dort Daten ablegen, die auch nach dem Schließen des Browsers erhalten bleiben. Es ist wie ein **Notizbuch**, das der Browser für die Website aufbewahrt.

```javascript
// Wert speichern
localStorage.setItem('name', 'Felix');

// Wert lesen
const name = localStorage.getItem('name'); // → 'Felix'

// Wert löschen
localStorage.removeItem('name');
```

<br/>

### 📋 Alle gespeicherten Daten

| Schlüssel | Was wird gespeichert? | Wann wird es gespeichert? |
|-----------|----------------------|--------------------------|
| `cookie-consent` | `'accepted'` oder `'declined'` | Nach Cookie-Banner-Entscheidung |
| `streamdeck_settings_v2` | App-Einstellungen (JSON) | Bei jeder Einstellungsänderung |
| `control_center_settings_v1` | WLAN, BT, Helligkeit, Lautstärke (JSON) | Bei CC-Änderung |
| `music_player_state_v1` | Aktueller Song-Index, Playing, Position (JSON) | Alle 2 Sekunden |
| `appstore_installed_v1` | IDs der installierten Apps (JSON-Array) | Nach App-Installation |
| `dock_pinned_apps_v1` | Gepinnte Apps mit Icon+Name (JSON-Array) | Bei Dock-Änderung |
| `terminal-fs` | Virtuelles Dateisystem (JSON) | Nach jeder Datei-Operation |
| `streamdeck_last_opened_v1` | Letzte 10 geöffnete Apps (JSON-Array) | Bei jedem App-Öffnen |

<br/>

---

<br/>

## ⚙️ 13. Das Einstellungs-System

<br/>

> settingsStore.js ist das zentrale Nervensystem für alle Einstellungen.

<br/>

### 🔧 Standard-Werte

```javascript
const DEFAULT_SETTINGS = {
  darkMode: false,           // Dark Mode aus
  accentColor: 'blue',       // Blau als Akzentfarbe
  fontSize: 'medium',        // Mittlere Schriftgröße
  language: 'de',            // Deutsch
  use24hClock: true,         // 24-Stunden-Format
  notifications: true,       // Benachrichtigungen an
  // ... 20+ weitere Einstellungen
};

const DEFAULT_CC = {
  wifi: true,                // WLAN an
  bluetooth: false,          // Bluetooth aus
  brightness: 100,           // Volle Helligkeit
  volume: 50,                // 50% Lautstärke
  // ...
};
```

<br/>

### 🎨 Akzentfarben

```javascript
const ACCENT_COLORS = {
  blue:   '#007aff',   // 🔵 Standard-macOS-Blau
  purple: '#af52de',   // 🟣 Lila
  pink:   '#ff2d55',   // 🩷 Pink
  green:  '#34c759',   // 🟢 Grün
  orange: '#ff9500',   // 🟠 Orange
  red:    '#ff3b30',   // 🔴 Rot
};
```

Die gewählte Farbe wird als CSS-Variable `--accent-color` gesetzt und überall verwendet, wo Akzentfarben vorkommen.

<br/>

### 🔄 Synchronisation zwischen Komponenten

```
Settings ändert WLAN
      │
      ▼
saveSettings() → localStorage speichern
      │
      ▼
broadcastSettingsChange() → window.dispatchEvent('streamdeck-settings-sync')
      │
      ▼
Header empfängt Event → Liest neue Einstellungen → Aktualisiert WLAN-Icon ✅
Control Center empfängt Event → Aktualisiert Toggles ✅
```

**Einfach erklärt:** Wenn man in den Einstellungen etwas ändert, wird ein "Alarm" ausgelöst. Alle anderen Teile der App hören auf diesen Alarm und aktualisieren sich.

<br/>

---

<br/>

## 🌓 14. Dark Mode & Light Mode

<br/>

### 🔄 Wie funktioniert der Wechsel?

```
1. Toggle in Settings umschalten
      │
      ▼
2. document.documentElement.classList.toggle('light-mode')
      │
      ▼
3. CSS-Regeln greifen:
   html.light-mode .st-ios-card { background: #fff; }      ← Statt dunkelgrau
   html.light-mode .st-ios-label { color: #000; }           ← Statt weiß
   html.light-mode .st-ios-row::after { background: rgba(0,0,0,0.1); } ← Statt weiß
      │
      ▼
4. Jede CSS-Datei hat eigene light-mode Regeln
   → Finder, Terminal, Settings, Changelog, About, Trash, ... alle passen sich an
```

**Einfach erklärt:** Eine einzige CSS-Klasse (`light-mode`) auf dem `<html>`-Element ändert das gesamte Farbschema. Jede Komponente hat CSS-Regeln, die sagen: "Wenn `light-mode` aktiv ist, verwende DIESE Farben statt jener."

<br/>

---

<br/>

## 🔌 15. Die API (api/proxy.js)

<br/>

### 🤔 Warum braucht man einen Proxy?

**Das Problem:** Wenn die Browser-App (Safari) eine externe Website wie `google.com` laden will, blockiert der Browser das. Das nennt sich **CORS** (Cross-Origin Resource Sharing) — eine Sicherheitsmaßnahme.

**Die Lösung:** Ein Proxy-Server auf der eigenen Domain.

```
Ohne Proxy (funktioniert NICHT):
Browser-App → google.com  ❌ CORS-Blockierung!

Mit Proxy (funktioniert):
Browser-App → /api/proxy?url=google.com → Proxy lädt google.com → Ergebnis zurück ✅
```

<br/>

### 🔧 Was macht der Proxy genau?

```javascript
export default async function handler(req, res) {
  // 1. URL aus dem Query-Parameter lesen
  const targetUrl = decodeURIComponent(req.query.url);

  // 2. Die Zielseite laden (serverseitig — kein CORS-Problem!)
  const response = await fetch(targetUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 ...' }  // Tut so als wäre es Safari
  });

  // 3. Wenn es HTML ist:
  if (contentType.includes('text/html')) {
    let html = await response.text();

    // 4. <base>-Tag einfügen (damit relative Links funktionieren)
    html = html.replace(/<head>/, `<head><base href="${basePath}">`);

    // 5. Scrollbalken verstecken (für den macOS-Look)
    html += '<style>::-webkit-scrollbar{display:none}</style>';

    // 6. HTML zurückgeben
    return res.end(html);
  }

  // 7. Wenn es kein HTML ist (Bilder, CSS, JS): Direkt durchreichen
  return res.end(Buffer.from(await response.arrayBuffer()));
}
```

<br/>

---

<br/>

## 🔍 16. SEO & Meta-Tags

<br/>

### 📊 Was steht alles in der index.html?

Die index.html enthält **über 150 Meta-Tags**. Hier die wichtigsten Kategorien:

| Kategorie | Zweck | Beispiel |
|-----------|-------|---------|
| 📌 Basis-Meta | Titel, Beschreibung, Keywords | `<meta name="description" content="...">` |
| 📱 Open Graph | Vorschau auf Facebook, WhatsApp, etc. | `<meta property="og:image" content="/preview.jpg">` |
| 🐦 Twitter Cards | Vorschau auf Twitter/X | `<meta name="twitter:card" content="summary_large_image">` |
| 📚 Dublin Core | Akademische Metadaten | `<meta name="DC.creator" content="plattnericus">` |
| 🤖 Robots | Suchmaschinen-Anweisungen | `<meta name="robots" content="index, follow">` |
| 📊 Schema.org | Strukturierte Daten (JSON-LD) | WebSite, TechArticle, SoftwareApplication, FAQ, HowTo |
| 📱 Apple/MS | App-Verhalten auf iOS/Windows | `<meta name="apple-mobile-web-app-capable" content="yes">` |
| 🎨 Theme | Farben für Browser-Chrome | `<meta name="theme-color" content="#1c1c1e">` |

<br/>

### 🪝 useSEO Hook

```javascript
// Jede Seite kann eigene Meta-Tags setzen:
useSEO({
  title: 'MacOS Tahoe Desktop',
  description: 'Erlebe das macOS Tahoe Liquid Glass Interface...',
  path: '/desktop',
});

// Der Hook aktualisiert automatisch:
// - document.title
// - <meta name="description">
// - <meta property="og:title">
// - <meta property="og:description">
// - <meta property="og:url">
// - <link rel="canonical">
// - Twitter-Tags
```

<br/>

---

<br/>

## 🚢 17. Deployment (Veröffentlichung)

<br/>

### 🔄 Der Deployment-Ablauf

```
📝 Code ändern
    │
    ▼
💾 git commit -m "feat: neue Funktion"
    │
    ▼
📤 git push origin main
    │
    ▼
🔔 GitHub benachrichtigt Vercel
    │
    ▼
🏗️ Vercel baut das Projekt (npm run build)
    │
    ▼
📦 Vercel deployed den dist/ Ordner
    │
    ▼
🛡️ Cloudflare cached und schützt
    │
    ▼
🌐 Website ist live! (~30 Sekunden)
```

<br/>

### ⚙️ vercel.json erklärt

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

**Was bedeutet das?** Alle URLs AUSSER `/api/` werden auf `index.html` umgeleitet. Das ist nötig, weil React Router die Navigation übernimmt. Ohne diesen Rewrite würde z.B. `/desktop` eine 404-Seite zeigen, weil es keine `desktop.html` gibt.

<br/>

---

<br/>

## 🧩 18. Hilfsfunktionen (src/lib/)

<br/>

### 📐 openTab.js — Fenster-Positionierung

```javascript
// Berechnet die zentrierte Position eines neuen Fensters
export function openTab(app, windowWidth, windowHeight) {
  const headerHeight = 28;    // Menüleiste oben: 28px
  const dockHeight = 85;      // Dock unten: 85px
  const usableHeight = windowHeight - headerHeight - dockHeight;

  // Zentriere das Fenster in der nutzbaren Fläche
  app.x = windowWidth / 2 - app.width / 2;
  app.y = headerHeight + usableHeight / 2 - app.height / 2;

  app.open = true;
  app.minimized = false;
  return app;
}
```

**Einfach erklärt:** Berechnet, wo ein Fenster erscheinen soll, damit es genau in der Mitte ist — zwischen Menüleiste und Dock.

<br/>

### 📦 appStore.jsx — App-Verwaltung

Stellt einen React Context bereit mit:
- `apps` — Liste aller Apps mit Status
- `addOrOpenApp(app)` — App hinzufügen oder öffnen. Wenn die App schon existiert, wird sie nach vorne geholt. Wenn nicht, wird sie hinzugefügt.

<br/>

### 🕐 lastOpened.jsx — Zuletzt geöffnet

- Speichert die letzten 10 geöffneten Apps
- Jeder Eintrag hat: Name, Icon, Zeitstempel, Öffnungszähler
- Wird in localStorage persistiert

<br/>

### 🔍 appFilter.js — App-Filter

```javascript
const STANDARD_APPS = ['apps.jsx', 'finder.jsx', 'browser.jsx', 'settings.jsx', 'trash.jsx'];

export function isStandardApp(fileName) {
  return STANDARD_APPS.includes(fileName.toLowerCase());
}
```

Unterscheidet Standard-Apps (die immer im Dock sind) von Apps, die über den App Store installiert wurden.

<br/>

---

<br/>

## 📝 19. Glossar — Wichtige Begriffe

<br/>

| Begriff | Erklärung |
|---------|-----------|
| **Komponente** | Ein wiederverwendbarer Baustein in React. Kann HTML, CSS und Logik enthalten. Beispiel: `<Finder />` |
| **State (Zustand)** | Daten, die sich ändern können. `useState` erstellt einen State. Wenn sich der State ändert, rendert React die Komponente neu. |
| **Props** | Daten, die von einer Eltern-Komponente an eine Kind-Komponente weitergegeben werden. Wie Parameter einer Funktion. |
| **Hook** | Eine spezielle React-Funktion (beginnt mit `use`). Beispiele: `useState`, `useEffect`, `useCallback`, `useRef` |
| **useEffect** | Führt Code aus, wenn die Komponente geladen wird oder sich bestimmte Werte ändern. Beispiel: Timer starten, Daten laden. |
| **useRef** | Speichert einen Wert, der sich ändern kann, OHNE ein Neu-Rendern auszulösen. Oft für DOM-Elemente oder Timer. |
| **useCallback** | Erstellt eine Funktion, die sich nur ändert, wenn bestimmte Abhängigkeiten sich ändern. Verhindert unnötige Neu-Renderings. |
| **useMemo** | Berechnet einen Wert nur neu, wenn sich Abhängigkeiten ändern. Performance-Optimierung. |
| **Context** | Ein Weg, Daten durch den Komponentenbaum zu teilen, ohne Props durch jede Ebene weiterzureichen. |
| **Provider** | Die Komponente, die Context-Daten bereitstellt. Wickelt den Komponentenbaum ein. |
| **JSX** | Eine Syntax-Erweiterung für JavaScript, die HTML-ähnlichen Code ermöglicht: `<div className="box">Hallo</div>` |
| **CSS-Variable** | Ein wiederverwendbarer Wert in CSS. Definiert mit `--name: wert;`, verwendet mit `var(--name)` |
| **backdrop-filter** | CSS-Eigenschaft, die Filter (Unschärfe, Sättigung) auf den Hintergrund HINTER einem Element anwendet |
| **rgba** | Farbformat: Red, Green, Blue, Alpha (Transparenz). `rgba(255, 0, 0, 0.5)` = halbtransparentes Rot |
| **localStorage** | Browser-Speicher für Key-Value-Paare. Überlebt Seitenneuladen und Browser-Neustart. |
| **CORS** | Cross-Origin Resource Sharing. Sicherheitsregel, die Anfragen an andere Domains einschränkt. |
| **Proxy** | Ein Vermittler-Server, der Anfragen im Namen des Clients stellt. Umgeht CORS-Einschränkungen. |
| **Serverless Function** | Eine Funktion, die bei Bedarf auf einem Server ausgeführt wird, ohne dass man einen eigenen Server betreiben muss. |
| **CDN** | Content Delivery Network. Verteilt Dateien weltweit für schnellere Ladezeiten. |
| **DDoS** | Distributed Denial of Service. Ein Angriff, bei dem viele Computer gleichzeitig eine Website überlasten. |
| **HTTPS** | Verschlüsselte Verbindung zwischen Browser und Server. Das Schloss-Symbol in der Adressleiste. |
| **Deployment** | Der Vorgang, eine Website vom eigenen Computer ins Internet zu bringen. |
| **Build** | Der Vorgang, den Quellcode in browser-optimierten Code umzuwandeln (komprimiert, minimiert). |
| **HMR** | Hot Module Replacement. Änderungen am Code erscheinen sofort im Browser, ohne die Seite neu zu laden. |
| **DOM** | Document Object Model. Die Baumstruktur einer HTML-Seite, die JavaScript manipulieren kann. |
| **SVG** | Scalable Vector Graphics. Bilder aus mathematischen Formen (statt Pixeln). Können beliebig vergrößert werden. |
| **JSON** | JavaScript Object Notation. Ein Format zum Speichern und Übertragen von Daten: `{"name": "Felix"}` |
| **API** | Application Programming Interface. Eine Schnittstelle, über die Programme miteinander kommunizieren. |
| **iframe** | Ein HTML-Element, das eine andere Webseite innerhalb der aktuellen Seite anzeigt. |
| **Z-Index** | Bestimmt die Stapelreihenfolge von Elementen. Höherer Wert = weiter oben. |
| **requestAnimationFrame** | Browser-Funktion, die Code 60× pro Sekunde ausführt (synchron mit dem Bildschirm). Ideal für Animationen. |
| **Interpolation** | Mathematische Berechnung von Zwischenwerten. Wird für sanfte Animationen verwendet. |
| **Lerp** | Linear Interpolation. Bewegt einen Wert schrittweise zum Ziel: `current += (target - current) * speed` |

<br/>

---

<br/>

<div align="center">

### 🎓 Zusammenfassung

**Stream Deck DIY** ist eine vollständige macOS-Tahoe-Desktop-Simulation im Browser.

17 React-Komponenten · Liquid Glass CSS · Fenster-Management · Musik-Player · Terminal mit 30+ Befehlen · 3D-Viewer · 3 Sprachen · Komplett clientseitig · Kein Server nötig

<br/>

Gebaut als Abschlussprojekt für **BFS FI 3** von [Felix Plattner](https://github.com/Plattnericus)

<br/>

*Dieses Dokument erklärt über 10.000 Zeilen Code in einfacher Sprache.*

---

**MIT License** · 2026

</div>
