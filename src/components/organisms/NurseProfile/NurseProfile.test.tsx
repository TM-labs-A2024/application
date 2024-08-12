import { nurse } from '@src/constants'
import { formatDate } from '@src/utils'
import { render, screen } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import NurseProfile from './NurseProfile'

describe('Organisms > NurseProfile test', () => {
  test('The component shows the name, govId, birthdate, email and phoneNumber of the nurse', () => {
    render(<NurseProfile nurse={nurse} />)

    const idMatcher = (content: string) => content.includes(nurse.govId)
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

  test('Matches the snapshot', () => {
    render(<NurseProfile nurse={nurse} />)

    expect(screen.getByTestId('nurse-profile')).toMatchSnapshot()
  })
})
