import Speciality from '@components/organisms/Speciality'
import { Evolutions } from '@src/types'
import React from 'react'

export default function SpecialityView({
  isPatient,
  speciality,
  data,
  currentTab
}: {
  isPatient: boolean
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
}) {
  return (
    <Speciality isPatient={isPatient} speciality={speciality} data={data} currentTab={currentTab} />
  )
}
