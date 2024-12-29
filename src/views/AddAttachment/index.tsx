import AddAttachment from '@components/molecules/Forms/AddAttachment'
import { AttachmentFormData } from '@src/types'
import React from 'react'

export default function AddAttachmentView({
  context
}: {
  context: {
    onSubmit: (data: AttachmentFormData) => void
    isLoading: boolean
    type: string
    patientId: string
    specialty: string
  }
}) {
  return <AddAttachment context={context} />
}
