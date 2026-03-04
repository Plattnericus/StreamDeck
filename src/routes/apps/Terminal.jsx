import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Terminal.css';

const colorMap = {
  '0': '#1e1e1e', '1': '#3b82f6', '2': '#22c55e', '3': '#06b6d4',
  '4': '#ef4444', '5': '#a855f7', '6': '#eab308', '7': '#d4d4d4',
  '8': '#6b7280', '9': '#60a5fa', 'a': '#4ade80', 'b': '#67e8f9',
  'c': '#f87171', 'd': '#c084fc', 'e': '#fde047', 'f': '#ffffff',
};

const defaultFs = {
  '~': ['Documents', 'Downloads', 'Desktop', '.bashrc'],
  '~/Documents': ['notes.txt', 'todo.md'],
  '~/Downloads': ['image.png', 'setup.dmg'],
  '~/Desktop': ['project', 'readme.txt'],
  '~/Desktop/project': [],
  '~/Documents/notes.txt': 'Das sind meine Notizen.',
  '~/Documents/todo.md': '# TODO\n- Terminal fertig machen\n- Kaffee trinken',
  '~/Desktop/readme.txt': 'Willkommen auf dem Desktop!',
  '~/.bashrc': 'export PATH="/usr/local/bin:$PATH"\nalias ll="ls -la"',
};

function loadFs() {
  try {
    const saved = localStorage.getItem('terminal-fs');
    if (saved) return JSON.parse(saved);
  } catch {  }
  return JSON.parse(JSON.stringify(defaultFs));
}

function getCommonPrefix(strs) {
  if (strs.length === 0) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].toLowerCase().startsWith(prefix.toLowerCase())) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}

