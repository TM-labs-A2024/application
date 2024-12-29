import { Link } from '@chakra-ui/react'
import LoginForm from '@components/molecules/Forms/Login'
import Splash from '@src/components/atoms/Splash'
import { Login } from '@src/types'
import NextLink from 'next/link'
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
    loginInstitution: (arg: Login) => void
    loginGovernment: (arg: Login) => void
  }
}) {
  return context.isLoading ? (
    <Splash />
  ) : (
    <div className="flex h-screen w-screen flex-col items-center justify-between p-24">
      <Logo />
      <LoginForm context={context} />
      <Link as={NextLink} href="/registro">
        Crear cuenta
      </Link>
    </div>
  )
}
