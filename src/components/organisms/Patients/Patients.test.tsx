import { patients } from '@src/constants'
import { render, screen } from '@test/utils/index'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import Patients from './Patients'
import 'next/navigation'

jest.mock('next/navigation')

const patientsFormatted = patients.map(
  ({ uuid, birthdate, govId, status, bed, firstname, lastname, pending }) => ({
    href: pending ? '/pacientes' : `/especialidades/${uuid}`,
    title: `${firstname} ${lastname}`,
    description: `C.I: ${govId}, ${formatDistanceToNowStrict(new Date(birthdate), {
      locale: es,
      roundingMethod: 'floor'
    })}${status ? `, Cama: ${bed}` : ''}`,
    status,
    pending
  })
)

const pendingPatients = patientsFormatted.filter((patient) => patient.pending)

const approvedPatients = patientsFormatted.filter((patient) => !patient.pending)

const context = {
  pendingPatients,
  approvedPatients
}

const emptyContext = {
  pendingPatients: [],
  approvedPatients: []
}

describe('Organisms > Patients test', () => {
  test('The component shows the searchbar if the list of patients which have granted access and the pending patients have at least one patient', () => {
    render(<Patients context={context} />)

    expect(screen.getByPlaceholderText('Buscar paciente')).toBeInTheDocument()
  })

  test('The component shows the patients list if the list of patients which have granted access and the pending patients have at least one patient', () => {
    render(<Patients context={context} />)

    expect(screen.getByText('Pacientes')).toBeInTheDocument()
  })

  test('The component shows the empty state if the list of pending patients is empty', () => {
    render(<Patients context={emptyContext} />)

    expect(screen.getByTestId('patients-empty-state')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Patients context={context} />)

    expect(screen.getByTestId('patients')).toMatchSnapshot()
  })
})
