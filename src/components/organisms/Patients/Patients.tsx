import { Text, Button } from '@chakra-ui/react'
import SearchInputComponent from '@components/atoms/SearchInput'
import PatientsList from '@components/molecules/PatientsList'
import { patients } from '@src/constants'
import { isIOS, isAndroid } from '@utils/index'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

import Logo from '../../../../public/static/icons/logo.svg'

export default function Patients() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const patientsFormatted = useMemo(
    () =>
      patients.map(({ uuid, birthdate, govId, status, bed, firstname, lastname, pending }) => ({
        href: pending ? '/pacientes' : `/especialidades/${uuid}`,
        title: `${firstname} ${lastname}`,
        description: `C.I: ${govId}, ${formatDistanceToNowStrict(new Date(birthdate), {
          locale: es,
          roundingMethod: 'floor'
        })}${status ? `, Cama: ${bed}` : ''}`,
        status,
        pending
      })),
    []
  )

  const pendingPatients = useMemo(
    () => patientsFormatted.filter((patient) => patient.pending),
    [patientsFormatted]
  )

  const approvedPatients = useMemo(
    () => patientsFormatted.filter((patient) => !patient.pending),
    [patientsFormatted]
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pb-64 pt-20' : 'pb-56'} ${isAndroid() ?? 'pt-8'}`}
    >
      <Image
        alt="logo"
        src="/static/images/logo-horizontal.png"
        width={200}
        height={80}
        className="mx-auto mb-8"
      />
      {patients.length > 0 && (
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
      {patients.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Logo />
          <Text textAlign="center" mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis porttitor leo diam
            risus vel elementum in vulputate.
          </Text>
          <Button mt={4} onClick={() => router.push('/agregar-paciente')}>
            Nuevo paciente
          </Button>
        </div>
      )}
    </div>
  )
}
