/* eslint-disable no-console */
import { Button, FormControl, FormErrorMessage, Input, Heading, Stack } from '@chakra-ui/react'
import Splash from '@components/atoms/Splash'
import { institutionTypes } from '@components/molecules/Forms/Register/Register.constants'
import { InstitutionRegister, Login, ReactSelectOption } from '@src/types'
import React, { ReactElement, useState, useEffect } from 'react'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import Select from 'react-select'

import Logo from '../../../../../public/static/icons/logo.svg'

const institutionTypeOptions = institutionTypes.map((option) => ({
  value: option.name,
  label: option.name
}))

type FormData = {
  address: string
  firstname: string
  lastname: string
  govId: string
  birthdate: string
  credentials: string
  email: string
  phoneNumber: string
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
      <Logo className="mx-auto my-4 hidden md:block" />
      <Heading as="h2" size="md" mb={4} noOfLines={1}>
        Registro
      </Heading>
    </>
  )
}

export default function RegisterForm({
  context: { createInstitution, loginInstitution, verificationCode, institutionCreated, isLoading }
}: {
  context: {
    createInstitution: (arg: InstitutionRegister) => void
    loginInstitution: (arg: Login) => void
    verificationCode: string
    institutionCreated: boolean
    isLoading: boolean
  }
}): ReactElement {
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
    console.log(JSON.stringify(data))
    setStep(2)
  }

  const onSubmitUserDetails = (data: FormData) => {
    console.log(JSON.stringify(data))
    setStep(3)
  }

  const onSubmitPassword = (data: FormData) => {
    const body = {
      name: data.institution,
      govId: data.institutionId,
      credentials: data.credentials,
      type: String(data?.institutionType?.value).toLocaleLowerCase(),
      address: data.address,
      institutionUser: {
        firstname: data.firstname,
        lastname: data.lastname,
        govId: data.govId,
        birthdate: data.birthdate,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        role: data.title
      }
    }

    createInstitution(body)
  }

  const onSubmitConfirmation = (data: FormData) => {
    loginInstitution(data)
  }

  const verifyErrors = (errors: FieldErrors<FormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (institutionCreated) {
      setStep(4)
    }
  }, [institutionCreated])
  // --- END: Side effects -----------------------------------------------------

  return isLoading ? (
    <Splash />
  ) : (
    <div className="h-full w-full px-8 py-12 lg:px-96">
      {step === 1 && (
        <form
          onSubmit={handleSubmit(onSubmitDetails)}
          className="h-full w-full"
          data-testid="register-institution-step-1"
        >
          <FormControl
            isInvalid={verifyErrors(errors)}
            className="flex h-full w-full flex-col justify-between"
          >
            <RegisterHeader />
            <Heading as="h2" size="sm" mb={4} noOfLines={1}>
              Datos de la institución
            </Heading>
            <Stack className="h-3/4 overflow-scroll">
              <Input
                id="institution"
                className="mt-2 min-h-10"
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
                className="mt-2 min-h-10"
                placeholder="RIF"
                {...register('institutionId', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>
                {errors?.institutionId && errors?.institutionId?.message}
              </FormErrorMessage>
              <Input
                id="address"
                className="mt-2 min-h-10"
                placeholder="Dirección"
                {...register('address', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.address && errors?.address?.message}</FormErrorMessage>
              <Input
                id="credentials"
                className="mt-2 min-h-10"
                placeholder="Credenciales"
                {...register('credentials', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>
                {errors?.credentials && errors?.credentials?.message}
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
                    className="mt-2"
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
        <form onSubmit={handleSubmit(onSubmitUserDetails)} className="h-full w-full">
          <FormControl
            isInvalid={verifyErrors(errors)}
            className="flex h-full w-full flex-col justify-between"
          >
            <RegisterHeader />
            <Heading as="h2" size="sm" mb={4} noOfLines={1}>
              Datos de administración
            </Heading>
            <Stack className="h-3/4 overflow-scroll">
              <Input
                id="firstname"
                className="mt-2 min-h-10"
                placeholder="Nombre"
                {...register('firstname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.firstname && errors?.firstname?.message}</FormErrorMessage>
              <Input
                id="lastname"
                className="mt-2 min-h-10"
                placeholder="Apellido"
                {...register('lastname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.lastname && errors?.lastname?.message}</FormErrorMessage>
              <Input
                id="govId"
                className="mt-2 min-h-10"
                placeholder="Cédula"
                {...register('govId', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.govId && errors?.govId?.message}</FormErrorMessage>
              <Input
                id="birthdate"
                className="mt-2 min-h-10"
                type="date"
                placeholder="Fecha de nacimiento"
                {...register('birthdate', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.birthdate && errors?.birthdate?.message}</FormErrorMessage>
              <Input
                id="title"
                className="mt-2 min-h-10"
                placeholder="Cargo"
                {...register('title', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.title && errors?.title?.message}</FormErrorMessage>
              <Input
                id="phoneNumber"
                className="mt-2 min-h-10"
                placeholder="Teléfono"
                {...register('phoneNumber', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>
                {errors?.phoneNumber && errors?.phoneNumber?.message}
              </FormErrorMessage>
              <Input
                id="email"
                className="mt-2 min-h-10"
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
        <form
          onSubmit={handleSubmit(onSubmitPassword)}
          className="h-full w-full"
          data-testid="register-step-2"
        >
          <FormControl
            isInvalid={verifyErrors(errors)}
            className="flex h-full w-full flex-col justify-between"
          >
            <RegisterHeader />
            <Heading as="h2" size="sm" mb={4} noOfLines={1}>
              Seguridad
            </Heading>
            <Stack className="h-3/4 overflow-scroll">
              <Input
                id="password"
                className="mt-2 min-h-10"
                type="password"
                placeholder="Contraseña"
                {...register('password', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.password && errors?.password?.message}</FormErrorMessage>
              <Input
                id="repeatPassword"
                className="mt-2 min-h-10"
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
      {step === 4 && (
        <form onSubmit={handleSubmit(onSubmitConfirmation)} className="h-full w-full">
          <FormControl
            isInvalid={verifyErrors(errors)}
            className="flex h-full w-full flex-col justify-between"
          >
            <RegisterHeader />
            <Heading as="h2" size="sm" mb={4} noOfLines={1}>
              Confirmar correo electronico
            </Heading>
            <Stack className="h-3/4 overflow-scroll">
              <Input
                id="code"
                className="mt-2 min-h-10"
                placeholder="Ingresar código"
                {...register('code', {
                  required: 'Este campo es obligatorio',
                  validate: {
                    verifyCode: (code) => verificationCode === code || 'El código no concuerda'
                  }
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
