import { doctors } from '@constants/index'
import DoctorProfileView from '@src/views/DoctorProfile'
import React from 'react'

export default function DoctorProfile() {
  return <DoctorProfileView doctor={doctors[7]} />
}
