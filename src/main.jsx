// ─── Entry Point ───
// this is where the whole app starts
// we grab the root element from index.html and render our React app into it
// StrictMode helps us catch problems during development

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // the main App component with all the routes

// find the root div in index.html and start the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
