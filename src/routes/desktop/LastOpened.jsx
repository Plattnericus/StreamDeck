import React from 'react';
import './LastOpened.css';

export default function LastOpened({ lastOpened = [] }) {
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="last-opened">
      <div className="lo-header">
        <h3>Recently Opened</h3>
      </div>
      {lastOpened.length === 0 ? (
        <div className="empty">No recently opened apps</div>
      ) : (
        <div className="list">
          {lastOpened.map((app) => (
            <div className="lo-item" key={app.id}>
              <img src={app.icon} alt={app.name} className="lo-icon" />
              <div className="lo-info">
                <div className="lo-name">{app.name}</div>
                <div className="lo-meta">
                  <span className="lo-time">{formatDate(app.timestamp)}</span>
                  <span className="lo-count">({app.openCount}x)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
