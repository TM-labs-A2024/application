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
import { ReactSelectOption, Patient } from '@src/types'
import { isIOS, isMobile } from '@utils/index'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'
import NextLink from 'next/link'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
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
    approvedPatients: Patient[]
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
  const { approvedPatients } = context
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const patientsFormatted = useMemo(
    () =>
      approvedPatients.map(
        ({
          uuid,
          birthdate,
          govId,
          status,
          bed,
          firstname,
          lastname,
          pending,
          gender,
          specialities
        }) => ({
          href: pending ? '/pacientes' : `/paciente/${uuid}`,
          title: `${firstname} ${lastname}`,
          description: `C.I: ${govId}, ${formatDistanceToNowStrict(new Date(birthdate), {
            locale: es,
            roundingMethod: 'floor'
          })}${status ? `, Cama: ${bed}` : ''}`,
          status,
          pending,
          gender,
          age: formatDistanceToNowStrict(new Date(birthdate), {
            locale: es,
            roundingMethod: 'floor'
          }).split(' ')[0],
          bed,
          specialities
        })
      ),
    [approvedPatients]
  )
  // --- END: Data and handlers ------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [showFilters, setShowFilters] = useState(false)
  const [patientsList, setPatientsList] = useState(patientsFormatted)
  const [search, setSearch] = useState('')
  const [fromAge, setFromAge] = useState('')
  const [toAge, setToAge] = useState('')
  const [gender, setGender] = useState<ReactSelectOption>({
    value: 0,
    label: ''
  })
  const [status, setStatus] = useState<ReactSelectOption>({
    value: 0,
    label: ''
  })
  const [speciality, setSpeciality] = useState<ReactSelectOption>({
    value: null,
    label: ''
  })
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

  useEffect(() => {
    let filteredPatientsList = patientsFormatted

    // Title filtering
    if (search !== '') {
      filteredPatientsList = filteredPatientsList.filter(
        (patient) =>
          patient.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          patient.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    }

    // Gender filtering
    if (gender?.value) {
      filteredPatientsList = filteredPatientsList.filter(
        (patient) => patient.gender === gender?.value
      )
    }

    // Status filtering
    if (status?.label) {
      filteredPatientsList = filteredPatientsList.filter((patient) => patient?.bed)
    }

    // speciality filtering
    if (speciality?.value) {
      filteredPatientsList = filteredPatientsList.filter((patient) =>
        patient.specialities.includes(Number(speciality?.value))
      )
    }

    // Dates filtering
    if (fromAge !== '') {
      filteredPatientsList = filteredPatientsList.filter(
        (patient) => Number(patient.age) >= Number(fromAge)
      )
    }

    if (toAge !== '') {
      filteredPatientsList = filteredPatientsList.filter(
        (patient) => Number(patient.age) <= Number(toAge)
      )
    }

    setPatientsList(filteredPatientsList)
  }, [
    approvedPatients,
    gender?.value,
    search,
    status?.label,
    speciality?.value,
    fromAge,
    toAge,
    patientsFormatted
  ])
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

  const matches = useMemo(() => `${patientsList.length} resultados`, [patientsList])

  const onChange = useCallback((value: string) => {
    setSearch(value)
  }, [])
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
            Edad del paciente
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
              onChange={onChange}
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
            <PatientList pendingPatients={[]} patients={patientsList} label={matches} />
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
