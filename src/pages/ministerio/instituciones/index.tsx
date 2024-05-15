import { institutions } from '@src/constants'
import InstitutionsView from '@views/Institutions'
import React, { useMemo } from 'react'

export default function InstitutionsPage() {
  // --- Data and handlers -----------------------------------------------------
  const institutionsFiltered = useMemo(() => institutions.filter((doctor) => !doctor.pending), [])
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionsView institutions={institutionsFiltered} />
}
