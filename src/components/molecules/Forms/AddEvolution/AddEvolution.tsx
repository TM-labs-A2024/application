import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  IconButton,
  Text,
  Textarea
} from '@chakra-ui/react'
import { evolutionTypes } from '@src/constants'
import { EvolutionFormData } from '@src/types'
import { isIOS } from '@utils/index'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import Select from 'react-select'

const userTypeOptions = evolutionTypes.map((option) => ({
  value: option.id,
  label: option.name
}))

export default function AddEvolutionForm({
  context: { onSubmit, isLoading }
}: {
  context: { onSubmit: (data: EvolutionFormData) => void; isLoading: boolean }
}): ReactElement {
  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    control
  } = useForm<EvolutionFormData>()

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
  const onSubmitDetails = (data: EvolutionFormData) => {
    onSubmit(data)
  }

  const verifyErrors = (errors: FieldErrors<EvolutionFormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`flex h-screen w-screen flex-col overflow-hidden p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="add-evolution-form"
    >
      <div className="mb-8 flex flex-row items-center justify-start">
        <IconButton
          size="xl"
          className="mr-4"
          aria-label="back"
          variant="link"
          icon={<ArrowBackIcon />}
          onClick={() => {
            router.back()
          }}
        />
        <Text className="font-medium">Nueva evolución</Text>
      </div>
      <form onSubmit={handleSubmit(onSubmitDetails)} className="h-full w-full">
        <FormControl
          isInvalid={verifyErrors(errors)}
          className="relative flex h-full w-full flex-col justify-between"
        >
          <Stack className="h-5/6 overflow-scroll">
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
              id="reason"
              placeholder="Patología"
              className="mt-2 min-h-10"
              {...register('reason', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>{errors?.reason && errors?.reason?.message}</FormErrorMessage>
            <label htmlFor="description">Descripción (Notas evolutivas)</label>
            <Textarea
              id="description"
              {...register('description', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>
              {errors?.description && errors?.description?.message}
            </FormErrorMessage>
            <label htmlFor="history">Antecedentes</label>
            <Textarea
              id="history"
              {...register('history', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>{errors?.history && errors?.history?.message}</FormErrorMessage>
            <label htmlFor="examination">Exámenes físicos</label>
            <Textarea
              id="examination"
              {...register('examination', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>
              {errors?.examination && errors?.examination?.message}
            </FormErrorMessage>
            <label htmlFor="comments">Comentarios</label>
            <Textarea id="comments" {...register('comments')} />
          </Stack>
          <Button
            isLoading={isSubmitting || isLoading}
            type="submit"
            className="absolute bottom-12"
          >
            Guardar
          </Button>
        </FormControl>
      </form>
    </div>
  )
}
