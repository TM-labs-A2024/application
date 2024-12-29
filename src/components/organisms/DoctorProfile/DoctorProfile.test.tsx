import { doctors, specialties } from '@src/constants'
import { formatDate } from '@src/utils'
import { render, screen } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import DoctorProfile from './DoctorProfile'

describe('Organisms > DoctorProfile test', () => {
  const specialtiesOptions = specialties?.map((option: { name: string; id: string }) => ({
    value: option.id,
    label: option.name
  }))

  const doctor = doctors[0]
  const context = {
    doctor: doctors[0],
    specialtiesOptions: specialtiesOptions ?? [],
    onSubmit: jest.fn()
  }
  test('The component shows the name, govId, specialties, birthdate, email and phoneNumber of the doctor', () => {
    render(<DoctorProfile context={context} />)

    const idMatcher = (content: string) => content.includes(doctor.id)
    const doctorId = screen.getByText(idMatcher)

    const emailMatcher = (content: string) => content.includes(doctor.email)
    const doctorEmail = screen.getByText(emailMatcher)

    expect(screen.getByText(`${doctor.firstname} ${doctor.lastname}`)).toBeInTheDocument()
    expect(doctorId).toBeInTheDocument()
    // doctor.specialties?.forEach((specialty) => {
    //   const specialtyMatcher = (content: string) =>
    //     content.includes(String(specialties?.find((el) => el.id === specialty.id)?.name))

    //   expect(screen.getByText(specialtyMatcher)).toBeInTheDocument()
    // })
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

  // test("The component allows to edit the doctor's specialties", () => {
  //   render(<DoctorProfile context={context} />)

  //   const select = screen.getByText('Alergología')

  //   fireEvent.click(select)
  //   fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
  //   fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' })

  //   expect(screen.getByText('Anestesiología y reanimación')).toBeInTheDocument()
  // })

  test('Matches the snapshot', () => {
    render(<DoctorProfile context={context} />)

    expect(screen.getByTestId('doctor-profile')).toMatchSnapshot()
  })
})
