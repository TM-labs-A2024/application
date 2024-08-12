import PatientsSearch from '@components/organisms/Search/Patients'
import { Patient, Institution } from '@src/types'
import React from 'react'

export default function PatientsSearchView({
  context
}: {
  context: {
    approvedPatients: Patient[]
    institutionsData: Institution[]
  }
}) {
  return <PatientsSearch context={context} />
}
