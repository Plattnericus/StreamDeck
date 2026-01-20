<script lang="ts">
  export let username = "Plattnericus";

  let user: any = null;
  let repos: any[] = [];
  let error: string | null = null;
  let loading = true;

  async function load() {
    loading = true;
    error = null;

    try {
      const u = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      if (!u.ok) throw new Error("User");
      user = await u.json();

      const r = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
      );
      if (!r.ok) throw new Error("Repos");
      const all = await r.json();
      repos = (Array.isArray(all) ? all : []).filter((x: any) => !x.fork).slice(0, 12);
    } catch {
      error = "Fehler beim Laden";
    } finally {
      loading = false;
    }
  }

  load();
</script>

<div class="ghRoot">
  {#if loading}
    <div class="stateCard">Lade…</div>
  {:else if error}
    <div class="stateCard error">{error}</div>
  {:else if user}
    <div class="shell">
      <aside class="left">
        <div class="avatarWrap">
          <img class="avatar" src={user.avatar_url} alt="" />
        </div>

        <div class="who">
          <div class="name">{user.name ?? user.login}</div>
          <div class="login">@{user.login}</div>
        </div>

        {#if user.bio}
          <div class="bio">{user.bio}</div>
        {:else}
          <div class="bio muted">No bio</div>
        {/if}

        <a class="btn" href={user.html_url} target="_blank" rel="noopener">View Profile</a>

        <div class="stats">
          <span><b>{user.public_repos}</b> Repos</span>
          <span><b>{user.followers}</b> Followers</span>
          <span><b>{user.following}</b> Following</span>
        </div>
      </aside>

      <main class="right">
        <div class="topbar">
          <div class="title">Repositories</div>
          <div class="sub">{repos.length} shown</div>
        </div>

        <div class="grid">
          {#each repos as r}
            <a class="card" href={r.html_url} target="_blank" rel="noopener">
              <div class="cardTop">
                <div class="repoName">{r.name}</div>
                <div class="badge">Public</div>
              </div>

              <div class="desc">{r.description ?? "No description"}</div>

              <div class="meta">
                {#if r.language}<span class="lang">{r.language}</span>{/if}
                <span class="stat">★ {r.stargazers_count}</span>
                <span class="stat">⑂ {r.forks_count}</span>
                <span class="stat muted">{new Date(r.updated_at).toLocaleDateString()}</span>
              </div>
            </a>
          {/each}
        </div>
      </main>
    </div>
  {/if}
</div>

<style>
  *{box-sizing:border-box}
  :global(.ghRoot), .ghRoot{width:100%;height:100%}

  .ghRoot{
    --bg:#0d1117;
    --panel:#0f141b;
    --panel2:#0f1621;
    --border:#30363d;
    --border2:#3b434b;
    --text:#c9d1d9;
    --muted:#8b949e;
    --link:#58a6ff;
    --btn:#21262d;
    --btnHover:#2b313a;
    --shadow: 0 10px 30px rgba(0,0,0,.35);
    --shadow2: 0 8px 18px rgba(0,0,0,.28);
    --r:14px;
    --r2:12px;

    font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial;
    color:var(--text);
    background:transparent;
    padding:24px;
    overflow:hidden;
  }

  .shell{
    height:100%;
    width:100%;
    display:flex;
    gap:22px;
    padding:20px;
    border-radius:var(--r);
    background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
    box-shadow:var(--shadow);
    border:1px solid rgba(255,255,255,.06);
    overflow:hidden;
  }

  @media(max-width: 920px){
    .shell{flex-direction:column; gap:16px; padding:16px}
  }

  .left{
    flex:0 0 320px;
    min-width:280px;
    display:flex;
    flex-direction:column;
    gap:12px;
    padding:18px;
    border-radius:var(--r2);
    background:rgba(13,17,23,.65);
    border:1px solid rgba(48,54,61,.9);
    box-shadow:var(--shadow2);
    overflow:hidden;
  }

  @media(max-width: 920px){
    .left{flex:0 0 auto; min-width:0}
  }

  .avatarWrap{
    width:100%;
    display:flex;
    justify-content:center;
    padding:6px 0 2px;
  }

  .avatar{
    width:210px;
    height:210px;
    border-radius:999px;
    border:1px solid rgba(48,54,61,.95);
    box-shadow: 0 12px 24px rgba(0,0,0,.35);
    object-fit:cover;
  }

  .who{display:flex;flex-direction:column;gap:2px; align-items:center; text-align:center;}
  .name{font-size:22px;font-weight:800;letter-spacing:.2px}
  .login{color:var(--muted);font-size:14px}

  .bio{
    margin-top:2px;
    padding:12px 12px;
    border-radius:12px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.06);
    line-height:1.35;
    font-size:13px;
    text-align:center;
  }

  .btn{
    margin-top:2px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:10px 12px;
    border-radius:12px;
    border:1px solid rgba(48,54,61,.95);
    background:var(--btn);
    color:var(--text);
    text-decoration:none;
    font-weight:700;
    box-shadow: 0 8px 14px rgba(0,0,0,.25);
  }
  .btn:hover{background:var(--btnHover); border-color:rgba(88,166,255,.35)}

  .stats{
    margin-top:auto;
    display:flex;
    gap:12px;
    justify-content:center;
    flex-wrap:wrap;
    font-size:13px;
    color:var(--muted);
    padding-top:8px;
  }
  .stats b{color:var(--text)}

  .right{
    flex:1;
    min-width:0;
    display:flex;
    flex-direction:column;
    gap:14px;
    padding:18px;
    border-radius:var(--r2);
    background:rgba(13,17,23,.55);
    border:1px solid rgba(48,54,61,.9);
    box-shadow:var(--shadow2);
    overflow:hidden;
  }

  .topbar{
    display:flex;
    align-items:baseline;
    justify-content:space-between;
    padding:2px 2px 10px;
    border-bottom:1px solid rgba(255,255,255,.06);
  }
  .title{font-size:16px;font-weight:800;letter-spacing:.2px}
  .sub{font-size:12px;color:var(--muted)}

  .grid{
    display:flex;
    flex-wrap:wrap;
    gap:14px;
    align-content:flex-start;
    overflow:hidden;
    min-width:0;
  }

  .card{
    flex:1 1 320px;
    max-width:calc(50% - 7px);
    min-width:300px;
    padding:14px;
    border-radius:12px;
    background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));
    border:1px solid rgba(48,54,61,.95);
    text-decoration:none;
    color:var(--text);
    box-shadow: 0 10px 18px rgba(0,0,0,.22);
    overflow:hidden;
  }
  .card:hover{
    border-color:rgba(88,166,255,.45);
    box-shadow: 0 14px 24px rgba(0,0,0,.28);
    transform: translateY(-1px);
  }

  @media(max-width: 920px){
    .card{max-width:100%; min-width:0}
  }

  .cardTop{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
    margin-bottom:8px;
  }

  .repoName{
    color:var(--link);
    font-weight:800;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    font-size:14px;
  }

  .badge{
    font-size:12px;
    padding:2px 8px;
    border-radius:999px;
    border:1px solid rgba(255,255,255,.10);
    background:rgba(255,255,255,.03);
    color:var(--text);
    flex:0 0 auto;
  }

  .desc{
    color:var(--muted);
    font-size:13px;
    line-height:1.4;
    min-height:34px;
    overflow:hidden;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
  }

  .meta{
    margin-top:12px;
    display:flex;
    flex-wrap:wrap;
    gap:12px;
    font-size:12px;
    color:var(--muted);
    align-items:center;
  }

  .lang{color:var(--text)}
  .muted{color:var(--muted)}
  .stateCard{
    padding:16px;
    border-radius:14px;
    background:rgba(13,17,23,.65);
    border:1px solid rgba(48,54,61,.9);
    box-shadow:var(--shadow2);
  }
  .error{color:#ff7b72}
</style>
