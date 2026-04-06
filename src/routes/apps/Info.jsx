// ─── Info-Seite ───
// Ausführliche Dokumentation zum StreamDeck-Projekt.
// Tabs: Übersicht, Hardware, Verkabelung, Software, 3D-Druck, Bauanleitung, Features, Inspiration.
import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import infoContent from "../../i18n/info-content";
import "./Info.css";

export default function Info() {
  const [active, setActive] = useState(0);
  const lang = useLanguage();
  const c = infoContent[lang] || infoContent.de;

  const navItems = [
    { icon: "◎", label: c.nav_overview },
    { icon: "⬡", label: c.nav_hardware },
    { icon: "⌁", label: c.nav_wiring },
    { icon: "◈", label: c.nav_software },
    { icon: "◻", label: c.nav_3dprint },
    { icon: "⟳", label: c.nav_buildsteps },
    { icon: "✦", label: c.nav_features },
    { icon: "↗", label: c.nav_inspiration },
  ];

  return (
    <div className="info">

      {/* ── Sidebar ── */}
      <div className="info-sidebar">
        <div className="info-sidebar-section">{c.nav_title}</div>

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
          <div className="info-source-heading">{c.source_heading}</div>
          <a
            className="info-source-link"
            href="https://www.instructables.com/DIY-Stream-Deck-With-Arduino-Nextion-Customize-You/"
            target="_blank"
            rel="noreferrer"
          >
            ↗ Instructables
          </a>
          <div className="info-source-note">
            {c.source_note}
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
              <span className="section-label">{c.overview_title}</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              <div className="kv-row">
                <span className="kv-key">{c.overview_project_name}</span>
                <span className="kv-val">DIY Macro Touch Deck</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.overview_category}</span>
                <span className="kv-val">{c.overview_category_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.overview_skill}</span>
                <span className="kv-val orange">{c.overview_skill_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.overview_cost}</span>
                <span className="kv-val green">€ 25 – 40</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.overview_time}</span>
                <span className="kv-val">{c.overview_time_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.overview_status}</span>
                <span className="kv-val green">{c.overview_status_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.overview_opensource}</span>
                <span className="kv-val green">{c.overview_opensource_val}</span>
              </div>
              <div className="info-prose">
                {c.overview_prose} <strong>{c.overview_prose_strong}</strong>
              </div>
            </div>
          </div>
          )}

          {/* Hardware */}
          {active === 1 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">{c.hardware_title}</span>
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
                <span className="kv-key">{c.hw_physical_buttons}</span>
                <span className="kv-val">{c.hw_physical_buttons_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.hw_pull_mode}</span>
                <span className="kv-val mono">INPUT_PULLUP</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.hw_case_material}</span>
                <span className="kv-val">{c.hw_case_material_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.hw_fasteners}</span>
                <span className="kv-val mono">M3 screws & hex nuts</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_infill}</span>
                <span className="kv-val mono">30 %</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_perimeters}</span>
                <span className="kv-val mono">2</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.hw_power_draw}</span>
                <span className="kv-val mono">~480 mA peak</span>
              </div>
            </div>

            <div className="info-card">
              <div className="section-header" style={{ padding: "8px 14px 0", margin: 0 }}>
                <span className="kv-key" style={{ fontSize: 10 }}>{c.hw_complexity}</span>
              </div>
              {[
                { label: c.hw_bar_wiring,      pct: 60 },
                { label: c.hw_bar_firmware,    pct: 45 },
                { label: c.hw_bar_3dprint,    pct: 30 },
                { label: c.hw_bar_uidesign,   pct: 55 },
                { label: c.hw_bar_calibration, pct: 25 },
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
              <span className="section-label">{c.wiring_title}</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              {[
                { from: "Nextion TX",  to: "Pro Micro RX (D0)",  note: c.wire_note_display_to_mcu },
                { from: "Nextion RX",  to: "Pro Micro TX (D1)",  note: c.wire_note_mcu_to_display },
                { from: "Nextion VCC", to: "5 V rail",            note: c.wire_note_power },
                { from: "Nextion GND", to: "GND rail",            note: c.wire_note_common_ground },
                { from: "Button 1",    to: "Pro Micro D4",        note: c.wire_note_pullup },
                { from: "Button 2",    to: "Pro Micro D5",        note: c.wire_note_pullup },
                { from: "WS2812B DIN", to: "Nano D6",             note: c.wire_note_data },
                { from: "LED VCC",     to: "5 V rail",            note: c.wire_note_separate_power },
                { from: "Nano GND",    to: "GND rail",            note: c.wire_note_common_ground },
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
              <span className="section-label">{c.software_title}</span>
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
                <span className="kv-key">{c.sw_protocol}</span>
                <span className="kv-val">{c.sw_protocol_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.sw_conflict}</span>
                <span className="kv-val">{c.sw_conflict_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.sw_binding}</span>
                <span className="kv-val">{c.sw_binding_val}</span>
              </div>
              <div className="info-prose" dangerouslySetInnerHTML={{ __html: c.sw_prose }} />
            </div>
          </div>
          )}

          {/* 3D Print */}
          {active === 4 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">{c.print_title}</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              <div className="kv-row">
                <span className="kv-key">{c.print_material}</span>
                <span className="kv-val">PLA</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_layer}</span>
                <span className="kv-val mono">0.2 mm</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_infill}</span>
                <span className="kv-val mono">30 %</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_perimeters}</span>
                <span className="kv-val mono">2</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_supports}</span>
                <span className="kv-val orange">{c.print_supports_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_time}</span>
                <span className="kv-val">~4 h</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_postprocess}</span>
                <span className="kv-val">{c.print_postprocess_val}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.print_format}</span>
                <span className="kv-val mono">.STL / .STEP</span>
              </div>
            </div>
          </div>
          )}

          {/* Build Steps */}
          {active === 5 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">{c.build_title}</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              {[
                { n: "01", title: c.build_step1_title, desc: c.build_step1_desc },
                { n: "02", title: c.build_step2_title, desc: c.build_step2_desc },
                { n: "03", title: c.build_step3_title, desc: c.build_step3_desc },
                { n: "04", title: c.build_step4_title, desc: c.build_step4_desc },
                { n: "05", title: c.build_step5_title, desc: c.build_step5_desc },
                { n: "06", title: c.build_step6_title, desc: c.build_step6_desc },
                { n: "07", title: c.build_step7_title, desc: c.build_step7_desc },
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
              <span className="section-label">{c.features_title}</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              <div className="tag-cloud">
                {[
                  [c.feat_obs, true], [c.feat_record, true],
                  [c.feat_launch, true],  [c.feat_folder, true],
                  [c.feat_screenshot, true],      [c.feat_media, true],
                  [c.feat_volume, true],  [c.feat_mute, true],
                  [c.feat_multipage, false],  [c.feat_icons, false],
                  [c.feat_rgb, false], [c.feat_encoder, false],
                  [c.feat_hid, false], [c.feat_fkeys, false],
                  [c.feat_nodrivers, false], [c.feat_crossplatform, false],
                  [c.feat_filmora, false], [c.feat_profiles, false],
                ].map(([tag, hl], i) => (
                  <span key={i} className={`info-tag ${hl ? "hl" : ""}`}>{tag}</span>
                ))}
              </div>
              <div className="info-prose" dangerouslySetInnerHTML={{ __html: c.features_prose }} />
            </div>
          </div>
          )}

          {/* Inspiration */}
          {active === 7 && (
          <div className="info-section">
            <div className="section-header">
              <span className="section-label">{c.inspiration_title}</span>
              <div className="section-line" />
            </div>
            <div className="info-card">
              <div className="kv-row">
                <span className="kv-key">{c.insp_author}</span>
                <span className="kv-val">Giuseppe Romano</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.insp_platform}</span>
                <span className="kv-val">
                  <a href="https://www.instructables.com/DIY-Stream-Deck-With-Arduino-Nextion-Customize-You/" target="_blank" rel="noreferrer">
                    Instructables ↗
                  </a>
                </span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.insp_published}</span>
                <span className="kv-val">2023</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">{c.insp_relation}</span>
                <span className="kv-val orange">{c.insp_relation_val}</span>
              </div>
              <div className="info-prose">
                <span dangerouslySetInnerHTML={{ __html: c.insp_prose }} /> <strong>{c.insp_prose_strong}</strong>
              </div>
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  );
}
