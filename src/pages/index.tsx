import { Link } from '@chakra-ui/react'
import { setSession } from '@shared/index'
import NextLink from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Link as={NextLink} href="/especialidades" onClick={() => setSession('patient')}>
        Paciente
      </Link>
      <Link as={NextLink} href="/pacientes" onClick={() => setSession('doctor')}>
        Doctor
      </Link>
      <Link as={NextLink} href="/institucion/solicitudes" onClick={() => setSession('institucion')}>
        Institución
      </Link>
      <Link as={NextLink} href="/ministerio/solicitudes" onClick={() => setSession('ministerio')}>
        Ministerio
      </Link>
    </main>
  )
}
