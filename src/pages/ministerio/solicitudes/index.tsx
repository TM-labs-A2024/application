import { institutions } from '@src/constants'
import MinistryRequestsView from '@views/MinistryRequests'
import React, { useMemo } from 'react'

export default function MinistryRequestsPage() {
  // --- Data and handlers -----------------------------------------------------
  const institutionsFiltered = useMemo(
    () => institutions.filter((institution) => institution.pending),
    []
  )
  // --- END: Data and handlers ------------------------------------------------

  return <MinistryRequestsView institutions={institutionsFiltered} />
}
