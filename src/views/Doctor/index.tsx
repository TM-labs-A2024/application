import Doctor from '@components/organisms/Doctor'
import { Doctor as DoctorType } from '@src/types'
import React from 'react'

export default function DoctorView({ doctor }: { doctor: DoctorType }) {
  return <Doctor doctor={doctor} />
}
