// ─── Impressum-Inhalte ───
// Alle Texte für die Impressum-Seite in drei Sprachen:
// DE (Original), EN (B2), IT (A2)

const impressumContent = {
  de: {
    title: 'Impressum',
    intro:
      'Diese Website wird betrieben von Felix Plattner als privates, nicht-kommerzielles Portfolio- und Showcase-Projekt.',
    business_title: 'Geschäftsangaben',
    business_legal_ref:
      'Angaben gemäß Art. 2 D.Lgs. 70/2003 (Decreto legislativo 9 aprile 2003, n. 70 – Umsetzung der E-Commerce-Richtlinie 2000/31/EG) sowie § 5 TMG (Telemediengesetz):',
    business_private:
      'Diese Website ist ein privates, nicht-kommerzielles Projekt. Es handelt sich weder um ein Gewerbe noch um eine freiberufliche Tätigkeit. Eine Umsatzsteuer-Identifikationsnummer ist daher nicht vorhanden.',
    contact_title: 'Kontakt',
    contact_phone_note:
      'Bitte beachten Sie, dass eine telefonische Erreichbarkeit nur zu üblichen Bürozeiten gewährleistet werden kann.',
    online_title: 'Online-Präsenzen',
    responsible_title: 'Verantwortlich für den Inhalt',
    responsible_legal_ref:
      'Verantwortlich gemäß Art. 18 Abs. 2 MStV (Medienstaatsvertrag) sowie § 5 TMG:',
    eu_dispute_title: 'EU-Streitschlichtung',
    eu_dispute_p1:
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
    eu_dispute_p2:
      'Da es sich bei dieser Website um ein privates, nicht-kommerzielles Projekt handelt, besteht keine Verpflichtung und keine Bereitschaft, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    liability_content_title: 'Haftung für Inhalte',
    liability_content_p1:
      'Als Diensteanbieter sind wir gemäß Art. 7 Abs. 1 D.Lgs. 70/2003 bzw. § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.',
    liability_content_p2:
      'Nach Art. 14–16 D.Lgs. 70/2003 bzw. §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    liability_links_title: 'Haftung für Links',
    liability_links_p1:
      'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    copyright_title: 'Urheberrecht',
    copyright_p1:
      'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem italienischen Urheberrecht (Legge 22 aprile 1941, n. 633 – Protezione del diritto d\'autore e di altri diritti connessi al suo esercizio). Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht-kommerziellen Gebrauch gestattet.',
    credits_title: 'Bildnachweise und Lizenzen',
    credits_icons:
      'Die auf dieser Website verwendeten Icons stammen aus frei verfügbaren Quellen und werden im Rahmen der jeweiligen Lizenzbestimmungen eingesetzt.',
    credits_font:
      'Die verwendete Schriftart „Inter" von Rasmus Andersson steht unter der SIL Open Font License 1.1 und wird lokal auf diesem Server gehostet – es erfolgt keine Einbindung über externe Dienste wie Google Fonts.',
    tech_title: 'Technologie und Design',
    tech_p1:
      'Diese Website wurde mit React entwickelt und orientiert sich visuell an der Benutzeroberfläche von macOS von Apple. Es handelt sich um ein rein privates Showcase- und Lernprojekt ohne kommerzielle Absicht.',
    tech_p2:
      'Für die Darstellung des 3D-Modells wird Three.js verwendet. Das Modell wird lokal geladen – es erfolgt keine Verbindung zu externen Servern oder CDNs.',
    tech_p3:
      'Die Website ist unter der Domain',
    tech_p3_suffix:
      'erreichbar und wird über Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet.',
    law_title: 'Anwendbares Recht',
    law_p1:
      'Dieses Impressum wurde unter Berücksichtigung der folgenden Rechtsgrundlagen erstellt: Decreto legislativo 9 aprile 2003, n. 70 (D.Lgs. 70/2003) – Umsetzung der E-Commerce-Richtlinie, Datenschutz-Grundverordnung (DSGVO), Telemediengesetz (TMG) sowie Medienstaatsvertrag (MStV).',
    last_updated: 'Stand: März 2026',
  },

  en: {
    title: 'Legal Notice',
    intro:
      'This website is operated by Felix Plattner as a private, non-commercial portfolio and showcase project.',
    business_title: 'Business Information',
    business_legal_ref:
      'Information pursuant to Art. 2 D.Lgs. 70/2003 (Italian Legislative Decree of 9 April 2003, No. 70 – implementation of the E-Commerce Directive 2000/31/EC) and § 5 TMG (German Telemedia Act):',
    business_private:
      'This website is a private, non-commercial project. It is neither a business nor a freelance activity. Therefore, no VAT identification number is available.',
    contact_title: 'Contact',
    contact_phone_note:
      'Please note that phone availability can only be guaranteed during regular business hours.',
    online_title: 'Online Presence',
    responsible_title: 'Responsible for Content',
    responsible_legal_ref:
      'Responsible according to Art. 18(2) MStV (German Interstate Media Treaty) and § 5 TMG:',
    eu_dispute_title: 'EU Dispute Resolution',
    eu_dispute_p1:
      'The European Commission provides an online dispute resolution (ODR) platform:',
    eu_dispute_p2:
      'Since this website is a private, non-commercial project, there is no obligation or willingness to participate in dispute resolution proceedings before a consumer arbitration body.',
    liability_content_title: 'Liability for Content',
    liability_content_p1:
      'As a service provider, we are responsible for our own content on these pages in accordance with Art. 7(1) D.Lgs. 70/2003 and § 7(1) TMG under general law.',
    liability_content_p2:
      'Under Art. 14–16 D.Lgs. 70/2003 and §§ 8–10 TMG, however, we are not obliged as a service provider to monitor transmitted or stored third-party information, or to investigate circumstances that indicate unlawful activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this regard is only possible from the point in time at which we become aware of a specific legal violation. Upon becoming aware of such violations, we will remove the relevant content immediately.',
    liability_links_title: 'Liability for Links',
    liability_links_p1:
      'Our website contains links to external third-party websites over whose content we have no influence. We therefore cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. Unlawful content was not apparent at the time of linking. However, ongoing monitoring of the linked pages is not reasonable without specific indications of a legal violation. Upon becoming aware of any such violations, we will remove the relevant links immediately.',
    copyright_title: 'Copyright',
    copyright_p1:
      'The content and works created by the site operator on these pages are subject to Italian copyright law (Legge 22 aprile 1941, n. 633 – Protezione del diritto d\'autore e di altri diritti connessi al suo esercizio). Any duplication, editing, distribution, or exploitation beyond the limits of copyright law requires the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.',
    credits_title: 'Image Credits and Licences',
    credits_icons:
      'The icons used on this website come from freely available sources and are used in accordance with their respective licence terms.',
    credits_font:
      'The font "Inter" by Rasmus Andersson is licenced under the SIL Open Font License 1.1 and is hosted locally on this server — no external services such as Google Fonts are used.',
    tech_title: 'Technology and Design',
    tech_p1:
      'This website was built with React and is visually inspired by the macOS user interface from Apple. It is a purely private showcase and learning project with no commercial intent.',
    tech_p2:
      'Three.js is used to render the 3D model. The model is loaded locally — there is no connection to external servers or CDNs.',
    tech_p3:
      'The website is available at',
    tech_p3_suffix:
      'and is hosted by Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA).',
    law_title: 'Applicable Law',
    law_p1:
      'This legal notice was prepared taking into account the following legal bases: Decreto legislativo 9 aprile 2003, n. 70 (D.Lgs. 70/2003) – implementation of the E-Commerce Directive, General Data Protection Regulation (GDPR), German Telemedia Act (TMG), and German Interstate Media Treaty (MStV).',
    last_updated: 'Last updated: March 2026',
  },

  it: {
    title: 'Note legali',
    intro:
      'Questo sito web è gestito da Felix Plattner. È un progetto privato, non commerciale, per mostrare il mio portfolio.',
    business_title: 'Dati aziendali',
    business_legal_ref:
      'Informazioni ai sensi dell\'Art. 2 D.Lgs. 70/2003 (Decreto legislativo 9 aprile 2003, n. 70 – attuazione della Direttiva e-commerce 2000/31/CE) e § 5 TMG (legge tedesca sui media elettronici):',
    business_private:
      'Questo sito è un progetto privato e non commerciale. Non è un\'attività commerciale. Non ho una partita IVA.',
    contact_title: 'Contatto',
    contact_phone_note:
      'Posso rispondere al telefono solo durante gli orari di ufficio.',
    online_title: 'Presenza online',
    responsible_title: 'Responsabile del contenuto',
    responsible_legal_ref:
      'Responsabile ai sensi dell\'Art. 18, comma 2, MStV (trattato tedesco sui media) e § 5 TMG:',
    eu_dispute_title: 'Risoluzione delle controversie UE',
    eu_dispute_p1:
      'La Commissione Europea ha una piattaforma per risolvere le controversie online (OS):',
    eu_dispute_p2:
      'Questo sito è un progetto privato e non commerciale. Non sono obbligato a partecipare a procedure di risoluzione delle controversie.',
    liability_content_title: 'Responsabilità per i contenuti',
    liability_content_p1:
      'Come gestore del sito, sono responsabile dei miei contenuti secondo l\'Art. 7, comma 1, D.Lgs. 70/2003 e § 7, comma 1, TMG.',
    liability_content_p2:
      'Secondo l\'Art. 14–16 D.Lgs. 70/2003 e §§ 8–10 TMG, non devo controllare le informazioni di altri. Se trovo contenuti illegali, li rimuovo subito.',
    liability_links_title: 'Responsabilità per i link',
    liability_links_p1:
      'Questo sito ha link a siti esterni. Non posso controllare i loro contenuti. Il responsabile è sempre chi gestisce il sito collegato. Ho controllato i link quando li ho aggiunti. Non c\'erano problemi legali. Se trovo problemi, rimuovo i link subito.',
    copyright_title: 'Diritto d\'autore',
    copyright_p1:
      'I contenuti di questo sito sono protetti dalla legge italiana sul diritto d\'autore (Legge 22 aprile 1941, n. 633 – Protezione del diritto d\'autore e di altri diritti connessi al suo esercizio). Per copiare o usare i contenuti serve il permesso scritto dell\'autore. Puoi scaricare copie solo per uso privato.',
    credits_title: 'Crediti e licenze',
    credits_icons:
      'Le icone di questo sito vengono da fonti gratuite. Sono usate secondo le loro licenze.',
    credits_font:
      'Il font "Inter" di Rasmus Andersson ha la licenza SIL Open Font License 1.1. È sul nostro server. Non usiamo Google Fonts o altri servizi esterni.',
    tech_title: 'Tecnologia e design',
    tech_p1:
      'Questo sito è fatto con React. Il design è simile a macOS di Apple. È solo un progetto privato per imparare. Non è commerciale.',
    tech_p2:
      'Per il modello 3D uso Three.js. Il modello è sul nostro server. Non ci sono connessioni a server esterni.',
    tech_p3:
      'Il sito è disponibile al dominio',
    tech_p3_suffix:
      'ed è ospitato da Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA).',
    law_title: 'Legge applicabile',
    law_p1:
      'Queste note legali seguono queste leggi: Decreto legislativo 9 aprile 2003, n. 70 (D.Lgs. 70/2003) – Direttiva e-commerce, Regolamento generale sulla protezione dei dati (GDPR), Telemediengesetz (TMG) e Medienstaatsvertrag (MStV).',
    last_updated: 'Aggiornato: marzo 2026',
  },
};

export default impressumContent;
