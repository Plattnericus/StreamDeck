export function openTab(app, windowWidth, windowHeight) {
  windowWidth = windowWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1024);
  windowHeight = windowHeight ?? (typeof window !== 'undefined' ? window.innerHeight : 768);

  const headerHeight = 28;
  const dockHeight = 85;
  const usableTop = headerHeight;
  const usableHeight = windowHeight - headerHeight - dockHeight;

  const centerX = windowWidth / 2 - app.width / 2;
  const centerY = usableTop + usableHeight / 2 - app.height / 2;

  if (!app.open) {
    app.x = centerX;
    app.y = Math.max(usableTop, centerY);
  }

  app.open = true;
  app.minimized = false;

  return app;
}

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
