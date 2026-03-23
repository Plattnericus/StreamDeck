import React from 'react';
import { IosGroup, IosRow, IosToggle } from '../primitives';
import { WifiIcon, BluetoothIcon, AirplaneIcon, CellularIcon, VpnIcon } from '../icons';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function NetworkSection({ settings, update, toggle, batch }) {
  const t = useTranslation();

  function handleAirplane() {
    if (!settings.airplane) {
      batch({ wifi: false, cellular: false, airplane: true });
    } else {
      toggle('airplane');
    }
  }

  return (
    <IosGroup>
      <IosRow icon={<AirplaneIcon />} iconClass="orange" label={t('airplane')}>
        <IosToggle checked={settings.airplane} onChange={handleAirplane} />
      </IosRow>

      <IosRow
        icon={<WifiIcon />}
        iconClass="blue"
        label={t('wifi')}
        value={settings.wifi ? t('connected') : t('off')}
        chevron
      >
        <IosToggle
          checked={settings.wifi}
          onChange={() => {
            if (!settings.wifi) update('airplane', false);
            toggle('wifi');
          }}
        />
      </IosRow>

      <IosRow
        icon={<BluetoothIcon />}
        iconClass="blue"
        label={t('bluetooth')}
        value={settings.bluetooth ? t('on') : t('off')}
        chevron
      >
        <IosToggle checked={settings.bluetooth} onChange={() => toggle('bluetooth')} />
      </IosRow>

      <IosRow icon={<CellularIcon />} iconClass="green" label={t('cellular')} chevron>
        <IosToggle
          checked={settings.cellular}
          onChange={() => {
            if (!settings.cellular) update('airplane', false);
            toggle('cellular');
          }}
        />
      </IosRow>

      <IosRow icon={<VpnIcon />} iconClass="indigo" label={t('vpn')} chevron>
        <IosToggle checked={settings.vpn} onChange={() => toggle('vpn')} />
      </IosRow>
    </IosGroup>
  );
}
