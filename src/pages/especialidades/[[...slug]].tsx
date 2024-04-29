import { patients } from '@constants/index'
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
  const context = useMemo(
    () => ({
      role: getSession(),
      patient: patients?.find((patient) => patient.uuid === router?.query?.slug?.[0]) as Patient
    }),
    [router?.query?.slug]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialitiesView context={context} />
}
