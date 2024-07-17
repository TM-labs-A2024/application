import { patients } from '@constants/index'
import { Patient as PatientType } from '@src/types'
import PatientView from '@src/views/Patient'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function Patient() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const patient = useMemo(
    () => patients?.find((patient) => patient.id === router?.query?.slug) as PatientType,
    [router?.query?.slug]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <PatientView patient={patient} />
}
