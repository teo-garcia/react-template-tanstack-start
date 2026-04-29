import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { GlobalProviders } from '~/components/global-providers/global-providers'
import { ThemeSwitch } from '~/components/theme-switch/theme-switch'
import { env } from '~/lib/env'
import appCss from '~/lib/styles/globals.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Home | RTTS',
      },
      {
        name: 'description',
        content: 'React Template TanStack Start',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <GlobalProviders>
          <div className='min-h-screen'>
            <main id='main-content'>{children}</main>
          </div>
          <ThemeSwitch />
        </GlobalProviders>
        <TanStackRouterDevtools position='top-left' />
        <Scripts />
      </body>
    </html>
  )
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  return (
    <RootDocument>
      <main className='fixed inset-0 flex items-center justify-center bg-red-50 dark:bg-red-950/20'>
        <div className='max-w-md rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800'>
          <div className='mb-4 text-4xl font-bold text-red-600 dark:text-red-400'>
            Error
          </div>
          <div className='mb-6 text-gray-600 dark:text-gray-300'>
            {error.message}
          </div>
          {env.isDevelopment && error.stack && (
            <div className='rounded-sm bg-gray-100 p-4 dark:bg-gray-900'>
              <code className='font-mono text-sm text-gray-800 dark:text-gray-200'>
                {error.stack}
              </code>
            </div>
          )}
        </div>
      </main>
    </RootDocument>
  )
}

function NotFoundComponent() {
  return (
    <section className='flex h-screen flex-col items-center justify-center gap-y-10 xl:gap-y-16'>
      <h1 className='text-4xl font-semibold md:text-6xl lg:text-7xl'>
        Page not found
      </h1>
      <p className='md:text-2xl'>
        The page you are looking for does not exist.
      </p>
    </section>
  )
}
