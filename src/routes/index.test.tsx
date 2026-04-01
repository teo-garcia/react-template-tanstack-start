import axe from 'axe-core'
import { Zap } from 'lucide-react'

import { render } from '~/lib/test/render'

function HomePage() {
  return (
    <section className='flex h-screen flex-col items-center justify-center gap-y-16'>
      <Zap className='size-48 text-primary lg:size-56 xl:size-72' />
    </section>
  )
}

test('HomePage renders with providers', () => {
  const { container } = render(<HomePage />)

  expect(container.querySelector('section')).not.toBeNull()
  expect(container.querySelector('svg')).not.toBeNull()
})

test('HomePage has no accessibility violations', async () => {
  const { container } = render(<HomePage />)
  const results = await axe.run(container)

  expect(results.violations).toEqual([])
})
