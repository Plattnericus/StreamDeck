// ─── Error Page (404) ───
// this shows when the user navigates to a page that doesnt exist
// it looks like the classic Windows "Blue Screen of Death" — just for fun
// has a link back to the homepage
import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';
import { useTranslation } from '../i18n/LanguageContext';

export default function ErrorPage() {
  const t = useTranslation();
  return (
    <main className="bsod">
      <div className="bsod-container">
        <h1 className="neg title">
          <span className="bg">Error - 404</span>
        </h1>
        <p>{t('error_message')}</p>
        <p>
          {t('error_return')}<br />
          {t('error_email')}
        </p>
        <nav className="nav">
          <Link to="/" className="link">index</Link>
          &nbsp;|&nbsp;
          <Link to="/desktop" className="link">desktop</Link>
        </nav>
      </div>
    </main>
  );
}
