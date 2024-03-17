import Link from '@components/atoms/Link'
import LoginForm from '@components/molecules/Forms/Login'
import React from 'react'

import Logo from '../../../public/static/icons/logo.svg'

export default function LoginView() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between p-24">
      <Logo />
      <LoginForm isLoading={false} />
      <Link href="/registro">Abrir cuenta</Link>
    </div>
  )
}
