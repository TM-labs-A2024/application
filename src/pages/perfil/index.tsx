import Splash from '@components/atoms/Splash'
import { patient } from '@constants/index'
import { getUser, removeSession } from '@shared/index'
import { usePatientByGovId } from '@src/services'
import PatientProfileView from '@src/views/PatientProfile'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function PatientProfile() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()
  const router = useRouter()

  const { data, isLoading } = usePatientByGovId(user?.govId)
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
    <PatientProfileView patient={data?.data ?? patient} onLogout={onLogout} />
  )
}
