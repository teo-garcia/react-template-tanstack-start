import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from 'better-themes'

import { GlobalProviders } from '~/components/global-providers/global-providers'
import {
  RouteLoadingState,
  RouteNotFoundState,
  RouteState,
  RouteStateButton,
} from '~/components/route-state/route-state'
import { ThemeSwitch } from '~/components/theme-switch/theme-switch'
import { env } from '~/lib/env'
import { getCanonicalUrl, getSeoMeta, siteMetadata } from '~/lib/seo'
import appCss from '~/lib/styles/globals.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...getSeoMeta(),
    ],
    links: [
      { rel: 'canonical', href: getCanonicalUrl() },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
    ],
  }),
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
  pendingComponent: RouteLoadingState,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({
  children,
  title,
}: Readonly<{ children: React.ReactNode; title?: string }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
        {title ? <title>{title}</title> : null}
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          disableTransitionOnChange
        >
          <GlobalProviders>
            <div className='min-h-screen'>
              <main id='main-content'>{children}</main>
            </div>
            <ThemeSwitch />
          </GlobalProviders>
        </ThemeProvider>
        <TanStackRouterDevtools position='top-left' />
        <Scripts />
      </body>
    </html>
  )
}

function ErrorComponent({
  error,
  reset,
}: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <RootDocument title={`Something went wrong | ${siteMetadata.shortName}`}>
      <RouteState
        actions={<RouteStateButton onClick={reset}>Try again</RouteStateButton>}
        description={error.message || 'The current route failed to render.'}
        details={env.isDevelopment ? error.stack : undefined}
        title='Something went wrong'
        variant='error'
      />
    </RootDocument>
  )
}

function NotFoundComponent() {
  return (
    <RootDocument title={`Page not found | ${siteMetadata.shortName}`}>
      <RouteNotFoundState />
    </RootDocument>
  )
}
