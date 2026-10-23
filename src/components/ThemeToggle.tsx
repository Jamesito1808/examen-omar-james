import { useEffect, useRef, useState } from 'react'
import { readTheme, saveTheme, themeStorage, THEME_KEY } from '../lib/theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => readTheme(themeStorage(), window.matchMedia('(prefers-color-scheme: dark)').matches))
  const override = useRef(false)

  useEffect(() => {
    try {
      const saved = themeStorage()?.getItem(THEME_KEY)
      override.current = saved === 'light' || saved === 'dark'
    } catch { /* Continue following the system preference. */ }
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => { if (!override.current) setTheme(media.matches ? 'dark' : 'light') }
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#202d28' : '#f4f1e8')
  }, [theme])

  return (
    <button className="theme-toggle" type="button" aria-label={`Activar modo ${theme === 'dark' ? 'claro' : 'oscuro'}`} onClick={() => {
      const next = theme === 'dark' ? 'light' : 'dark'
      override.current = true
      setTheme(next)
      saveTheme(themeStorage(), next)
    }}>
      <span className="theme-swatch" aria-hidden="true" />
      Modo {theme === 'dark' ? 'claro' : 'oscuro'}
    </button>
  )
}
