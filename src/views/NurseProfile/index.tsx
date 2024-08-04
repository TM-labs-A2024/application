import NurseProfile from '@components/organisms/NurseProfile'
import { DoctorsLayout } from '@layouts/index'
import { Nurse } from '@src/types'
import React from 'react'

export default function NurseProfileView({
  nurse,
  onLogout
}: {
  nurse: Nurse
  onLogout?: () => void
}) {
  return (
    <DoctorsLayout>
      <NurseProfile nurse={nurse} onLogout={onLogout} />
    </DoctorsLayout>
  )
}
