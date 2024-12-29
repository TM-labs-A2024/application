import { patients } from '@src/constants'
import { render, screen, fireEvent, waitFor } from '@test/utils/index'

import '@testing-library/jest-dom'
import 'react-notifications-component'
import PatientsSearch from './PatientsSearch'

jest.mock('react-notifications-component')

const context = {
  approvedPatients: patients.filter((patient) => !patient.pending)
}

describe('Organisms > Search > PatientsSearch test', () => {
  test('The component shows the patients which match the entered criteria', () => {
    render(<PatientsSearch context={context} />)

    const input = screen.getByPlaceholderText('Buscar paciente')
    fireEvent.change(input, { target: { value: 'José Feliciano' } })

    expect(screen.getAllByText('José Feliciano Gutierrez García')).toHaveLength(7)
  })

  test('The component shows the filters if the filters button is clicked', () => {
    render(<PatientsSearch context={context} />)

    const button = screen.getByText('Filtros')
    fireEvent.click(button)

    expect(screen.getByText('Ingresar filtros')).toBeInTheDocument()
    expect(screen.getByText('Edad del paciente')).toBeInTheDocument()
    expect(screen.getByText('Aplicar filtros')).toBeInTheDocument()
    expect(screen.getByText('Quitar filtros')).toBeInTheDocument()
  })

  test('The component shows the patients which match the entered filters and shows the filters on top of the results', async () => {
    render(<PatientsSearch context={context} />)

    const button = screen.getByText('Filtros')
    fireEvent.click(button)

    const inputFrom = screen.getByPlaceholderText('Desde')
    fireEvent.change(inputFrom, { target: { value: '30' } })

    const inputTo = screen.getByPlaceholderText('Hasta')
    fireEvent.change(inputTo, { target: { value: '99' } })

    const submitButton = screen.getByText('Aplicar filtros')
    fireEvent.click(submitButton)

    const ages = ['30 años', '31 años', '32 años']

    await waitFor(() => {
      ages.forEach((age: string) => {
        const ageMatcher = (content: string) => content.includes(age)
        const ageElement = screen.getByText(ageMatcher)

        expect(ageElement).toBeInTheDocument()
      })
    })

    expect(screen.getByText('Desde: 30')).toBeInTheDocument()
    expect(screen.getByText('Hasta: 99')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<PatientsSearch context={context} />)

    expect(screen.getByTestId('patients-search')).toMatchSnapshot()
  })
})
