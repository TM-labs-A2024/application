import { doctors } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import DoctorsList from './DoctorsList'

const pendingDoctors = doctors.filter((doctor) => doctor.patientPending)

const approvedDoctors = doctors.filter((doctor) => !doctor.patientPending)

const props = {
  doctors: approvedDoctors,
  pendingDoctors
}

const noPendingProps = {
  doctors: approvedDoctors,
  pendingDoctors: []
}

const noApprovedProps = {
  doctors: [],
  pendingDoctors
}

describe('Molecules > DoctorsList test', () => {
  test('The component shows the list of pending doctors if this one has at least one pending doctor', () => {
    render(<DoctorsList {...props} />)

    expect(screen.getByText('Pendientes')).toBeInTheDocument()
  })

  test("The component doesn't show the list of pending doctors if it's empty", () => {
    render(<DoctorsList {...noPendingProps} />)

    expect(screen.queryByText('Pendientes')).not.toBeInTheDocument()
  })

  test('The component shows the list of approved doctors if this one has at least one approved doctor', () => {
    render(<DoctorsList {...props} />)

    expect(screen.getByText('Todos')).toBeInTheDocument()
  })

  test("The component doesn't show the list of approved doctors if it's empty", () => {
    render(<DoctorsList {...noApprovedProps} />)

    expect(screen.queryByText('Todos')).not.toBeInTheDocument()
  })

  test('The quantity of children is the expected', () => {
    render(<DoctorsList {...props} />)

    expect(screen.getAllByTestId('doctor-card')).toHaveLength(48)
  })

  test('Matches the snapshot', () => {
    render(<DoctorsList {...props} />)

    expect(screen.getByTestId('doctors-list')).toMatchSnapshot()
  })
})
