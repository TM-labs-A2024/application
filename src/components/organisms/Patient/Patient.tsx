'use client'
import { Text, Heading, Stack, Link } from '@chakra-ui/react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import NextLink from 'next/link'
import React from 'react'

export default function Patient({
  patient
}: {
  patient: {
    id: number
    name: string
    birthdate: string
    email: string
    phone: string
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div className="mx-auto block h-screen w-screen overflow-hidden px-8 pt-8 lg:w-1/2">
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
          {patient.name}
        </Heading>
        <Text>CI: {patient.id.toLocaleString('es-ES')}</Text>
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
        <Text className="font-medium">{patient.phone}</Text>
      </Stack>
    </div>
  )
}
