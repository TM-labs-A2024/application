import { render, screen } from '@test/utils/index'

import '@testing-library/jest-dom'
import Patient from './Patient'

const patient = {
  href: '/evolucion/3fa85f64-5717-4562-b3fc-2c963f66afa5/1/1',
  title: 'Evolución 1: 17, septiembre 2024',
  description: 'Editado por: Pedro Pérez',
  status: 'Hospitalizado'
}

const notHospizatlizedPatient = {
  href: '/evolucion/3fa85f64-5717-4562-b3fc-2c963f66afa5/1/1',
  title: 'Evolución 1: 17, septiembre 2024',
  description: 'Editado por: Pedro Pérez',
  status: ''
}

describe('Atoms > Cards > Patient test', () => {
  test('The card shows the title, description and status of the patient', async () => {
    render(<Patient {...patient} />)

    expect(await screen.findByText(patient.title)).toBeInTheDocument()
    expect(await screen.findByText(patient.description)).toBeInTheDocument()
    expect(await screen.findByText(patient.status)).toBeInTheDocument()
  })

  test("The card doesn't show the status of the patient if not hospitalized", async () => {
    render(<Patient {...notHospizatlizedPatient} />)

    expect(await screen.findByText(notHospizatlizedPatient.title)).toBeInTheDocument()
    expect(await screen.findByText(notHospizatlizedPatient.description)).toBeInTheDocument()
    expect(screen.queryByText(patient.status)).not.toBeInTheDocument()
  })

  test('The url matches the expected', async () => {
    render(<Patient {...patient} />)

    const enlace = await screen.findByRole('link')
    expect(enlace).toHaveAttribute('href', patient.href)
  })

  test('Matches the snapshot', async () => {
    render(<Patient {...patient} />)

    expect(await screen.findByTestId('patient-card')).toMatchSnapshot()
  })
})
