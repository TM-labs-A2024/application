import DoctorProfile from '@components/organisms/DoctorProfile'
import { DoctorsLayout } from '@layouts/index'
import { Doctor, ReactSelectOption } from '@src/types'
import React from 'react'

export default function DoctorProfileView({
  context
}: {
  context: {
    doctor: Doctor
    specialtiesOptions: {
      value: string
      label: string
    }[]
    onSubmit: (specialties: ReactSelectOption[]) => void
    onLogout?: () => void
  }
}) {
  return (
    <DoctorsLayout>
      <DoctorProfile context={context} />
    </DoctorsLayout>
  )
}
