import InstitutionProfile from '@components/organisms/InstitutionProfile'
import { Institution } from '@src/types'
import React from 'react'

export default function InstitutionProfileView({
  institution,
  onLogout
}: {
  institution: Institution
  onLogout?: () => void
}) {
  return <InstitutionProfile institution={institution} onLogout={onLogout} />
}
