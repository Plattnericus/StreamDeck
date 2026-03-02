<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface ChangelogEntry {
    date: string;
    items: string[];
  }

  let entries: ChangelogEntry[] = [];
  let todos: string[] = [];
  let loading = true;
  let error: string | null = null;
  let refreshInterval: ReturnType<typeof setInterval>;
  let animatedCount = 0;
  let lastHash = '';

  function parseChangelog(raw: string): { entries: ChangelogEntry[]; todos: string[] } {
    const lines = raw.split('\n');
    const result: ChangelogEntry[] = [];
    const todoItems: string[] = [];
    let current: ChangelogEntry | null = null;
    let inTodo = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (/^#{1,2}\s*TO\s*DO/i.test(trimmed)) {
        inTodo = true;
        continue;
      }

      const headingMatch = trimmed.match(/^#{1,2}\s+(.+)/);
      if (headingMatch && !inTodo) {
        const title = headingMatch[1].trim();
        if (title === 'Dependencies') continue;
        current = { date: title, items: [] };
        result.push(current);
        continue;
      }

      const bulletMatch = trimmed.match(/^-\s+(.+)/);
      if (bulletMatch) {
        const text = bulletMatch[1].trim();
        if (!text) continue;
        if (inTodo) {
          todoItems.push(text);
        } else if (current) {
          current.items.push(text);
        }
        continue;
      }

      const subBulletMatch = line.match(/^\s+-\s+(.+)/);
      if (subBulletMatch) {
        const text = subBulletMatch[1].trim();
        if (!text) continue;
        if (inTodo) {
          todoItems.push(text);
        } else if (current) {
          current.items.push(text);
        }
      }
    }

    result.reverse();
    return { entries: result, todos: todoItems };
  }

  function formatDate(dateStr: string): { day: string; month: string; weekday: string } {
    const parts = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
    if (parts) {
      const d = new Date(+parts[3], +parts[2] - 1, +parts[1]);
      const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
      const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
      return { day: parts[1], month: months[d.getMonth()], weekday: weekdays[d.getDay()] };
    }
    return { day: '', month: dateStr, weekday: '' };
  }

  function isToday(dateStr: string): boolean {
    const parts = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
    if (!parts) return false;
    const now = new Date();
    return +parts[1] === now.getDate() && +parts[2] === (now.getMonth() + 1) && +parts[3] === now.getFullYear();
  }

  function getItemType(text: string): 'fix' | 'add' | 'remove' | 'update' | 'default' {
    const l = text.toLowerCase();
    if (l.includes('fix') || l.includes('bug')) return 'fix';
    if (l.includes('add') || l.includes('added') || l.includes('new') || l.includes('start') || l.includes('made')) return 'add';
    if (l.includes('delete') || l.includes('removed')) return 'remove';
    if (l.includes('update') || l.includes('upgrade') || l.includes('rework') || l.includes('change')) return 'update';
    return 'default';
  }

  async function simpleHash(text: string): Promise<string> {
    const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function fetchChangelog() {
    try {
      const res = await fetch('/Changelog.md?t=' + Date.now());
      if (!res.ok) throw new Error('Fehler beim Laden');
      const raw = await res.text();
      const hash = await simpleHash(raw);
      if (hash === lastHash) return;
      lastHash = hash;
      const parsed = parseChangelog(raw);
      entries = parsed.entries;
      todos = parsed.todos;
      error = null;
      animatedCount = 0;
      for (let i = 0; i < entries.length; i++) {
        setTimeout(() => { animatedCount = i + 1; }, i * 40);
      }
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchChangelog();
    refreshInterval = setInterval(fetchChangelog, 5000);
  });

  onDestroy(() => {
    if (refreshInterval) clearInterval(refreshInterval);
  });

  $: totalChanges = entries.reduce((sum, e) => sum + e.items.length, 0);
</script>

<div class="wrap">
  {#if loading}
    <div class="center"><div class="spinner"></div></div>
  {:else if error}
    <div class="center"><span class="err">{error}</span></div>
  {:else}
    <div class="bar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="bar-svg"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
      <span class="bar-t">Changelog</span>
      <span class="bar-s">{totalChanges}</span>
      <span class="spacer"></span>
    </div>

    <div class="scroll">
      {#each entries as entry, i}
        {#if i < animatedCount}
          {@const fd = formatDate(entry.date)}
          {@const today = isToday(entry.date)}
          <div class="card" class:today style="animation-delay:{i * 35}ms">
            <div class="card-head">
              <div class="cal" class:today>
                <span class="cal-d">{fd.day || '-'}</span>
                <span class="cal-m">{fd.month}</span>
              </div>
              <span class="card-date">{fd.weekday} {entry.date}</span>
              <span class="card-n">{entry.items.length}</span>
              {#if today}<span class="now">Heute</span>{/if}
            </div>
            <div class="rows">
              {#each entry.items as item, j}
                {@const t = getItemType(item)}
                <div class="row" style="animation-delay:{i * 35 + j * 20}ms">
                  <span class="ic {t}">
                    {#if t === 'fix'}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
                    {:else if t === 'add'}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    {:else if t === 'remove'}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    {:else if t === 'update'}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                    {:else}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/></svg>
                    {/if}
                  </span>
                  <span class="txt">{item}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {/each}

      {#if todos.length > 0}
        <div class="card todo">
          <div class="card-head">
            <span class="ic todo-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></span>
            <span class="card-date">To Do</span>
            <span class="card-n todo-n">{todos.length}</span>
          </div>
          <div class="rows">
            {#each todos as td, i}
              <div class="row" style="animation-delay:{i * 20}ms">
                <span class="circ"></span>
                <span class="txt dim">{td}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: transparent;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
    color: #e2e2e2;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  .center {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 1.5px solid rgba(255,255,255,0.06);
    border-top-color: rgba(255,255,255,0.35);
    border-radius: 50%;
    animation: sp .6s linear infinite;
  }

  @keyframes sp { to { transform: rotate(360deg) } }

  .err { color: #f87171; font-size: 12px; }

  .bar {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: rgba(20, 22, 28, 0.78);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .bar-svg { color: rgba(255,255,255,0.4); flex-shrink: 0; }
  .bar-t { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8); }
  .bar-s { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.06); padding: 1px 6px; border-radius: 4px; }
  .spacer { flex: 1; }

  .live {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 600;
    color: #32d74b;
  }

  .live-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #32d74b;
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: .25 } }

  .scroll {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 6px;
    padding: 10px 12px 16px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scroll::-webkit-scrollbar { width: 0; }
  .scroll { scrollbar-width: none; }

  .card {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    padding: 10px 12px;
    animation: ci .3s cubic-bezier(.2,0,0,1) both;
    transition: background .2s, border-color .2s;
  }

  @keyframes ci {
    from { opacity: 0; transform: translateY(6px) }
    to { opacity: 1; transform: none }
  }

  .card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); }
  .card.today { background: rgba(60,130,255,0.04); border-color: rgba(80,160,255,0.1); }
  .card.today:hover { background: rgba(60,130,255,0.07); }
  .card.todo { border-color: rgba(255,183,77,0.08); }

  .card-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    margin-bottom: 6px;
  }

  .cal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgba(255,255,255,0.04);
    flex-shrink: 0;
  }

  .cal.today { background: rgba(60,130,255,0.1); }
  .cal-d { font-size: 14px; font-weight: 700; line-height: 1; }
  .cal-m { font-size: 8px; font-weight: 600; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: .3px; }

  .card-date { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.5); flex: 1; }

  .card-n {
    font-size: 9px;
    font-weight: 600;
    color: rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.04);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .todo-n { color: rgba(255,183,77,0.7); background: rgba(255,183,77,0.08); }

  .now {
    font-size: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .6px;
    color: #5ac8fa;
    flex-shrink: 0;
  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 4px 4px;
    border-radius: 6px;
    transition: background .12s;
    animation: ri .25s cubic-bezier(.2,0,0,1) both;
  }

  @keyframes ri { from { opacity: 0; transform: translateX(-3px) } to { opacity: 1; transform: none } }
  .row:hover { background: rgba(255,255,255,0.03); }

  .ic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .ic svg { width: 9px; height: 9px; }
  .ic.fix { background: rgba(251,146,60,0.1); color: #fb923c; }
  .ic.add { background: rgba(52,199,89,0.1); color: #34c759; }
  .ic.remove { background: rgba(248,113,113,0.1); color: #f87171; }
  .ic.update { background: rgba(96,165,250,0.1); color: #60a5fa; }
  .ic.default { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.3); }
  .ic.todo-ic { background: rgba(255,183,77,0.08); color: rgba(255,183,77,0.7); }

  .txt { font-size: 11.5px; line-height: 1.35; color: rgba(255,255,255,0.6); }
  .txt.dim { color: rgba(255,255,255,0.4); }

  .circ {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.1);
    flex-shrink: 0;
    transition: border-color .15s;
  }

  .row:hover .circ { border-color: rgba(255,255,255,0.25); }
</style>
