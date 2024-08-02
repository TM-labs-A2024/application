/* eslint-disable no-console */
import { useRecordMutation, usePatients } from '@src/services'
import { EvolutionFormData } from '@src/types'
import AddEvolutionView from '@src/views/AddEvolution'
import { useRouter } from 'next/navigation'
import { useRouter as queryRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'

export default function AddEvolutionPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const route = queryRouter()
  const patientId = route?.query.slug?.[0]

  const { data: patients } = usePatients()
  const patient = patients?.data?.find((el) => el.id === patientId)

  const { mutate: createRecord, isLoading } = useRecordMutation(() => {
    router.push(`/especialidades/${patient?.govId}`)
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
    (data: EvolutionFormData) => {
      const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' })

      const form = new FormData()
      form.append('specialty', '89ca4324-1af0-44b8-94cf-116fee714517')
      form.append('patientId', patientId ?? '')
      form.append('type', data?.type?.label ?? '')
      form.append('description', data.description)
      form.append('title', data.reason)
      form.append('payload', blob)

      createRecord(form)
    },
    [createRecord, patientId]
  )

  const context = useMemo(
    () => ({
      onSubmit,
      isLoading
    }),
    [onSubmit, isLoading]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <AddEvolutionView context={context} />
}
