import { doctors } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Doctors from './Doctors'

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

const noDoctors = {
  doctors: [],
  pendingDoctors: []
}

describe('Organisms > Doctors test', () => {
  test('The component shows the list of doctors with access and the pending ones if each one has at least one doctor', () => {
    render(<Doctors context={props} />)

    expect(screen.getByTestId('pending-doctors-list')).toBeInTheDocument()
    expect(screen.getByTestId('approved-doctors-list')).toBeInTheDocument()
  })

  test('The component shows the list of doctors with access if this one has at least one doctor', () => {
    render(<Doctors context={noPendingProps} />)

    expect(screen.getByTestId('approved-doctors-list')).toBeInTheDocument()
  })

  test('The component shows the list of doctors without access if this one has at least one doctor', () => {
    render(<Doctors context={noApprovedProps} />)

    expect(screen.getByTestId('pending-doctors-list')).toBeInTheDocument()
  })

  test('The component shows the empty state if both lists are empty', () => {
    render(<Doctors context={noDoctors} />)

    expect(screen.getByTestId('doctors-empty-state')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Doctors context={props} />)

    expect(screen.getByTestId('doctors')).toMatchSnapshot()
  })
})
