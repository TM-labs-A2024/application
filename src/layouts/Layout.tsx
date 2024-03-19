'use client'

import { Link } from '@chakra-ui/next-js'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import Home from '../../public/static/icons/Home.svg'
import Doctors from '../../public/static/icons/Medicos.svg'
import Profile from '../../public/static/icons/Perfil.svg'

export default function Layout({ children }: { children: React.ReactNode }) {
  // --- Hooks -----------------------------------------------------------------
  const path = usePathname()
  // --- END: Hooks ------------------------------------------------------------

  return (
    <div className="h-screen w-screen overflow-hidden">
      {children}
      <nav>
        <ul className="fixed bottom-0 flex h-16 w-full flex-row justify-around">
          <li
            className={`flex h-full w-1/3 flex-col items-center justify-center ${path === '/especialidades' ? 'border-b-4 border-black' : ''}`}
          >
            <Link
              as={NextLink}
              href="/especialidades"
              className="flex h-full flex-col items-center justify-center"
            >
              <Home className="cursor-pointer" />
              Home
            </Link>
          </li>
          <li
            className={`flex h-full w-1/3 flex-col items-center justify-center ${path === '/medicos' ? 'border-b-4 border-black' : ''}`}
          >
            <Link
              as={NextLink}
              href="/medicos"
              className="flex h-full flex-col items-center justify-center"
            >
              <Doctors className="cursor-pointer" />
              Médicos
            </Link>
          </li>
          <li
            className={`flex h-full w-1/3 flex-col items-center justify-center ${path === '/perfil' ? 'border-b-4 border-black' : ''}`}
          >
            <Link
              as={NextLink}
              href="/perfil"
              className="flex h-full flex-col items-center justify-center"
            >
              <Profile className="cursor-pointer" />
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
