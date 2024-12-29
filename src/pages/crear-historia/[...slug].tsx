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
        title: `${data?.type?.label}: ${format(new Date(), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        description: data.reason,
        payload: { ...data }
      }

      if (patient?.status === 'hospitalizado') {
        const hospitalizedBody = {
          ...body,
          bed: patient?.bed
        }

        if (data?.type?.label === 'Alta') {
          createEvolution(body)
        } else {
          createEvolution(hospitalizedBody)
        }
      } else {
        const bedNumber = Math.floor(Math.random() * 100)
        const hospitalizationBody = {
          ...body,
          bed: `1-${bedNumber}`
        }

        if (data?.type?.label === 'Hospitalización') {
          createEvolution(hospitalizationBody)
        } else {
          createEvolution(body)
        }
      }
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
