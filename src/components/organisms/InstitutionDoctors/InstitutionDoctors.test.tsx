import { doctors } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import InstitutionDoctors from './InstitutionDoctors'

const approvedDoctors = doctors.filter((doctor) => !doctor.pending)

describe('Organisms > InstitutionDoctors test', () => {
  test('The component shows the list of doctors with access if it has at least one doctor', () => {
    render(<InstitutionDoctors doctors={approvedDoctors} />)

    expect(screen.getByText('Médicos con acceso')).toBeInTheDocument()
  })

  test('The component shows the empty state if the list of doctors is empty', () => {
    render(<InstitutionDoctors doctors={[]} />)

    expect(screen.getByTestId('approved-doctors-empty-state')).toBeInTheDocument()
  })

  test("The component allows to go to the institution's profile", () => {
    render(<InstitutionDoctors doctors={approvedDoctors} />)

    expect(screen.getByText('Perfil de la institución')).toHaveAttribute(
      'href',
      '/perfil/institucion'
    )
  })

  test("The component allows to go to the institution's pending requests page", () => {
    render(<InstitutionDoctors doctors={approvedDoctors} />)

    expect(screen.getByText('Solicitudes pendientes')).toHaveAttribute(
      'href',
      '/institucion/solicitudes'
    )
  })

  test('Matches the snapshot', () => {
    render(<InstitutionDoctors doctors={approvedDoctors} />)

    expect(screen.getByTestId('institution-doctors')).toMatchSnapshot()
  })
})
