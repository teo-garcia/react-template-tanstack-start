import { createWrapper } from '@teo-garcia/react-shared/test-utils'
import { render as tlRender, type RenderOptions } from '@testing-library/react'

const QueryWrapper = createWrapper()

const AllProviders = ({ children }: React.PropsWithChildren) => (
  <QueryWrapper>
    <div className='min-h-screen'>
      <main>{children}</main>
    </div>
  </QueryWrapper>
)

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => tlRender(ui, { wrapper: AllProviders, ...options })

export { renderWithProviders as render }
export { screen, waitFor, within } from '@testing-library/react'
