import Splash from '@components/atoms/Splash'
import { patients } from '@constants/index'
import { usePatientByGovId } from '@src/services'
import PatientView from '@src/views/Patient'
import { useRouter } from 'next/router'
import React from 'react'

export default function Patient() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { data, isLoading } = usePatientByGovId(String(router?.query?.slug) ?? '')
  // --- END: Hooks ------------------------------------------------------------

  return isLoading ? <Splash /> : <PatientView patient={data?.data ?? patients[0]} />
}
