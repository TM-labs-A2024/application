import { RegisterForm } from '@components/molecules/Forms/Register'
import { Patient, Doctor, Institution, Specialties } from '@src/types'
import React from 'react'

export default function RegisterView({
  context
}: {
  context: {
    createPatient: (arg: Patient) => void
    createDoctor: (arg: Doctor) => void
    verificationCode: string
    userCreated: boolean
    isLoading: boolean
    institutionsData: Institution[]
    specialtiesData: Specialties
  }
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between">
      <RegisterForm context={context} />
    </div>
  )
}
