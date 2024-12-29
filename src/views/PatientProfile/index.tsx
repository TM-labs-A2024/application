import { PatientsLayout } from '@layouts/index'
import PatientProfile from '@src/components/organisms/PatientProfile'
import { Patient as PatientType } from '@src/types'
import React from 'react'

export default function PatientProfileView({
  patient,
  onLogout
}: {
  patient: PatientType
  onLogout?: () => void
}) {
  return (
    <PatientsLayout>
      <PatientProfile patient={patient} onLogout={onLogout} />
    </PatientsLayout>
  )
}
