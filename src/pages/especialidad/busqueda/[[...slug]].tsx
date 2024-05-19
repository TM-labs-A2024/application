import { specialityData } from '@src/constants'
import { getSession } from '@src/shared'
import SpecialitySearchView from '@views/Speciality/Search'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialitySearchPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isPatient = useMemo(() => getSession() === 'patient', [])
  const isDoctor = useMemo(() => getSession() === 'doctor', [])
  const isNurse = useMemo(() => !isPatient && !isDoctor, [isDoctor, isPatient])

  const specialityId = useMemo(
    () => (isPatient ? router.query.slug?.[0] : router.query.slug?.[1]),
    [isPatient, router.query.slug]
  )

  const patientId = useMemo(
    () => !isPatient && router.query.slug?.[0],
    [isPatient, router.query.slug]
  )

  const goBackRef = useMemo(
    () =>
      isPatient ? `/especialidad/${specialityId}` : `/especialidad/${patientId}/${specialityId}`,
    [isPatient, patientId, specialityId]
  )

  const context = useMemo(
    () => ({
      goBackRef,
      specialityData,
      isNurse,
      isPatient,
      specialityId,
      patientId
    }),
    [goBackRef, isNurse, isPatient, patientId, specialityId]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialitySearchView context={context} />
}
