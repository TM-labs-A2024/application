import { specialties, patient } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Specialties from './Specialties'
import 'next/navigation'

jest.mock('next/navigation')

const context = {
  isPatient: true,
  specialties
}

const patientContext = {
  isPatient: false,
  patient,
  specialties
}

const emptyContext = {
  isPatient: false,
  specialties: []
}

describe('Organisms > Specialties test', () => {
  test('The component shows the specialties list if it has at least one specialty', () => {
    render(<Specialties context={context} />)

    expect(screen.getByText('Especialidades')).toBeInTheDocument()
  })

  test('The component shows the search bar if the specialties list has at least one specialty', () => {
    render(<Specialties context={context} />)

    expect(screen.getByPlaceholderText('Buscar especialidad')).toBeInTheDocument()
  })

  test("If the component is rendered in the Doctors's flow, the name of the patient is rendered", () => {
    render(<Specialties context={patientContext} />)

    const nameMatcher = (content: string) =>
      content.includes(`${patient.firstname} ${patient.lastname}`)
    const patientName = screen.getByText(nameMatcher)

    expect(patientName).toBeInTheDocument()
  })

  test('The quantity of children is the expected', () => {
    render(<Specialties context={context} />)

    expect(screen.getAllByTestId('specialty-card')).toHaveLength(specialties.length)
  })

  test('The component shows the empty state if the specialties states is empty', () => {
    render(<Specialties context={emptyContext} />)

    expect(screen.getByTestId('specialties-empty-state')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Specialties context={context} />)

    expect(screen.getByTestId('specialties')).toMatchSnapshot()
  })
})
