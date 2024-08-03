import InstitutionRequests from '@components/organisms/InstitutionRequests'
import { Doctor as DoctorType, ReactSelectOption } from '@src/types'
import React from 'react'

export default function InstitutionRequestsView({
  context
}: {
  context: {
    doctors: DoctorType[]
    specialtiesOptions: ReactSelectOption[]
  }
}) {
  return <InstitutionRequests context={context} />
}
