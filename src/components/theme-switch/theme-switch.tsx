import { useColorScheme, useLocalStorage } from '@teo-garcia/react-shared/hooks'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

const isServer = import.meta.env.SSR

function applyTheme(theme: ThemeMode) {
  if (isServer) return
  const resolved = theme === 'system' ? resolveSystemTheme() : theme
  globalThis.document.documentElement.classList.toggle(
    'dark',
    resolved === 'dark'
  )
}

function resolveSystemTheme(): Exclude<ThemeMode, 'system'> {
  return globalThis.document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light'
}

export const ThemeSwitch = () => {
  const [theme, setTheme] = useLocalStorage<ThemeMode>('theme', 'system')
  const systemTheme = useColorScheme()

  useEffect(() => {
    applyTheme(theme === 'system' ? systemTheme : theme)
  }, [systemTheme, theme])

  const getNextTheme = (): ThemeMode => {
    switch (theme) {
      case 'light': {
        return 'dark'
      }
      case 'dark': {
        return 'system'
      }
      default: {
        return 'light'
      }
    }
  }

  const getCurrentIcon = () => {
    switch (theme) {
      case 'light': {
        return <Sun className='size-5' />
      }
      case 'dark': {
        return <Moon className='size-5' />
      }
      default: {
        return <Laptop className='size-5' />
      }
    }
  }

  return (
    <button
      onClick={() => setTheme(getNextTheme())}
      aria-label={`Theme switcher, current mode: ${theme}`}
      className='fixed right-4 top-4 rounded-lg border p-2 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground md:right-8 md:top-8'
      title={`Current theme: ${theme}. Click to switch to ${getNextTheme()}`}
    >
      {getCurrentIcon()}
    </button>
  )
}
