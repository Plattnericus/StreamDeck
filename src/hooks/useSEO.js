// ─── SEO Hook ───
// this hook handles all the meta tags for search engines and social media
// basically it makes the page look nice when you share a link on Twitter, Discord, etc.
// it also sets the page title and canonical URL

import { useEffect } from 'react'

// these are the default values for the SEO tags
const BASE_URL = 'https://streamdeck.plattnericus.dev'
const SITE_NAME = 'Stream Deck DIY Docs'
const DEFAULT_IMAGE = `${BASE_URL}/preview.jpg` // the preview image for social media

// call this hook in any page component to set up SEO tags
// just pass title, description, and optionally path and image
export function useSEO({ title, description, path = '/', image = DEFAULT_IMAGE }) {
  // build the full title — if a title is given, add the site name after it
  const fullTitle = title
    ? `${title} | Stream Deck DIY macOS Tahoe`
    : 'Stream Deck DIY — macOS Tahoe Liquid Glass React Interface'

  // build the full URL for this page
  const fullUrl = `${BASE_URL}${path}`

  useEffect(() => {
    // set the browser tab title
    document.title = fullTitle

    // helper function to find or create a meta tag and set its content
    // this way we dont create duplicate tags
    const setMeta = (selector, attr, content) => {
      let el = document.querySelector(selector)
      if (!el) {
        // tag doesnt exist yet, so we create it
        el = document.createElement('meta')
        const [attrName, attrValue] = attr.split('=')
        el.setAttribute(attrName, attrValue)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content) // set the actual content
    }

    // same thing but for link tags (like canonical URL)
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // set the basic meta description and canonical link
    setMeta('meta[name="description"]', 'name=description', description)
    setLink('canonical', fullUrl)

    // Open Graph tags — these are used by Facebook, Discord, etc.
    setMeta('meta[property="og:title"]', 'property=og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
    setMeta('meta[property="og:url"]', 'property=og:url', fullUrl)
    setMeta('meta[property="og:image"]', 'property=og:image', image)

    // Twitter card tags — same idea but for Twitter specifically
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', image)
  }, [fullTitle, description, fullUrl, image]) // re-run when any of these change
}
