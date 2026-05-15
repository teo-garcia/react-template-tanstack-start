import { env } from './env'

const publicUrl = env.publicUrl.replace(/\/$/, '')

export const siteMetadata = {
  description:
    'Production-ready TanStack Start template with server rendering, theme support, health checks, tests, and Docker defaults.',
  name: 'React Template TanStack Start',
  shortName: 'RTTS',
  url: publicUrl,
} as const

export const getCanonicalUrl = (path = '/') => {
  return new URL(path, siteMetadata.url).toString()
}

export const getSeoMeta = ({
  description = siteMetadata.description,
  path = '/',
  title = siteMetadata.name,
}: {
  description?: string
  path?: string
  title?: string
} = {}) => {
  const url = getCanonicalUrl(path)

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: siteMetadata.name },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]
}
