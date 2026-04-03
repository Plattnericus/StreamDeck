// ─── Tutorial-Seite ───
// ausfuehrliche Schritt-fuer-Schritt Bauanleitung fuer das DIY Stream Deck
// Daten kommen von: instructables.com/DIY-Stream-Deck-With-Arduino-Nextion-Customize-You
import { useState, useCallback } from 'react';
import './Tutorial.css';
import { useTranslation } from '../../i18n/LanguageContext';

// Bilder-Pfade (heruntergeladen in /static/galerie/)
const IMG = '/galerie/';

// Arduino-Firmware Code zum Anzeigen
const ARDUINO_CODE = `#define HID_CUSTOM_LAYOUT
#define LAYOUT_ITALIAN
#include <HID-Project.h>

void setup() {
    Serial.begin(9600);   // Debug ueber USB
    Serial1.begin(9600);  // Kommunikation mit Nextion (RX1/TX1)
    Keyboard.begin();     // HID Tastatur aktivieren
    Serial.println("Macro Touch Deck gestartet!");
}

void loop() {
    if (Serial1.available()) {
        char cmd = Serial1.read();
        Serial.print("Befehl empfangen: ");
        Serial.println(cmd);
        executeCommand(cmd);
    }
}

void executeCommand(char cmd) {
    if (cmd == 'a') openURL("https://www.youtube.com");
    else if (cmd == 'b') openURL("https://www.facebook.com");
    else if (cmd == 'c') openURL("https://www.instructables.com");
    else if (cmd == 'd') openProgram("Filmora.exe");
    else if (cmd == 'e') openProgram("Arduino IDE.exe");
    else if (cmd == 'f') openProgram("C:\\\\Program Files\\\\totalcmd\\\\TOTALCMD64.EXE");
    else if (cmd == 'g') openProgram("mspaint");
    else if (cmd == 'h') openProgram("Downloads");
    else if (cmd == 'i') takeScreenshot();
    else if (cmd == 'j') openURL("https://www.youtube.com/@Electronic.CNCLab");
    else if (cmd == 'k') openProgram("POWERPNT.EXE");
    else if (cmd == 'l') openProgram("WINWORD.EXE");
}

// URL im Browser oeffnen (Win+R)
void openURL(const char* url) {
    Keyboard.press(KEY_LEFT_GUI);
    Keyboard.press(KEY_R);
    Keyboard.releaseAll();
    delay(300);
    Keyboard.print(url);
    Keyboard.write(KEY_RETURN);
}

// Programm starten (Win+R)
void openProgram(const char* path) {
    Keyboard.press(KEY_LEFT_GUI);
    Keyboard.press(KEY_R);
    delay(300);
    Keyboard.releaseAll();
    delay(500);
    Keyboard.print(path);
    delay(300);
    Keyboard.write(KEY_RETURN);
}

// Screenshot machen (Win+Shift+S)
void takeScreenshot() {
    Keyboard.press(KEY_LEFT_GUI);
    Keyboard.press(KEY_LEFT_SHIFT);
    Keyboard.press('S');
    delay(100);
    Keyboard.releaseAll();
}`;

// Nextion Touch-Event Code
const NEXTION_CODE = `// Im "Touch Release Event" Tab von jedem Button:
// Button 1 (YouTube):
print "a"

// Button 2 (Facebook):
print "b"

// Button 3 (Instructables):
print "c"

// ... und so weiter fuer jeden Button
// Jeder Button sendet einen anderen Buchstaben`;

// Befehls-Zuordnung
const CMD_MAP = [
  { char: 'a', actionKey: 'tut_cmd_open_url',  target: 'youtube.com' },
  { char: 'b', actionKey: 'tut_cmd_open_url',  target: 'facebook.com' },
  { char: 'c', actionKey: 'tut_cmd_open_url',  target: 'instructables.com' },
  { char: 'd', actionKey: 'tut_cmd_open_prog', target: 'Filmora' },
  { char: 'e', actionKey: 'tut_cmd_open_prog', target: 'Arduino IDE' },
  { char: 'f', actionKey: 'tut_cmd_open_prog', target: 'Total Commander' },
  { char: 'g', actionKey: 'tut_cmd_open_prog', target: 'Paint' },
  { char: 'h', actionKey: 'tut_cmd_open_folder', target: 'Downloads' },
  { char: 'i', actionKey: 'tut_cmd_screenshot', target: 'Win+Shift+S' },
  { char: 'j', actionKey: 'tut_cmd_open_url',  target: 'YT Channel' },
  { char: 'k', actionKey: 'tut_cmd_open_prog', target: 'PowerPoint' },
  { char: 'l', actionKey: 'tut_cmd_open_prog', target: 'Word' },
];

