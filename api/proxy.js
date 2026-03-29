// Serverless proxy (Vercel) — fetches external URLs for the in-app browser, injects <base> tag for relative links
const HIDE_SCROLLBAR = `<style>::-webkit-scrollbar{display:none}html,body{scrollbar-width:none;-ms-overflow-style:none}</style>`;

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) { res.statusCode = 400; return res.end('Missing url parameter'); }

  try {
    const targetUrl = decodeURIComponent(url);
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
      },
      redirect: 'follow',
    });

    const contentType = response.headers.get('content-type') || 'text/html';
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (contentType.includes('text/html')) {
      let html = await response.text();
      try {
        const basePath = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1) || new URL(targetUrl).origin + '/';
        const inject = `<base href="${basePath}">${HIDE_SCROLLBAR}`;
        if (/<head[\s>]/i.test(html)) html = html.replace(/<head([\s>])/i, `<head$1>${inject}`);
        else if (/<html[\s>]/i.test(html)) html = html.replace(/<html([^>]*)>/i, `<html$1><head>${inject}</head>`);
        else html = inject + html;
      } catch (_) {}
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end(html);
    } else {
      const buffer = Buffer.from(await response.arrayBuffer());
      res.setHeader('Content-Type', contentType);
      return res.end(buffer);
    }
  } catch (error) {
    res.statusCode = 502;
    return res.end(`Proxy error: ${error.message}`);
  }
}
