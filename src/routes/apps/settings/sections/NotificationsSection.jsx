// ─── Notifications Settings Section ───
// this handles: notifications on/off, app badges, notification sounds,
// preview mode (always/when unlocked/never), and Do Not Disturb toggle
import React from 'react';
import { IosGroup, IosRow, IosToggle, IosSelect } from '../primitives';
import { BellIcon, MessageIcon, SoundFxIcon, DoNotDisturbIcon } from '../icons';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function NotificationsSection({ settings, toggle, update }) {
  const t = useTranslation();

  return (
    <IosGroup>
      <IosRow icon={<BellIcon />} iconClass="red" label={t('notifications')}>
        <IosToggle checked={settings.notifications} onChange={() => toggle('notifications')} />
      </IosRow>

      <IosRow icon={<MessageIcon />} iconClass="blue" label={t('app_badges')}>
        <IosToggle
          checked={settings.appBadges}
          onChange={() => toggle('appBadges')}
          disabled={!settings.notifications}
        />
      </IosRow>

      <IosRow icon={<SoundFxIcon />} iconClass="orange" label={t('notification_sound')}>
        <IosToggle
          checked={settings.notificationSound}
          onChange={() => toggle('notificationSound')}
          disabled={!settings.notifications}
        />
      </IosRow>

      <IosSelect
        icon={<MessageIcon />}
        iconClass="gray"
        label={t('show_previews')}
        value={settings.showPreviews}
        options={[
          { value: 'always', label: t('preview_always') },
          { value: 'unlocked', label: t('preview_unlocked') },
          { value: 'never', label: t('preview_never') },
        ]}
        onChange={v => update('showPreviews', v)}
      />

      <IosRow icon={<DoNotDisturbIcon />} iconClass="purple" label={t('do_not_disturb')}>
        <IosToggle checked={settings.doNotDisturb} onChange={() => toggle('doNotDisturb')} />
      </IosRow>
    </IosGroup>
  );
}
