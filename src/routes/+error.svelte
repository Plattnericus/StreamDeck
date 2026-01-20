<main class="bsod" style="padding-top: 15%;">
  <div class="container">
    <h1 class="neg title"><span class="bg">Error - 404</span></h1>
    <p>An error has occured, to continue:</p>
    <p>
      * Return to our homepage.<br />
      * Send us an e-mail about this error and try later.
    </p>
    <nav class="nav">
      <a href="/" class="link">index</a>&nbsp;|&nbsp;<a href="/desktop" class="link">desktop</a>
    </nav>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css?family=VT323");

  :global(html, body) {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  :global(:root) {
    --light-grey: #e0e2f4;
    --grey: #aaaaaa;
    --blue: #0414a7;
    --base-font-size: 20px;
    --font-stack: "VT323", monospace;
  }

  :global(body) {
    background: var(--blue);
    font: normal var(--base-font-size) / 1.25rem var(--font-stack);
    color: var(--light-grey);
  }

  h1,
  h2,
  h3,
  h4,
  p,
  a {
    color: var(--light-grey);
    font-family: var(--font-stack);
    font-weight: normal;
  }

  h1 {
    font-size: 2.75rem;
    line-height: 1.05em;
  }
  h2 {
    font-size: 2.25rem;
    line-height: 1.25em;
  }
  h3 {
    font-size: 1.5rem;
    line-height: 1.25em;
    font-weight: lighter;
  }
  h4 {
    font-size: 1.125rem;
    line-height: 1.2222222em;
    font-weight: lighter;
  }

  .bsod {
    position: fixed;
    inset: 0;
    background: var(--blue);
    z-index: 999999;
    overflow: auto;
    padding-top: 10%;
  }

  .container {
    width: 90%;
    max-width: 640px;
    margin: 0 auto;
  }

  .neg {
    text-align: center;
    color: var(--blue);
  }

  .bg {
    background: var(--grey);
    padding: 0 15px 2px 13px;
    display: inline-block;
  }

  .title {
    margin: 0 0 50px 0;
  }

  .nav {
    margin-top: 35px;
    text-align: center;
  }

  .link {
    text-decoration: none;
    padding: 0 9px 2px 8px;
    display: inline-block;
    color: var(--light-grey);
  }

  .link:hover,
  .link:focus {
    background: var(--grey);
    color: var(--blue);
    outline: none;
  }
</style>
