import Splash from '@components/atoms/Splash'
import { nurse } from '@constants/index'
import { useNurseById } from '@services/index'
import { getUser, removeSession } from '@shared/index'
import NurseProfileView from '@views/NurseProfile'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function Nurserofile() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()
  const router = useRouter()

  const { data, isLoading } = useNurseById(user?.id)
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
    <NurseProfileView nurse={data?.data ?? nurse} onLogout={onLogout} />
  )
}
