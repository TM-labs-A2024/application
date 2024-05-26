import { specialityData } from '@src/constants'
import { render, screen } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import EvolutionsList from './EvolutionsList'

const props = specialityData.evolutions.map(({ id, date, type, author, reason }) => ({
  href: `/evolucion/1/${id}`,
  title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
    locale: es
  })}`,
  description: `Editado por: ${author}`,
  comment: `Patología: ${reason}`
}))

describe('Molecules > EvolutionsList test', () => {
  test('The quantity of children is the expected', () => {
    render(<EvolutionsList evolutions={props} />)

    expect(screen.getAllByTestId('evolution-card')).toHaveLength(9)
  })

  test('Matches the snapshot', () => {
    render(<EvolutionsList evolutions={props} />)

    expect(screen.getByTestId('evolutions-list')).toMatchSnapshot()
  })
})
