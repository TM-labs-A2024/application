import PendingAccountView from '@views/Register/Pending'
import { useRouter } from 'next/router'
import React from 'react'

export default function PendingAccountPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  return <PendingAccountView onClick={() => router.push('/')} />
}
