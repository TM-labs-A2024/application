import Institutions from '@components/organisms/Institutions'
import { Institution as InstitutionType } from '@src/types'
import React from 'react'

export default function InstitutionDoctorsView({
  institutions
}: {
  institutions: InstitutionType[]
}) {
  return <Institutions institutions={institutions} />
}
