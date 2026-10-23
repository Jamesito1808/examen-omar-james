import { describe, expect, it, vi } from 'vitest'
import { readTheme, saveTheme } from './theme'

describe('theme preferences', () => {
  it('uses the system preference when no override exists', () => {
    expect(readTheme(null, true)).toBe('dark')
    expect(readTheme(null, false)).toBe('light')
  })
  it('honors a valid stored override', () => {
    expect(readTheme({ getItem: () => 'light' }, true)).toBe('light')
    expect(readTheme({ getItem: () => 'dark' }, false)).toBe('dark')
  })
  it('ignores invalid values', () => {
    expect(readTheme({ getItem: () => 'invalid' }, true)).toBe('dark')
  })
  it('falls back when storage is blocked', () => {
    expect(readTheme({ getItem: () => { throw new Error('blocked') } }, false)).toBe('light')
  })
  it('does not throw when persisting is blocked', () => {
    const setItem = vi.fn(() => { throw new Error('blocked') })
    expect(() => saveTheme({ setItem }, 'dark')).not.toThrow()
    expect(setItem).toHaveBeenCalledWith('olimpiadas-theme', 'dark')
  })
})
