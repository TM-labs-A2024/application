import { specialities, patients } from '@src/constants'
import SpecialitiesSearchView from '@views/Specialities/Search'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialitiesSearchPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const uuid = router?.query?.slug?.[0]
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const patient = useMemo(() => patients.find((patient) => patient.uuid === uuid), [uuid])
  const context = useMemo(
    () => ({
      specialities,
      patient
    }),
    [patient]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialitiesSearchView context={context} />
}
