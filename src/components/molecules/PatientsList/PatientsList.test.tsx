import { patients } from '@src/constants'
import { render, screen } from '@test/utils/index'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import PatientsList from './PatientsList'

const patientsFormatted = patients.map(
  ({ id, birthdate, govId, status, bed, firstname, lastname, pending }) => ({
    href: pending ? '/pacientes' : `/especialidades/${id}`,
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

const props = {
  patients: approvedPatients,
  pendingPatients,
  label: 'label'
}

const noPendingProps = {
  patients: approvedPatients,
  pendingPatients: [],
  label: 'label'
}

const noApprovedProps = {
  patients: [],
  pendingPatients,
  label: 'label'
}

describe('Molecules > PatientsList test', () => {
  test('The component shows the label if any of the patients or pendingPatients lists have at least one entry', () => {
    render(<PatientsList {...props} />)

    expect(screen.getByText(props.label)).toBeInTheDocument()
  })

  test('The component shows the list of pending patients if this one has at least one pending patient', () => {
    render(<PatientsList {...props} />)

    expect(screen.getByText('Pendientes')).toBeInTheDocument()
  })

  test("The component doesn't show the list of pending patients if it's empty", () => {
    render(<PatientsList {...noPendingProps} />)

    expect(screen.queryByText('Pendientes')).not.toBeInTheDocument()
  })

  test('The component shows the list of approved patients if this one has at least one approved patient', () => {
    render(<PatientsList {...props} />)

    expect(screen.getByText('Todos')).toBeInTheDocument()
  })

  test("The component doesn't show the list of approved patients if it's empty", () => {
    render(<PatientsList {...noApprovedProps} />)

    expect(screen.queryByText('Todos')).not.toBeInTheDocument()
  })

  test('The quantity of children is the expected', () => {
    render(<PatientsList {...props} />)

    expect(screen.getAllByTestId('patient-card')).toHaveLength(13)
  })

  test('Matches the snapshot', () => {
    render(<PatientsList {...props} />)

    expect(screen.getByTestId('patients-list')).toMatchSnapshot()
  })
})
