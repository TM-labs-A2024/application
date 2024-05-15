import { institutions } from '@src/constants'
import InstitutionView from '@views/Institution'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function InstitutionPage() {
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
  const institutionData = useMemo(
    () => institutions.find((institution) => String(institution.id) === router.query.slug?.[0]),
    [router.query.slug]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionView institution={institutionData ?? institutions[0]} />
}
