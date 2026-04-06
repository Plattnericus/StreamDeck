// ─── AGB-Inhalte ───
// Alle Texte für die AGB-Seite in drei Sprachen:
// DE (Original), EN (B2), IT (A2)

const agbContent = {
  de: {
    title: 'Allgemeine Geschäftsbedingungen',
    intro:
      'Allgemeine Geschäftsbedingungen für die Nutzung der Website von Felix Plattner.',

    s1_title: '§ 1 Allgemeines',
    s1_p1:
      '1.1 Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") regeln die Nutzung der Website von Felix Plattner (nachfolgend „Betreiber"). Die Website ist unter der Domain streamdeck.plattnericus.dev erreichbar.',
    s1_p2:
      '1.2 Die Website ist ein privates, nicht-kommerzielles Portfolio- und Showcase-Projekt. Sie dient ausschließlich der Präsentation persönlicher Arbeiten, dem Experimentieren mit Webtechnologien sowie zu Lern- und Demonstrationszwecken.',
    s1_p3:
      '1.3 Mit der Nutzung dieser Website erklären Sie sich mit diesen AGB einverstanden. Sofern Sie mit einzelnen Regelungen nicht einverstanden sind, bitten wir Sie, die Website nicht zu nutzen.',
    s1_p4:
      '1.4 Der Betreiber behält sich das Recht vor, diese AGB jederzeit ohne gesonderte Benachrichtigung zu ändern. Es gilt jeweils die zum Zeitpunkt der Nutzung aktuelle Fassung.',

    s2_title: '§ 2 Leistungsbeschreibung',
    s2_p1:
      '2.1 Die Website stellt eine interaktive Webplattform dar, die eine grafische Benutzeroberfläche im Stil eines Desktop-Betriebssystems (angelehnt an macOS von Apple) simuliert. Sie umfasst unter anderem simulierte Anwendungen, Fenster, einen Dock-Bereich sowie interaktive Elemente.',
    s2_p2:
      '2.2 Der Umfang der bereitgestellten Funktionen kann jederzeit verändert, erweitert oder eingeschränkt werden, ohne dass hieraus Ansprüche der Nutzer entstehen.',
    s2_p3:
      '2.3 Der Betreiber ist bemüht, die Website möglichst unterbrechungsfrei zur Verfügung zu stellen. Es besteht jedoch kein Anspruch auf ständige Verfügbarkeit. Wartungsarbeiten, technische Störungen oder höhere Gewalt können zu vorübergehenden Einschränkungen führen.',
    s2_p4:
      '2.4 Die auf der Website dargestellten Inhalte, Designs und Funktionen dienen ausschließlich Demonstrations- und Showcasezwecken. Sie begründen keinerlei Rechtsansprüche, Lizenzen oder exklusive Nutzungsrechte.',

    s3_title: '§ 3 Zugang und Nutzerkonto',
    s3_p1:
      '3.1 Die Website enthält einen simulierten Login-Bereich. Dieser dient ausschließlich der Demonstration und hat keine tatsächliche Authentifizierungsfunktion. Es werden dabei keine echten Benutzerkonten erstellt oder verwaltet.',
    s3_p2:
      '3.2 Sollten im Rahmen der Simulation Zugangsdaten angezeigt oder eingegeben werden, handelt es sich um rein fiktive Daten ohne jegliche reale Funktion.',
    s3_p3:
      '3.3 Der Nutzer ist dafür verantwortlich, dass er keine personenbezogenen oder sensiblen Daten in Eingabefelder eingibt, die über die simulierte Funktionalität hinausgehen.',

    s4_title: '§ 4 Pflichten des Nutzers',
    s4_intro:
      '4.1 Der Nutzer verpflichtet sich, die Website nur im Rahmen der geltenden Gesetze und dieser AGB zu nutzen. Insbesondere ist es untersagt:',
    s4_li1:
      'Die Website oder Teile davon ohne Zustimmung des Betreibers zu kopieren, zu vervielfältigen oder weiterzuverbreiten',
    s4_li2:
      'Automatisierte Zugriffe (z. B. durch Bots, Scraper oder Crawler) durchzuführen, sofern diese nicht ausdrücklich erlaubt sind',
    s4_li3:
      'Sicherheitsmechanismen der Website zu umgehen oder zu manipulieren',
    s4_li4:
      'Inhalte der Website für kommerzielle Zwecke zu verwenden',
    s4_li5:
      'Die Website in einer Weise zu nutzen, die den Betrieb beeinträchtigt oder andere Nutzer stört',
    s4_li6:
      'Schadsoftware oder andere schädliche Inhalte über die Website einzuschleusen',
    s4_p2:
      '4.2 Bei Verstößen gegen diese Pflichten behält sich der Betreiber das Recht vor, den Zugang zur Website zu beschränken oder zu sperren.',

    s5_title: '§ 5 Geistiges Eigentum und Urheberrecht',
    s5_p1:
      '5.1 Alle auf dieser Website veröffentlichten Inhalte (Texte, Grafiken, Bilder, Animationen, Code, Design, Layouts) sind urheberrechtlich geschützt und unterliegen dem italienischen Urheberrecht (Legge 22 aprile 1941, n. 633) sowie den einschlägigen EU-Richtlinien.',
    s5_p2:
      '5.2 Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der vorherigen schriftlichen Zustimmung des Betreibers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht-kommerziellen Gebrauch gestattet.',
    s5_p3:
      '5.3 Das Design der Website ist von der Benutzeroberfläche von macOS von Apple inspiriert. Alle Marken, Logos und Produktnamen von Apple sind Eigentum von Apple Inc. Diese Website steht in keiner Verbindung zu Apple Inc. und wird von Apple weder unterstützt noch autorisiert.',
    s5_p4:
      '5.4 Soweit Inhalte Dritter auf dieser Website verwendet werden, werden die jeweiligen Urheberrechte und Lizenzbestimmungen beachtet. Sollte dennoch eine Urheberrechtsverletzung vorliegen, bitten wir um einen entsprechenden Hinweis, damit wir die betreffenden Inhalte umgehend entfernen können.',

    s6_title: '§ 6 Haftungsbeschränkung',
    s6_p1:
      '6.1 Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Der Betreiber übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte.',
    s6_p2:
      '6.2 Die Nutzung der Website erfolgt auf eigene Gefahr des Nutzers. Der Betreiber haftet nicht für Schäden, die durch die Nutzung oder Nichtnutzung der Website entstehen, es sei denn, diese beruhen auf vorsätzlichem oder grob fahrlässigem Verhalten des Betreibers.',
    s6_p3:
      '6.3 Insbesondere haftet der Betreiber nicht für Schäden, die durch technische Störungen, Datenverlust, Viren oder sonstige schädliche Komponenten entstehen.',
    s6_p4:
      '6.4 Die Haftungsbeschränkung gilt nicht, soweit zwingende gesetzliche Regelungen (insbesondere nach dem italienischen Codice Civile oder dem Produkthaftungsgesetz) eine weitergehende Haftung vorsehen.',

    s7_title: '§ 7 Verfügbarkeit',
    s7_p1:
      '7.1 Der Betreiber ist bemüht, die Website dauerhaft zugänglich zu halten. Es besteht jedoch kein Anspruch auf ununterbrochene Verfügbarkeit. Wartungsarbeiten, Updates, technische Probleme oder äußere Umstände können zu vorübergehenden Unterbrechungen führen.',
    s7_p2:
      '7.2 Der Betreiber haftet nicht für Ausfälle oder Einschränkungen der Erreichbarkeit, die außerhalb seines Einflussbereichs liegen.',

    s8_title: '§ 8 Links zu externen Websites',
    s8_p1:
      '8.1 Diese Website kann Links zu externen Websites Dritter enthalten. Auf die Inhalte dieser Seiten hat der Betreiber keinen Einfluss und übernimmt daher keine Verantwortung oder Gewähr für deren Richtigkeit, Vollständigkeit oder Aktualität.',
    s8_p2:
      '8.2 Zum Zeitpunkt der Verlinkung wurden die externen Seiten auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht erkennbar. Eine permanente Kontrolle ist ohne konkrete Hinweise auf eine Rechtsverletzung nicht zumutbar.',
    s8_p3:
      '8.3 Bei Bekanntwerden von Rechtsverletzungen auf verlinkten Seiten werden die betreffenden Links unverzüglich entfernt.',

    s9_title: '§ 9 Datenschutz',
    s9_p1:
      '9.1 Der Schutz Ihrer personenbezogenen Daten ist dem Betreiber ein besonderes Anliegen. Weitere Informationen zur Erhebung, Verarbeitung und Nutzung Ihrer Daten finden Sie in der gesonderten Datenschutzerklärung.',
    s9_p2:
      '9.2 Die Datenschutzerklärung ist Bestandteil dieser AGB und kann jederzeit über die Website eingesehen werden.',

    s10_title: '§ 10 Änderung der AGB',
    s10_p1:
      '10.1 Der Betreiber behält sich das Recht vor, diese AGB jederzeit und ohne Vorankündigung zu ändern. Die jeweils aktuelle Fassung ist auf der Website einsehbar.',
    s10_p2:
      '10.2 Durch die fortgesetzte Nutzung der Website nach Änderung der AGB erklärt sich der Nutzer mit den geänderten Bedingungen einverstanden.',

    s11_title: '§ 11 Anwendbares Recht und Gerichtsstand',
    s11_p1:
      '11.1 Es gilt das Recht der Italienischen Republik unter Ausschluss des UN-Kaufrechts (CISG). Ergänzend finden die Bestimmungen der EU-Verordnungen, insbesondere der Datenschutz-Grundverordnung (DSGVO), Anwendung.',
    s11_p2:
      '11.2 Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit der Nutzung dieser Website ist, soweit gesetzlich zulässig, Bozen (Bolzano), Italien.',
    s11_p3:
      '11.3 Sollte der Nutzer Verbraucher im Sinne des Codice del Consumo (D.Lgs. 206/2005) sein, gelten die zwingenden Verbraucherschutzvorschriften des Staates, in dem der Nutzer seinen gewöhnlichen Aufenthalt hat, soweit diese einen weitergehenden Schutz bieten.',

    s12_title: '§ 12 EU-Streitschlichtung',
    s12_p1:
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
    s12_p2:
      'Da es sich bei dieser Website um ein privates, nicht-kommerzielles Projekt handelt, besteht keine Verpflichtung und keine Bereitschaft, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',

    s13_title: '§ 13 Salvatorische Klausel',
    s13_p1:
      'Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder nach Veröffentlichung unwirksam oder undurchführbar werden, so wird dadurch die Wirksamkeit der übrigen Bestimmungen nicht berührt. An die Stelle der unwirksamen oder undurchführbaren Bestimmung soll diejenige wirksame und durchführbare Regelung treten, deren Wirkungen der Zielsetzung am nächsten kommen, die mit der unwirksamen oder undurchführbaren Bestimmung verfolgt wurde.',

    s14_title: '§ 14 Kontakt',
    s14_intro:
      'Bei Fragen zu diesen AGB können Sie sich an den Betreiber wenden:',

    last_updated: 'Stand: März 2026',
  },

  en: {
    title: 'Terms and Conditions',
    intro:
      'Terms and Conditions for using the website of Felix Plattner.',

    s1_title: '§ 1 General Provisions',
    s1_p1:
      '1.1 These Terms and Conditions (hereinafter "T&C") govern the use of the website operated by Felix Plattner (hereinafter "the Operator"). The website is available at the domain streamdeck.plattnericus.dev.',
    s1_p2:
      '1.2 The website is a private, non-commercial portfolio and showcase project. It is intended solely for presenting personal work, experimenting with web technologies, and for learning and demonstration purposes.',
    s1_p3:
      '1.3 By using this website, you agree to these Terms and Conditions. If you do not agree with any of these provisions, please refrain from using the website.',
    s1_p4:
      '1.4 The Operator reserves the right to modify these T&C at any time without prior notice. The version in effect at the time of use shall apply.',

    s2_title: '§ 2 Description of Services',
    s2_p1:
      '2.1 The website is an interactive web platform that simulates a graphical user interface styled after a desktop operating system (inspired by Apple\'s macOS). It includes simulated applications, windows, a dock area, and other interactive elements.',
    s2_p2:
      '2.2 The scope of the features provided may be changed, expanded, or restricted at any time without giving rise to any claims by users.',
    s2_p3:
      '2.3 The Operator strives to keep the website available without interruption. However, there is no guarantee of continuous availability. Maintenance, technical issues, or force majeure may lead to temporary restrictions.',
    s2_p4:
      '2.4 All content, designs, and features displayed on the website serve solely for demonstration and showcase purposes. They do not establish any legal claims, licences, or exclusive usage rights.',

    s3_title: '§ 3 Access and User Accounts',
    s3_p1:
      '3.1 The website contains a simulated login area. This is purely for demonstration purposes and does not provide any real authentication functionality. No actual user accounts are created or managed.',
    s3_p2:
      '3.2 Any login credentials displayed or entered during the simulation are entirely fictitious and have no real function.',
    s3_p3:
      '3.3 The user is responsible for ensuring that no personal or sensitive data is entered into input fields beyond the scope of the simulated functionality.',

    s4_title: '§ 4 User Obligations',
    s4_intro:
      '4.1 The user agrees to use the website only in accordance with applicable laws and these T&C. In particular, the following actions are prohibited:',
    s4_li1:
      'Copying, reproducing, or redistributing the website or parts of it without the Operator\'s consent',
    s4_li2:
      'Using automated access methods (e.g. bots, scrapers, or crawlers) unless expressly permitted',
    s4_li3:
      'Circumventing or tampering with the website\'s security mechanisms',
    s4_li4:
      'Using website content for commercial purposes',
    s4_li5:
      'Using the website in a way that disrupts its operation or disturbs other users',
    s4_li6:
      'Introducing malware or other harmful content through the website',
    s4_p2:
      '4.2 In the event of a breach of these obligations, the Operator reserves the right to restrict or block access to the website.',

    s5_title: '§ 5 Intellectual Property and Copyright',
    s5_p1:
      '5.1 All content published on this website (texts, graphics, images, animations, code, design, layouts) is protected by copyright and subject to Italian copyright law (Legge 22 aprile 1941, n. 633) as well as the relevant EU directives.',
    s5_p2:
      '5.2 Any reproduction, editing, distribution, or exploitation beyond the limits of copyright law requires the prior written consent of the Operator. Downloads and copies of this site are only permitted for private, non-commercial use.',
    s5_p3:
      '5.3 The design of this website is inspired by the macOS user interface by Apple. All trademarks, logos, and product names of Apple are the property of Apple Inc. This website is not affiliated with Apple Inc. and is neither endorsed nor authorised by Apple.',
    s5_p4:
      '5.4 Where third-party content is used on this website, the respective copyrights and licence terms are respected. Should a copyright infringement nonetheless be identified, please inform us so that the affected content can be removed promptly.',

    s6_title: '§ 6 Limitation of Liability',
    s6_p1:
      '6.1 The content of this website is created with the greatest possible care. However, the Operator does not guarantee the accuracy, completeness, or timeliness of the content provided.',
    s6_p2:
      '6.2 Use of the website is at the user\'s own risk. The Operator is not liable for damages arising from the use or non-use of the website, unless such damages result from intentional or grossly negligent conduct on the part of the Operator.',
    s6_p3:
      '6.3 In particular, the Operator is not liable for damages caused by technical malfunctions, data loss, viruses, or other harmful components.',
    s6_p4:
      '6.4 This limitation of liability does not apply where mandatory statutory provisions (in particular under the Italian Codice Civile or product liability law) require more extensive liability.',

    s7_title: '§ 7 Availability',
    s7_p1:
      '7.1 The Operator strives to keep the website permanently accessible. However, there is no entitlement to uninterrupted availability. Maintenance, updates, technical problems, or external circumstances may lead to temporary interruptions.',
    s7_p2:
      '7.2 The Operator is not liable for outages or accessibility restrictions that are beyond their control.',

    s8_title: '§ 8 Links to External Websites',
    s8_p1:
      '8.1 This website may contain links to third-party external websites. The Operator has no influence over the content of these sites and therefore assumes no responsibility or guarantee for their accuracy, completeness, or timeliness.',
    s8_p2:
      '8.2 At the time of linking, the external sites were checked for potential legal violations. No unlawful content was apparent at that time. Continuous monitoring without concrete evidence of a legal violation is not reasonable.',
    s8_p3:
      '8.3 If any legal violations on linked sites become known, the affected links will be removed without delay.',

    s9_title: '§ 9 Data Protection',
    s9_p1:
      '9.1 The protection of your personal data is of particular concern to the Operator. For more information on the collection, processing, and use of your data, please refer to the separate Privacy Policy.',
    s9_p2:
      '9.2 The Privacy Policy forms part of these T&C and can be accessed on the website at any time.',

    s10_title: '§ 10 Changes to the T&C',
    s10_p1:
      '10.1 The Operator reserves the right to change these T&C at any time without prior notice. The current version is always available on the website.',
    s10_p2:
      '10.2 By continuing to use the website after changes have been made to the T&C, the user agrees to the updated terms.',

    s11_title: '§ 11 Applicable Law and Jurisdiction',
    s11_p1:
      '11.1 The law of the Italian Republic applies, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). In addition, the provisions of EU regulations, in particular the General Data Protection Regulation (DSGVO/GDPR), apply.',
    s11_p2:
      '11.2 The place of jurisdiction for all disputes arising from or in connection with the use of this website is, to the extent permitted by law, Bozen (Bolzano), Italy.',
    s11_p3:
      '11.3 If the user qualifies as a consumer under the Codice del Consumo (D.Lgs. 206/2005), the mandatory consumer protection provisions of the country in which the user habitually resides shall apply, insofar as they offer greater protection.',

    s12_title: '§ 12 EU Dispute Resolution',
    s12_p1:
      'The European Commission provides a platform for online dispute resolution (ODR):',
    s12_p2:
      'As this website is a private, non-commercial project, there is no obligation or willingness to participate in dispute resolution proceedings before a consumer arbitration body.',

    s13_title: '§ 13 Severability Clause',
    s13_p1:
      'Should any provision of these T&C be or become invalid or unenforceable, this shall not affect the validity of the remaining provisions. The invalid or unenforceable provision shall be replaced by a valid and enforceable provision that most closely reflects the intended purpose of the original provision.',

    s14_title: '§ 14 Contact',
    s14_intro:
      'If you have any questions about these T&C, you can contact the Operator:',

    last_updated: 'Last updated: March 2026',
  },

  it: {
    title: 'Termini e Condizioni',
    intro:
      'Termini e condizioni per usare il sito web di Felix Plattner.',

    s1_title: '§ 1 Informazioni generali',
    s1_p1:
      '1.1 Queste regole dicono come puoi usare il sito di Felix Plattner. Il sito si trova su streamdeck.plattnericus.dev.',
    s1_p2:
      '1.2 Il sito è un progetto privato e non commerciale. Serve solo per mostrare lavori personali e per provare nuove tecnologie web.',
    s1_p3:
      '1.3 Se usi questo sito, accetti queste regole. Se non sei d\'accordo, per favore non usare il sito.',
    s1_p4:
      '1.4 Il gestore può cambiare queste regole in ogni momento. Vale sempre la versione più nuova.',

    s2_title: '§ 2 Cosa offre il sito',
    s2_p1:
      '2.1 Il sito è una piattaforma web interattiva. Sembra un sistema operativo come macOS di Apple. Ci sono finestre, app simulate, un dock e altri elementi interattivi.',
    s2_p2:
      '2.2 Le funzioni del sito possono cambiare in ogni momento. Gli utenti non hanno diritto a funzioni specifiche.',
    s2_p3:
      '2.3 Il gestore cerca di tenere il sito sempre disponibile. Ma non c\'è una garanzia. Lavori tecnici o problemi possono causare pause brevi.',
    s2_p4:
      '2.4 I contenuti e i design del sito servono solo come dimostrazione. Non danno nessun diritto legale o licenza.',

    s3_title: '§ 3 Accesso e account utente',
    s3_p1:
      '3.1 Il sito ha un\'area di login simulata. Serve solo come dimostrazione. Non vengono creati account veri.',
    s3_p2:
      '3.2 Se vedi dati di accesso nella simulazione, sono dati inventati. Non hanno nessuna funzione reale.',
    s3_p3:
      '3.3 L\'utente non deve inserire dati personali o sensibili nei campi del sito.',

    s4_title: '§ 4 Obblighi dell\'utente',
    s4_intro:
      '4.1 L\'utente deve usare il sito solo secondo la legge e queste regole. Non è permesso:',
    s4_li1:
      'Copiare o distribuire il sito o parti di esso senza permesso',
    s4_li2:
      'Usare bot, scraper o crawler per accedere al sito, se non è permesso',
    s4_li3:
      'Provare a superare le misure di sicurezza del sito',
    s4_li4:
      'Usare i contenuti del sito per scopi commerciali',
    s4_li5:
      'Usare il sito in un modo che disturba altri utenti',
    s4_li6:
      'Mettere virus o software dannoso sul sito',
    s4_p2:
      '4.2 Se non rispetti queste regole, il gestore può bloccare il tuo accesso al sito.',

    s5_title: '§ 5 Proprietà intellettuale e copyright',
    s5_p1:
      '5.1 Tutti i contenuti del sito (testi, immagini, animazioni, codice, design) sono protetti dalla legge italiana sul diritto d\'autore (Legge 22 aprile 1941, n. 633) e dalle regole dell\'UE.',
    s5_p2:
      '5.2 Per copiare o usare i contenuti serve il permesso scritto del gestore. Puoi scaricare cose solo per uso privato e non commerciale.',
    s5_p3:
      '5.3 Il design del sito è ispirato a macOS di Apple. Tutti i marchi e loghi di Apple sono proprietà di Apple Inc. Questo sito non ha nessun legame con Apple Inc.',
    s5_p4:
      '5.4 Se usiamo contenuti di altre persone, rispettiamo i loro diritti. Se trovi un problema con il copyright, per favore scrivici.',

    s6_title: '§ 6 Limiti di responsabilità',
    s6_p1:
      '6.1 I contenuti del sito sono fatti con molta cura. Ma il gestore non garantisce che tutto sia corretto o aggiornato.',
    s6_p2:
      '6.2 Usi il sito a tuo rischio. Il gestore non è responsabile per danni, tranne in caso di comportamento intenzionale o molto negligente.',
    s6_p3:
      '6.3 Il gestore non è responsabile per danni causati da problemi tecnici, perdita di dati o virus.',
    s6_p4:
      '6.4 Questo limite non vale quando la legge italiana (Codice Civile o legge sulla responsabilità del prodotto) dice diversamente.',

    s7_title: '§ 7 Disponibilità',
    s7_p1:
      '7.1 Il gestore cerca di tenere il sito sempre aperto. Ma non c\'è una garanzia. Aggiornamenti, problemi tecnici o altre cause possono causare pause brevi.',
    s7_p2:
      '7.2 Il gestore non è responsabile per problemi di accesso che non può controllare.',

    s8_title: '§ 8 Link a siti esterni',
    s8_p1:
      '8.1 Il sito può avere link a siti di altre persone. Il gestore non controlla quei siti e non è responsabile per i loro contenuti.',
    s8_p2:
      '8.2 Quando abbiamo messo i link, abbiamo controllato i siti esterni. Non c\'erano problemi legali. Non possiamo controllare sempre tutti i link.',
    s8_p3:
      '8.3 Se scopriamo problemi legali su un sito collegato, togliamo subito il link.',

    s9_title: '§ 9 Protezione dei dati',
    s9_p1:
      '9.1 La protezione dei tuoi dati personali è molto importante per il gestore. Puoi leggere di più nella nostra Informativa sulla Privacy.',
    s9_p2:
      '9.2 L\'Informativa sulla Privacy fa parte di queste regole. Puoi leggerla sempre sul sito.',

    s10_title: '§ 10 Modifiche alle regole',
    s10_p1:
      '10.1 Il gestore può cambiare queste regole in ogni momento. La versione nuova è sempre sul sito.',
    s10_p2:
      '10.2 Se continui a usare il sito dopo un cambiamento, accetti le nuove regole.',

    s11_title: '§ 11 Legge applicabile e foro competente',
    s11_p1:
      '11.1 Si applica la legge italiana. Non si applica la CISG (legge sulle vendite internazionali). Si applicano anche le regole dell\'UE, in particolare il DSGVO/GDPR.',
    s11_p2:
      '11.2 Per ogni problema legale, il tribunale competente è quello di Bolzano (Bozen), Italia.',
    s11_p3:
      '11.3 Se sei un consumatore secondo il Codice del Consumo (D.Lgs. 206/2005), valgono le regole di protezione dei consumatori del tuo paese, se ti proteggono di più.',

    s12_title: '§ 12 Risoluzione delle controversie UE',
    s12_p1:
      'La Commissione Europea ha una piattaforma per risolvere problemi online (ODR):',
    s12_p2:
      'Questo sito è un progetto privato e non commerciale. Non siamo obbligati a partecipare a procedure di risoluzione delle controversie.',

    s13_title: '§ 13 Clausola di salvaguardia',
    s13_p1:
      'Se una parte di queste regole non è valida, le altre parti restano valide. La parte non valida viene sostituita con una regola simile che funziona.',

    s14_title: '§ 14 Contatto',
    s14_intro:
      'Se hai domande su queste regole, puoi contattare il gestore:',

    last_updated: 'Ultimo aggiornamento: marzo 2026',
  },
};

export default agbContent;
