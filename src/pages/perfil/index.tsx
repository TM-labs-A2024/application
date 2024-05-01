import { patient } from '@constants/index'
import PatientProfileView from '@src/views/PatientProfile'
import React from 'react'

export default function PatientProfile() {
  return <PatientProfileView patient={patient} />
}
