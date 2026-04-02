// ─── Netzwerk-Einstellungen ───
// alle Netzwerk-Toggles: WLAN, Bluetooth, Flugmodus, Mobilfunk und VPN
// Flugmodus aktivieren schaltet WLAN und Mobilfunk automatisch aus
// WLAN oder Mobilfunk einschalten deaktiviert den Flugmodus
import React from 'react';
import { IosGroup, IosRow, IosToggle } from '../primitives';
import { WifiIcon, BluetoothIcon, AirplaneIcon, CellularIcon, VpnIcon } from '../icons';
import { useTranslation } from '../../../../i18n/LanguageContext';

export default function NetworkSection({ settings, update, toggle, batch }) {
  const t = useTranslation();

  // Flugmodus einschalten deaktiviert WLAN und Mobilfunk gleichzeitig
  function handleAirplane() {
    if (!settings.airplane) {
      batch({ wifi: false, cellular: false, airplane: true });
    } else {
      toggle('airplane');
    }
  }

  // Enabling wifi or cellular turns off airplane mode
  function toggleWifi() {
    if (!settings.wifi) update('airplane', false);
    toggle('wifi');
  }

  function toggleBluetooth() {
    toggle('bluetooth');
  }

  function toggleCellular() {
    if (!settings.cellular) update('airplane', false);
    toggle('cellular');
  }

  function toggleVpn() {
    toggle('vpn');
  }

  return (
    <IosGroup>
      <IosRow icon={<AirplaneIcon />} iconClass="orange" label={t('airplane')} onClick={handleAirplane}>
        <IosToggle checked={settings.airplane} onChange={handleAirplane} />
      </IosRow>

      <IosRow
        icon={<WifiIcon />}
        iconClass="blue"
        label={t('wifi')}
        value={settings.wifi ? t('connected') : t('off')}
        chevron
        onClick={toggleWifi}
      >
        <IosToggle checked={settings.wifi} onChange={toggleWifi} />
      </IosRow>

      <IosRow
        icon={<BluetoothIcon />}
        iconClass="blue"
        label={t('bluetooth')}
        value={settings.bluetooth ? t('on') : t('off')}
        chevron
        onClick={toggleBluetooth}
      >
        <IosToggle checked={settings.bluetooth} onChange={toggleBluetooth} />
      </IosRow>

      <IosRow icon={<CellularIcon />} iconClass="green" label={t('cellular')} chevron onClick={toggleCellular}>
        <IosToggle checked={settings.cellular} onChange={toggleCellular} />
      </IosRow>

      <IosRow icon={<VpnIcon />} iconClass="indigo" label={t('vpn')} chevron onClick={toggleVpn}>
        <IosToggle checked={settings.vpn} onChange={toggleVpn} />
      </IosRow>
    </IosGroup>
  );
}
