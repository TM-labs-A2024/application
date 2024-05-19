import Speciality from '@components/organisms/Speciality'
import { CardEvolution } from '@src/types'
import React from 'react'

export default function SpecialityView({
  context
}: {
  context: {
    isPatient: boolean
    isDoctor: boolean
    speciality: {
      id: number
      name: string
    }
    data: {
      evolutions: CardEvolution[]
      orders: CardEvolution[]
      tests: CardEvolution[]
    }
    currentTab: number
  }
}) {
  return <Speciality context={context} />
}
