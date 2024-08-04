import { institutions } from '@constants/index'
import { useGovernmentRequests, useInstitutions } from '@services/index'
import MinistryRequestsView from '@views/MinistryRequests'
import React, { useMemo } from 'react'

export default function MinistryRequestsPage() {
  // --- Data and handlers -----------------------------------------------------
  const { data } = useGovernmentRequests()

  const { data: institutionsData } = useInstitutions()
  // --- END: Data and handlers ------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const formattedInstitutions = useMemo(
    () =>
      data?.data?.map((institution) => {
        const obj =
          institutionsData?.data?.find((el) => el.id === institution.institutionId) ??
          institutions[0]

        return {
          ...obj,
          requestId: institution?.id
        }
      }) ?? [],
    [data, institutionsData]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <MinistryRequestsView institutions={formattedInstitutions ?? institutions} />
}
