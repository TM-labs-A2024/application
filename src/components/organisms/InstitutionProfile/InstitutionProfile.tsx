import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton, Text, Stack, Heading, Divider } from '@chakra-ui/react'
import { Institution } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function InstitutionProfile({ institution }: { institution: Institution }) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 ${isIOS() ? 'pb-64 pt-20' : 'pb-0 pt-10'} ${isAndroid() ?? 'pb-64 pt-8'}`}
      data-testid="institution-profile"
    >
      <div className={`mb-8 flex flex-row justify-between`}>
        <Image alt="logo" src="/static/images/logo-horizontal.png" width={200} height={80} />
      </div>
      <div className="mb-8 flex flex-row items-center justify-start">
        <IconButton
          size="xl"
          className="mr-4"
          aria-label="back"
          variant="link"
          icon={<ArrowBackIcon />}
          onClick={() => {
            router.back()
          }}
        />
        <Text className="font-medium">Perfil de la institución</Text>
      </div>
      <div className="flex h-4/5 flex-col justify-between lg:px-96">
        <div>
          <Stack spacing={1} mb={6}>
            <Heading as="h3" size="md" noOfLines={1}>
              {institution.name}
            </Heading>
            <Text>Credencial: {institution.credentials}</Text>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack mb={6} mt={6}>
            <h4 className="text-sm text-gray-600">Dirección</h4>
            <Text className="font-medium">{institution.address}</Text>
          </Stack>
          <Stack mb={6} mt={6}>
            <h4 className="text-sm text-gray-600">Correo electrónico</h4>
            <Text className="font-medium">{institution.email}</Text>
          </Stack>
          <Stack mb={6}>
            <h4 className="text-sm text-gray-600">Teléfono</h4>
            <Text className="font-medium">{institution.phoneNumber}</Text>
          </Stack>
        </div>
      </div>
    </div>
  )
}
