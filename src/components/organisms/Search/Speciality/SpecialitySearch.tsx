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
import { Evolution } from '@src/types'
import { isIOS } from '@utils/index'
import NextLink from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import Select from 'react-select'

const evolutionTypesOptions = evolutionTypes.map(({ id, name }: { id: number; name: string }) => ({
  value: id,
  label: name
}))

import Swimmer from '../../../../../public/static/icons/Swimmer.svg'

type ReactSelectOption = {
  value: string | number
  label: string
  unit?: string
}

type FormData = {
  evolution: ReactSelectOption | null
  fromDate: string
  toDate: string
}

export default function SpecialitySearch({
  context
}: {
  context: {
    speciality: string | string[] | undefined
    onChange: (value: string) => void
    data: {
      evolutions: Evolution
      orders: Evolution
      tests: Evolution
    }
    matches: string
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors },
    control,
    register
  } = useForm<FormData>()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [showFilters, setShowFilters] = useState(false)
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
    setShowFilters(false)
  }, [setShowFilters])

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data))
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
            Fechas de evolución
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
            <FormControl isInvalid={verifyErrors(errors)} className="relative h-4/5 w-full">
              <div className="my-6 flex w-full flex-row gap-4">
                <div className="flex w-1/2 flex-col">
                  <FormLabel>Desde</FormLabel>
                  <Input
                    id="fromDate"
                    type="date"
                    placeholder="Desde"
                    {...register('fromDate', {
                      required: 'Este campo es obligatorio'
                    })}
                  />
                </div>
                <div className="flex w-1/2 flex-col">
                  <FormLabel>Hasta</FormLabel>
                  <Input
                    id="toDate"
                    type="date"
                    placeholder="Hasta"
                    {...register('toDate', {
                      required: 'Este campo es obligatorio'
                    })}
                  />
                </div>
              </div>
              <Controller
                control={control}
                name="evolution"
                rules={{
                  required: 'Este campo es obligatorio'
                }}
                render={({ field }) => (
                  <Select
                    id="evolution"
                    {...field}
                    placeholder="Especialidad"
                    options={evolutionTypesOptions}
                  />
                )}
              />
              <FormErrorMessage>{errors?.evolution && errors?.evolution?.message}</FormErrorMessage>
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
              placeholder="ingresar criterio"
              className="w-full"
              onChange={context.onChange}
              inputRef={inputRef}
            />
            <Link as={NextLink} href={`/especialidad/${context.speciality}`}>
              Cancelar
            </Link>
          </div>
          <HStack spacing={4} mb={4}>
            <Tag size="md" variant="outline" colorScheme="blackAlpha">
              <TagLabel>Filtro demasiado largooooo</TagLabel>
              <TagCloseButton />
            </Tag>
            <Tag size="md" variant="outline" colorScheme="blackAlpha">
              <TagLabel>Filtro demasiado largooooo</TagLabel>
              <TagCloseButton />
            </Tag>
            <Tag size="md" variant="outline" colorScheme="blackAlpha">
              <TagLabel>Filtro demasiado largooooo</TagLabel>
              <TagCloseButton />
            </Tag>
            <Tag size="md" variant="outline" colorScheme="blackAlpha">
              <TagLabel>Filtro demasiado largooooo</TagLabel>
              <TagCloseButton />
            </Tag>
          </HStack>
          {context.matches !== '' && (
            <Heading as="h2" size="sm" noOfLines={1} className="mb-4">
              {context.matches}
            </Heading>
          )}
          <div className="h-3/4 overflow-scroll">
            <div className="block">
              {context.data.evolutions.length > 0 && <Text>Evoluciones</Text>}
              <EvolutionList evolutions={context.data.evolutions} />
            </div>
            <div className="block">
              {context.data.orders.length > 0 && <Text>Ordenes</Text>}
              <EvolutionList evolutions={context.data.orders} />
            </div>
            <div className="block">
              {context.data.tests.length > 0 && <Text>Análisis</Text>}
              <EvolutionList evolutions={context.data.tests} />
            </div>
          </div>
          <div className="absolute bottom-4 w-full pr-16">
            <Button className="w-full gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Swimmer /> Filtros
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