// Text in Zwischenablage kopieren
function copyToClipboard(text) {
  navigator.clipboard?.writeText(text);
}

// Bild-Komponente mit Beschreibung
function TutImg({ src, caption }) {
  return (
    <div className="tut-img-wrap">
      <img className="tut-img" src={IMG + src} alt={caption} loading="lazy" />
      {caption && <div className="tut-img-caption">{caption}</div>}
    </div>
  );
}

// Code-Block mit Kopier-Button
function TutCode({ lang, code, t }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div className="tut-code-wrap">
      <div className="tut-code-header">
        <span className="tut-code-lang">{lang}</span>
        <button className="tut-code-copy" onClick={handleCopy}>
          {copied ? t('tut_copied') : t('tut_copy')}
        </button>
      </div>
      <div className="tut-code">
        <pre>{code}</pre>
      </div>
    </div>
  );
}

export default function Tutorial() {
  const t = useTranslation();
  const [step, setStep] = useState(0);

  // Schritte fuer die Navigation
  const steps = [
    { num: '00', labelKey: 'tut_nav_intro' },
    { num: '01', labelKey: 'tut_nav_parts' },
    { num: '02', labelKey: 'tut_nav_nextion' },
    { num: '03', labelKey: 'tut_nav_design' },
    { num: '04', labelKey: 'tut_nav_upload_display' },
    { num: '05', labelKey: 'tut_nav_wiring' },
    { num: '06', labelKey: 'tut_nav_firmware' },
    { num: '07', labelKey: 'tut_nav_commands' },
    { num: '08', labelKey: 'tut_nav_3dprint' },
    { num: '09', labelKey: 'tut_nav_test' },
  ];

  return (
    <div className="tutorial">
      <div className="tut-layout">
        {/* Sidebar-Navigation */}
        <div className="tut-sidebar">
          <div className="tut-sidebar-label">{t('tut_nav_label')}</div>
          {steps.map((s, i) => (
            <button
              key={i}
              className={`tut-nav-btn${step === i ? ' active' : ''}`}
              onClick={() => setStep(i)}
            >
              <span className="tut-nav-num">{s.num}</span>
              {t(s.labelKey)}
            </button>
          ))}
        </div>

        {/* Hauptinhalt — scrollbar ohne sichtbare Scrollbar */}
        <div className="tut-main">
          <div className="tut-content tut-fade" key={step}>

            {/* ── Schritt 0: Einfuehrung ── */}
            {step === 0 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">00</div>
                  <div className="tut-section-title">{t('tut_s0_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <TutImg src="tut-cover.png" caption={t('tut_s0_img')} />
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s0_text') }} />
                <div className="tut-card">
                  <div className="tut-card-row">
                    <span className="tut-card-key">{t('tut_author')}</span>
                    <span className="tut-card-val">Giuseppe Romano</span>
                  </div>
                  <div className="tut-card-row">
                    <span className="tut-card-key">{t('tut_platform')}</span>
                    <span className="tut-card-val mono">Instructables</span>
                  </div>
                  <div className="tut-card-row">
                    <span className="tut-card-key">{t('tut_difficulty')}</span>
                    <span className="tut-card-val orange">{t('tut_intermediate')}</span>
                  </div>
                  <div className="tut-card-row">
                    <span className="tut-card-key">{t('tut_cost')}</span>
                    <span className="tut-card-val green">~ 25 – 40 €</span>
                  </div>
                  <div className="tut-card-row">
                    <span className="tut-card-key">{t('tut_time')}</span>
                    <span className="tut-card-val">1 – 2 {t('tut_days')}</span>
                  </div>
                  <div className="tut-card-row">
                    <span className="tut-card-key">{t('tut_license')}</span>
                    <span className="tut-card-val mono">CC BY-NC-SA 4.0</span>
                  </div>
                </div>
                <a
                  className="tut-download"
                  href="https://www.instructables.com/DIY-Stream-Deck-With-Arduino-Nextion-Customize-You/"
                  target="_blank" rel="noreferrer"
                >
                  ↗ {t('tut_open_original')}
                </a>
              </>
            )}

            {/* ── Schritt 1: Bauteile ── */}
            {step === 1 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">01</div>
                  <div className="tut-section-title">{t('tut_s1_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s1_text') }} />
                <div className="tut-card">
                  {[
                    { key: 'Nextion 2.8" (NX3224K028)', val: t('tut_part_display'), cls: '' },
                    { key: 'Arduino Pro Micro', val: t('tut_part_mcu'), cls: '' },
                    { key: 'USB-to-Serial (FT232RL)', val: t('tut_part_ftdi'), cls: '' },
                    { key: t('tut_part_wires_label'), val: t('tut_part_wires'), cls: '' },
                    { key: 'JST Connectors', val: t('tut_part_jst'), cls: '' },
                    { key: 'USB-C Cable', val: t('tut_part_usbc'), cls: '' },
                    { key: 'Mini USB-B Cable', val: t('tut_part_usbb'), cls: '' },
                    { key: t('tut_part_inserts_label'), val: 'M2 / M2.5 / M3', cls: 'mono' },
                  ].map((p, i) => (
                    <div key={i} className="tut-card-row">
                      <span className="tut-card-key">{p.key}</span>
                      <span className={`tut-card-val ${p.cls}`}>{p.val}</span>
                    </div>
                  ))}
                </div>
                <div className="tut-note">
                  <strong>{t('tut_tip')}:</strong> {t('tut_s1_tip')}
                </div>
                <TutImg src="tut-parts-arduino.png" caption="Arduino Pro Micro (ATmega32U4)" />
                <TutImg src="tut-parts-nextion.png" caption={'Nextion 2.8" HMI Display'} />
                <TutImg src="tut-ftdi.png" caption="USB-to-Serial Adapter (FT232RL / FTD782)" />
              </>
            )}

            {/* ── Schritt 2: Nextion Editor installieren ── */}
            {step === 2 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">02</div>
                  <div className="tut-section-title">{t('tut_s2_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s2_text') }} />
                <TutImg src="tut-nextion-editor.png" caption={t('tut_s2_img1')} />
                <TutImg src="tut-nextion-install.png" caption={t('tut_s2_img2')} />
                <div className="tut-note">
                  <strong>{t('tut_tip')}:</strong> {t('tut_s2_tip')}
                </div>
              </>
            )}

            {/* ── Schritt 3: Interface designen ── */}
            {step === 3 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">03</div>
                  <div className="tut-section-title">{t('tut_s3_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s3_text') }} />
                <TutImg src="tut-buttons.png" caption={t('tut_s3_img1')} />
                <TutImg src="tut-serial-cmd.png" caption={t('tut_s3_img2')} />
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s3_text2') }} />
                <TutCode lang="Nextion" code={NEXTION_CODE} t={t} />
              </>
            )}

            {/* ── Schritt 4: Interface auf Display laden ── */}
            {step === 4 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">04</div>
                  <div className="tut-section-title">{t('tut_s4_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s4_text') }} />
                <TutImg src="tut-upload-diagram.png" caption={t('tut_s4_img1')} />
                <TutImg src="tut-upload-settings.png" caption={t('tut_s4_img2')} />
                <TutImg src="tut-upload-done.png" caption={t('tut_s4_img3')} />
                <div className="tut-note">
                  <strong>{t('tut_tip')}:</strong> {t('tut_s4_tip')}
                </div>
                <a
                  className="tut-download"
                  href="https://drive.google.com/file/d/1S4TGxIr3WhUJD8KoZ91Hl3poPmji5BX4/view?usp=sharing"
                  target="_blank" rel="noreferrer"
                >
                  ↓ {t('tut_download_nextion')}
                </a>
              </>
            )}

            {/* ── Schritt 5: Verkabelung ── */}
            {step === 5 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">05</div>
                  <div className="tut-section-title">{t('tut_s5_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s5_text') }} />
                <TutImg src="tut-wiring.png" caption={t('tut_s5_img1')} />
                <div className="tut-card">
                  {[
                    { from: 'Nextion TX',  to: 'Pro Micro RX (D0)' },
                    { from: 'Nextion RX',  to: 'Pro Micro TX (D1)' },
                    { from: 'Nextion VCC', to: '5V (Arduino)' },
                    { from: 'Nextion GND', to: 'GND (Arduino)' },
                  ].map((w, i) => (
                    <div key={i} className="tut-wire-row">
                      <span className="tut-wire-from">{w.from}</span>
                      <span className="tut-wire-arrow">→</span>
                      <span className="tut-wire-to">{w.to}</span>
                    </div>
                  ))}
                </div>
                <TutImg src="tut-wiring-detail.png" caption={t('tut_s5_img2')} />
                <TutImg src="tut-wiring-photo.png" caption={t('tut_s5_img3')} />
                <div className="tut-note">
                  <strong>{t('tut_important')}:</strong> {t('tut_s5_note')}
                </div>
              </>
            )}

            {/* ── Schritt 6: Firmware hochladen ── */}
            {step === 6 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">06</div>
                  <div className="tut-section-title">{t('tut_s6_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s6_text') }} />
                <TutImg src="tut-arduino-ide.png" caption={t('tut_s6_img1')} />
                <TutImg src="tut-board-select.png" caption={t('tut_s6_img2')} />
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s6_text2') }} />
                <TutCode lang="C++ (Arduino)" code={ARDUINO_CODE} t={t} />
                <TutImg src="tut-code.png" caption={t('tut_s6_img3')} />
                <TutImg src="tut-upload-final.png" caption={t('tut_s6_img4')} />
                <a
                  className="tut-download"
                  href="https://content.instructables.com/FAW/B5NA/M84I8I97/FAWB5NAM84I8I97.ino"
                  target="_blank" rel="noreferrer"
                >
                  ↓ {t('tut_download_firmware')}
                </a>
              </>
            )}

            {/* ── Schritt 7: Befehlszuordnung ── */}
            {step === 7 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">07</div>
                  <div className="tut-section-title">{t('tut_s7_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s7_text') }} />
                <div className="tut-card">
                  {CMD_MAP.map((c, i) => (
                    <div key={i} className="tut-cmd-row">
                      <span className="tut-cmd-char">'{c.char}'</span>
                      <span className="tut-cmd-action">{t(c.actionKey)}</span>
                      <span className="tut-cmd-target">{c.target}</span>
                    </div>
                  ))}
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s7_text2') }} />
              </>
            )}

            {/* ── Schritt 8: 3D-Druck ── */}
            {step === 8 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">08</div>
                  <div className="tut-section-title">{t('tut_s8_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s8_text') }} />
                <div className="tut-card">
                  {[
                    { key: 'Material', val: 'PLA', cls: '' },
                    { key: 'Layer Height', val: '0.2 mm', cls: 'mono' },
                    { key: 'Infill', val: '30 %', cls: 'mono' },
                    { key: 'Supports', val: t('tut_yes_display'), cls: 'orange' },
                    { key: t('tut_print_time'), val: '~ 4 h', cls: '' },
                    { key: t('tut_parts_count'), val: '2 (Base + Lid)', cls: '' },
                  ].map((p, i) => (
                    <div key={i} className="tut-card-row">
                      <span className="tut-card-key">{p.key}</span>
                      <span className={`tut-card-val ${p.cls}`}>{p.val}</span>
                    </div>
                  ))}
                </div>
                <TutImg src="tut-stl-base.png" caption="Base.stl" />
                <TutImg src="tut-stl-lid.png" caption="Coperchio.stl (Deckel)" />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <a className="tut-download" href="https://content.instructables.com/FEQ/NHF6/M807SYNW/FEQNHF6M807SYNW.stl" target="_blank" rel="noreferrer">
                    ↓ Base.stl
                  </a>
                  <a className="tut-download" href="https://content.instructables.com/FIK/HT8A/M807SYOV/FIKHT8AM807SYOV.stl" target="_blank" rel="noreferrer">
                    ↓ Coperchio.stl
                  </a>
                </div>
              </>
            )}

            {/* ── Schritt 9: Testen ── */}
            {step === 9 && (
              <>
                <div className="tut-section-header">
                  <div className="tut-section-num">09</div>
                  <div className="tut-section-title">{t('tut_s9_title')}</div>
                  <div className="tut-section-line" />
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s9_text') }} />
                <div className="tut-card">
                  {[
                    { key: t('tut_test_serial'), val: t('tut_test_serial_val'), cls: '' },
                    { key: t('tut_test_buttons'), val: t('tut_test_buttons_val'), cls: '' },
                    { key: t('tut_test_hid'), val: t('tut_test_hid_val'), cls: '' },
                    { key: t('tut_test_case'), val: t('tut_test_case_val'), cls: '' },
                  ].map((p, i) => (
                    <div key={i} className="tut-card-row">
                      <span className="tut-card-key">{p.key}</span>
                      <span className={`tut-card-val ${p.cls}`}>{p.val}</span>
                    </div>
                  ))}
                </div>
                <div className="tut-note">
                  <strong>{t('tut_tip')}:</strong> {t('tut_s9_tip')}
                </div>
                <div className="tut-text" dangerouslySetInnerHTML={{ __html: t('tut_s9_text2') }} />
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
