import Doctors from '@components/organisms/Doctors'
import { PatientsLayout } from '@layouts/index'
import { Doctor as DoctorType, ReactSelectOption } from '@src/types'
import React from 'react'

export default function DoctorsView({
  context
}: {
  context: {
    doctors: (DoctorType | undefined)[]
    pendingDoctors: (DoctorType | undefined)[]
    specialties: ReactSelectOption[]
  }
}) {
  return (
    <PatientsLayout>
      <Doctors context={context} />
    </PatientsLayout>
  )
}
