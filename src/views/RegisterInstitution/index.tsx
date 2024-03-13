import { RegisterInstitutionForm } from '@components/molecules/Forms/Register'
import React from 'react'

export default function RegisterInstitutionView() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between">
      <RegisterInstitutionForm />
    </div>
  )
}
