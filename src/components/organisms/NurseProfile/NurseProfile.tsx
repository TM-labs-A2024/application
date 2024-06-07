import { Text, Stack, Heading } from '@chakra-ui/react'
import { Nurse } from '@src/types'
import { isIOS } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import React, { ReactElement } from 'react'

export default function NurseProfile({ nurse }: { nurse: Nurse }): ReactElement {
  return (
    <div
      className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : ''}`}
      data-testid="nurse-profile"
    >
      <Text className="mb-6 font-medium">Perfil</Text>
      <div className="flex h-full flex-col">
        <Stack spacing={1} mb={6}>
          <Heading as="h3" size="md" noOfLines={1}>
            {nurse.firstname} {nurse.lastname}
          </Heading>
          <Text>CI: {nurse.id.toLocaleString('es-ES')}</Text>
        </Stack>
        <Stack mb={6}>
          <h4 className="text-sm text-gray-600">Fecha de nacimiento</h4>
          <Text className="font-medium">
            {format(new Date(nurse.birthdate), "dd 'de' MMMM, yyyy", {
              locale: es
            })}
          </Text>
        </Stack>
        <Stack mb={6}>
          <h4 className="text-sm text-gray-600">Correo electrónico</h4>
          <Text className="font-medium">{nurse.email}</Text>
        </Stack>
        <Stack mb={6}>
          <h4 className="text-sm text-gray-600">Teléfono</h4>
          <Text className="font-medium">{nurse.phone}</Text>
        </Stack>
      </div>
    </div>
  )
}
