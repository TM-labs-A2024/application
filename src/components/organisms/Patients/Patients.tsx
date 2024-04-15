import SearchInputComponent from '@components/atoms/SearchInput'
import PatientsList from '@components/molecules/PatientsList'
import { patients } from '@src/constants'
import { isIOS, isAndroid } from '@utils/index'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

export default function Patients() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const patientsFormatted = useMemo(
    () =>
      patients.map(({ uuid, birthdate, govId, status, bed, firstname, lastname }) => ({
        href: `/paciente/${uuid}`,
        title: `${firstname} ${lastname}`,
        description: `C.I: ${govId}, ${formatDistanceToNowStrict(new Date(birthdate), {
          locale: es,
          roundingMethod: 'floor'
        })}${status ? `, Cama: ${bed}` : ''}`,
        status
      })),
    []
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:w-1/2 ${isIOS() ? 'pb-64 pt-20' : 'pb-56'} ${isAndroid() ?? 'pt-8'}`}
    >
      <Image
        alt="logo"
        src="/static/images/logo-horizontal.png"
        width={200}
        height={80}
        className="mx-auto mb-8"
      />
      {patients.length > 0 && (
        <SearchInputComponent
          placeholder="Buscar paciente"
          className="mb-8 w-full"
          onClick={() => {
            router.push('/pacientes/busqueda')
          }}
        />
      )}
      <PatientsList patients={patientsFormatted} label="Pacientes" />
    </div>
  )
}