import { specialityData } from '@constants/index'
import { getSession } from '@src/shared'
import EvolutionView from '@views/Evolution'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

export default function EvolutionPage() {
  // --- Hooks -----------------------------------------------------------------
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
  const isPatient = useMemo(() => getSession() === 'patient', [])
  const evolution = useMemo(() => String(router?.query?.slug?.[1]), [router.query.slug])
  const evolutionData = useMemo(
    () => specialityData.evolutions.find((item) => String(item.id) === evolution),
    [evolution]
  )

  const title = useMemo(() => {
    if (evolutionData?.type && evolutionData?.date) {
      return `${evolutionData?.type}: ${format(
        new Date(String(evolutionData?.date ?? '')),
        'dd, MMMM yyyy',
        {
          locale: es
        }
      )}`
    }

    return ''
  }, [evolutionData])

  const speciality = useMemo(
    () => (isPatient ? String(router?.query?.slug?.[0]) : String(router?.query?.slug?.[1])),
    [isPatient, router?.query?.slug]
  )

  const patientId = useMemo(
    () => !isPatient && router?.query?.slug?.[0],
    [isPatient, router?.query?.slug]
  )

  const goBackRef = useMemo(
    () =>
      isPatient
        ? `/especialidad/${speciality}?type=evolution`
        : `/especialidad/${patientId}/${speciality}?type=evolution`,
    [isPatient, patientId, speciality]
  )

  const data = useMemo(
    () => [
      {
        title: 'Descripción (notas evolutivas)',
        content: lorem
      },
      {
        title: 'Antecedentes',
        content: lorem
      },
      {
        title: 'Exámenes físicos',
        content: lorem
      },
      {
        title: 'Resumen de ingreso',
        content: lorem
      },
      {
        title: 'Diagnóstico',
        content: lorem
      },
      {
        title: 'Comentarios',
        content: lorem
      }
    ],
    []
  )
  // --- END: Data and handlers ------------------------------------------------

  return <EvolutionView goBackRef={goBackRef} title={title} data={data} />
}
