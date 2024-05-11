import { HamburgerIcon } from '@chakra-ui/icons'
import { Text, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import RequestsList from '@components/molecules/RequestsList'
import { patients } from '@src/constants'
import { isIOS, isAndroid } from '@utils/index'
import Image from 'next/image'
import React, { useMemo } from 'react'

import Logo from '../../../../public/static/icons/logo.svg'

export default function InstitutionRequests() {
  // --- Data and handlers -----------------------------------------------------
  const formatedRequests = useMemo(
    () =>
      patients.map(({ uuid, govId, firstname, lastname }) => ({
        href: `/institucion/medico/${uuid}`,
        title: `${firstname} ${lastname}`,
        description: `C.I: ${govId}, Especialidad.`
      })),
    []
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 ${isIOS() ? 'pb-64 pt-20' : 'pb-0 pt-10'} ${isAndroid() ?? 'pb-64 pt-8'}`}
    >
      <div className={`mb-8 flex flex-row justify-between ${isAndroid() && 'mt-8'}`}>
        <Image alt="logo" src="/static/images/logo-horizontal.png" width={200} height={80} />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            size="xl"
            fontSize="30px"
            variant="link"
            icon={<HamburgerIcon />}
            onClick={() => null}
          />
          <MenuList>
            <MenuItem as="a" href="/institucion/medicos">
              Médicos con acceso
            </MenuItem>
            <MenuItem as="a" href="/perfil/institucion">
              Perfil de la institución
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {patients.length > 0 && (
        <div className="h-full lg:px-80">
          <RequestsList requests={formatedRequests} label="Solicitudes pendientes" />
        </div>
      )}
      {patients.length === 0 && (
        <div className="flex h-3/4 w-full flex-col items-center justify-center">
          <Logo />
          <Text textAlign="center" mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis porttitor leo diam
            risus vel elementum in vulputate.
          </Text>
        </div>
      )}
    </div>
  )
}
