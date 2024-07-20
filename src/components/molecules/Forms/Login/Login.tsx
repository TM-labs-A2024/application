/* eslint-disable no-console */
import { Button, FormErrorMessage, FormControl } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React from 'react'
import { useForm, FieldErrors } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export default function LoginForm({
  context: { isLoading, type, loginPatient, loginDoctor, loginNurse }
}: {
  context: {
    isLoading: boolean
    type: string
    loginPatient: (arg: FormData) => void
    loginDoctor: (arg: FormData) => void
    loginNurse: (arg: FormData) => void
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register
  } = useForm<FormData>()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onSubmitDetails = (data: FormData) => {
    if (type === 'patient') {
      loginPatient(data)
    }

    if (type === 'doctor') {
      loginDoctor(data)
    }

    if (type === 'enfermere') {
      loginNurse(data)
    }
  }

  const verifyErrors = (errors: FieldErrors<FormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmitDetails)}
      data-testid="login-form"
    >
      <FormControl isInvalid={verifyErrors(errors)}>
        <div className="w-full" data-testid="input-component">
          <label htmlFor="email">Correo electrónico</label>
          <Input
            placeholder="Introduzca su correo electrónico"
            size="md"
            disabled={isLoading}
            id="email"
            className="mb-4 mt-1 min-h-10"
            {...register('email', {
              required: 'Este campo es obligatorio'
            })}
          />
        </div>
        <FormErrorMessage>{errors?.email && errors?.email?.message}</FormErrorMessage>
        <div className="w-full" data-testid="input-component">
          <label htmlFor="password">Contraseña</label>
          <Input
            placeholder="Introduzca su contraseña"
            size="md"
            disabled={isLoading}
            id="password"
            className="mb-4 mt-1 min-h-10"
            {...register('password', {
              required: 'Este campo es obligatorio'
            })}
          />
        </div>
        <FormErrorMessage>{errors?.password && errors?.password?.message}</FormErrorMessage>
        <Button isLoading={isSubmitting} type="submit">
          Ingresar
        </Button>
      </FormControl>
    </form>
  )
}
