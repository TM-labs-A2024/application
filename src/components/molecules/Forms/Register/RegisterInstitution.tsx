'use client'

import { Button, FormControl, FormErrorMessage, Input, Heading, Stack } from '@chakra-ui/react'
import { institutionTypes } from '@components/molecules/Forms/Register/Register.constants'
import Image from 'next/image'
import React, { ReactElement, useState } from 'react'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import Select from 'react-select'

const institutionTypeOptions = institutionTypes.map((option) => ({
  value: option.name,
  label: option.name
}))

type ReactSelectOption = {
  value: string | number
  label: string
  unit?: string
}

type FormData = {
  firstname: string
  lastname: string
  credential: string
  email: string
  password: string
  repeatPassword: string
  code: string
  title: string
  institution: string
  institutionId: string
  institutionType: ReactSelectOption | null
}

function RegisterHeader() {
  return (
    <>
      <Image
        alt="logo"
        src="/static/images/logo-horizontal.png"
        width={200}
        height={80}
        className="mx-auto my-4 hidden md:block"
      />
      <Heading as="h2" size="md" mb={4} noOfLines={1}>
        Registro
      </Heading>
    </>
  )
}

export default function RegisterForm(): ReactElement {
  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    register
  } = useForm<FormData>()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [step, setStep] = useState(1)
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onSubmitDetails = (data: FormData) => {
    alert(JSON.stringify(data))
    setStep(2)
  }

  const onSubmitPassword = (data: FormData) => {
    alert(JSON.stringify(data))
    setStep(3)
  }

  const onSubmitConfirmation = (data: FormData) => {
    alert(JSON.stringify(data))
  }

  const verifyErrors = (errors: FieldErrors<FormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div className="h-full w-full p-8 lg:px-96">
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitDetails)} className="h-full w-full">
          <FormControl
            isInvalid={verifyErrors(errors)}
            className="flex h-full w-full flex-col justify-between"
          >
            <RegisterHeader />
            <Heading as="h2" size="sm" mb={4} noOfLines={1}>
              Datos de la institución
            </Heading>
            <Stack spacing={4} className="h-3/4 overflow-scroll">
              <Input
                id="institution"
                placeholder="Nombre de la institución"
                {...register('institution', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>
                {errors?.institution && errors?.institution?.message}
              </FormErrorMessage>
              <Input
                id="institutionId"
                placeholder="RIF"
                {...register('institutionId', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>
                {errors?.institutionId && errors?.institutionId?.message}
              </FormErrorMessage>
              <Input
                id="credential"
                placeholder="Credenciales"
                {...register('credential', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>
                {errors?.credential && errors?.credential?.message}
              </FormErrorMessage>
              <Controller
                control={control}
                name="institutionType"
                rules={{
                  required: 'Este campo es obligatorio'
                }}
                render={({ field }) => (
                  <Select
                    id="institutionType"
                    {...field}
                    placeholder="Tipo de institución"
                    options={institutionTypeOptions}
                  />
                )}
              />
              <FormErrorMessage>
                {errors?.institutionType && errors?.institutionType?.message}
              </FormErrorMessage>
            </Stack>
            <Button isLoading={isSubmitting} type="submit">
              Siguiente
            </Button>
          </FormControl>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitPassword)} className="h-full w-full">
          <FormControl
            isInvalid={verifyErrors(errors)}
            className="flex h-full w-full flex-col justify-between"
          >
            <RegisterHeader />
            <Heading as="h2" size="sm" mb={4} noOfLines={1}>
              Datos de administración
            </Heading>
            <Stack spacing={4} className="h-3/4 overflow-scroll">
              <Input
                id="firstname"
                placeholder="Nombre"
                {...register('firstname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.firstname && errors?.firstname?.message}</FormErrorMessage>
              <Input
                id="lastname"
                placeholder="Apellido"
                {...register('lastname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.lastname && errors?.lastname?.message}</FormErrorMessage>
              <Input
                id="title"
                placeholder="Cargo"
                {...register('title', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.title && errors?.title?.message}</FormErrorMessage>
              <Input
                id="email"
                placeholder="Correo electrónico"
                {...register('email', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.email && errors?.email?.message}</FormErrorMessage>
            </Stack>
            <Button isLoading={isSubmitting} type="submit">
              Siguiente
            </Button>
          </FormControl>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitConfirmation)} className="h-full w-full">
          <FormControl
            isInvalid={verifyErrors(errors)}
            className="flex h-full w-full flex-col justify-between"
          >
            <RegisterHeader />
            <Heading as="h2" size="sm" mb={4} noOfLines={1}>
              Confirmar correo electronico
            </Heading>
            <Stack spacing={4} className="h-3/4 overflow-scroll">
              <Input
                id="code"
                placeholder="Ingresar código"
                {...register('code', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.code && errors?.code?.message}</FormErrorMessage>
            </Stack>
            <Button isLoading={isSubmitting} type="submit">
              Registrar institución
            </Button>
          </FormControl>
        </form>
      )}
    </div>
  )
}
