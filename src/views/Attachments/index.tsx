import Attachments from '@src/components/organisms/Attachments'
import React from 'react'

export default function AttachmentsView({
  context
}: {
  context: {
    goBackRef: string
    title: string
    data: {
      description: string
      attachments: { url: string; alt: string }[]
    }
    isPatient: boolean
    isDoctor: boolean
    isOpen: boolean
    description: string
    onClose: () => void
    onDeleteClick: (type: string) => void
    onSubmit: () => void
  }
}) {
  return <Attachments context={context} />
}
