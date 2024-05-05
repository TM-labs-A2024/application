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
import PatientList from '@components/molecules/PatientsList'
import { FILTERS_APPLIED } from '@constants/index'
import { genderOptions, statusOptions, specialities } from '@constants/index'
import { ReactSelectOption } from '@src/types'
import { isIOS, isMobile } from '@utils/index'
import NextLink from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import { Store } from 'react-notifications-component'
import Select from 'react-select'

import Swimmer from '../../../../../public/static/icons/Swimmer.svg'

const genderOptionsList = genderOptions.map(({ id, name }: { id: string; name: string }) => ({
  value: id,
  label: name
}))

const statusOptionsList = statusOptions.map(({ id, name }: { id: string; name: string }) => ({
  value: id,
  label: name
}))

const specialitiesList = specialities.map(({ id, name }: { id: number; name: string }) => ({
  value: id,
  label: name
}))

type FormData = {
  gender: ReactSelectOption | null
  status: ReactSelectOption | null
  speciality: ReactSelectOption | null
  fromAge: string
  toAge: string
}

export default function PatientsSearch({
  context
}: {
  context: {
    onChange: (value: string) => void
    patients: {
      href: string
      title: string
      description: string
      status: string | undefined
      pending: boolean | undefined
    }[]
    matches: string
    fromAge: string
    toAge: string
    gender: ReactSelectOption
    status: ReactSelectOption
    speciality: ReactSelectOption
    setFromAge: React.Dispatch<React.SetStateAction<string>>
    setToAge: React.Dispatch<React.SetStateAction<string>>
    setGender: React.Dispatch<React.SetStateAction<ReactSelectOption>>
    setStatus: React.Dispatch<React.SetStateAction<ReactSelectOption>>
    setSpeciality: React.Dispatch<React.SetStateAction<ReactSelectOption>>
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
  const [showFilters, setShowFilters] = useState(false)

  const {
    fromAge,
    toAge,
    gender,
    status,
    speciality,
    setFromAge,
    setToAge,
    setGender,
    setStatus,
    setSpeciality
  } = context
  // --- END: Local state ------------------------------------------------------

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
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const removeFilters = useCallback(() => {
    setFromAge('')
    setToAge('')
    setGender({
      value: 0,
      label: ''
    })
    setStatus({
      value: 0,
      label: ''
    })
    setSpeciality({
      value: null,
      label: ''
    })
    setValue('fromAge', '')
    setValue('toAge', '')
    setValue('gender', null)
    setValue('status', null)
    setValue('speciality', null)
    setShowFilters(false)
  }, [setFromAge, setToAge, setGender, setStatus, setSpeciality, setValue])

  const onSubmit = (data: FormData) => {
    setFromAge(data.fromAge)
    setToAge(data.toAge)
    setGender(data?.gender)
    setStatus(data?.status)
    setSpeciality(data?.speciality)
    setShowFilters(false)
    Store.addNotification(FILTERS_APPLIED(isMobile(window)))
  }

  const verifyErrors = (errors: FieldErrors<FormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`relative mx-auto block h-screen w-screen overflow-hidden px-8 lg:w-1/2 ${isIOS() ? 'pt-20' : 'pt-8'}`}
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
            Fechas de consulta
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
            <FormControl isInvalid={verifyErrors(errors)} className="relative h-4/5 w-full">
              <div className="my-6 flex w-full flex-row gap-4">
                <div className="flex w-1/2 flex-col">
                  <FormLabel>Desde</FormLabel>
                  <Input
                    id="fromAge"
                    className="min-h-10"
                    type="number"
                    placeholder="Desde"
                    defaultValue={fromAge}
                    {...register('fromAge', {
                      validate: {
                        ageFrom: (value) =>
                          values.toAge === null ||
                          values.toAge === '' ||
                          value <= values.toAge ||
                          'La edad de comienzo debe ser menor a la edad final'
                      }
                    })}
                  />
                  <FormErrorMessage>{errors?.fromAge && errors?.fromAge?.message}</FormErrorMessage>
                </div>
                <div className="flex w-1/2 flex-col">
                  <FormLabel>Hasta</FormLabel>
                  <Input
                    id="toAge"
                    className="min-h-10"
                    type="number"
                    placeholder="Hasta"
                    defaultValue={toAge}
                    {...register('toAge', {
                      validate: {
                        ageTo: (value) =>
                          values.fromAge === null ||
                          values.fromAge !== '' ||
                          value >= values.fromAge ||
                          'La edad final debe ser mayor a la edad de comienzo'
                      }
                    })}
                  />
                  <FormErrorMessage>{errors?.toAge && errors?.toAge?.message}</FormErrorMessage>
                </div>
              </div>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select
                    id="gender"
                    {...field}
                    placeholder="Sexo"
                    options={genderOptionsList}
                    className="mb-6"
                  />
                )}
              />
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    id="status"
                    {...field}
                    placeholder="Estado"
                    options={statusOptionsList}
                    className="mb-6"
                  />
                )}
              />
              <Controller
                control={control}
                name="speciality"
                render={({ field }) => (
                  <Select
                    id="speciality"
                    {...field}
                    placeholder="Especialidad"
                    options={specialitiesList}
                    className="mb-6"
                  />
                )}
              />
              <Stack spacing={4} mt={4} className="absolute bottom-0 w-full">
                <Button type="submit">Aplicar filtros</Button>
                <Button
                  variant="link"
                  colorScheme="black"
                  fontWeight="normal"
                  onClick={removeFilters}
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
          <div className="mb-8 flex flex-row items-center gap-4">
            <SearchInputComponent
              placeholder="Buscar paciente"
              className="w-full"
              onChange={context.onChange}
              inputRef={inputRef}
            />
            <Link as={NextLink} href="/pacientes">
              Cancelar
            </Link>
          </div>
          <div className="w-full overflow-x-scroll">
            <HStack spacing={4} mb={4} className="w-max">
              {fromAge && (
                <Tag size="md" variant="outline" colorScheme="blackAlpha">
                  <TagLabel>Desde: {fromAge}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setFromAge('')
                      setValue('fromAge', '')
                    }}
                  />
                </Tag>
              )}
              {toAge && (
                <Tag size="md" variant="outline" colorScheme="blackAlpha">
                  <TagLabel>Hasta: {toAge}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setToAge('')
                      setValue('toAge', '')
                    }}
                  />
                </Tag>
              )}
              {gender?.label && (
                <Tag size="md" variant="outline" colorScheme="blackAlpha">
                  <TagLabel>Sexo: {gender.label}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setGender(null)
                      setValue('gender', null)
                    }}
                  />
                </Tag>
              )}
              {status?.label && (
                <Tag size="md" variant="outline" colorScheme="blackAlpha">
                  <TagLabel>Estado: {status.label}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setStatus(null)
                      setValue('status', null)
                    }}
                  />
                </Tag>
              )}
              {speciality?.label && (
                <Tag size="md" variant="outline" colorScheme="blackAlpha">
                  <TagLabel>Especialidad: {speciality.label}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setSpeciality(null)
                      setValue('speciality', null)
                    }}
                  />
                </Tag>
              )}
            </HStack>
          </div>
          <div className="h-3/4 overflow-scroll">
            <PatientList pendingPatients={[]} patients={context.patients} label={context.matches} />
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
