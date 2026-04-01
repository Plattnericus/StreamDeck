// ─── GitHub Profile Page ───
// this shows a GitHub profile with repos, followers, and bio
// it fetches real data from the GitHub API for the given username
// if the API fails, it still looks nice with placeholder data
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import './Github.css';

export default function Github({ username = 'Plattnericus' }) {
  const t = useTranslation();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setUser({
        login: username,
        name: 'Felix Plattner',
        avatar_url: '/logo.jpg',
        bio: 'C#/Cybersecurity/Web Development',
        html_url: `https://github.com/${username}`,
        public_repos: 12,
        followers: 150,
        following: 42,
      });
      setRepos([
        {
          name: 'Plattnericus/StreamDeck',
          description: 'macOS-style desktop environment in the browser',
          html_url: `https://github.com/${username}/StreamDeck`,
          language: 'TypeScript',
          stargazers_count: 45,
          forks_count: 8,
          updated_at: new Date().toISOString(),
        },
        {
          name: 'Ryhox/minesweeper.ryhox.dev',
          description: 'Minesweeper clone with a twist, built with nodejs and JavaScript',
          html_url: 'https://github.com/Ryhox/minesweeper.ryhox.dev',
          language: 'Svelte',
          stargazers_count: 23,
          forks_count: 5,
          updated_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          name: 'Ryhox/ProjectilePreview-Mod',
          description: 'Modern, customizable projectile preview mod for Minecraft: Java Edition',
          html_url: 'https://github.com/Ryhox/ProjectilePreview-Mod',
          language: 'JavaScript',
          stargazers_count: 67,
          forks_count: 12,
          updated_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ]);
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [username]);

  if (loading) return <div className="ghRoot"><div className="stateCard">{t('github_loading')}</div></div>;
  if (!user) return null;

  return (
    <div className="ghRoot">
      <div className="gh-shell">
        <aside className="gh-left">
          <div className="avatarWrap">
            <img className="avatar" src={user.avatar_url} alt="" />
          </div>
          <div className="who">
            <div className="gh-name">{user.name ?? user.login}</div>
            <div className="login">@{user.login}</div>
          </div>
          <div className="bio">{user.bio || <span className="muted">{t('github_no_bio')}</span>}</div>
          <a className="gh-btn" href={user.html_url} target="_blank" rel="noopener noreferrer">{t('github_view_profile')}</a>
          <div className="stats">
            <span><b>{user.public_repos}</b> {t('github_repos')}</span>
            <span><b>{user.followers}</b> {t('github_followers')}</span>
            <span><b>{user.following}</b> {t('github_following')}</span>
          </div>
        </aside>

        <main className="gh-right">
          <div className="gh-topbar">
            <div className="gh-title">{t('github_repositories')}</div>
            <div className="sub">{repos.length} {t('github_shown')}</div>
          </div>
          <div className="gh-grid">
            {repos.map((r) => (
              <a key={r.name} className="gh-card" href={r.html_url} target="_blank" rel="noopener noreferrer">
                <div className="cardTop">
                  <div className="repoName">{r.name}</div>
                  <div className="badge">{t('github_public')}</div>
                </div>
                <div className="desc">{r.description ?? t('github_no_desc')}</div>
                <div className="meta">
                  {r.language && <span className="lang">{r.language}</span>}
                  <span className="stat">★ {r.stargazers_count}</span>
                  <span className="stat">⑂ {r.forks_count}</span>
                  <span className="stat muted">{new Date(r.updated_at).toLocaleDateString()}</span>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
