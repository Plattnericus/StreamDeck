<script lang="ts">
  function openLink() {
    window.open("https://www.apple.com/macbook-pro/", "_blank");
  }
</script>

<div class="about">
  <img class="mac-img" src="/MAC.png" alt="MacBook Pro" />
  <h1 class="title">MacBook Pro</h1>
  <p class="subtitle">15", 2023</p>
  <div class="specs">
    <div class="row">
      <span class="key">Chip</span>
      <span class="val">Apple M3 Pro</span>
    </div>
    <div class="row">
      <span class="key">Speicher</span>
      <span class="val">18 GB</span>
    </div>
    <div class="row">
      <span class="key">Seriennummer</span>
      <span class="val">XY0XX0Y0X0</span>
    </div>
    <div class="row">
      <span class="key">macOS</span>
      <span class="val">Tahoe 26.0.1</span>
    </div>
  </div>
  <button on:click={openLink} class="more-btn">
    Weitere Infos ...
  </button>
  <div class="footer">
    <a href="/" class="footer-link" on:click|preventDefault>Regulatorische Zertifizierung</a>
    <p class="footer-copy">™ und © 1983–2026 Apple Inc.<br />Alle Rechte vorbehalten.</p>
  </div>
</div>

<style>
  .about {
    z-index: 100000000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 32px 24px 24px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: transparent;
    color: rgba(255, 255, 255, 0.92);
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
  }

  .mac-img {
    width: 180px;
    height: auto;
    object-fit: contain;
    margin-bottom: 8px;
  }

  .title {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.4px;
    margin: 0;
    color: rgba(255, 255, 255, 0.95);
  }

  .subtitle {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.50);
    margin: 0;
    font-weight: 400;
  }

  .specs {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 14px 0 6px;
    width: 100%;
    max-width: 280px;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .key {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.50);
    font-weight: 400;
    white-space: nowrap;
  }

  .val {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.88);
    font-weight: 400;
    text-align: right;
  }

  .more-btn {
    margin-top: 10px;
    padding: 7px 22px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.88);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease;
  }

  .more-btn:hover {
    background: rgba(255, 255, 255, 0.20);
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-top: 14px;
  }

  .footer-link {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.40);
    text-decoration: underline;
    cursor: pointer;
  }

  .footer-copy {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.30);
    text-align: center;
    margin: 0;
    line-height: 1.5;
  }
</style>
