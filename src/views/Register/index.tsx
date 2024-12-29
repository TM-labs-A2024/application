import { RegisterForm } from '@components/molecules/Forms/Register'
import { Patient, DoctorUpdate, Institution, Specialties, Nurse, Login } from '@src/types'
import React from 'react'

export default function RegisterView({
  context
}: {
  context: {
    createPatient: (arg: Patient) => void
    createDoctor: (arg: DoctorUpdate) => void
    createNurse: (arg: Nurse) => void
    loginPatient: (arg: Login) => void
    loginDoctor: (arg: Login) => void
    loginNurse: (arg: Login) => void
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
