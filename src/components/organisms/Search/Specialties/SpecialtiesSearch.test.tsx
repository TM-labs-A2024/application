import { specialties } from '@src/constants'
import { render, screen, fireEvent } from '@test/utils/index'

import '@testing-library/jest-dom'
import 'react-notifications-component'
import SpecialtiesSearch from './SpecialtiesSearch'

jest.mock('react-notifications-component')

const context = {
  specialties
}

describe('Organisms > Search > SpecialtiesSearch test', () => {
  test('The component shows the specialties which match the entered criteria', () => {
    render(<SpecialtiesSearch context={context} />)

    const input = screen.getByPlaceholderText('Buscar especialidad')
    fireEvent.change(input, { target: { value: 'Alergología' } })

    expect(screen.getAllByText('Alergología')).toHaveLength(1)
  })

  test('Matches the snapshot', () => {
    render(<SpecialtiesSearch context={context} />)

    expect(screen.getByTestId('specialties-search')).toMatchSnapshot()
  })
})
