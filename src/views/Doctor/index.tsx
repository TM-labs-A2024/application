import Doctor from '@components/organisms/Doctor'
import { Doctor as DoctorType, ReactSelectOption } from '@src/types'
import React from 'react'

export default function DoctorView({
  context
}: {
  context: {
    specialties: ReactSelectOption[]
    doctor: DoctorType
    isDenialOpen: boolean
    onDenialOpen: () => void
    onDenialClose: () => void
    isApprovalOpen: boolean
    onApprovalOpen: () => void
    onApprovalClose: () => void
    isRemovalOpen: boolean
    onRemovalOpen: () => void
    onRemovalClose: () => void
    onApproval: () => void
    onDenial: () => void
    onRemoval: () => void
    isLoading: boolean
  }
}) {
  return <Doctor context={context} />
}
