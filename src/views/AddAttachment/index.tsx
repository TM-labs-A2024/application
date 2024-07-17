import AddAttachment from '@components/molecules/Forms/AddAttachment'
import React from 'react'

export default function AddAttachmentView({
  type,
  patientId,
  specialty
}: {
  type: string
  patientId: string
  specialty: string
}) {
  return <AddAttachment type={type} patientId={patientId} specialty={specialty} />
}
