import Specialities from '@components/organisms/Specialities'
import { PatientsLayout } from '@layouts/index'
import { Patient } from '@src/types'
import React from 'react'

export default function SpecialitiesView({
  context
}: {
  context: {
    isPatient: boolean
    patient?: Patient
  }
}) {
  return context.isPatient ? (
    <PatientsLayout>
      <Specialities context={context} />
    </PatientsLayout>
  ) : (
    <Specialities context={context} />
  )
}
