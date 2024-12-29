import SpecialtySearch from '@src/components/organisms/Search/Specialty'
import { Evolutions } from '@src/types'
import React from 'react'

export default function SpecialtySearchView({
  context
}: {
  context: {
    goBackRef: string
    specialtyData: {
      evolutions?: Evolutions
      orders?: Evolutions
      tests?: Evolutions
    }
    isNurse: boolean
    isPatient: boolean
    patientId?: string | false
    specialtyId?: string
  }
}) {
  return <SpecialtySearch context={context} />
}
