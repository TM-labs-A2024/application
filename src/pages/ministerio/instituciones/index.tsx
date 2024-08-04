import { removeSession } from '@shared/index'
import { institutions } from '@src/constants'
import { useApprovedInstitutions } from '@src/services'
import InstitutionsView from '@views/Institutions'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function InstitutionsPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { data } = useApprovedInstitutions()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onLogout = useCallback(() => {
    removeSession()
    router.push('/')
  }, [router])
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionsView institutions={data?.data ?? institutions} onLogout={onLogout} />
}
