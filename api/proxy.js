// ─── Serverless Proxy (Vercel) ───
// this is the production version of the browser proxy
// it runs as a Vercel serverless function
// basically it fetches external websites so our in-app browser can display them
// we need this because browsers block cross-origin requests (CORS)
// it also injects a <base> tag so relative links on the page still work correctly

// we hide scrollbars so pages look cleaner inside our browser window
const HIDE_SCROLLBAR = `<style>::-webkit-scrollbar{display:none}html,body{scrollbar-width:none;-ms-overflow-style:none}</style>`;

// this is the main handler that Vercel calls for each request
export default async function handler(req, res) {
  // get the target URL from the query string
  const { url } = req.query;

  // quick check — we need a URL to fetch
  if (!url) { res.statusCode = 400; return res.end('Missing url parameter'); }

  try {
    const targetUrl = decodeURIComponent(url);

    // fetch the external page, pretending to be Safari
    // some websites block requests that dont have a proper User-Agent
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
      },
      redirect: 'follow', // follow redirects automatically
    });

    const contentType = response.headers.get('content-type') || 'text/html';

    // allow requests from any origin (our frontend needs this)
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (contentType.includes('text/html')) {
      // for HTML pages, we inject a <base> tag and hide scrollbars
      let html = await response.text();
      try {
        // figure out the base path so images, CSS, and links still work
        const basePath = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1) || new URL(targetUrl).origin + '/';
        const inject = `<base href="${basePath}">${HIDE_SCROLLBAR}`;

        // try to inject into <head>, or create one if needed
        if (/<head[\s>]/i.test(html)) html = html.replace(/<head([\s>])/i, `<head$1>${inject}`);
        else if (/<html[\s>]/i.test(html)) html = html.replace(/<html([^>]*)>/i, `<html$1><head>${inject}</head>`);
        else html = inject + html;
      } catch (_) {} // if injection fails, just serve the original

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end(html);
    } else {
      // for non-HTML content (images, fonts, etc.) just pass it through
      const buffer = Buffer.from(await response.arrayBuffer());
      res.setHeader('Content-Type', contentType);
      return res.end(buffer);
    }
  } catch (error) {
    // something went wrong fetching the page
    res.statusCode = 502;
    return res.end(`Proxy error: ${error.message}`);
  }
}
