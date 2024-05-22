import NurseProfile from '@components/organisms/NurseProfile'
import { DoctorsLayout } from '@layouts/index'
import { Nurse } from '@src/types'
import React from 'react'

export default function NurseProfileView({ nurse }: { nurse: Nurse }) {
  return (
    <DoctorsLayout>
      <NurseProfile nurse={nurse} />
    </DoctorsLayout>
  )
}
