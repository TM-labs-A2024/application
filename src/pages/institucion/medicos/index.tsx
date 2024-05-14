import { doctors } from '@src/constants'
import InstitutionDoctorsView from '@views/InstitutionDoctors'
import React, { useMemo } from 'react'

export default function InstitutionDoctorsPage() {
  // --- Data and handlers -----------------------------------------------------
  const doctorsFiltered = useMemo(() => doctors.filter((doctor) => !doctor.pending), [])
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionDoctorsView doctors={doctorsFiltered} />
}
