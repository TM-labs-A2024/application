import { specialtyData } from '@src/constants'
import { getSession } from '@src/shared'
import SpecialtySearchView from '@src/views/Specialty/Search'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialtySearchPage() {
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

  const specialtyId = useMemo(
    () => (isPatient ? router.query.slug?.[0] : router.query.slug?.[1]),
    [isPatient, router.query.slug]
  )

  const patientId = useMemo(
    () => !isPatient && router.query.slug?.[0],
    [isPatient, router.query.slug]
  )

  const goBackRef = useMemo(
    () =>
      isPatient ? `/especialidad/${specialtyId}` : `/especialidad/${patientId}/${specialtyId}`,
    [isPatient, patientId, specialtyId]
  )

  const context = useMemo(
    () => ({
      goBackRef,
      specialtyData,
      isNurse,
      isPatient,
      specialtyId,
      patientId
    }),
    [goBackRef, isNurse, isPatient, patientId, specialtyId]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialtySearchView context={context} />
}
