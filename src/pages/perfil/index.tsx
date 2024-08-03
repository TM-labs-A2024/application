import Splash from '@components/atoms/Splash'
import { patient } from '@constants/index'
import { getUser } from '@shared/index'
import { usePatientByGovId } from '@src/services'
import PatientProfileView from '@src/views/PatientProfile'
import React from 'react'

export default function PatientProfile() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()

  const { data, isLoading } = usePatientByGovId(user?.govId)
  // --- END: Hooks ------------------------------------------------------------

  return isLoading ? <Splash /> : <PatientProfileView patient={data?.data ?? patient} />
}
