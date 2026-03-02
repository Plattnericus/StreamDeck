<script lang="ts">
  import { onMount } from "svelte";
  import { appStore } from "$lib/appStore";

  type Line = { text: string; color?: string; image?: string };
  type Cmd = (args: string[], full: string) => string | string[] | void;

  let user = "nexor";
  let hostname = "MacOS";
  let path = "~";
  let env: Record<string, string> = {};
  let aliases: Record<string, string> = {};
  let termColor = "#e2e2e2";
  let promptColor = "#4ec9b0";
  let bgColor = "rgba(18, 18, 22, 0.95)";

  const colorMap: Record<string, string> = {
    "0": "#1e1e1e", "1": "#3b82f6", "2": "#22c55e", "3": "#06b6d4",
    "4": "#ef4444", "5": "#a855f7", "6": "#eab308", "7": "#d4d4d4",
    "8": "#6b7280", "9": "#60a5fa", "a": "#4ade80", "b": "#67e8f9",
    "c": "#f87171", "d": "#c084fc", "e": "#fde047", "f": "#ffffff",
  };

  let lines: Line[] = [
    { text: `Welcome to ${hostname} Terminal`, color: "#4ec9b0" },
    { text: 'Type "help" for a list of commands.', color: "#666" },
    { text: "" },
  ];
  let inputDisabled = false;
  let input = "";
  let history: string[] = [];
  let historyIndex = -1;
  let container: HTMLDivElement;
  let inputEl: HTMLInputElement;

  const defaultFs: Record<string, string[] | string> = {
    "~": ["Documents", "Downloads", "Desktop", ".bashrc"],
    "~/Documents": ["notes.txt", "todo.md"],
    "~/Downloads": ["image.png", "setup.dmg"],
    "~/Desktop": ["project", "readme.txt"],
    "~/Desktop/project": [],
    "~/Documents/notes.txt": "Das sind meine Notizen.",
    "~/Documents/todo.md": "# TODO\n- Terminal fertig machen\n- Kaffee trinken",
    "~/Desktop/readme.txt": "Willkommen auf dem Desktop!",
    "~/.bashrc": 'export PATH="/usr/local/bin:$PATH"\nalias ll="ls -la"',
  };

  function loadFs(): Record<string, string[] | string> {
    try {
      const saved = localStorage.getItem("terminal-fs");
      if (saved) return JSON.parse(saved);
    } catch {}
    return JSON.parse(JSON.stringify(defaultFs));
  }

  function saveFs() {
    try {
      localStorage.setItem("terminal-fs", JSON.stringify(fs));
    } catch {}
  }

  let fs: Record<string, string[] | string> = loadFs();

  function normalizePath(p: string): string {
    if (p === "~" || p === "") return "~";
    let full = p;
    if (!full.startsWith("~")) {
      full = path === "~" ? `~/${full}` : `${path}/${full}`;
    }
    const parts = full.split("/");
    const stack: string[] = [];
    for (const seg of parts) {
      if (seg === "" || seg === ".") continue;
      if (seg === "..") {
        if (stack.length > 1) stack.pop();
      } else {
        stack.push(seg);
      }
    }
    if (stack.length === 0) return "~";
    if (stack[0] !== "~") stack.unshift("~");
    return stack.length === 1 ? "~" : stack.join("/");
  }

  function getParent(p: string): string {
    if (p === "~") return "~";
    const idx = p.lastIndexOf("/");
    if (idx <= 0) return "~";
    return p.substring(0, idx) || "~";
  }

  function getBaseName(p: string): string {
    const idx = p.lastIndexOf("/");
    return idx >= 0 ? p.substring(idx + 1) : p;
  }

  function isDir(p: string): boolean {
    return fs[p] !== undefined && Array.isArray(fs[p]);
  }

  const commands: Record<string, Cmd> = {
    help: () => [
      "",
      "  BEFEHL          BESCHREIBUNG",
      "",
      "  help             Zeigt diese Hilfe an",
      "  clear            Leert das Terminal",
      "  echo [text]      Gibt Text aus",
      "  date             Zeigt Datum und Uhrzeit",
      "  whoami           Zeigt den aktuellen Benutzer",
      "  hostname         Zeigt den Hostnamen",
      "  pwd              Zeigt das aktuelle Verzeichnis",
      "  cd [pfad]        Wechselt das Verzeichnis (cd .. / cd ~)",
      "  ls [pfad]        Listet Dateien und Ordner auf",
      "  cat [datei]      Zeigt den Inhalt einer Datei",
      "  mkdir [name]     Erstellt ein neues Verzeichnis",
      "  touch [name]     Erstellt eine leere Datei",
      "  rm [name]        Löscht eine Datei oder Ordner",
      "  mv [a] [b]       Benennt Datei/Ordner um",
      "  cp [a] [b]       Kopiert eine Datei",
      "  find [name]      Sucht Dateien im Dateisystem",
      "  grep [s] [f]     Sucht Text in einer Datei",
      "  head [datei]     Erste Zeile einer Datei",
      "  tail [datei]     Letzte Zeile einer Datei",
      "  wc [datei]       Zählt Zeilen, Wörter, Zeichen",
      "  uptime           Laufzeit des Terminals",
      "  uname            Systeminformationen",
      "  export K=V       Setzt eine Umgebungsvariable",
      "  env              Zeigt Umgebungsvariablen",
      "  alias k=v        Alias für einen Befehl",
      "  unalias [k]      Entfernt einen Alias",
      "  history          Befehlshistorie",
      "  rev [text]       Text umkehren",
      "  base64 [text]    Text in Base64 kodieren",
      "  calc [expr]      Rechner (+, -, *, /)",
      "  color [xy]       Terminal-Farbe ändern (0-f)",
      "  color list       Zeigt alle Farben",
      "  color reset      Setzt Farben zurück",
      "  cowsay [text]    Kuh sagt etwas",
      "  neofetch         System-Info stylisch",
      "  sudo apt install  Paket installieren",
      "  shutdown          Terminal beenden",
      "",
    ],

    clear: () => { lines = []; },

    echo: (args) => args.join(" "),

    date: () => {
      const d = new Date();
      return d.toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) + " " + d.toLocaleTimeString("de-DE");
    },

    whoami: () => user,

    hostname: () => hostname,

    pwd: () => path,

    cd: (args) => {
      const target = args[0];
      if (!target || target === "~") { path = "~"; return; }
      const resolved = normalizePath(target);
      if (isDir(resolved)) { path = resolved; return; }
      return `cd: ${target}: Kein solches Verzeichnis`;
    },

    ls: (args) => {
      const target = args[0] ? normalizePath(args[0]) : path;
      const dir = fs[target];
      if (!dir || !Array.isArray(dir)) return `ls: ${args[0] || target}: Kein Verzeichnis`;
      if (dir.length === 0) return "";
      return dir.map(item => {
        const full = target === "~" ? `~/${item}` : `${target}/${item}`;
        return isDir(full) ? `${item}/` : item;
      }).join("  ");
    },

    cat: (args) => {
      if (!args[0]) return "cat: Dateiname fehlt";
      const resolved = normalizePath(args[0]);
      const content = fs[resolved];
      if (typeof content === "string") return content;
      if (Array.isArray(content)) return `cat: ${args[0]}: Ist ein Verzeichnis`;
      return `cat: ${args[0]}: Datei nicht gefunden`;
    },

    mkdir: (args) => {
      if (!args[0]) return "mkdir: Name fehlt";
      const resolved = normalizePath(args[0]);
      if (fs[resolved] !== undefined) return `mkdir: ${args[0]}: Existiert bereits`;
      const parent = getParent(resolved);
      if (!isDir(parent)) return `mkdir: ${getBaseName(parent)}: Übergeordnetes Verzeichnis existiert nicht`;
      fs[resolved] = [];
      (fs[parent] as string[]).push(getBaseName(resolved));
      saveFs();
      return "";
    },

    touch: (args) => {
      if (!args[0]) return "touch: Name fehlt";
      const resolved = normalizePath(args[0]);
      if (fs[resolved] !== undefined) return "";
      const parent = getParent(resolved);
      if (!isDir(parent)) return `touch: ${getBaseName(parent)}: Verzeichnis existiert nicht`;
      fs[resolved] = "";
      (fs[parent] as string[]).push(getBaseName(resolved));
      saveFs();
      return "";
    },

    rm: (args) => {
      if (!args[0]) return "rm: Name fehlt";
      const resolved = normalizePath(args[0]);
      if (fs[resolved] === undefined) return `rm: ${args[0]}: Nicht gefunden`;
      if (Array.isArray(fs[resolved]) && (fs[resolved] as string[]).length > 0) return `rm: ${args[0]}: Verzeichnis ist nicht leer (nutze rm -r)`;
      delete fs[resolved];
      const parent = getParent(resolved);
      const name = getBaseName(resolved);
      if (isDir(parent)) {
        fs[parent] = (fs[parent] as string[]).filter(f => f !== name);
      }
      saveFs();
      return "";
    },

    mv: (args) => {
      if (args.length < 2) return "mv: Zwei Argumente nötig (mv [quelle] [ziel])";
      const src = normalizePath(args[0]);
      const dest = normalizePath(args[1]);
      if (fs[src] === undefined) return `mv: ${args[0]}: Nicht gefunden`;
      fs[dest] = fs[src];
      delete fs[src];
      const srcParent = getParent(src);
      const srcName = getBaseName(src);
      const destParent = getParent(dest);
      const destName = getBaseName(dest);
      if (isDir(srcParent)) {
        fs[srcParent] = (fs[srcParent] as string[]).filter(f => f !== srcName);
      }
      if (isDir(destParent) && !(fs[destParent] as string[]).includes(destName)) {
        (fs[destParent] as string[]).push(destName);
      }
      saveFs();
      return "";
    },

    cp: (args) => {
      if (args.length < 2) return "cp: Zwei Argumente nötig (cp [quelle] [ziel])";
      const src = normalizePath(args[0]);
      const dest = normalizePath(args[1]);
      if (fs[src] === undefined) return `cp: ${args[0]}: Nicht gefunden`;
      fs[dest] = typeof fs[src] === "string" ? fs[src] : [...(fs[src] as string[])];
      const destParent = getParent(dest);
      const destName = getBaseName(dest);
      if (isDir(destParent) && !(fs[destParent] as string[]).includes(destName)) {
        (fs[destParent] as string[]).push(destName);
      }
      saveFs();
      return "";
    },

    find: (args) => {
      if (!args[0]) return "find: Suchbegriff fehlt";
      const term = args[0].toLowerCase();
      const results: string[] = [];
      for (const key of Object.keys(fs)) {
        if (key.toLowerCase().includes(term)) results.push(key);
      }
      return results.length > 0 ? results : [`find: '${args[0]}' nicht gefunden`];
    },

    grep: (args) => {
      if (args.length < 2) return "grep: Verwendung: grep [suche] [datei]";
      const term = args[0].toLowerCase();
      const resolved = normalizePath(args[1]);
      const content = fs[resolved];
      if (typeof content !== "string") return `grep: ${args[1]}: Keine Textdatei`;
      const matching = content.split("\n").filter(l => l.toLowerCase().includes(term));
      return matching.length > 0 ? matching : [`grep: '${args[0]}' nicht gefunden in ${args[1]}`];
    },

    head: (args) => {
      if (!args[0]) return "head: Dateiname fehlt";
      const resolved = normalizePath(args[0]);
      const content = fs[resolved];
      if (typeof content !== "string") return `head: ${args[0]}: Keine Textdatei`;
      return content.split("\n")[0] || "";
    },

    tail: (args) => {
      if (!args[0]) return "tail: Dateiname fehlt";
      const resolved = normalizePath(args[0]);
      const content = fs[resolved];
      if (typeof content !== "string") return `tail: ${args[0]}: Keine Textdatei`;
      const lns = content.split("\n");
      return lns[lns.length - 1] || "";
    },

    wc: (args) => {
      if (!args[0]) return "wc: Dateiname fehlt";
      const resolved = normalizePath(args[0]);
      const content = fs[resolved];
      if (typeof content !== "string") return `wc: ${args[0]}: Keine Textdatei`;
      const l = content.split("\n").length;
      const w = content.split(/\s+/).filter(Boolean).length;
      const c = content.length;
      return `  ${l}  ${w}  ${c}  ${args[0]}`;
    },

    uptime: () => {
      const s = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(s / 60);
      const h = Math.floor(m / 60);
      if (h > 0) return `up ${h}h ${m % 60}m ${s % 60}s`;
      if (m > 0) return `up ${m}m ${s % 60}s`;
      return `up ${s}s`;
    },

    uname: () => `${hostname} Darwin 23.4.0 arm64`,

    export: (_args, full) => {
      const match = full.match(/^export\s+(\w+)=(.*)$/);
      if (!match) return "export: Verwendung: export KEY=VALUE";
      env[match[1]] = match[2];
      return "";
    },

    env: () => {
      const entries = Object.entries(env);
      if (entries.length === 0) return "Keine Umgebungsvariablen gesetzt.";
      return entries.map(([k, v]) => `${k}=${v}`);
    },

    alias: (_args, full) => {
      const match = full.match(/^alias\s+(\w+)=["']?(.+?)["']?$/);
      if (!match) {
        const entries = Object.entries(aliases);
        if (entries.length === 0) return "Keine Aliase gesetzt.";
        return entries.map(([k, v]) => `alias ${k}='${v}'`);
      }
      aliases[match[1]] = match[2];
      return "";
    },

    unalias: (args) => {
      if (!args[0]) return "unalias: Name fehlt";
      if (!aliases[args[0]]) return `unalias: ${args[0]}: Nicht gefunden`;
      delete aliases[args[0]];
      return "";
    },

    history: () => history.length === 0 ? "Keine Historie." : history.map((h, i) => `  ${i + 1}  ${h}`),

    rev: (args) => {
      if (args.length === 0) return "rev: Text fehlt";
      return args.join(" ").split("").reverse().join("");
    },

    base64: (args) => {
      if (args.length === 0) return "base64: Text fehlt";
      return btoa(args.join(" "));
    },

    calc: (args) => {
      if (args.length === 0) return "calc: Ausdruck fehlt (z.B. calc 2 + 3)";
      const expr = args.join(" ");
      if (!/^[\d\s+\-*/().]+$/.test(expr)) return "calc: Ungültiger Ausdruck";
      try {
        const result = Function(`"use strict"; return (${expr})`)();
        return String(result);
      } catch {
        return "calc: Fehler beim Berechnen";
      }
    },

    cowsay: (args) => {
      const text = args.length > 0 ? args.join(" ") : "Moo!";
      const border = "─".repeat(text.length + 2);
      return [
        ` ┌${border}┐`,
        ` │ ${text} │`,
        ` └${border}┘`,
        "        \\   ^__^",
        "         \\  (oo)\\_______",
        "            (__)\\       )\\/\\",
        "                ||----w |",
        "                ||     ||",
      ];
    },

    color: (args) => {
      if (!args[0]) return "color: Verwendung: color [bg][fg] oder color list / color reset";
      if (args[0] === "list") {
        return Object.entries(colorMap).map(([k, v]) => `  ${k} = ${v}`);
      }
      if (args[0] === "reset") {
        bgColor = "rgba(18, 18, 22, 0.95)";
        termColor = "#e2e2e2";
        promptColor = "#4ec9b0";
        return "Farben zurückgesetzt.";
      }
      const code = args[0].toLowerCase();
      if (code.length === 1) {
        const fg = colorMap[code];
        if (fg) { termColor = fg; promptColor = fg; return ""; }
        return `color: '${code}' ist keine gültige Farbe (0-f)`;
      }
      if (code.length === 2) {
        const bg = colorMap[code[0]];
        const fg = colorMap[code[1]];
        if (bg && fg) { bgColor = bg; termColor = fg; promptColor = fg; return ""; }
        return `color: '${code}' ist keine gültige Kombination (0-f)`;
      }
      return "color: Verwende 1 oder 2 Zeichen (0-f). Beispiel: color a, color 0a";
    },

    neofetch: () => [
      "",
      `         .:'          ${user}@${hostname}`,
      `     __ :'__          ──────────────────`,
      `  .'  \\   /  '.      OS: macOS Sequoia`,
      ` :  .  > <  .  :     Host: ${hostname}`,
      `  '.  /   \\  .'      Kernel: Darwin 23.4.0`,
      `    '.___.'          Shell: nexor-sh`,
      `                     Terminal: Terminal.app`,
      `                     CPU: Apple Silicon`,
      `                     Memory: 16 GB`,
      "",
    ],

    shutdown: () => {
      addLine("Shutting down...", "#ef4444");
      inputDisabled = true;
      setTimeout(() => {
        appStore.update(apps =>
          apps.map(a => a.name === "Terminal" || a.name.startsWith("Terminal \u2014")
            ? { ...a, open: false, name: "Terminal" }
            : a
          )
        );
      }, 800);
    },

    sudo: (args, full) => {
      if (args[0] === "apt" && args[1] === "install") {
        const pkg = args[2];
        if (!pkg) return "E: Kein Paketname angegeben";
        return runAptInstall(pkg, args.includes("-y"));
      }
      if (args.length === 0) return "sudo: Befehl fehlt";
      const subCmd = args[0].toLowerCase();
      const subArgs = args.slice(1);
      const fn = commands[subCmd];
      if (!fn) return `sudo: ${subCmd}: command not found`;
      return fn(subArgs, full.replace(/^sudo\s+/, ""));
    },

    apt: (args) => {
      if (args[0] === "install") {
        const pkg = args[1];
        if (!pkg) return "E: Kein Paketname angegeben";
        return runAptInstall(pkg, args.includes("-y"));
      }
      if (args[0] === "update") return "Hit:1 https://archive.ubuntu.com focal InRelease\nReading package lists... Done";
      if (args[0] === "list") return "opsec/stable 1.0.0 arm64";
      return "apt: Verwendung: apt [install|update|list] [paket]";
    },
  };

  function runAptInstall(pkg: string, autoYes: boolean): string | string[] | void {
    if (pkg !== "opsec") {
      return `E: Paket '${pkg}' nicht gefunden`;
    }
    inputDisabled = true;
    addLine("Reading package lists... Done", "#888");
    setTimeout(() => addLine("Building dependency tree... Done", "#888"), 300);
    setTimeout(() => addLine("The following NEW packages will be installed:", "#888"), 600);
    setTimeout(() => addLine("  opsec", "#4ade80"), 800);
    setTimeout(() => addLine(`0 upgraded, 1 newly installed, 0 to remove.`, "#888"), 1000);
    setTimeout(() => addLine("Get:1 https://plattnericus.dev/packages opsec 1.0.0 [2.4 MB]", "#888"), 1300);
    setTimeout(() => {
      addLine("Fetched 2.4 MB in 1s (2.4 MB/s)", "#888");
    }, 1800);
    setTimeout(() => {
      addLine("Setting up opsec (1.0.0) ...", "#888");
    }, 2200);
    setTimeout(() => {
      addLine("opsec installed successfully.", "#4ade80");
      addLine("");
      lines = [...lines, { text: "", image: "/opsec.png" }];
      scrollDown();
      inputDisabled = false;
    }, 2800);
  }

  function updateTitle() {
    appStore.update(apps =>
      apps.map(a => a.name === "Terminal" || a.name.startsWith("Terminal \u2014")
        ? { ...a, name: `Terminal \u2014 ${path}` }
        : a
      )
    );
  }

  $: if (path) updateTitle();

  const startTime = Date.now();

  function prompt() {
    return `${user}@${hostname}:${path}$ `;
  }

  function addLine(text: string, color?: string) {
    lines = [...lines, { text, color } as Line];
    scrollDown();
  }

  function scrollDown() {
    setTimeout(() => {
      if (container) container.scrollTop = container.scrollHeight;
    }, 0);
    setTimeout(() => {
      if (container) container.scrollTop = container.scrollHeight;
    }, 50);
  }

  $: if (lines) {
    scrollDown();
  }

  function runCommand(raw: string) {
    let full = raw.trim();
    if (!full) return;

    const firstWord = full.split(/\s+/)[0];
    if (aliases[firstWord]) {
      full = full.replace(firstWord, aliases[firstWord]);
    }

    if (full.includes("|")) {
      const parts = full.split("|").map(p => p.trim());
      let lastOutput = "";
      for (const part of parts) {
        const pParts = (lastOutput ? `${part} ${lastOutput}` : part).split(/\s+/);
        const name = (pParts.shift() || "").toLowerCase();
        const fn = commands[name];
        if (!fn) return `${name}: command not found`;
        const res = fn(pParts, pParts.join(" "));
        lastOutput = Array.isArray(res) ? res.join("\n") : (res || "");
      }
      return lastOutput;
    }

    const parts = full.split(/\s+/);
    const name = (parts.shift() || "").toLowerCase();
    const args = parts;
    const fn = commands[name];
    if (!fn) return `${name}: command not found`;
    return fn(args, full);
  }

  function submit() {
    const cmd = input;
    addLine(prompt() + cmd);

    if (cmd.trim()) {
      history.push(cmd);
      historyIndex = history.length;
    }

    const out = runCommand(cmd);
    if (Array.isArray(out)) out.forEach(l => addLine(l));
    else if (typeof out === "string" && out !== "") addLine(out);

    input = "";
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); submit(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) { historyIndex--; input = history[historyIndex] ?? ""; }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length - 1) { historyIndex++; input = history[historyIndex] ?? ""; }
      else { historyIndex = history.length; input = ""; }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const raw = input;
      const parts = raw.split(/\s+/);
      if (parts.length <= 1) {
        const partial = (parts[0] || "").toLowerCase();
        if (!partial) return;
        const matches = Object.keys(commands).filter(c => c.startsWith(partial));
        if (matches.length === 1) {
          input = matches[0] + " ";
        } else if (matches.length > 1) {
          addLine(prompt() + input);
          addLine(matches.join("  "));
          const common = getCommonPrefix(matches);
          if (common.length > partial.length) input = common;
        }
      } else {
        const partial = parts[parts.length - 1];
        const dir = fs[path];
        if (dir && Array.isArray(dir)) {
          const matches = (dir as string[]).filter(f => f.toLowerCase().startsWith(partial.toLowerCase()));
          if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            const resolved = normalizePath(matches[0]);
            input = parts.join(" ") + (isDir(resolved) ? "/" : " ");
          } else if (matches.length > 1) {
            addLine(prompt() + input);
            addLine(matches.join("  "));
            const common = getCommonPrefix(matches);
            if (common.length > partial.length) {
              parts[parts.length - 1] = common;
              input = parts.join(" ");
            }
          }
        }
      }
      return;
    }
    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      lines = [];
      return;
    }
    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      addLine(prompt() + input + "^C");
      input = "";
    }
  }

  function focusInput() {
    inputEl?.focus();
  }

  function getCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
      while (!strs[i].toLowerCase().startsWith(prefix.toLowerCase())) {
        prefix = prefix.slice(0, -1);
        if (!prefix) return "";
      }
    }
    return prefix;
  }

  onMount(() => {
    focusInput();
    scrollDown();
  });
