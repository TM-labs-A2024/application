import { HamburgerIcon } from '@chakra-ui/icons'
import { Text, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import RequestsList from '@components/molecules/RequestsList'
import { specialities as specialitiesList } from '@src/constants'
import { Doctor as DoctorType } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

import Logo from '../../../../public/static/icons/logo.svg'

export default function InstitutionDoctors({ doctors }: { doctors: DoctorType[] }) {
  // --- Data and handlers -----------------------------------------------------
  const formatedRequests = useMemo(
    () =>
      doctors.map(({ id, firstname, lastname, specialities }) => ({
        href: `/institucion/medico/${id}`,
        title: `${firstname} ${lastname}`,
        description: `C.I: ${id},${specialities.map((speciality) => ' ' + specialitiesList.find((el) => el.id === speciality)?.name)}.`
      })),
    [doctors]
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 ${isIOS() ? 'pb-24 pt-20' : 'pb-24 pt-10'} ${isAndroid() ?? 'pb-64 pt-8'}`}
      data-testid="institution-doctors"
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
            <MenuItem>
              <Link href="/institucion/solicitudes">Solicitudes pendientes</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/perfil/institucion">Perfil de la institución</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {formatedRequests.length > 0 && (
        <div className="h-full lg:px-80">
          <RequestsList requests={formatedRequests} label="Médicos con acceso" />
        </div>
      )}
      {formatedRequests.length === 0 && (
        <div
          className="flex h-3/4 w-full flex-col items-center justify-center"
          data-testid="approved-doctors-empty-state"
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
