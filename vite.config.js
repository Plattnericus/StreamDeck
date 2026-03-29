// Vite config — includes a local dev proxy for fetching external pages in the in-app browser
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      // Dev-only proxy that fetches external URLs and injects a <base> tag so relative links work
      name: 'browser-proxy',
      configureServer(server) {
        server.middlewares.use('/api/proxy', async (req, res) => {
          const parsed = new URL(req.url, 'http://localhost');
          const targetUrl = parsed.searchParams.get('url');
          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
          }
          try {
            const response = await fetch(targetUrl, {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
              },
              redirect: 'follow',
            });
            const ct = response.headers.get('content-type') || 'text/html';
            if (ct.includes('text/html')) {
              let html = await response.text();
              const hideScrollbar = `<style>::-webkit-scrollbar{display:none}html,body{scrollbar-width:none;-ms-overflow-style:none}</style>`;
              try {
                const basePath = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1) || new URL(targetUrl).origin + '/';
                const inject = `<base href="${basePath}">${hideScrollbar}`;
                if (/<head[\s>]/i.test(html)) html = html.replace(/<head([\s>])/i, `<head$1>${inject}`);
                else if (/<html[\s>]/i.test(html)) html = html.replace(/<html([^>]*)>/i, `<html$1><head>${inject}</head>`);
                else html = inject + html;
              } catch (_) {}
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(html);
            } else {
              const buf = Buffer.from(await response.arrayBuffer());
              res.setHeader('Content-Type', ct);
              res.end(buf);
            }
          } catch (e) {
            res.statusCode = 502;
            res.end(`Proxy error: ${e.message}`);
          }
        });
      },
    },
  ],
  publicDir: 'static',
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
