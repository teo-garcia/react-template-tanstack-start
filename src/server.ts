import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

import { securityHeaders } from './lib/security-headers'

export default createServerEntry({
  async fetch(request) {
    const response = await handler.fetch(request)
    const headers = new Headers(response.headers)

    for (const [key, value] of securityHeaders) {
      headers.set(key, value)
    }

    return new Response(response.body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    })
  },
})
