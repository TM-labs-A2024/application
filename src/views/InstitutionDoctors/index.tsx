import InstitutionDoctors from '@components/organisms/InstitutionDoctors'
import { Doctor as DoctorType, ReactSelectOption, Nurse } from '@src/types'
import React from 'react'

export default function InstitutionDoctorsView({
  context
}: {
  context: { doctors?: DoctorType[]; specialtiesOptions: ReactSelectOption[]; nurses?: Nurse[] }
}) {
  return <InstitutionDoctors context={context} />
}
