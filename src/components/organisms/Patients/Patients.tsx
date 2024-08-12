import { Text, Button, Icon } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import PatientsList from '@components/molecules/PatientsList'
import { PatientSummary } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaRegUser } from 'react-icons/fa6'

import Logo from '../../../../public/static/icons/logo.svg'

export default function Patients({
  context
}: {
  context: {
    pendingPatients: PatientSummary[]
    approvedPatients: PatientSummary[]
    isDoctor: boolean
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const { pendingPatients, approvedPatients, isDoctor } = context
  // --- END: Local state ------------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pb-72 pt-20' : 'pb-64'} ${isAndroid() && 'pb-64 pt-8'}`}
      data-testid="patients"
    >
      <Logo className="mx-auto my-8" />
      {(pendingPatients.length > 0 || approvedPatients.length > 0) && (
        <>
          <SearchInputComponent
            placeholder="Buscar paciente"
            className="mb-8 w-full"
            onClick={() => {
              router.push('/pacientes/busqueda')
            }}
          />
          <PatientsList
            patients={approvedPatients}
            pendingPatients={pendingPatients}
            label="Pacientes"
          />
        </>
      )}
      {pendingPatients.length === 0 && approvedPatients.length === 0 && (
        <div
          className="flex h-full w-full flex-col items-center justify-center"
          data-testid="patients-empty-state"
        >
          <Icon fontSize="xxx-large" as={FaRegUser} />
          <Text textAlign="center" mt={4}>
            No hay pacientes asociados aún.
          </Text>
          {isDoctor && (
            <Button mt={4} onClick={() => router.push('/agregar-paciente')}>
              Nuevo paciente
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
