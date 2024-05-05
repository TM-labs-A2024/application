import { specialities, specialityData } from '@constants/index'
import { getSession } from '@shared/index'
import SpecialityView from '@views/Speciality'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialityPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const isPatient = useMemo(() => getSession() === 'patient', [])
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const specialityId = useMemo(
    () => (isPatient ? router.query.slug?.[0] : router.query.slug?.[1]),
    [isPatient, router.query.slug]
  )

  const patientId = useMemo(
    () => !isPatient && router.query.slug?.[0],
    [isPatient, router.query.slug]
  )

  const speciality = useMemo(
    () => specialities.find((speciality) => String(speciality.id) === specialityId),
    [specialityId]
  )

  const currentTab = useMemo(() => {
    if (!router.query.type) return 0

    const tab = router.query.type

    if (typeof window !== 'undefined') {
      router.replace(router.asPath.split('?')[0])
    }

    switch (tab) {
      case 'evolution':
        return 0
      case 'order':
        return 1
      case 'test':
        return 2
      default:
        return 0
    }
  }, [router])

  const data = useMemo(
    () => ({
      evolutions: specialityData.evolutions.map(({ id, date, type, author, reason }) => ({
        href: isPatient
          ? `/evolucion/${specialityId}/${id}`
          : `/evolucion/${patientId}/${specialityId}/${id}`,
        title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        description: `Editado por: ${author}`,
        comment: `Patología: ${reason}`
      })),
      orders: specialityData.orders.map(({ id, title, date, author }) => ({
        href: isPatient
          ? `/orden/${specialityId}/${id}`
          : `/orden/${patientId}/${specialityId}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      })),
      tests: specialityData.tests.map(({ id, title, date, author }) => ({
        href: isPatient
          ? `/analisis/${specialityId}/${id}`
          : `/analisis/${patientId}/${specialityId}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      }))
    }),
    [isPatient, patientId, specialityId]
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <SpecialityView
      isPatient={isPatient}
      speciality={speciality ?? specialities[0]}
      data={data}
      currentTab={currentTab}
    />
  )
}
