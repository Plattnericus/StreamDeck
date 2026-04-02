// ─── Info-Seite ───
// Ausführliche Dokumentation zum StreamDeck-Projekt.
// Tabs: Übersicht, Hardware, Verkabelung, Software, 3D-Druck, Bauanleitung, Features, Inspiration.
import { useState } from "react";
import "./Info.css";

const navItems = [
  { icon: "◎", label: "Overview" },
  { icon: "⬡", label: "Hardware" },
  { icon: "⌁", label: "Wiring" },
  { icon: "◈", label: "Software" },
  { icon: "◻", label: "3D Print" },
  { icon: "⟳", label: "Build Steps" },
  { icon: "✦", label: "Features" },
  { icon: "↗", label: "Inspiration" },
];

export default function Info() {
  const [active, setActive] = useState(0);

  return (
    <div className="info">

      {/* ── Sidebar ── */}
      <div className="info-sidebar">
        <div className="info-sidebar-section">Navigation</div>

        {navItems.map((n, i) => (
          <button
            key={i}
            className={`info-nav-btn ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="nav-icon">{n.icon}</span>
            {n.label}
          </button>
        ))}

        <div className="info-sidebar-divider" />

        <div className="info-source-box">
          <div className="info-source-heading">Source</div>
          <a
            className="info-source-link"
            href="https://www.instructables.com/DIY-Stream-Deck-With-Arduino-Nextion-Customize-You/"
            target="_blank"
            rel="noreferrer"
          >
            ↗ Instructables
          </a>
          <div className="info-source-note">
            Original by Giuseppe Romano. Adapted and rebuilt for this custom setup.
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="info-main">
        <div className="info-content">

          {/* Overview */}
          {active === 0 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">Overview</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              <div className="kv-row">
                <span className="kv-key">Project name</span>
                <span className="kv-val">DIY Macro Touch Deck</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Category</span>
                <span className="kv-val">Electronics / Embedded</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Skill level</span>
                <span className="kv-val orange">Intermediate</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Estimated cost</span>
                <span className="kv-val green">€ 25 – 40</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Build time</span>
                <span className="kv-val">1 – 2 days</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Status</span>
                <span className="kv-val green">Fully operational</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Open source</span>
                <span className="kv-val green">Yes — MIT</span>
              </div>
              <div className="info-prose">
                A fully handmade macro device with a capacitive touchscreen, physical buttons, and RGB lighting. Every key is programmable — launch apps, trigger OBS scenes, send keyboard shortcuts, control audio — all with a single tap. <strong>No subscription. No cloud. Fully local.</strong>
              </div>
            </div>
          </div>
          )}

          {/* Hardware */}
          {active === 1 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">Hardware</span>
              <div className="section-line" />
            </div>

            <div className="info-grid">
              <div className="info-card">
                <div className="kv-row">
                  <span className="kv-key">MCU</span>
                  <span className="kv-val mono">Pro Micro</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Chip</span>
                  <span className="kv-val mono">ATmega32U4</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Clock</span>
                  <span className="kv-val mono">16 MHz</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Flash</span>
                  <span className="kv-val mono">32 KB</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Voltage</span>
                  <span className="kv-val mono">5 V</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">USB</span>
                  <span className="kv-val">Native HID</span>
                </div>
              </div>

              <div className="info-card">
                <div className="kv-row">
                  <span className="kv-key">Display</span>
                  <span className="kv-val">Nextion 3.2"</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Type</span>
                  <span className="kv-val">TFT Resistive</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Resolution</span>
                  <span className="kv-val mono">400 × 240</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Interface</span>
                  <span className="kv-val mono">UART 9600</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">RGB MCU</span>
                  <span className="kv-val mono">Arduino Nano</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">LED type</span>
                  <span className="kv-val">WS2812B strip</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="kv-row">
                <span className="kv-key">Physical buttons</span>
                <span className="kv-val">2 – 5 × tactile push</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Pull mode</span>
                <span className="kv-val mono">INPUT_PULLUP</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Case material</span>
                <span className="kv-val">PLA — 3D Printed</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Fasteners</span>
                <span className="kv-val mono">M3 screws & hex nuts</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Infill</span>
                <span className="kv-val mono">30 %</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Perimeters</span>
                <span className="kv-val mono">2</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Power draw</span>
                <span className="kv-val mono">~480 mA peak</span>
              </div>
            </div>

            <div className="info-card">
              <div className="section-header" style={{ padding: "8px 14px 0", margin: 0 }}>
                <span className="kv-key" style={{ fontSize: 10 }}>Complexity ratings</span>
              </div>
              {[
                { label: "Wiring",      pct: 60 },
                { label: "Firmware",    pct: 45 },
                { label: "3D Print",    pct: 30 },
                { label: "UI Design",   pct: 55 },
                { label: "Calibration", pct: 25 },
              ].map((s, i) => (
                <div key={i} className="spec-bar-row">
                  <span className="spec-bar-label">{s.label}</span>
                  <div className="spec-bar-track">
                    <div className="spec-bar-fill" style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="spec-bar-val">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Wiring */}
          {active === 2 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">Wiring Diagram</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              {[
                { from: "Nextion TX",  to: "Pro Micro RX (D0)",  note: "Display → MCU" },
                { from: "Nextion RX",  to: "Pro Micro TX (D1)",  note: "MCU → Display" },
                { from: "Nextion VCC", to: "5 V rail",            note: "Power" },
                { from: "Nextion GND", to: "GND rail",            note: "Common ground" },
                { from: "Button 1",    to: "Pro Micro D4",        note: "PULLUP active low" },
                { from: "Button 2",    to: "Pro Micro D5",        note: "PULLUP active low" },
                { from: "WS2812B DIN", to: "Nano D6",             note: "Data signal" },
                { from: "LED VCC",     to: "5 V rail",            note: "Separate power" },
                { from: "Nano GND",    to: "GND rail",            note: "Common ground" },
              ].map((w, i) => (
                <div key={i} className="wire-row">
                  <span className="wire-from">{w.from}</span>
                  <span className="wire-arrow">→</span>
                  <span className="wire-to">{w.to}</span>
                  <span className="wire-note">{w.note}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Software */}
          {active === 3 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">Software & Firmware</span>
              <div className="section-line" />
            </div>
            <div className="info-grid">
              <div className="info-card">
                <div className="kv-row">
                  <span className="kv-key">IDE</span>
                  <span className="kv-val">Arduino IDE 2</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">HID lib</span>
                  <span className="kv-val mono">Keyboard.h</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Key range</span>
                  <span className="kv-val mono">F13 – F24</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Serial baud</span>
                  <span className="kv-val mono">9600</span>
                </div>
              </div>
              <div className="info-card">
                <div className="kv-row">
                  <span className="kv-key">Display tool</span>
                  <span className="kv-val">Nextion Editor</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Flash method</span>
                  <span className="kv-val">SD card FAT32</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">File format</span>
                  <span className="kv-val mono">.TFT</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">RGB lib</span>
                  <span className="kv-val mono">FastLED</span>
                </div>
              </div>
            </div>
            <div className="info-card">
              <div className="kv-row">
                <span className="kv-key">Protocol</span>
                <span className="kv-val">Nextion sends button ID via UART; Arduino maps ID → F-key press</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Conflict avoidance</span>
                <span className="kv-val">F13–F24 unused by OS → zero shortcut conflicts</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">App binding</span>
                <span className="kv-val">OBS hotkeys, Filmora shortcuts, Windows bindings</span>
              </div>
              <div className="info-prose">
                Each touchscreen button sends a numeric ID over UART. The Pro Micro receives it, then uses <strong>Keyboard.h</strong> to emit a keystroke — chosen from the rarely-used F13–F24 range to avoid conflicts with system shortcuts. This makes binding to any app completely frictionless.
              </div>
            </div>
          </div>
          )}

          {/* 3D Print */}
          {active === 4 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">3D Print Specs</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              <div className="kv-row">
                <span className="kv-key">Material</span>
                <span className="kv-val">PLA</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Layer height</span>
                <span className="kv-val mono">0.2 mm</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Infill</span>
                <span className="kv-val mono">30 %</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Perimeters</span>
                <span className="kv-val mono">2</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Supports</span>
                <span className="kv-val orange">Yes — display cutout</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Print time</span>
                <span className="kv-val">~4 h</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Post-process</span>
                <span className="kv-val">Tap M3 holes, sand edges</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">File format</span>
                <span className="kv-val mono">.STL / .STEP</span>
              </div>
            </div>
          </div>
          )}

          {/* Build Steps */}
          {active === 5 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">Build Steps</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              {[
                {
                  n: "01", title: "Design the UI",
                  desc: "Open Nextion Editor. Create pages, place buttons, add icons and labels. Export as .TFT, copy to FAT32 SD, insert into display to flash."
                },
                {
                  n: "02", title: "Wire Pro Micro ↔ Nextion",
                  desc: "Connect TX/RX cross-wired. Share 5 V and GND. Verify with a simple echo sketch before writing final firmware."
                },
                {
                  n: "03", title: "Wire buttons",
                  desc: "Solder push buttons between signal pin and GND. Enable INPUT_PULLUP in firmware — no external resistors needed."
                },
                {
                  n: "04", title: "Flash firmware",
                  desc: "Upload main sketch: read UART byte from Nextion, press matching F-key via Keyboard.h. Test each button in a text editor first."
                },
                {
                  n: "05", title: "Set up RGB (optional)",
                  desc: "Flash Nano with FastLED sketch. Wire DIN of WS2812B strip to D6. Power strip separately to avoid brownouts on the Pro Micro."
                },
                {
                  n: "06", title: "3D print the case",
                  desc: "Print enclosure with supports for the display cutout. Tap M3 holes. Mount boards with standoffs, route USB cable through rear slot."
                },
                {
                  n: "07", title: "Bind shortcuts",
                  desc: "Open OBS → Settings → Hotkeys. Assign each F-key (F13–F24) to a scene, source mute, recording toggle, etc. Repeat for other apps."
                },
              ].map((s, i) => (
                <div key={i} className="step-row">
                  <div className="step-num">{s.n}</div>
                  <div className="step-body">
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Features */}
          {active === 6 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">Features & Capabilities</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              <div className="tag-cloud">
                {[
                  ["OBS scene switch", true], ["Start / stop recording", true],
                  ["Launch any app", true],  ["Open folder / URL", true],
                  ["Screenshot", true],      ["Media play / pause", true],
                  ["Volume control", true],  ["Mute microphone", true],
                  ["Multi-page UI", false],  ["Custom icons", false],
                  ["RGB ambient light", false], ["Physical encoder", false],
                  ["HID keyboard spoof", false], ["F13–F24 range", false],
                  ["Zero driver install", false], ["Works on Windows & macOS", false],
                  ["Filmora shortcuts", false], ["Unlimited profiles", false],
                ].map(([tag, hl], i) => (
                  <span key={i} className={`info-tag ${hl ? "hl" : ""}`}>{tag}</span>
                ))}
              </div>
              <div className="info-prose">
                Because the device emulates a standard USB keyboard, <strong>no drivers are required</strong>. It works out of the box on Windows, macOS, and Linux — any application that accepts keyboard shortcuts can be controlled.
              </div>
            </div>
          </div>
          )}

          {/* Inspiration */}
          {active === 7 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">Inspiration & Credits</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              <div className="kv-row">
                <span className="kv-key">Original author</span>
                <span className="kv-val">Giuseppe Romano</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Platform</span>
                <span className="kv-val">
                  <a href="https://www.instructables.com/DIY-Stream-Deck-With-Arduino-Nextion-Customize-You/" target="_blank" rel="noreferrer">
                    Instructables ↗
                  </a>
                </span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Published</span>
                <span className="kv-val">2023</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Relation</span>
                <span className="kv-val orange">Inspiration — not a copy</span>
              </div>
              <div className="info-prose">
                This build was sparked by Giuseppe Romano's Instructables guide, which proved that a full-featured macro deck could be built for a fraction of the official Elgato price. The core idea — UART + HID keyboard — was kept. Everything else: the enclosure, wiring, UI layout, firmware architecture, and feature set was designed and built from scratch. <strong>The result is a device that fits exactly how I work.</strong>
              </div>
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  );
}