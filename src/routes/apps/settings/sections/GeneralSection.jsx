// ─── General Settings Section ───
// this handles: language selection, clock format (24h), date format, seconds display,
// motion reduction, auto-lock, and a reset button to go back to defaults
// the language change triggers a live update across the whole app
import React from 'react';
import { IosGroup, IosRow, IosToggle, IosSelect } from '../primitives';
import { GlobeIcon, ClockIcon, CalendarIcon, MotionIcon, LockIcon, ResetIcon } from '../icons';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function GeneralSection({ settings, update, toggle, onReset }) {
  const t = useTranslation();

  return (
    <>
      <IosGroup>
        <IosSelect
          icon={<GlobeIcon />}
          iconClass="blue"
          label={t('language')}
          value={settings.language}
          options={[
            { value: 'de', label: '🇩🇪  Deutsch' },
            { value: 'en', label: '🇬🇧  English' },
            { value: 'it', label: '🇮🇹  Italiano' },
          ]}
          onChange={v => update('language', v)}
        />
      </IosGroup>

      <IosGroup>
        <IosRow icon={<ClockIcon />} iconClass="blue" label={t('clock_24h')}>
          <IosToggle checked={settings.use24hClock} onChange={() => toggle('use24hClock')} />
        </IosRow>

        <IosRow icon={<ClockIcon />} iconClass="teal" label={t('show_seconds')}>
          <IosToggle checked={settings.showSeconds} onChange={() => toggle('showSeconds')} />
        </IosRow>

        <IosSelect
          icon={<CalendarIcon />}
          iconClass="blue"
          label={t('date_format')}
          value={settings.dateFormat}
          options={[
            { value: 'de', label: t('date_de') },
            { value: 'iso', label: t('date_iso') },
          ]}
          onChange={v => update('dateFormat', v)}
        />
      </IosGroup>

      <IosGroup>
        <IosRow icon={<MotionIcon />} iconClass="gray" label={t('reduce_motion')}>
          <IosToggle checked={settings.reduceMotion} onChange={() => toggle('reduceMotion')} />
        </IosRow>

        <IosRow icon={<LockIcon />} iconClass="gray" label={t('auto_lock')}>
          <IosToggle checked={settings.autoLock} onChange={() => toggle('autoLock')} />
        </IosRow>
      </IosGroup>

      <IosGroup>
        <div className="st-ios-row-center">
          <button className="st-ios-btn danger" onClick={onReset}>
            <ResetIcon /> {t('reset_settings')}
          </button>
        </div>
      </IosGroup>
    </>
  );
}
