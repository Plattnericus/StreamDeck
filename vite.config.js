// ─── Vite Konfiguration ───
// Build-Tool-Konfiguration für das Projekt
// Vite übernimmt Dev-Server, Hot Reloading und Production-Build
// außerdem ein eigenes Proxy-Plugin für den In-App-Browser

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    // React-Plugin — JSX und Fast Refresh während der Entwicklung
    react(),
    {
      // eigener Dev-Only-Proxy für den In-App-Browser
      // wenn der Browser eine externe Seite laden will, läuft es durch diesen Proxy
      // um CORS-Probleme zu umgehen und einen <base>-Tag zu injizieren
      name: 'browser-proxy',
      configureServer(server) {
        // handle requests to /api/proxy?url=...
        server.middlewares.use('/api/proxy', async (req, res) => {
          const parsed = new URL(req.url, 'http://localhost');
          const targetUrl = parsed.searchParams.get('url');

          // ohne URL können wir nichts laden
          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
          }

          try {
            // externe Seite laden und dabei als Safari ausgeben
            // manche Sites blockieren Anfragen ohne richtigen User-Agent
            const response = await fetch(targetUrl, {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
              },
              redirect: 'follow', // Weiterleitungen automatisch folgen
            });

            const ct = response.headers.get('content-type') || 'text/html';

            if (ct.includes('text/html')) {
              // bei HTML-Seiten etwas injizieren
              let html = await response.text();

              // Scrollbars verstecken damit es im Browser-Fenster sauberer aussieht
              const hideScrollbar = `<style>::-webkit-scrollbar{display:none}html,body{scrollbar-width:none;-ms-overflow-style:none}</style>`;

              try {
                // Basispfad bestimmen damit relative Links (Bilder, CSS, etc.) funktionieren
                const basePath = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1) || new URL(targetUrl).origin + '/';
                const inject = `<base href="${basePath}">${hideScrollbar}`;

                // an der richtigen Stelle ins HTML injizieren
                if (/<head[\s>]/i.test(html)) html = html.replace(/<head([\s>])/i, `<head$1>${inject}`);
                else if (/<html[\s>]/i.test(html)) html = html.replace(/<html([^>]*)>/i, `<html$1><head>${inject}</head>`);
                else html = inject + html;
              } catch (_) {} // wenn Injection fehlschlägt, Original ausliefern

              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(html);
            } else {
              // bei Nicht-HTML (Bilder, CSS, etc.) einfach durchleiten
              const buf = Buffer.from(await response.arrayBuffer());
              res.setHeader('Content-Type', ct);
              res.end(buf);
            }
          } catch (e) {
            // Fehler beim Laden
            res.statusCode = 502;
            res.end(`Proxy error: ${e.message}`);
          }
        });
      },
    },
  ],

  // 'static'-Ordner als public assets ausliefern (Bilder, Fonts, etc.)
  publicDir: 'static',

  resolve: {
    alias: {
      // Kurzform damit wir '@lib/...' statt '../../lib/...' schreiben können
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },

  server: {
    host: '0.0.0.0', // auf allen Interfaces hören damit man vom Netzwerk drauf kann
    port: 5173,       // Dev-Server-Port
  },
});
