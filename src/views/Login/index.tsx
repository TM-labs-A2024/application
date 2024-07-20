import Link from '@components/atoms/Link'
import LoginForm from '@components/molecules/Forms/Login'
import Splash from '@src/components/atoms/Splash'
import { Login } from '@src/types'
import React from 'react'

import Logo from '../../../public/static/icons/logo.svg'

export default function LoginView({
  context
}: {
  context: {
    isLoading: boolean
    type: string
    loginPatient: (arg: Login) => void
    loginDoctor: (arg: Login) => void
    loginNurse: (arg: Login) => void
  }
}) {
  return context.isLoading ? (
    <Splash />
  ) : (
    <div className="flex h-screen w-screen flex-col items-center justify-between p-24">
      <Logo />
      <LoginForm context={context} />
      <Link href="/registro">Abrir cuenta</Link>
    </div>
  )
}
