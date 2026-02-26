import { type Metadata } from 'next'

export const baseUrl = 'https://ghostaudit.ai'

export default async function sitemap() {
  const routes = ['', '/login', '/register', '/pricing', '/features'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  )

  return [...routes]
}
