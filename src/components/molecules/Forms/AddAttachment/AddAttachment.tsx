import { ArrowBackIcon, AttachmentIcon } from '@chakra-ui/icons'
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
import { AttachmentFormData } from '@src/types'
import { isIOS } from '@utils/index'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useMemo } from 'react'
import { useForm, FieldErrors } from 'react-hook-form'

export default function AddAttachmentForm({
  context: { onSubmit, isLoading, type, patientId, specialty }
}: {
  context: {
    onSubmit: (data: AttachmentFormData) => void
    isLoading: boolean
    type: string
    patientId: string
    specialty: string
  }
}): ReactElement {
  // --- Hooks -----------------------------------------------------------------
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register
  } = useForm<AttachmentFormData>()

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
  const isOrder = useMemo(() => type === 'order', [type])

  const onSubmitDetails = (data: AttachmentFormData) => {
    onSubmit(data)
  }

  const verifyErrors = (errors: FieldErrors<AttachmentFormData>) => Object.keys(errors).length > 0
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`flex h-screen w-screen flex-col overflow-hidden p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="add-attachment-form"
    >
      <div className="mb-8 flex flex-row items-center justify-start">
        <IconButton
          size="xl"
          className="mr-4"
          aria-label="back"
          variant="link"
          icon={<ArrowBackIcon />}
          onClick={() => {
            isOrder
              ? router.push(`/especialidad/${patientId}/${specialty}?type=order`)
              : router.push(`/especialidad/${patientId}/${specialty}?type=test`)
          }}
        />
        {isOrder && <Text className="font-medium">Nueva orden médica</Text>}
        {!isOrder && <Text className="font-medium">Nuevo análisis</Text>}
      </div>
      <form onSubmit={handleSubmit(onSubmitDetails)} className="h-full w-full">
        <FormControl
          isInvalid={verifyErrors(errors)}
          className="relative flex h-full w-full flex-col justify-between"
        >
          <Stack className="h-5/6 overflow-scroll">
            <Input
              id="title"
              placeholder={isOrder ? 'Titulo de la orden' : 'Titulo del análisis'}
              className="min-h-10"
              {...register('title', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>{errors?.title && errors?.title?.message}</FormErrorMessage>
            <Textarea
              className="mt-2"
              id="description"
              placeholder="Descripción"
              {...register('description', {
                required: 'Este campo es obligatorio'
              })}
            />
            <FormErrorMessage>
              {errors?.description && errors?.description?.message}
            </FormErrorMessage>
          </Stack>
          <div className="absolute bottom-12 w-full">
            <label
              className="mb-4 inline-block h-10 min-h-10 w-full cursor-pointer rounded-md border-2 border-black p-1.5 text-center font-medium"
              htmlFor="attachment"
            >
              <AttachmentIcon /> Adjuntar imagen
            </label>
            <Input id="attachment" type="file" className="hidden" {...register('attachment')} />
            <Button isLoading={isSubmitting || isLoading} type="submit" className="w-full">
              Guardar
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  )
}
