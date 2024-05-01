import DoctorProfile from '@components/organisms/DoctorProfile'
import { DoctorsLayout } from '@layouts/index'
import { Doctor } from '@src/types'
import React from 'react'

export default function DoctorProfileView({ doctor }: { doctor: Doctor }) {
  return (
    <DoctorsLayout>
      <DoctorProfile doctor={doctor} />
    </DoctorsLayout>
  )
}
