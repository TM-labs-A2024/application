import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton, Text, Button } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import SpecialtiesList from '@src/components/molecules/SpecialtiesList'
import { Patient, Specialties as SpecialtiesType } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import Avatar from '../../../../public/static/icons/Avatar.svg'
import Logo from '../../../../public/static/icons/logo.svg'

export default function Specialties({
  context
}: {
  context: { isPatient: boolean; patient?: Patient; specialties: SpecialtiesType }
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { isPatient, patient, specialties } = context
  // --- END: Local state ------------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pb-72 pt-10' : !isPatient ? 'pb-44' : 'pb-64'} ${isAndroid() && 'pt-8'}`}
      data-testid="specialties"
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
            onClick={() => router.push(`/paciente/${patient?.govId}`)}
          />
        </div>
      )}
      {isPatient && (
        <Image
          alt="logo"
          src="/static/images/logo-horizontal.png"
          width={200}
          height={80}
          className="mx-auto my-8"
        />
      )}
      {specialties.length > 0 && (
        <SearchInputComponent
          placeholder="Buscar especialidad"
          className="mb-8 w-full"
          onClick={() => {
            router.push(
              patient ? `/especialidades/busqueda/${patient?.id}` : '/especialidades/busqueda'
            )
          }}
        />
      )}
      {specialties.length > 0 && (
        <SpecialtiesList specialties={specialties} label="Especialidades" patient={patient} />
      )}
      {!isPatient && specialties.length === 0 && (
        <div
          className="flex h-full w-full flex-col items-center justify-center"
          data-testid="specialties-empty-state"
        >
          <Logo />
          <Text textAlign="center" mt={4}>
            Este paciente no posee evoluciones asociadas.
          </Text>
          <Button mt={4} onClick={() => router.push(`/crear-historia/${patient?.govId}`)}>
            Crear evolución
          </Button>
        </div>
      )}
    </div>
  )
}
