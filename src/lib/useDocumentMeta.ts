import { useEffect } from 'react'
import { SITE } from '../data/site'
import { LOCALE_META, useI18n } from '../i18n'

interface Meta {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'profile' | 'article'
  noindex?: boolean
}

/** Creates or updates <meta name|property="key" content="value">. */
function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * Sets per-route title, description, Open Graph and canonical metadata.
 * Canonical and absolute URLs are emitted only when VITE_SITE_URL is configured at build time.
 */
export function useDocumentMeta({ title, description, path, image, type = 'website', noindex }: Meta) {
  const { locale, t } = useI18n()
  const ogLocale = LOCALE_META[locale].ogLocale
  const siteName = t.profile.name

  useEffect(() => {
    document.title = title
    setMeta('property', 'og:locale', ogLocale)
    setMeta('property', 'og:site_name', siteName)
    setMeta('name', 'author', siteName)
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    if (SITE.siteUrl) {
      const url = `${SITE.siteUrl}${path}`
      setMeta('property', 'og:url', url)
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = url
    }
    if (image) {
      const absolute = SITE.siteUrl ? `${SITE.siteUrl}${image}` : image
      setMeta('property', 'og:image', absolute)
    }

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex, nofollow'
    } else if (robots) {
      robots.remove()
    }
  }, [title, description, path, image, type, noindex, ogLocale, siteName])
}
