// ─── Privacy Settings Section ───
// this handles: cookie consent status, camera/microphone permissions,
// analytics toggle, cache clearing, and the "delete all data" button
// the cookie status reads from localStorage and can be reset here
import React from 'react';
import { IosGroup, IosRow, IosToggle } from '../primitives';
import { CookieIcon, CameraIcon, MicIcon, BarChartIcon, TrashIcon } from '../icons';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function PrivacySection({ settings, toggle, cookieConsent, onResetCookies, onDeleteAll }) {
  const t = useTranslation();

  const consentLabel =
    cookieConsent === 'accepted' ? t('cookie_accepted')
    : cookieConsent === 'declined' ? t('cookie_declined')
    : t('cookie_pending');

  const consentClass =
    cookieConsent === 'accepted' ? 'ok'
    : cookieConsent === 'declined' ? 'warn'
    : 'none';

  return (
    <>
      <IosGroup>
        <IosRow icon={<CookieIcon />} iconClass="orange" label={t('cookie_consent')}>
          <span className={`st-ios-badge ${consentClass}`}>{consentLabel}</span>
          <button className="st-ios-btn" onClick={onResetCookies} style={{ padding: '4px 10px', fontSize: 12 }}>
            {t('cookie_reset')}
          </button>
        </IosRow>
      </IosGroup>

      <IosGroup>
        <IosRow icon={<CameraIcon />} iconClass="gray" label={t('camera')}>
          <IosToggle checked={settings.allowCamera} onChange={() => toggle('allowCamera')} />
        </IosRow>

        <IosRow icon={<MicIcon />} iconClass="gray" label={t('microphone')}>
          <IosToggle checked={settings.allowMicrophone} onChange={() => toggle('allowMicrophone')} />
        </IosRow>

        <IosRow icon={<BarChartIcon />} iconClass="blue" label={t('analytics')}>
          <IosToggle checked={settings.analyticsEnabled} onChange={() => toggle('analyticsEnabled')} />
        </IosRow>
      </IosGroup>

      <IosGroup>
        <div className="st-ios-row-center">
          <button
            className="st-ios-btn danger"
            onClick={onDeleteAll}
          >
            <TrashIcon /> {t('delete_all')}
          </button>
        </div>
      </IosGroup>
    </>
  );
}
