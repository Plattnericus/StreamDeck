// All UI strings for each supported language (German, English, Italian)
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

export default T;
