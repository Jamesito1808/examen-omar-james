export type Theme = 'light' | 'dark'
export const THEME_KEY = 'olimpiadas-theme'

export function readTheme(storage: Pick<Storage, 'getItem'> | null, prefersDark: boolean): Theme {
  try {
    const saved = storage?.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* Storage may be unavailable in private browsing. */ }
  return prefersDark ? 'dark' : 'light'
}

export function saveTheme(storage: Pick<Storage, 'setItem'> | null, theme: Theme): void {
  try { storage?.setItem(THEME_KEY, theme) } catch { /* The in-memory preference still works. */ }
}

export function themeStorage(): Storage | null {
  try { return window.localStorage } catch { return null }
}
