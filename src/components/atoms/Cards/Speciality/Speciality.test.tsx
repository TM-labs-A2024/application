import { patient } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Speciality from './Speciality'

const speciality = {
  name: 'Alergología',
  id: '10000000'
}

const specialityWithPatient = {
  name: 'Alergología',
  id: '10000000',
  patient
}

describe('Atoms > Cards > Speciality test', () => {
  test('The card shows the name of the speciality', async () => {
    render(<Speciality {...speciality} />)

    expect(await screen.findByText(speciality.name)).toBeInTheDocument()
  })

  test('The url matches the expected in the pacients flow', async () => {
    render(<Speciality {...speciality} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute('href', `/especialidad/${speciality.id}`)
  })

  test('The url matches the expected in the doctors flow', async () => {
    render(<Speciality {...specialityWithPatient} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute(
      'href',
      `/especialidad/${specialityWithPatient?.patient?.uuid}/${specialityWithPatient.id}`
    )
  })

  test('Matches the snapshot', async () => {
    render(<Speciality {...speciality} />)

    expect(await screen.findByTestId('speciality-card')).toMatchSnapshot()
  })
})
