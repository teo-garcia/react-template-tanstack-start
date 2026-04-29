import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render as tlRender, type RenderOptions } from '@testing-library/react'
import { createElement, type ReactNode } from 'react'

function createWrapper(queryClient?: QueryClient) {
  const client =
    queryClient ??
    new QueryClient({
      defaultOptions: {
        queries: { gcTime: 0, retry: false },
        mutations: { retry: false },
      },
    })

  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client }, children)
  }
}

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
