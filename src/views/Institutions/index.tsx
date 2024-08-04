import Institutions from '@components/organisms/Institutions'
import { Institution as InstitutionType } from '@src/types'
import React from 'react'

export default function InstitutionDoctorsView({
  institutions,
  onLogout
}: {
  institutions: InstitutionType[]
  onLogout?: () => void
}) {
  return <Institutions institutions={institutions} onLogout={onLogout} />
}
