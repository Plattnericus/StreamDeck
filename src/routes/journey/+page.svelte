<script>
  import { onMount } from 'svelte';

  /** @type {Array<{date: string, tasks: string[], hours: number, imgSrc: string}>} */
  let entries = [];
  let totalHours = 0;

  // Modal State
  let modalOpen = false;
  let modalImage = '';

  // Changelog parsen
  async function parseChangelog() {
    let text = '';
    try {
      const res = await fetch('http://localhost:3000/api/changelog');
      if (!res.ok) throw new Error('404');
      text = await res.text();
    } catch {
      text = '## Keine Daten\n- CHANGELOG.md konnte nicht geladen werden';
    }

    const sections = text.split(/^## /m).slice(1);
    let total = 0;

    entries = sections.map(section => {
      const lines = section.trim().split('\n');
      const date = lines.shift()?.trim() || 'Unbekanntes Datum';

      const tasks = lines.filter(line => line.startsWith('-')).map(task => 
        task.replace(/^- /, '').trim()
      );

      const hourLine = lines.find(line => line.startsWith('![Hours]('));
      const hours = hourLine ? parseFloat(hourLine.match(/\((.*?)\)/)?.[1] || '0') : 0;
      total += hours;

      const imgLine = lines.find(line => line.startsWith('![') && !line.includes('Hours'));
      const imgSrc = imgLine ? (imgLine.match(/\((.*?)\)/)?.[1] || '') : '';

      return { date, tasks, hours, imgSrc };
    });

    totalHours = total;
  }

  // Modal Funktionen
  /**
   * @param {string} src
   */
  function openModal(src) {
    if (src) {
      modalImage = src;
      modalOpen = true;
    }
  }

  function closeModal() {
    modalOpen = false;
    modalImage = '';
  }

  // Keyboard Handler für Modal
  /**
   * @param {KeyboardEvent} event
   */
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  // Mouse-Interaktion für Glass-Karten
  /**
   * @param {MouseEvent} event
   */
  function handleMouseMove(event) {
    const card = /** @type {HTMLElement} */ (event.currentTarget);
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const specular = card.querySelector('.glass-specular');
    if (specular instanceof HTMLElement) {
      specular.style.background = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.15) 0%,
        rgba(255,255,255,0.05) 30%,
        rgba(255,255,255,0) 60%
      )`;
    }
  }

  /**
   * @param {MouseEvent} event
   */
  function handleMouseLeave(event) {
    const card = /** @type {HTMLElement} */ (event.currentTarget);
    const specular = card.querySelector('.glass-specular');
    
    if (specular instanceof HTMLElement) {
      specular.style.background = 'none';
    }
  }

  // Image Error Handler
  /**
   * @param {Event} event
   */
  function handleImageError(event) {
    const img = /** @type {HTMLImageElement} */ (event.target);
    console.log('Image failed to load:', img.src);
    img.style.display = 'none';
  }

  // Client-only Logik
  onMount(() => {
    parseChangelog();
    setInterval(parseChangelog, 10000);

    // Global key listener für Escape-Taste
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<!-- SVG Filter for Glass Distortion -->
<svg style="display: none; position: absolute;" aria-hidden="true">
  <filter id="glass-distortion">
    <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
  </filter>
</svg>

<main class="container">
  <div class="header-section">
    <h1>📘 Changelog</h1>
    <div class="total">Gesamtarbeitszeit: <span class="hours">{totalHours} h</span></div>
  </div>

  <div class="grid">
    {#each entries as entry, index (entry.date)}
      <article 
        class="glass-card"
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        role="article"
        aria-labelledby={`title-${index}`}
      >
        <div class="glass-filter"></div>
        <div class="glass-overlay"></div>
        <div class="glass-specular"></div>
        
        <div class="glass-content">
          <div class="card-header">
            <h3 id={`title-${index}`}>{entry.date}</h3>
            <div class="hours-badge">{entry.hours} h</div>
          </div>
          
          {#if entry.tasks.length > 0}
            <ul class="task-list">
              {#each entry.tasks as task, taskIndex (task)}
                <li>{task}</li>
              {/each}
            </ul>
          {:else}
            <p class="no-tasks">Keine Tasks für diesen Eintrag</p>
          {/if}
          
          {#if entry.imgSrc}
            <div class="image-container">
              <button 
                class="image-button"
                on:click={() => openModal(entry.imgSrc)}
                on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? openModal(entry.imgSrc) : null}
                aria-label="Screenshot vergrößern"
              >
                <img 
                  src={entry.imgSrc} 
                  alt={`Screenshot für ${entry.date}`}
                  on:error={handleImageError}
                />
              </button>
            </div>
          {/if}
        </div>
      </article>
    {/each}
  </div>

  {#if modalOpen}
    <div 
      class="modal" 
      on:click={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label="Bild vergrößert anzeigen"
    >
      <div class="modal-glass" on:click|stopPropagation>
        <button 
          class="close" 
          on:click={closeModal}
          aria-label="Modal schließen"
        >×</button>
        {#if modalImage}
          <img src={modalImage} alt="Vergrößerte Ansicht" />
        {:else}
          <p>Bild konnte nicht geladen werden</p>
        {/if}
      </div>
    </div>
  {/if}
</main>

<style>
  /* === GLOBAL STYLES === */
  :global(body) { 
    margin: 0; 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    min-height: 100vh;
    color: #333;
    line-height: 1.6;
  }

  .container { 
    max-width: 1400px; 
    margin: 0 auto; 
    padding: 40px 20px;
  }

  /* === HEADER SECTION === */
  .header-section {
    text-align: center;
    margin-bottom: 50px;
  }

  h1 { 
    font-size: 3.5rem; 
    margin-bottom: 20px;
    color: white;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .total { 
    font-size: 1.5rem;
    color: white;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 15px 30px;
    border-radius: 50px;
    display: inline-block;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.3);
  }

  .hours {
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  /* === GRID LAYOUT === */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 30px;
    align-items: start;
  }

  /* === GLASS CARD STYLES - EXAKT WIE IN DEINER NAVBAR === */
  .glass-card {
    --bg-color: rgba(46, 46, 46, 0.25);
    --highlight: rgba(255, 255, 255, 0.75);
    --text: #ffffff;
    
    position: relative;
    min-height: 320px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .glass-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  .glass-filter,
  .glass-overlay,
  .glass-specular {
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  .glass-filter {
    z-index: 1;
    backdrop-filter: blur(4px);
    filter: url(#glass-distortion) saturate(120%) brightness(1.15);
  }

  .glass-overlay {
    z-index: 2;
    background: var(--bg-color);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glass-specular {
    z-index: 3;
    box-shadow: inset 1px 1px 1px var(--highlight);
    transition: background 0.1s ease;
  }

  .glass-content {
    position: relative;
    z-index: 4;
    padding: 24px;
    color: var(--text);
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 16px;
  }

  /* === CARD CONTENT STYLES === */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  .glass-content h3 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
    flex: 1;
    text-align: left;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }

  .hours-badge {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.4);
    white-space: nowrap;
    color: white;
  }

  .task-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-align: left;
    flex: 1;
  }

  .task-list li {
    margin-bottom: 8px;
    padding-left: 16px;
    position: relative;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .task-list li:before {
    content: "•";
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.8);
  }

  .no-tasks {
    font-style: italic;
    opacity: 0.8;
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
  }

  /* === IMAGE STYLES === */
  .image-container {
    margin-top: auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  .image-button {
    width: 100%;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    border-radius: 16px;
    transition: transform 0.3s ease;
  }

  .image-button:focus {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  .image-button img {
    width: 100%;
    height: auto;
    border-radius: 16px;
    display: block;
    transition: transform 0.3s ease;
  }

  .image-button:hover img {
    transform: scale(1.03);
  }

  /* === MODAL STYLES === */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-glass {
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 30px;
    max-width: 90vw;
    max-height: 90vh;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    animation: scaleIn 0.2s ease-out;
  }

  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .modal-glass img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }

  .close {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    z-index: 10;
  }

  .close:hover,
  .close:focus {
    background: rgba(255, 255, 255, 0.1);
    outline: none;
  }

  /* === RESPONSIVE DESIGN === */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .container {
      padding: 20px 15px;
    }
    
    h1 {
      font-size: 2.5rem;
    }
    
    .glass-card {
      min-height: 280px;
    }
    
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .hours-badge {
      align-self: flex-start;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }
    
    .total {
      font-size: 1.2rem;
      padding: 12px 24px;
    }
    
    .glass-content {
      padding: 20px;
    }
    
    .modal-glass {
      padding: 20px;
      margin: 20px;
    }
  }
</style>