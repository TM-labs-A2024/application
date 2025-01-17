import { render, screen } from '@test/utils'
import 'next/navigation'

import AddEvolution from './AddEvolution'
import '@testing-library/jest-dom'

jest.mock('next/navigation')

describe('Molecules > Forms > AddEvolution test', () => {
  const context = {
    onSubmit: jest.fn(),
    isLoading: false
  }

  test('The component requires the fields: Type, reason, description, history, examination and comments', () => {
    render(<AddEvolution context={context} />)

    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Patología')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción (Notas evolutivas)')).toBeInTheDocument()
    expect(screen.getByLabelText('Antecedentes')).toBeInTheDocument()
    expect(screen.getByLabelText('Exámenes físicos')).toBeInTheDocument()
    expect(screen.getByLabelText('Comentarios')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<AddEvolution context={context} />)

    expect(screen.getByTestId('add-evolution-form')).toMatchSnapshot()
  })
})
