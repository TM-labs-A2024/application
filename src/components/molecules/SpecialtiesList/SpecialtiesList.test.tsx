import { specialties } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import SpecialtiesList from './SpecialtiesList'

const props = {
  specialties,
  label: 'label'
}

describe('Molecules > SpecialtiesList test', () => {
  test('The component shows the label if the specialties list has at least one entry', () => {
    render(<SpecialtiesList {...props} />)

    expect(screen.getByText(props.label)).toBeInTheDocument()
  })

  test('The quantity of children is the expected', () => {
    render(<SpecialtiesList {...props} />)

    expect(screen.getAllByTestId('specialty-card')).toHaveLength(48)
  })

  test('Matches the snapshot', () => {
    render(<SpecialtiesList {...props} />)

    expect(screen.getByTestId('specialties-list')).toMatchSnapshot()
  })
})
