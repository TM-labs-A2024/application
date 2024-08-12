import { Link } from '@chakra-ui/react'
import { setSession } from '@shared/index'
import NextLink from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Link as={NextLink} href="/login" onClick={() => setSession('patient', '', '')}>
        Login Paciente
      </Link>
      <Link as={NextLink} href="/login" onClick={() => setSession('doctor', '', '')}>
        Login Doctor
      </Link>
      <Link as={NextLink} href="/login" onClick={() => setSession('enfermere', '', '')}>
        Login Enfermera/o
      </Link>
      <Link as={NextLink} href="/login" onClick={() => setSession('institucion', '', '')}>
        Login Institución
      </Link>
      <Link as={NextLink} href="/login" onClick={() => setSession('ministerio', '', '')}>
        Login Ministerio
      </Link>
      <Link as={NextLink} href="/registro" onClick={() => setSession('', '', '')}>
        Registro
      </Link>
      <Link as={NextLink} href="/registro-institucion" onClick={() => setSession('', '', '')}>
        Registro institución
      </Link>
    </main>
  )
}
