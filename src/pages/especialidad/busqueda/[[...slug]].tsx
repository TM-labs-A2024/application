import { useSpecialityRecordsByPatientGovId } from '@services/index'
import { getSession, getUser } from '@shared/index'
import SpecialtySearchView from '@src/views/Specialty/Search'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialtySearchPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const user = getUser()

  const isPatient = useMemo(() => getSession() === 'patient', [])
  const isDoctor = useMemo(() => getSession() === 'doctor', [])
  const isNurse = useMemo(() => !isPatient && !isDoctor, [isDoctor, isPatient])
  const specialtyId = useMemo(() => String(router.query.slug?.[1]), [router.query.slug])

  const patientId = useMemo(
    () => (isPatient ? user?.govId : String(router.query.slug?.[0])),
    [isPatient, router.query.slug, user?.govId]
  )

  const { data: records } = useSpecialityRecordsByPatientGovId(specialtyId, patientId)
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const goBackRef = useMemo(
    () =>
      isPatient ? `/especialidad/${specialtyId}` : `/especialidad/${patientId}/${specialtyId}`,
    [isPatient, patientId, specialtyId]
  )

  const specialtyData = useMemo(
    () => ({
      evolutions: records?.data
        ?.filter((el) => el.type !== 'orden' && el.type !== 'análisis')
        ?.map((evolution) => ({
          id: evolution.id,
          type: evolution.type,
          title: evolution.title,
          date: evolution.created_at,
          author: evolution.author,
          reason: evolution.description
        })),
      orders: records?.data
        ?.filter((el) => el.type === 'orden')
        ?.map((order) => ({
          id: order.id,
          type: order.type,
          title: order.title,
          date: order.created_at,
          author: order.author,
          reason: order.description
        })),
      tests: records?.data
        ?.filter((el) => el.type === 'análisis')
        ?.map((test) => ({
          id: test.id,
          type: test.type,
          title: test.title,
          date: test.created_at,
          author: test.author,
          reason: test.description
        }))
    }),
    [records]
  )

  const context = useMemo(
    () => ({
      goBackRef,
      specialtyData,
      isNurse,
      isPatient,
      specialtyId,
      patientId
    }),
    [goBackRef, isNurse, isPatient, patientId, specialtyData, specialtyId]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialtySearchView context={context} />
}
