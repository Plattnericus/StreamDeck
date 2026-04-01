// ─── Open Tab Helper ───
// this file handles opening app windows and centering them on the screen
// we need to account for the header bar at the top and the dock at the bottom
// so windows dont overlap with those areas

// opens an app window and positions it in the center of the usable screen area
// if the window is already open, we just make sure its visible (not minimized)
export function openTab(app, windowWidth, windowHeight) {
  // use actual window size or fallback values if not available
  windowWidth = windowWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1024);
  windowHeight = windowHeight ?? (typeof window !== 'undefined' ? window.innerHeight : 768);

  // we need to leave space for the header and dock so windows dont hide behind them
  const headerHeight = 28;   // the macOS-style menu bar at the top
  const dockHeight = 85;     // the dock at the bottom
  const usableTop = headerHeight;
  const usableHeight = windowHeight - headerHeight - dockHeight; // the area where windows can go

  // calculate the center position within the usable area
  const centerX = windowWidth / 2 - app.width / 2;
  const centerY = usableTop + usableHeight / 2 - app.height / 2;

  // only move the window if it wasnt already open
  // we do this so reopening a minimized window doesnt jump it to a new position
  if (!app.open) {
    app.x = centerX;
    app.y = Math.max(usableTop, centerY); // make sure it doesnt go above the header
  }

  // mark the window as open and not minimized
  app.open = true;
  app.minimized = false;

  return app;
}

// just calculates the center position for a given width and height
// useful when you need the position but dont want to actually open a window
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
