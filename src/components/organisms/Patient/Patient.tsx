import { ArrowBackIcon, WarningIcon } from '@chakra-ui/icons'
import {
  Text,
  Heading,
  Stack,
  IconButton,
  Divider,
  Tag,
  TagLeftIcon,
  TagLabel
} from '@chakra-ui/react'
import { Patient as PatientType } from '@src/types'
import { isIOS } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Patient({ patient }: { patient: PatientType }) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
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
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 lg:px-96 ${isIOS() ? 'pt-10' : 'pt-8'}`}
      data-testid="patient"
    >
      <div className="my-8 flex flex-row items-center justify-start gap-4">
        <IconButton
          size="xl"
          aria-label="back"
          variant="link"
          icon={<ArrowBackIcon />}
          onClick={() => {
            router.back()
          }}
        />
        <Text className="font-medium">Ficha médica</Text>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Stack spacing={1} mb={6}>
          <Heading as="h2" size="md" noOfLines={1}>
            {patient?.firstname} {patient?.lastname}
          </Heading>
          <Text>CI: {patient?.govId.toLocaleString()}</Text>
        </Stack>
        {patient?.status && (
          <Tag size="md" key={patient?.status} variant="subtle" colorScheme="gray">
            <TagLeftIcon boxSize="12px" as={WarningIcon} />
            <TagLabel>{patient?.status}</TagLabel>
          </Tag>
        )}
      </div>
      <Divider orientation="horizontal" />
      <Stack mb={6} mt={6}>
        <h4 className="text-sm text-gray-600">Fecha de nacimiento</h4>
        <Text className="font-medium">
          {format(new Date(patient?.birthdate), "dd 'de' MMMM, yyyy", {
            locale: es
          })}
        </Text>
      </Stack>
      <Stack mb={6}>
        <h4 className="text-sm text-gray-600">Correo electrónico</h4>
        <Text className="font-medium">{patient?.email}</Text>
      </Stack>
      <Stack mb={6}>
        <h4 className="text-sm text-gray-600">Teléfono</h4>
        <Text className="font-medium">{patient?.phoneNumber}</Text>
      </Stack>
    </div>
  )
}
