import Patient from '@src/components/organisms/Patient'
import { Patient as PatientType } from '@src/types'
import React from 'react'

export default function PatientView({ patient }: { patient: PatientType }) {
  return patient && <Patient patient={patient} />
}
