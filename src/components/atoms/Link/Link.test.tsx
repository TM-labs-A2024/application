import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Link from './Link'

const props = {
  href: '/evolucion/3fa85f64-5717-4562-b3fc-2c963f66afa5/1/1'
}

const component = (
  <Link {...props}>
    <div>Child</div>
  </Link>
)

describe('Atoms > Link test', () => {
  test('The url matches the expected', async () => {
    render(component)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute('href', props.href)
  })

  test('The children of the component are the expected ones', async () => {
    render(component)

    expect(await screen.findByText('Child')).toBeInTheDocument()
  })

  test('Matches the snapshot', async () => {
    render(component)

    expect(await screen.findByTestId('link-component')).toMatchSnapshot()
  })
})
