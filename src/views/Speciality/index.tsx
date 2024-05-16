import Speciality from '@components/organisms/Speciality'
import { Evolutions } from '@src/types'
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
      evolutions: Evolutions
      orders: Evolutions
      tests: Evolutions
    }
    currentTab: number
  }
}) {
  return <Speciality context={context} />
}
