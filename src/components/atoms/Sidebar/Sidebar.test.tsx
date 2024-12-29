import { render, screen } from '@test/utils/index'
import react from 'react'

import '@testing-library/jest-dom'
import Sidebar from './Sidebar'

const props = {
  isOpen: true,
  onClose: () => null,
  innerRef: react.createRef<HTMLButtonElement>()
}

const invisibleProps = {
  ...props,
  isOpen: false
}

const component = (
  <Sidebar {...props}>
    <div>Child</div>
  </Sidebar>
)

const componentNotVisible = (
  <Sidebar {...invisibleProps}>
    <div>Child</div>
  </Sidebar>
)

describe('Atoms > Sidebar test', () => {
  test('The component is visible when the isOpen prop is true', () => {
    render(component)

    expect(screen.getByRole('dialog')).toBeVisible()
  })

  test('The component is not visible when the isOpen prop is false', () => {
    render(componentNotVisible)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('The children of the component are the expected ones', async () => {
    render(component)

    expect(await screen.findByText('Child')).toBeInTheDocument()
  })

  test('Matches the snapshot', async () => {
    render(component)

    expect(await screen.findByRole('dialog')).toMatchSnapshot()
  })
})
