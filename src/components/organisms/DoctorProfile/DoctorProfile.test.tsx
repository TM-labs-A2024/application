import { doctors, specialities } from '@src/constants'
import { render, screen, fireEvent } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import DoctorProfile from './DoctorProfile'

describe('Organisms > DoctorProfile test', () => {
  test('The component shows the name, govId, specialities, birthdate, email and phoneNumber of the doctor', () => {
    const doctor = doctors[0]
    render(<DoctorProfile doctor={doctor} />)

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

  test("The component allows to edit the doctor's specialities", () => {
    render(<DoctorProfile doctor={doctors[0]} />)

    const select = screen.getByText('Alergología')

    fireEvent.click(select)
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' })

    expect(screen.getByText('Anestesiología y reanimación')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<DoctorProfile doctor={doctors[0]} />)

    expect(screen.getByTestId('doctor-profile')).toMatchSnapshot()
  })
})
