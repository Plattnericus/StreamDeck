const T = {
  de: {
    /* ── Settings core ── */
    settings: 'Einstellungen', back: 'Zurück', cancel: 'Abbrechen',
    profile_sub: 'StreamDeck · DIY Stream Deck',
    profile_title: 'Profil bearbeiten', profile_change_photo: 'Foto ändern',
    profile_name_label: 'Name', profile_initials_label: 'Farbe wählen',
    profile_save: 'Speichern', family: 'Familie',

    /* ── Settings nav ── */
    nav_network: 'Netzwerk', nav_appearance: 'Darstellung', nav_sound: 'Ton',
    nav_general: 'Allgemein', nav_notifications: 'Benachrichtigungen',
    nav_privacy: 'Datenschutz', nav_about: 'Über StreamDeck',

    /* ── Network ── */
    wifi: 'WLAN', bluetooth: 'Bluetooth', airplane: 'Flugmodus',
    cellular: 'Mobilfunk', vpn: 'VPN',
    connected: 'Verbunden', disconnected: 'Getrennt', on: 'Ein', off: 'Aus',

    /* ── Appearance ── */
    dark_mode: 'Erscheinungsbild', mode_dark: 'Dunkel', mode_light: 'Hell',
    brightness: 'Helligkeit', accent_color: 'Akzentfarbe',
    font_size: 'Schriftgröße', font_small: 'Klein', font_medium: 'Mittel', font_large: 'Groß',
    reduce_transparency: 'Transparenz reduzieren',

    /* ── Sound ── */
    volume: 'Lautstärke', sound_effects: 'Soundeffekte',
    startup_sound: 'Startton', mute: 'Stummschalten',

    /* ── General ── */
    language: 'Sprache', lang_de: 'Deutsch', lang_en: 'English', lang_it: 'Italiano',
    auto_language: 'Automatische Sprache', auto_language_sub: 'Systemsprache verwenden', select_language: 'Sprache wählen',
    clock_24h: '24-Stunden-Format', show_seconds: 'Sekunden anzeigen',
    date_format: 'Datumsformat', date_de: 'Deutsch (TT.MM.JJJJ)', date_iso: 'ISO (JJJJ-MM-TT)',
    reduce_motion: 'Bewegung reduzieren', auto_lock: 'Automatisch sperren',
    reset_settings: 'Einstellungen zurücksetzen', reset_confirm: 'Einstellungen wirklich zurücksetzen?',

    /* ── Notifications ── */
    notifications: 'Benachrichtigungen', app_badges: 'App-Abzeichen',
    notification_sound: 'Töne', show_previews: 'Vorschau anzeigen',
    preview_always: 'Immer', preview_unlocked: 'Wenn entsperrt', preview_never: 'Nie',
    do_not_disturb: 'Nicht stören',

    /* ── Privacy ── */
    cookie_consent: 'Cookie-Einwilligung', cookie_accepted: 'Akzeptiert',
    cookie_declined: 'Abgelehnt', cookie_pending: 'Ausstehend', cookie_reset: 'Zurücksetzen',
    camera: 'Kamera', microphone: 'Mikrofon',
    analytics: 'Analyse & Verbesserungen',
    delete_all: 'Alle Daten löschen',
    delete_confirm: 'Alle lokalen Daten wirklich löschen? Die Seite wird neu geladen.',

    /* ── About ── */
    about_title: 'Über StreamDeck', app_name: 'StreamDeck',
    version: 'Version', build: 'Build', developer: 'Entwickler',
    license: 'Lizenz', hardware: 'Hardware', mcu: 'Mikrocontroller',
    display_hw: 'Display', leds: 'LEDs', buttons: 'Tasten',
    case_hw: 'Gehäuse', about_mac: 'Über diesen Mac',
    search_placeholder: 'Suchen…', no_results: 'Keine Ergebnisse',
    about_application: 'Anwendung', about_developer_label: 'Entwickler',
    about_system: 'System',

    /* ── Changelog ── */
    changelog_title: 'Changelog', changelog_all: 'Alle',
    changelog_added: 'Hinzugefügt', changelog_fixed: 'Behoben',
    changelog_updated: 'Aktualisiert', changelog_removed: 'Entfernt',
    changelog_todo: 'Geplant', changelog_today: 'Heute',
    changelog_loading: 'Laden…', changelog_error: 'Fehler beim Laden',
    changelog_entries: 'Einträge', changelog_total: 'Gesamt',
    changelog_no_todo: 'Keine offenen Einträge', changelog_no_entries: 'Keine Einträge',

    /* ── Apps ── */
    apps_title: 'App Store', apps_all: 'Alle',
    apps_search: 'Apps durchsuchen…', apps_install: 'Laden',
    apps_open: 'Öffnen', apps_installing: 'Lädt…',

    /* ── Info ── */
    info_title: 'Info', info_overview: 'Übersicht',
    info_hardware: 'Hardware', info_software: 'Software',
    info_wiring: 'Schaltplan', info_print: '3D-Druck',
    type_key: 'Typ', encoder: 'Drehgeber', yes_label: 'Ja',
    firmware: 'Firmware', website: 'Website',
    platform: 'Plattform', architecture: 'Architektur',
    built_by: 'Gebaut von', handmade: 'Handgemacht von mir',
    diy_build: 'DIY-Bau', keys_label: 'Tasten',
    name_label: 'Name', app_full_name: 'StreamDeck Controller',

    /* ── Menubar (Header) ── */
    menu_apple_about: 'Über diesen Mac',
    menu_apple_syspreferences: 'Systemeinstellungen …',
    menu_apple_appstore: 'App Store …',
    menu_apple_sleep: 'Ruhezustand',
    menu_apple_restart: 'Neustart …',
    menu_apple_shutdown: 'Ausschalten …',
    menu_apple_lock: 'Bildschirm sperren',
    menu_apple_logout: 'Abmelden …',
    menu_finder: 'Finder',
    menu_finder_about: 'Über Finder',
    menu_finder_prefs: 'Einstellungen …',
    menu_finder_emptytrash: 'Papierkorb leeren …',
    menu_file: 'Datei',
    menu_file_newwindow: 'Neues Fenster',
    menu_file_newtab: 'Neuer Tab',
    menu_file_open: 'Öffnen',
    menu_file_close: 'Schließen',
    menu_edit: 'Bearbeiten',
    menu_edit_undo: 'Widerrufen',
    menu_edit_redo: 'Wiederherstellen',
    menu_edit_cut: 'Ausschneiden',
    menu_edit_copy: 'Kopieren',
    menu_edit_paste: 'Einfügen',
    menu_edit_selectall: 'Alles auswählen',
    menu_view: 'Ansicht',
    menu_view_icons: 'Als Symbole',
    menu_view_list: 'Als Liste',
    menu_view_columns: 'Als Spalten',
    menu_view_gallery: 'Als Galerie',
    menu_view_hidetoolbar: 'Symbolleiste ausblenden',
    menu_view_pathbar: 'Pfadleiste einblenden',
    menu_view_statusbar: 'Statusleiste einblenden',
    menu_go: 'Gehe zu',
    menu_go_recent: 'Zuletzt',
    menu_go_documents: 'Dokumente',
    menu_go_desktop: 'Schreibtisch',
    menu_go_downloads: 'Downloads',
    menu_go_private: 'Privat',
    menu_go_computer: 'Computer',
    menu_go_airdrop: 'AirDrop',
    menu_go_network: 'Netzwerk',
    menu_window: 'Fenster',
    menu_window_minimize: 'Minimieren',
    menu_window_zoom: 'Zoomen',
    menu_window_allfront: 'Alle nach vorn',
    menu_help: 'Hilfe',
    menu_help_macos: 'macOS-Hilfe',
    menu_help_tips: 'Tipps für den Mac',

    /* ── Control Center ── */
    cc_wifi: 'WLAN', cc_bluetooth: 'Bluetooth',
    cc_airplane: 'Flugmodus', cc_cellular: 'Mobilfunk',
    cc_brightness: 'Helligkeit', cc_volume: 'Lautstärke',
    cc_lock: 'Sperren', cc_mirror: 'Spiegeln',
    cc_dnd: 'Nicht stören', cc_nightmode: 'Nachtmodus', cc_airplay: 'AirPlay',

    /* ── About This Mac dialog ── */
    about_chip: 'Chip', about_memory: 'Arbeitsspeicher',
    about_serial: 'Seriennummer', about_more_info: 'Weitere Informationen …',

    /* ── Desktop context menu ── */
    ctx_new_folder: 'Neuer Ordner', ctx_info: 'Informationen',
    ctx_arrange: 'Darstellung aufräumen',
    ctx_change_wallpaper: 'Hintergrundbild ändern …',
    ctx_paste: 'Einfügen',

    /* ── Login page ── */
    login_password: 'Kennwort',
    login_hint: '(oder Finger über den Leser ziehen)',
    login_wrong_password: 'Falsches Kennwort',
    login_accept_cookies: 'Es wäre vorteilhaft die Cookies zu akzeptieren',

    /* ── Desktop / Mobile ── */
    desktop_only: 'Nur Desktop',
    mobile_not_optimized: 'Diese Seite ist nicht für Mobilgeräte optimiert!',
    mobile_open_desktop: 'Bitte öffne diese Seite auf einem Desktop-Computer.',

    /* ── Last Opened ── */
    recently_opened: 'Zuletzt geöffnet',
    no_recently_opened: 'Keine zuletzt geöffneten Apps',
    time_just_now: 'Gerade eben',

    /* ── Browser ── */
    browser_new_tab: 'Neuer Tab',
    browser_search_placeholder: 'Mit Google suchen oder eine URL eingeben',
    browser_search: 'Suchen',
    browser_page_error: 'Seite kann nicht geladen werden',
    browser_retry: 'Erneut versuchen',
    browser_open_external: 'In neuem Tab öffnen ↗',
    browser_wip: 'WIP',
    browser_wip_sub: 'Work in Progress',

    /* ── Cookies banner ── */
    cookies_title: 'Cookies & Datenschutz',
    cookies_text: 'Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten. Sie können wählen, ob Sie alle Cookies akzeptieren oder nur die notwendigen zulassen möchten.',
    cookies_decline: 'Ablehnen',
    cookies_accept: 'Alle akzeptieren',
    cookies_learn_more: 'Mehr erfahren',
    cookies_privacy_policy: 'Datenschutzerklärung',

    /* ── Error page ── */
    error_message: 'Ein Fehler ist aufgetreten, um fortzufahren:',
    error_return: '* Kehre zu unserer Startseite zurück.',
    error_email: '* Sende uns eine E-Mail über diesen Fehler und versuche es später.',

    /* ── App Store – App-Metadaten ── */
    app_category_system: 'System',
    app_info_sub: 'Produktinformationen',
    app_info_desc: 'Informationen zum Produkt StreamDeck und dessen Funktionen.',
    app_about_sub: 'Über das Projekt',
    app_about_desc: 'Allgemeine Informationen über das StreamDeck-Projekt.',
    app_model_sub: '3D-Modellviewer',
    app_model_desc: 'Anzeigen und Interagieren mit 3D-Modellen.',
    app_galerie_sub: 'Bilder',
    app_galerie_desc: 'Durchsuchen und Anzeigen von Bildern.',
    app_changelog_sub: 'Änderungen',
    app_changelog_desc: 'Versionsverlauf und Neuerungen des Projekts.',
    app_datenschutz_sub: 'Datenschutzrichtlinie',
    app_datenschutz_desc: 'Informationen zur Verarbeitung und zum Schutz personenbezogener Daten.',
    app_impressum_sub: 'Rechtliche Angaben',
    app_impressum_desc: 'Gesetzlich vorgeschriebene Angaben zum Anbieter.',
    app_agb_sub: 'Nutzungsbedingungen',
    app_agb_desc: 'Allgemeine Geschäfts- und Nutzungsbedingungen.',
    app_cookies_sub: 'Cookie-Richtlinie',
    app_cookies_desc: 'Informationen zu Cookies und deren Verwendung.',
    app_contact_sub: 'Kontaktformular',
    app_contact_desc: 'Sende uns eine Nachricht über das Kontaktformular.',

    /* ── Docker ── */
    docker_title: 'Docker Container',
    docker_subtitle: 'Projektfragen als Container',
    docker_running: 'Aktiv',
    docker_stopped: 'Gestoppt',
    docker_total: 'Gesamt',
    docker_search: 'Container durchsuchen…',
    app_description_sub: 'Projektbeschreibung',
    app_description_desc: 'Fragen und Antworten zum DIY Stream Deck Projekt.',

    dq1_name: 'Warum dieses Projekt?',
    dq1_text: 'Das Projekt „DIY Stream Deck mit Arduino und Nextion" ist spannend, weil man nicht einfach ein fertiges Produkt kauft, sondern alles selbst entwickelt und dabei versteht, wie es funktioniert. Man baut ein eigenes Gerät mit Touchscreen-Buttons, das Programme starten, Shortcuts ausführen und den Workflow verbessern kann. Im Vergleich zu normalen PC-Tools wie Maus und Tastatur bietet ein Stream Deck eine visuelle, konfigurierbare Oberfläche speziell für wiederkehrende Aufgaben. Der Lernprozess ist dabei genauso wichtig wie das fertige Ergebnis.',

    dq2_name: 'Warum selber bauen statt kaufen?',
    dq2_text: 'Es gibt fertige Stream Decks zu kaufen, aber selber bauen hat klare Vorteile: Man hat volle Kontrolle über jedes Detail und versteht, wie alles zusammenarbeitet. Man ist nicht auf die Software einer Firma angewiesen und kann jederzeit Anpassungen vornehmen. Dazu kommt der Kostenfaktor — ein fertiges Elgato Stream Deck kostet deutlich mehr als die Arduino-Bauteile. Und wer es selber baut, kann es auch selber reparieren, wenn etwas kaputtgeht.',

    dq3_name: 'Warum Arduino als Plattform?',
    dq3_text: 'Arduino ist ideal für dieses Projekt, weil die Plattform einfach zu programmieren ist und viele fertige Bibliotheken mitbringt. Besonders wichtig: Der Arduino Pro Micro kann als HID-Gerät arbeiten, also wie eine Tastatur. Dadurch erkennt der Computer das selbstgebaute Gerät sofort — ohne Treiber oder zusätzliche Software. Wenn man einen Button auf dem Display drückt, sendet der Arduino einen Tastendruck, der vom Betriebssystem ganz normal verarbeitet wird.',

    dq4_name: 'Warum ein Nextion Touchdisplay?',
    dq4_text: 'Man könnte auch einfache mechanische Buttons verwenden, aber ein Touchdisplay ist viel flexibler. Man kann das Layout jederzeit anpassen, mehrere Seiten erstellen und das Design komplett individuell gestalten. Das Nextion Display hat dabei einen eigenen Prozessor, der die Oberfläche rendert — das entlastet den Arduino. Zur Positionserkennung: Das Display weiß durch vordefinierte Touch-Bereiche genau, welcher Button gedrückt wurde, und die Reaktion erfolgt praktisch ohne Verzögerung.',

    dq5_name: 'Wie wird die Oberfläche erstellt?',
    dq5_text: 'Für das Nextion Display gibt es den kostenlosen Nextion Editor. Dort erstellt man Seiten, platziert Buttons, fügt Icons und Texte hinzu — alles per Drag & Drop. Das fertige Design wird als .TFT-Datei auf eine SD-Karte gespeichert und damit auf das Display geflasht. Man braucht keine Design-Erfahrung — die Software ist einfach gehalten. Man kann eigene Layouts erstellen und sie jederzeit anpassen, ohne den Arduino-Code zu ändern.',

    dq6_name: 'Warum C/C++ und keine andere Sprache?',
    dq6_text: 'Arduino basiert auf C/C++, einer Sprache die speziell für die direkte Arbeit mit Hardware optimiert ist. Man kann Pins steuern, serielle Kommunikation nutzen und schnell auf Eingaben reagieren. Theoretisch könnte man auch einen Raspberry Pi mit Python verwenden, aber das wäre komplexer und langsamer beim Start. Für ein Projekt mit Echtzeit-Reaktionen ist Arduino einfacher und direkter. Neue Funktionen hinzuzufügen ist auch nicht schwer — man erweitert einfach die switch-case Anweisung im Code.',

    dq7_name: 'Wie kommunizieren Display und Arduino?',
    dq7_text: 'Display und Arduino kommunizieren über UART — eine serielle Schnittstelle. Wenn man einen Button auf dem Display drückt, sendet das Nextion eine Nummer (die Button-ID) über die TX/RX-Leitungen an den Arduino. Der Arduino liest diese Zahl und weiß dadurch, welche Aktion ausgelöst werden soll. Wenn die Kommunikation nicht richtig funktioniert, passiert einfach nichts — es gibt keine Fehlermeldung. Deshalb testet man am besten mit einem einfachen Echo-Sketch, bevor man die finale Firmware schreibt.',

    dq8_name: 'Was passiert beim Button-Druck?',
    dq8_text: 'Wenn man einen Button auf dem Touchscreen drückt, passiert folgendes: Das Nextion Display erkennt die Touch-Position, ordnet sie einem Button zu und sendet dessen ID per UART an den Arduino. Der Arduino empfängt die Zahl, schaut in seinem Code nach, welche Taste damit verknüpft ist, und emuliert über die Keyboard.h-Bibliothek einen Tastendruck. Dabei werden F13 bis F24 genutzt — Tasten die kein Betriebssystem standardmäßig verwendet. So gibt es keine Konflikte mit anderen Shortcuts.',

    dq9_name: 'Wie präzise ist der Touchscreen?',
    dq9_text: 'Das Nextion Display arbeitet mit vordefinierten Touch-Bereichen, nicht mit freier Positionserkennung. Das bedeutet: Solange man den richtigen Bereich trifft, wird der Button zuverlässig erkannt. Bei mehreren schnellen Eingaben hintereinander verarbeitet das System eine nach der anderen — es gibt keine echte Parallelverarbeitung, aber die Reaktionszeit ist schnell genug für den normalen Gebrauch. Eine praktische Grenze gibt es bei der Anzahl der Buttons pro Seite, aber durch mehrere Seiten kann man das leicht lösen.',

    dq10_name: 'Welche Bauteile braucht man?',
    dq10_text: 'Unbedingt nötig sind: ein Arduino Pro Micro (ATmega32U4), ein Nextion Display (3.2 Zoll), Kabel und ein USB-Anschluss. Optional sind physische Buttons, ein Arduino Nano für die RGB-LEDs und ein WS2812B LED-Streifen. Man kann das Projekt auch günstiger bauen — zum Beispiel mit einem kleineren Display oder ohne LEDs. Andere Mikrocontroller funktionieren auch, solange sie HID unterstützen. Die Gesamtkosten liegen bei etwa 25 bis 40 Euro.',

    dq11_name: 'Strom, Speicher und Hardware-Grenzen',
    dq11_text: 'Das Gerät wird komplett über USB mit Strom versorgt — eine extra Stromquelle ist normalerweise nicht nötig. Nur wenn man viele LEDs verwendet, sollte man die separat speisen, weil der Pro Micro maximal 500 mA liefern kann. Der ATmega32U4 hat 32 KB Flash-Speicher — für die Firmware mehr als genug. Wenn das Programm mal zu groß wird, kann man den Code optimieren oder auf einen größeren Controller umsteigen.',

    dq12_name: 'Wie sicher ist das Gerät?',
    dq12_text: 'Da das Gerät als USB-Tastatur arbeitet, sendet es nur lokale Tastenanschläge. Es gibt keine Netzwerkverbindung und keine Daten die abgefangen werden könnten. Theoretisch könnte jemand mit physischem Zugang zum Gerät die Firmware ändern, aber das ist bei einem privaten DIY-Projekt kaum relevant. Für den Hausgebrauch ist die Sicherheit absolut ausreichend.',

    dq13_name: 'Fehlersuche und Debugging',
    dq13_text: 'Wenn etwas nicht funktioniert, hilft der Serial Monitor der Arduino IDE am meisten. Damit kann man sehen, welche Daten über UART ankommen und ob die richtigen Werte gesendet werden. Ein guter erster Test: Ein einfaches Programm schreiben, das empfangene Werte im Serial Monitor ausgibt. So erkennt man schnell, ob das Problem beim Display, der Verkabelung oder dem Code liegt. Geduld ist wichtig — meistens sind es kleine Fehler wie vertauschte TX/RX-Leitungen.',

    dq14_name: 'Zuverlässigkeit und Haltbarkeit',
    dq14_text: 'Arduino-Boards und Nextion Displays sind für den Dauerbetrieb ausgelegt und halten lange. Der Touchscreen nutzt sich bei normaler Benutzung kaum ab. Die größte Schwachstelle sind die Lötstellen und Kabelverbindungen — sauberes Löten ist daher wichtig. Verglichen mit einem professionellen Elgato kann das DIY-Gerät in der Verarbeitung nicht mithalten, aber funktional ist es ebenbürtig. Und wenn etwas kaputtgeht, kann man es selbst reparieren, statt ein neues Gerät zu kaufen.',

    dq15_name: 'Portabilität',
    dq15_text: 'Da das Gerät als Standard-USB-Tastatur erkannt wird, funktioniert es an jedem Computer ohne Installation von Software oder Treibern. Einfach einstecken und es läuft — auf Windows, macOS und Linux gleichermaßen. Man kann es also problemlos zwischen verschiedenen Computern wechseln. Das Gerät ist kompakt genug, um es mitzunehmen, besonders wenn man ein stabiles Gehäuse hat.',

    dq16_name: 'Vergleich mit kommerziellen Produkten',
    dq16_text: 'Ein fertiges Elgato Stream Deck hat LCD-Tasten mit einzelnen Displays pro Taste, eine polierte Software und ein professionelles Gehäuse. Das fehlt beim DIY-Gerät. Dafür hat die eigene Version Vorteile: komplett anpassbar, keine Abo-Software, man versteht die Technik dahinter und kann es beliebig erweitern. Außerdem kostet es deutlich weniger. Features wie RGB-Beleuchtung und Multi-Page-UI kann man problemlos einbauen.',

    dq17_name: 'Gehäuse und 3D-Druck',
    dq17_text: 'Ein 3D-gedrucktes Gehäuse aus PLA macht das Gerät deutlich stabiler und professioneller. Man druckt es in etwa 4 Stunden mit 30% Infill. Die M3-Löcher für Schrauben muss man nachschneiden. Man kann das Design im CAD-Programm komplett individuell gestalten — Farbe, Form, Aussparungen für Kabel und Display. Das Aussehen ist natürlich nicht so wichtig wie die Funktion, aber ein sauberes Gehäuse macht trotzdem viel aus.',

    dq18_name: 'Updates und Erweiterungen',
    dq18_text: 'Die Software lässt sich jederzeit ändern — einfach den Arduino per USB anschließen und neuen Code hochladen. Man muss nicht alles neu programmieren, sondern erweitert nur den bestehenden Code. Mögliche Erweiterungen: mehrere Display-Seiten, Animationen, zusätzliche physische Buttons oder sogar ein zweites Display. Wenn man an die Grenzen des Arduino stößt, kann man auf einen ESP32 oder Raspberry Pi Pico upgraden.',

    dq19_name: 'Warum ist ein Stream Deck sinnvoll?',
    dq19_text: 'Am Computer wiederholt man ständig die gleichen Abläufe: Programme starten, Screenshots machen, zwischen Fenstern wechseln. Normalerweise braucht man dafür Tastenkombinationen die man sich merken muss. Ein Stream Deck vereinfacht das — ein Klick auf einen Button und die Aktion wird ausgeführt. Besonders beim Streaming, Programmieren oder Videoschnitt spart das viel Zeit. Es geht nicht nur um Bequemlichkeit, sondern um einen effizienteren Workflow.',

    dq20_name: 'Was lerne ich durch dieses Projekt?',
    dq20_text: 'Durch dieses Projekt lernt man gleichzeitig Programmierung und Elektronik — zwei Bereiche die normalerweise getrennt unterrichtet werden. Man versteht, wie Hardware und Software zusammenarbeiten, lernt Fehler systematisch zu finden und Probleme zu lösen. Dazu kommen praktische Fähigkeiten wie Löten, 3D-Modellierung und serielle Kommunikation. Das Projekt verbessert definitiv die Programmierkenntnisse, weil man echten Code für ein echtes Gerät schreibt.',

    dq21_name: 'Schwierigkeitsgrad und Zeitaufwand',
    dq21_text: 'Das Projekt ist eher für Anfänger mit etwas Grundwissen geeignet — man sollte wissen was Variablen und Schleifen sind. Komplett ohne Vorwissen braucht man länger, aber es gibt viele Anleitungen die helfen. Der Zeitaufwand liegt bei etwa 1 bis 2 Tagen für den Grundaufbau. Am Anfang wirkt es kompliziert, weil Verkabelung, Programmierung und Design zusammenkommen, aber Schritt für Schritt ist es gut machbar.',

    dq22_name: 'Dokumentation und Präsentation',
    dq22_text: 'Sein Projekt zu dokumentieren ist wichtig, weil man so den eigenen Fortschritt festhält und bei Problemen leichter zurückschauen kann. Fotos vom Aufbau, Kommentare im Code und eine kurze Beschreibung der Schritte reichen schon. Für eine Präsentation eignet sich ein kurzes Video oder eine Live-Demo am besten — so sieht man direkt was das Gerät kann. Die Funktionen erklärt man am einfachsten anhand von konkreten Beispielen.',

    dq23_name: 'Zukunft und beruflicher Nutzen',
    dq23_text: 'Die Fähigkeiten die man bei diesem Projekt lernt — Programmierung, Hardware-Verständnis, Problemlösung — sind auch beruflich wertvoll, besonders in der Embedded-Entwicklung oder im IoT-Bereich. Langfristig lohnt sich der Aufwand, weil man ein solides Grundverständnis von Elektronik und Code aufbaut. Es motiviert auch mehr, etwas Eigenes zu bauen als nur Theorie zu lernen — das Ergebnis fühlt sich anders an, wenn man es selbst gemacht hat.',

    dq24_name: 'Zusammenfassung',
    dq24_text: 'Dieses Projekt ist viel mehr als nur ein „Stream Deck". Es zeigt, wie man mit einfachen Mitteln ein eigenes technisches Gerät bauen kann und dabei echte Fähigkeiten entwickelt. Man lernt Programmieren, logisches Denken und Problemlösung. Die vielen Fragen die man sich dabei stellt — „Warum funktioniert das so?", „Wie kann ich das verbessern?" — sind genau das, was Lernen spannend macht. Für mich ist die Antwort klar: Eigenes bauen macht mehr Spaß als Fertiges kaufen.',

    /* ── Contact ── */
    contact_title: 'Kontakt',
    contact_available: 'Erreichbar',
    contact_info: 'Kontaktdaten',
    contact_response: 'Antwortzeit',
    contact_your_info: 'Deine Daten',
    contact_name: 'Name',
    contact_name_ph: 'Dein Name',
    contact_email_ph: 'deine@email.de',
    contact_message_label: 'Nachricht',
    contact_subject: 'Betreff',
    contact_subject_ph: 'Worum geht es?',
    contact_message: 'Text',
    contact_message_ph: 'Schreib uns eine Nachricht…',
    contact_send: 'Senden',
    contact_sending: 'Wird gesendet…',
    contact_sent: 'Gesendet ✓',

    /* ── Finder ── */
    finder_back: 'Zurück', finder_forward: 'Vor',
    finder_search: 'Suchen',
    finder_favorites: 'Favoriten', finder_locations: 'Orte',
    finder_airdrop: 'AirDrop', finder_recents: 'Zuletzt benutzt',
    finder_applications: 'Programme', finder_desktop: 'Schreibtisch',
    finder_documents: 'Dokumente', finder_downloads: 'Downloads',
    finder_pictures: 'Bilder', finder_music: 'Musik',
    finder_computer: "Felix' Mac", finder_network: 'Netzwerk',
    finder_view_icons: 'Symbole', finder_view_list: 'Liste',
    finder_view_columns: 'Spalten', finder_view_gallery: 'Galerie',
    finder_col_name: 'Name', finder_col_modified: 'Änderungsdatum',
    finder_col_size: 'Größe', finder_col_kind: 'Art',
    finder_kind_folder: 'Ordner', finder_kind_file: 'Dokument',
    finder_item: 'Objekt', finder_items: 'Objekte',
    finder_empty_folder: 'Dieser Ordner ist leer',
    finder_no_results: 'Keine Ergebnisse',
    finder_gallery_hint: 'Objekt auswählen für Vorschau',

    /* ── Trash ── */
    trash_title: 'Papierkorb',
    trash_empty: 'Der Papierkorb ist leer',
    trash_zero_items: '0 Objekte',

    /* ── Music Menu ── */
    music_playlist: 'Wiedergabeliste',

    /* ── Galerie ── */
    galerie_title: 'Galerie',
    galerie_photos: 'Fotos',
    galerie_photo: 'Foto',
    galerie_search: 'Suchen…',
    galerie_all: 'Alle',
    galerie_back: 'Zurück',
    galerie_no_photos: 'Keine Fotos gefunden',
    galerie_demo_mode: 'Demo-Modus — galerie.json nicht gefunden',

    /* ── Github ── */
    github_view_profile: 'Profil ansehen',
    github_repos: 'Repos',
    github_followers: 'Follower',
    github_following: 'Following',
    github_repositories: 'Repositories',
    github_shown: 'angezeigt',
    github_public: 'Öffentlich',
    github_no_desc: 'Keine Beschreibung',
    github_no_bio: 'Keine Bio',
    github_loading: 'Lade…',

    /* ── 3D Model Viewer ── */
    model_auto_rotate: 'Auto-Rotation',
    model_reset_view: 'Ansicht zurücksetzen',
    model_zoom_in: 'Hineinzoomen',
    model_zoom_out: 'Herauszoomen',
    model_download: 'Modell herunterladen',
    model_fullscreen: 'Vollbild',
    model_select: 'Modell wählen',
    model_right: 'RECHTS',
    model_left: 'LINKS',
    model_top: 'OBEN',
    model_bottom: 'UNTEN',
    model_front: 'VORNE',
    model_back: 'HINTEN',

    /* ── Dock Context Menu ── */
    dock_open: 'Öffnen',
    dock_close: 'Schließen',
    dock_minimize: 'Minimieren',
    dock_show: 'Anzeigen',
    dock_maximize: 'Maximieren',
    dock_restore: 'Wiederherstellen',
  },

  // ── English translations ──
  en: {
    /* ── Settings core ── */
    settings: 'Settings', back: 'Back', cancel: 'Cancel',
    profile_sub: 'StreamDeck · DIY Stream Deck',
    profile_title: 'Edit Profile', profile_change_photo: 'Change Photo',
    profile_name_label: 'Name', profile_initials_label: 'Choose Color',
    profile_save: 'Save', family: 'Family',

    /* ── Settings nav ── */
    nav_network: 'Network', nav_appearance: 'Appearance', nav_sound: 'Sound',
    nav_general: 'General', nav_notifications: 'Notifications',
    nav_privacy: 'Privacy', nav_about: 'About StreamDeck',

    /* ── Network ── */
    wifi: 'Wi-Fi', bluetooth: 'Bluetooth', airplane: 'Airplane Mode',
    cellular: 'Cellular', vpn: 'VPN',
    connected: 'Connected', disconnected: 'Disconnected', on: 'On', off: 'Off',

    /* ── Appearance ── */
    dark_mode: 'Appearance', mode_dark: 'Dark', mode_light: 'Light',
    brightness: 'Brightness', accent_color: 'Accent Color',
    font_size: 'Font Size', font_small: 'Small', font_medium: 'Medium', font_large: 'Large',
    reduce_transparency: 'Reduce Transparency',

    /* ── Sound ── */
    volume: 'Volume', sound_effects: 'Sound Effects',
    startup_sound: 'Startup Sound', mute: 'Mute',

    /* ── General ── */
    language: 'Language', lang_de: 'Deutsch', lang_en: 'English', lang_it: 'Italiano',
    auto_language: 'Automatic Language', auto_language_sub: 'Use system language', select_language: 'Select Language',
    clock_24h: '24-Hour Time', show_seconds: 'Show Seconds',
    date_format: 'Date Format', date_de: 'German (DD.MM.YYYY)', date_iso: 'ISO (YYYY-MM-DD)',
    reduce_motion: 'Reduce Motion', auto_lock: 'Auto-Lock',
    reset_settings: 'Reset Settings', reset_confirm: 'Reset all settings to defaults?',

    /* ── Notifications ── */
    notifications: 'Allow Notifications', app_badges: 'App Badges',
    notification_sound: 'Sounds', show_previews: 'Show Previews',
    preview_always: 'Always', preview_unlocked: 'When Unlocked', preview_never: 'Never',
    do_not_disturb: 'Do Not Disturb',

    /* ── Privacy ── */
    cookie_consent: 'Cookie Consent', cookie_accepted: 'Accepted',
    cookie_declined: 'Declined', cookie_pending: 'Pending', cookie_reset: 'Reset',
    camera: 'Camera', microphone: 'Microphone',
    analytics: 'Analytics & Improvements',
    delete_all: 'Delete All Data',
    delete_confirm: 'Delete all local data? The page will reload.',

    /* ── About ── */
    about_title: 'About StreamDeck', app_name: 'StreamDeck',
    version: 'Version', build: 'Build', developer: 'Developer',
    license: 'License', hardware: 'Hardware', mcu: 'Microcontroller',
    display_hw: 'Display', leds: 'LEDs', buttons: 'Buttons',
    case_hw: 'Case', about_mac: 'About This Mac',
    search_placeholder: 'Search…', no_results: 'No results',
    about_application: 'Application', about_developer_label: 'Developer',
    about_system: 'System',

    /* ── Changelog ── */
    changelog_title: 'Changelog', changelog_all: 'All',
    changelog_added: 'Added', changelog_fixed: 'Fixed',
    changelog_updated: 'Updated', changelog_removed: 'Removed',
    changelog_todo: 'To Do', changelog_today: 'Today',
    changelog_loading: 'Loading…', changelog_error: 'Error loading',
    changelog_entries: 'Entries', changelog_total: 'Total',
    changelog_no_todo: 'No pending items', changelog_no_entries: 'No entries',

    /* ── Apps ── */
    apps_title: 'App Store', apps_all: 'All',
    apps_search: 'Search apps…', apps_install: 'Get',
    apps_open: 'Open', apps_installing: 'Loading…',

    /* ── Info ── */
    info_title: 'Info', info_overview: 'Overview',
    info_hardware: 'Hardware', info_software: 'Software',
    info_wiring: 'Wiring', info_print: '3D Print',
    type_key: 'Type', encoder: 'Encoder', yes_label: 'Yes',
    firmware: 'Firmware', website: 'Website',
    platform: 'Platform', architecture: 'Architecture',
    built_by: 'Built by', handmade: 'Handmade by me',
    diy_build: 'DIY Build', keys_label: 'Keys',
    name_label: 'Name', app_full_name: 'StreamDeck Controller',

    /* ── Menubar (Header) ── */
    menu_apple_about: 'About This Mac',
    menu_apple_syspreferences: 'System Settings…',
    menu_apple_appstore: 'App Store…',
    menu_apple_sleep: 'Sleep',
    menu_apple_restart: 'Restart…',
    menu_apple_shutdown: 'Shut Down…',
    menu_apple_lock: 'Lock Screen',
    menu_apple_logout: 'Log Out…',
    menu_finder: 'Finder',
    menu_finder_about: 'About Finder',
    menu_finder_prefs: 'Preferences…',
    menu_finder_emptytrash: 'Empty Trash…',
    menu_file: 'File',
    menu_file_newwindow: 'New Window',
    menu_file_newtab: 'New Tab',
    menu_file_open: 'Open',
    menu_file_close: 'Close',
    menu_edit: 'Edit',
    menu_edit_undo: 'Undo',
    menu_edit_redo: 'Redo',
    menu_edit_cut: 'Cut',
    menu_edit_copy: 'Copy',
    menu_edit_paste: 'Paste',
    menu_edit_selectall: 'Select All',
    menu_view: 'View',
    menu_view_icons: 'as Icons',
    menu_view_list: 'as List',
    menu_view_columns: 'as Columns',
    menu_view_gallery: 'as Gallery',
    menu_view_hidetoolbar: 'Hide Toolbar',
    menu_view_pathbar: 'Show Path Bar',
    menu_view_statusbar: 'Show Status Bar',
    menu_go: 'Go',
    menu_go_recent: 'Recent',
    menu_go_documents: 'Documents',
    menu_go_desktop: 'Desktop',
    menu_go_downloads: 'Downloads',
    menu_go_private: 'Private',
    menu_go_computer: 'Computer',
    menu_go_airdrop: 'AirDrop',
    menu_go_network: 'Network',
    menu_window: 'Window',
    menu_window_minimize: 'Minimize',
    menu_window_zoom: 'Zoom',
    menu_window_allfront: 'Bring All to Front',
    menu_help: 'Help',
    menu_help_macos: 'macOS Help',
    menu_help_tips: 'Mac Tips',

    /* ── Control Center ── */
    cc_wifi: 'Wi-Fi', cc_bluetooth: 'Bluetooth',
    cc_airplane: 'Airplane Mode', cc_cellular: 'Cellular',
    cc_brightness: 'Brightness', cc_volume: 'Volume',
    cc_lock: 'Lock', cc_mirror: 'Mirror',
    cc_dnd: 'Do Not Disturb', cc_nightmode: 'Night Mode', cc_airplay: 'AirPlay',

    /* ── About This Mac dialog ── */
    about_chip: 'Chip', about_memory: 'Memory',
    about_serial: 'Serial Number', about_more_info: 'More Info…',

    /* ── Desktop context menu ── */
    ctx_new_folder: 'New Folder', ctx_info: 'Get Info',
    ctx_arrange: 'Clean Up By',
    ctx_change_wallpaper: 'Change Wallpaper…',
    ctx_paste: 'Paste',

    /* ── Login page ── */
    login_password: 'Password',
    login_hint: '(or swipe finger across reader)',
    login_wrong_password: 'Wrong Password',
    login_accept_cookies: 'It would be beneficial to accept cookies',

    /* ── Desktop / Mobile ── */
    desktop_only: 'Desktop Only',
    mobile_not_optimized: 'This page is not optimized for mobile devices!',
    mobile_open_desktop: 'Please open this page on a desktop computer.',

    /* ── Last Opened ── */
    recently_opened: 'Recently Opened',
    no_recently_opened: 'No recently opened apps',
    time_just_now: 'Just now',

    /* ── Browser ── */
    browser_new_tab: 'New Tab',
    browser_search_placeholder: 'Search Google or type a URL',
    browser_search: 'Search',
    browser_page_error: "Page can't be loaded",
    browser_retry: 'Try Again',
    browser_open_external: 'Open in new tab ↗',
    browser_wip: 'WIP',
    browser_wip_sub: 'Work in Progress',

    /* ── Cookies banner ── */
    cookies_title: 'Cookies & Privacy',
    cookies_text: 'We use cookies to give you the best experience on our website. You can choose to accept all cookies or only allow the necessary ones.',
    cookies_decline: 'Decline',
    cookies_accept: 'Accept All',
    cookies_learn_more: 'Learn More',
    cookies_privacy_policy: 'Privacy Policy',

    /* ── Error page ── */
    error_message: 'An error has occurred, to continue:',
    error_return: '* Return to our homepage.',
    error_email: '* Send us an e-mail about this error and try later.',

    /* ── App Store – App metadata ── */
    app_category_system: 'System',
    app_info_sub: 'Product Information',
    app_info_desc: 'Information about the StreamDeck product and its features.',
    app_about_sub: 'About the Project',
    app_about_desc: 'General information about the StreamDeck project.',
    app_model_sub: '3D Model Viewer',
    app_model_desc: 'View and interact with 3D models.',
    app_galerie_sub: 'Photos',
    app_galerie_desc: 'Browse and view images.',
    app_changelog_sub: 'Changes',
    app_changelog_desc: 'Version history and updates for the project.',
    app_datenschutz_sub: 'Privacy Policy',
    app_datenschutz_desc: 'Information about the processing and protection of personal data.',
    app_impressum_sub: 'Legal Notice',
    app_impressum_desc: 'Legally required information about the provider.',
    app_agb_sub: 'Terms of Use',
    app_agb_desc: 'General terms and conditions of use.',
    app_cookies_sub: 'Cookie Policy',
    app_cookies_desc: 'Information about cookies and their use.',
    app_contact_sub: 'Contact Form',
    app_contact_desc: 'Send us a message via the contact form.',

    /* ── Docker ── */
    docker_title: 'Docker Containers',
    docker_subtitle: 'Project questions as containers',
    docker_running: 'Running',
    docker_stopped: 'Stopped',
    docker_total: 'Total',
    docker_search: 'Search containers…',
    app_description_sub: 'Project Description',
    app_description_desc: 'Questions and answers about the DIY Stream Deck project.',

    dq1_name: 'Why this project?',
    dq1_text: 'The project "DIY Stream Deck with Arduino and Nextion" is interesting because you don\'t just buy a product. You build it yourself and learn how it works. You make a device with touchscreen buttons that can start programs, run shortcuts and make your work faster. It is different from mouse and keyboard because it gives you buttons you can see and change. The building process is just as important as the result.',

    dq2_name: 'Why build it yourself?',
    dq2_text: 'You can buy a ready Stream Deck, but building your own has clear benefits. You have full control and you understand how everything works. You don\'t need special software from a company. You can change anything at any time. Also, a real Elgato Stream Deck costs much more than Arduino parts. And if something breaks, you can fix it yourself.',

    dq3_name: 'Why Arduino?',
    dq3_text: 'Arduino is great for this project because it is easy to program and has many ready libraries. The most important thing: the Arduino Pro Micro can work as a HID device — like a keyboard. The computer sees it as a normal keyboard. No drivers needed. When you press a button on the display, the Arduino sends a key press that the computer understands right away.',

    dq4_name: 'Why a Nextion touchscreen?',
    dq4_text: 'You could use simple buttons, but a touchscreen is much more flexible. You can change the design anytime, make many pages and create your own style. The Nextion display has its own processor that shows the interface — this helps the Arduino. The display knows exactly which button was pressed, and the reaction is very fast.',

    dq5_name: 'How is the interface made?',
    dq5_text: 'There is a free program called Nextion Editor. You can make pages, place buttons, add icons and text — all with drag and drop. The finished design is saved as a .TFT file on an SD card and then put on the display. You don\'t need design experience. You can make your own layouts and change them anytime without touching the Arduino code.',

    dq6_name: 'Why C/C++ and not another language?',
    dq6_text: 'Arduino uses C/C++, a language made for working with hardware. You can control pins, use serial communication and react fast to inputs. You could also use a Raspberry Pi with Python, but that is more complex and slower to start. For a project that needs fast reactions, Arduino is simpler and better. Adding new functions is easy — you just add more lines to the code.',

    dq7_name: 'How do display and Arduino talk?',
    dq7_text: 'The display and Arduino talk over UART — a serial connection. When you press a button on the display, the Nextion sends a number (the button ID) to the Arduino through the TX/RX wires. The Arduino reads this number and knows what to do. If the connection doesn\'t work, nothing happens — there is no error message. That\'s why you should test with a simple program first.',

    dq8_name: 'What happens when you press a button?',
    dq8_text: 'When you press a button on the touchscreen, this happens: The Nextion display finds the touch area, matches it to a button and sends its ID to the Arduino. The Arduino gets the number, looks in its code which key belongs to it, and sends a key press using the Keyboard.h library. It uses F13 to F24 — keys that no operating system uses normally. So there are no problems with other shortcuts.',

    dq9_name: 'How good is the touchscreen?',
    dq9_text: 'The Nextion display works with fixed touch areas, not free position tracking. This means: if you hit the right area, the button works every time. If you press many buttons fast, the system handles them one by one. There is no real parallel processing, but it is fast enough for normal use. You can make more buttons by adding more pages.',

    dq10_name: 'What parts do you need?',
    dq10_text: 'You definitely need: an Arduino Pro Micro (ATmega32U4), a Nextion display (3.2 inch), wires and a USB cable. Optional parts are: physical buttons, an Arduino Nano for RGB LEDs, and a WS2812B LED strip. You can build it cheaper too — for example with a smaller display or without LEDs. The total cost is about 25 to 40 euros.',

    dq11_name: 'Power, memory and limits',
    dq11_text: 'The device gets its power from USB — you don\'t need extra power normally. But if you use many LEDs, they should have their own power because the Pro Micro can only give 500 mA. The ATmega32U4 has 32 KB flash memory — that is enough for the program. If the program gets too big, you can make the code smaller or use a bigger controller.',

    dq12_name: 'How safe is the device?',
    dq12_text: 'The device works as a USB keyboard and only sends local key presses. There is no internet connection and no data that someone could steal. Someone with access to the device could change the firmware, but for a private DIY project this is not a real problem. For home use, the security is good enough.',

    dq13_name: 'Finding and fixing errors',
    dq13_text: 'When something doesn\'t work, the Serial Monitor in the Arduino IDE helps the most. You can see what data comes through UART and if the right values are sent. A good first test: write a simple program that shows the received values in the Serial Monitor. This way you can quickly find if the problem is in the display, the wires or the code. Most times it is a small mistake like switched TX/RX wires.',

    dq14_name: 'How long does it last?',
    dq14_text: 'Arduino boards and Nextion displays are made for long use and last a long time. The touchscreen doesn\'t wear out with normal use. The weakest part is the solder connections and wires — so clean soldering is important. Compared to a professional Elgato, the DIY device looks simpler, but it works just as well. And if something breaks, you can fix it yourself.',

    dq15_name: 'Can you take it anywhere?',
    dq15_text: 'Because the device works as a normal USB keyboard, it works on any computer without installing software or drivers. Just plug it in and it runs — on Windows, macOS and Linux. You can easily switch between different computers. The device is small enough to carry, especially with a good case.',

    dq16_name: 'DIY vs. commercial products',
    dq16_text: 'A real Elgato Stream Deck has LCD keys with small screens on each button, nice software and a professional case. The DIY device doesn\'t have that. But it has other benefits: fully customizable, no subscription software, you understand the technology and you can add anything you want. It also costs much less. Features like RGB lights and multiple pages are easy to add.',

    dq17_name: 'Case and 3D printing',
    dq17_text: 'A 3D printed case made from PLA makes the device more stable and looks better. You can print it in about 4 hours with 30% infill. You need to cut the M3 holes for screws after printing. You can design the case completely yourself — color, shape, holes for cables and display. The look is not as important as the function, but a nice case makes a big difference.',

    dq18_name: 'Updates and new features',
    dq18_text: 'You can change the software anytime — just connect the Arduino with USB and upload new code. You don\'t have to start from zero, just add to the existing code. Possible upgrades: more display pages, animations, extra physical buttons or even a second display. If the Arduino is not enough anymore, you can switch to an ESP32 or Raspberry Pi Pico.',

    dq19_name: 'Why is a Stream Deck useful?',
    dq19_text: 'On the computer, you always do the same things: start programs, make screenshots, switch between windows. Normally you need keyboard shortcuts that you have to remember. A Stream Deck makes it simple — one click on a button and the action runs. This saves a lot of time, especially for streaming, programming or video editing. It is not just about comfort, it is about working faster.',

    dq20_name: 'What do you learn from this project?',
    dq20_text: 'With this project you learn programming and electronics at the same time. You understand how hardware and software work together. You learn to find errors and solve problems. You also get practical skills like soldering, 3D modeling and serial communication. The project makes your programming better because you write real code for a real device.',

    dq21_name: 'How hard is it?',
    dq21_text: 'The project is good for beginners who know a little bit — you should know what variables and loops are. Without any experience you need more time, but there are many guides that help. The basic build takes about 1 to 2 days. It looks hard at first because wiring, code and design come together, but step by step it is very doable.',

    dq22_name: 'Documentation and presentation',
    dq22_text: 'Writing down what you did is important because you can look back when you have problems. Photos of the build, comments in the code and a short description of the steps are enough. For a presentation, a short video or live demo works best — people can see directly what the device does. You explain the functions best with real examples.',

    dq23_name: 'Future and career',
    dq23_text: 'The skills you learn — programming, hardware knowledge, problem solving — are also useful for jobs, especially in embedded development or IoT. The effort is worth it because you build a strong understanding of electronics and code. Building something yourself is also more motivating than just reading theory — the result feels different when you made it yourself.',

    dq24_name: 'Summary',
    dq24_text: 'This project is much more than just a "Stream Deck". It shows how you can build your own technical device with simple parts and learn real skills. You learn programming, logical thinking and problem solving. The many questions you ask yourself — "Why does this work?" and "How can I make it better?" — that is what makes learning fun. For me, the answer is clear: building something yourself is better than buying it ready-made.',

    /* ── Contact ── */
    contact_title: 'Contact',
    contact_available: 'Available',
    contact_info: 'Contact Info',
    contact_response: 'Response',
    contact_your_info: 'Your Details',
    contact_name: 'Name',
    contact_name_ph: 'Your name',
    contact_email_ph: 'your@email.com',
    contact_message_label: 'Message',
    contact_subject: 'Subject',
    contact_subject_ph: 'What is it about?',
    contact_message: 'Text',
    contact_message_ph: 'Write us a message…',
    contact_send: 'Send',
    contact_sending: 'Sending…',
    contact_sent: 'Sent ✓',

    /* ── Finder ── */
    finder_back: 'Back', finder_forward: 'Forward',
    finder_search: 'Search',
    finder_favorites: 'Favorites', finder_locations: 'Locations',
    finder_airdrop: 'AirDrop', finder_recents: 'Recents',
    finder_applications: 'Applications', finder_desktop: 'Desktop',
    finder_documents: 'Documents', finder_downloads: 'Downloads',
    finder_pictures: 'Pictures', finder_music: 'Music',
    finder_computer: "Felix's Mac", finder_network: 'Network',
    finder_view_icons: 'Icons', finder_view_list: 'List',
    finder_view_columns: 'Columns', finder_view_gallery: 'Gallery',
    finder_col_name: 'Name', finder_col_modified: 'Date Modified',
    finder_col_size: 'Size', finder_col_kind: 'Kind',
    finder_kind_folder: 'Folder', finder_kind_file: 'Document',
    finder_item: 'item', finder_items: 'items',
    finder_empty_folder: 'This folder is empty',
    finder_no_results: 'No results',
    finder_gallery_hint: 'Select an item to preview',

    /* ── Trash ── */
    trash_title: 'Trash',
    trash_empty: 'Trash is empty',
    trash_zero_items: '0 items',

    /* ── Music Menu ── */
    music_playlist: 'Playlist',

    /* ── Galerie ── */
    galerie_title: 'Gallery',
    galerie_photos: 'Photos',
    galerie_photo: 'Photo',
    galerie_search: 'Search…',
    galerie_all: 'All',
    galerie_back: 'Back',
    galerie_no_photos: 'No photos found',
    galerie_demo_mode: 'Demo mode — galerie.json not found',

    /* ── Github ── */
    github_view_profile: 'View Profile',
    github_repos: 'Repos',
    github_followers: 'Followers',
    github_following: 'Following',
    github_repositories: 'Repositories',
    github_shown: 'shown',
    github_public: 'Public',
    github_no_desc: 'No description',
    github_no_bio: 'No bio',
    github_loading: 'Loading…',

    /* ── 3D Model Viewer ── */
    model_auto_rotate: 'Auto Rotate',
    model_reset_view: 'Reset View',
    model_zoom_in: 'Zoom In',
    model_zoom_out: 'Zoom Out',
    model_download: 'Download Model',
    model_fullscreen: 'Fullscreen',
    model_select: 'Select Model',
    model_right: 'RIGHT',
    model_left: 'LEFT',
    model_top: 'TOP',
    model_bottom: 'BOTTOM',
    model_front: 'FRONT',
    model_back: 'BACK',

    /* ── Dock Context Menu ── */
    dock_open: 'Open',
    dock_close: 'Close',
    dock_minimize: 'Minimize',
    dock_show: 'Show',
    dock_maximize: 'Maximize',
    dock_restore: 'Restore',
  },

  // ── Italian translations ──
  it: {
    /* ── Settings core ── */
    settings: 'Impostazioni', back: 'Indietro', cancel: 'Annulla',
    profile_sub: 'StreamDeck · Stream Deck fai da te',
    profile_title: 'Modifica profilo', profile_change_photo: 'Cambia foto',
    profile_name_label: 'Nome', profile_initials_label: 'Scegli colore',
    profile_save: 'Salva', family: 'Famiglia',

    /* ── Settings nav ── */
    nav_network: 'Rete', nav_appearance: 'Aspetto', nav_sound: 'Audio',
    nav_general: 'Generali', nav_notifications: 'Notifiche',
    nav_privacy: 'Privacy', nav_about: 'Info su StreamDeck',

    /* ── Network ── */
    wifi: 'Wi-Fi', bluetooth: 'Bluetooth', airplane: 'Modalità aereo',
    cellular: 'Rete cellulare', vpn: 'VPN',
    connected: 'Connesso', disconnected: 'Disconnesso', on: 'On', off: 'Off',

    /* ── Appearance ── */
    dark_mode: 'Aspetto', mode_dark: 'Scuro', mode_light: 'Chiaro',
    brightness: 'Luminosità', accent_color: 'Colore principale',
    font_size: 'Dimensione carattere', font_small: 'Piccolo', font_medium: 'Medio', font_large: 'Grande',
    reduce_transparency: 'Riduci trasparenza',

    /* ── Sound ── */
    volume: 'Volume', sound_effects: 'Effetti sonori',
    startup_sound: 'Suono di avvio', mute: 'Silenzia',

    /* ── General ── */
    language: 'Lingua', lang_de: 'Deutsch', lang_en: 'English', lang_it: 'Italiano',
    auto_language: 'Lingua automatica', auto_language_sub: 'Usa lingua di sistema', select_language: 'Seleziona lingua',
    clock_24h: 'Formato 24 ore', show_seconds: 'Mostra secondi',
    date_format: 'Formato data', date_de: 'Tedesco (GG.MM.AAAA)', date_iso: 'ISO (AAAA-MM-GG)',
    reduce_motion: 'Riduci movimento', auto_lock: 'Blocco automatico',
    reset_settings: 'Ripristina impostazioni', reset_confirm: 'Ripristinare tutte le impostazioni?',

    /* ── Notifications ── */
    notifications: 'Consenti notifiche', app_badges: 'Badge app',
    notification_sound: 'Suoni', show_previews: 'Mostra anteprime',
    preview_always: 'Sempre', preview_unlocked: 'Quando sbloccato', preview_never: 'Mai',
    do_not_disturb: 'Non disturbare',

    /* ── Privacy ── */
    cookie_consent: 'Consenso cookie', cookie_accepted: 'Accettato',
    cookie_declined: 'Rifiutato', cookie_pending: 'In attesa', cookie_reset: 'Reimposta',
    camera: 'Fotocamera', microphone: 'Microfono',
    analytics: 'Analisi e miglioramenti',
    delete_all: 'Elimina tutti i dati',
    delete_confirm: 'Eliminare tutti i dati locali? La pagina verrà ricaricata.',

    /* ── About ── */
    about_title: 'Info su StreamDeck', app_name: 'StreamDeck',
    version: 'Versione', build: 'Build', developer: 'Sviluppatore',
    license: 'Licenza', hardware: 'Hardware', mcu: 'Microcontrollore',
    display_hw: 'Display', leds: 'LED', buttons: 'Tasti',
    case_hw: 'Custodia', about_mac: 'Informazioni su questo Mac',
    search_placeholder: 'Cerca…', no_results: 'Nessun risultato',
    about_application: 'Applicazione', about_developer_label: 'Sviluppatore',
    about_system: 'Sistema',

    /* ── Changelog ── */
    changelog_title: 'Registro modifiche', changelog_all: 'Tutti',
    changelog_added: 'Aggiunto', changelog_fixed: 'Risolto',
    changelog_updated: 'Aggiornato', changelog_removed: 'Rimosso',
    changelog_todo: 'Da fare', changelog_today: 'Oggi',
    changelog_loading: 'Caricamento…', changelog_error: 'Errore di caricamento',
    changelog_entries: 'Voci', changelog_total: 'Totale',
    changelog_no_todo: 'Nessun elemento in sospeso', changelog_no_entries: 'Nessuna voce',

    /* ── Apps ── */
    apps_title: 'App Store', apps_all: 'Tutti',
    apps_search: 'Cerca app…', apps_install: 'Ottieni',
    apps_open: 'Apri', apps_installing: 'Caricamento…',

    /* ── Info ── */
    info_title: 'Info', info_overview: 'Panoramica',
    info_hardware: 'Hardware', info_software: 'Software',
    info_wiring: 'Schema elettrico', info_print: 'Stampa 3D',
    type_key: 'Tipo', encoder: 'Encoder', yes_label: 'Sì',
    firmware: 'Firmware', website: 'Sito web',
    platform: 'Piattaforma', architecture: 'Architettura',
    built_by: 'Costruito da', handmade: 'Fatto a mano da me',
    diy_build: 'Build fai da te', keys_label: 'Tasti',
    name_label: 'Nome', app_full_name: 'StreamDeck Controller',

    /* ── Menubar (Header) ── */
    menu_apple_about: 'Informazioni su questo Mac',
    menu_apple_syspreferences: 'Impostazioni di sistema…',
    menu_apple_appstore: 'App Store…',
    menu_apple_sleep: 'Stop',
    menu_apple_restart: 'Riavvia…',
    menu_apple_shutdown: 'Spegni…',
    menu_apple_lock: 'Blocca schermo',
    menu_apple_logout: 'Esci…',
    menu_finder: 'Finder',
    menu_finder_about: 'Info su Finder',
    menu_finder_prefs: 'Preferenze…',
    menu_finder_emptytrash: 'Svuota cestino…',
    menu_file: 'Archivio',
    menu_file_newwindow: 'Nuova finestra',
    menu_file_newtab: 'Nuova scheda',
    menu_file_open: 'Apri',
    menu_file_close: 'Chiudi',
    menu_edit: 'Modifica',
    menu_edit_undo: 'Annulla',
    menu_edit_redo: 'Ripristina',
    menu_edit_cut: 'Taglia',
    menu_edit_copy: 'Copia',
    menu_edit_paste: 'Incolla',
    menu_edit_selectall: 'Seleziona tutto',
    menu_view: 'Vista',
    menu_view_icons: 'Come icone',
    menu_view_list: 'Come elenco',
    menu_view_columns: 'Come colonne',
    menu_view_gallery: 'Come galleria',
    menu_view_hidetoolbar: 'Nascondi barra strumenti',
    menu_view_pathbar: 'Mostra barra percorso',
    menu_view_statusbar: 'Mostra barra di stato',
    menu_go: 'Vai',
    menu_go_recent: 'Recenti',
    menu_go_documents: 'Documenti',
    menu_go_desktop: 'Scrivania',
    menu_go_downloads: 'Download',
    menu_go_private: 'Privato',
    menu_go_computer: 'Computer',
    menu_go_airdrop: 'AirDrop',
    menu_go_network: 'Rete',
    menu_window: 'Finestra',
    menu_window_minimize: 'Minimizza',
    menu_window_zoom: 'Zoom',
    menu_window_allfront: 'Porta tutto in primo piano',
    menu_help: 'Aiuto',
    menu_help_macos: 'Aiuto macOS',
    menu_help_tips: 'Suggerimenti Mac',

    /* ── Control Center ── */
    cc_wifi: 'Wi-Fi', cc_bluetooth: 'Bluetooth',
    cc_airplane: 'Modalità aereo', cc_cellular: 'Rete cellulare',
    cc_brightness: 'Luminosità', cc_volume: 'Volume',
    cc_lock: 'Blocca', cc_mirror: 'Specchia',
    cc_dnd: 'Non disturbare', cc_nightmode: 'Modalità notte', cc_airplay: 'AirPlay',

    /* ── About This Mac dialog ── */
    about_chip: 'Chip', about_memory: 'Memoria',
    about_serial: 'Numero seriale', about_more_info: 'Ulteriori informazioni…',

    /* ── Desktop context menu ── */
    ctx_new_folder: 'Nuova cartella', ctx_info: 'Informazioni',
    ctx_arrange: 'Ordina per',
    ctx_change_wallpaper: 'Cambia sfondo…',
    ctx_paste: 'Incolla',

    /* ── Login page ── */
    login_password: 'Password',
    login_hint: '(o scorri il dito sul lettore)',
    login_wrong_password: 'Password errata',
    login_accept_cookies: 'Sarebbe utile accettare i cookie',

    /* ── Desktop / Mobile ── */
    desktop_only: 'Solo desktop',
    mobile_not_optimized: 'Questa pagina non è ottimizzata per dispositivi mobili!',
    mobile_open_desktop: 'Apri questa pagina su un computer desktop.',

    /* ── Last Opened ── */
    recently_opened: 'Aperto di recente',
    no_recently_opened: 'Nessuna app aperta di recente',
    time_just_now: 'Proprio ora',

    /* ── Browser ── */
    browser_new_tab: 'Nuova scheda',
    browser_search_placeholder: 'Cerca con Google o digita un URL',
    browser_search: 'Cerca',
    browser_page_error: 'Impossibile caricare la pagina',
    browser_retry: 'Riprova',
    browser_open_external: 'Apri in nuova scheda ↗',
    browser_wip: 'WIP',
    browser_wip_sub: 'Lavori in corso',

    /* ── Cookies banner ── */
    cookies_title: 'Cookie e Privacy',
    cookies_text: 'Utilizziamo cookie per offrirti la migliore esperienza sul nostro sito. Puoi scegliere di accettare tutti i cookie o di consentire solo quelli necessari.',
    cookies_decline: 'Rifiuta',
    cookies_accept: 'Accetta tutti',
    cookies_learn_more: 'Scopri di più',
    cookies_privacy_policy: 'Informativa privacy',

    /* ── Error page ── */
    error_message: 'Si è verificato un errore, per continuare:',
    error_return: '* Torna alla nostra homepage.',
    error_email: '* Inviaci un\'e-mail su questo errore e riprova più tardi.',

    /* ── App Store – Metadati app ── */
    app_category_system: 'Sistema',
    app_info_sub: 'Informazioni sul prodotto',
    app_info_desc: 'Informazioni sul prodotto StreamDeck e le sue funzioni.',
    app_about_sub: 'Sul progetto',
    app_about_desc: 'Informazioni generali sul progetto StreamDeck.',
    app_model_sub: 'Visualizzatore 3D',
    app_model_desc: 'Visualizza e interagisci con modelli 3D.',
    app_galerie_sub: 'Foto',
    app_galerie_desc: 'Sfoglia e visualizza immagini.',
    app_changelog_sub: 'Modifiche',
    app_changelog_desc: 'Cronologia delle versioni e aggiornamenti del progetto.',
    app_datenschutz_sub: 'Informativa privacy',
    app_datenschutz_desc: 'Informazioni sul trattamento e la protezione dei dati personali.',
    app_impressum_sub: 'Note legali',
    app_impressum_desc: 'Informazioni legalmente obbligatorie sul fornitore.',
    app_agb_sub: 'Termini di utilizzo',
    app_agb_desc: 'Termini e condizioni generali di utilizzo.',
    app_cookies_sub: 'Informativa sui cookie',
    app_cookies_desc: 'Informazioni sui cookie e il loro utilizzo.',
    app_contact_sub: 'Modulo di contatto',
    app_contact_desc: 'Inviaci un messaggio tramite il modulo di contatto.',

    /* ── Docker ── */
    docker_title: 'Container Docker',
    docker_subtitle: 'Domande sul progetto come container',
    docker_running: 'Attivo',
    docker_stopped: 'Fermato',
    docker_total: 'Totale',
    docker_search: 'Cerca container…',
    app_description_sub: 'Descrizione del progetto',
    app_description_desc: 'Domande e risposte sul progetto DIY Stream Deck.',

    dq1_name: 'Perché questo progetto?',
    dq1_text: 'Il progetto "DIY Stream Deck con Arduino e Nextion" è bello perché non compri un prodotto finito. Lo costruisci tu e impari come funziona. Fai un dispositivo con pulsanti touch per aprire programmi e fare azioni veloci. È diverso da mouse e tastiera perché ha pulsanti che puoi vedere e cambiare. Imparare è importante come il risultato.',

    dq2_name: 'Perché costruirlo da solo?',
    dq2_text: 'Puoi comprare uno Stream Deck pronto, ma costruirlo ha vantaggi. Hai il controllo totale e capisci come funziona tutto. Non hai bisogno di software speciale. Puoi cambiare tutto quando vuoi. Un Elgato costa molto di più dei pezzi Arduino. E se si rompe qualcosa, puoi ripararlo tu.',

    dq3_name: 'Perché Arduino?',
    dq3_text: 'Arduino è perfetto per questo progetto perché è facile da programmare e ha molte librerie pronte. La cosa più importante: l\'Arduino Pro Micro funziona come una tastiera (dispositivo HID). Il computer lo vede come una tastiera normale. Non servono driver. Quando premi un pulsante, l\'Arduino manda un tasto che il computer capisce subito.',

    dq4_name: 'Perché un display Nextion?',
    dq4_text: 'Puoi usare pulsanti semplici, ma un touchscreen è molto più flessibile. Puoi cambiare il design sempre, fare molte pagine e creare il tuo stile. Il display Nextion ha il suo processore che mostra l\'interfaccia. Il display sa esattamente quale pulsante hai premuto e la reazione è molto veloce.',

    dq5_name: 'Come si fa l\'interfaccia?',
    dq5_text: 'C\'è un programma gratis che si chiama Nextion Editor. Puoi fare pagine, mettere pulsanti, aggiungere icone e testo con drag and drop. Il design finito si salva come file .TFT su una scheda SD e poi va sul display. Non serve esperienza di design. Puoi fare i tuoi layout e cambiarli sempre senza toccare il codice Arduino.',

    dq6_name: 'Perché C/C++ e non un altro linguaggio?',
    dq6_text: 'Arduino usa C/C++, un linguaggio fatto per lavorare con l\'hardware. Puoi controllare i pin, usare la comunicazione seriale e reagire veloce. Puoi anche usare un Raspberry Pi con Python, ma è più complicato e più lento. Per un progetto che deve reagire veloce, Arduino è più semplice. Aggiungere nuove funzioni è facile.',

    dq7_name: 'Come comunicano display e Arduino?',
    dq7_text: 'Il display e l\'Arduino parlano con UART — una connessione seriale. Quando premi un pulsante, il Nextion manda un numero (l\'ID del pulsante) all\'Arduino attraverso i fili TX/RX. L\'Arduino legge questo numero e sa cosa fare. Se la connessione non funziona, non succede niente. Per questo devi testare con un programma semplice prima.',

    dq8_name: 'Cosa succede quando premi un pulsante?',
    dq8_text: 'Quando premi un pulsante sul touchscreen succede questo: il display Nextion trova l\'area toccata, la collega a un pulsante e manda il suo ID all\'Arduino. L\'Arduino prende il numero, cerca nel suo codice quale tasto corrisponde e manda un tasto con la libreria Keyboard.h. Usa i tasti F13 fino a F24 — tasti che nessun sistema usa normalmente. Così non ci sono problemi.',

    dq9_name: 'Come funziona il touchscreen?',
    dq9_text: 'Il display Nextion lavora con aree touch fisse. Questo vuol dire: se tocchi l\'area giusta, il pulsante funziona sempre. Se premi molti pulsanti veloce, il sistema li gestisce uno alla volta. Non c\'è elaborazione parallela, ma è abbastanza veloce per l\'uso normale. Puoi fare più pulsanti aggiungendo più pagine.',

    dq10_name: 'Quali pezzi servono?',
    dq10_text: 'Servono: un Arduino Pro Micro (ATmega32U4), un display Nextion (3.2 pollici), fili e un cavo USB. Opzionali sono: pulsanti fisici, un Arduino Nano per i LED RGB e una striscia LED WS2812B. Puoi costruirlo anche più economico — per esempio con un display più piccolo o senza LED. Il costo totale è circa 25-40 euro.',

    dq11_name: 'Alimentazione, memoria e limiti',
    dq11_text: 'Il dispositivo prende la corrente dall\'USB — normalmente non serve altra corrente. Ma se usi molti LED, devono avere la loro corrente perché il Pro Micro può dare solo 500 mA. L\'ATmega32U4 ha 32 KB di memoria flash — abbastanza per il programma. Se il programma diventa troppo grande, puoi ottimizzare il codice o usare un controller più grande.',

    dq12_name: 'È sicuro il dispositivo?',
    dq12_text: 'Il dispositivo funziona come una tastiera USB e manda solo tasti locali. Non c\'è connessione internet e nessun dato che qualcuno può rubare. Qualcuno con accesso al dispositivo potrebbe cambiare il firmware, ma per un progetto DIY privato questo non è un problema vero. Per l\'uso a casa, la sicurezza è buona.',

    dq13_name: 'Trovare e risolvere errori',
    dq13_text: 'Quando qualcosa non funziona, il Serial Monitor dell\'Arduino IDE aiuta di più. Puoi vedere quali dati arrivano con UART e se i valori giusti vengono mandati. Un buon primo test: scrivi un programma semplice che mostra i valori ricevuti nel Serial Monitor. Così trovi veloce se il problema è nel display, nei fili o nel codice. Spesso è un errore piccolo come fili TX/RX scambiati.',

    dq14_name: 'Quanto dura?',
    dq14_text: 'Le schede Arduino e i display Nextion sono fatti per durare molto. Il touchscreen non si consuma con l\'uso normale. La parte più debole sono le saldature e i fili — quindi saldare bene è importante. Rispetto a un Elgato professionale, il dispositivo DIY sembra più semplice, ma funziona ugualmente bene. E se si rompe qualcosa, puoi ripararlo tu.',

    dq15_name: 'Si può portare ovunque?',
    dq15_text: 'Perché il dispositivo funziona come una tastiera USB normale, funziona su ogni computer senza installare software o driver. Basta collegarlo e funziona — su Windows, macOS e Linux. Puoi passare facilmente tra computer diversi. Il dispositivo è abbastanza piccolo da portare, specialmente con una buona custodia.',

    dq16_name: 'DIY contro prodotti commerciali',
    dq16_text: 'Un vero Elgato Stream Deck ha tasti LCD con piccoli schermi su ogni pulsante, bel software e custodia professionale. Il dispositivo DIY non ha questo. Ma ha altri vantaggi: completamente personalizzabile, nessun software in abbonamento, capisci la tecnologia e puoi aggiungere quello che vuoi. Costa anche molto meno. Funzioni come luci RGB e più pagine sono facili da aggiungere.',

    dq17_name: 'Custodia e stampa 3D',
    dq17_text: 'Una custodia stampata in 3D in PLA rende il dispositivo più stabile e più bello. Si stampa in circa 4 ore con 30% di riempimento. Devi tagliare i fori M3 per le viti dopo la stampa. Puoi disegnare la custodia come vuoi — colore, forma, buchi per cavi e display. L\'aspetto non è importante come la funzione, ma una bella custodia fa la differenza.',

    dq18_name: 'Aggiornamenti e nuove funzioni',
    dq18_text: 'Puoi cambiare il software sempre — basta collegare l\'Arduino con USB e caricare nuovo codice. Non devi ricominciare da zero, aggiungi solo al codice esistente. Possibili miglioramenti: più pagine sul display, animazioni, pulsanti fisici extra o anche un secondo display. Se l\'Arduino non basta più, puoi passare a un ESP32 o Raspberry Pi Pico.',

    dq19_name: 'Perché è utile uno Stream Deck?',
    dq19_text: 'Al computer fai sempre le stesse cose: aprire programmi, fare screenshot, cambiare finestra. Normalmente servono scorciatoie da tastiera che devi ricordare. Uno Stream Deck rende tutto semplice — un clic su un pulsante e l\'azione parte. Questo risparmia molto tempo, specialmente per streaming, programmazione o editing video. Non è solo comodità, è lavorare più veloce.',

    dq20_name: 'Cosa impari con questo progetto?',
    dq20_text: 'Con questo progetto impari programmazione ed elettronica insieme. Capisci come hardware e software lavorano insieme. Impari a trovare errori e risolvere problemi. Impari anche cose pratiche come saldare, modellare in 3D e comunicazione seriale. Il progetto migliora la tua programmazione perché scrivi codice vero per un dispositivo vero.',

    dq21_name: 'È difficile?',
    dq21_text: 'Il progetto va bene per chi sa un po\' di basi — devi sapere cosa sono variabili e cicli. Senza esperienza serve più tempo, ma ci sono molte guide. La costruzione base prende circa 1-2 giorni. All\'inizio sembra difficile perché cavi, codice e design vengono insieme, ma passo dopo passo si può fare.',

    dq22_name: 'Documentazione e presentazione',
    dq22_text: 'Scrivere quello che hai fatto è importante perché puoi guardare indietro quando hai problemi. Foto della costruzione, commenti nel codice e una breve descrizione dei passi sono abbastanza. Per una presentazione, un breve video o demo dal vivo funziona meglio — le persone vedono direttamente cosa fa il dispositivo.',

    dq23_name: 'Futuro e lavoro',
    dq23_text: 'Le competenze che impari — programmazione, conoscenza hardware, risolvere problemi — sono utili anche per il lavoro, specialmente nello sviluppo embedded o IoT. Lo sforzo vale la pena perché costruisci una buona base di elettronica e codice. Costruire qualcosa di tuo è anche più motivante che solo leggere teoria.',

    dq24_name: 'Riassunto',
    dq24_text: 'Questo progetto è molto di più di uno "Stream Deck". Mostra come costruire il tuo dispositivo tecnico con pezzi semplici e imparare vere competenze. Impari programmazione, pensiero logico e risolvere problemi. Le molte domande che ti fai — "Perché funziona così?" e "Come posso migliorarlo?" — questo è quello che rende bello imparare. Per me la risposta è chiara: costruire qualcosa di tuo è meglio che comprarlo pronto.',

    /* ── Contatto ── */
    contact_title: 'Contatto',
    contact_available: 'Disponibile',
    contact_info: 'Dati di contatto',
    contact_response: 'Risposta',
    contact_your_info: 'I tuoi dati',
    contact_name: 'Nome',
    contact_name_ph: 'Il tuo nome',
    contact_email_ph: 'tua@email.it',
    contact_message_label: 'Messaggio',
    contact_subject: 'Oggetto',
    contact_subject_ph: 'Di cosa si tratta?',
    contact_message: 'Testo',
    contact_message_ph: 'Scrivici un messaggio…',
    contact_send: 'Invia',
    contact_sending: 'Invio in corso…',
    contact_sent: 'Inviato ✓',

    /* ── Finder ── */
    finder_back: 'Indietro', finder_forward: 'Avanti',
    finder_search: 'Cerca',
    finder_favorites: 'Preferiti', finder_locations: 'Posizioni',
    finder_airdrop: 'AirDrop', finder_recents: 'Recenti',
    finder_applications: 'Applicazioni', finder_desktop: 'Scrivania',
    finder_documents: 'Documenti', finder_downloads: 'Download',
    finder_pictures: 'Immagini', finder_music: 'Musica',
    finder_computer: 'Mac di Felix', finder_network: 'Rete',
    finder_view_icons: 'Icone', finder_view_list: 'Elenco',
    finder_view_columns: 'Colonne', finder_view_gallery: 'Galleria',
    finder_col_name: 'Nome', finder_col_modified: 'Data modifica',
    finder_col_size: 'Dimensione', finder_col_kind: 'Tipo',
    finder_kind_folder: 'Cartella', finder_kind_file: 'Documento',
    finder_item: 'elemento', finder_items: 'elementi',
    finder_empty_folder: 'Questa cartella è vuota',
    finder_no_results: 'Nessun risultato',
    finder_gallery_hint: "Seleziona un elemento per l'anteprima",

    /* ── Cestino ── */
    trash_title: 'Cestino',
    trash_empty: 'Il cestino è vuoto',
    trash_zero_items: '0 elementi',

    /* ── Music Menu ── */
    music_playlist: 'Playlist',

    /* ── Galerie ── */
    galerie_title: 'Galleria',
    galerie_photos: 'Foto',
    galerie_photo: 'Foto',
    galerie_search: 'Cerca…',
    galerie_all: 'Tutti',
    galerie_back: 'Indietro',
    galerie_no_photos: 'Nessuna foto trovata',
    galerie_demo_mode: 'Modalità demo — galerie.json non trovato',

    /* ── Github ── */
    github_view_profile: 'Vedi profilo',
    github_repos: 'Repos',
    github_followers: 'Follower',
    github_following: 'Following',
    github_repositories: 'Repository',
    github_shown: 'mostrati',
    github_public: 'Pubblico',
    github_no_desc: 'Nessuna descrizione',
    github_no_bio: 'Nessuna bio',
    github_loading: 'Caricamento…',

    /* ── 3D Model Viewer ── */
    model_auto_rotate: 'Rotazione automatica',
    model_reset_view: 'Ripristina vista',
    model_zoom_in: 'Ingrandisci',
    model_zoom_out: 'Rimpicciolisci',
    model_download: 'Scarica modello',
    model_fullscreen: 'Schermo intero',
    model_select: 'Seleziona modello',
    model_right: 'DESTRA',
    model_left: 'SINISTRA',
    model_top: 'SOPRA',
    model_bottom: 'SOTTO',
    model_front: 'DAVANTI',
    model_back: 'DIETRO',

    /* ── Dock Context Menu ── */
    dock_open: 'Apri',
    dock_close: 'Chiudi',
    dock_minimize: 'Minimizza',
    dock_show: 'Mostra',
    dock_maximize: 'Massimizza',
    dock_restore: 'Ripristina',
  },
};

// we export the whole dictionary so other files can import it
export default T;
