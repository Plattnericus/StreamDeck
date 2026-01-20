<script lang="ts">
  import { onMount } from "svelte";

  type Cmd = (args: string[], full: string) => string | string[] | void;

  let user = "nexor";
  let path = "~";

  let lines: string[] = ['Svelte Terminal (offline) — tippe "help"'];
  let input = "";
  let history: string[] = [];
  let historyIndex = -1;

  let container: HTMLDivElement;
  let inputEl: HTMLInputElement;

  // Eigene Commands hier hinzufügen
  const commands: Record<string, Cmd> = {
    help: () => [
      "help, clear, echo, date, whoami, pwd, cd",
      "Du kannst eigene Commands im commands-Objekt hinzufügen."
    ],
    clear: () => {
      lines = [];
    },
    echo: (args) => args.join(" "),
    date: () => new Date().toString(),
    whoami: () => user,
    pwd: () => path,
    cd: (args) => {
      if (!args[0]) return "cd: missing operand";
      path = args.join(" ");
      return "";
    }
  };

  function prompt() {
    return `${user}:${path}$ `;
  }

  function addLine(text: string) {
    lines = [...lines, text];
    scrollDown();
  }

  function scrollDown() {
    setTimeout(() => {
      if (container) container.scrollTop = container.scrollHeight;
    });
  }

  function runCommand(raw: string) {
    const full = raw.trim();
    if (!full) return;

    const parts = full.split(/\s+/);
    const name = (parts.shift() || "").toLowerCase();
    const args = parts;

    const fn = commands[name];
    if (!fn) return `${name}: command not found`;

    const res = fn(args, full);
    return res;
  }

  function submit() {
    const cmd = input;

    addLine(prompt() + cmd);

    if (cmd.trim()) {
      history.push(cmd);
      historyIndex = history.length;
    }

    const out = runCommand(cmd);

    if (Array.isArray(out)) out.forEach(addLine);
    else if (typeof out === "string" && out !== "") addLine(out);

    input = "";
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input = history[historyIndex] ?? "";
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input = history[historyIndex] ?? "";
      } else {
        historyIndex = history.length;
        input = "";
      }
    }
  }

  function focusInput() {
    inputEl?.focus();
  }

  onMount(() => {
    focusInput();
    scrollDown();
  });
</script>

<div
  style="
    display:flex;
    width:100%;
    height:100%;
    align-items:stretch;
    justify-content:stretch;
  "
>
  <div
    bind:this={container}
    on:click={focusInput}
    style="
      display:flex;
      flex:1;
      flex-direction:column;
      align-items:flex-start;
      justify-content:flex-start;
      padding:12px;
      font-family:SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size:13px;
      font-weight:700;
      color:#000;
      background:transparent;
      overflow:auto;
      min-width:0;
      min-height:0;
    "
  >
    <div style="width:100%; display:flex; flex-direction:column; align-items:flex-start;">
      {#each lines as line}
        <div style="white-space:pre-wrap; word-break:break-word; text-align:left; width:100%;">{line}</div>
      {/each}

      <div style="display:flex; align-items:baseline; width:100%; gap:6px;">
        <span style="white-space:pre;">{prompt()}</span>
        <input
          bind:this={inputEl}
          bind:value={input}
          on:keydown={onKey}
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          style="
            flex:1;
            min-width:0;
            background:transparent;
            border:none;
            outline:none;
            color:inherit;
            font:inherit;
            font-weight:700;
            text-align:left;
          "
        />
      </div>
    </div>
  </div>
</div>
