import InstitutionRequests from '@components/organisms/InstitutionRequests'
import { Doctor as DoctorType } from '@src/types'
import React from 'react'

export default function InstitutionRequestsView({ doctors }: { doctors: DoctorType[] }) {
  return <InstitutionRequests doctors={doctors} />
}
