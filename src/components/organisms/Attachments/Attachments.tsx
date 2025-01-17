import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Text,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button
} from '@chakra-ui/react'
import { isIOS } from '@utils/index'
import { useRouter } from 'next/navigation'
import React from 'react'

function ConfirmationModal({
  isOpen,
  onClose,
  onSubmit,
  description
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  description: string
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{description}</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blackAlpha" onClick={onSubmit}>
            Aceptar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function Attachments({
  context
}: {
  context: {
    goBackRef: string
    title: string
    data: {
      description: string
      attachments: { url: string; alt: string }[]
    }
    isPatient: boolean
    isDoctor: boolean
    isOpen: boolean
    description: string
    onClose: () => void
    onDeleteClick: (type: string) => void
    onSubmit: () => void
  }
}) {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const {
    goBackRef,
    title,
    data,
    isPatient,
    isDoctor,
    isOpen,
    onClose,
    onDeleteClick,
    onSubmit,
    description
  } = context
  // --- END: Local state ------------------------------------------------------

  return (
    <div
      className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="attachments"
    >
      <div
        className={`mb-8 flex flex-row items-center gap-4 ${isPatient ? 'justify-start' : 'justify-between'}`}
      >
        <div className="flex flex-row gap-4">
          <IconButton
            size="xl"
            aria-label="back"
            variant="link"
            icon={<ArrowBackIcon />}
            onClick={() => {
              return isPatient || isDoctor ? router.push(goBackRef) : router.back()
            }}
          />
          <Text className="font-medium">{title}</Text>
        </div>
        {isDoctor && (
          <IconButton
            size="xl"
            aria-label="delete"
            data-testid="delete-button"
            icon={<DeleteIcon />}
            onClick={() => onDeleteClick('all')}
          />
        )}
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
          {data?.attachments?.map((image, idx) => {
            return (
              <div className="relative w-full" key={`order-tests-image-${idx + 1}`}>
                {isDoctor && (
                  <button
                    data-testid="delete-image-button"
                    className="absolute right-2 top-2 z-20 rounded-md bg-white px-2 py-1"
                    onClick={() => onDeleteClick('image')}
                  >
                    <DeleteIcon />
                  </button>
                )}
                <Image src={image.url} alt={image.alt} mb={4} mt={4} className="" />
              </div>
            )
          })}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        description={description}
      />
    </div>
  )
}
