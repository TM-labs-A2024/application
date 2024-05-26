import { doctors } from '@constants/index'
import DoctorsView from '@views/Doctors'
import React, { useMemo } from 'react'

export default function Medicos() {
  // --- Data and handlers -----------------------------------------------------
  const pendingDoctors = useMemo(() => doctors.filter((doctor) => doctor.patientPending), [])

  const approvedDoctors = useMemo(() => doctors.filter((doctor) => !doctor.patientPending), [])

  const context = useMemo(
    () => ({
      pendingDoctors,
      doctors: approvedDoctors
    }),
    [pendingDoctors, approvedDoctors]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <DoctorsView context={context} />
}
