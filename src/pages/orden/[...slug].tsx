import { specialityData } from '@constants/index'
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
  const order = useMemo(() => String(router?.query?.slug?.[1]), [router.query.slug])
  const orderData = useMemo(
    () => specialityData.orders.find((item) => String(item.id) === order),
    [order]
  )
  const title = useMemo(() => String(orderData?.title), [orderData])
  const speciality = useMemo(() => String(router?.query?.slug?.[0]), [router.query.slug])
  const data = useMemo(
    () => ({
      description: lorem,
      attachments: [
        {
          url: 'https://cdn.pixabay.com/photo/2018/11/20/16/44/laboratory-3827740_1280.jpg',
          alt: 'Test'
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

  return <AttachmentsView speciality={speciality} title={title} data={data} type={'order'} />
}
