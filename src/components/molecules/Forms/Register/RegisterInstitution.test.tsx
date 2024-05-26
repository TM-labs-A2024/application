import { render, screen } from '@test/utils/index'
import 'next/navigation'

import RegisterInstitution from './RegisterInstitution'
import '@testing-library/jest-dom'

jest.mock('next/navigation')

describe('Molecules > Forms > RegisterInstitution test', () => {
  test('The component requires the fields for a patient in step 1', () => {
    render(<RegisterInstitution />)

    expect(screen.getByPlaceholderText('Nombre de la institución')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('RIF')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Credenciales')).toBeInTheDocument()
    expect(screen.getByText('Tipo de institución')).toBeInTheDocument()
  })

  test('Step 1 matches the snapshot', () => {
    render(<RegisterInstitution />)

    expect(screen.getByTestId('register-institution-step-1')).toMatchSnapshot(
      'register-institution-step-1'
    )
  })
})
