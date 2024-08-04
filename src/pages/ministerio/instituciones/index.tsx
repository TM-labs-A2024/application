import { institutions } from '@src/constants'
import { useApprovedInstitutions } from '@src/services'
import InstitutionsView from '@views/Institutions'
import React from 'react'

export default function InstitutionsPage() {
  // --- Hooks -----------------------------------------------------------------
  const { data } = useApprovedInstitutions()
  // --- END: Hooks ------------------------------------------------------------

  return <InstitutionsView institutions={data?.data ?? institutions} />
}
