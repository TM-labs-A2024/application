import { render, screen, fireEvent } from '@test/utils/index'

import '@testing-library/jest-dom'
import Input from './Input'

const props = {
  placeholder: 'Placeholder text',
  label: 'Label',
  className: '',
  disabled: false,
  id: ''
}

const disabledProps = {
  ...props,
  disabled: true
}

describe('Atoms > Input test', () => {
  test('The component shows the expected label', async () => {
    render(<Input {...props} />)

    expect(await screen.findByText(props.label)).toBeInTheDocument()
  })

  test("The component shows the placeholder text when it's empty", () => {
    render(<Input {...props} />)

    expect(screen.getByPlaceholderText(props.placeholder)).toBeInTheDocument()
  })

  test('The component shows the written text when receiving input', () => {
    render(<Input {...props} />)

    const input = screen.getByPlaceholderText(props.placeholder) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Test text' } })

    expect(input.value).toBe('Test text')
  })

  test('The component is disabled when the disabled prop is true', async () => {
    render(<Input {...disabledProps} />)

    expect(screen.getByPlaceholderText(disabledProps.placeholder)).toBeDisabled()
  })

  test('Matches the snapshot', async () => {
    render(<Input {...props} />)

    expect(await screen.findByTestId('input-component')).toMatchSnapshot()
  })
})
