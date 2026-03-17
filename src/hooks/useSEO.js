// ═══════════════════════════════════════════════════════════
// useSEO.js — wiederverwendbarer Hook für alle Seiten
// Verwendung: useSEO({ title, description, path })
// Datei: src/hooks/useSEO.js
// ═══════════════════════════════════════════════════════════

import { useEffect } from 'react'

const BASE_URL = 'https://streamdeck.plattnericus.dev'
const SITE_NAME = 'Stream Deck DIY Docs'
const DEFAULT_IMAGE = `${BASE_URL}/preview.jpg`

export function useSEO({ title, description, path = '/', image = DEFAULT_IMAGE }) {
  const fullTitle = title
    ? `${title} | Stream Deck DIY macOS Tahoe`
    : 'Stream Deck DIY — macOS Tahoe Liquid Glass React Interface'

  const fullUrl = `${BASE_URL}${path}`

  useEffect(() => {
    // Titel setzen
    document.title = fullTitle

    // Helper: Meta-Tag setzen oder erstellen
    const setMeta = (selector, attr, content) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrValue] = attr.split('=')
        el.setAttribute(attrName, attrValue)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Helper: Link-Tag setzen
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // Standard Meta
    setMeta('meta[name="description"]', 'name=description', description)
    setLink('canonical', fullUrl)

    // Open Graph
    setMeta('meta[property="og:title"]', 'property=og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
    setMeta('meta[property="og:url"]', 'property=og:url', fullUrl)
    setMeta('meta[property="og:image"]', 'property=og:image', image)

    // Twitter
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', image)
  }, [fullTitle, description, fullUrl, image])
}

// ═══════════════════════════════════════════════════════════
// VERWENDUNG IN DEINEN KOMPONENTEN / SEITEN:
//
// import { useSEO } from '../hooks/useSEO'
//
// export default function MeineSeite() {
//   useSEO({
//     title: 'Setup Guide',
//     description: 'Schritt-für-Schritt Setup für Stream Deck DIY mit React und macOS Tahoe Liquid Glass.',
//     path: '/setup',
//   })
//   return <div>...</div>
// }
// ═══════════════════════════════════════════════════════════