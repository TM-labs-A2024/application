import { patient } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Evolution from './Evolution'
import 'next/navigation'

jest.mock('next/navigation')

const props = {
  goBackRef: '#',
  title: 'Evolution title',
  data: [
    {
      title: 'Item 1',
      content: 'Content 1'
    },
    {
      title: 'Item 2',
      content: 'Content 2'
    }
  ]
}

const propsWithPatient = {
  ...props,
  patient
}

describe('Organisms > Evolution test', () => {
  test("The component shows the evolution's title", () => {
    render(<Evolution {...props} />)

    expect(screen.getByText('Evolution title')).toBeInTheDocument()
  })

  test("The component shows the evolution's fields given", () => {
    render(<Evolution {...props} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  test("The component shows the patient's profile card if there's a patient given", () => {
    render(<Evolution {...propsWithPatient} />)

    expect(screen.getByTestId('profile-card')).toBeInTheDocument()
  })

  test("The component doesn't show the patient's profile card if there's a patient given", () => {
    render(<Evolution {...props} />)

    expect(screen.queryByTestId('profile-card')).not.toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Evolution {...propsWithPatient} />)

    expect(screen.getByTestId('evolution')).toMatchSnapshot()
  })
})
