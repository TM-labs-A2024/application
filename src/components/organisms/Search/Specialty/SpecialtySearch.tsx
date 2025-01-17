import {
  Link,
  Button,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton
} from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import EvolutionList from '@components/molecules/EvolutionsList'
import { evolutionTypes } from '@constants/index'
import { FILTERS_APPLIED } from '@constants/index'
import { Evolutions, ReactSelectOption } from '@src/types'
import { isIOS, isMobile } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import NextLink from 'next/link'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import { Store } from 'react-notifications-component'
import Select from 'react-select'

import Swimmer from '../../../../../public/static/icons/Swimmer.svg'

const evolutionTypesOptions = evolutionTypes.map(({ id, name }: { id: string; name: string }) => ({
  value: id,
  label: name
}))

type FormData = {
  type: ReactSelectOption | null
  fromDate: string
  toDate: string
}

export default function SpecialtySearch({
  context
}: {
  context: {
    goBackRef: string
    specialtyData: {
      evolutions?: Evolutions
      orders?: Evolutions
      tests?: Evolutions
    }
    isNurse: boolean
    isPatient: boolean
    patientId?: string | false
    specialtyId?: string
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
    setValue
  } = useForm<FormData>()

  const values = watch()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { goBackRef, isNurse, isPatient, specialtyData, patientId, specialtyId } = context
  const [showFilters, setShowFilters] = useState(false)
  const [evolutionsList, setEvolutionsList] = useState(specialtyData?.evolutions)
  const [ordersList, setOrdersList] = useState(specialtyData?.orders)
  const [testsList, setTestsList] = useState(specialtyData?.tests)
  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [type, setType] = useState<ReactSelectOption>({
    value: 0,
    label: ''
  })
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const data = useMemo(() => {
    return {
      evolutions: !isNurse
        ? evolutionsList?.map(({ id, date, type, author, reason }) => ({
            href: isPatient
              ? `/evolucion/${specialtyId}/${id}`
              : `/evolucion/${patientId}/${specialtyId}/${id}`,
            title: `${type}: ${format(new Date(date), 'dd, MMMM yyyy', {
              locale: es
            })}`,
            description: `Editado por: ${author}`,
            comment: `Patología: ${reason}`
          }))
        : [],
      orders: ordersList?.map(({ id, title, date, author }) => ({
        href: isPatient
          ? `/orden/${specialtyId}/${id}`
          : `/orden/${patientId}/${specialtyId}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      })),
      tests: !isNurse
        ? testsList?.map(({ id, title, date, author }) => ({
            href: isPatient
              ? `/analisis/${specialtyId}/${id}`
              : `/analisis/${patientId}/${specialtyId}/${id}`,
            title,
            description: `${format(new Date(date), 'dd, MMMM yyyy', {
              locale: es
            })}`,
            comment: `Agregado por: ${author}`
          }))
        : []
    }
  }, [evolutionsList, isNurse, isPatient, ordersList, patientId, specialtyId, testsList])
  // --- END: Data and handlers ------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  const inputRef = React.createRef<HTMLInputElement>()
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  useEffect(() => {
    let filteredEvolutionsList = specialtyData?.evolutions
    let filteredOrdersList = specialtyData?.orders
    let filteredTestsList = specialtyData?.tests

    // Title filtering
    if (search !== '') {
      filteredEvolutionsList = filteredEvolutionsList?.filter((evolution) =>
        evolution?.type?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )

      filteredOrdersList = filteredOrdersList?.filter((order) =>
        order?.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )

      filteredTestsList = filteredTestsList?.filter((test) =>
        test?.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    }

    // Type filtering
    if (type?.label) {
      filteredEvolutionsList = filteredEvolutionsList?.filter((evolution) =>
        evolution?.type?.toLocaleLowerCase().includes(String(type?.label.toLocaleLowerCase()))
      )

      filteredOrdersList = []

      filteredTestsList = []
    }

    // Dates filtering
    if (fromDate !== '') {
      const formattedFromDate = new Date(fromDate).getTime()

      filteredEvolutionsList = filteredEvolutionsList?.filter(
        (evolution) => new Date(evolution.date).getTime() >= formattedFromDate
      )

      filteredOrdersList = filteredOrdersList?.filter(
        (order) => new Date(order.date).getTime() >= formattedFromDate
      )

      filteredTestsList = filteredTestsList?.filter(
        (test) => new Date(test.date).getTime() >= formattedFromDate
      )
    }

    if (toDate !== '') {
      const formattedToDate = new Date(toDate).getTime()

      filteredEvolutionsList = filteredEvolutionsList?.filter(
        (evolution) => new Date(evolution.date).getTime() <= formattedToDate
      )

      filteredOrdersList = filteredOrdersList?.filter(
        (order) => new Date(order.date).getTime() <= formattedToDate
      )

      filteredTestsList = filteredTestsList?.filter(
        (test) => new Date(test.date).getTime() <= formattedToDate
      )
    }

    setEvolutionsList(filteredEvolutionsList)

    setOrdersList(filteredOrdersList)

    setTestsList(filteredTestsList)
  }, [
    fromDate,
    search,
    specialtyData?.evolutions,
    specialtyData?.orders,
    specialtyData?.tests,
    toDate,
    type?.label
  ])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const removeFilters = useCallback(() => {
    setFromDate('')
    setToDate('')
    setType({
      value: 0,
      label: ''
    })
    setValue('fromDate', '')
    setValue('toDate', '')
    setValue('type', null)
    setShowFilters(false)
  }, [setFromDate, setToDate, setType, setValue])

  const onSubmit = (data: FormData) => {
    setFromDate(data.fromDate)
    setToDate(data.toDate)
    setType(data?.type)
    setShowFilters(false)
    Store.addNotification(FILTERS_APPLIED(isMobile(window)))
  }

  const onChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const matchesCount = useMemo(() => {
    if (!evolutionsList?.length || !ordersList?.length || !testsList?.length) return 0

    return !isNurse
      ? evolutionsList?.length + ordersList?.length + testsList?.length
      : ordersList?.length
  }, [evolutionsList?.length, isNurse, ordersList?.length, testsList?.length])

  const matches = useMemo(
    () => (matchesCount > 0 ? `${matchesCount} resultados` : ''),
    [matchesCount]
  )

  const verifyErrors = (errors: FieldErrors<FormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`relative mx-auto block h-screen w-screen overflow-hidden px-8 lg:w-1/2 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="specialty-search"
    >
      {showFilters && (
        <>
          <div className="mb-8 flex flex-row items-center justify-between gap-4">
            <Text>Ingresar filtros</Text>
            <Button variant="link" colorScheme="black" fontWeight="normal" onClick={removeFilters}>
              Cancelar
            </Button>
          </div>
          <Heading as="h2" size="md">
            Fechas de evolución
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
            <FormControl isInvalid={verifyErrors(errors)} className="relative h-4/5 w-full">
              <div className="my-6 flex w-full flex-row">
                <div className="mr-2 flex w-1/2 flex-col">
                  <FormLabel>Desde</FormLabel>
                  <Input
                    id="fromDate"
                    className="min-h-10"
                    type="date"
                    placeholder="Desde"
                    defaultValue={fromDate}
                    {...register('fromDate', {
                      validate: {
                        dateBefore: (value) =>
                          values.toDate === null ||
                          values.toDate === '' ||
                          value <= values.toDate ||
                          'La fecha de comienzo debe ser menor a la fecha final'
                      }
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.fromDate && errors?.fromDate?.message}
                  </FormErrorMessage>
                </div>
                <div className="ml-2 flex w-1/2 flex-col">
                  <FormLabel>Hasta</FormLabel>
                  <Input
                    id="toDate"
                    className="min-h-10"
                    type="date"
                    placeholder="Hasta"
                    defaultValue={toDate}
                    {...register('toDate', {
                      validate: {
                        dateBefore: (value) =>
                          values.fromDate === null ||
                          values.fromDate !== '' ||
                          value >= values.fromDate ||
                          'La fecha final debe ser mayor a la fecha de comienzo'
                      }
                    })}
                  />
                  <FormErrorMessage>{errors?.toDate && errors?.toDate?.message}</FormErrorMessage>
                </div>
              </div>
              {!isNurse && (
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select
                      id="type"
                      {...field}
                      placeholder="Tipo"
                      options={evolutionTypesOptions}
                    />
                  )}
                />
              )}
              <Stack mt={4} className="absolute bottom-0 w-full">
                <Button type="submit">Aplicar filtros</Button>
                <Button
                  variant="link"
                  colorScheme="black"
                  fontWeight="normal"
                  onClick={removeFilters}
                  className="mt-2"
                >
                  Quitar filtros
                </Button>
              </Stack>
            </FormControl>
          </form>
        </>
      )}
      {!showFilters && (
        <>
          <div className="mb-8 flex flex-row items-center">
            <SearchInputComponent
              placeholder="ingresar criterio"
              className="mr-4 w-full"
              onChange={onChange}
              inputRef={inputRef}
            />
            <Link as={NextLink} href={goBackRef}>
              Cancelar
            </Link>
          </div>
          <div className="w-full overflow-x-scroll">
            <HStack spacing={4} mb={4} className="w-max">
              {fromDate && (
                <Tag size="md" variant="outline" colorScheme="blackAlpha">
                  <TagLabel>
                    Desde: {format(new Date(fromDate.replace(/-/g, '/')), 'dd/MM/yyyy')}
                  </TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setFromDate('')
                      setValue('fromDate', '')
                    }}
                  />
                </Tag>
              )}
              {toDate && (
                <Tag size="md" variant="outline" colorScheme="blackAlpha">
                  <TagLabel>
                    Hasta: {format(new Date(toDate.replace(/-/g, '/')), 'dd/MM/yyyy')}
                  </TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setToDate('')
                      setValue('toDate', '')
                    }}
                  />
                </Tag>
              )}
              {type?.label && (
                <Tag size="md" variant="outline" colorScheme="blackAlpha">
                  <TagLabel>Tipo: {type.label}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setType(null)
                      setValue('type', null)
                    }}
                  />
                </Tag>
              )}
            </HStack>
          </div>
          {matches !== '' && (
            <Heading as="h2" size="sm" noOfLines={1} className="mb-4">
              {matches}
            </Heading>
          )}
          <div className="h-3/4 overflow-scroll">
            <div className="block">
              {data?.evolutions && data?.evolutions?.length > 0 && <Text>Evoluciones</Text>}
              <EvolutionList evolutions={data?.evolutions} />
            </div>
            <div className="block">
              {data.orders && data.orders?.length > 0 && <Text>Ordenes</Text>}
              <EvolutionList evolutions={data.orders} />
            </div>
            <div className="block">
              {data.tests && data.tests?.length > 0 && <Text>Análisis</Text>}
              <EvolutionList evolutions={data.tests} />
            </div>
          </div>
          <div className="absolute bottom-16 w-full pr-16">
            <Button className="w-full gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Swimmer /> Filtros
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
