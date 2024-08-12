import Specialty from '@src/components/organisms/Specialty'
import { CardEvolution } from '@src/types'
import React from 'react'

export default function SpecialtyView({
  context
}: {
  context: {
    isPatient: boolean
    isDoctor: boolean
    specialty: {
      id: string
      name: string
    }
    data: {
      evolutions?: CardEvolution[]
      orders?: CardEvolution[]
      tests?: CardEvolution[]
    }
    currentTab: number
  }
}) {
  return <Specialty context={context} />
}
