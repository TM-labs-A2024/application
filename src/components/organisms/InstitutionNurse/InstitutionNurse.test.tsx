import { nurse } from '@src/constants'
import { formatDate } from '@src/utils'
import { render, screen } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import InstitutionNurse from './InstitutionNurse'
import 'next/navigation'

jest.mock('next/navigation')

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

describe('Organisms > InstitutionNurse test', () => {
  const context = {
    nurse,
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

  // const nurseAcceptedContext = {
  //   nurse: nurseAccepted,
  //   specialtiesOptions,
  //   isDenialOpen,
  //   onDenialOpen,
  //   onDenialClose,
  //   isApprovalOpen,
  //   onApprovalOpen,
  //   onApprovalClose,
  //   isRemovalOpen,
  //   onRemovalOpen,
  //   onRemovalClose,
  //   onApproval: jest.fn(),
  //   onDenial: jest.fn(),
  //   onRemoval: jest.fn(),
  //   isLoading: false
  // }

  test('The component shows the name, govId, specialties, birthdate, email and phoneNumber of the nurse', () => {
    render(<InstitutionNurse context={context} />)

    const idMatcher = (content: string) => content.includes(nurse.id)
    const nurseId = screen.getByText(idMatcher)

    const emailMatcher = (content: string) => content.includes(nurse.email)
    const nurseEmail = screen.getByText(emailMatcher)

    expect(screen.getByText(`${nurse.firstname} ${nurse.lastname}`)).toBeInTheDocument()
    expect(nurseId).toBeInTheDocument()
    expect(
      screen.getByText(
        format(new Date(formatDate(nurse.birthdate)), "dd 'de' MMMM, yyyy", {
          locale: es
        })
      )
    ).toBeInTheDocument()
    expect(nurseEmail).toBeInTheDocument()
    expect(screen.getByText(nurse.phoneNumber)).toBeInTheDocument()
  })

  // test('When clicking on the access removal button, the respective confirmation modal is shown', () => {
  //   render(<InstitutionNurse context={nurseAcceptedContext} />)

  //   const deletionButton = screen.getByText('Revocar acceso')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea revocar el acceso a ${nurseAccepted.firstname} ${nurseAccepted.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to remove access to a nurse', () => {
  //   render(<InstitutionNurse context={nurseAcceptedContext} />)

  //   const deletionButton = screen.getByText('Revocar acceso')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea revocar el acceso a ${nurseAccepted.firstname} ${nurseAccepted.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getAllByText('Revocar acceso')).toHaveLength(2)
  // })

  // test("If the nurse doesn't have access, when clicking on the access approval button, the respective confirmation modal is shown", () => {
  //   render(<InstitutionNurse context={context} />)

  //   const deletionButton = screen.getByText('Aceptar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea conceder el acceso a ${nurse.firstname} ${nurse.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to give access to a nurse', () => {
  //   render(<InstitutionNurse context={context} />)

  //   const deletionButton = screen.getByText('Aceptar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea conceder el acceso a ${nurse.firstname} ${nurse.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getByText('Conceder acceso')).toBeInTheDocument()
  // })

  // test("If the nurse doesn't have access, when clicking on the access denial button, the respective confirmation modal is shown", () => {
  //   render(<InstitutionNurse context={context} />)

  //   const deletionButton = screen.getByText('Rechazar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea denegar el acceso a ${nurse.firstname} ${nurse.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to deny access to a nurse', () => {
  //   render(<InstitutionNurse context={context} />)

  //   const deletionButton = screen.getByText('Rechazar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea denegar el acceso a ${nurse.firstname} ${nurse.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getByText('Denegar acceso')).toBeInTheDocument()
  // })

  test('Matches the snapshot', () => {
    render(<InstitutionNurse context={context} />)

    expect(screen.getByTestId('institution-nurse')).toMatchSnapshot()
  })
})
