import { patients, specialities } from '@constants/index'
import { getSession } from '@shared/index'
import { Patient } from '@src/types'
import SpecialitiesView from '@views/Specialities'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialitiesPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isPatient = useMemo(() => getSession() === 'patient', [])

  const context = useMemo(
    () => ({
      isPatient,
      patient: patients?.find((patient) => patient.uuid === router?.query?.slug?.[0]) as Patient,
      specialities
    }),
    [router?.query?.slug, isPatient]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialitiesView context={context} />
}
