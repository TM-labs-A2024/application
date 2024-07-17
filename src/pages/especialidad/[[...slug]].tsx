import { specialties, specialtyData } from '@constants/index'
import { getSession } from '@shared/index'
import SpecialtyView from '@src/views/Specialty'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialtyPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const isPatient = useMemo(() => getSession() === 'patient', [])
  const isDoctor = useMemo(() => getSession() === 'doctor', [])
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const specialtyId = useMemo(
    () => (isPatient ? router.query.slug?.[0] : router.query.slug?.[1]),
    [isPatient, router.query.slug]
  )

  const patientId = useMemo(
    () => !isPatient && router.query.slug?.[0],
    [isPatient, router.query.slug]
  )

  const specialty = useMemo(
    () => specialties.find((specialty) => String(specialty.id) === specialtyId),
    [specialtyId]
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
      evolutions: specialtyData.evolutions.map(({ id, date, type, author, reason }) => ({
        href: isPatient
          ? `/evolucion/${specialtyId}/${id}`
          : `/evolucion/${patientId}/${specialtyId}/${id}`,
        title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        description: `Editado por: ${author}`,
        comment: `Patología: ${reason}`
      })),
      orders: specialtyData.orders.map(({ id, title, date, author }) => ({
        href: isPatient
          ? `/orden/${specialtyId}/${id}`
          : `/orden/${patientId}/${specialtyId}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      })),
      tests: specialtyData.tests.map(({ id, title, date, author }) => ({
        href: isPatient
          ? `/analisis/${specialtyId}/${id}`
          : `/analisis/${patientId}/${specialtyId}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      }))
    }),
    [isPatient, patientId, specialtyId]
  )

  const context = useMemo(
    () => ({
      isPatient,
      isDoctor,
      specialty: specialty ?? specialties[0],
      data,
      currentTab
    }),
    [isPatient, specialty, data, currentTab, isDoctor]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialtyView context={context} />
}
