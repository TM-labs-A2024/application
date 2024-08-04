import { institution } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Institution from './Institution'
import 'next/navigation'

jest.mock('next/navigation')

// const pendingInstitution = {
//   ...institution,
//   pending: true
// }

let isDenialOpen = false
let isApprovalOpen = false
let isRemovalOpen = false

const onDenialOpen = () => {
  isDenialOpen = true
}

const onApprovalOpen = () => {
  isApprovalOpen = true
}

const onRemovalOpen = () => {
  isRemovalOpen = true
}

const onDenialClose = () => {
  isDenialOpen = false
}

const onApprovalClose = () => {
  isApprovalOpen = false
}

const onRemovalClose = () => {
  isRemovalOpen = false
}

const context = {
  institution,
  isDenialOpen,
  onDenialOpen,
  onDenialClose,
  isApprovalOpen,
  onApprovalOpen,
  onApprovalClose,
  isRemovalOpen,
  onRemovalOpen,
  onRemovalClose,
  onApproval: jest.fn(),
  onDenial: jest.fn(),
  onRemoval: jest.fn(),
  isLoading: false
}

describe('Organisms > Institution test', () => {
  test('The component shows the name, rif, email and phoneNumber of the institution', () => {
    render(<Institution context={context} />)

    const emailMatcher = (content: string) => content.includes(institution.email)
    const institutionEmail = screen.getByText(emailMatcher)

    expect(institutionEmail).toBeInTheDocument()

    const credentialsMatcher = (content: string) => content.includes(institution.govId)
    const institutionCredentials = screen.getByText(credentialsMatcher)

    expect(institutionCredentials).toBeInTheDocument()

    expect(screen.getByText(institution.name)).toBeInTheDocument()
    expect(screen.getByText(institution.phoneNumber)).toBeInTheDocument()
  })

  // test('When clicking on the access removal button, the respective confirmation modal is shown', () => {
  //   render(<Institution context={context} />)

  //   const deletionButton = screen.getByText('Revocar acceso')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea revocar el acceso a ${institution.name}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to remove access to an institution', () => {
  //   render(<Institution context={context} />)

  //   const deletionButton = screen.getByText('Revocar acceso')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea revocar el acceso a ${institution.name}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getAllByText('Revocar acceso')).toHaveLength(2)
  // })

  // test("If the institution doesn't have access, when clicking on the access approval button, the respective confirmation modal is shown", () => {
  //   render(<Institution institution={pendingInstitution} />)

  //   const deletionButton = screen.getByText('Aceptar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea conceder el acceso a ${pendingInstitution.name}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to give access to an institution', () => {
  //   render(<Institution institution={pendingInstitution} />)

  //   const deletionButton = screen.getByText('Aceptar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea conceder el acceso a ${pendingInstitution.name}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getByText('Conceder acceso')).toBeInTheDocument()
  // })

  // test("If the institution doesn't have access, when clicking on the access denial button, the respective confirmation modal is shown", () => {
  //   render(<Institution institution={pendingInstitution} />)

  //   const deletionButton = screen.getByText('Rechazar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea denegar el acceso a ${pendingInstitution.name}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to deny access to an institution', () => {
  //   render(<Institution institution={pendingInstitution} />)

  //   const deletionButton = screen.getByText('Rechazar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea denegar el acceso a ${pendingInstitution.name}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getByText('Denegar acceso')).toBeInTheDocument()
  // })

  test('Matches the snapshot', () => {
    render(<Institution context={context} />)

    expect(screen.getByTestId('institution')).toMatchSnapshot()
  })
})
