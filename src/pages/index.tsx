import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Link as={NextLink} href="/especialidades">
        test
      </Link>
    </main>
  )
}
