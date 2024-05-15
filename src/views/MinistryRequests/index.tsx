import MinistryRequests from '@components/organisms/MinistryRequests'
import { Institution as InstitutionType } from '@src/types'
import React from 'react'

export default function MinistryRequestsView({
  institutions
}: {
  institutions: InstitutionType[]
}) {
  return <MinistryRequests institutions={institutions} />
}
