import { patient } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Specialty from './Specialty'

const specialty = {
  name: 'Alergología',
  id: '10000000'
}

const specialtyWithPatient = {
  name: 'Alergología',
  id: '10000000',
  patient
}

describe('Atoms > Cards > Specialty test', () => {
  test('The card shows the name of the specialty', async () => {
    render(<Specialty {...specialty} />)

    expect(await screen.findByText(specialty.name)).toBeInTheDocument()
  })

  test('The url matches the expected in the pacients flow', async () => {
    render(<Specialty {...specialty} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute('href', `/especialidad/${specialty.id}`)
  })

  test('The url matches the expected in the doctors flow', async () => {
    render(<Specialty {...specialtyWithPatient} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute(
      'href',
      `/especialidad/${specialtyWithPatient?.patient?.govId}/${specialtyWithPatient.id}`
    )
  })

  test('Matches the snapshot', async () => {
    render(<Specialty {...specialty} />)

    expect(await screen.findByTestId('specialty-card')).toMatchSnapshot()
  })
})
