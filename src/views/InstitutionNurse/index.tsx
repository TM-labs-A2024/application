import InstitutionNurse from '@components/organisms/InstitutionNurse'
import { Nurse as NurseType } from '@src/types'
import React, { ReactElement } from 'react'

export default function InstitutionNurseView({
  context
}: {
  context: {
    nurse: NurseType
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
  return <InstitutionNurse context={context} />
}
