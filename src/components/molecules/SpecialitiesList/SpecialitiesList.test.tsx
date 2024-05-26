import { specialities } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import SpecialitiesList from './SpecialitiesList'

const props = {
  specialities,
  label: 'label'
}

describe('Molecules > SpecialitiesList test', () => {
  test('The component shows the label if the specialities list has at least one entry', () => {
    render(<SpecialitiesList {...props} />)

    expect(screen.getByText(props.label)).toBeInTheDocument()
  })

  test('The quantity of children is the expected', () => {
    render(<SpecialitiesList {...props} />)

    expect(screen.getAllByTestId('speciality-card')).toHaveLength(48)
  })

  test('Matches the snapshot', () => {
    render(<SpecialitiesList {...props} />)

    expect(screen.getByTestId('specialities-list')).toMatchSnapshot()
  })
})
