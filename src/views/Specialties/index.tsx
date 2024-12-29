import Specialties from '@components/organisms/Specialties'
import { PatientsLayout } from '@layouts/index'
import { Patient, Specialties as SpecialtiesType } from '@src/types'
import React from 'react'

export default function SpecialtiesView({
  context
}: {
  context: {
    isPatient: boolean
    patient?: Patient
    specialties: SpecialtiesType
  }
}) {
  return context.isPatient ? (
    <PatientsLayout>
      <Specialties context={context} />
    </PatientsLayout>
  ) : (
    <Specialties context={context} />
  )
}
