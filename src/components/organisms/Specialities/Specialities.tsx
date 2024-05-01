import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton, Text, Button } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import SpecialitiesList from '@components/molecules/SpecialitiesList'
import { specialities } from '@src/constants'
import { Patient } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

import Avatar from '../../../../public/static/icons/Avatar.svg'
import Logo from '../../../../public/static/icons/logo.svg'

export default function Specialities({
  context
}: {
  context: { role: string; patient?: Patient }
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { role, patient } = context
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isPatient = useMemo(() => role === 'patient', [role])
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pb-64 pt-20' : !isPatient ? 'pb-44' : 'pb-56'} ${isAndroid() ?? 'pt-8'}`}
    >
      {!isPatient && (
        <div className="my-8 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <IconButton
              size="xl"
              aria-label="back"
              variant="link"
              icon={<ArrowBackIcon />}
              onClick={() => {
                router.push('/pacientes')
              }}
            />
            <Text className="font-medium">
              {patient?.firstname} {patient?.lastname}
            </Text>
          </div>
          <Avatar
            className="cursor-pointer rounded-full"
            onClick={() => router.push(`/paciente/${patient?.uuid}`)}
          />
        </div>
      )}
      {isPatient && (
        <Image
          alt="logo"
          src="/static/images/logo-horizontal.png"
          width={200}
          height={80}
          className="mx-auto mb-8"
        />
      )}
      {specialities.length > 0 && (
        <SearchInputComponent
          placeholder="Buscar especialidad"
          className="mb-8 w-full"
          onClick={() => {
            router.push(
              patient ? `/especialidades/busqueda/${patient?.uuid}` : '/especialidades/busqueda'
            )
          }}
        />
      )}
      {specialities.length > 0 && (
        <SpecialitiesList specialities={specialities} label="Especialidades" />
      )}
      {specialities.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Logo />
          <Text textAlign="center" mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis porttitor leo diam
            risus vel elementum in vulputate.
          </Text>
          <Button mt={4} onClick={() => router.push('/crear-historia')}>
            Crear historia
          </Button>
        </div>
      )}
    </div>
  )
}
