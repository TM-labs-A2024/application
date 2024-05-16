import Patients from '@components/organisms/Patients'
import { DoctorsLayout } from '@layouts/index'
import { PatientSummary } from '@src/types'
import React from 'react'

export default function PatientsView({
  context
}: {
  context: {
    pendingPatients: PatientSummary[]
    approvedPatients: PatientSummary[]
  }
}) {
  return (
    <DoctorsLayout>
      <Patients context={context} />
    </DoctorsLayout>
  )
}
