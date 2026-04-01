import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DevPanel } from '@teo-garcia/react-shared/components/dev-panel'
import { useState } from 'react'

import { createQueryClient } from '~/lib/query-client'

export const GlobalProviders = (properties: React.PropsWithChildren) => {
  const { children } = properties
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <DevPanel />
      <ReactQueryDevtools buttonPosition='bottom-left' />
    </QueryClientProvider>
  )
}
