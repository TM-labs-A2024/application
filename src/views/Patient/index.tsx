import Patient from '@components/organisms/Patient'
import { PatientsLayout } from '@layouts/index'
import React from 'react'

export default function PatientView({
  patient
}: {
  patient: {
    id: number
    firstname: string
    lastname: string
    birthdate: string
    email: string
    phone: string
  }
}) {
  return (
    <PatientsLayout>
      <Patient patient={patient} />
    </PatientsLayout>
  )
}
