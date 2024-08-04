import Institution from '@components/organisms/Institution'
import { Institution as InstitutionType } from '@src/types'
import React, { ReactElement } from 'react'

export default function InstitutionView({
  context
}: {
  context: {
    institution: InstitutionType
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
  return <Institution context={context} />
}
