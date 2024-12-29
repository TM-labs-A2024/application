import InstitutionDoctor from '@components/organisms/InstitutionDoctor'
import { Doctor as DoctorType, ReactSelectOption } from '@src/types'
import React, { ReactElement } from 'react'

export default function InstitutionDoctorView({
  context
}: {
  context: {
    doctor: DoctorType
    specialtiesOptions: ReactSelectOption[]
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
}): ReactElement {
  return <InstitutionDoctor context={context} />
}
