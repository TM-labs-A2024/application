import AddAttachment from '@components/molecules/Forms/AddAttachment'
import React from 'react'

export default function AddAttachmentView({
  type,
  patientId
}: {
  type: string
  patientId: string
}) {
  return <AddAttachment type={type} patientId={patientId} />
}
