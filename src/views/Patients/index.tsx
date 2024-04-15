import Patients from '@components/organisms/Patients'
import { DoctorsLayout } from '@layouts/index'
import React from 'react'

export default function PatientsView() {
  return (
    <DoctorsLayout>
      <Patients />
    </DoctorsLayout>
  )
}
