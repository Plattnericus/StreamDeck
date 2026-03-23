import React from 'react';
import { IosGroup, IosRow, IosToggle, IosSlider } from '../primitives';
import { SunIcon, PaletteIcon, TextIcon, GlassIcon } from '../icons';
import { ACCENT_COLORS } from '../settingsStore';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function AppearanceSection({ settings, update, toggle }) {
  const t = useTranslation();

  return (
    <>
      <IosGroup>
        <div className="st-ios-mode-row">
          <button
            className={`st-ios-mode-thumb dark-preview${!settings.darkMode ? ' selected' : ''}`}
            onClick={() => update('darkMode', false)}
          >
            {t('mode_dark')}
          </button>
          <button
            className={`st-ios-mode-thumb light-preview${settings.darkMode ? ' selected' : ''}`}
            onClick={() => update('darkMode', true)}
          >
            {t('mode_light')}
          </button>
        </div>
        <IosSlider
          icon={<SunIcon />}
          iconClass="yellow"
          label={t('brightness')}
          value={settings.brightness}
          min={10}
          max={100}
          onChange={v => update('brightness', v)}
        />
      </IosGroup>

      <IosGroup>
        <IosRow icon={<PaletteIcon />} iconClass="purple" label={t('accent_color')}>
          <div className="st-ios-swatches">
            {Object.entries(ACCENT_COLORS).map(([key, color]) => (
              <button
                key={key}
                className={`st-ios-swatch${settings.accentColor === key ? ' selected' : ''}`}
                style={{ background: color }}
                onClick={() => update('accentColor', key)}
                aria-label={key}
              />
            ))}
          </div>
        </IosRow>

        <IosRow icon={<TextIcon />} iconClass="blue" label={t('font_size')}>
          <select
            className="st-ios-select"
            value={settings.fontSize}
            onChange={e => update('fontSize', e.target.value)}
          >
            <option value="small">{t('font_small')}</option>
            <option value="medium">{t('font_medium')}</option>
            <option value="large">{t('font_large')}</option>
          </select>
        </IosRow>

        <IosRow icon={<GlassIcon />} iconClass="indigo" label={t('reduce_transparency')}>
          <IosToggle checked={settings.reduceTransparency} onChange={() => toggle('reduceTransparency')} />
        </IosRow>
      </IosGroup>
    </>
  );
}
