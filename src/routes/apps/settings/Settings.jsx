import React, { useState, useEffect } from 'react';
import './Settings.css';

const defaultSettings = {
  darkMode: false,
  volume: 50,
  notifications: true,
};

export default function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('settings');
      if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
    } catch { /* ignore */ }
    return { ...defaultSettings };
  });

  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const toggleDarkMode = () => setSettings((s) => ({ ...s, darkMode: !s.darkMode }));
  const changeVolume = (e) => setSettings((s) => ({ ...s, volume: Number(e.target.value) }));
  const toggleNotifications = () => setSettings((s) => ({ ...s, notifications: !s.notifications }));

  return (
    <div className="settings-window">
      <div className="settings-tabs">
        <button className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}>Allgemein</button>
        <button className={activeTab === 'sound' ? 'active' : ''} onClick={() => setActiveTab('sound')}>Sound</button>
        <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>Benachrichtigungen</button>
      </div>

      <div className="settings-tab-content">
        {activeTab === 'general' && (
          <div className="setting">
            <label>
              <input type="checkbox" checked={settings.darkMode} onChange={toggleDarkMode} />
              Dark Mode
            </label>
          </div>
        )}

        {activeTab === 'sound' && (
          <div className="setting">
            <label>
              Volume: {settings.volume}
              <input type="range" min="0" max="100" value={settings.volume} onChange={changeVolume} />
            </label>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="setting">
            <label>
              <input type="checkbox" checked={settings.notifications} onChange={toggleNotifications} />
              Notifications
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
