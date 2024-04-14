import Speciality from '@components/organisms/Speciality'
import { Evolution } from '@src/types'
import React from 'react'

export default function SpecialityView({
  speciality,
  data,
  currentTab
}: {
  speciality: {
    id: number
    name: string
  }
  data: {
    evolutions: Evolution
    orders: Evolution
    tests: Evolution
  }
  currentTab: number
}) {
  return <Speciality speciality={speciality} data={data} currentTab={currentTab} />
}
