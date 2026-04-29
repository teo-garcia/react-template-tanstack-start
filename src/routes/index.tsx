import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { HomePage } from '~/components/home-page/home-page'

const getHealthcheck = createServerFn({ method: 'GET' }).handler(() => {
  return { message: 'OK', status: 200 }
})

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: 'Home | RTTS' }],
  }),
  loader: () => getHealthcheck(),
  component: HomePage,
})