export default function Terminal() {
  const user = 'nexor';
  const hostname = 'MacOS';

  const [lines, setLines] = useState([
    { text: `Welcome to ${hostname} Terminal`, color: '#4ec9b0' },
    { text: 'Type "help" for a list of commands.', color: '#666' },
    { text: '' },
  ]);
  const [input, setInput] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [termColor, setTermColor] = useState('#e2e2e2');
  const [promptColor, setPromptColor] = useState('#4ec9b0');
  const [bgColor, setBgColor] = useState('rgba(18, 18, 22, 0.95)');

  const pathRef = useRef('~');
  const envRef = useRef({});
  const aliasRef = useRef({});
  const fsRef = useRef(loadFs());
  const historyRef = useRef([]);
  const historyIdxRef = useRef(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const linesRef = useRef(lines);
  linesRef.current = lines;

  const saveFs = () => {
    try { localStorage.setItem('terminal-fs', JSON.stringify(fsRef.current)); } catch {  }
  };

  const normalizePath = (p) => {
    if (p === '~' || p === '') return '~';
    let full = p;
    if (!full.startsWith('~')) {
      full = pathRef.current === '~' ? `~/${full}` : `${pathRef.current}/${full}`;
    }
    const parts = full.split('/');
    const stack = [];
    for (const seg of parts) {
      if (seg === '' || seg === '.') continue;
      if (seg === '..') { if (stack.length > 1) stack.pop(); }
      else stack.push(seg);
    }
    if (stack.length === 0) return '~';
    if (stack[0] !== '~') stack.unshift('~');
    return stack.length === 1 ? '~' : stack.join('/');
  };

  const getParent = (p) => { if (p === '~') return '~'; const idx = p.lastIndexOf('/'); return idx <= 0 ? '~' : p.substring(0, idx) || '~'; };
  const getBaseName = (p) => { const idx = p.lastIndexOf('/'); return idx >= 0 ? p.substring(idx + 1) : p; };
  const isDir = (p) => fsRef.current[p] !== undefined && Array.isArray(fsRef.current[p]);

  const scrollDown = useCallback(() => {
    setTimeout(() => { containerRef.current && (containerRef.current.scrollTop = containerRef.current.scrollHeight); }, 0);
    setTimeout(() => { containerRef.current && (containerRef.current.scrollTop = containerRef.current.scrollHeight); }, 50);
  }, []);

  const addLine = useCallback((text, color) => {
    setLines((prev) => [...prev, { text, color }]);
    scrollDown();
  }, [scrollDown]);

  const addImageLine = useCallback((image) => {
    setLines((prev) => [...prev, { text: '', image }]);
    scrollDown();
  }, [scrollDown]);

  const addJsxLine = useCallback((jsx) => {
    setLines((prev) => [...prev, { jsx }]);
    scrollDown();
  }, [scrollDown]);

  const prompt = () => `${user}@${hostname}:${pathRef.current}$ `;

  const getCommands = useCallback(() => {
    const fs = fsRef.current;
    const commands = {
      help: () => [
        '', '   BEFEHLE                 BESCHREIBUNG', '',
        '  help                     Zeigt diese Hilfe an',
        '  clear                    Leert das Terminal',
        '  echo [text]              Gibt Text aus',
        '  echo [text] > [f]        Schreibt Text in Datei',
        '  echo [text] >> [f]       Hängt Text an Datei an',
        '  date                     Zeigt Datum und Uhrzeit',
        '  whoami                   Zeigt den aktuellen Benutzer',
        '  hostname                 Zeigt den Hostnamen',
        '  pwd                      Zeigt das aktuelle Verzeichnis',
        '  cd [pfad]                Wechselt das Verzeichnis',
        '  ls [pfad]                Listet Dateien und Ordner auf',
        '  cat [datei]              Zeigt den Inhalt einer Datei',
        '  mkdir [name]             Erstellt ein neues Verzeichnis',
        '  touch [name]             Erstellt eine leere Datei',
        '  rm [name]                Löscht eine Datei oder Ordner',
        '  mv [a] [b]               Benennt Datei/Ordner um',
        '  cp [a] [b]               Kopiert eine Datei',
        '  find [name]              Sucht Dateien im Dateisystem',
        '  grep [s] [f]             Sucht Text in einer Datei',
        '  head [datei]             Erste Zeile einer Datei',
        '  tail [datei]             Letzte Zeile einer Datei',
        '  uptime                   Laufzeit des Terminals',
        '  uname [-a/-s/-o/-m/-b]   Systeminformationen',
        '  unalias [k]              Entfernt einen Alias',
        '  history                  Befehlshistorie',
        '  rev [text]               Text umkehren',
        '  calc [expr]              Rechner (+, -, *, /)',
        '  color [xy]               Terminal-Farbe ändern (0-f)',
        '  color list               Zeigt alle Farben',
        '  color reset              Setzt Farben zurück',
        '  cowsay [text]            Kuh sagt etwas',
        '  neofetch                 System-Info stylisch',
        '  sudo apt install         Paket installieren',
        '  shutdown                 Terminal beenden',
        '',
      ],
      clear: () => { setLines([]); },
      echo: (_args, full) => {
        const raw = full.replace(/^echo\s*/, '');

        const appendMatch = raw.match(/^(.*)\s*>>\s*(.+)$/);
        const overwriteMatch = !appendMatch && raw.match(/^(.*)\s*>\s*(.+)$/);

        if (appendMatch || overwriteMatch) {
          const isAppend = !!appendMatch;
          const m = isAppend ? appendMatch : overwriteMatch;
          let text = m[1].trim();
          const fileName = m[2].trim();

          if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
            text = text.slice(1, -1);
          }

          const resolved = normalizePath(fileName);
          const parent = getParent(resolved);
          const baseName = getBaseName(resolved);

          if (!isDir(parent)) return `echo: ${fileName}: Verzeichnis existiert nicht`;

          const existing = fs[resolved];
          if (Array.isArray(existing)) return `echo: ${fileName}: Ist ein Verzeichnis`;

          if (isAppend) {
            fs[resolved] = typeof existing === 'string' ? existing + '\n' + text : text;
          } else {
            fs[resolved] = text;
          }

          if (!fs[parent].includes(baseName)) {
            fs[parent].push(baseName);
          }
          saveFs();
          return '';
        }

        let text = raw;
        if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
          text = text.slice(1, -1);
        }
        return text;
      },
      date: () => {
        const d = new Date();
        return d.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + d.toLocaleTimeString('de-DE');
      },
      whoami: () => user,
      hostname: () => hostname,
      pwd: () => pathRef.current,
      cd: (args) => {
        const target = args[0];
        if (!target || target === '~') { pathRef.current = '~'; return; }
        const resolved = normalizePath(target);
        if (isDir(resolved)) { pathRef.current = resolved; return; }
        return `cd: ${target}: Kein solches Verzeichnis`;
      },
      ls: (args) => {
        const target = args[0] ? normalizePath(args[0]) : pathRef.current;
        const dir = fs[target];
        if (!dir || !Array.isArray(dir)) return `ls: ${args[0] || target}: Kein Verzeichnis`;
        if (dir.length === 0) return '';
        return dir.map((item) => {
          const full = target === '~' ? `~/${item}` : `${target}/${item}`;
          return isDir(full) ? `${item}/` : item;
        }).join('  ');
      },
      cat: (args) => {
        if (!args[0]) return 'cat: Dateiname fehlt';
        const resolved = normalizePath(args[0]);
        const content = fs[resolved];
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) return `cat: ${args[0]}: Ist ein Verzeichnis`;
        return `cat: ${args[0]}: Datei nicht gefunden`;
      },
      mkdir: (args) => {
        if (!args[0]) return 'mkdir: Name fehlt';
        const resolved = normalizePath(args[0]);
        if (fs[resolved] !== undefined) return `mkdir: ${args[0]}: Existiert bereits`;
        const parent = getParent(resolved);
        if (!isDir(parent)) return `mkdir: ${getBaseName(parent)}: Übergeordnetes Verzeichnis existiert nicht`;
        fs[resolved] = [];
        fs[parent].push(getBaseName(resolved));
        saveFs();
        return '';
      },
      touch: (args) => {
        if (!args[0]) return 'touch: Name fehlt';
        const resolved = normalizePath(args[0]);
        if (fs[resolved] !== undefined) return '';
        const parent = getParent(resolved);
        if (!isDir(parent)) return `touch: ${getBaseName(parent)}: Verzeichnis existiert nicht`;
        fs[resolved] = '';
        fs[parent].push(getBaseName(resolved));
        saveFs();
        return '';
      },
      rm: (args) => {
        if (!args[0]) return 'rm: Name fehlt';
        const resolved = normalizePath(args[0]);
        if (fs[resolved] === undefined) return `rm: ${args[0]}: Nicht gefunden`;
        if (Array.isArray(fs[resolved]) && fs[resolved].length > 0) return `rm: ${args[0]}: Verzeichnis ist nicht leer (nutze rm -r)`;
        delete fs[resolved];
        const parent = getParent(resolved);
        const name = getBaseName(resolved);
        if (isDir(parent)) fs[parent] = fs[parent].filter((f) => f !== name);
        saveFs();
        return '';
      },
      mv: (args) => {
        if (args.length < 2) return 'mv: Zwei Argumente nötig (mv [quelle] [ziel])';
        const src = normalizePath(args[0]);
        const dest = normalizePath(args[1]);
        if (fs[src] === undefined) return `mv: ${args[0]}: Nicht gefunden`;
        fs[dest] = fs[src]; delete fs[src];
        const srcParent = getParent(src); const srcName = getBaseName(src);
        const destParent = getParent(dest); const destName = getBaseName(dest);
        if (isDir(srcParent)) fs[srcParent] = fs[srcParent].filter((f) => f !== srcName);
        if (isDir(destParent) && !fs[destParent].includes(destName)) fs[destParent].push(destName);
        saveFs();
        return '';
      },
      cp: (args) => {
        if (args.length < 2) return 'cp: Zwei Argumente nötig (cp [quelle] [ziel])';
        const src = normalizePath(args[0]);
        const dest = normalizePath(args[1]);
        if (fs[src] === undefined) return `cp: ${args[0]}: Nicht gefunden`;
        fs[dest] = typeof fs[src] === 'string' ? fs[src] : [...fs[src]];
        const destParent = getParent(dest); const destName = getBaseName(dest);
        if (isDir(destParent) && !fs[destParent].includes(destName)) fs[destParent].push(destName);
        saveFs();
        return '';
      },
      find: (args) => {
        if (!args[0]) return 'find: Suchbegriff fehlt';
        const term = args[0].toLowerCase();
        const results = Object.keys(fs).filter((k) => k.toLowerCase().includes(term));
        return results.length > 0 ? results : [`find: '${args[0]}' nicht gefunden`];
      },
      grep: (args) => {
        if (args.length < 2) return 'grep: Verwendung: grep [suche] [datei]';
        const term = args[0].toLowerCase();
        const resolved = normalizePath(args[1]);
        const content = fs[resolved];
        if (typeof content !== 'string') return `grep: ${args[1]}: Keine Textdatei`;
        const matching = content.split('\n').filter((l) => l.toLowerCase().includes(term));
        return matching.length > 0 ? matching : [`grep: '${args[0]}' nicht gefunden in ${args[1]}`];
      },
      head: (args) => {
        if (!args[0]) return 'head: Dateiname fehlt';
        const content = fs[normalizePath(args[0])];
        if (typeof content !== 'string') return `head: ${args[0]}: Keine Textdatei`;
        return content.split('\n')[0] || '';
      },
      tail: (args) => {
        if (!args[0]) return 'tail: Dateiname fehlt';
        const content = fs[normalizePath(args[0])];
        if (typeof content !== 'string') return `tail: ${args[0]}: Keine Textdatei`;
        const lns = content.split('\n');
        return lns[lns.length - 1] || '';
      },
      wc: (args) => {
        if (!args[0]) return 'wc: Dateiname fehlt';
        const content = fs[normalizePath(args[0])];
        if (typeof content !== 'string') return `wc: ${args[0]}: Keine Textdatei`;
        const l = content.split('\n').length;
        const w = content.split(/\s+/).filter(Boolean).length;
        const c = content.length;
        return `  ${l}  ${w}  ${c}  ${args[0]}`;
      },
      uptime: () => {
        const s = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const m = Math.floor(s / 60);
        const h = Math.floor(m / 60);
        if (h > 0) return `up ${h}h ${m % 60}m ${s % 60}s`;
        if (m > 0) return `up ${m}m ${s % 60}s`;
        return `up ${s}s`;
      },
      uname: (args) => {
        const ua = navigator.userAgent || '';
        const platform = navigator.platform || '';

        const os = (() => {
          if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) return 'macOS';
          if (/Win/i.test(platform) || /Windows/i.test(ua)) {
            const m = ua.match(/Windows NT ([\d.]+)/);
            if (m) {
              const ver = parseFloat(m[1]);
              if (ver >= 10) return 'Windows ' + (ua.includes('Windows NT 10.0') ? '10/11' : m[1]);
              return 'Windows NT ' + m[1];
            }
            return 'Windows';
          }
          if (/Android/i.test(ua)) return 'Android';
          if (/Linux/i.test(platform) || /Linux/i.test(ua)) return 'Linux';
          if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
          if (/CrOS/i.test(ua)) return 'ChromeOS';
          return 'Unknown';
        })();

        const browser = (() => {
          if (/OPR\/|Opera/i.test(ua))    { const m = ua.match(/OPR\/(\S+)/); return 'Opera' + (m ? ' ' + m[1] : ''); }
          if (/Edg\//i.test(ua))           { const m = ua.match(/Edg\/(\S+)/); return 'Edge' + (m ? ' ' + m[1] : ''); }
          if (/Brave/i.test(ua))           return 'Brave';
          if (/Vivaldi/i.test(ua))         { const m = ua.match(/Vivaldi\/(\S+)/); return 'Vivaldi' + (m ? ' ' + m[1] : ''); }
          if (/Firefox\//i.test(ua))       { const m = ua.match(/Firefox\/(\S+)/); return 'Firefox' + (m ? ' ' + m[1] : ''); }
          if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) { const m = ua.match(/Chrome\/(\S+)/); return 'Chrome' + (m ? ' ' + m[1] : ''); }
          if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) { const m = ua.match(/Version\/(\S+)/); return 'Safari' + (m ? ' ' + m[1] : ''); }
          return 'Unknown';
        })();

        const arch = (() => {
          if (/arm64|aarch64/i.test(ua) || /arm64|aarch64/i.test(platform)) return 'arm64';
          if (/arm/i.test(ua)) return 'armv7';
          if (/x86_64|x64|Win64|WOW64|amd64/i.test(ua) || /x86_64/i.test(platform)) return 'x86_64';
          if (/x86|i[3-6]86/i.test(ua)) return 'i686';
          return 'unknown';
        })();

        const kernel = 'Darwin 23.4.0';

        const flag = (args[0] || '').trim();
        if (flag === '-a' || flag === '--all') {
          return `${hostname} ${kernel} ${os} ${arch} ${browser}`;
        }
        if (flag === '-s') return hostname;
        if (flag === '-r') return kernel;
        if (flag === '-m') return arch;
        if (flag === '-o') return os;
        if (flag === '-b') return browser;

        return `${os} – ${browser}`;
      },
      export: (_args, full) => {
        const match = full.match(/^export\s+(\w+)=(.*)$/);
        if (!match) return 'export: Verwendung: export KEY=VALUE';
        envRef.current[match[1]] = match[2];
        return '';
      },
      env: () => {
        const entries = Object.entries(envRef.current);
        if (entries.length === 0) return 'Keine Umgebungsvariablen gesetzt.';
        return entries.map(([k, v]) => `${k}=${v}`);
      },
      alias: (_args, full) => {
        const match = full.match(/^alias\s+(\w+)=["']?(.+?)["']?$/);
        if (!match) {
          const entries = Object.entries(aliasRef.current);
          if (entries.length === 0) return 'Keine Aliase gesetzt.';
          return entries.map(([k, v]) => `alias ${k}='${v}'`);
        }
        aliasRef.current[match[1]] = match[2];
        return '';
      },
      unalias: (args) => {
        if (!args[0]) return 'unalias: Name fehlt';
        if (!aliasRef.current[args[0]]) return `unalias: ${args[0]}: Nicht gefunden`;
        delete aliasRef.current[args[0]];
        return '';
      },
      history: () => historyRef.current.length === 0 ? 'Keine Historie.' : historyRef.current.map((h, i) => `  ${i + 1}  ${h}`),
      rev: (args) => args.length === 0 ? 'rev: Text fehlt' : args.join(' ').split('').reverse().join(''),
      base64: (args) => args.length === 0 ? 'base64: Text fehlt' : btoa(args.join(' ')),
      calc: (args) => {
        if (args.length === 0) return 'calc: Ausdruck fehlt (z.B. calc 2 + 3)';
        const expr = args.join(' ');
        if (!/^[\d\s+\-*/().]+$/.test(expr)) return 'calc: Ungültiger Ausdruck';
        try { return String(Function(`"use strict"; return (${expr})`)()); }
        catch { return 'calc: Fehler beim Berechnen'; }
      },
      cowsay: (args) => {
        const text = args.length > 0 ? args.join(' ') : 'Moo!';
        const border = '─'.repeat(text.length + 2);
        return [
          ` ┌${border}┐`, ` │ ${text} │`, ` └${border}┘`,
          '        \\   ^__^', '         \\  (oo)\\_______',
          '            (__)\\       )\\/\\', '                ||----w |', '                ||     ||',
        ];
      },
      color: (args) => {
        if (!args[0]) return 'color: Verwendung: color [bg][fg] oder color list / color reset';
        if (args[0] === 'list') {
          Object.entries(colorMap).forEach(([k, v]) => {
            addJsxLine(
              <span style={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                {'  '}{k} = {v}{' '}
                <span style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  background: v,
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.2)',
                  verticalAlign: 'middle',
                  marginLeft: 6,
                }} />
              </span>
            );
          });
          return;
        }
        if (args[0] === 'reset') {
          setBgColor('rgba(18, 18, 22, 0.95)');
          setTermColor('#e2e2e2');
          setPromptColor('#4ec9b0');
          return 'Farben zurückgesetzt.';
        }
        const code = args[0].toLowerCase();
        if (code.length === 1) {
          const fg = colorMap[code];
          if (fg) { setTermColor(fg); setPromptColor(fg); return ''; }
          return `color: '${code}' ist keine gültige Farbe (0-f)`;
        }
        if (code.length === 2) {
          const bg = colorMap[code[0]]; const fg = colorMap[code[1]];
          if (bg && fg) { setBgColor(bg); setTermColor(fg); setPromptColor(fg); return ''; }
          return `color: '${code}' ist keine gültige Kombination (0-f)`;
        }
        return 'color: Verwende 1 oder 2 Zeichen (0-f). Beispiel: color a, color 0a';
      },
      neofetch: () => {
        const green = '#4ade80';
        const white = '#d4d4d4';
        const dim = '#888';
        const logo = [
          '                 ,xNMM.',
          '               .OMMMMo',
          '               OMMM0,',
          '     .;loddo:  loolloddol;.',
          '   cKMMMMMMMMMMNWMMMMMMMMMM0:',
          ' .KMMMMMMMMMMMMMMMMMMMMMMMWd.',
          ' XMMMMMMMMMMMMMMMMMMMMMMMX.',
          ';MMMMMMMMMMMMMMMMMMMMMMMM:',
          ':MMMMMMMMMMMMMMMMMMMMMMMM:',
          '.MMMMMMMMMMMMMMMMMMMMMMMMX.',
          ' kMMMMMMMMMMMMMMMMMMMMMMMMWd.',
          ' .XMMMMMMMMMMMMMMMMMMMMMMMMk',
          '  .XMMMMMMMMMMMMMMMMMMMMK.',
          '    kMMMMMMMMMMMMMMMMMMd.',
          '     ;KMMMMMMMWXXWMMMk.',
          '       .cooc,.    .,coo:.',
        ];
        const info = [
          { label: `${user}@${hostname}`, color: green },
          { label: '──────────────────', color: dim },
          { label: 'OS', value: 'macOS Sequoia 15.4', color: white },
          { label: 'Host', value: hostname, color: white },
          { label: 'Kernel', value: 'Darwin 24.4.0', color: white },
          { label: 'Shell', value: 'nexor-sh 1.0', color: white },
          { label: 'Terminal', value: 'Terminal.app', color: white },
          { label: 'CPU', value: 'Apple M4 Pro', color: white },
          { label: 'GPU', value: 'Apple M4 Pro', color: white },
          { label: 'Memory', value: '16384 MiB', color: white },
          { label: '', value: '', color: white },
          { label: 'colors', value: null, color: null },
        ];

        addLine('');
        logo.forEach((logoLine, i) => {
          const infoEntry = info[i];
          if (infoEntry) {
            if (infoEntry.label === 'colors') {
              const colorBlocks = ['#1e1e1e','#ef4444','#22c55e','#eab308','#3b82f6','#a855f7','#06b6d4','#d4d4d4'];
              addJsxLine(
                <span style={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                  <span style={{ color: green }}>{logoLine}</span>
                  {'   '}
                  {colorBlocks.map((c, j) => (
                    <span key={j} style={{
                      display: 'inline-block',
                      width: 14,
                      height: 14,
                      background: c,
                      borderRadius: 2,
                      marginRight: 2,
                      verticalAlign: 'middle',
                      border: c === '#1e1e1e' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    }} />
                  ))}
                </span>
              );
            } else if (infoEntry.value !== undefined && infoEntry.value !== null) {
              addJsxLine(
                <span style={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                  <span style={{ color: green }}>{logoLine}</span>
                  {'   '}
                  <span style={{ color: green, fontWeight: 600 }}>{infoEntry.label}</span>
                  {infoEntry.label && <span style={{ color: dim }}>: </span>}
                  <span style={{ color: infoEntry.color }}>{infoEntry.value}</span>
                </span>
              );
            } else {
              addJsxLine(
                <span style={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                  <span style={{ color: green }}>{logoLine}</span>
                  {'   '}
                  <span style={{ color: infoEntry.color }}>{infoEntry.label}</span>
                </span>
              );
            }
          } else {
            addLine(logoLine, green);
          }
        });
        addLine('');
        return;
      },
      shutdown: () => {
        addLine('Shutting down...', '#ef4444');
        setInputDisabled(true);
      },
      sudo: (args, full) => {
        if (args[0] === 'apt' && args[1] === 'install') {
          const pkg = args[2];
          if (!pkg) return 'E: Kein Paketname angegeben';
          runAptInstall(pkg);
          return;
        }
        if (args.length === 0) return 'sudo: Befehl fehlt';
        const subCmd = args[0].toLowerCase();
        const subArgs = args.slice(1);
        const fn = commands[subCmd];
        if (!fn) return `sudo: ${subCmd}: command not found`;
        return fn(subArgs, full.replace(/^sudo\s+/, ''));
      },
      apt: (args) => {
        if (args[0] === 'install') {
          const pkg = args[1];
          if (!pkg) return 'E: Kein Paketname angegeben';
          runAptInstall(pkg);
          return;
        }
        if (args[0] === 'update') return 'Hit:1 https://archive.ubuntu.com focal InRelease\nReading package lists... Done';
        if (args[0] === 'list') return 'opsec/stable 1.0.0 arm64';
        return 'apt: Verwendung: apt [install|update|list] [paket]';
      },
    };
    return commands;
  }, [addLine, addJsxLine, scrollDown]);

  const runAptInstall = useCallback((pkg) => {
    if (pkg !== 'opsec') {
      addLine(`E: Paket '${pkg}' nicht gefunden`);
      return;
    }
    setInputDisabled(true);
    addLine('Reading package lists... Done', '#888');
    setTimeout(() => addLine('Building dependency tree... Done', '#888'), 300);
    setTimeout(() => addLine('The following NEW packages will be installed:', '#888'), 600);
    setTimeout(() => addLine('  opsec', '#4ade80'), 800);
    setTimeout(() => addLine('0 upgraded, 1 newly installed, 0 to remove.', '#888'), 1000);
    setTimeout(() => addLine('Get:1 https://plattnericus.dev/packages opsec 1.0.0 [2.4 MB]', '#888'), 1300);
    setTimeout(() => addLine('Fetched 2.4 MB in 1s (2.4 MB/s)', '#888'), 1800);
    setTimeout(() => addLine('Setting up opsec (1.0.0) ...', '#888'), 2200);
    setTimeout(() => {
      addLine('opsec installed successfully.', '#4ade80');
      addLine('');
      addImageLine('/opsec.png');
      setInputDisabled(false);
    }, 2800);
  }, [addLine, addImageLine]);

  const runCommand = useCallback((raw) => {
    let full = raw.trim();
    if (!full) return;
    const firstWord = full.split(/\s+/)[0];
    if (aliasRef.current[firstWord]) full = full.replace(firstWord, aliasRef.current[firstWord]);

    const commands = getCommands();

    if (full.includes('|')) {
      const parts = full.split('|').map((p) => p.trim());
      let lastOutput = '';
      for (const part of parts) {
        const pParts = (lastOutput ? `${part} ${lastOutput}` : part).split(/\s+/);
        const name = (pParts.shift() || '').toLowerCase();
        const fn = commands[name];
        if (!fn) return `${name}: command not found`;
        const res = fn(pParts, pParts.join(' '));
        lastOutput = Array.isArray(res) ? res.join('\n') : (res || '');
      }
      return lastOutput;
    }

    const parts = full.split(/\s+/);
    const name = (parts.shift() || '').toLowerCase();
    const args = parts;
    const fn = commands[name];
    if (!fn) return `${name}: command not found`;
    return fn(args, full);
  }, [getCommands]);

  const submit = useCallback(() => {
    const cmd = input;
    addLine(prompt() + cmd);
    if (cmd.trim()) {
      historyRef.current.push(cmd);
      historyIdxRef.current = historyRef.current.length;
    }
    const out = runCommand(cmd);
    if (Array.isArray(out)) out.forEach((l) => addLine(l));
    else if (typeof out === 'string' && out !== '') addLine(out);
    setInput('');
  }, [input, addLine, runCommand]);

  const onKey = useCallback((e) => {
    if (e.key === 'Enter') { e.preventDefault(); submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdxRef.current > 0) { historyIdxRef.current--; setInput(historyRef.current[historyIdxRef.current] ?? ''); }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdxRef.current < historyRef.current.length - 1) { historyIdxRef.current++; setInput(historyRef.current[historyIdxRef.current] ?? ''); }
      else { historyIdxRef.current = historyRef.current.length; setInput(''); }
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const raw = input;
      const parts = raw.split(/\s+/);
      const commands = getCommands();
      if (parts.length <= 1) {
        const partial = (parts[0] || '').toLowerCase();
        if (!partial) return;
        const matches = Object.keys(commands).filter((c) => c.startsWith(partial));
        if (matches.length === 1) setInput(matches[0] + ' ');
        else if (matches.length > 1) {
          addLine(prompt() + input);
          addLine(matches.join('  '));
          const common = getCommonPrefix(matches);
          if (common.length > partial.length) setInput(common);
        }
      } else {
        const partial = parts[parts.length - 1];
        const dir = fsRef.current[pathRef.current];
        if (dir && Array.isArray(dir)) {
          const matches = dir.filter((f) => f.toLowerCase().startsWith(partial.toLowerCase()));
          if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            const resolved = normalizePath(matches[0]);
            setInput(parts.join(' ') + (isDir(resolved) ? '/' : ' '));
          } else if (matches.length > 1) {
            addLine(prompt() + input);
            addLine(matches.join('  '));
            const common = getCommonPrefix(matches);
            if (common.length > partial.length) {
              parts[parts.length - 1] = common;
              setInput(parts.join(' '));
            }
          }
        }
      }
      return;
    }
    if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLines([]); return; }
    if (e.key === 'c' && e.ctrlKey) { e.preventDefault(); addLine(prompt() + input + '^C'); setInput(''); }
  }, [input, submit, addLine, getCommands]);

  const focusInput = () => inputRef.current?.focus();

  useEffect(() => { focusInput(); scrollDown(); }, [scrollDown]);
  useEffect(() => { scrollDown(); }, [lines, scrollDown]);

  return (
    <div className="terminal-wrap" style={{ background: bgColor }}>
      <div
        ref={containerRef}
        role="button"
        tabIndex={0}
        onClick={focusInput}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && focusInput()}
        className="terminal"
        style={{ color: termColor }}
        aria-label="Terminal"
      >
        <div className="terminal-inner">
          {lines.map((line, i) =>
            line.image ? (
              <img key={i} src={line.image} alt="opsec" className="term-image" />
            ) : line.jsx ? (
              <div key={i} className="line">{line.jsx}</div>
            ) : (
              <div key={i} className="line" style={{ color: line.color || termColor }}>{line.text}</div>
            )
          )}
          {!inputDisabled && (
            <div className="input-line">
              <span className="prompt" style={{ color: promptColor }}>{prompt()}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="term-input"
                style={{ color: termColor, caretColor: promptColor }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
