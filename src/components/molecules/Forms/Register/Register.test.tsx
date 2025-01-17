import { render, screen } from '@test/utils/index'
import 'next/navigation'

import Register from './Register'
import '@testing-library/jest-dom'

jest.mock('next/navigation')

describe('Molecules > Forms > Register test', () => {
  const context = {
    createPatient: jest.fn(),
    createDoctor: jest.fn(),
    createNurse: jest.fn(),
    verificationCode: '',
    userCreated: false,
    isLoading: false,
    institutionsData: [],
    specialtiesData: []
  }

  test('The component requires the fields for a patient in step 1', () => {
    render(<Register context={context} />)

    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nombres')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Apellidos')).toBeInTheDocument()
    expect(screen.getByText('Sexo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Cédula')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Fecha de nacimiento')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Teléfono')).toBeInTheDocument()
  })

  test('Step 1 matches the snapshot', () => {
    render(<Register context={context} />)

    expect(screen.getByTestId('register-step-1')).toMatchSnapshot('register-step-1')
  })
})
