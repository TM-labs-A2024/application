import { specialityData } from '@src/constants'
import SpecialitySearchView from '@views/Speciality/Search'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'

export default function SpecialitySearchPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [evolutionsList, setEvolutionsList] = useState(specialityData.evolutions)
  const [ordersList, setOrdersList] = useState(specialityData.orders)
  const [testsList, setTestsList] = useState(specialityData.tests)
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onChange = useCallback((value: string) => {
    const newEvolutionsList = specialityData.evolutions.filter((evolution) =>
      evolution.type.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )

    setEvolutionsList(newEvolutionsList)

    const newOrdersList = specialityData.orders.filter((evolution) =>
      evolution.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )

    setOrdersList(newOrdersList)

    const newTestsList = specialityData.tests.filter((test) =>
      test.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )

    setTestsList(newTestsList)
  }, [])

  const data = useMemo(
    () => ({
      evolutions: evolutionsList.map(({ id, date, type, author, reason }) => ({
        href: `/evolucion/${router.query.slug}/${id}`,
        title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        description: `Editado por: ${author}`,
        comment: `Patología: ${reason}`
      })),
      orders: ordersList.map(({ id, title, date, author }) => ({
        href: `/orden/${router.query.slug}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      })),
      tests: testsList.map(({ id, title, date, author }) => ({
        href: `/analisis/${router.query.slug}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      }))
    }),
    [evolutionsList, ordersList, router.query.slug, testsList]
  )

  const context = useMemo(
    () => ({
      speciality: router.query.slug,
      onChange,
      data,
      matches: `${evolutionsList.length} resultados`
    }),
    [data, evolutionsList.length, onChange, router.query.slug]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialitySearchView context={context} />
}
