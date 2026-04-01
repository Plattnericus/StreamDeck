// ─── Sound Settings Section ───
// this handles: volume slider, mute toggle, sound effects on/off, and startup sound
// the volume is connected to the music player in the Control Center
import React from 'react';
import { IosGroup, IosRow, IosToggle, IosSlider } from '../primitives';
import { VolumeIcon, VolumeMuteIcon, SoundFxIcon, LightbulbIcon } from '../icons';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function SoundSection({ settings, update, toggle }) {
  const t = useTranslation();

  return (
    <IosGroup>
      <IosSlider
        icon={<VolumeIcon />}
        iconClass="orange"
        label={t('volume')}
        value={settings.volume}
        min={0}
        max={100}
        onChange={v => update('volume', v)}
      />

      <IosRow icon={<VolumeMuteIcon />} iconClass="red" label={t('mute')}>
        <IosToggle checked={settings.muted} onChange={() => toggle('muted')} />
      </IosRow>

      <IosRow icon={<SoundFxIcon />} iconClass="orange" label={t('sound_effects')}>
        <IosToggle checked={settings.soundEffects} onChange={() => toggle('soundEffects')} />
      </IosRow>

      <IosRow icon={<LightbulbIcon />} iconClass="yellow" label={t('startup_sound')}>
        <IosToggle checked={settings.startupSound} onChange={() => toggle('startupSound')} />
      </IosRow>
    </IosGroup>
  );
}
