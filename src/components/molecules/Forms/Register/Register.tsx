/* eslint-disable no-console */
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
import Splash from '@components/atoms/Splash'
import { userTypes, sexTypes } from '@components/molecules/Forms/Register/Register.constants'
import {
  Patient,
  Doctor,
  ReactSelectOption,
  Institution,
  Specialties,
  Nurse,
  Login
} from '@src/types'
import Image from 'next/image'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { Controller, useForm, FieldErrors, useWatch } from 'react-hook-form'
import Select from 'react-select'

const userTypeOptions = userTypes.map((option) => ({
  value: option.name,
  label: option.name
}))

const sexTypeOptions = sexTypes.map((option) => ({
  value: option.name,
  label: option.name
}))

type FormData = {
  id: string
  type: ReactSelectOption | null
  firstname: string
  lastname: string
  govId: string
  birthdate: string
  credentials: string
  email: string
  phoneNumber: string
  password: string
  repeatPassword: string
  specialties: ReactSelectOption[] | null
  sex: ReactSelectOption | null
  institutionId: ReactSelectOption | null
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

export default function RegisterForm({
  context: {
    createPatient,
    createDoctor,
    createNurse,
    loginPatient,
    loginDoctor,
    loginNurse,
    verificationCode,
    userCreated,
    isLoading,
    institutionsData,
    specialtiesData
  }
}: {
  context: {
    createPatient: (arg: Patient) => void
    createDoctor: (arg: Doctor) => void
    createNurse: (arg: Nurse) => void
    loginPatient: (arg: Login) => void
    loginDoctor: (arg: Login) => void
    loginNurse: (arg: Login) => void
    verificationCode: string
    userCreated: boolean
    isLoading: boolean
    institutionsData: Institution[]
    specialtiesData: Specialties
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
  const type = useMemo(() => typeField?.value, [typeField])

  const institutionsOptions = useMemo(
    () =>
      institutionsData?.map((option) => ({
        value: option.id,
        label: option.name
      })),
    [institutionsData]
  )

  const specialtiesOptions = useMemo(
    () =>
      specialtiesData?.map((option) => ({
        value: option.id,
        label: option.name
      })),
    [specialtiesData]
  )

  const onSubmitDetails = (data: FormData) => {
    console.log(JSON.stringify({ ...data }))
    setStep(2)
  }

  const onSubmitPassword = (data: FormData) => {
    console.log(data)
    const body = {
      ...data,
      institutionId: data.institutionId ? String(data.institutionId.value) : '',
      sex: String(data?.sex?.value),
      specialties: data.specialties
        ? data.specialties.map((el: ReactSelectOption) => String(el?.value))
        : []
    }

    if (type === 'Paciente') {
      createPatient(body)
    }

    if (type === 'Médico') {
      createDoctor(body)
    }

    if (type === 'Enfermero/a') {
      createNurse(body)
    }
  }

  const onSubmitConfirmation = (data: FormData) => {
    if (type === 'Paciente') {
      loginPatient(data)
    }

    if (type === 'Médico') {
      loginDoctor(data)
    }

    if (type === 'Enfermero/a') {
      loginNurse(data)
    }
  }

  const verifyErrors = (errors: FieldErrors<FormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (userCreated) {
      setStep(3)
    }
  }, [userCreated])
  // --- END: Side effects -----------------------------------------------------

  return isLoading ? (
    <Splash />
  ) : (
    <div className="h-full w-full px-8 py-12 lg:px-96">
      {step === 1 && (
        <form
          onSubmit={handleSubmit(onSubmitDetails)}
          className="h-full w-full"
          data-testid="register-step-1"
        >
          <FormControl
            isInvalid={verifyErrors(errors)}
            className="flex h-full w-full flex-col justify-between"
          >
            <RegisterHeader />
            <Heading as="h2" size="sm" mb={4} noOfLines={1}>
              Datos personales
            </Heading>
            <Stack className="mb-4 h-3/4 overflow-scroll">
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
                className="mt-2 min-h-10"
                placeholder="Nombres"
                {...register('firstname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.firstname && errors?.firstname?.message}</FormErrorMessage>
              <Input
                id="lastname"
                className="mt-2 min-h-10"
                placeholder="Apellidos"
                {...register('lastname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.lastname && errors?.lastname?.message}</FormErrorMessage>
              <Controller
                control={control}
                name="sex"
                rules={{
                  required: 'Este campo es obligatorio'
                }}
                render={({ field }) => (
                  <Select
                    id="sex"
                    {...field}
                    placeholder="Sexo"
                    options={sexTypeOptions}
                    className="mt-2"
                  />
                )}
              />
              <FormErrorMessage>{errors?.sex && errors?.sex?.message}</FormErrorMessage>
              <Input
                id="id"
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
              {type === 'Médico' && (
                <>
                  <Input
                    id="credentials"
                    className="mt-2 min-h-10"
                    placeholder="Credencial"
                    {...register('credentials', {
                      required: 'Este campo es obligatorio'
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.credentials && errors?.credentials?.message}
                  </FormErrorMessage>
                  <Controller
                    control={control}
                    name="specialties"
                    rules={{
                      required: 'Este campo es obligatorio'
                    }}
                    render={({ field }) => (
                      <Select
                        id="specialties"
                        isMulti
                        {...field}
                        placeholder="Especialidad"
                        options={specialtiesOptions}
                        className="mt-2"
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors?.specialties && errors?.specialties?.message}
                  </FormErrorMessage>
                  <Controller
                    control={control}
                    name="institutionId"
                    rules={{
                      required: 'Este campo es obligatorio'
                    }}
                    render={({ field }) => (
                      <Select
                        id="institutionId"
                        {...field}
                        placeholder="Institución"
                        options={institutionsOptions}
                        className="mt-2"
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors?.institutionId && errors?.institutionId?.message}
                  </FormErrorMessage>
                </>
              )}
              {type === 'Enfermero/a' && (
                <>
                  <Controller
                    control={control}
                    name="institutionId"
                    rules={{
                      required: 'Este campo es obligatorio'
                    }}
                    render={({ field }) => (
                      <Select
                        id="institutionId"
                        {...field}
                        placeholder="Institución"
                        options={institutionsOptions}
                        className="mt-2"
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors?.institutionId && errors?.institutionId?.message}
                  </FormErrorMessage>
                </>
              )}
              <Input
                id="email"
                className="mt-2 min-h-10"
                placeholder="Correo electrónico"
                {...register('email', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.email && errors?.email?.message}</FormErrorMessage>
              <InputGroup className="mt-2">
                <InputLeftAddon>+58</InputLeftAddon>
                <Input
                  id="phoneNumber"
                  className="min-h-10"
                  type="tel"
                  placeholder="Teléfono"
                  {...register('phoneNumber', {
                    required: 'Este campo es obligatorio'
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.phoneNumber && errors?.phoneNumber?.message}
              </FormErrorMessage>
            </Stack>
            <Button isLoading={isSubmitting} type="submit">
              Siguiente
            </Button>
          </FormControl>
        </form>
      )}
      {step === 2 && (
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
              {type === 'Institución' ? 'Registrar institución' : 'Registrarse'}
            </Button>
          </FormControl>
        </form>
      )}
    </div>
  )
}
