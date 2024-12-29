import Splash from '@components/atoms/Splash'
import { patients, evolution as evolutionFallback } from '@constants/index'
import { useRecordById } from '@services/index'
import { getSession, getUser } from '@src/shared'
import EvolutionView from '@views/Evolution'
import { useRouter } from 'next/router'
import React, { useMemo, useEffect, useState } from 'react'

export default function EvolutionPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const user = getUser()

  const isPatient = useMemo(() => getSession() === 'patient', [])
  const evolution = useMemo(
    () => (isPatient ? String(router?.query?.slug?.[1]) : String(router?.query?.slug?.[2])),
    [isPatient, router?.query?.slug]
  )

  const { data: recordData } = useRecordById(evolution)
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [info, setInfo] = useState(evolutionFallback)
  const [isLoading, setIsLoading] = useState(true)
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (!recordData?.data) return

    const fetchInfo = async () => {
      try {
        const response = await fetch(recordData.data.content)
        const body = await response.json()
        const allInfo = {
          ...recordData.data,
          payload: {
            ...body
          }
        }
        setInfo(allInfo)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching info:', error)
      }
    }

    fetchInfo()
  }, [recordData])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const specialty = useMemo(
    () => (isPatient ? String(router?.query?.slug?.[0]) : String(router?.query?.slug?.[1])),
    [isPatient, router?.query?.slug]
  )

  const patientId = useMemo(
    () => (isPatient ? user?.govId : router?.query?.slug?.[0]),
    [isPatient, router?.query?.slug, user?.govId]
  )

  const patient = useMemo(() => patients.find((patient) => patient.id === patientId), [patientId])

  const goBackRef = useMemo(
    () => `/especialidad/${patientId}/${specialty}?type=evolution`,
    [patientId, specialty]
  )

  const data = useMemo(
    () => [
      {
        title: 'Descripción (notas evolutivas)',
        content: info?.payload?.description
      },
      {
        title: 'Antecedentes',
        content: info?.payload?.history
      },
      {
        title: 'Exámenes físicos',
        content: info?.payload?.examination
      },
      {
        title: 'Resumen de ingreso',
        content: info?.payload?.summary
      },
      {
        title: 'Diagnóstico',
        content: info?.payload?.diagnostic
      },
      {
        title: 'Comentarios',
        content: info?.payload?.comments
      }
    ],
    [info]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? (
    <Splash />
  ) : (
    <EvolutionView
      patient={patient}
      goBackRef={goBackRef}
      title={recordData?.data?.title ?? ''}
      data={data}
    />
  )
}
