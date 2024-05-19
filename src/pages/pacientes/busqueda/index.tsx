import { patients } from '@src/constants'
import { getSession } from '@src/shared'
import PatientsSearchView from '@views/Patients/Search'
import React, { useMemo } from 'react'

export default function PatientsSearchPage() {
  // --- Data and handlers -----------------------------------------------------
  const isDoctor = useMemo(() => getSession() === 'doctor', [])

  const approvedPatients = useMemo(
    () =>
      isDoctor
        ? patients.filter((patient) => !patient.pending)
        : patients.filter((patient) => !patient.pending && patient?.status === 'hospitalizado'),
    [isDoctor]
  )
  // --- END: Data and handlers ------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const context = useMemo(
    () => ({
      approvedPatients
    }),
    [approvedPatients]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <PatientsSearchView context={context} />
}
