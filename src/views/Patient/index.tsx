import Patient from '@components/organisms/Patient'
import { PatientsLayout } from '@layouts/index'
import { Patient as PatientType } from '@src/types'
import React from 'react'

export default function PatientView({ patient }: { patient: PatientType }) {
  return (
    <PatientsLayout>
      <Patient patient={patient} />
    </PatientsLayout>
  )
}
