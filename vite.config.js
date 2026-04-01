// ─── Vite Config ───
// this is the build tool config for the project
// Vite handles dev server, hot reloading, and building for production
// we also have a custom proxy plugin here for the in-app browser

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    // React plugin — handles JSX and fast refresh during development
    react(),
    {
      // this is a custom dev-only proxy for the in-app browser
      // when the browser component wants to load an external website,
      // it goes through this proxy to avoid CORS issues
      // it also injects a <base> tag so relative links on the page still work
      name: 'browser-proxy',
      configureServer(server) {
        // handle requests to /api/proxy?url=...
        server.middlewares.use('/api/proxy', async (req, res) => {
          const parsed = new URL(req.url, 'http://localhost');
          const targetUrl = parsed.searchParams.get('url');

          // quick check — we need a URL to fetch
          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
          }

          try {
            // fetch the external page, pretending to be Safari
            // we do this because some sites block requests without a proper User-Agent
            const response = await fetch(targetUrl, {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
              },
              redirect: 'follow', // follow redirects automatically
            });

            const ct = response.headers.get('content-type') || 'text/html';

            if (ct.includes('text/html')) {
              // for HTML pages we inject some extra stuff
              let html = await response.text();

              // hide scrollbars so it looks cleaner inside our browser window
              const hideScrollbar = `<style>::-webkit-scrollbar{display:none}html,body{scrollbar-width:none;-ms-overflow-style:none}</style>`;

              try {
                // figure out the base path so relative links (images, css, etc.) still work
                const basePath = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1) || new URL(targetUrl).origin + '/';
                const inject = `<base href="${basePath}">${hideScrollbar}`;

                // inject it into the right place in the HTML
                if (/<head[\s>]/i.test(html)) html = html.replace(/<head([\s>])/i, `<head$1>${inject}`);
                else if (/<html[\s>]/i.test(html)) html = html.replace(/<html([^>]*)>/i, `<html$1><head>${inject}</head>`);
                else html = inject + html;
              } catch (_) {} // if injection fails, just serve the original HTML

              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(html);
            } else {
              // for non-HTML content (images, CSS, etc.) just pass it through
              const buf = Buffer.from(await response.arrayBuffer());
              res.setHeader('Content-Type', ct);
              res.end(buf);
            }
          } catch (e) {
            // something went wrong with the fetch
            res.statusCode = 502;
            res.end(`Proxy error: ${e.message}`);
          }
        });
      },
    },
  ],

  // the 'static' folder is served as public assets (images, fonts, etc.)
  publicDir: 'static',

  resolve: {
    alias: {
      // shortcut so we can import from '@lib/...' instead of '../../lib/...'
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },

  server: {
    host: '0.0.0.0', // listen on all interfaces so you can access it from other devices
    port: 5173,       // the dev server port
  },
});
