import MinistryRequests from '@components/organisms/MinistryRequests'
import { Institution as InstitutionType } from '@src/types'
import React from 'react'

export default function MinistryRequestsView({
  institutions,
  onLogout
}: {
  institutions: InstitutionType[]
  onLogout?: () => void
}) {
  return <MinistryRequests institutions={institutions} onLogout={onLogout} />
}
