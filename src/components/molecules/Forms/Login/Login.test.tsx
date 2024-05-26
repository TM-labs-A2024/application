import { render, screen } from '@test/utils'

import Login from './Login'
import '@testing-library/jest-dom'

describe('Molecules > Forms > Login test', () => {
  test('The component requires the fields: Email and password', () => {
    render(<Login isLoading={false} />)

    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
  })

  test('The component shows the respective placeholder', () => {
    render(<Login isLoading={false} />)

    expect(screen.getByPlaceholderText('Introduzca su correo electrónico')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Introduzca su contraseña')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Login isLoading={false} />)

    expect(screen.getByTestId('login-form')).toMatchSnapshot()
  })
})
