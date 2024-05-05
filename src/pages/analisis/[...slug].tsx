import { specialityData } from '@constants/index'
import { getSession } from '@src/shared'
import AttachmentsView from '@views/Attachments'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

export default function OrdersPage() {
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
  const test = useMemo(() => String(router?.query?.slug?.[1]), [router.query.slug])
  const testData = useMemo(
    () => specialityData.tests.find((item) => String(item.id) === test),
    [test]
  )
  const title = useMemo(() => String(testData?.title), [testData])

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
        ? `/especialidad/${speciality}?type=test`
        : `/especialidad/${patientId}/${speciality}?type=test`,
    [isPatient, patientId, speciality]
  )

  const data = useMemo(
    () => ({
      description: lorem,
      attachments: [
        {
          url: 'https://cdn.pixabay.com/photo/2020/02/02/16/06/arm-4813365_1280.jpg',
          alt: 'x-ray'
        },
        {
          url: 'https://cdn.pixabay.com/photo/2018/11/20/16/44/laboratory-3827742_1280.jpg',
          alt: 'Test'
        }
      ]
    }),
    []
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <AttachmentsView
      goBackRef={goBackRef}
      title={title}
      data={data}
      isPatient={isPatient}
      type="test"
    />
  )
}
