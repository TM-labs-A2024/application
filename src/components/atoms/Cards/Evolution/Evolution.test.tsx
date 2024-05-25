import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Evolution from './Evolution'

const evolution = {
  href: '/evolucion/3fa85f64-5717-4562-b3fc-2c963f66afa5/1/1',
  title: 'Evolución 1: 17, septiembre 2024',
  description: 'Editado por: Pedro Pérez',
  comment: 'Patología: Dolor'
}

describe('Atoms > Cards > Evolution test', () => {
  test('The card shows the title, description and comments of the evolution', async () => {
    render(<Evolution {...evolution} />)

    expect(await screen.findByText(evolution.title)).toBeInTheDocument()
    expect(await screen.findByText(evolution.description)).toBeInTheDocument()
    expect(await screen.findByText(evolution.comment)).toBeInTheDocument()
  })

  test('The url matches the expected', async () => {
    render(<Evolution {...evolution} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute('href', evolution.href)
  })

  test('Matches the snapshot', async () => {
    render(<Evolution {...evolution} />)

    expect(await screen.findByTestId('evolution-card')).toMatchSnapshot()
  })
})
