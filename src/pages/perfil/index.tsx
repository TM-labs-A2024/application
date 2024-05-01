import { patient, doctors } from '@constants/index'
import { getSession } from '@shared/index'
import DoctorProfileView from '@src/views/DoctorProfile'
import PatientProfileView from '@src/views/PatientProfile'
import React from 'react'

export default function PatientProfile() {
  const isDoctor = getSession() === 'doctor'

  return isDoctor ? (
    <DoctorProfileView doctor={doctors[7]} />
  ) : (
    <PatientProfileView patient={patient} />
  )
}
