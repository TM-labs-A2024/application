import { render, screen, fireEvent } from '@test/utils/index'

import '@testing-library/jest-dom'
import Attachments from './Attachments'
import 'next/navigation'

import '@testing-library/jest-dom'

jest.mock('next/navigation')

const context = {
  goBackRef: '#',
  title: 'title',
  data: {
    description: 'description',
    attachments: [
      { url: 'https://cdn.pixabay.com/photo/2020/02/02/16/06/arm-4813365_1280.jpg', alt: 'x-ray' }
    ]
  },
  isPatient: false,
  isDoctor: true,
  isOpen: false,
  description: 'description',
  onClose: () => null,
  onDeleteClick: (type: string) => type,
  onSubmit: () => null
}

describe('Organisms > Attachments test', () => {
  test('If the component is rendered in the doctors flow, it shows the deletion buttons', () => {
    render(<Attachments context={context} />)

    expect(screen.getByTestId('delete-button')).toBeInTheDocument()
    expect(screen.getByTestId('delete-image-button')).toBeInTheDocument()
  })

  test('When clicking on the deletion button, the respective confirmation modal is shown', () => {
    render(<Attachments context={context} />)

    const deletionButton = screen.getByTestId('delete-button')
    fireEvent.click(deletionButton)

    expect(screen.getByText(context.description)).toBeInTheDocument()
  })

  test('When clicking on the attachment deletion button, the respective confirmation modal is shown', () => {
    render(<Attachments context={context} />)

    const deletionButton = screen.getByTestId('delete-image-button')
    fireEvent.click(deletionButton)

    expect(screen.getByText(context.description)).toBeInTheDocument()
  })

  test('The component renders the description and images given', () => {
    render(<Attachments context={context} />)

    expect(screen.getByText(context.data.description)).toBeInTheDocument()
    context.data.attachments.forEach((attachment) => {
      expect(screen.getByAltText(attachment.alt)).toBeInTheDocument()
    })
  })

  test('Matches the snapshot', () => {
    render(<Attachments context={context} />)

    expect(screen.getByTestId('attachments')).toMatchSnapshot()
  })
})
