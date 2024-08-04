import InstitutionDoctors from '@components/organisms/InstitutionDoctors'
import { Doctor as DoctorType, ReactSelectOption } from '@src/types'
import React from 'react'

export default function InstitutionDoctorsView({
  context
}: {
  context: { doctors: DoctorType[]; specialtiesOptions: ReactSelectOption[] }
}) {
  return <InstitutionDoctors context={context} />
}
