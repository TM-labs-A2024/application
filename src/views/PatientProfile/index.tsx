import { PatientsLayout } from '@layouts/index'
import PatientProfile from '@src/components/organisms/PatientProfile'
import { Patient as PatientType } from '@src/types'
import React from 'react'

export default function PatientProfileView({ patient }: { patient: PatientType }) {
  return (
    <PatientsLayout>
      <PatientProfile patient={patient} />
    </PatientsLayout>
  )
}
