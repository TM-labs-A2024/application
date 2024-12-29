import { useRecordMutation, useDoctorPatients } from '@src/services'
import { getUser } from '@src/shared'
import { AttachmentFormData } from '@src/types'
import AddAttachmentView from '@src/views/AddAttachment'
import { useRouter } from 'next/navigation'
import { useRouter as queryRouter } from 'next/router'
import React, { useMemo, useCallback } from 'react'

export default function AddAttachmentPage() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()
  const router = useRouter()
  const route = queryRouter()
  const patientId = useMemo(() => String(route?.query.slug?.[0]), [route?.query.slug])
  const type = useMemo(() => String(route?.query?.type), [route?.query?.type])
  const specialtyId = useMemo(() => String(route?.query?.slug?.[1]), [route?.query?.slug])

  const { data: patients } = useDoctorPatients(user?.id)
  const patient = patients?.data?.find((el) => el.govId === patientId)

  const { mutate: createRecord, isLoading } = useRecordMutation(() => {
    router.push(`/especialidad/${patient?.govId}/${specialtyId}?type=${type}`)
  })
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
  const onSubmit = useCallback(
    (data: AttachmentFormData) => {
      const form = new FormData()
      form.append('specialty', specialtyId)
      form.append('patientId', patient?.id ?? '')
      form.append('type', type === 'order' ? 'orden' : 'análisis')
      form.append('description', data.description)
      form.append('title', data.title)
      form.append('payload', data.attachment[0])

      createRecord(form)
    },
    [createRecord, patient, specialtyId, type]
  )

  const context = useMemo(
    () => ({
      type,
      specialty: specialtyId,
      patientId,
      onSubmit,
      isLoading
    }),
    [type, specialtyId, patientId, onSubmit, isLoading]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <AddAttachmentView context={context} />
}
