import { render, screen } from '@test/utils'

import Login from './Login'
import '@testing-library/jest-dom'

describe('Molecules > Forms > Login test', () => {
  const context = {
    type: 'patient',
    loginPatient: jest.fn(),
    loginDoctor: jest.fn(),
    loginNurse: jest.fn(),
    isLoading: false
  }

  test('The component requires the fields: Email and password', () => {
    render(<Login context={context} />)

    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
  })

  test('The component shows the respective placeholder', () => {
    render(<Login context={context} />)

    expect(screen.getByPlaceholderText('Introduzca su correo electrónico')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Introduzca su contraseña')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Login context={context} />)

    expect(screen.getByTestId('login-form')).toMatchSnapshot()
  })
})
