// ─── Einstiegspunkt ───
// hier startet die ganze App
// wir holen das Root-Element aus index.html und rendern unsere React-App rein
// StrictMode hilft uns Probleme während der Entwicklung zu finden

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // die Haupt-App-Komponente mit allen Routen

// Root-Div aus index.html nehmen und App starten
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
