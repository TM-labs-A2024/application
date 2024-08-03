import { patient } from '@src/constants'
import { render, screen } from '@test/utils'
import { format } from 'date-fns'
import 'next/navigation'

import EditPatient from './EditPatient'
import '@testing-library/jest-dom'

jest.mock('next/navigation')

describe('Molecules > Forms > EditPatient test', () => {
  const context = {
    patient,
    onSubmit: jest.fn()
  }
  test('The component requires the fields: Firstname, lastname, govId, birthdate, email and phoneNumber', () => {
    render(<EditPatient context={context} />)

    expect(screen.getByPlaceholderText('Nombres')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Apellidos')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Cédula')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Fecha de nacimiento')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Teléfono')).toBeInTheDocument()
  })

  test("The component shows the placeholder text with the patient's data", () => {
    render(<EditPatient context={context} />)

    const formatedDate = format(new Date(patient.birthdate), 'yyyy-MM-dd')

    expect(screen.getByDisplayValue(patient.firstname)).toBeInTheDocument()
    expect(screen.getByDisplayValue(patient.lastname)).toBeInTheDocument()
    expect(screen.getByDisplayValue(patient.govId)).toBeInTheDocument()
    expect(screen.getByDisplayValue(formatedDate)).toBeInTheDocument()
    expect(screen.getByDisplayValue(patient.email)).toBeInTheDocument()
    expect(screen.getByDisplayValue(patient.phoneNumber)).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<EditPatient context={context} />)

    expect(screen.getByTestId('edit-patient-form')).toMatchSnapshot()
  })
})
