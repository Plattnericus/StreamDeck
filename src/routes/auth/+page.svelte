<script lang="js">
  import { goto } from '$app/navigation';

  let toggle = 'login';
  let username = '', email = '', password = '', confirmPassword = '';
  let identifier = '', remember = false;
  let feedback = '', feedbackType = '';

  async function register() {
    if (!username || !email || !password || !confirmPassword) {
      return showFeedback('Bitte alle Felder ausfüllen!', 'error');
    }
    if (password !== confirmPassword) return showFeedback('Passwörter stimmen nicht überein!', 'error');

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password, remember })
      });
      const data = await res.json();
      if (data.success) goto(data.redirect || '/settings');
      else showFeedback(data.error || 'Registrierung fehlgeschlagen!', 'error');
    } catch (e) {
      showFeedback('Server nicht erreichbar!', 'error');
    }
  }

  async function login() {
    if (!identifier || !password) return showFeedback('Bitte alle Felder ausfüllen!', 'error');
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, password, remember })
      });
      const data = await res.json();
      if (data.success) goto(data.redirect || '/settings');
      else showFeedback(data.error || 'Login fehlgeschlagen!', 'error');
    } catch (e) {
      showFeedback('Server nicht erreichbar!', 'error');
    }
  }

  /**
   * @param {string} message
   * @param {'success'|'error'|'info'} type
   */
  function showFeedback(message, type) {
    feedback = message;
    feedbackType = type;
    setTimeout(() => (feedback = ''), 4000);
  }
</script>

<h1>Stream-Deck Auth</h1>
<div class="toggle">
  <button on:click={() => toggle = 'login'} class:active={toggle==='login'}>Login</button>
  <button on:click={() => toggle = 'register'} class:active={toggle==='register'}>Register</button>
</div>

{#if toggle === 'login'}
  <div class="form">
    <input placeholder="Email oder Username" bind:value={identifier} />
    <input type="password" placeholder="Password" bind:value={password} />
    <label><input type="checkbox" bind:checked={remember} /> Remember me</label>
    <button on:click={login}>Login</button>
  </div>
{:else}
  <div class="form">
    <input placeholder="Username" bind:value={username} />
    <input placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <input type="password" placeholder="Confirm Password" bind:value={confirmPassword} />
    <label><input type="checkbox" bind:checked={remember} /> Remember me</label>
    <button on:click={register}>Register</button>
  </div>
{/if}

{#if feedback}
  <div class="feedback {feedbackType}">{feedback}</div>
{/if}

<style>
  .toggle { display:flex; gap:8px; justify-content:center; margin-bottom:16px; }
  .toggle button { padding:8px 12px; border-radius:6px; border:none; background:#ddd; cursor:pointer; }
  .toggle button.active { background:#007BFF; color:white; }
  .form { max-width:360px; margin:0 auto; display:flex; flex-direction:column; gap:8px; }
  input { padding:8px; border-radius:6px; border:1px solid #ccc; }
  button { padding:10px; border-radius:6px; background:#007BFF; color:white; border:none; cursor:pointer; }
  .feedback { position:fixed; bottom:20px; right:20px; padding:12px 18px; color:white; border-radius:6px; font-weight:bold; }
  .success { background:green; } .error { background:red; } .info { background:orange; }
</style>
