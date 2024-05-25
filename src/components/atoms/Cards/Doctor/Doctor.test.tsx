import { doctors } from '@constants/index'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Doctor from './Doctor'

describe('Atoms > Cards > Doctor test', () => {
  test('The card shows the firstname, lastname and specialities of the doctor', async () => {
    render(<Doctor doctor={doctors[0]} />)

    expect(
      await screen.findByText(`${doctors[0].firstname} ${doctors[0].lastname}`)
    ).toBeInTheDocument()
  })

  test('The url matches the expected', async () => {
    render(<Doctor doctor={doctors[0]} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute('href', `/medico/${doctors[0].id}`)
  })

  test('Matches the snapshot', async () => {
    render(<Doctor doctor={doctors[0]} />)

    expect(await screen.findByTestId('doctor-card')).toMatchSnapshot()
  })
})
