<script lang="js">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let username = '', email = '', password = '', confirmPassword = '';
  let identifier = '';
  let feedback = '', feedbackType = '';
  
  let glassForm;
  let switchToRegister;
  let switchToLogin;
  let loginForm;
  let registerForm;

  onMount(() => {
    if (glassForm) {
      glassForm.addEventListener('mousemove', handleMouseMove);
      glassForm.addEventListener('mouseleave', handleMouseLeave);
    }
    
    if (switchToRegister && switchToLogin && loginForm && registerForm) {
      switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          loginForm.classList.remove('active');
          registerForm.classList.add('active');
          
          setTimeout(() => {
            registerForm.style.opacity = '1';
            registerForm.style.transform = 'translateX(0)';
          }, 50);
        }, 300);
      });
      
      switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.opacity = '0';
        registerForm.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          registerForm.classList.remove('active');
          loginForm.classList.add('active');
          
          setTimeout(() => {
            loginForm.style.opacity = '1';
            loginForm.style.transform = 'translateX(0)';
          }, 50);
        }, 300);
      });
    }
  });

  function handleMouseMove(e) {
    const rect = glassForm.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const specular = glassForm.querySelector('.glass-specular');
    if (specular) {
      specular.style.background = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.15) 0%,
        rgba(255,255,255,0.05) 30%,
        rgba(255,255,255,0) 60%
      )`;
    }
  }

  function handleMouseLeave() {
    const filter = document.querySelector('#glass-distortion feDisplacementMap');
    if (filter) {
      filter.setAttribute('scale', '77');
    }
    
    const specular = glassForm.querySelector('.glass-specular');
    if (specular) {
      specular.style.background = 'none';
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!identifier || !password) return showFeedback('Bitte alle Felder ausfüllen!', 'error');
    
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();
      if (data.success) goto(data.redirect || '/profile');
      else showFeedback(data.error || 'Login fehlgeschlagen!', 'error');
    } catch (e) {
      showFeedback('Server nicht erreichbar!', 'error');
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      return showFeedback('Bitte alle Felder ausfüllen!', 'error');
    }
    if (password !== confirmPassword) return showFeedback('Passwörter stimmen nicht überein!', 'error');

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (data.success) goto(data.redirect || '/profile');
      else showFeedback(data.error || 'Registrierung fehlgeschlagen!', 'error');
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

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<svg style="display: none">
  <filter id="glass-distortion">
    <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
  </filter>
</svg>

<div class="page-container">
  <div class="glass-form" bind:this={glassForm}>
    <div class="glass-filter"></div>
    <div class="glass-overlay"></div>
    <div class="glass-specular"></div>
    <div class="glass-content">
      <div class="form-container login active" bind:this={loginForm}>
        <h3>Login</h3>
        <form on:submit={handleLogin}>
          <div class="form-group">
            <i class="fas fa-envelope"></i>
            <input type="text" placeholder="Email" bind:value={identifier} required>
          </div>
          <div class="form-group">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" bind:value={password} required>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p class="form-switch">Don't have an account? <a href="#" class="switch-to-register" bind:this={switchToRegister}>Register</a></p>
      </div>
      
      <div class="form-container register" bind:this={registerForm}>
        <h3>Register</h3>
        <form on:submit={handleRegister}>
          <div class="form-group">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Username" bind:value={username} required>
          </div>
          <div class="form-group">
            <i class="fas fa-envelope"></i>
            <input type="email" placeholder="Email" bind:value={email} required>
          </div>
          <div class="form-group">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" bind:value={password} required>
          </div>
          <div class="form-group">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Confirm Password" bind:value={confirmPassword} required>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p class="form-switch">Already have an account? <a href="#" class="switch-to-login" bind:this={switchToLogin}>Login</a></p>
      </div>
    </div>
  </div>
</div>

{#if feedback}
  <div class="feedback {feedbackType}">{feedback}</div>
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
  }

  :global(html) {
    overflow: hidden;
    height: 100%;
  }

  .page-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .glass-form {
    --bg-color: rgba(255, 255, 255, 0.25);
    --highlight: rgba(255, 255, 255, 0.75);
    --text: #ffffff;
    --input-bg: rgba(255, 255, 255, 0.1);
    --input-border: rgba(255, 255, 255, 0.2);
    --input-focus: rgba(255, 255, 255, 0.3);
    
    position: relative;
    width: 400px;
    min-height: 450px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
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
  }

  .glass-specular {
    z-index: 3;
    box-shadow: inset 1px 1px 1px var(--highlight);
  }

  .glass-content {
    position: relative;
    z-index: 4;
    padding: 30px;
    color: var(--text);
    height: 100%;
  }

  .form-container {
    display: none;
    opacity: 0;
    transform: translateX(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .form-container.active {
    display: block;
    opacity: 1;
    transform: translateX(0);
  }

  .form-container h3 {
    margin: 0 0 20px 0;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
  }

  .form-group {
    position: relative;
    margin-bottom: 20px;
  }

  .form-group i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text);
    opacity: 0.8;
  }

  .form-group input {
    width: 100%;
    padding: 12px 15px 12px 45px;
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 10px;
    color: var(--text);
    font-size: 16px;
    transition: border-color 0.3s ease, background 0.3s ease;
    box-sizing: border-box;
  }

  .form-group input:focus {
    outline: none;
    background: var(--input-focus);
    border-color: var(--highlight);
  }

  .form-group input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  button[type="submit"] {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    color: var(--text);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
  }

  button[type="submit"]:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .form-switch {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    opacity: 0.8;
  }

  .form-switch a {
    color: var(--text);
    text-decoration: none;
    font-weight: 600;
    opacity: 1;
  }

  .form-switch a:hover {
    text-decoration: underline;
  }

  .feedback {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 18px;
    color: white;
    border-radius: 6px;
    font-weight: bold;
    z-index: 1000;
  }

  .success {
    background: green;
  }

  .error {
    background: red;
  }

  .info {
    background: orange;
  }

  @media (prefers-color-scheme: dark) {
    .glass-form {
      --bg-color: rgba(0, 0, 0, 0.25);
      --highlight: rgba(255, 255, 255, 0.15);
      --input-bg: rgba(0, 0, 0, 0.2);
      --input-border: rgba(255, 255, 255, 0.1);
      --input-focus: rgba(0, 0, 0, 0.3);
    }
  }
</style>
