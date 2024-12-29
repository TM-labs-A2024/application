import { specialties, specialtyData } from '@constants/index'
import { render, screen } from '@test/utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

import '@testing-library/jest-dom'
import Specialty from './Specialty'
import 'next/navigation'
import 'next/router'

jest.mock('next/navigation')
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '#',
    push: jest.fn(),
    query: {
      slug: ['3fa85f64-5717-4562-b3fc-2c963f66afa4']
    }
  })
}))

const patientData = {
  evolutions: specialtyData.evolutions.map(({ id, date, type, author, reason }) => ({
    href: `/evolucion/1/${id}`,
    title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
      locale: es
    })}`,
    description: `Editado por: ${author}`,
    comment: `Patología: ${reason}`
  })),
  orders: specialtyData.orders.map(({ id, title, date, author }) => ({
    href: `/orden/1/${id}`,
    title,
    description: `${format(new Date(date), 'dd, MMMM yyyy', {
      locale: es
    })}`,
    comment: `Agregado por: ${author}`
  })),
  tests: specialtyData.tests.map(({ id, title, date, author }) => ({
    href: `/analisis/1/${id}`,
    title,
    description: `${format(new Date(date), 'dd, MMMM yyyy', {
      locale: es
    })}`,
    comment: `Agregado por: ${author}`
  }))
}

const patientContext = {
  isPatient: true,
  isDoctor: false,
  specialty: specialties[0],
  data: patientData,
  currentTab: 0
}

const nurseContext = {
  isPatient: false,
  isDoctor: false,
  specialty: specialties[0],
  data: patientData,
  currentTab: 0
}

const emptyData = {
  evolutions: [],
  orders: [],
  tests: []
}

const emptyContext = {
  isPatient: true,
  isDoctor: false,
  specialty: specialties[0],
  data: emptyData,
  currentTab: 0
}

const doctorData = {
  evolutions: specialtyData.evolutions.map(({ id, date, type, author, reason }) => ({
    href: `/evolucion/3fa85f64-5717-4562-b3fc-2c963f66afa4/1/${id}`,
    title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
      locale: es
    })}`,
    description: `Editado por: ${author}`,
    comment: `Patología: ${reason}`
  })),
  orders: specialtyData.orders.map(({ id, title, date, author }) => ({
    href: `/orden/3fa85f64-5717-4562-b3fc-2c963f66afa4/1/${id}`,
    title,
    description: `${format(new Date(date), 'dd, MMMM yyyy', {
      locale: es
    })}`,
    comment: `Agregado por: ${author}`
  })),
  tests: specialtyData.tests.map(({ id, title, date, author }) => ({
    href: `/analisis/3fa85f64-5717-4562-b3fc-2c963f66afa4/1/${id}`,
    title,
    description: `${format(new Date(date), 'dd, MMMM yyyy', {
      locale: es
    })}`,
    comment: `Agregado por: ${author}`
  }))
}

const doctorContext = {
  isPatient: false,
  isDoctor: true,
  specialty: specialties[0],
  data: doctorData,
  currentTab: 0
}

describe('Organisms > Specialties test', () => {
  test('The component shows the evolutions list', () => {
    render(<Specialty context={patientContext} />)

    expect(screen.getByText(patientData.evolutions[0].title)).toBeInTheDocument()
  })

  test('The component shows the orders list if it has at least one item', () => {
    render(<Specialty context={patientContext} />)

    expect(screen.getByText(patientData.orders[0].title)).toBeInTheDocument()
  })

  test('The component shows the tests list if it has at least one item', () => {
    render(<Specialty context={patientContext} />)

    expect(screen.getByText(patientData.tests[0].title)).toBeInTheDocument()
  })

  test('The component shows the empty state if the specialties states is empty', () => {
    render(<Specialty context={emptyContext} />)

    expect(screen.getByTestId('orders-empty-state')).toBeInTheDocument()
  })

  test('The component shows the empty state if the specialties states is empty', () => {
    render(<Specialty context={emptyContext} />)

    expect(screen.getByTestId('tests-empty-state')).toBeInTheDocument()
  })

  test("If the component is rendered in the patient's flow, it doesn't show the create evolution, order and test buttons", () => {
    render(<Specialty context={patientContext} />)

    expect(screen.queryByText('Nueva evolución')).not.toBeInTheDocument()
    expect(screen.queryByText('Nueva orden')).not.toBeInTheDocument()
    expect(screen.queryByText('Nuevo análisis')).not.toBeInTheDocument()
  })

  test("If the component is rendered in the dcotors's flow, it does show the create evolution button", () => {
    render(<Specialty context={doctorContext} />)

    expect(screen.getByText('Nueva evolución')).toBeInTheDocument()
  })

  test("If the component is rendered in the dcotors's flow, it does show the create order button", () => {
    render(<Specialty context={{ ...doctorContext, currentTab: 1 }} />)

    expect(screen.getByText('Nueva orden')).toBeInTheDocument()
  })

  test("If the component is rendered in the dcotors's flow, it does show the create test button", () => {
    render(<Specialty context={{ ...doctorContext, currentTab: 2 }} />)

    expect(screen.getByText('Nuevo análisis')).toBeInTheDocument()
  })

  test("If the component is rendered in the nuerses' flow, it only shows the orders list", () => {
    render(<Specialty context={nurseContext} />)

    expect(screen.queryByText('Evoluciones')).not.toBeInTheDocument()
    expect(screen.queryByText('Análisis')).not.toBeInTheDocument()
    expect(screen.getByText('Ordenes médicas')).toBeInTheDocument()
  })

  test('Matches the snapshot', () => {
    render(<Specialty context={patientContext} />)

    expect(screen.getByTestId('specialty')).toMatchSnapshot()
  })
})
