import { doctors } from '@src/constants'
import InstitutionDoctorView from '@views/InstitutionDoctor'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function InstitutionRequestsPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const doctorData = useMemo(
    () => doctors.find((doctor) => String(doctor.id) === router.query.slug?.[0]),
    [router.query.slug]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionDoctorView doctor={doctorData ?? doctors[0]} />
}
