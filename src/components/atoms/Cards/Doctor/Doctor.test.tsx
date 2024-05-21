import { doctors } from '@constants/index'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Doctor from './Doctor'

describe('Atoms > Cards > Doctor test', () => {
  test('Loads and displays doctor name', async () => {
    // ARRANGE
    render(<Doctor doctor={doctors[0]} />)

    // ACT
    await screen.findByText('José Pérez')

    // ASSERT
    expect(screen.getByText('José Pérez')).toBeInTheDocument()
  })

  test('Match the snapshot', async () => {
    render(<Doctor doctor={doctors[0]} />)

    expect(await screen.findByTestId('doctor-card')).toMatchSnapshot()
  })
})
