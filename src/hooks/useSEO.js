// ─── SEO Hook ───
// verwaltet alle Meta-Tags für Suchmaschinen und Social Media
// macht die Seite schön wenn man einen Link auf Twitter, Discord, etc. teilt
// setzt auch den Seitentitel und die kanonische URL

import { useEffect } from 'react'

// Standardwerte für die SEO-Tags
const BASE_URL = 'https://streamdeck.plattnericus.dev'
const SITE_NAME = 'Stream Deck DIY Docs'
const DEFAULT_IMAGE = `${BASE_URL}/preview.jpg` // Vorschaubild für Social Media

// in einer Seitenkomponente aufrufen um SEO-Tags zu setzen
export function useSEO({ title, description, path = '/', image = DEFAULT_IMAGE }) {
  // vollständigen Titel bauen
  const fullTitle = title
    ? `${title} | Stream Deck DIY macOS Tahoe`
    : 'Stream Deck DIY — macOS Tahoe Liquid Glass React Interface'

  // build the full URL for this page
  const fullUrl = `${BASE_URL}${path}`

  useEffect(() => {
    // Browser-Tab-Titel setzen
    document.title = fullTitle

    // Meta-Tag suchen oder erstellen und Inhalt setzen
    // so entstehen keine doppelten Tags
    const setMeta = (selector, attr, content) => {
      let el = document.querySelector(selector)
      if (!el) {
        // Tag existiert noch nicht, also erstellen
        el = document.createElement('meta')
        const [attrName, attrValue] = attr.split('=')
        el.setAttribute(attrName, attrValue)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // gleiche Sache aber für Link-Tags (wie canonical URL)
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // grundlegende Meta-Description und Canonical-Link setzen
    setMeta('meta[name="description"]', 'name=description', description)
    setLink('canonical', fullUrl)

    // Open Graph Tags — werden von Facebook, Discord, etc. genutzt
    setMeta('meta[property="og:title"]', 'property=og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
    setMeta('meta[property="og:url"]', 'property=og:url', fullUrl)
    setMeta('meta[property="og:image"]', 'property=og:image', image)

    // Twitter Card Tags
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', image)
  }, [fullTitle, description, fullUrl, image]) // neu ausführen wenn sich etwas ändert
}
