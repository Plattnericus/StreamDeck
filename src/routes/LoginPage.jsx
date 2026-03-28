import React, { useState, useEffect, useRef, useCallback } from 'react';
import Cookies from './apps/Cookies';
import './LoginPage.css';
import { useSEO } from '../hooks/useSEO';
import { useTranslation } from '../i18n/LanguageContext';

const PRELOAD_ASSETS = [
  { type: 'icon', label: 'Finder', src: '/icons/finder.webp' },
  { type: 'icon', label: 'Safari', src: '/icons/safari.webp' },
  { type: 'icon', label: 'Settings', src: '/icons/settings.webp' },
  { type: 'icon', label: 'Terminal', src: '/icons/terminal.webp' },
  { type: 'icon', label: 'App Store', src: '/icons/app-store.webp' },
  { type: 'icon', label: 'Github', src: '/icons/github.webp' },
  { type: 'icon', label: 'Trash', src: '/icons/trash.webp' },
  { type: 'font', label: 'Inter', src: '/fonts/Inter.woff2' },
  { type: 'image', label: 'Wallpaper', src: '/lake-tahoe.webp' },
  { type: 'icon', label: 'Wi-Fi', src: '/icons/wifi.png' },
  { type: 'icon', label: 'Battery', src: '/icons/battery.png' },
  { type: 'icon', label: 'Control Center', src: '/icons/control-center.png' },
  { type: 'icon', label: 'Bluetooth', src: '/icons/bluetooth.png' },
  { type: 'image', label: 'Avatar', src: '/logo.jpg' },
  { type: 'icon', label: 'Apple Logo', src: '/icons/apple.png' },
];


export default function LoginPage() {
  const t = useTranslation();
    useSEO({
      title: 'MacOS Tahoe Desktop',
      description: 'Erlebe das macOS Tahoe Liquid Glass Interface auf deinem Stream Deck DIY. Voll funktionsfähig, mit Echtzeit-Updates und anpassbaren Widgets.  ',
      path: '/desktop',
    })

  const fillRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showBoot, setShowBoot] = useState(true);
  const [showCookies, setShowCookies] = useState(false);
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [slideActive, setSlideActive] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [declineCount, setDeclineCount] = useState(0);

  const correctPassword = 'Kennwort0';

  const wheelAccumRef = useRef(0);
  const wheelTimerRef = useRef(null);
  const slideActiveTimerRef = useRef(null);
  const isUnlockingRef = useRef(false);
  const slideProgressRef = useRef(0);
  const passwordRef = useRef('');

  useEffect(() => { isUnlockingRef.current = isUnlocking; }, [isUnlocking]);
  useEffect(() => { slideProgressRef.current = slideProgress; }, [slideProgress]);
  useEffect(() => { passwordRef.current = password; }, [password]);

  function updateClock() {
    const now = new Date();
    setDateText(
      now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    );
    setTimeText(
      now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    );
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function canSlide() {
    return passwordRef.current === '' || passwordRef.current === correctPassword;
  }

  const completeUnlock = useCallback(() => {
    if (isUnlockingRef.current) return;
    if (canSlide()) {
      setErrorText('');
      setIsUnlocking(true);
      isUnlockingRef.current = true;
      setSlideProgress(1);
      setSlideActive(false);
      setTimeout(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (consent) {
          window.location.href = '/desktop';
        } else {
          setShowCookies(true);
        }
      }, 900);
      return;
    }
    setErrorText(t('login_wrong_password'));
    setPassword('');
  }, []);

  function handleSubmit() {
    completeUnlock();
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') handleSubmit();
  }

  function handleCookieConsent() {
    window.location.href = '/desktop';
  }

  function handleCookieDecline() {
    setDeclineCount((prev) => {
      const next = prev + 1;
      if (next >= 2) {
        localStorage.setItem('cookie-consent', 'declined');
        window.location.href = '/desktop';
        return next;
      }
      setShowCookies(false);
      setIsUnlocking(false);
      isUnlockingRef.current = false;
      setSlideProgress(0);
      setErrorText(t('login_accept_cookies'));
      return next;
    });
  }

  useEffect(() => {
    const fill = fillRef.current;
    if (fill) {
      fill.style.transition = 'width 4200ms cubic-bezier(0.4, 0, 0.2, 1)';
      requestAnimationFrame(() => {
        if (fill) fill.style.width = '100%';
      });
    }

    const preloadTimer = setTimeout(() => {
      PRELOAD_ASSETS.forEach((asset) => {
        if (asset.type === 'font') {
          fetch(asset.src).catch(() => {});
        } else {
          const img = new Image();
          img.src = asset.src;
        }
      });
    }, 2000);

    const bootTimer = setTimeout(() => {
      setShowLogin(true);
      setShowBoot(false);
    }, 4600);

    updateClock();
    const clockTimer = setInterval(updateClock, 1000);

    const wheelHandler = (e) => {
      if (!showLogin && !document.querySelector('.login-screen')) return;
      if (isUnlockingRef.current) return;
      if (!canSlide()) return;
      e.preventDefault();
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      if (slideActiveTimerRef.current) clearTimeout(slideActiveTimerRef.current);
      setSlideActive(true);
      slideActiveTimerRef.current = setTimeout(() => {
        setSlideActive(false);
      }, 120);
      wheelAccumRef.current += e.deltaY;
      wheelTimerRef.current = setTimeout(() => {
        wheelAccumRef.current = 0;
      }, 200);
      setSlideProgress((prev) => {
        const next = clamp(prev + e.deltaY / 700, 0, 1);
        if (wheelAccumRef.current > 140 || next >= 0.98) {
          wheelAccumRef.current = 0;
          completeUnlock();
        }
        return next;
      });
    };

    window.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      clearTimeout(preloadTimer);
      clearTimeout(bootTimer);
      clearInterval(clockTimer);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      if (slideActiveTimerRef.current) clearTimeout(slideActiveTimerRef.current);
      window.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <div className="body-mock">
      {showLogin && <div className="wallpaper" />}

      {showBoot && (
        <div className="main-container boot-screen">
          <div className="logo-area">
            <img className="logo" src="/logos/apple-logo.png" style={{ filter: 'invert(1)' }} alt="Mac" />
          </div>
          <div className="boot-bar-container">
            <div ref={fillRef} className="boot-bar-fill" />
          </div>
        </div>
      )}

      {showLogin && (
        <div
          className={`login-screen ${isUnlocking ? 'unlocking' : ''} ${slideActive ? 'slide-active' : ''}`}
          style={{ '--slide': slideProgress }}
        >
          <div className="wallpaper-sheen" />
          <div className="status-icons">
            <span>U.S.</span>
            <span>⌁</span>
            <span>◔</span>
            <span>◔</span>
          </div>
          <div className="clock">
            <div className="date">{dateText}</div>
            <div className="time">{timeText}</div>
          </div>
          <div className="login-card liquid-glass">
            <div className="avatar-ring">
              <img className="avatar" src="/logo.jpg" alt="NEXOR"/>
            </div>
            <div className="user-name">NEXOR</div>
            <div className="password-row">
              <input
                type="password"
                placeholder={t('login_password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeydown}
              />
              <button className="go" onClick={handleSubmit} aria-label="Log in">
                ↵
              </button>
            </div>
            <div className="hint">{t('login_hint')}</div>
            {errorText && <div className="error">{errorText}</div>}
          </div>
        </div>
      )}

      {showCookies && (
        <Cookies onConsent={handleCookieConsent} onDecline={handleCookieDecline} />
      )}
    </div>
  );
}
