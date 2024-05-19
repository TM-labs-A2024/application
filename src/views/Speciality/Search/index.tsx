import SpecialitySearch from '@components/organisms/Search/Speciality'
import { Evolutions } from '@src/types'
import React from 'react'

export default function SpecialitySearchView({
  context
}: {
  context: {
    goBackRef: string
    specialityData: {
      evolutions: Evolutions
      orders: Evolutions
      tests: Evolutions
    }
    isNurse: boolean
    isPatient: boolean
    patientId?: string | false
    specialityId?: string
  }
}) {
  return <SpecialitySearch context={context} />
}
