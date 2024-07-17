import { render, screen } from '@test/utils'
import 'next/navigation'

import AddAttachment from './AddAttachment'
import '@testing-library/jest-dom'

jest.mock('next/navigation')

const props = {
  type: 'order',
  patientId: '1',
  specialty: '1'
}

const propsTest = {
  ...props,
  type: 'test'
}

describe('Molecules > Forms > AddAttachment test', () => {
  test('Depending of the type, the component shows the expected title for the orders form', () => {
    render(<AddAttachment {...props} />)

    expect(screen.getByText('Nueva orden médica')).toBeInTheDocument()
    expect(screen.queryByText('Nuevo análisis')).not.toBeInTheDocument()
  })

  test('Depending of the type, the component shows the expected title for the tests form', () => {
    render(<AddAttachment {...propsTest} />)

    expect(screen.queryByText('Nueva orden médica')).not.toBeInTheDocument()
    expect(screen.getByText('Nuevo análisis')).toBeInTheDocument()
  })

  test('Depending of the type, the component shows the placeholder text in the title input for the orders form', () => {
    render(<AddAttachment {...props} />)

    expect(screen.getByPlaceholderText('Titulo de la orden')).toBeInTheDocument()
  })

  test('Depending of the type, the component shows the placeholder text in the title input for the tests form', () => {
    render(<AddAttachment {...propsTest} />)

    expect(screen.getByPlaceholderText('Titulo del análisis')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<AddAttachment {...props} />)

    expect(screen.getByTestId('add-attachment-form')).toMatchSnapshot()
  })
})
