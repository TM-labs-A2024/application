import { HamburgerIcon } from '@chakra-ui/icons'
import { Text, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import RequestsList from '@components/molecules/RequestsList'
import { Institution as InstitutionType } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import Image from 'next/image'
import React, { useMemo } from 'react'

import Logo from '../../../../public/static/icons/logo.svg'

export default function MinistryRequests({ institutions }: { institutions: InstitutionType[] }) {
  // --- Data and handlers -----------------------------------------------------
  const formatedRequests = useMemo(
    () =>
      institutions.map(({ id, name, credentials }) => ({
        href: `/ministerio/institucion/${id}`,
        title: name,
        description: `RIF ${credentials}`
      })),
    [institutions]
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 ${isIOS() ? 'pb-24 pt-20' : 'pb-24 pt-10'} ${isAndroid() ?? 'pb-64 pt-8'}`}
      data-testid="institution-requests"
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
            <MenuItem as="a" href="/ministerio/instituciones">
              Instituciones con acceso
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {formatedRequests.length > 0 && (
        <div className="h-full lg:px-80">
          <RequestsList requests={formatedRequests} label="Solicitudes pendientes" />
        </div>
      )}
      {formatedRequests.length === 0 && (
        <div
          className="flex h-3/4 w-full flex-col items-center justify-center"
          data-testid="pending-institutions-empty-state"
        >
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
