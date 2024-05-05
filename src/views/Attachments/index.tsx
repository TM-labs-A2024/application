import Attachments from '@src/components/organisms/Attachments'
import React from 'react'

export default function AttachmentsView({
  goBackRef,
  title,
  data,
  isPatient,
  type
}: {
  goBackRef: string
  title: string
  data: {
    description: string
    attachments: { url: string; alt: string }[]
  }
  isPatient: boolean
  type: string
}) {
  return (
    <Attachments
      goBackRef={goBackRef}
      title={title}
      data={data}
      isPatient={isPatient}
      type={type}
    />
  )
}
