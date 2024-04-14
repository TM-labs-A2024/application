import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton, Text, Heading, Image } from '@chakra-ui/react'
import { isIOS } from '@utils/index'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Evolution({
  speciality,
  title,
  data,
  type
}: {
  speciality: string
  title: string
  data: {
    description: string
    attachments: { url: string; alt: string }[]
  }
  type: string
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  return (
    <div className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}>
      <div className="mb-8 flex flex-row items-center justify-start gap-4">
        <IconButton
          size="xl"
          aria-label="back"
          variant="link"
          icon={<ArrowBackIcon />}
          onClick={() => {
            router.push(`/especialidad/${speciality}?type=${type}`)
          }}
        />
        <Text className="font-medium">{title}</Text>
      </div>
      <div className="flex h-full flex-col overflow-scroll">
        <div>
          <Heading as="h2" size="sm" mb={4}>
            Descripción
          </Heading>
          <Text>{data.description}</Text>
        </div>
        <div className={data?.attachments?.length === 0 ? 'hidden' : ''}>
          <Heading as="h2" size="sm" mt={4} mb={4}>
            Archivos adjuntos
          </Heading>
          {data?.attachments?.map((image, idx) => (
            <Image
              key={`order-tests-image-${idx + 1}`}
              src={image.url}
              alt={image.alt}
              mb={4}
              mt={4}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
