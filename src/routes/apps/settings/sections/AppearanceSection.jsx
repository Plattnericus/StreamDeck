// Appearance settings — brightness, accent color, font size, and transparency
import React from 'react';
import { IosGroup, IosRow, IosToggle, IosSlider, IosSelect } from '../primitives';
import { SunIcon, PaletteIcon, TextIcon, GlassIcon } from '../icons';
import { ACCENT_COLORS } from '../settingsStore';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function AppearanceSection({ settings, update, toggle }) {
  const t = useTranslation();

  return (
    <>
      <IosGroup>
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

        <IosSelect
          icon={<TextIcon />}
          iconClass="blue"
          label={t('font_size')}
          value={settings.fontSize}
          options={[
            { value: 'small',  label: t('font_small') },
            { value: 'medium', label: t('font_medium') },
            { value: 'large',  label: t('font_large') },
          ]}
          onChange={v => update('fontSize', v)}
        />

        <IosRow icon={<GlassIcon />} iconClass="indigo" label={t('reduce_transparency')}>
          <IosToggle checked={settings.reduceTransparency} onChange={() => toggle('reduceTransparency')} />
        </IosRow>
      </IosGroup>
    </>
  );
}
