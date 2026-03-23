import React, { useState } from 'react';
import { IosGroup, IosRow } from '../primitives';
import { InfoIcon, CodeIcon, UserIcon, CpuIcon, MonitorIcon, LightbulbIcon, MacIcon } from '../icons';
import AboutMac from '../AboutMac';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function AboutSection() {
  const t = useTranslation();
  const [showMac, setShowMac] = useState(false);

  if (showMac) {
    return (
      <div style={{ padding: '0 0 80px' }}>
        <div style={{ padding: '8px 16px 12px' }}>
          <button className="st-ios-btn" onClick={() => setShowMac(false)}>
            ← {t('about_title')}
          </button>
        </div>
        <AboutMac />
      </div>
    );
  }

  return (
    <>
      <div className="st-about-logo-card" style={{ marginTop: 0 }}>
        <div className="st-about-logo-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="8" height="8" rx="1.5"/>
            <rect x="13" y="3" width="8" height="8" rx="1.5"/>
            <rect x="3" y="13" width="8" height="8" rx="1.5"/>
            <rect x="13" y="13" width="8" height="8" rx="1.5"/>
          </svg>
        </div>
        <div className="st-about-app-name">{t('app_name')}</div>
        <div className="st-about-version">{t('version')} 1.0.0</div>
      </div>

      <IosGroup>
        <IosRow icon={<InfoIcon />} iconClass="blue" label={t('version')} value="1.0.0" />
        <IosRow icon={<CodeIcon />} iconClass="gray" label={t('build')} value="2026.03" />
        <IosRow icon={<UserIcon />} iconClass="blue" label={t('developer')} value="Felix Plattner" />
        <IosRow icon={<CodeIcon />} iconClass="gray" label={t('license')} value="MIT" />
      </IosGroup>

      <IosGroup label={t('hardware')}>
        <IosRow icon={<CpuIcon />} iconClass="orange" label={t('mcu')} value="RP2040" />
        <IosRow icon={<MonitorIcon />} iconClass="blue" label={t('display_hw')} value='Nextion 3.2"' />
        <IosRow icon={<LightbulbIcon />} iconClass="yellow" label={t('leds')} value="WS2812B" />
        <IosRow icon={<InfoIcon />} iconClass="gray" label={t('buttons')} value="15 + Encoder" />
        <IosRow icon={<InfoIcon />} iconClass="brown" label={t('case_hw')} value="PLA 3D-Druck" />
      </IosGroup>

      <IosGroup>
        <IosRow icon={<MacIcon />} iconClass="gray" label={t('about_mac')} chevron onClick={() => setShowMac(true)} />
      </IosGroup>
    </>
  );
}
