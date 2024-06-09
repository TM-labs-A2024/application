import { specialities } from '@src/constants'
import { render, screen, fireEvent } from '@test/utils/index'

import '@testing-library/jest-dom'
import 'react-notifications-component'
import SpecialitiesSearch from './SpecialitiesSearch'

jest.mock('react-notifications-component')

const context = {
  specialities
}

describe('Organisms > Search > SpecialitiesSearch test', () => {
  test('The component shows the specialities which match the entered criteria', () => {
    render(<SpecialitiesSearch context={context} />)

    const input = screen.getByPlaceholderText('Buscar especialidad')
    fireEvent.change(input, { target: { value: 'Alergología' } })

    expect(screen.getAllByText('Alergología')).toHaveLength(1)
  })

  test('Matches the snapshot', () => {
    render(<SpecialitiesSearch context={context} />)

    expect(screen.getByTestId('specialities-search')).toMatchSnapshot()
  })
})
