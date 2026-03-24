import React, { useState, useEffect } from 'react';
import CookiesInfo from './Cookies-info';
import Datenschutz from './Datenschutz';
import './Cookies.css';
import { useTranslation } from '../../i18n/LanguageContext';

export default function Cookies({ onConsent, onDecline }) {
  const t = useTranslation();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showCookiesInfo, setShowCookiesInfo] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      onConsent?.({ accepted: consent === 'accepted' });
      return;
    }
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  function accept() {
    setClosing(true);
    localStorage.setItem('cookie-consent', 'accepted');
    setTimeout(() => { setVisible(false); onConsent?.({ accepted: true }); }, 400);
  }
  function decline() {
    setClosing(true);
    setTimeout(() => { setVisible(false); onDecline?.(); }, 400);
  }

  return (
    <>
      {visible && (
        <div className="cookie-overlay">
          <div className={`cookie-banner liquid-glass${closing ? ' closing' : ''}`}>
            <div className="glass-shine" />
            <div className="glass-caustic" />
            <div className="cookie-icon"><img style={{width:70,height:70}} src="/icons/cookies.png" alt="Cookie Icon" /></div>
            <div className="cookie-content">
              <h3 className="cookie-title">{t('cookies_title')}</h3>
              <p className="cookie-text">{t('cookies_text')}</p>
            </div>
            <div className="cookie-actions">
              <button className="btn btn-decline" onClick={decline}>{t('cookies_decline')}</button>
              <button className="btn btn-accept" onClick={accept}>{t('cookies_accept')}</button>
            </div>
            <div className="cookie-links">
              <button className="link-btn" onClick={() => setShowCookiesInfo(true)}>{t('cookies_learn_more')}</button>
              <span className="link-sep">·</span>
              <button className="link-btn" onClick={() => setShowDatenschutz(true)}>{t('cookies_privacy_policy')}</button>
            </div>
          </div>
        </div>
      )}
      {showCookiesInfo && <CookiesInfo popup={true} onClose={() => setShowCookiesInfo(false)} />}
      {showDatenschutz && <Datenschutz popup={true} onClose={() => setShowDatenschutz(false)} />}
    </>
  );
}
