import { doctors } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import InstitutionRequests from './InstitutionRequests'

const pendingDoctors = doctors.filter((doctor) => doctor.pending)

// El renderizado del componente concuerda con la captura instantánea del componente

describe('Organisms > InstitutionRequests test', () => {
  const context = {
    doctors: pendingDoctors,
    nurses: [],
    specialtiesOptions: []
  }

  const emptyContext = {
    doctors: [],
    nurses: [],
    specialtiesOptions: []
  }
  test('The component shows the list of pending doctors if it has at least one doctor', () => {
    render(<InstitutionRequests context={context} />)

    expect(screen.getByText('Solicitudes pendientes')).toBeInTheDocument()
  })

  test('The component shows the empty state if the list of pending doctors is empty', () => {
    render(<InstitutionRequests context={emptyContext} />)

    expect(screen.getByTestId('pending-doctors-empty-state')).toBeInTheDocument()
  })

  test("The component allows to go to the institution's profile", () => {
    render(<InstitutionRequests context={context} />)

    expect(screen.getByText('Perfil de la institución')).toHaveAttribute(
      'href',
      '/perfil/institucion'
    )
  })

  test("The component allows to go to the institution's pending requests page", () => {
    render(<InstitutionRequests context={context} />)

    expect(screen.getByText('Personal con acceso')).toHaveAttribute('href', '/institucion/medicos')
  })

  test('Matches the snapshot', () => {
    render(<InstitutionRequests context={context} />)

    expect(screen.getByTestId('institution-requests')).toMatchSnapshot()
  })
})
