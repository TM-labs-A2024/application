import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Request from './Request'

const request = {
  href: '/institucion/medico/1000000',
  title: 'José Pérez',
  description: 'C.I: 1000000, Alergología.'
}

describe('Atoms > Cards > Request test', () => {
  test('The card shows the title and description of the request', async () => {
    render(<Request {...request} />)

    expect(await screen.findByText(request.title)).toBeInTheDocument()
    expect(await screen.findByText(request.description)).toBeInTheDocument()
  })

  test('The url matches the expected', async () => {
    render(<Request {...request} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute('href', request.href)
  })

  test('Matches the snapshot', async () => {
    render(<Request {...request} />)

    expect(await screen.findByTestId('request-card')).toMatchSnapshot()
  })
})
