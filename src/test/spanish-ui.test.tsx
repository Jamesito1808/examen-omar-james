import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from '../App'

it('renders Spanish navigation and mock-derived standings', () => {
  render(<MemoryRouter><App /></MemoryRouter>)
  expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Cada curso cuenta. Cada punto también.' })).toBeInTheDocument()
  expect(screen.getByRole('table', { name: 'Clasificación general por curso' })).toHaveTextContent('42')
})

it('preserves gender-separated events and a single mixed chess table', () => {
  render(<MemoryRouter initialEntries={['/disciplinas']}><App /></MemoryRouter>)
  expect(screen.getByRole('table', { name: 'Salto alto Masculino' })).toBeInTheDocument()
  expect(screen.getByRole('table', { name: 'Salto alto Femenino' })).toBeInTheDocument()
  const chess = screen.getByRole('article', { name: 'Ajedrez' })
  expect(within(chess).getAllByRole('table')).toHaveLength(1)
  expect(within(chess).getByText('Categoría mixta')).toBeInTheDocument()
})

it('uses Spanish weekdays without changing stored fixture keys', () => {
  render(<MemoryRouter initialEntries={['/horario']}><App /></MemoryRouter>)
  expect(screen.getByRole('region', { name: 'Encuentros del miércoles' })).toBeInTheDocument()
})

it('keeps the demo admin flow and validation entirely in Spanish', async () => {
  render(<MemoryRouter initialEntries={['/admin']}><App /></MemoryRouter>)
  await userEvent.type(screen.getByLabelText('Código de acceso'), 'incorrect')
  await userEvent.click(screen.getByRole('button', { name: 'Abrir panel' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Código incorrecto')
  expect(screen.getByLabelText('Código de acceso')).toHaveFocus()
  await userEvent.clear(screen.getByLabelText('Código de acceso'))
  await userEvent.type(screen.getByLabelText('Código de acceso'), 'olimpiadas-admin')
  await userEvent.click(screen.getByRole('button', { name: 'Abrir panel' }))
  expect(screen.getByRole('table', { name: 'Administrar cursos' })).toBeInTheDocument()
  expect(screen.getByRole('option', { name: 'Masculino' })).toHaveValue('M')
  expect(screen.getByRole('option', { name: 'Femenino' })).toHaveValue('F')
  expect(screen.getByRole('button', { name: 'Inscribir en Fútbol' })).toBeInTheDocument()
})
