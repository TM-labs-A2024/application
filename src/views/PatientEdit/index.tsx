import PatientEdit from '@components/molecules/Forms/EditPatient'
import { Patient as PatientType } from '@src/types'
import React from 'react'

export default function PatientEditView({
  context
}: {
  context: { patient: PatientType; onSubmit: (patient: PatientType) => void }
}) {
  return <PatientEdit context={context} />
}
