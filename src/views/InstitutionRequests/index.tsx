import InstitutionRequests from '@components/organisms/InstitutionRequests'
import { Doctor as DoctorType, ReactSelectOption, Nurse } from '@src/types'
import React from 'react'

export default function InstitutionRequestsView({
  context
}: {
  context: {
    doctors?: DoctorType[]
    nurses?: Nurse[]
    specialtiesOptions: ReactSelectOption[]
  }
}) {
  return <InstitutionRequests context={context} />
}
