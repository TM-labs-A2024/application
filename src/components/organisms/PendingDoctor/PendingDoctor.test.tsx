import { doctors } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import PendingDoctor from './PendingDoctor'

const mockOnClick = jest.fn()
const doctor = doctors[0]

describe('Organisms > PendingDoctor test', () => {
  test('The component shows the name, govId, birthdate, email and phoneNumber of the doctor', () => {
    render(
      <PendingDoctor
        name={`${doctor.firstname} ${doctor.lastname}`}
        id={`CI: ${doctor.id}`}
        onClick={mockOnClick}
      />
    )

    const nameMatcher = (content: string) =>
      content.includes(`${doctor.firstname} ${doctor.lastname}`)
    const doctorName = screen.getByText(nameMatcher)

    const idMatcher = (content: string) => content.includes(`CI: ${doctor.id}`)
    const doctorId = screen.getByText(idMatcher)

    expect(doctorName).toBeInTheDocument()
    expect(doctorId).toBeInTheDocument()
    expect(mockOnClick).not.toHaveBeenCalled()
  })

  test('The component shows the pending request message', () => {
    render(
      <PendingDoctor
        name={`${doctor.firstname} ${doctor.lastname}`}
        id={`CI: ${doctor.id}`}
        onClick={mockOnClick}
      />
    )

    expect(screen.getByText('Aprobación pendiente')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(
      <PendingDoctor
        name={`${doctor.firstname} ${doctor.lastname}`}
        id={`CI: ${doctor.id}`}
        onClick={mockOnClick}
      />
    )

    expect(screen.getByTestId('pending-doctor')).toMatchSnapshot()
  })
})
