import { render, screen, fireEvent } from '@test/utils/index'

import '@testing-library/jest-dom'
import SearchInput from './SearchInput'

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

describe('Atoms > SearchInput test', () => {
  test("The component shows the placeholder text when it's empty", () => {
    render(<SearchInput {...props} />)

    expect(screen.getByPlaceholderText(props.placeholder)).toBeInTheDocument()
  })

  test('The component shows the written text when receiving input', () => {
    render(<SearchInput {...props} />)

    const input = screen.getByPlaceholderText(props.placeholder) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Test text' } })

    expect(input.value).toBe('Test text')
  })

  test('The component is disabled when the disabled prop is true', async () => {
    render(<SearchInput {...disabledProps} />)

    expect(screen.getByPlaceholderText(disabledProps.placeholder)).toBeDisabled()
  })

  test('Matches the snapshot', async () => {
    render(<SearchInput {...props} />)

    expect(await screen.findByTestId('search-input-component')).toMatchSnapshot()
  })
})
