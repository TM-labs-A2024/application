'use client'

import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Heading,
  InputLeftAddon,
  InputGroup,
  Stack
} from '@chakra-ui/react'
import { userTypes } from '@components/molecules/Forms/Register/Register.constants'
import { specialities } from '@constants/index'
import Image from 'next/image'
import React, { ReactElement, useMemo, useState } from 'react'
import { Controller, useForm, FieldErrors, useWatch } from 'react-hook-form'
import Select from 'react-select'

const specialitiesOptions = specialities.map((option: { name: string }) => ({
  value: option.name,
  label: option.name
}))

const userTypeOptions = userTypes.map((option) => ({
  value: option.name,
  label: option.name
}))

type ReactSelectOption = {
  value: string | number
  label: string
  unit?: string
}

type FormData = {
  type: ReactSelectOption | null
  firstname: string
  lastname: string
  id: string
  birthdate: string
  credential: string
  email: string
  phone: string
  password: string
  repeatPassword: string
  specialty: ReactSelectOption | null
  code: string
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

  const typeField = useWatch({
    control,
    name: 'type'
  })
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

  const type = useMemo(() => typeField?.value, [typeField])
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
              Datos personales
            </Heading>
            <Stack spacing={4} className="h-3/4 overflow-scroll">
              <Controller
                control={control}
                name="type"
                rules={{
                  required: 'Este campo es obligatorio'
                }}
                render={({ field }) => (
                  <Select id="type" {...field} placeholder="Tipo" options={userTypeOptions} />
                )}
              />
              <FormErrorMessage>{errors?.type && errors?.type?.message}</FormErrorMessage>
              <Input
                id="firstname"
                placeholder="Nombres"
                {...register('firstname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.firstname && errors?.firstname?.message}</FormErrorMessage>
              <Input
                id="lastname"
                placeholder="Apellidos"
                {...register('lastname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.lastname && errors?.lastname?.message}</FormErrorMessage>
              <Input
                id="id"
                placeholder="Cédula"
                {...register('id', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.id && errors?.id?.message}</FormErrorMessage>
              <Input
                id="birthdate"
                type="date"
                placeholder="Fecha de nacimiento"
                {...register('birthdate', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.birthdate && errors?.birthdate?.message}</FormErrorMessage>
              {type === 'Médico' && (
                <>
                  <Input
                    id="credential"
                    placeholder="Credencial"
                    {...register('credential', {
                      required: 'Este campo es obligatorio'
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.credential && errors?.credential?.message}
                  </FormErrorMessage>
                  <Controller
                    control={control}
                    name="specialty"
                    rules={{
                      required: 'Este campo es obligatorio'
                    }}
                    render={({ field }) => (
                      <Select
                        id="specialty"
                        isMulti
                        {...field}
                        placeholder="Especialidad"
                        options={specialitiesOptions}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors?.specialty && errors?.specialty?.message}
                  </FormErrorMessage>
                </>
              )}
              <Input
                id="email"
                placeholder="Correo electrónico"
                {...register('email', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.email && errors?.email?.message}</FormErrorMessage>
              <InputGroup>
                <InputLeftAddon>+58</InputLeftAddon>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Teléfono"
                  {...register('phone', {
                    required: 'Este campo es obligatorio'
                  })}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.phone && errors?.phone?.message}</FormErrorMessage>
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
              Seguridad
            </Heading>
            <Stack spacing={4} className="h-3/4 overflow-scroll">
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                {...register('password', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.password && errors?.password?.message}</FormErrorMessage>
              <Input
                id="repeatPassword"
                type="password"
                placeholder="Repetir contraseña"
                {...register('repeatPassword', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>
                {errors?.repeatPassword && errors?.repeatPassword?.message}
              </FormErrorMessage>
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
              {type === 'Institución' ? 'Registrar institución' : 'Registrarse'}
            </Button>
          </FormControl>
        </form>
      )}
    </div>
  )
}
