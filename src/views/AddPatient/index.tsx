import AddPatient from '@components/organisms/AddPatient'
import { PatientsLayout } from '@layouts/index'
import { Patient } from '@src/types'
import React from 'react'

export default function AddPatientView({
  context
}: {
  context: {
    onChange: (id: string) => void
    filteredPatients: Patient[] | []
    onSubmit: () => void
  }
}) {
  return (
    <PatientsLayout>
      <AddPatient context={context} />
    </PatientsLayout>
  )
}
