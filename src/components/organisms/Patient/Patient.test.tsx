import { patient } from '@src/constants'
import { render, screen } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import Patient from './Patient'
import 'next/navigation'

jest.mock('next/navigation')

const hospitalizedPatient = {
  ...patient,
  status: 'Hospitalizado'
}

describe('Organisms > Patient test', () => {
  test('The component shows the name, govId, birthdate, email and phoneNumber of the patient', () => {
    render(<Patient patient={patient} />)

    const idMatcher = (content: string) => content.includes(patient.govId)
    const patientId = screen.getByText(idMatcher)

    const emailMatcher = (content: string) => content.includes(patient.email)
    const patientEmail = screen.getByText(emailMatcher)

    expect(screen.getByText(`${patient.firstname} ${patient.lastname}`)).toBeInTheDocument()
    expect(patientId).toBeInTheDocument()
    expect(
      screen.getByText(
        format(new Date(patient.birthdate), "dd 'de' MMMM, yyyy", {
          locale: es
        })
      )
    ).toBeInTheDocument()
    expect(patientEmail).toBeInTheDocument()
    expect(screen.getByText(patient.phoneNumber)).toBeInTheDocument()
  })

  test('If the patient is hospitalized, the component shows the status', () => {
    render(<Patient patient={hospitalizedPatient} />)

    expect(screen.getByText(hospitalizedPatient.status)).toBeInTheDocument()
  })

  test("If the patient is not hospitalized, the component doesn't show the status", () => {
    render(<Patient patient={patient} />)

    expect(screen.queryByText('Hospitalizado')).not.toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Patient patient={patient} />)

    expect(screen.getByTestId('patient')).toMatchSnapshot()
  })
})
