import { patient } from '@src/constants'
import { render, screen } from '@test/utils/index'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import Profile from './Profile'

describe('Atoms > Cards > Profile test', () => {
  test('The card shows the name, id and age of the patient', async () => {
    render(<Profile patient={patient} />)

    const textMatcher = (content: string) =>
      content.includes(`${patient.firstname} ${patient.lastname}`)
    const idMatcher = (content: string) => content.includes(patient.govId)
    const ageMatcher = (content: string) =>
      content.includes(
        formatDistanceToNowStrict(new Date(patient.birthdate), {
          locale: es,
          roundingMethod: 'floor'
        })
      )

    const fullNameElement = await screen.findByText(textMatcher)
    const idElement = await screen.findByText(idMatcher)
    const ageElement = await screen.findByText(ageMatcher)

    expect(fullNameElement).toBeInTheDocument()
    expect(idElement).toBeInTheDocument()
    expect(ageElement).toBeInTheDocument()
  })

  test('The url matches the expected', async () => {
    render(<Profile patient={patient} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute('href', `/paciente/${patient.id}`)
  })

  test('Matches the snapshot', async () => {
    render(<Profile patient={patient} />)

    expect(await screen.findByTestId('profile-card')).toMatchSnapshot()
  })
})
