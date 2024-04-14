import { specialities, specialityData } from '@constants/index'
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
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const speciality = useMemo(
    () => specialities.find((speciality) => String(speciality.id) === router.query.slug),
    [router.query.slug]
  )

  const currentTab = useMemo(() => {
    switch (router.query.type) {
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
        href: `/evolucion/${router.query.slug}/${id}`,
        title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        description: `Editado por: ${author}`,
        comment: `Patología: ${reason}`
      })),
      orders: specialityData.orders.map(({ id, title, date, author }) => ({
        href: `/orden/${router.query.slug}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      })),
      tests: specialityData.tests.map(({ id, title, date, author }) => ({
        href: `/analisis/${router.query.slug}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      }))
    }),
    [router.query.slug]
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <SpecialityView
      speciality={speciality ?? specialities[0]}
      data={data}
      currentTab={currentTab}
    />
  )
}
