// ─── Fenster-Öffnen Helfer ───
// öffnet App-Fenster und zentriert sie auf dem Bildschirm
// berücksichtigt Menüleiste oben und Dock unten damit nichts überlappt

// Fenster öffnen und in der Mitte des nutzbaren Bereichs positionieren
// wenn es schon offen ist, nur sicherstellen dass es sichtbar ist (nicht minimiert)
export function openTab(app, windowWidth, windowHeight) {
  // echte Fenstergröße nehmen oder Fallback-Werte
  windowWidth = windowWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1024);
  windowHeight = windowHeight ?? (typeof window !== 'undefined' ? window.innerHeight : 768);

  // Platz für Menüleiste und Dock lassen
  const headerHeight = 28;   // macOS-Menüleiste oben
  const dockHeight = 85;     // Dock unten
  const usableTop = headerHeight;
  const usableHeight = windowHeight - headerHeight - dockHeight; // nutzbarer Bereich

  // Mittelpunkt des nutzbaren Bereichs berechnen
  const centerX = windowWidth / 2 - app.width / 2;
  const centerY = usableTop + usableHeight / 2 - app.height / 2;

  // Fenster nur bewegen wenn es noch nicht offen war
  // damit ein wiedereröffnetes minimiertes Fenster nicht an eine neue Position springt
  if (!app.open) {
    app.x = centerX;
    app.y = Math.max(usableTop, centerY); // nicht über die Menüleiste hinaus
  }

  // mark the window as open and not minimized
  app.open = true;
  app.minimized = false;

  return app;
}

// berechnet nur die Mittelposition ohne ein Fenster zu öffnen
export function getCenterPosition(width, height, windowWidth, windowHeight) {
  windowWidth = windowWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1024);
  windowHeight = windowHeight ?? (typeof window !== 'undefined' ? window.innerHeight : 768);

  const headerHeight = 28;
  const dockHeight = 85;
  const usableTop = headerHeight;
  const usableHeight = windowHeight - headerHeight - dockHeight;

  return {
    x: windowWidth / 2 - width / 2,
    y: Math.max(usableTop, usableTop + usableHeight / 2 - height / 2),
  };
}
