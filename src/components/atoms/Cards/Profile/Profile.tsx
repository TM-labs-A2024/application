import { Link } from '@chakra-ui/next-js'
import { Text } from '@chakra-ui/react'
import { Patient } from '@src/types'
import { formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale/es'
import React from 'react'

export default function Profile({ patient }: { patient: Patient }) {
  return (
    <div className="mb-6 w-full rounded-xl border-2 border-black p-4" data-testid="profile-card">
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
          <Link
            href={`/paciente/${patient.id}`}
            color="white"
            className="rounded-md bg-black px-4 py-2 font-bold text-white no-underline"
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  )
}
