import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Text,
  Stack,
  Heading,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure
} from '@chakra-ui/react'
import { ACCESS_REMOVED } from '@constants/index'
import { isIOS, isMobile } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useCallback } from 'react'
import { Store } from 'react-notifications-component'

function ConfirmationModal({
  isOpen,
  onClose,
  onSubmit,
  name
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  name: string
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>¿Seguro que desea revocar el acceso a {name}?</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blackAlpha" onClick={onSubmit}>
            Revocar acceso
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function Doctor({
  doctor
}: {
  doctor: {
    id: number
    firstname: string
    lastname: string
    birthdate: string
    email: string
    phone: string
    speciality: string
  }
}): ReactElement {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
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
  const onSuccess = useCallback(() => {
    Store.addNotification(ACCESS_REMOVED(isMobile(window)))
    onClose()
    router.push('/medicos')
  }, [onClose, router])
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}>
      <div className="mb-8 flex flex-row items-center justify-start gap-4">
        <IconButton
          size="xl"
          aria-label="back"
          variant="link"
          icon={<ArrowBackIcon />}
          onClick={() => {
            router.push('/medicos')
          }}
        />
        <Text className="font-medium">Perfil del médico</Text>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div>
          <Stack spacing={1} mb={6}>
            <Heading as="h3" size="md" noOfLines={1}>
              {doctor.firstname} {doctor.lastname}
            </Heading>
            <Text>CI: {doctor.id.toLocaleString('es-ES')}</Text>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack mb={6} mt={6}>
            <h4 className="text-sm text-gray-600">Especialidad</h4>
            <Text className="font-medium">{doctor.speciality}</Text>
          </Stack>
          <Stack mb={6}>
            <h4 className="text-sm text-gray-600">Fecha de nacimiento</h4>
            <Text className="font-medium">
              {format(new Date(doctor.birthdate), "dd 'de' MMMM, yyyy", {
                locale: es
              })}
            </Text>
          </Stack>
          <Stack mb={6}>
            <h4 className="text-sm text-gray-600">Correo electrónico</h4>
            <Text className="font-medium">{doctor.email}</Text>
          </Stack>
          <Stack mb={6}>
            <h4 className="text-sm text-gray-600">Teléfono</h4>
            <Text className="font-medium">{doctor.phone}</Text>
          </Stack>
        </div>
        <Button onClick={onOpen}>Revocar acceso</Button>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSuccess}
        name={`${doctor.firstname} ${doctor.lastname}`}
      />
    </div>
  )
}