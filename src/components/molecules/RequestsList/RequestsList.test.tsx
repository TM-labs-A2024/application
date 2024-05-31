import { doctors, specialities as specialitiesList } from '@src/constants'
import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import RequestsList from './RequestsList'

const formatedRequests = doctors.map(({ id, firstname, lastname, specialities }) => ({
  href: `/institucion/medico/${id}`,
  title: `${firstname} ${lastname}`,
  description: `C.I: ${id},${specialities.map((speciality) => ' ' + specialitiesList.find((el) => el.id === speciality)?.name)}.`
}))

const props = {
  requests: formatedRequests,
  label: 'label'
}

describe('Molecules > RequestsList test', () => {
  test('The component shows the label if the requests list has at least one entry', () => {
    render(<RequestsList {...props} />)

    expect(screen.getByText(props.label)).toBeInTheDocument()
  })

  test('The quantity of children is the expected', () => {
    render(<RequestsList {...props} />)

    expect(screen.getAllByTestId('request-card')).toHaveLength(48)
  })

  test('Matches the snapshot', () => {
    render(<RequestsList {...props} />)

    expect(screen.getByTestId('requests-list')).toMatchSnapshot()
  })
})