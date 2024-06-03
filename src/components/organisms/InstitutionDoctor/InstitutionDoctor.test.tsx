import { doctors, specialities } from '@src/constants'
import { render, screen, fireEvent } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import InstitutionDoctor from './InstitutionDoctor'
import 'next/navigation'

jest.mock('next/navigation')

describe('Organisms > InstitutionDoctor test', () => {
  test('The component shows the name, govId, specialities, birthdate, email and phoneNumber of the doctor', () => {
    const doctor = doctors[0]
    render(<InstitutionDoctor doctor={doctor} />)

    const idMatcher = (content: string) => content.includes(doctor.id.toLocaleString('es-ES'))
    const doctorId = screen.getByText(idMatcher)

    const emailMatcher = (content: string) => content.includes(doctor.email)
    const doctorEmail = screen.getByText(emailMatcher)

    expect(screen.getByText(`${doctor.firstname} ${doctor.lastname}`)).toBeInTheDocument()
    expect(doctorId).toBeInTheDocument()
    doctor.specialities?.forEach((speciality) => {
      const specialityMatcher = (content: string) =>
        content.includes(String(specialities?.find((el) => el.id === speciality)?.name))

      expect(screen.getByText(specialityMatcher)).toBeInTheDocument()
    })
    expect(
      screen.getByText(
        format(new Date(doctor.birthdate), "dd 'de' MMMM, yyyy", {
          locale: es
        })
      )
    ).toBeInTheDocument()
    expect(doctorEmail).toBeInTheDocument()
    expect(screen.getByText(doctor.phone)).toBeInTheDocument()
  })

  test('When clicking on the access removal button, the respective confirmation modal is shown', () => {
    const doctor = doctors[10]
    render(<InstitutionDoctor doctor={doctor} />)

    const deletionButton = screen.getByText('Revocar acceso')
    fireEvent.click(deletionButton)

    const confirmation = `¿Seguro que desea revocar el acceso a ${doctor.firstname} ${doctor.lastname}?`

    expect(screen.getByText(confirmation)).toBeInTheDocument()
  })

  test('The component allows to remove access to a doctor', () => {
    const doctor = doctors[10]
    render(<InstitutionDoctor doctor={doctor} />)

    const deletionButton = screen.getByText('Revocar acceso')
    fireEvent.click(deletionButton)

    const confirmation = `¿Seguro que desea revocar el acceso a ${doctor.firstname} ${doctor.lastname}?`

    expect(screen.getByText(confirmation)).toBeInTheDocument()
    expect(screen.getAllByText('Revocar acceso')).toHaveLength(2)
  })

  test("If the doctor doesn't have access, when clicking on the access approval button, the respective confirmation modal is shown", () => {
    const doctor = doctors[0]
    render(<InstitutionDoctor doctor={doctor} />)

    const deletionButton = screen.getByText('Aceptar')
    fireEvent.click(deletionButton)

    const confirmation = `¿Seguro que desea conceder el acceso a ${doctor.firstname} ${doctor.lastname}?`

    expect(screen.getByText(confirmation)).toBeInTheDocument()
  })

  test('The component allows to give access to a doctor', () => {
    const doctor = doctors[0]
    render(<InstitutionDoctor doctor={doctor} />)

    const deletionButton = screen.getByText('Aceptar')
    fireEvent.click(deletionButton)

    const confirmation = `¿Seguro que desea conceder el acceso a ${doctor.firstname} ${doctor.lastname}?`

    expect(screen.getByText(confirmation)).toBeInTheDocument()
    expect(screen.getByText('Conceder acceso')).toBeInTheDocument()
  })

  test("If the doctor doesn't have access, when clicking on the access denial button, the respective confirmation modal is shown", () => {
    const doctor = doctors[0]
    render(<InstitutionDoctor doctor={doctor} />)

    const deletionButton = screen.getByText('Rechazar')
    fireEvent.click(deletionButton)

    const confirmation = `¿Seguro que desea denegar el acceso a ${doctor.firstname} ${doctor.lastname}?`

    expect(screen.getByText(confirmation)).toBeInTheDocument()
  })

  test('The component allows to deny access to a doctor', () => {
    const doctor = doctors[0]
    render(<InstitutionDoctor doctor={doctor} />)

    const deletionButton = screen.getByText('Rechazar')
    fireEvent.click(deletionButton)

    const confirmation = `¿Seguro que desea denegar el acceso a ${doctor.firstname} ${doctor.lastname}?`

    expect(screen.getByText(confirmation)).toBeInTheDocument()
    expect(screen.getByText('Denegar acceso')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<InstitutionDoctor doctor={doctors[0]} />)

    expect(screen.getByTestId('institution-doctor')).toMatchSnapshot()
  })
})
