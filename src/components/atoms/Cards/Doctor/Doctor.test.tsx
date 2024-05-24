import { doctors } from '@constants/index'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Doctor from './Doctor'

describe('Atoms > Cards > Doctor test', () => {
  test('The card shows the firstname, lastname and specialities of the doctor', async () => {
    render(<Doctor doctor={doctors[0]} />)

    await screen.findByText('José Pérez')

    expect(screen.getByText('José Pérez')).toBeInTheDocument()
  })

  test('The url matches the expected', async () => {
    render(<Doctor doctor={doctors[0]} />)

    await screen.findByText('José Pérez')

    const enlace = screen.getByRole('link')
    expect(enlace).toHaveAttribute('href', `/medico/${doctors[0].id}`)
  })

  test('Matches the snapshot', async () => {
    render(<Doctor doctor={doctors[0]} />)

    expect(await screen.findByTestId('doctor-card')).toMatchSnapshot()
  })
})
