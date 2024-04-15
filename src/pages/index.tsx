import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Link as={NextLink} href="/especialidades">
        Paciente
      </Link>
      <Link as={NextLink} href="/pacientes">
        Doctor
      </Link>
      <Link as={NextLink} href="/institucion/solicitudes">
        Institución
      </Link>
      <Link as={NextLink} href="/ministerio/solicitudes">
        Ministerio
      </Link>
    </main>
  )
}
