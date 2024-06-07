import { institutions } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Institutions from './Institutions'

const approvedInstitutions = institutions.filter((institution) => !institution.pending)

describe('Organisms > Institutions test', () => {
  test('The component shows the list of institutions with access if it has at least one institution', () => {
    render(<Institutions institutions={approvedInstitutions} />)

    expect(screen.getByText('Instituciones con acceso')).toBeInTheDocument()
  })

  test('The component shows the empty state if the list of institutions is empty', () => {
    render(<Institutions institutions={[]} />)

    expect(screen.getByTestId('approved-institutions-empty-state')).toBeInTheDocument()
  })

  test("The component allows to go to the institution's pending requests page", () => {
    render(<Institutions institutions={approvedInstitutions} />)

    expect(screen.getByText('Solicitudes pendientes')).toHaveAttribute(
      'href',
      '/ministerio/solicitudes'
    )
  })

  test('Matches the snapshot', () => {
    render(<Institutions institutions={approvedInstitutions} />)

    expect(screen.getByTestId('institutions')).toMatchSnapshot()
  })
})
