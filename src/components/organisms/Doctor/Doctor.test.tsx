import { doctors, specialties } from '@src/constants'
import { formatDate } from '@src/utils'
import { render, screen } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import Doctor from './Doctor'
import 'next/navigation'

jest.mock('next/navigation')

const doctor = doctors[0]

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

const specialtiesOptions = specialties.map((option: { name: string; id: string }) => ({
  value: option.id,
  label: option.name
}))

const context = {
  specialties: specialtiesOptions,
  doctor,
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

describe('Organisms > Doctor test', () => {
  test('The component shows the name, govId, specialties, birthdate, email and phoneNumberNumber of the doctor', () => {
    render(<Doctor context={context} />)

    const idMatcher = (content: string) => content.includes(doctor.id)
    const doctorId = screen.getByText(idMatcher)

    const emailMatcher = (content: string) => content.includes(doctor.email)
    const doctorEmail = screen.getByText(emailMatcher)

    expect(screen.getByText(`${doctor.firstname} ${doctor.lastname}`)).toBeInTheDocument()
    expect(doctorId).toBeInTheDocument()
    doctor.specialties?.forEach((specialty) => {
      const specialtyMatcher = (content: string) =>
        content.includes(String(specialtiesOptions?.find((el) => el.value === specialty.id)?.label))

      expect(screen.getByText(specialtyMatcher)).toBeInTheDocument()
    })
    expect(
      screen.getByText(
        format(new Date(formatDate(doctor.birthdate)), "dd 'de' MMMM, yyyy", {
          locale: es
        })
      )
    ).toBeInTheDocument()
    expect(doctorEmail).toBeInTheDocument()
    expect(screen.getByText(doctor.phoneNumber)).toBeInTheDocument()
  })

  // test('When clicking on the access removal button, the respective confirmation modal is shown', () => {
  //   const doctorNew = doctors[10]
  //   render(<Doctor context={{ ...context, doctor: doctorNew }} />)

  //   const deletionButton = screen.getByText('Revocar acceso')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea revocar el acceso a ${doctorNew.firstname} ${doctorNew.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to remove access to a doctor', () => {
  //   const doctorNew = doctors[10]
  //   render(<Doctor context={{ ...context, doctor: doctorNew }} />)

  //   const deletionButton = screen.getByText('Revocar acceso')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea revocar el acceso a ${doctorNew.firstname} ${doctorNew.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getAllByText('Revocar acceso')).toHaveLength(2)
  // })

  // test("If the doctor doesn't have access, when clicking on the access approval button, the respective confirmation modal is shown", () => {
  //   render(<Doctor context={context} />)

  //   const deletionButton = screen.getByText('Aceptar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea conceder el acceso a ${doctor.firstname} ${doctor.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to give access to a doctor', () => {
  //   render(<Doctor context={context} />)

  //   const deletionButton = screen.getByText('Aceptar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea conceder el acceso a ${doctor.firstname} ${doctor.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getByText('Conceder acceso')).toBeInTheDocument()
  // })

  // test("If the doctor doesn't have access, when clicking on the access denial button, the respective confirmation modal is shown", () => {
  //   render(<Doctor context={context} />)

  //   const deletionButton = screen.getByText('Rechazar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea denegar el acceso a ${doctor.firstname} ${doctor.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  // })

  // test('The component allows to deny access to a doctor', () => {
  //   render(<Doctor context={context} />)

  //   const deletionButton = screen.getByText('Rechazar')
  //   fireEvent.click(deletionButton)

  //   const confirmation = `¿Seguro que desea denegar el acceso a ${doctor.firstname} ${doctor.lastname}?`

  //   expect(screen.getByText(confirmation)).toBeInTheDocument()
  //   expect(screen.getByText('Denegar acceso')).toBeInTheDocument()
  // })

  test('Matches the snapshot', () => {
    render(<Doctor context={context} />)

    expect(screen.getByTestId('doctor')).toMatchSnapshot()
  })
})
