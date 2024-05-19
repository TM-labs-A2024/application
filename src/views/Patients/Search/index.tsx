import PatientsSearch from '@components/organisms/Search/Patients'
import { Patient } from '@src/types'
import React from 'react'

export default function PatientsSearchView({
  context
}: {
  context: {
    approvedPatients: Patient[]
  }
}) {
  return <PatientsSearch context={context} />
}
