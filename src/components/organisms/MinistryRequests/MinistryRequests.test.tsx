import { institutions } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import MinistryRequests from './MinistryRequests'

const pendingInstitutions = institutions.filter((institution) => institution.pending)

describe('Organisms > MinistryRequests test', () => {
  test('The component shows the list of pending institutions if it has at least one institution', () => {
    render(<MinistryRequests institutions={pendingInstitutions} />)

    expect(screen.getByText('Solicitudes pendientes')).toBeInTheDocument()
  })

  test('The component shows the empty state if the list of pending institutions is empty', () => {
    render(<MinistryRequests institutions={[]} />)

    expect(screen.getByTestId('pending-institutions-empty-state')).toBeInTheDocument()
  })

  test("The component allows to go to the institution's pending requests page", () => {
    render(<MinistryRequests institutions={pendingInstitutions} />)

    expect(screen.getByText('Instituciones con acceso')).toHaveAttribute(
      'href',
      '/ministerio/instituciones'
    )
  })

  test('Matches the snapshot', () => {
    render(<MinistryRequests institutions={pendingInstitutions} />)

    expect(screen.getByTestId('institution-requests')).toMatchSnapshot()
  })
})
