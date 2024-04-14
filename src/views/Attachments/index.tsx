import Attachments from '@src/components/organisms/Attachments'
import React from 'react'

export default function AttachmentsView({
  speciality,
  title,
  data,
  type
}: {
  speciality: string
  title: string
  data: {
    description: string
    attachments: { url: string; alt: string }[]
  }
  type: string
}) {
  return <Attachments speciality={speciality} title={title} data={data} type={type} />
}
