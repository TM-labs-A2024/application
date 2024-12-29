import SpecialtiesSearch from '@components/organisms/Search/Specialties'
import { Patient } from '@src/types'
import React from 'react'

export default function SpecialtiesSearchVie({
  context
}: {
  context: {
    specialties: {
      id: string
      name: string
    }[]
    patient?: Patient
  }
}) {
  return <SpecialtiesSearch context={context} />
}
