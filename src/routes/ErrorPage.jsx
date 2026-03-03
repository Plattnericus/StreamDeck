import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

export default function ErrorPage() {
  return (
    <main className="bsod">
      <div className="bsod-container">
        <h1 className="neg title">
          <span className="bg">Error - 404</span>
        </h1>
        <p>An error has occured, to continue:</p>
        <p>
          * Return to our homepage.<br />
          * Send us an e-mail about this error and try later.
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
