import { specialities } from '@src/constants'
import SpecialitiesSearchView from '@views/Specialities/Search'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialitiesSearchPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  router?.query?.slug?.[0]
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const context = useMemo(
    () => ({
      specialities,
      uuid: router?.query?.slug?.[0]
    }),
    [router?.query?.slug]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialitiesSearchView context={context} />
}
