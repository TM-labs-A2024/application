import { Text, Button } from '@chakra-ui/react'
import { Patient } from '@src/types'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Profile({ patient }: { patient: Patient }) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  return (
    <div className="mb-6 w-full rounded-xl border-2 border-black p-4">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-1">
          <Text>
            Nombre: {patient.firstname} {patient.lastname}
          </Text>
          <Text>CI: {patient.govId}</Text>
          <Text>
            Edad:{' '}
            {formatDistanceToNowStrict(new Date(patient.birthdate), {
              locale: es,
              roundingMethod: 'floor'
            })}
          </Text>
        </div>
        <div className="flex w-full flex-col items-end gap-1">
          <Button onClick={() => router.push(`/paciente/${patient.uuid}`)}>Ver perfil</Button>
        </div>
      </div>
    </div>
  )
}
