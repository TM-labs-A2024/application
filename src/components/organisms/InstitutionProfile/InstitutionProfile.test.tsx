import { institution } from '@constants/index'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import InstitutionProfile from './InstitutionProfile'
import 'next/navigation'

jest.mock('next/navigation')

describe('Organisms > InstitutionProfile test', () => {
  test('The component shows the credentials, address, email and phone of the institution', () => {
    render(<InstitutionProfile institution={institution} />)

    const credentialsMatcher = (content: string) => content.includes(institution.credentials)
    const institutionCredentials = screen.getByText(credentialsMatcher)

    expect(institutionCredentials).toBeInTheDocument()
    expect(screen.getByText(institution.address)).toBeInTheDocument()
    expect(screen.getByText(institution.email)).toBeInTheDocument()
    expect(screen.getByText(institution.phone)).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<InstitutionProfile institution={institution} />)

    expect(screen.getByTestId('institution-profile')).toMatchSnapshot()
  })
})
