import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import ScoringDialog from './ScoringDialog'

it('opens a labelled native dialog and restores focus on close', async () => {
  render(<ScoringDialog />)
  const trigger = screen.getByRole('button', { name: 'Cómo se suman los puntos' })
  await userEvent.click(trigger)
  expect(screen.getByRole('dialog', { name: 'Cómo se suman los puntos' })).toBeInTheDocument()
  expect(screen.getByText('7 puntos')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: 'Cerrar explicación' }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(trigger).toHaveFocus()
})

it('handles native Escape cancellation and restores focus', async () => {
  render(<ScoringDialog />)
  const trigger = screen.getByRole('button', { name: 'Cómo se suman los puntos' })
  await userEvent.click(trigger)
  fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(trigger).toHaveFocus()
})
