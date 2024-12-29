import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Heading
} from '@chakra-ui/react'
import RequestsList from '@components/molecules/RequestsList'
import { Doctor as DoctorType, ReactSelectOption, Nurse } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { RiHealthBookFill } from 'react-icons/ri'

import Logo from '../../../../public/static/icons/logo.svg'

export default function InstitutionRequests({
  context: { doctors, nurses, specialtiesOptions }
}: {
  context: {
    doctors?: DoctorType[]
    nurses?: Nurse[]
    specialtiesOptions: ReactSelectOption[]
  }
}) {
  // --- Data and handlers -----------------------------------------------------
  const formatedRequests = useMemo(
    () =>
      doctors?.map(({ id, govId, firstname, lastname, specialties, requestId }) => ({
        href: `/institucion/medico/${id}/${requestId}`,
        title: `${firstname} ${lastname}`,
        description: `C.I: ${govId},${specialties.map((specialty) => ' ' + specialtiesOptions.find((el) => el?.value === specialty.id)?.label)}.`
      })),
    [doctors, specialtiesOptions]
  )

  const nursesRequests = useMemo(
    () =>
      nurses?.map(({ id, govId, firstname, lastname, requestId }) => ({
        href: `/institucion/enfermero/${id}/${requestId}`,
        title: `${firstname} ${lastname}`,
        description: `C.I: ${govId}.`
      })),
    [nurses]
  )

  const showTitle =
    (formatedRequests && formatedRequests?.length > 0) ||
    (nursesRequests && nursesRequests?.length > 0)
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 ${isIOS() ? 'pb-24 pt-20' : 'pb-24 pt-10'} ${isAndroid() ?? 'pb-64 pt-8'}`}
      data-testid="institution-requests"
    >
      <div className={`mb-8 flex flex-row justify-between`}>
        <Logo />
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
              <Link href="/institucion/medicos">Personal con acceso</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/perfil/institucion">Perfil de la institución</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {showTitle && (
        <Heading as="h2" size="sm" className="mb-4">
          Solicitudes pendientes
        </Heading>
      )}
      {formatedRequests && formatedRequests?.length > 0 && (
        <div className="lg:px-80">
          <RequestsList requests={formatedRequests} label="Médicos" />
        </div>
      )}
      {nursesRequests && nursesRequests?.length > 0 && (
        <div className="lg:px-80">
          <RequestsList requests={nursesRequests} label="Efermeros y enfermeras" />
        </div>
      )}
      {formatedRequests?.length === 0 && nursesRequests?.length === 0 && (
        <div
          className="flex h-3/4 w-full flex-col items-center justify-center"
          data-testid="pending-doctors-empty-state"
        >
          <Icon fontSize="xxx-large" as={RiHealthBookFill} />
          <Text textAlign="center" mt={4}>
            No hay solicitudes aún.
          </Text>
        </div>
      )}
    </div>
  )
}
