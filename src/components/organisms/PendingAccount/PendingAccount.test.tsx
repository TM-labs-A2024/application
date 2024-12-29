import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import PendingAccount from './PendingAccount'

const mockOnClick = jest.fn()

describe('Organisms > PendingAccount test', () => {
  test('The component shows the pending request message', () => {
    render(<PendingAccount onClick={mockOnClick} />)

    expect(screen.getByText('Aprobación pendiente')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<PendingAccount onClick={mockOnClick} />)

    expect(screen.getByTestId('pending-doctor')).toMatchSnapshot()
  })
})
