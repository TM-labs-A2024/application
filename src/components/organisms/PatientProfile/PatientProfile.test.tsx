import { patient } from '@src/constants'
import { render, screen } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import PatientProfile from './PatientProfile'

describe('Organisms > Patient test', () => {
  test('The component shows the name, govId, birthdate, email and phoneNumber of the patient', () => {
    render(<PatientProfile patient={patient} />)

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

  test('The component allows to go to the patients details edition form', () => {
    render(<PatientProfile patient={patient} />)

    expect(screen.getByText('Editar')).toHaveAttribute('href', '/perfil/editar')
  })

  test('Matches the snapshot', () => {
    render(<PatientProfile patient={patient} />)

    expect(screen.getByTestId('patient-profile')).toMatchSnapshot()
  })
})
