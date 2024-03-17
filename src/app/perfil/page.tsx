import PatientView from '@components/organisms/Patient'
import { patient } from '@constants/index'
import React from 'react'

export default function Patient() {
  return <PatientView patient={patient} />
}
