import { createRouter } from '@tanstack/react-router'

import {
  RouteLoadingState,
  RouteNotFoundState,
  RouteState,
  RouteStateButton,
} from './components/route-state/route-state'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPendingComponent: RouteLoadingState,
    defaultNotFoundComponent: RouteNotFoundState,
    defaultErrorComponent: ({ error, reset }) => (
      <RouteState
        actions={<RouteStateButton onClick={reset}>Try again</RouteStateButton>}
        description={error.message || 'The current route failed to render.'}
        title='Something went wrong'
        variant='error'
      />
    ),
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
