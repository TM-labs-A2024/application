import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Heading,
  InputLeftAddon,
  InputGroup,
  Stack,
  IconButton,
  Text
} from '@chakra-ui/react'
import { isIOS } from '@utils/index'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'
import { useForm, FieldErrors } from 'react-hook-form'

type FormData = {
  firstname: string
  lastname: string
  id: string
  birthdate: string
  email: string
  phone: string
}

export default function EditPatientForm({
  patient
}: {
  patient: {
    id: number
    firstname: string
    lastname: string
    birthdate: string
    email: string
    phone: string
  }
}): ReactElement {
  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register
  } = useForm<FormData>()

  const router = useRouter()
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
    // TODO: Add mandatory +58 for mobile numbers before submitting if needed
    alert(JSON.stringify(data))
  }

  const verifyErrors = (errors: FieldErrors<FormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}>
      <div className="mb-8 flex flex-row items-center justify-start gap-4">
        <IconButton
          size="xl"
          aria-label="back"
          variant="link"
          icon={<ArrowBackIcon />}
          onClick={() => {
            router.push('/perfil')
          }}
        />
        <Text className="font-medium">Editar perfil</Text>
      </div>
      <form onSubmit={handleSubmit(onSubmitDetails)} className="w-full grow">
        <FormControl
          isInvalid={verifyErrors(errors)}
          className="relative flex h-full w-full flex-col justify-between"
        >
          <Heading as="h2" size="sm" mb={4} noOfLines={1}>
            Datos personales
          </Heading>
          <Stack spacing={4} className="h-3/4 overflow-scroll">
            <Input
              id="firstname"
              defaultValue={patient.firstname}
              placeholder="Nombres"
              {...register('firstname', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>{errors?.firstname && errors?.firstname?.message}</FormErrorMessage>
            <Input
              id="lastname"
              defaultValue={patient.lastname}
              placeholder="Apellidos"
              {...register('lastname', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>{errors?.lastname && errors?.lastname?.message}</FormErrorMessage>
            <Input
              id="id"
              defaultValue={patient.id}
              placeholder="Cédula"
              {...register('id', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>{errors?.id && errors?.id?.message}</FormErrorMessage>
            <Input
              id="birthdate"
              defaultValue={format(new Date(patient.birthdate), 'yyyy-MM-dd')}
              type="date"
              placeholder="Fecha de nacimiento"
              {...register('birthdate', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>{errors?.birthdate && errors?.birthdate?.message}</FormErrorMessage>
            <Input
              id="email"
              defaultValue={patient.email}
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
                defaultValue={patient.phone}
                type="tel"
                placeholder="Teléfono"
                {...register('phone', {
                  required: 'Este campo es obligatorio'
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.phone && errors?.phone?.message}</FormErrorMessage>
          </Stack>
          <Button isLoading={isSubmitting} type="submit" className="absolute top-0">
            Guardar
          </Button>
        </FormControl>
      </form>
    </div>
  )
}
