/**
 * Öffnet eine Applikation/einen Tab
 * @param app - Das App-Objekt mit Position und Zustandsinformationen
 * @param windowWidth - Die Breite des Fensters (default: window.innerWidth)
 * @param windowHeight - Die Höhe des Fensters (default: window.innerHeight)
 */
export function openTab(
  app: {
    open?: boolean;
    minimized?: boolean;
    x?: number;
    y?: number;
    width: number;
    height: number;
    zIndex?: number;
  },
  windowWidth: number = typeof window !== 'undefined' ? window.innerWidth : 1024,
  windowHeight: number = typeof window !== 'undefined' ? window.innerHeight : 768
) {
  // Berechne die zentrale Position
  const centerX = (windowWidth / 2) - (app.width / 2);
  const centerY = (windowHeight / 2) - (app.height / 2);

  // Wenn die App nicht bereits offen ist, setze sie auf die Mitte des Bildschirms
  if (!app.open) {
    app.x = centerX;
    app.y = centerY;
  }

  // Öffne die App und stelle sicher, dass sie nicht minimiert ist
  app.open = true;
  app.minimized = false;

  return app;
}

/**
 * Berechnet die zentrierte Position für ein Fenster
 * @param width - Breite des Fensters
 * @param height - Höhe des Fensters
 * @param windowWidth - Breite des Screens (default: window.innerWidth)
 * @param windowHeight - Höhe des Screens (default: window.innerHeight)
 * @returns Position mit x und y Koordinaten
 */
export function getCenterPosition(
  width: number,
  height: number,
  windowWidth: number = typeof window !== 'undefined' ? window.innerWidth : 1024,
  windowHeight: number = typeof window !== 'undefined' ? window.innerHeight : 768
) {
  return {
    x: (windowWidth / 2) - (width / 2),
    y: (windowHeight / 2) - (height / 2)
  };
}
