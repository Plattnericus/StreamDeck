<div align="center">

<br/>

<img src="https://streamdeck.plattnericus.dev/preview.jpg" alt="Stream Deck DIY — macOS Tahoe Liquid Glass in React" width="100%" style="border-radius:12px"/>

<br/>
<br/>

# Stream Deck DIY

### macOS Tahoe · Liquid Glass · React · Vite · Node.js

**A fully functional macOS Tahoe Liquid Glass desktop, running entirely in your browser.**  
Build your own Stream Deck — no hardware required. Open source. Free forever.

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-streamdeck.plattnericus.dev-0071e3?style=for-the-badge)](https://streamdeck.plattnericus.dev)
&nbsp;
[![GitHub Stars](https://img.shields.io/github/stars/Plattnericus/StreamDeck?style=for-the-badge&logo=github&color=1c1c1e&labelColor=1c1c1e)](https://github.com/Plattnericus/StreamDeck/stargazers)
&nbsp;
[![MIT License](https://img.shields.io/badge/License-MIT-34c759?style=for-the-badge)](LICENSE)

<br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=000)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=fff)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js_20+-339933?style=flat-square&logo=node.js&logoColor=fff)](https://nodejs.org)
[![Vercel](https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=fff)](https://cloudflare.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br/>

[**→ Open Live Demo**](https://streamdeck.plattnericus.dev) &nbsp;·&nbsp; [**Report Bug**](https://github.com/Plattnericus/StreamDeck/issues) &nbsp;·&nbsp; [**Request Feature**](https://github.com/Plattnericus/StreamDeck/issues) &nbsp;·&nbsp; [**Star on GitHub ⭐**](https://github.com/Plattnericus/StreamDeck)

</div>

---

<br/>

## What is this?

**Stream Deck DIY** is a browser-based project that does two things at once:

**1. It recreates macOS Tahoe's Liquid Glass UI entirely in React.**  
The desktop you see in the browser — windows, dock, menubar, Liquid Glass blur effects, spring animations — is all hand-built in React and CSS. No native APIs. No Electron. Just a browser tab.

**2. It is a fully functional DIY Stream Deck controller.**  
Configure custom buttons, bind them to actions (launch URLs, call APIs, control media) and run your own Stream Deck without buying the Elgato hardware. Everything is JSON-configurable and open source.

This started as a **final school project for BFS FI 3** and grew into a complete, production-deployed application — live at [streamdeck.plattnericus.dev](https://streamdeck.plattnericus.dev).

<br/>

---

<br/>

## Table of Contents

1. [Features](#features)
2. [Screenshots](#screenshots)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running locally](#running-locally)
   - [Building for production](#building-for-production)
6. [How the macOS Tahoe Liquid Glass UI works](#how-the-macos-tahoe-liquid-glass-ui-works)
7. [How the Stream Deck DIY system works](#how-the-stream-deck-diy-system-works)
8. [The Node.js API](#the-nodejs-api)
9. [Deployment](#deployment)
10. [Configuration reference](#configuration-reference)
11. [Contributing](#contributing)
12. [FAQ](#faq)
13. [Roadmap](#roadmap)
14. [License](#license)

<br/>

---

<br/>

## Features

<br/>

### macOS Tahoe Liquid Glass UI

| Feature | Description |
|---|---|
| **Liquid Glass windows** | Authentic translucent frosted-glass surfaces using `backdrop-filter`, CSS variables and layered transparency — matching macOS Tahoe's visual language exactly |
| **Draggable window system** | Move, minimize, maximize and close windows with the real macOS traffic light buttons. Windows stack with z-index management |
| **Animated Dock** | The macOS dock with magnification on hover, bounce animation on launch, and minimize-to-dock |
| **Menubar** | Functional top menubar with clock, dropdowns, system tray icons — pixel-matched to macOS |
| **Dark & Light mode** | Full system-wide theme switch. All components respond to the theme via CSS custom properties |
| **Spring physics animations** | Window open/close, dock magnification and transitions use CSS spring curves to match the feel of the real OS |
| **Responsive** | The entire environment scales to any screen size |

<br/>

### Stream Deck DIY

| Feature | Description |
|---|---|
| **Custom button grid** | Fully configurable n×m button grid — set your own icons, labels, colors and actions |
| **Action system** | Buttons can open URLs, call API endpoints, trigger keyboard shortcuts, control media and more |
| **Plugin architecture** | Write your own plugins in JavaScript / Node.js. Each plugin is a single file in `/api` |
| **JSON config** | Your entire Stream Deck layout is stored as plain JSON — easy to backup, share and version-control |
| **Import / Export** | Download your config as a `.json` file or load someone else's in one click |
| **Live preview** | See your button layout update in real time as you configure it |
| **No hardware required** | Works entirely in the browser. Optional Node.js backend for system-level actions |

<br/>

### Developer experience

| Feature | Description |
|---|---|
| **Vite HMR** | Changes appear in the browser in under 100ms — no full reload |
| **CSS Modules** | Scoped styles per component — no class name collisions |
| **Clean folder structure** | `src/components`, `src/hooks`, `src/pages` — no surprise files in weird places |
| **Vercel serverless** | API routes in `/api` deploy as serverless functions automatically |
| **Zero config deploy** | `git push` → Vercel picks it up → live in 30 seconds |

<br/>

---

<br/>

## Screenshots

> Screenshots are in `static/` — open the live demo to see it in action.

| View | Preview |
|---|---|
| **macOS Tahoe Desktop** | `static/screenshot-desktop.jpg` |
| **Stream Deck Grid** | `static/screenshot-streamdeck.jpg` |
| **Dark Mode** | `static/screenshot-dark.jpg` |
| **Mobile View** | `static/screenshot-mobile.jpg` |

**→ [See the live demo](https://streamdeck.plattnericus.dev)**

<br/>

---

<br/>

## Tech Stack

```
Frontend        React 18 + Vite 5
Styling         CSS Modules + CSS Custom Properties (no Tailwind, no CSS-in-JS)
Backend         Node.js 20  (Vercel Serverless Functions)
Hosting         Vercel
CDN / DNS       Cloudflare (Full Strict SSL, edge caching, DDoS protection)
Language        JavaScript (JSX)
Package manager npm
```

**Why these choices:**

- **React** — component model is a natural fit for a window-based desktop UI
- **Vite** — dramatically faster than CRA or webpack for development. No configuration needed
- **Pure CSS** — Liquid Glass effects require precise control over `backdrop-filter`, `rgba` layers and `mix-blend-mode`. CSS-in-JS or Tailwind would fight against that
- **Vercel Serverless** — the `/api` folder just works. No Express server to maintain, no port to manage
- **Cloudflare** — free DDoS protection, automatic HTTPS, global edge caching, and better PageSpeed scores without any extra work

<br/>

---

<br/>

## Project Structure

```
StreamDeck/
│
├── 📄 index.html              # Vite HTML entry point
│                              # Contains all SEO meta tags, Schema.org JSON,
│                              # Open Graph tags and Google verification
│
├── 📄 vite.config.js          # Vite config (plugins, path aliases)
├── 📄 vercel.json             # Vercel: HTTP headers, rewrites for React Router
├── 📄 jsconfig.json           # JS path aliases (@/ → src/)
├── 📄 package.json            # Dependencies and npm scripts
│
├── 📁 api/                    # Node.js serverless functions
│   │                          # Each .js file = one API endpoint at /api/filename
│   └── ...
│
├── 📁 src/                    # React application
│   │
│   ├── 📄 main.jsx            # React root — renders <App /> into #root
│   │
│   ├── 📁 components/         # Reusable UI components
│   │   ├── Window/            # macOS window with traffic lights, drag, resize
│   │   ├── Dock/              # Animated macOS dock with magnification
│   │   ├── Menubar/           # Top menubar, clock, system tray
│   │   └── StreamDeck/        # Button grid, action handler, config editor
│   │
│   ├── 📁 hooks/              # Custom React hooks
│   │   └── useSEO.js          # Sets meta tags per-page (title, description, OG)
│   │
│   ├── 📁 pages/              # Top-level route components
│   └── 📁 styles/             # Global CSS, CSS variables, Liquid Glass mixins
│
└── 📁 static/                 # Static public files (served at root /)
    ├── robots.txt             # Crawler permissions (Google, ChatGPT, Claude, Perplexity...)
    ├── sitemap.xml            # XML sitemap for Google Search Console
    └── preview.jpg            # OG image shown by Google, ChatGPT, social media (1200×630px)
```

<br/>

---

<br/>

## Getting Started

### Prerequisites

| Tool | Required version | Check | Install |
|---|---|---|---|
| **Node.js** | `18.0.0` or higher | `node --version` | [nodejs.org](https://nodejs.org) |
| **npm** | `9.0.0` or higher | `npm --version` | comes with Node.js |
| **Git** | any | `git --version` | [git-scm.com](https://git-scm.com) |

<br/>

### Installation

**Clone the repo:**
```sh
git clone https://github.com/Plattnericus/StreamDeck.git
cd StreamDeck
```

**Install dependencies:**
```sh
npm install
```

No `.env` file needed. No API keys. It just works out of the box.

<br/>

### Running locally

```sh
npm run dev
```

Vite starts at **[http://localhost:5173](http://localhost:5173)** with full Hot Module Replacement.  
Every file save reflects in the browser in under 100ms.

**To also run the Node.js API locally** (needed for system actions like launching apps):
```sh
# Install the Vercel CLI once
npm install -g vercel

# Run frontend + API together
vercel dev
```
This starts everything at `http://localhost:3000`.

<br/>

### Building for production

```sh
npm run build
```

Output goes to `dist/`. Preview the production build locally:
```sh
npm run preview
```

<br/>

---

<br/>

## How the macOS Tahoe Liquid Glass UI works

macOS Tahoe's design language — called **Liquid Glass** — is Apple's newest visual system. It replaces solid surfaces with translucent, fluid glass panels that blur and tint the content behind them, adapting dynamically to any background color.

Rebuilding this in a browser requires three techniques working together:

<br/>

**1. The glass surface itself**

```css
.window {
  /* The core glass look: */
  background: rgba(255, 255, 255, 0.12);   /* barely-there white fill */
  backdrop-filter: blur(40px) saturate(180%);   /* blurs + saturates what's behind */
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 0.5px solid rgba(255, 255, 255, 0.25); /* subtle white rim */
  border-radius: 12px;
}
```

`backdrop-filter` is the key. It applies the blur to everything *behind* the element — so the glass surface feels real and reacts to whatever's underneath it.

<br/>

**2. CSS Custom Properties for theming**

All glass values are exposed as CSS variables so the entire UI theme-switches cleanly:

```css
:root {
  --glass-bg:          rgba(255, 255, 255, 0.12);
  --glass-blur:        blur(40px) saturate(180%);
  --glass-border:      rgba(255, 255, 255, 0.25);
  --glass-shadow:      0 8px 32px rgba(0, 0, 0, 0.18);

  --dock-bg:           rgba(255, 255, 255, 0.18);
  --menubar-bg:        rgba(255, 255, 255, 0.72);

  --text-primary:      rgba(0, 0, 0, 0.85);
  --text-secondary:    rgba(0, 0, 0, 0.45);
}

[data-theme="dark"] {
  --glass-bg:          rgba(30, 30, 30, 0.55);
  --glass-border:      rgba(255, 255, 255, 0.12);
  --glass-shadow:      0 8px 32px rgba(0, 0, 0, 0.45);
  --menubar-bg:        rgba(28, 28, 28, 0.72);
  --text-primary:      rgba(255, 255, 255, 0.88);
  --text-secondary:    rgba(255, 255, 255, 0.42);
}
```

<br/>

**3. The window manager (React hooks)**

Windows are React components with state managed by a custom `useWindowManager` hook. Each window has:

```js
{
  id: 'finder',
  title: 'Finder',
  position: { x: 120, y: 80 },   // draggable via mouse events
  size:     { w: 780, h: 520 },   // resizable
  zIndex: 3,                       // which window is "on top"
  minimized: false,
  maximized: false,
}
```

Dragging uses `onMouseDown` → `onMouseMove` → `onMouseUp` events on the window chrome. The window position updates directly in state — no libraries.

<br/>

**4. The Dock magnification**

The dock icon magnification effect is pure CSS using `transform: scale()` with a custom cubic-bezier that matches Apple's spring curve:

```css
.dock-icon {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.dock-icon:hover {
  transform: scale(1.6);
}
/* Neighbour icons get progressively smaller magnification using :has() selectors */
```

<br/>

---

<br/>

## How the Stream Deck DIY system works

The Stream Deck is a configurable button grid where each button is bound to an **action**. Actions are handled client-side (URL opens, state changes) or via the Node.js API (system-level commands).

<br/>

**Button configuration format:**

```json
{
  "grid": { "cols": 5, "rows": 3 },
  "buttons": [
    {
      "id": "b1",
      "position": { "col": 0, "row": 0 },
      "icon": "🎵",
      "label": "Spotify",
      "color": "#1DB954",
      "action": {
        "type": "url",
        "value": "https://open.spotify.com"
      }
    },
    {
      "id": "b2",
      "position": { "col": 1, "row": 0 },
      "icon": "💻",
      "label": "VS Code",
      "action": {
        "type": "api",
        "endpoint": "/api/launch",
        "payload": { "app": "vscode" }
      }
    },
    {
      "id": "b3",
      "position": { "col": 2, "row": 0 },
      "icon": "🔊",
      "label": "Volume Up",
      "action": {
        "type": "api",
        "endpoint": "/api/volume",
        "payload": { "delta": 10 }
      }
    }
  ]
}
```

<br/>

**Supported action types:**

| Type | What it does | Example |
|---|---|---|
| `url` | Opens a URL in a new tab | Open Spotify, YouTube, any link |
| `api` | Calls a `/api/*` endpoint with a POST request | Launch app, change volume |
| `key` | Sends a keyboard shortcut (via browser API) | Cmd+Tab, media keys |
| `js` | Runs an inline JavaScript expression | Custom logic, state changes |

<br/>

**How a button press flows:**

```
User clicks button
       ↓
React onClick handler fires
       ↓
action.type === 'url'  →  window.open(action.value)
action.type === 'api'  →  fetch('/api/' + action.endpoint, { method: 'POST', body: ... })
action.type === 'key'  →  dispatchEvent(new KeyboardEvent(...))
action.type === 'js'   →  eval(action.expression)   (sandboxed)
```

<br/>

---

<br/>

## The Node.js API

The `/api` folder contains Vercel Serverless Functions. Each JavaScript file in that folder becomes a live HTTP endpoint.

**Example — `/api/launch.js`:**

```js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { app } = req.body

  const apps = {
    spotify:  'open -a Spotify',
    vscode:   'open -a "Visual Studio Code"',
    terminal: 'open -a Terminal',
  }

  if (!apps[app]) {
    return res.status(400).json({ error: `Unknown app: ${app}` })
  }

  // On a real server: exec(apps[app])
  // On Vercel serverless: return the command for the client to handle
  return res.status(200).json({ success: true, command: apps[app] })
}
```

**Adding your own API endpoint:**

1. Create `/api/myaction.js`
2. Export a default handler function
3. Deploy — Vercel auto-detects it and creates `/api/myaction`
4. Call it from React: `fetch('/api/myaction', { method: 'POST', body: JSON.stringify({...}) })`

<br/>

---

<br/>

## Deployment

### Vercel (production)

The project is built for zero-configuration Vercel deployment.

**First deploy:**
1. Push your fork to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → import your repository
3. Vercel auto-detects Vite → no settings to change
4. Click **Deploy**

**Every subsequent deploy:**
```sh
git push origin main
# That's it. Vercel redeploys automatically.
```

**Add your custom domain:**
1. Vercel Dashboard → your project → Settings → Domains
2. Add `streamdeck.plattnericus.dev`
3. Vercel gives you: `CNAME → cname.vercel-dns.com`
4. Add that record in Cloudflare (see below)

<br/>

### Cloudflare (DNS + CDN)

```
DNS Record:
  Type:    CNAME
  Name:    streamdeck
  Target:  cname.vercel-dns.com
  Proxy:   ON  ← the orange cloud must be active
```

**Recommended Cloudflare settings:**

| Section | Setting | Value |
|---|---|---|
| SSL/TLS | Mode | **Full (strict)** |
| SSL/TLS → Edge Certificates | Always Use HTTPS | **On** |
| SSL/TLS → Edge Certificates | HSTS | **Enable** (max-age: 6 months) |
| Caching | Browser Cache TTL | **1 year** |
| Speed → Optimization | Auto Minify | **JS + CSS + HTML → all on** |
| Analytics | Web Analytics | **Enable** (free, no cookies) |

<br/>

---

<br/>

## Configuration reference

### `vercel.json`

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Robots-Tag",           "value": "index, follow" },
        { "key": "X-Frame-Options",         "value": "DENY" },
        { "key": "X-Content-Type-Options",  "value": "nosniff" },
        { "key": "Referrer-Policy",         "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

> The `rewrites` block is critical — without it, refreshing any route other than `/` returns a 404.

<br/>

### `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' }
  }
})
```

<br/>

### `jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

<br/>

---

<br/>

## Contributing

All contributions are welcome — bug fixes, new Stream Deck actions, UI improvements, documentation.

**How to contribute:**

```sh
# 1. Fork this repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/StreamDeck.git
cd StreamDeck

# 3. Create a branch
git checkout -b feature/your-feature-name

# 4. Make your changes, then commit
git add .
git commit -m "feat: describe what you did"

# 5. Push and open a Pull Request
git push origin feature/your-feature-name
```

**Commit convention:**

| Prefix | When to use |
|---|---|
| `feat:` | New feature or component |
| `fix:` | Bug fix |
| `docs:` | README or documentation change |
| `style:` | CSS / visual change, no logic change |
| `refactor:` | Code restructure without behaviour change |
| `chore:` | Config files, dependencies, tooling |

For larger changes, please **open an Issue first** to discuss the approach before building it.

<br/>

---

<br/>

## FAQ

<br/>

**Does this work on mobile?**  
Yes. The layout is fully responsive. The Stream Deck grid and the macOS Liquid Glass dock both adapt to smaller screens. The window dragging works with touch events too.

<br/>

**Is this affiliated with Elgato or Apple?**  
No. This is a completely independent open source project. "Stream Deck" refers to the DIY concept. This project has no affiliation with Elgato, Corsair or Apple.

<br/>

**Do I need an actual Stream Deck device?**  
No. Everything runs in the browser. The physical hardware integration is optional — the system works as a standalone web app.

<br/>

**Why Vite and not Next.js?**  
This is a client-side application with a separate serverless API. There is no need for server-side rendering. Vite is significantly faster for development and produces smaller, faster builds for this use case.

<br/>

**Why vanilla CSS and not Tailwind?**  
The macOS Tahoe Liquid Glass effects require very specific control over `backdrop-filter`, layered `rgba` values and `mix-blend-mode`. Utility-class frameworks work against this — they make it hard to express the precise, layered glass surfaces that macOS uses.

<br/>

**Can I use this code in my own project?**  
Yes. The project is MIT licensed. Use it for anything — personal projects, commercial products, school work. You don't need to ask. Just keep the license file.

<br/>

**The glass effect doesn't look right in my browser.**  
`backdrop-filter` requires hardware acceleration and is not supported in all browsers. It works in Chrome, Edge, Safari and Firefox (with a flag on older versions). Make sure your browser is up to date.

<br/>

---

<br/>

## Roadmap

**Done**
- [x] macOS Tahoe Liquid Glass window system
- [x] Draggable, stackable windows
- [x] Animated dock with magnification
- [x] macOS menubar with clock and dropdowns
- [x] Dark / light mode
- [x] Stream Deck button grid
- [x] JSON button config system
- [x] Node.js API backend (Vercel Serverless)
- [x] Production deployment on Vercel + Cloudflare

**Coming next**
- [ ] Stream Deck button editor — configure buttons visually in the UI
- [ ] More built-in action types (keyboard shortcuts, clipboard, media control)
- [ ] macOS Tahoe notification center
- [ ] Widget system (weather, clock, calendar on the desktop)
- [ ] WebSocket bridge for real Elgato Stream Deck hardware
- [ ] Mobile-optimized Stream Deck view for phone use
- [ ] Plugin marketplace — share your button configs and API plugins
- [ ] Multi-window workspace layouts
- [ ] User config sync via URL (shareable Stream Deck configs)

<br/>

---

<br/>

## License

```
MIT License

Copyright (c) 2026 plattnericus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

See [LICENSE](LICENSE) for the full text.

<br/>

---

<br/>

<div align="center">

Built as a final school project for **BFS FI 3** by [plattnericus](https://github.com/Plattnericus)

<br/>

**[streamdeck.plattnericus.dev](https://streamdeck.plattnericus.dev)**

<br/>

*Like this project? Give it a ⭐ — it helps other developers find it.*

</div>