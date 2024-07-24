import { patients } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import AddPatient from './AddPatient'

const context = {
  onChange: (id: string) => id,
  filteredPatients: patients,
  onSubmit: jest.fn(),
  loadingId: ''
}

const pendingPatients = {
  onChange: (id: string) => id,
  filteredPatients: [patients.find((patient) => patient.pending) ?? patients[0]],
  onSubmit: jest.fn(),
  loadingId: ''
}

const approvedPatients = {
  onChange: (id: string) => id,
  filteredPatients: [patients.find((patient) => !patient.pending) ?? patients[0]],
  onSubmit: jest.fn(),
  loadingId: ''
}

describe('Organisms > AddPatient test', () => {
  test('The component shows the patients that match the id in the input field', () => {
    render(<AddPatient context={context} />)

    patients.forEach((patient) => {
      expect(screen.getByText(patient.govId)).toBeInTheDocument()
    })
  })

  test('The component shows if the access was already requested', () => {
    render(<AddPatient context={pendingPatients} />)

    patients.forEach((patient) => {
      if (patient.pending) expect(screen.getByText('Solicitado')).toBeInTheDocument()
    })
  })

  test('The component allows to request access to pacients', () => {
    render(<AddPatient context={approvedPatients} />)

    patients.forEach((patient) => {
      if (!patient.pending) expect(screen.getByText('Solicitar acceso')).toBeInTheDocument()
    })
  })

  test('Matches the snapshot', () => {
    render(<AddPatient context={context} />)

    expect(screen.getByTestId('add-patient')).toMatchSnapshot()
  })
})