</script>

<div class="terminal-wrap" style:background={bgColor}>
  <div
    bind:this={container}
    role="button"
    tabindex="0"
    onclick={focusInput}
    onkeydown={(e) => (e.key === "Enter" || e.key === " ") && focusInput()}
    class="terminal"
    style:color={termColor}
    aria-label="Terminal"
  >
    <div class="terminal-inner">
      {#each lines as line}
        {#if line.image}
          <img src={line.image} alt="opsec" class="term-image" />
        {:else}
          <div class="line" style:color={line.color || termColor}>{line.text}</div>
        {/if}
      {/each}

      {#if !inputDisabled}
        <div class="input-line">
          <span class="prompt" style:color={promptColor}>{user}@{hostname}:{path}$ </span>
          <input
            bind:this={inputEl}
            bind:value={input}
            onkeydown={onKey}
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            class="input"
            style:color={termColor}
            style:caret-color={promptColor}
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .terminal-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: stretch;
    justify-content: stretch;
    border-radius: 0 0 12px 12px;
    overflow: hidden;
  }

  .terminal {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 14px 16px;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.6;
    background: transparent;
    overflow: auto;
    min-width: 0;
    min-height: 0;
    text-shadow: 0 0.5px 0 rgba(0,0,0,0.3);
  }

  .terminal-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .line {
    white-space: pre-wrap;
    word-break: break-word;
    text-align: left;
    width: 100%;
    line-height: 1.55;
  }

  .input-line {
    display: flex;
    align-items: baseline;
    width: 100%;
    gap: 4px;
  }

  .prompt {
    white-space: pre;
    font-weight: 600;
  }

  .input {
    flex: 1;
    min-width: 0;
    background: transparent;
    border: none;
    outline: none;
    font: inherit;
    font-weight: 500;
    text-align: left;
  }

  .term-image {
    max-width: 100%;
    max-height: 300px;
    border-radius: 8px;
    margin: 8px 0;
    border: 1px solid rgba(255,255,255,0.1);
  }
</style>
