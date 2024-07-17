import AddAttachmentView from '@src/views/AddAttachment'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function AddAttachmentPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const type = useMemo(() => String(router?.query?.type), [router?.query?.type])

  const patientId = useMemo(() => String(router?.query?.slug?.[0]), [router?.query?.slug])

  const specialty = useMemo(() => String(router?.query?.slug?.[1]), [router?.query?.slug])
  // --- END: Data and handlers ------------------------------------------------

  return <AddAttachmentView type={type} patientId={patientId} specialty={specialty} />
}
