import { specialityData } from '@src/constants'
import { render, screen, fireEvent, waitFor } from '@test/utils/index'

import '@testing-library/jest-dom'
import 'react-notifications-component'
import SpecialitySearch from './SpecialitySearch'

jest.mock('react-notifications-component')

const context = {
  goBackRef: '',
  specialityData,
  isNurse: false,
  isPatient: true
}

describe('Organisms > Search > SpecialitySearch test', () => {
  test('The component shows the evolutions which match the entered criteria', () => {
    render(<SpecialitySearch context={context} />)

    const input = screen.getByPlaceholderText('ingresar criterio')
    fireEvent.change(input, { target: { value: 'Evolución 1' } })

    const titleMatcher = (content: string) => content.includes('Evolución 1')
    const titleElement = screen.getByText(titleMatcher)

    expect(titleElement).toBeInTheDocument()
  })

  test('The component shows the filters if the filters button is clicked', () => {
    render(<SpecialitySearch context={context} />)

    const button = screen.getByText('Filtros')
    fireEvent.click(button)

    expect(screen.getByText('Ingresar filtros')).toBeInTheDocument()
    expect(screen.getByText('Desde')).toBeInTheDocument()
    expect(screen.getByText('Hasta')).toBeInTheDocument()
    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.getByText('Aplicar filtros')).toBeInTheDocument()
    expect(screen.getByText('Quitar filtros')).toBeInTheDocument()
  })

  test('The component shows the evolutions which match the entered filters and shows the filters on top of the results', async () => {
    render(<SpecialitySearch context={context} />)

    const button = screen.getByText('Filtros')
    fireEvent.click(button)

    const inputFrom = screen.getByPlaceholderText('Desde')
    fireEvent.change(inputFrom, { target: { value: '2024-06-08' } })

    const submitButton = screen.getByText('Aplicar filtros')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getAllByTestId('evolutions-list')).toHaveLength(3)
    })

    expect(screen.getByText('Desde: 08/06/2024')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<SpecialitySearch context={context} />)

    expect(screen.getByTestId('speciality-search')).toMatchSnapshot()
  })
})
