import { useQuery } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import {
  createHealthyHealthResponse,
  parseHealthResponse,
} from '~/lib/health'

const getHealth = createServerFn({ method: 'GET' }).handler(() => {
  return createHealthyHealthResponse()
})

export const useHealthcheck = () => {
  return useQuery({
    queryFn: async () => parseHealthResponse(await getHealth()),
    queryKey: ['health'],
  })
}
