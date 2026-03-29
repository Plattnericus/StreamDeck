// "About This Mac" dialog — shows hardware specs like a real macOS about screen
import React from 'react';
import './AboutMac.css';

export default function AboutMac() {
  function openLink() {
    window.open('https://www.apple.com/macbook-pro/', '_blank');
  }

  return (
    <div className="about">
      <img className="mac-img" src="/MAC.png" alt="MacBook Pro" />
      <h1 className="title">MacBook Pro</h1>
      <p className="subtitle">15", 2023</p>
      <div className="specs">
        <div className="row"><span className="key">Chip</span><span className="val">Apple M3 Pro</span></div>
        <div className="row"><span className="key">Speicher</span><span className="val">18 GB</span></div>
        <div className="row"><span className="key">Seriennummer</span><span className="val">XY0XX0Y0X0</span></div>
        <div className="row"><span className="key">macOS</span><span className="val">Tahoe 26.0.1</span></div>
      </div>
      <button onClick={openLink} className="more-btn">Weitere Infos ...</button>
      <div className="footer">
        <a href="/" className="footer-link" onClick={e => e.preventDefault()}>Regulatorische Zertifizierung</a>
        <p className="footer-copy">™ und ® 1983–2026 Apple Inc.<br />Alle Rechte vorbehalten.</p>
      </div>
    </div>
  );
}
