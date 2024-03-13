import { RegisterForm } from '@components/molecules/Forms/Register'
import React from 'react'

export default function RegisterView() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between">
      <RegisterForm />
    </div>
  )
}
