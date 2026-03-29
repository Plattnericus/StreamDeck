// Reusable iOS-style UI primitives: toggle switch, grouped cards, rows, sliders, and selects
import React from 'react';

// iOS-style toggle switch
export function IosToggle({ checked, onChange, disabled }) {
  return (
    <button
      className={`st-ios-toggle${checked ? ' on' : ''}`}
      onClick={disabled ? undefined : (e) => { e.stopPropagation(); onChange && onChange(); }}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
    >
      <span className="st-ios-toggle-thumb" />
    </button>
  );
}

// Card group with optional label header
export function IosGroup({ label, children }) {
  return (
    <div className="st-ios-group">
      {label ? <div className="st-ios-group-label">{label}</div> : null}
      <div className="st-ios-card">{children}</div>
    </div>
  );
}

// Single settings row with icon, label, optional value, chevron, and custom children
export function IosRow({ icon, iconClass = 'gray', label, value, chevron, onClick, children }) {
  return (
    <div className={`st-ios-row${onClick ? ' tappable' : ''}`} onClick={onClick}>
      {icon && <span className={`st-ios-icon ${iconClass}`}>{icon}</span>}
      <span className="st-ios-label">{label}</span>
      <div className="st-ios-right">
        {value != null && value !== '' && <span className="st-ios-value">{value}</span>}
        {children}
        {chevron && <span className="st-ios-chevron" />}
      </div>
    </div>
  );
}

// Range slider row with label and current value display
export function IosSlider({ icon, iconClass = 'gray', label, value, min, max, onChange, unit = '%' }) {
  return (
    <div className="st-ios-slider-row">
      <div className="st-ios-slider-header">
        <span className="st-ios-slider-label">
          {icon && <span className={`st-ios-icon ${iconClass}`}>{icon}</span>}
          {label}
        </span>
        <span className="st-ios-slider-val">{value}{unit}</span>
      </div>
      <input
        className="st-ios-slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
}

// Dropdown select inside a settings row
export function IosSelect({ icon, iconClass = 'gray', label, value, options, onChange }) {
  return (
    <IosRow icon={icon} iconClass={iconClass} label={label}>
      <select
        className="st-ios-select"
        value={value}
        onChange={e => onChange(e.target.value)}
        onClick={e => e.stopPropagation()}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </IosRow>
  );
}
