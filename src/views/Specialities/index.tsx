import Specialities from '@components/organisms/Specialities'
import { PatientsLayout } from '@layouts/index'
import { Patient } from '@src/types'
import React from 'react'

export default function SpecialitiesView({
  context
}: {
  context: {
    role: string
    patient?: Patient
  }
}) {
  return context.role === 'patient' ? (
    <PatientsLayout>
      <Specialities context={context} />
    </PatientsLayout>
  ) : (
    <Specialities context={context} />
  )
}
