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
import {
  userTypes,
  genderTypes,
  institutions
} from '@components/molecules/Forms/Register/Register.constants'
import { specialities } from '@constants/index'
import { ReactSelectOption } from '@src/types'
// import { sendEmail } from '@utils/email'
import Image from 'next/image'
import React, { ReactElement, useMemo, useState } from 'react'
import { Controller, useForm, FieldErrors, useWatch } from 'react-hook-form'
import Select from 'react-select'

const specialitiesOptions = specialities.map((option: { name: string; id: number }) => ({
  value: option.id,
  label: option.name
}))

const userTypeOptions = userTypes.map((option) => ({
  value: option.name,
  label: option.name
}))

const genderTypeOptions = genderTypes.map((option) => ({
  value: option.name,
  label: option.name
}))

const institutionsOptions = institutions.map((option) => ({
  value: option.name,
  label: option.name
}))

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
  gender: ReactSelectOption | null
  institution: ReactSelectOption | null
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
  const [codeToVerify, setCodeToVerify] = useState('')

  const typeField = useWatch({
    control,
    name: 'type'
  })

  // const codeField = useWatch({
  //   name: 'code'
  // })
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
    const verificationCode = String(Math.floor(Math.random() * 1000000))
    // const emailTemplate = {
    //   from_name: 'HealthCore',
    //   to_name: data.firstname,
    //   code: verificationCode,
    //   to_email: data.email
    // }
    // sendEmail(emailTemplate)
    setCodeToVerify(verificationCode)
    setStep(3)
    alert(JSON.stringify({ ...data, codeToVerify, verificationCode }))
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
                className="min-h-10"
                placeholder="Nombres"
                {...register('firstname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.firstname && errors?.firstname?.message}</FormErrorMessage>
              <Input
                id="lastname"
                className="min-h-10"
                placeholder="Apellidos"
                {...register('lastname', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.lastname && errors?.lastname?.message}</FormErrorMessage>
              <Controller
                control={control}
                name="gender"
                rules={{
                  required: 'Este campo es obligatorio'
                }}
                render={({ field }) => (
                  <Select id="gender" {...field} placeholder="Sexo" options={genderTypeOptions} />
                )}
              />
              <Input
                id="id"
                className="min-h-10"
                placeholder="Cédula"
                {...register('id', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.id && errors?.id?.message}</FormErrorMessage>
              <Input
                id="birthdate"
                className="min-h-10"
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
                    className="min-h-10"
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
                  <Controller
                    control={control}
                    name="institution"
                    rules={{
                      required: 'Este campo es obligatorio'
                    }}
                    render={({ field }) => (
                      <Select
                        id="institution"
                        {...field}
                        placeholder="Institución"
                        options={institutionsOptions}
                      />
                    )}
                  />
                </>
              )}
              <Input
                id="email"
                className="min-h-10"
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
                  className="min-h-10"
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
            <Stack spacing={4} className="h-3/4 overflow-scroll">
              <Input
                id="password"
                className="min-h-10"
                type="password"
                placeholder="Contraseña"
                {...register('password', {
                  required: 'Este campo es obligatorio'
                })}
              />
              <FormErrorMessage>{errors?.password && errors?.password?.message}</FormErrorMessage>
              <Input
                id="repeatPassword"
                className="min-h-10"
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
                className="min-h-10"
                placeholder="Ingresar código"
                {...register('code', {
                  required: 'Este campo es obligatorio',
                  validate: {
                    verifyCode: (code) => codeToVerify === code || 'El código no concuerda'
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
