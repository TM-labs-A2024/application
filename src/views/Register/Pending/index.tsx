import PendingDoctor from '@components/organisms/PendingDoctor'
import React from 'react'

export default function PendingDoctorView({
  name,
  id,
  onClick
}: {
  name: string
  id: string
  onClick: () => void
}) {
  return <PendingDoctor name={name} id={id} onClick={onClick} />
}
