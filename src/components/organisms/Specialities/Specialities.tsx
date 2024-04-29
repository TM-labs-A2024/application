import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton, Text } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import SpecialitiesList from '@components/molecules/SpecialitiesList'
import { specialities } from '@src/constants'
import { Patient } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

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
        <div className="my-8 flex flex-row items-center justify-start gap-4">
          <IconButton
            size="xl"
            aria-label="back"
            variant="link"
            icon={<ArrowBackIcon />}
            onClick={() => {
              router.push(`/pacientes`)
            }}
          />
          <Text className="font-medium">
            {patient?.firstname} {patient?.lastname}
          </Text>
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
      <SpecialitiesList specialities={specialities} label="Especialidades" />
    </div>
  )
}
