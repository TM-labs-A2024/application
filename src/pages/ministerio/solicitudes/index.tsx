import { institutions } from '@constants/index'
import { useGovernmentRequests, useInstitutions } from '@services/index'
import { removeSession } from '@shared/index'
import { Institution } from '@src/types'
import MinistryRequestsView from '@views/MinistryRequests'
import { useRouter } from 'next/navigation'
import React, { useMemo, useCallback } from 'react'

export default function MinistryRequestsPage() {
  // --- Hooks -----------------------------------------------------------------
  const { data } = useGovernmentRequests()
  const router = useRouter()

  const { data: institutionsData } = useInstitutions()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const formattedInstitutions = useMemo(() => {
    const institutionsMap =
      data?.data?.map((institution) => {
        const obj: Institution =
          institutionsData?.data?.find((el) => el.id === institution.institutionId) ??
          institutions[0]

        return {
          ...obj,
          requestId: institution?.id,
          approved: institution?.approved
        }
      }) ?? []

    return institutionsMap.filter((el: Institution) => el.pending && !el.approved)
  }, [data, institutionsData])

  const onLogout = useCallback(() => {
    removeSession()
    router.push('/')
  }, [router])
  // --- END: Data and handlers ------------------------------------------------

  return (
    <MinistryRequestsView
      institutions={formattedInstitutions ?? institutions}
      onLogout={onLogout}
    />
  )
}
