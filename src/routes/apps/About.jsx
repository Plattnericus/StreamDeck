// ─── About Page ───
// this is the "About" app — it shows general info about the StreamDeck project
// it has a sidebar and content area, similar to a macOS About window
import "./About.css";
import { useTranslation } from '../../i18n/LanguageContext';

export default function About() {
  const t = useTranslation();

  return (
    <div className="about">
      <div className="about-sidebar">
        <div className="about-icon-wrap">
          <img src="/galerie/streamdeck.png" alt="StreamDeck" />
        </div>

        <div className="about-name">StreamDeck</div>
        <div className="about-badge">
          <span className="about-badge-dot" />
          v 1.0.0
        </div>

        <div className="about-divider" />

        <div className="about-diy-label">{t('hardware')}</div>
        <div className="about-diy-info">
          <div className="about-diy-row">
            <span className="diy-key">{t('type_key')}</span>
            <span className="diy-val">{t('diy_build')}</span>
          </div>
          <div className="about-diy-row">
            <span className="diy-key">{t('mcu')}</span>
            <span className="diy-val">RP2040</span>
          </div>
          <div className="about-diy-row">
            <span className="diy-key">{t('keys_label')}</span>
            <span className="diy-val">15</span>
          </div>
          <div className="about-diy-row">
            <span className="diy-key">{t('encoder')}</span>
            <span className="diy-val green">{t('yes_label')}</span>
          </div>
          <div className="about-diy-row">
            <span className="diy-key">{t('display_hw')}</span>
            <span className="diy-val green">{t('yes_label')}</span>
          </div>
        </div>
      </div>

      <div className="about-main">
        <div className="about-group">
          <div className="group-label">{t('about_application')}</div>
          <div className="group-card">
            <div className="info-row">
              <span className="info-key">{t('name_label')}</span>
              <span className="info-val">{t('app_full_name')}</span>
            </div>
            <div className="info-row">
              <span className="info-key">{t('version')}</span>
              <span className="info-val mono">1.0.0</span>
            </div>
            <div className="info-row">
              <span className="info-key">{t('build')}</span>
              <span className="info-val mono">2025.03.01</span>
            </div>
          </div>
        </div>

        <div className="about-group">
          <div className="group-label">{t('about_developer_label')}</div>
          <div className="group-card">
            <div className="info-row">
              <span className="info-key">{t('built_by')}</span>
              <span className="info-val handmade">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {t('handmade')}
              </span>
            </div>
            <div className="info-row">
              <span className="info-key">{t('firmware')}</span>
              <span className="info-val mono">KMK / CircuitPython</span>
            </div>
            <div className="info-row">
              <span className="info-key">{t('website')}</span>
              <span className="info-val">
                <a href="https://elgato.com" target="_blank" rel="noreferrer">elgato.com</a>
              </span>
            </div>
          </div>
        </div>

        <div className="about-group">
          <div className="group-label">{t('about_system')}</div>
          <div className="group-card">
            <div className="info-row">
              <span className="info-key">{t('platform')}</span>
              <span className="info-val">macOS 15 Sequoia</span>
            </div>
            <div className="info-row">
              <span className="info-key">{t('architecture')}</span>
              <span className="info-val mono">arm64</span>
            </div>
            <div className="info-row">
              <span className="info-key">{t('license')}</span>
              <span className="info-val">MIT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
