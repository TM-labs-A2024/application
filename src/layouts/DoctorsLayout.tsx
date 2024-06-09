import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import { useDisclosure, IconButton } from '@chakra-ui/react'
import Sidebar from '@components/atoms/Sidebar'
import { getSession } from '@src/shared'
import { isIOS, isMobile } from '@utils/index'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useRef, useState, useEffect, useMemo } from 'react'

import Home from '../../public/static/icons/Home.svg'
import Profile from '../../public/static/icons/Perfil.svg'
import Plus from '../../public/static/icons/plus-circle.svg'

export default function Layout({ children }: { children: React.ReactNode }) {
  // --- Hooks -----------------------------------------------------------------
  const path = usePathname()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [_window, setWindow] = useState({ screen: { availWidth: 999 } })
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isDoctor = useMemo(() => getSession() === 'doctor', [])
  // --- END: Data and handlers ------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    setWindow(window)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // --- END: Side effects -----------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  const btnRef = useRef<HTMLButtonElement>(null)
  // --- END: Refs -------------------------------------------------------------

  return (
    <div className="h-screen w-screen overflow-hidden">
      {!isMobile(_window) && (
        <IconButton
          size="xl"
          fontSize="30px"
          aria-label="back"
          variant="link"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          className="fixed left-0 top-0 m-4"
        />
      )}
      {children}
      {isMobile(_window) ? (
        <nav>
          <ul
            className={`fixed ${isIOS() ? 'bottom-8' : 'bottom-0'} flex h-20 w-full flex-row justify-around bg-white`}
          >
            <li
              className={`flex h-full w-1/3 flex-col items-center justify-center ${path === '/pacientes' ? 'border-b-4 border-black' : ''}`}
            >
              <Link
                as={NextLink}
                href="/pacientes"
                className="flex h-full flex-col items-center justify-center"
              >
                <Home className="cursor-pointer" />
                Home
              </Link>
            </li>
            {isDoctor && (
              <li
                className={`flex h-full w-1/3 flex-col items-center justify-center ${path === '/agregar-paciente' ? 'border-b-4 border-black' : ''}`}
              >
                <Link
                  as={NextLink}
                  href="/agregar-paciente"
                  className="flex h-full flex-col items-center justify-center"
                >
                  <Plus className="cursor-pointer" />
                  Nuevo paciente
                </Link>
              </li>
            )}
            <li
              className={`flex h-full w-1/3 flex-col items-center justify-center ${path === '/perfil/doctor' || path === '/perfil/enfermero' ? 'border-b-4 border-black' : ''}`}
            >
              <Link
                as={NextLink}
                href={isDoctor ? '/perfil/doctor' : '/perfil/enfermero'}
                className="flex h-full flex-col items-center justify-center"
              >
                <Profile className="cursor-pointer" />
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <Sidebar isOpen={isOpen} onClose={onClose} innerRef={btnRef}>
          <nav>
            <ul>
              <li
                className={`flex h-20 w-full flex-row items-center justify-center pl-[30%] ${path === '/pacientes' ? 'bg-gray-200' : ''}`}
              >
                <Link
                  as={NextLink}
                  href="/pacientes"
                  className="flex w-full flex-row items-center justify-start gap-8"
                >
                  <Home className="cursor-pointer" />
                  Home
                </Link>
              </li>
              {isDoctor && (
                <li
                  className={`flex h-20 w-full flex-row items-center justify-center pl-[30%] ${path === '/agregar-paciente' ? 'bg-gray-200' : ''}`}
                >
                  <Link
                    as={NextLink}
                    href="/agregar-paciente"
                    className="flex w-full flex-row items-center justify-start gap-8"
                  >
                    <Plus className="cursor-pointer" />
                    Nuevo paciente
                  </Link>
                </li>
              )}
              <li
                className={`flex h-20 w-full flex-row items-center justify-center pl-[30%] ${path === '/perfil/doctor' || path === '/perfil/enfermero' ? 'bg-gray-200' : ''}`}
              >
                <Link
                  as={NextLink}
                  href={isDoctor ? '/perfil/doctor' : '/perfil/enfermero'}
                  className="flex w-full flex-row items-center justify-start gap-8"
                >
                  <Profile className="cursor-pointer" />
                  Perfil
                </Link>
              </li>
            </ul>
          </nav>
        </Sidebar>
      )}
    </div>
  )
}
