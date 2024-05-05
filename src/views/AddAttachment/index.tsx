import AddAttachment from '@components/molecules/Forms/AddAttachment'
import React from 'react'

export default function AddAttachmentView({
  type,
  patientId,
  speciality
}: {
  type: string
  patientId: string
  speciality: string
}) {
  return <AddAttachment type={type} patientId={patientId} speciality={speciality} />
}
