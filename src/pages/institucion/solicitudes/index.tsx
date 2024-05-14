import { doctors } from '@src/constants'
import InstitutionRequestsView from '@views/InstitutionRequests'
import React, { useMemo } from 'react'

export default function InstitutionRequestsPage() {
  // --- Data and handlers -----------------------------------------------------
  const doctorsFiltered = useMemo(() => doctors.filter((doctor) => doctor.pending), [])
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionRequestsView doctors={doctorsFiltered} />
}
