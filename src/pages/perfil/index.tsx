import { patient } from '@constants/index'
import PatientView from '@views/Patient'
import React from 'react'

export default function Patient() {
  return <PatientView patient={patient} />
}
