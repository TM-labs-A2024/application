import Doctor from '@components/organisms/Doctor'
import { doctors } from '@constants/index'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function DoctorPage() {
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
    () => doctors.find((doctor) => String(doctor.id) === router.query.slug),
    [router.query.slug]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <Doctor doctor={doctorData ?? doctors[0]} />
}
