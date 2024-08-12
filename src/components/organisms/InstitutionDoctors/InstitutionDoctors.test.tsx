import { doctors, specialties } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import InstitutionDoctors from './InstitutionDoctors'

const approvedDoctors = doctors.filter((doctor) => !doctor.pending)

const specialtiesOptions = specialties?.map((option: { name: string; id: string }) => ({
  value: option.id,
  label: option.name
}))

const context = {
  doctors: approvedDoctors,
  nurses: [],
  specialtiesOptions
}

const emptyContext = {
  doctors: [],
  nurses: [],
  specialtiesOptions
}

describe('Organisms > InstitutionDoctors test', () => {
  test('The component shows the list of doctors with access if it has at least one doctor', () => {
    render(<InstitutionDoctors context={context} />)

    expect(screen.getByText('Médicos con acceso')).toBeInTheDocument()
  })

  test('The component shows the empty state if the list of doctors is empty', () => {
    render(<InstitutionDoctors context={emptyContext} />)

    expect(screen.getByTestId('approved-doctors-empty-state')).toBeInTheDocument()
  })

  test("The component allows to go to the institution's profile", () => {
    render(<InstitutionDoctors context={context} />)

    expect(screen.getByText('Perfil de la institución')).toHaveAttribute(
      'href',
      '/perfil/institucion'
    )
  })

  test("The component allows to go to the institution's pending requests page", () => {
    render(<InstitutionDoctors context={context} />)

    expect(screen.getByText('Solicitudes pendientes')).toHaveAttribute(
      'href',
      '/institucion/solicitudes'
    )
  })

  test('Matches the snapshot', () => {
    render(<InstitutionDoctors context={context} />)

    expect(screen.getByTestId('institution-doctors')).toMatchSnapshot()
  })
})
