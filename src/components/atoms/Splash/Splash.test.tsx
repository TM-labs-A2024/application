import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Splash from './Splash'

describe('Atoms > Splash test', () => {
  test('Matches the snapshot', () => {
    render(<Splash />)

    expect(screen.getByTestId('splash-screen')).toMatchSnapshot()
  })
})
