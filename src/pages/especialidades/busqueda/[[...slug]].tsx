import { specialties, patients } from '@src/constants'
import SpecialtiesSearchView from '@views/Specialties/Search'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialtiesSearchPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const id = router?.query?.slug?.[0]
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const patient = useMemo(() => patients.find((patient) => patient.id === id), [id])
  const context = useMemo(
    () => ({
      specialties,
      patient
    }),
    [patient]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialtiesSearchView context={context} />
}
