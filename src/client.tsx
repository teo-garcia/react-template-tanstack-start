import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { initializeMSW } = await import('~/lib/mocks/browser')
    await initializeMSW()
  }
}

await enableMocking()

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>
)
