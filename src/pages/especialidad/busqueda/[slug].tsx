import { specialityData } from '@src/constants'
import { ReactSelectOption } from '@src/types'
import SpecialitySearchView from '@views/Speciality/Search'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState, useEffect } from 'react'

export default function SpecialitySearchPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [evolutionsList, setEvolutionsList] = useState(specialityData.evolutions)
  const [ordersList, setOrdersList] = useState(specialityData.orders)
  const [testsList, setTestsList] = useState(specialityData.tests)
  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [type, setType] = useState<ReactSelectOption>({
    value: 0,
    label: ''
  })
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    let filteredEvolutionsList = specialityData.evolutions
    let filteredOrdersList = specialityData.orders
    let filteredTestsList = specialityData.tests

    // Title filtering
    if (search !== '') {
      filteredEvolutionsList = filteredEvolutionsList.filter((evolution) =>
        evolution.type.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )

      filteredOrdersList = filteredOrdersList.filter((order) =>
        order.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )

      filteredTestsList = filteredTestsList.filter((test) =>
        test.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    }

    // Type filtering
    if (type?.label) {
      filteredEvolutionsList = filteredEvolutionsList.filter((evolution) =>
        evolution.type.toLocaleLowerCase().includes(String(type?.label.toLocaleLowerCase()))
      )

      filteredOrdersList = []

      filteredTestsList = []
    }

    // Dates filtering
    if (fromDate !== '') {
      const formattedFromDate = new Date(fromDate).getTime()

      filteredEvolutionsList = filteredEvolutionsList.filter(
        (evolution) => new Date(evolution.date).getTime() >= formattedFromDate
      )

      filteredOrdersList = filteredOrdersList.filter(
        (order) => new Date(order.date).getTime() >= formattedFromDate
      )

      filteredTestsList = filteredTestsList.filter(
        (test) => new Date(test.date).getTime() >= formattedFromDate
      )
    }

    if (toDate !== '') {
      const formattedToDate = new Date(toDate).getTime()

      filteredEvolutionsList = filteredEvolutionsList.filter(
        (evolution) => new Date(evolution.date).getTime() <= formattedToDate
      )

      filteredOrdersList = filteredOrdersList.filter(
        (order) => new Date(order.date).getTime() <= formattedToDate
      )

      filteredTestsList = filteredTestsList.filter(
        (test) => new Date(test.date).getTime() <= formattedToDate
      )
    }

    setEvolutionsList(filteredEvolutionsList)

    setOrdersList(filteredOrdersList)

    setTestsList(filteredTestsList)
  }, [fromDate, search, toDate, type?.label])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const data = useMemo(() => {
    return {
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
    }
  }, [evolutionsList, ordersList, router.query.slug, testsList])

  const matchesCount = useMemo(
    () => evolutionsList.length + ordersList.length + testsList.length,
    [evolutionsList, ordersList, testsList]
  )

  const context = useMemo(
    () => ({
      speciality: router.query.slug,
      onChange,
      data,
      matches: matchesCount > 0 ? `${matchesCount} resultados` : '',
      fromDate,
      toDate,
      type,
      setFromDate,
      setToDate,
      setType
    }),
    [data, fromDate, matchesCount, onChange, router.query.slug, toDate, type]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialitySearchView context={context} />
}
