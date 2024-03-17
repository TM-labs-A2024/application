import EditPatientView from '@components/molecules/Forms/EditPatient'
import { patient } from '@constants/index'
import React from 'react'

export default function Patient() {
  return <EditPatientView patient={patient} />
}
