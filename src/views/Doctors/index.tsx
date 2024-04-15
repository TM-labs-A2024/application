import Doctors from '@components/organisms/Doctors'
import { PatientsLayout } from '@layouts/index'
import React from 'react'

export default function DoctorsView() {
  return (
    <PatientsLayout>
      <Doctors />
    </PatientsLayout>
  )
}
