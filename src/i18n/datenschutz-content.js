// ─── Datenschutz / Privacy Policy – Übersetzungen ───
// Alle Texte der Datenschutzerklärung in drei Sprachen:
//   de = Deutsch (Original)
//   en = English (B2)
//   it = Italiano (A2)

const datenschutzContent = {

  /* ═══════════════════════════════════════════════════
     DEUTSCH – Originaltext
     ═══════════════════════════════════════════════════ */
  de: {
    title: 'Datenschutzerklärung',

    // 1. Einleitung
    s1_title: '1. Einleitung',
    s1_intro: 'Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. In dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung personenbezogener Daten bei der Nutzung unserer Website.',
    s1_legal_basis: 'Verantwortlich im Sinne der EU-Datenschutz-Grundverordnung (DSGVO) sowie des italienischen Datenschutzgesetzes (Codice in materia di protezione dei dati personali, D.Lgs. 196/2003, aktualisiert durch D.Lgs. 101/2018) ist:',

    // 1.1 Kontaktdaten
    s11_title: '1.1 Kontaktdaten des Verantwortlichen',

    // 1.2 Umfang der Datenverarbeitung
    s12_title: '1.2 Umfang der Datenverarbeitung',
    s12_p1: 'Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt ausschließlich auf Grundlage einer gesetzlichen Erlaubnis oder Ihrer ausdrücklichen Einwilligung.',
    s12_p2: 'Als Rechtsgrundlage dient uns insbesondere:',
    s12_li1_label: 'Art. 6 Abs. 1 lit. a DSGVO',
    s12_li1_text: 'Einwilligung der betroffenen Person',
    s12_li2_label: 'Art. 6 Abs. 1 lit. b DSGVO',
    s12_li2_text: 'Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen',
    s12_li3_label: 'Art. 6 Abs. 1 lit. f DSGVO',
    s12_li3_text: 'Wahrung berechtigter Interessen, sofern die Grundrechte der betroffenen Person nicht überwiegen',

    // 1.3 Datenverarbeitung außerhalb des EWR
    s13_title: '1.3 Datenverarbeitung außerhalb des EWR',
    s13_p1: 'Soweit wir Daten in einem Drittland (außerhalb des Europäischen Wirtschaftsraums) verarbeiten oder dies im Rahmen der Nutzung von Diensten Dritter geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer (vor-)vertraglichen Pflichten erforderlich ist, auf Grundlage Ihrer Einwilligung oder aufgrund eines berechtigten Interesses. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse verarbeiten wir die Daten in einem Drittland nur beim Vorliegen eines angemessenen Datenschutzniveaus (z. B. EU-Angemessenheitsbeschluss, Standardvertragsklauseln oder verbindliche interne Datenschutzvorschriften).',

    // 1.4 Speicherdauer
    s14_title: '1.4 Speicherdauer',
    s14_p1: 'Personenbezogene Daten werden nur solange gespeichert, wie es für den jeweiligen Verarbeitungszweck erforderlich ist. Soweit gesetzliche Aufbewahrungsfristen bestehen, werden die Daten nach Ablauf dieser Fristen gelöscht oder anonymisiert. Server-Log-Dateien werden in der Regel nach 30 Tagen automatisch gelöscht.',

    // 1.5 Rechte der Betroffenen
    s15_title: '1.5 Rechte der Betroffenen',
    s15_intro: 'Im Rahmen der geltenden Datenschutzgesetze stehen Ihnen folgende Rechte zu:',
    s15_li1_label: 'Auskunftsrecht',
    s15_li1_ref: 'Art. 15 DSGVO',
    s15_li1_text: 'Sie können Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten verlangen.',
    s15_li2_label: 'Recht auf Berichtigung',
    s15_li2_ref: 'Art. 16 DSGVO',
    s15_li2_text: 'Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.',
    s15_li3_label: 'Recht auf Löschung',
    s15_li3_ref: 'Art. 17 DSGVO',
    s15_li3_text: 'Sie können die Löschung Ihrer Daten verlangen, sofern die Voraussetzungen erfüllt sind.',
    s15_li4_label: 'Recht auf Einschränkung der Verarbeitung',
    s15_li4_ref: 'Art. 18 DSGVO',
    s15_li4_text: 'Sie können unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung verlangen.',
    s15_li5_label: 'Recht auf Datenübertragbarkeit',
    s15_li5_ref: 'Art. 20 DSGVO',
    s15_li5_text: 'Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.',
    s15_li6_label: 'Widerspruchsrecht',
    s15_li6_ref: 'Art. 21 DSGVO',
    s15_li6_text: 'Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen, wenn die Verarbeitung auf berechtigten Interessen basiert.',
    s15_revoke: 'Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Des Weiteren haben Sie das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen:',
    s15_garante_website_label: 'Webseite',
    s15_garante_github_label: 'GitHub Datenschutzerklärung',

    // 1.6 Pflicht zur Bereitstellung
    s16_title: '1.6 Pflicht zur Bereitstellung von Daten',
    s16_p1: 'Sie sind nicht verpflichtet, uns personenbezogene Daten bereitzustellen. Ohne bestimmte Angaben können jedoch einzelne Funktionen der Website möglicherweise nicht oder nur eingeschränkt zur Verfügung stehen.',

    // 1.7 Keine automatische Entscheidungsfindung
    s17_title: '1.7 Keine automatische Entscheidungsfindung',
    s17_p1: 'Es findet keine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und 4 DSGVO statt, die Ihnen gegenüber rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt.',

    // 1.8 Kontaktaufnahme
    s18_title: '1.8 Kontaktaufnahme',
    s18_p1: 'Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden die von Ihnen übermittelten Daten (z. B. Name, E-Mail-Adresse, Nachrichteninhalt) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet und gespeichert. Diese Daten werden ohne Ihre Einwilligung nicht an Dritte weitergegeben. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage).',

    // 2. Datenverarbeitung auf unserer Website
    s2_title: '2. Datenverarbeitung auf unserer Website',

    // 2.1 Hinweis für EU-Besucher
    s21_title: '2.1 Hinweis für EU-Besucher',
    s21_p1: 'Diese Website richtet sich vorrangig an Besucher innerhalb der Europäischen Union und des Europäischen Wirtschaftsraums. Wir verpflichten uns zur Einhaltung der EU-Datenschutz-Grundverordnung (DSGVO) und der anwendbaren nationalen Datenschutzgesetze.',

    // 2.2 Informatorische Nutzung der Website
    s22_title: '2.2 Informatorische Nutzung der Website',
    s22_p1: 'Bei der rein informatorischen Nutzung der Website – also wenn Sie sich weder registrieren noch uns anderweitig Informationen übermitteln – werden automatisch technische Daten erhoben, die Ihr Browser an unseren Server übermittelt. Diese Daten sind technisch notwendig, um Ihnen die Website korrekt auszuliefern, und werden vorübergehend in sogenannten Server-Log-Dateien gespeichert:',
    s22_li1: 'IP-Adresse des anfragenden Geräts (anonymisiert)',
    s22_li2: 'Datum und Uhrzeit des Zugriffs',
    s22_li3: 'Zeitzone des anfragenden Systems',
    s22_li4: 'Inhalt der Anfrage (aufgerufene Seite / Ressource)',
    s22_li5: 'HTTP-Statuscode',
    s22_li6: 'Übertragene Datenmenge',
    s22_li7: 'Referrer-URL (zuvor besuchte Seite)',
    s22_li8: 'Verwendeter Browser und Betriebssystem',
    s22_li9: 'Sprache und Version der Browsersoftware',
    s22_p2: 'Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Gewährleistung eines stabilen, sicheren und optimierten Betriebs der Website. Die Daten werden nicht mit anderen Datenquellen zusammengeführt. Eine Weitergabe an Dritte findet nicht statt, es sei denn, es besteht eine gesetzliche Verpflichtung.',

    // 2.3 Webhosting
    s23_title: '2.3 Webhosting',
    s23_p1: 'Diese Website wird bei <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Beim Aufruf unserer Website erfasst Vercel automatisch technische Daten in Server-Log-Dateien, die Ihr Browser übermittelt (z. B. IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp). Diese Daten werden auf Servern von Vercel gespeichert, die sich auch außerhalb des EWR befinden können.',
    s23_p2_prefix: 'Vercel hat sich zur Einhaltung der DSGVO verpflichtet und setzt EU-Standardvertragsklauseln (Standard Contractual Clauses, SCC) ein, um ein angemessenes Datenschutzniveau zu gewährleisten. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel:',
    s23_p2_link_text: 'vercel.com/legal/privacy-policy',
    s23_p3: 'Die Nutzung von Vercel erfolgt zum Zweck der sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).',

    // 2.4 Technisch notwendige Cookies und localStorage
    s24_title: '2.4 Technisch notwendige Cookies und localStorage',
    s24_p1: 'Unsere Website nutzt ausschließlich technisch notwendige Cookies sowie den lokalen Speicher (localStorage) Ihres Browsers. Diese dienen ausschließlich der Funktionalität der Website und speichern keine personenbezogenen Daten, die für Tracking oder Werbezwecke verwendet werden könnten.',
    s24_p2: 'Folgende Einträge werden im localStorage abgelegt:',
    s24_cookie1_badge: 'Notwendig',
    s24_cookie1_desc: 'Speichert Ihre Entscheidung zur Cookie-Einwilligung, um das Cookie-Banner bei erneutem Besuch nicht erneut anzuzeigen.',
    s24_cookie2_badge: 'Funktional',
    s24_cookie2_desc: 'Speichert den Zustand des virtuellen Dateisystems der Terminal-Anwendung lokal im Browser.',
    s24_cookie3_badge: 'Funktional',
    s24_cookie3_desc: 'Speichert die vom Nutzer gewählten Einstellungen der Anwendung, z. B. Sprache, Erscheinungsbild und weitere Präferenzen.',
    s24_cookie4_badge: 'Funktional',
    s24_cookie4_desc: 'Speichert die Konfiguration des Kontrollzentrums (z. B. Helligkeit, Lautstärke und weitere Schnelleinstellungen).',
    s24_storage_duration: 'Speicherdauer:',
    s24_storage_value: 'Bis zur manuellen Löschung',
    s24_p3: 'Die Rechtsgrundlage für die Verwendung technisch notwendiger Cookies und localStorage-Einträge ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht darin, Ihnen eine funktionsfähige, nutzerfreundliche Website bereitzustellen.',

    // 2.5 Lokal eingebundene Schriftarten
    s25_title: '2.5 Lokal eingebundene Schriftarten',
    s25_p1: 'Für die einheitliche Darstellung von Schriftarten nutzt diese Website lokal eingebundene Webfonts. Alle Schriftarten werden direkt vom eigenen Server geladen – es findet <strong>keine Verbindung zu externen Servern</strong> (z. B. Google Fonts) statt. Es werden keine Daten an Drittanbieter übermittelt.',

    // 2.6 Lokal eingebundene Bibliotheken
    s26_title: '2.6 Lokal eingebundene Bibliotheken',
    s26_p1: 'Alle auf dieser Website verwendeten JavaScript-Bibliotheken und Frameworks werden lokal auf unserem eigenen Server gehostet und von dort geladen. Es werden <strong>keine externen CDN-Dienste</strong> (Content Delivery Networks) genutzt und somit keine Daten an externe Anbieter übertragen.',

    // 2.7 Keine Drittanbieter-Tracking-Tools
    s27_title: '2.7 Keine Drittanbieter-Tracking-Tools',
    s27_p1: 'Wir setzen auf dieser Website keine Analyse-, Tracking- oder Marketing-Tools von Drittanbietern ein. Es werden keine Daten an Dienste wie Google Analytics, Facebook Pixel oder vergleichbare Anbieter übermittelt. Die Website verwendet weder externe Tracking-Skripte noch Social-Media-Plugins, die Daten an Dritte weitergeben könnten.',

    // 3. SSL/TLS-Verschlüsselung
    s3_title: '3. SSL/TLS-Verschlüsselung',
    s3_p1: 'Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile Ihres Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in der Browserleiste. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.',

    // 4. Online-Präsenzen in sozialen Netzwerken
    s4_title: '4. Online-Präsenzen in sozialen Netzwerken',
    s4_p1: 'Wir unterhalten eine Online-Präsenz auf der Plattform GitHub, um mit dort aktiven Nutzern, Entwicklern und Interessierten zu kommunizieren und über unsere Projekte und Leistungen zu informieren.',
    s4_p2_prefix: 'Beim Aufruf unserer GitHub-Seite gelten die Datenschutzbestimmungen und Nutzungsbedingungen von GitHub Inc. (bzw. GitHub B.V. für Nutzer im EWR). Wir verweisen auf die Datenschutzerklärung von GitHub:',
    s4_p2_link_text: 'GitHub Datenschutzerklärung',
    s4_p3: 'Wir verarbeiten die Daten der Nutzer unserer Online-Präsenz nur insoweit, als uns GitHub aggregierte Statistiken oder Interaktionsdaten bereitstellt. Eine eigenständige Erhebung personenbezogener Daten über GitHub findet durch uns nicht statt.',

    // 5. Änderungen
    s5_title: '5. Änderungen dieser Datenschutzerklärung',
    s5_p1: 'Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte Rechtslagen, technische Neuerungen oder Änderungen unseres Angebots anzupassen. Es gilt stets die zum Zeitpunkt Ihres Besuchs aktuelle Fassung. Wir empfehlen Ihnen, diese Datenschutzerklärung regelmäßig einzusehen.',

    // 6. Fragen und Kommentare
    s6_title: '6. Fragen und Kommentare',
    s6_p1: 'Für Fragen, Anregungen oder Beschwerden zum Thema Datenschutz stehen wir Ihnen gerne zur Verfügung:',

    // Footer
    last_updated: 'Stand: März 2026',
  },

  /* ═══════════════════════════════════════════════════
     ENGLISH – B2 level
     ═══════════════════════════════════════════════════ */
  en: {
    title: 'Privacy Policy',

    s1_title: '1. Introduction',
    s1_intro: 'Protecting your personal data is very important to us. This privacy policy explains how we process personal data when you use our website.',
    s1_legal_basis: 'The controller within the meaning of the EU General Data Protection Regulation (GDPR) and the Italian Data Protection Code (Codice in materia di protezione dei dati personali, D.Lgs. 196/2003, as amended by D.Lgs. 101/2018) is:',

    s11_title: '1.1 Contact Details of the Controller',

    s12_title: '1.2 Scope of Data Processing',
    s12_p1: 'We only process personal data to the extent necessary to provide a functional website and our content and services. Processing is carried out exclusively on the basis of a legal permission or your explicit consent.',
    s12_p2: 'The legal basis for processing includes in particular:',
    s12_li1_label: 'Art. 6(1)(a) GDPR',
    s12_li1_text: 'Consent of the data subject',
    s12_li2_label: 'Art. 6(1)(b) GDPR',
    s12_li2_text: 'Performance of a contract or pre-contractual measures',
    s12_li3_label: 'Art. 6(1)(f) GDPR',
    s12_li3_text: 'Legitimate interests, provided the fundamental rights of the data subject do not prevail',

    s13_title: '1.3 Data Processing Outside the EEA',
    s13_p1: 'If we process data in a third country (outside the European Economic Area), or if this occurs through the use of third-party services, it only takes place where necessary to fulfil our (pre-)contractual obligations, on the basis of your consent, or due to a legitimate interest. Subject to legal or contractual permissions, we only process data in a third country where an adequate level of data protection is ensured (e.g. EU adequacy decision, Standard Contractual Clauses, or Binding Corporate Rules).',

    s14_title: '1.4 Storage Duration',
    s14_p1: 'Personal data is only stored for as long as necessary for its processing purpose. Where statutory retention periods apply, the data is deleted or anonymised once those periods expire. Server log files are generally deleted automatically after 30 days.',

    s15_title: '1.5 Rights of Data Subjects',
    s15_intro: 'Under applicable data protection laws, you have the following rights:',
    s15_li1_label: 'Right of access',
    s15_li1_ref: 'Art. 15 GDPR',
    s15_li1_text: 'You may request information about your personal data stored by us.',
    s15_li2_label: 'Right to rectification',
    s15_li2_ref: 'Art. 16 GDPR',
    s15_li2_text: 'You may request the correction of inaccurate data or the completion of incomplete data.',
    s15_li3_label: 'Right to erasure',
    s15_li3_ref: 'Art. 17 GDPR',
    s15_li3_text: 'You may request the deletion of your data, provided the legal requirements are met.',
    s15_li4_label: 'Right to restriction of processing',
    s15_li4_ref: 'Art. 18 GDPR',
    s15_li4_text: 'Under certain conditions, you may request the restriction of data processing.',
    s15_li5_label: 'Right to data portability',
    s15_li5_ref: 'Art. 20 GDPR',
    s15_li5_text: 'You have the right to receive your data in a structured, commonly used and machine-readable format.',
    s15_li6_label: 'Right to object',
    s15_li6_ref: 'Art. 21 GDPR',
    s15_li6_text: 'You may object to the processing of your data at any time if the processing is based on legitimate interests.',
    s15_revoke: 'You may withdraw your consent at any time with effect for the future. You also have the right to lodge a complaint with the competent supervisory authority:',
    s15_garante_website_label: 'Website',

    s16_title: '1.6 Obligation to Provide Data',
    s16_p1: 'You are not obliged to provide us with personal data. However, without certain information, some features of the website may not be available or may only work to a limited extent.',

    s17_title: '1.7 No Automated Decision-Making',
    s17_p1: 'No automated decision-making, including profiling pursuant to Art. 22(1) and (4) GDPR, takes place that produces legal effects concerning you or similarly significantly affects you.',

    s18_title: '1.8 Contacting Us',
    s18_p1: 'When you contact us by e-mail or through a contact form, the data you submit (e.g. name, e-mail address, message content) is processed and stored for the purpose of handling your enquiry. This data will not be shared with third parties without your consent. The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures) and Art. 6(1)(f) GDPR (legitimate interest in responding to your enquiry).',

    s2_title: '2. Data Processing on Our Website',

    s21_title: '2.1 Notice for EU Visitors',
    s21_p1: 'This website is primarily aimed at visitors within the European Union and the European Economic Area. We are committed to complying with the EU General Data Protection Regulation (GDPR) and applicable national data protection laws.',

    s22_title: '2.2 Informational Use of the Website',
    s22_p1: 'When you use our website purely for informational purposes — i.e. without registering or otherwise submitting information to us — technical data is automatically collected by your browser and sent to our server. This data is technically necessary to deliver the website correctly and is temporarily stored in server log files:',
    s22_li1: 'IP address of the requesting device (anonymised)',
    s22_li2: 'Date and time of access',
    s22_li3: 'Time zone of the requesting system',
    s22_li4: 'Content of the request (page / resource accessed)',
    s22_li5: 'HTTP status code',
    s22_li6: 'Amount of data transferred',
    s22_li7: 'Referrer URL (previously visited page)',
    s22_li8: 'Browser and operating system used',
    s22_li9: 'Language and version of the browser software',
    s22_p2: 'This data is processed on the basis of Art. 6(1)(f) GDPR. Our legitimate interest lies in ensuring the stable, secure and optimised operation of the website. The data is not merged with other data sources. It is not shared with third parties unless there is a legal obligation to do so.',

    s23_title: '2.3 Web Hosting',
    s23_p1: 'This website is hosted by <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133, Walnut, CA 91789, USA). When you visit our website, Vercel automatically collects technical data in server log files transmitted by your browser (e.g. IP address, time of access, browser type). This data may be stored on Vercel servers located outside the EEA.',
    s23_p2_prefix: 'Vercel is committed to GDPR compliance and uses EU Standard Contractual Clauses (SCC) to ensure an adequate level of data protection. For more information, please refer to Vercel\'s privacy policy:',
    s23_p2_link_text: 'vercel.com/legal/privacy-policy',
    s23_p3: 'Vercel is used for the purpose of securely, quickly and efficiently providing our online service (Art. 6(1)(f) GDPR — legitimate interest).',

    s24_title: '2.4 Technically Necessary Cookies and localStorage',
    s24_p1: 'Our website exclusively uses technically necessary cookies and the local storage (localStorage) of your browser. These serve solely the functionality of the website and do not store any personal data that could be used for tracking or advertising purposes.',
    s24_p2: 'The following entries are stored in localStorage:',
    s24_cookie1_badge: 'Required',
    s24_cookie1_desc: 'Stores your cookie consent decision so that the cookie banner is not shown again on repeat visits.',
    s24_cookie2_badge: 'Functional',
    s24_cookie2_desc: 'Stores the state of the virtual file system of the terminal application locally in the browser.',
    s24_cookie3_badge: 'Functional',
    s24_cookie3_desc: 'Stores the user\'s application settings, such as language, appearance and other preferences.',
    s24_cookie4_badge: 'Functional',
    s24_cookie4_desc: 'Stores the configuration of the control centre (e.g. brightness, volume and other quick settings).',
    s24_storage_duration: 'Storage duration:',
    s24_storage_value: 'Until manually deleted',
    s24_p3: 'The legal basis for using technically necessary cookies and localStorage entries is Art. 6(1)(f) GDPR. Our legitimate interest consists in providing you with a functional, user-friendly website.',

    s25_title: '2.5 Locally Hosted Fonts',
    s25_p1: 'For a consistent display of fonts, this website uses locally hosted web fonts. All fonts are loaded directly from our own server — <strong>no connection to external servers</strong> (e.g. Google Fonts) is made. No data is transmitted to third-party providers.',

    s26_title: '2.6 Locally Hosted Libraries',
    s26_p1: 'All JavaScript libraries and frameworks used on this website are hosted and loaded from our own server. <strong>No external CDN services</strong> (Content Delivery Networks) are used, and therefore no data is transmitted to external providers.',

    s27_title: '2.7 No Third-Party Tracking Tools',
    s27_p1: 'We do not use any third-party analytics, tracking or marketing tools on this website. No data is sent to services such as Google Analytics, Facebook Pixel or comparable providers. The website uses neither external tracking scripts nor social media plugins that could share data with third parties.',

    s3_title: '3. SSL/TLS Encryption',
    s3_p1: 'For security reasons and to protect the transmission of confidential content, this website uses SSL/TLS encryption. You can recognise an encrypted connection by the browser address bar changing from "http://" to "https://" and by the lock icon in the browser bar. When SSL/TLS encryption is active, the data you send to us cannot be read by third parties.',

    s4_title: '4. Online Presence on Social Networks',
    s4_p1: 'We maintain an online presence on the GitHub platform in order to communicate with active users, developers and interested parties, and to provide information about our projects and services.',
    s4_p2_prefix: 'When you visit our GitHub page, the privacy policy and terms of use of GitHub Inc. (or GitHub B.V. for users in the EEA) apply. Please refer to GitHub\'s privacy statement:',
    s4_p2_link_text: 'GitHub Privacy Statement',
    s4_p3: 'We only process data from users of our online presence to the extent that GitHub provides us with aggregated statistics or interaction data. We do not independently collect personal data via GitHub.',

    s5_title: '5. Changes to This Privacy Policy',
    s5_p1: 'We reserve the right to update this privacy policy as needed to reflect changes in the legal situation, technical developments or changes to our services. The version in effect at the time of your visit always applies. We recommend reviewing this privacy policy regularly.',

    s6_title: '6. Questions and Comments',
    s6_p1: 'If you have any questions, suggestions or complaints regarding data protection, please feel free to contact us:',

    last_updated: 'Last updated: March 2026',
  },

  /* ═══════════════════════════════════════════════════
     ITALIANO – livello A2 (frasi corte e semplici)
     ═══════════════════════════════════════════════════ */
  it: {
    title: 'Informativa sulla privacy',

    s1_title: '1. Introduzione',
    s1_intro: 'I tuoi dati personali sono importanti per noi. In questa pagina spieghiamo come usiamo i tuoi dati quando visiti il nostro sito.',
    s1_legal_basis: 'Il responsabile del trattamento dei dati secondo il Regolamento UE (GDPR) e il Codice italiano per la protezione dei dati personali (D.Lgs. 196/2003, aggiornato dal D.Lgs. 101/2018) è:',

    s11_title: '1.1 Dati di contatto del responsabile',

    s12_title: '1.2 Quali dati raccogliamo',
    s12_p1: 'Usiamo i tuoi dati personali solo quando è necessario per far funzionare il sito. Lo facciamo solo se la legge lo permette o se tu ci dai il consenso.',
    s12_p2: 'Le basi legali sono:',
    s12_li1_label: 'Art. 6(1)(a) GDPR',
    s12_li1_text: 'Il tuo consenso',
    s12_li2_label: 'Art. 6(1)(b) GDPR',
    s12_li2_text: 'Un contratto o una richiesta prima di un contratto',
    s12_li3_label: 'Art. 6(1)(f) GDPR',
    s12_li3_text: 'Un nostro interesse legittimo, se i tuoi diritti non sono più importanti',

    s13_title: '1.3 Dati fuori dallo Spazio Economico Europeo',
    s13_p1: 'Se i tuoi dati vengono trattati fuori dallo Spazio Economico Europeo (SEE), lo facciamo solo quando è necessario, con il tuo consenso, o per un interesse legittimo. Usiamo le protezioni previste dalla legge, come le Clausole Contrattuali Standard della UE.',

    s14_title: '1.4 Per quanto tempo conserviamo i dati',
    s14_p1: 'Conserviamo i tuoi dati solo per il tempo necessario. Se la legge dice di conservarli più a lungo, lo facciamo. Dopo, li cancelliamo. I file di log del server vengono cancellati dopo 30 giorni.',

    s15_title: '1.5 I tuoi diritti',
    s15_intro: 'Hai questi diritti:',
    s15_li1_label: 'Diritto di accesso',
    s15_li1_ref: 'Art. 15 GDPR',
    s15_li1_text: 'Puoi chiedere quali dati abbiamo su di te.',
    s15_li2_label: 'Diritto di rettifica',
    s15_li2_ref: 'Art. 16 GDPR',
    s15_li2_text: 'Puoi chiedere di correggere dati sbagliati.',
    s15_li3_label: 'Diritto alla cancellazione',
    s15_li3_ref: 'Art. 17 GDPR',
    s15_li3_text: 'Puoi chiedere di cancellare i tuoi dati.',
    s15_li4_label: 'Diritto di limitazione',
    s15_li4_ref: 'Art. 18 GDPR',
    s15_li4_text: 'Puoi chiedere di limitare il trattamento dei tuoi dati.',
    s15_li5_label: 'Diritto alla portabilità',
    s15_li5_ref: 'Art. 20 GDPR',
    s15_li5_text: 'Puoi ricevere i tuoi dati in un formato che puoi usare facilmente.',
    s15_li6_label: 'Diritto di opposizione',
    s15_li6_ref: 'Art. 21 GDPR',
    s15_li6_text: 'Puoi dire di no al trattamento dei tuoi dati in qualsiasi momento.',
    s15_revoke: 'Puoi ritirare il tuo consenso in qualsiasi momento. Puoi anche fare un reclamo all\'autorità di controllo:',
    s15_garante_website_label: 'Sito web',

    s16_title: '1.6 Devi darci i tuoi dati?',
    s16_p1: 'No, non sei obbligato. Ma senza alcuni dati, alcune funzioni del sito potrebbero non funzionare bene.',

    s17_title: '1.7 Nessuna decisione automatica',
    s17_p1: 'Non usiamo decisioni automatiche o profilazione (Art. 22 GDPR) che hanno effetti legali su di te.',

    s18_title: '1.8 Contattarci',
    s18_p1: 'Se ci scrivi una e-mail o usi un modulo di contatto, salviamo i tuoi dati (nome, e-mail, messaggio) per risponderti. Non diamo i tuoi dati ad altri senza il tuo consenso. La base legale è Art. 6(1)(b) GDPR e Art. 6(1)(f) GDPR.',

    s2_title: '2. Come usiamo i dati sul nostro sito',

    s21_title: '2.1 Informazione per visitatori UE',
    s21_p1: 'Questo sito è fatto soprattutto per visitatori della Unione Europea. Rispettiamo il GDPR e le leggi nazionali sulla privacy.',

    s22_title: '2.2 Uso informativo del sito',
    s22_p1: 'Quando visiti il sito senza registrarti, il tuo browser invia alcuni dati tecnici al nostro server. Questi dati servono per mostrare il sito. Li salviamo nei file di log del server:',
    s22_li1: 'Indirizzo IP del dispositivo (anonimizzato)',
    s22_li2: 'Data e ora della visita',
    s22_li3: 'Fuso orario del dispositivo',
    s22_li4: 'Pagina visitata',
    s22_li5: 'Codice di stato HTTP',
    s22_li6: 'Quantità di dati trasferiti',
    s22_li7: 'URL di provenienza (pagina visitata prima)',
    s22_li8: 'Browser e sistema operativo usato',
    s22_li9: 'Lingua e versione del browser',
    s22_p2: 'Usiamo questi dati secondo Art. 6(1)(f) GDPR. Ci servono per far funzionare il sito in modo sicuro e stabile. Non uniamo questi dati con altri dati. Non li diamo ad altri, tranne se la legge lo richiede.',

    s23_title: '2.3 Hosting del sito',
    s23_p1: 'Il nostro sito è ospitato da <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133, Walnut, CA 91789, USA). Quando visiti il sito, Vercel salva dati tecnici dal tuo browser (per esempio indirizzo IP, ora della visita, tipo di browser). I server di Vercel possono trovarsi fuori dallo SEE.',
    s23_p2_prefix: 'Vercel rispetta il GDPR e usa le Clausole Contrattuali Standard della UE. Per più informazioni, vedi la privacy policy di Vercel:',
    s23_p2_link_text: 'vercel.com/legal/privacy-policy',
    s23_p3: 'Usiamo Vercel per fornire il nostro sito in modo sicuro e veloce (Art. 6(1)(f) GDPR).',

    s24_title: '2.4 Cookie e localStorage necessari',
    s24_p1: 'Il nostro sito usa solo cookie e localStorage necessari per funzionare. Non salviamo dati personali per pubblicità o tracciamento.',
    s24_p2: 'Salviamo queste voci nel localStorage:',
    s24_cookie1_badge: 'Necessario',
    s24_cookie1_desc: 'Salva la tua scelta sui cookie. Così non vedi il banner dei cookie ogni volta.',
    s24_cookie2_badge: 'Funzionale',
    s24_cookie2_desc: 'Salva lo stato del file system del terminale nel browser.',
    s24_cookie3_badge: 'Funzionale',
    s24_cookie3_desc: 'Salva le impostazioni della app, per esempio lingua e aspetto.',
    s24_cookie4_badge: 'Funzionale',
    s24_cookie4_desc: 'Salva le impostazioni del centro di controllo (per esempio luminosità e volume).',
    s24_storage_duration: 'Durata:',
    s24_storage_value: 'Fino alla cancellazione manuale',
    s24_p3: 'La base legale per questi cookie e localStorage è Art. 6(1)(f) GDPR. Ci servono per darti un sito che funziona bene.',

    s25_title: '2.5 Font ospitati localmente',
    s25_p1: 'I font di questo sito sono caricati dal nostro server. <strong>Non ci colleghiamo a server esterni</strong> (per esempio Google Fonts). Non inviamo dati a terzi.',

    s26_title: '2.6 Librerie ospitate localmente',
    s26_p1: 'Tutte le librerie JavaScript di questo sito sono sul nostro server. <strong>Non usiamo CDN esterni</strong> (Content Delivery Network). Non inviamo dati a fornitori esterni.',

    s27_title: '2.7 Nessun strumento di tracciamento',
    s27_p1: 'Non usiamo strumenti di analisi, tracciamento o marketing di terzi. Non inviamo dati a Google Analytics, Facebook Pixel o servizi simili. Non usiamo script di tracciamento esterni o plugin di social media.',

    s3_title: '3. Crittografia SSL/TLS',
    s3_p1: 'Per sicurezza, questo sito usa la crittografia SSL/TLS. Puoi vedere la connessione sicura quando l\'indirizzo nel browser cambia da "http://" a "https://" e appare il simbolo del lucchetto. Con la crittografia attiva, nessuno può leggere i dati che ci invii.',

    s4_title: '4. Presenza online sui social network',
    s4_p1: 'Siamo presenti su GitHub per comunicare con utenti, sviluppatori e persone interessate ai nostri progetti.',
    s4_p2_prefix: 'Quando visiti la nostra pagina GitHub, si applicano le regole di GitHub Inc. (o GitHub B.V. per utenti nello SEE). Vedi la privacy policy di GitHub:',
    s4_p2_link_text: 'Privacy Policy di GitHub',
    s4_p3: 'Usiamo solo i dati che GitHub ci dà come statistiche. Non raccogliamo dati personali tramite GitHub.',

    s5_title: '5. Modifiche a questa informativa',
    s5_p1: 'Possiamo cambiare questa informativa quando necessario. Vale sempre la versione attuale. Ti consigliamo di leggere questa pagina regolarmente.',

    s6_title: '6. Domande e commenti',
    s6_p1: 'Se hai domande sulla privacy, puoi contattarci:',

    last_updated: 'Ultimo aggiornamento: marzo 2026',
  },
};

export default datenschutzContent;
