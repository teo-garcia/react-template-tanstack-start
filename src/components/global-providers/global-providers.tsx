import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

import { createQueryClient } from '~/lib/query-client'

export const GlobalProviders = (properties: React.PropsWithChildren) => {
  const { children } = properties
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools buttonPosition='bottom-left' />
    </QueryClientProvider>
  )
}
