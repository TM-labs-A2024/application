import AddPatient from '@components/organisms/AddPatient'
import { DoctorsLayout } from '@layouts/index'
import { Patient } from '@src/types'
import React from 'react'

export default function AddPatientView({
  context
}: {
  context: {
    onChange: (id: string) => void
    filteredPatients: Patient[] | []
    onSubmit: (id: string) => void
    loadingId: string
  }
}) {
  return (
    <DoctorsLayout>
      <AddPatient context={context} />
    </DoctorsLayout>
  )
}
