import { patients, specialties } from '@constants/index'
import { getSession } from '@shared/index'
import { Patient } from '@src/types'
import SpecialtiesView from '@views/Specialties'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialtiesPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isPatient = useMemo(() => getSession() === 'patient', [])

  const context = useMemo(
    () => ({
      isPatient,
      patient: patients?.find(
        (patient) => patient.id === router?.query?.slug?.[0]
      ) as unknown as Patient,
      specialties
    }),
    [router?.query?.slug, isPatient]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialtiesView context={context} />
}
