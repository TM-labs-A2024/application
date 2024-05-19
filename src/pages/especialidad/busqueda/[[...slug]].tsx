import { specialityData } from '@src/constants'
import { getSession } from '@src/shared'
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
  const isPatient = useMemo(() => getSession() === 'patient', [])
  const isDoctor = useMemo(() => getSession() === 'doctor', [])
  const isNurse = useMemo(() => !isPatient && !isDoctor, [isDoctor, isPatient])

  const specialityId = useMemo(
    () => (isPatient ? router.query.slug?.[0] : router.query.slug?.[1]),
    [isPatient, router.query.slug]
  )

  const patientId = useMemo(
    () => !isPatient && router.query.slug?.[0],
    [isPatient, router.query.slug]
  )

  const goBackRef = useMemo(
    () =>
      isPatient ? `/especialidad/${specialityId}` : `/especialidad/${patientId}/${specialityId}`,
    [isPatient, patientId, specialityId]
  )

  const onChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const data = useMemo(() => {
    return {
      evolutions: !isNurse
        ? evolutionsList.map(({ id, date, type, author, reason }) => ({
            href: isPatient
              ? `/evolucion/${specialityId}/${id}`
              : `/evolucion/${patientId}/${specialityId}/${id}`,
            title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
              locale: es
            })}`,
            description: `Editado por: ${author}`,
            comment: `Patología: ${reason}`
          }))
        : [],
      orders: ordersList.map(({ id, title, date, author }) => ({
        href: isPatient
          ? `/orden/${specialityId}/${id}`
          : `/orden/${patientId}/${specialityId}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      })),
      tests: !isNurse
        ? testsList.map(({ id, title, date, author }) => ({
            href: isPatient
              ? `/analisis/${specialityId}/${id}`
              : `/analisis/${patientId}/${specialityId}/${id}`,
            title,
            description: `${format(new Date(date), 'dd, MMMM yyyy', {
              locale: es
            })}`,
            comment: `Agregado por: ${author}`
          }))
        : []
    }
  }, [evolutionsList, isNurse, isPatient, ordersList, patientId, specialityId, testsList])

  const matchesCount = useMemo(
    () =>
      !isNurse ? evolutionsList.length + ordersList.length + testsList.length : ordersList.length,
    [evolutionsList.length, isNurse, ordersList.length, testsList.length]
  )

  const context = useMemo(
    () => ({
      goBackRef,
      onChange,
      data,
      matches: matchesCount > 0 ? `${matchesCount} resultados` : '',
      fromDate,
      toDate,
      type,
      setFromDate,
      setToDate,
      setType,
      isNurse
    }),
    [data, fromDate, goBackRef, matchesCount, onChange, toDate, type, isNurse]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <SpecialitySearchView context={context} />
}
