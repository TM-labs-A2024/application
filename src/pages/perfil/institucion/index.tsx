import { institution } from '@constants/index'
import InstitutionProfileView from '@views/InstitutionProfile'
import React from 'react'

export default function InstitutionProfilePage() {
  return <InstitutionProfileView institution={institution} />
}
