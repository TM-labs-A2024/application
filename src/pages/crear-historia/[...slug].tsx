/* eslint-disable no-console */
import { useEvolutionMutation, useDoctorPatients } from '@src/services'
import { getUser } from '@src/shared'
import { EvolutionFormData } from '@src/types'
import AddEvolutionView from '@src/views/AddEvolution'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/navigation'
import { useRouter as queryRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'

export default function AddEvolutionPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const route = queryRouter()
  const user = getUser()
  const patientId = route?.query.slug?.[0]
  const specialtyId = route?.query.slug?.[1]

  const { data: patients } = useDoctorPatients(user?.id)
  const patient = patients?.data?.find((el) => el.govId === patientId)

  const { mutate: createEvolution, isLoading } = useEvolutionMutation(() => {
    router.push(`/especialidad/${patient?.govId}/${specialtyId}`)
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
      const body = {
        specialty: specialtyId ?? '',
        patientId: patient?.id ?? '',
        bed: '',
        title: `${data?.type?.label}: ${format(new Date(), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        description: data.reason,
        payload: { ...data }
      }

      createEvolution(body)
    },
    [createEvolution, patient, specialtyId]
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
