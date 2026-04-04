const HIDE_SCROLLBAR = `<style>::-webkit-scrollbar{display:none}html,body{scrollbar-width:none;-ms-overflow-style:none}</style>`;

// der Haupt-Handler den Vercel für jede Anfrage aufruft
export default async function handler(req, res) {
  // Ziel-URL aus dem Query-String holen
  const { url } = req.query;

  // schnelle Prüfung — ohne URL können wir nichts laden
  if (!url) { res.statusCode = 400; return res.end('Missing url parameter'); }

  try {
    const targetUrl = decodeURIComponent(url);

    // externe Seite laden und dabei als Safari ausgeben
    // manche Seiten blockieren Anfragen ohne richtigen User-Agent
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
      },
      redirect: 'follow', // Weiterleitungen automatisch folgen
    });

    const contentType = response.headers.get('content-type') || 'text/html';

    // Anfragen von jedem Origin erlauben (unser Frontend braucht das)
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (contentType.includes('text/html')) {
      // bei HTML-Seiten <base>-Tag und Scrollbar-Verstecker injizieren
      let html = await response.text();
      try {
        // Basispfad bestimmen damit Bilder, CSS und Links weiter funktionieren
        const basePath = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1) || new URL(targetUrl).origin + '/';
        const inject = `<base href="${basePath}">${HIDE_SCROLLBAR}`;

        // in <head> injizieren, oder einen erstellen falls keiner da ist
        if (/<head[\s>]/i.test(html)) html = html.replace(/<head([\s>])/i, `<head$1>${inject}`);
        else if (/<html[\s>]/i.test(html)) html = html.replace(/<html([^>]*)>/i, `<html$1><head>${inject}</head>`);
        else html = inject + html;
      } catch (_) {} // wenn Injection fehlschlägt, Original ausliefern

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end(html);
    } else {
      // bei Nicht-HTML (Bilder, Fonts, etc.) einfach durchleiten
      const buffer = Buffer.from(await response.arrayBuffer());
      res.setHeader('Content-Type', contentType);
      return res.end(buffer);
    }
  } catch (error) {
    // Fehler beim Laden der Seite
    res.statusCode = 502;
    return res.end(`Proxy error: ${error.message}`);
  }
}
