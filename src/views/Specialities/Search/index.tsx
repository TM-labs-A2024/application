import SpecialitiesSearch from '@components/organisms/Search/Specialities'
import { Patient } from '@src/types'
import React from 'react'

export default function SpecialitiesSearchVie({
  context
}: {
  context: {
    specialities: {
      id: number
      name: string
    }[]
    patient?: Patient
  }
}) {
  return <SpecialitiesSearch context={context} />
}
