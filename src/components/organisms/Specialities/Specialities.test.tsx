import { specialities, patient } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Specialities from './Specialities'
import 'next/navigation'

jest.mock('next/navigation')

const context = {
  isPatient: true,
  specialities
}

const patientContext = {
  isPatient: false,
  patient,
  specialities
}

const emptyContext = {
  isPatient: false,
  specialities: []
}

describe('Organisms > Specialities test', () => {
  test('The component shows the specialities list if it has at least one speciality', () => {
    render(<Specialities context={context} />)

    expect(screen.getByText('Especialidades')).toBeInTheDocument()
  })

  test('The component shows the search bar if the specialities list has at least one speciality', () => {
    render(<Specialities context={context} />)

    expect(screen.getByPlaceholderText('Buscar especialidad')).toBeInTheDocument()
  })

  test("If the component is rendered in the Doctors's flow, the name of the patient is rendered", () => {
    render(<Specialities context={patientContext} />)

    const nameMatcher = (content: string) =>
      content.includes(`${patient.firstname} ${patient.lastname}`)
    const patientName = screen.getByText(nameMatcher)

    expect(patientName).toBeInTheDocument()
  })

  test('The quantity of children is the expected', () => {
    render(<Specialities context={context} />)

    expect(screen.getAllByTestId('speciality-card')).toHaveLength(specialities.length)
  })

  test('The component shows the empty state if the specialities states is empty', () => {
    render(<Specialities context={emptyContext} />)

    expect(screen.getByTestId('specialities-empty-state')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Specialities context={context} />)

    expect(screen.getByTestId('specialities')).toMatchSnapshot()
  })
})
