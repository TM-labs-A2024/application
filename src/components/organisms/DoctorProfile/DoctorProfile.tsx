import { Text, Stack, Heading, Divider, FormErrorMessage, Button } from '@chakra-ui/react'
import { specialities } from '@constants/index'
import { Doctor } from '@src/types'
import { ReactSelectOption } from '@src/types'
import { isIOS } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import React, { ReactElement, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

const specialitiesOptions = specialities?.map((option: { name: string; id: number }) => ({
  value: option.id,
  label: option.name
}))

type FormData = {
  specialities: ReactSelectOption[]
}

export default function DoctorProfile({ doctor }: { doctor: Doctor }): ReactElement {
  // --- Data and handlers -----------------------------------------------------
  const onSubmitDetails = (data: FormData) => {
    alert(JSON.stringify(data))
  }

  const selectedSpecialities = useMemo(
    () =>
      specialitiesOptions?.filter((speciality) =>
        doctor?.specialities?.includes(Number(speciality?.value))
      ),
    [doctor?.specialities]
  )
  // --- END: Data and handlers ------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<FormData>({ defaultValues: { specialities: selectedSpecialities } })
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  return (
    <div
      className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : ''}`}
      data-testid="doctor-profile"
    >
      <Text className="mb-6 font-medium">Perfil</Text>
      <div className="flex h-full flex-col">
        <form onSubmit={handleSubmit(onSubmitDetails)} className="h-full">
          <div className="h-5/6 overflow-scroll">
            <Stack spacing={1} mb={6}>
              <Heading as="h3" size="md" noOfLines={1}>
                {doctor.firstname} {doctor.lastname}
              </Heading>
              <Text>CI: {doctor.id.toLocaleString('es-ES')}</Text>
            </Stack>
            <Stack mb={6}>
              <h4 className="text-sm text-gray-600">Fecha de nacimiento</h4>
              <Text className="font-medium">
                {format(new Date(doctor.birthdate), "dd 'de' MMMM, yyyy", {
                  locale: es
                })}
              </Text>
            </Stack>
            <Stack mb={6}>
              <h4 className="text-sm text-gray-600">Correo electrónico</h4>
              <Text className="font-medium">{doctor.email}</Text>
            </Stack>
            <Stack mb={6}>
              <h4 className="text-sm text-gray-600">Teléfono</h4>
              <Text className="font-medium">{doctor.phone}</Text>
            </Stack>
            <Divider orientation="horizontal" />
            <Controller
              control={control}
              name="specialities"
              rules={{
                required: 'Este campo es obligatorio'
              }}
              render={({ field }) => (
                <Select
                  id="specialities"
                  className="mt-6"
                  isMulti
                  {...field}
                  placeholder="Especialidad"
                  defaultValue={selectedSpecialities}
                  options={specialitiesOptions}
                />
              )}
            />
            <FormErrorMessage>
              {errors?.specialities && errors?.specialities?.message}
            </FormErrorMessage>
          </div>
          <Button isLoading={isSubmitting} type="submit" className="mt-0 w-full">
            Guardar
          </Button>
        </form>
      </div>
    </div>
  )
}
