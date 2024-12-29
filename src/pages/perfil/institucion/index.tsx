import Splash from '@components/atoms/Splash'
import { institution } from '@constants/index'
import { useInstitutionById } from '@services/index'
import { getUser, removeSession } from '@shared/index'
import InstitutionProfileView from '@views/InstitutionProfile'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function InstitutionProfilePage() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()
  const router = useRouter()

  const { data, isLoading } = useInstitutionById(user?.institutionId)
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onLogout = useCallback(() => {
    removeSession()
    router.push('/')
  }, [router])
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? (
    <Splash />
  ) : (
    <InstitutionProfileView institution={data?.data ?? institution} onLogout={onLogout} />
  )
}
