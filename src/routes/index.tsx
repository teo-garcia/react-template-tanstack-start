import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { HomePage } from '~/components/home-page/home-page'
import { getSeoMeta, siteMetadata } from '~/lib/seo'

const getHealthcheck = createServerFn({ method: 'GET' }).handler(() => {
  return { message: 'OK', status: 200 }
})

export const Route = createFileRoute('/')({
  head: () => ({
    meta: getSeoMeta({
      title: `Home | ${siteMetadata.shortName}`,
    }),
  }),
  loader: () => getHealthcheck(),
  component: HomePage,
})
