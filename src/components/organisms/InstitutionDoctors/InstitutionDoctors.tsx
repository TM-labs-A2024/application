import { HamburgerIcon } from '@chakra-ui/icons'
import { Text, IconButton, Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react'
import RequestsList from '@components/molecules/RequestsList'
import { Doctor as DoctorType, ReactSelectOption, Nurse } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { FaUserDoctor } from 'react-icons/fa6'

import Logo from '../../../../public/static/icons/logo.svg'

export default function InstitutionDoctors({
  context: { doctors, specialtiesOptions, nurses }
}: {
  context: { doctors?: DoctorType[]; specialtiesOptions: ReactSelectOption[]; nurses?: Nurse[] }
}) {
  // --- Data and handlers -----------------------------------------------------
  const formatedRequests = useMemo(
    () =>
      doctors?.map(({ id, govId, firstname, lastname, specialties }) => {
        return {
          href: `/institucion/medico/${id}`,
          title: `${firstname} ${lastname}`,
          description: `C.I: ${govId},${specialties?.map((specialty) => ' ' + specialtiesOptions.find((el) => el?.value === specialty.id)?.label)}.`
        }
      }),
    [doctors, specialtiesOptions]
  )

  const nursesRequests = useMemo(
    () =>
      nurses?.map(({ id, govId, firstname, lastname }) => {
        return {
          href: `/institucion/enfermero/${id}`,
          title: `${firstname} ${lastname}`,
          description: `C.I: ${govId}.`
        }
      }),
    [nurses]
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 ${isIOS() ? 'pb-24 pt-20' : 'pb-24 pt-10'} ${isAndroid() ?? 'pb-64 pt-8'}`}
      data-testid="institution-doctors"
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
              <Link href="/institucion/solicitudes">Solicitudes pendientes</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/perfil/institucion">Perfil de la institución</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {formatedRequests && formatedRequests?.length > 0 && (
        <div className="lg:px-80">
          <RequestsList requests={formatedRequests} label="Médicos con acceso" />
        </div>
      )}
      {nursesRequests && nursesRequests?.length > 0 && (
        <div className="lg:px-80">
          <RequestsList requests={nursesRequests} label="Enfermeros con acceso" />
        </div>
      )}
      {formatedRequests?.length === 0 && nursesRequests?.length === 0 && (
        <div
          className="flex h-3/4 w-full flex-col items-center justify-center"
          data-testid="approved-doctors-empty-state"
        >
          <Icon fontSize="xxx-large" as={FaUserDoctor} />
          <Text textAlign="center" mt={4}>
            No hay personal de salud aún.
          </Text>
        </div>
      )}
    </div>
  )
}
