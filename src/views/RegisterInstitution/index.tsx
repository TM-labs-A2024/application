import { RegisterInstitutionForm } from '@components/molecules/Forms/Register'
import { InstitutionRegister, Login } from '@src/types'
import React from 'react'

export default function RegisterInstitutionView({
  context
}: {
  context: {
    createInstitution: (arg: InstitutionRegister) => void
    loginInstitution: (arg: Login) => void
    verificationCode: string
    institutionCreated: boolean
    isLoading: boolean
  }
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between">
      <RegisterInstitutionForm context={context} />
    </div>
  )
}
