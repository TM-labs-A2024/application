import InstitutionProfile from '@components/organisms/InstitutionProfile'
import { Institution } from '@src/types'
import React from 'react'

export default function InstitutionProfileView({ institution }: { institution: Institution }) {
  return <InstitutionProfile institution={institution} />
}
