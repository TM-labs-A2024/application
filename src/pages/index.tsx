import { Link } from '@chakra-ui/react'
import { setSession } from '@shared/index'
import NextLink from 'next/link'
import React from 'react'

import Logo from '../../public/static/icons/logo.svg'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Logo />
      <Link
        as={NextLink}
        className="mb-2 mt-6 flex w-4/5 items-center justify-center rounded-md border border-black p-2 text-center no-underline hover:scale-105 md:w-2/5"
        href="/login"
        onClick={() => setSession('patient', '', '')}
      >
        Soy paciente
      </Link>
      <Link
        as={NextLink}
        className="my-2 flex w-4/5 items-center justify-center rounded-md border border-black p-2 text-center no-underline hover:scale-105 md:w-2/5"
        href="/login"
        onClick={() => setSession('doctor', '', '')}
      >
        Soy doctor
      </Link>
      <Link
        as={NextLink}
        className="my-2 flex w-4/5 items-center justify-center rounded-md border border-black p-2 text-center no-underline hover:scale-105 md:w-2/5"
        href="/login"
        onClick={() => setSession('enfermere', '', '')}
      >
        Soy enfermera/o
      </Link>
      <Link
        as={NextLink}
        className="my-2 flex w-4/5 items-center justify-center rounded-md border border-black p-2 text-center no-underline hover:scale-105 md:w-2/5"
        href="/login"
        onClick={() => setSession('institucion', '', '')}
      >
        Soy institución
      </Link>
      <Link
        as={NextLink}
        className="my-2 flex w-4/5 items-center justify-center rounded-md border border-black p-2 text-center no-underline hover:scale-105 md:w-2/5"
        href="/login"
        onClick={() => setSession('ministerio', '', '')}
      >
        Soy el ministerio
      </Link>
      <Link
        as={NextLink}
        className="my-2 flex w-4/5 items-center justify-center rounded-md border border-black p-2 text-center no-underline hover:scale-105 md:w-2/5"
        href="/registro"
        onClick={() => setSession('', '', '')}
      >
        Registro
      </Link>
      <Link
        as={NextLink}
        className="my-2 flex w-4/5 items-center justify-center rounded-md border border-black p-2 text-center no-underline hover:scale-105 md:w-2/5"
        href="/registro-institucion"
        onClick={() => setSession('', '', '')}
      >
        Registro de instituciones
      </Link>
    </main>
  )
}
