import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import ThemeToggle from './ThemeToggle'

it('toggles the document theme with Spanish feedback and persists it', async () => {
  render(<ThemeToggle />)
  await userEvent.click(screen.getByRole('button', { name: 'Activar modo oscuro' }))
  expect(document.documentElement.dataset.theme).toBe('dark')
  expect(document.documentElement.style.colorScheme).toBe('dark')
  expect(window.localStorage.getItem('olimpiadas-theme')).toBe('dark')
  expect(screen.getByRole('button', { name: 'Activar modo claro' })).toBeInTheDocument()
})

it('remains usable when the storage accessor throws', async () => {
  vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => { throw new Error('blocked') })
  render(<ThemeToggle />)
  await userEvent.click(screen.getByRole('button', { name: 'Activar modo oscuro' }))
  expect(document.documentElement.dataset.theme).toBe('dark')
})

it('follows system changes until an explicit override is chosen and cleans up', async () => {
  let update: () => void = () => {}
  const remove = vi.fn()
  const media = {
    matches: false,
    addEventListener: vi.fn((_event: string, callback: () => void) => { update = callback }),
    removeEventListener: remove,
  }
  vi.spyOn(window, 'matchMedia').mockReturnValue(media as unknown as MediaQueryList)
  const { unmount } = render(<ThemeToggle />)
  act(() => { media.matches = true; update() })
  expect(document.documentElement.dataset.theme).toBe('dark')
  await userEvent.click(screen.getByRole('button', { name: 'Activar modo claro' }))
  act(() => { update() })
  expect(document.documentElement.dataset.theme).toBe('light')
  unmount()
  expect(remove).toHaveBeenCalledWith('change', update)
})

it('starts with a persisted override rather than the system theme', () => {
  window.localStorage.setItem('olimpiadas-theme', 'dark')
  render(<ThemeToggle />)
  expect(screen.getByRole('button', { name: 'Activar modo claro' })).toBeInTheDocument()
})
