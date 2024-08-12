import { Text, Stack, Heading, Divider, FormErrorMessage, Button } from '@chakra-ui/react'
import { Doctor, ReactSelectOption } from '@src/types'
import { isIOS } from '@utils/index'
import { formatDate } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import React, { ReactElement, useMemo, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

type FormData = {
  specialties: ReactSelectOption[]
}

export default function DoctorProfile({
  context: { doctor, specialtiesOptions, onSubmit, onLogout }
}: {
  context: {
    doctor?: Doctor
    specialtiesOptions: {
      value: string
      label: string
    }[]
    onSubmit: (specialties: ReactSelectOption[]) => void
    onLogout?: () => void
  }
}): ReactElement {
  // --- Data and handlers -----------------------------------------------------
  const onSubmitDetails = (data: FormData) => {
    onSubmit(data.specialties)
  }

  const selectedSpecialties = useMemo(
    () =>
      specialtiesOptions?.filter((specialty) =>
        doctor?.specialties?.find((el) => el.id === specialty?.value)
      ),
    [doctor?.specialties, specialtiesOptions]
  )
  // --- END: Data and handlers ------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue
  } = useForm<FormData>({ defaultValues: { specialties: selectedSpecialties } })
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    setValue('specialties', selectedSpecialties)
  }, [selectedSpecialties, setValue])
  // --- END: Side effects -----------------------------------------------------

  return (
    <div
      className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : ''}`}
      data-testid="doctor-profile"
    >
      <Text className="mb-6 font-medium">Perfil</Text>
      <div className="flex h-full flex-col">
        <form onSubmit={handleSubmit(onSubmitDetails)} className="h-5/6">
          <div className="h-5/6 overflow-scroll">
            <Stack spacing={1} mb={6}>
              <Heading as="h3" size="md" noOfLines={1}>
                {doctor?.firstname} {doctor?.lastname}
              </Heading>
              <Text>CI: {doctor?.govId}</Text>
            </Stack>
            <Stack mb={6}>
              <h4 className="text-sm text-gray-600">Fecha de nacimiento</h4>
              <Text className="font-medium">
                {doctor?.birthdate &&
                  format(new Date(formatDate(doctor?.birthdate)), "dd 'de' MMMM, yyyy", {
                    locale: es
                  })}
              </Text>
            </Stack>
            <Stack mb={6}>
              <h4 className="text-sm text-gray-600">Correo electrónico</h4>
              <Text className="font-medium">{doctor?.email}</Text>
            </Stack>
            <Stack mb={6}>
              <h4 className="text-sm text-gray-600">Teléfono</h4>
              <Text className="font-medium">{doctor?.phoneNumber}</Text>
            </Stack>
            <Divider orientation="horizontal" />
            <Controller
              control={control}
              name="specialties"
              rules={{
                required: 'Este campo es obligatorio'
              }}
              render={({ field }) => (
                <Select
                  id="specialties"
                  className="mt-6"
                  isMulti
                  {...field}
                  placeholder="Especialidad"
                  defaultValue={selectedSpecialties}
                  options={specialtiesOptions}
                />
              )}
            />
            <FormErrorMessage>
              {errors?.specialties && errors?.specialties?.message}
            </FormErrorMessage>
          </div>
          <Button isLoading={isSubmitting} type="submit" className="mt-0 w-full">
            Guardar
          </Button>
          <Button type="button" colorScheme="blackAlpha" className="mt-4 w-full" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </form>
      </div>
    </div>
  )
}
