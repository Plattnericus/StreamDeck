// makes google happy with meta tags n stuff

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
    document.title = fullTitle

    // find meta tag or make a new one
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

    // same thing but for link tags
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    setMeta('meta[name="description"]', 'name=description', description)
    setLink('canonical', fullUrl)

    // og tags
    setMeta('meta[property="og:title"]', 'property=og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
    setMeta('meta[property="og:url"]', 'property=og:url', fullUrl)
    setMeta('meta[property="og:image"]', 'property=og:image', image)

    // twitter cards
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', image)
  }, [fullTitle, description, fullUrl, image])
}

