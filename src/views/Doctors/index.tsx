import Doctors from '@components/organisms/Doctors'
import { PatientsLayout } from '@layouts/index'
import { Doctor as DoctorType } from '@src/types'
import React from 'react'

export default function DoctorsView({
  context
}: {
  context: { doctors: DoctorType[]; pendingDoctors: DoctorType[] }
}) {
  return (
    <PatientsLayout>
      <Doctors context={context} />
    </PatientsLayout>
  )
}
