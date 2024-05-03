import AddPatient from '@components/organisms/AddPatient'
import { PatientsLayout } from '@layouts/index'
import React from 'react'

export default function AddPatientView() {
  return (
    <PatientsLayout>
      <AddPatient />
    </PatientsLayout>
  )
}
