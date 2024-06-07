import { Text, Heading, Stack, Link } from '@chakra-ui/react'
import { Patient as PatientType } from '@src/types'
import { isIOS } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import NextLink from 'next/link'
import React from 'react'

export default function PatientProfile({ patient }: { patient: PatientType }) {
  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="patient-profile"
    >
      <div className="mb-8 flex w-full flex-row justify-between">
        <Heading as="h2" size="md" noOfLines={1}>
          Perfil
        </Heading>
        <Link as={NextLink} href="/perfil/editar">
          Editar
        </Link>
      </div>
      <Stack spacing={1} mb={6}>
        <Heading as="h3" size="md" noOfLines={1}>
          {patient.firstname} {patient.lastname}
        </Heading>
        <Text>CI: {patient.govId.toLocaleString()}</Text>
      </Stack>
      <Stack mb={6}>
        <h4 className="text-sm text-gray-600">Fecha de nacimiento</h4>
        <Text className="font-medium">
          {format(new Date(patient.birthdate), "dd 'de' MMMM, yyyy", {
            locale: es
          })}
        </Text>
      </Stack>
      <Stack mb={6}>
        <h4 className="text-sm text-gray-600">Correo electrónico</h4>
        <Text className="font-medium">{patient.email}</Text>
      </Stack>
      <Stack mb={6}>
        <h4 className="text-sm text-gray-600">Teléfono</h4>
        <Text className="font-medium">{patient.phoneNumber}</Text>
      </Stack>
    </div>
  )
}
