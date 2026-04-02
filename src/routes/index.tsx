import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Zap } from 'lucide-react'

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

export function HomePage() {
  return (
    <section className='flex h-screen flex-col items-center justify-center gap-y-16'>
      <Zap className='size-48 text-primary lg:size-56 xl:size-72' />
    </section>
  )
}
