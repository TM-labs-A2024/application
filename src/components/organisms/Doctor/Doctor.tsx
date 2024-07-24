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
  Spinner
} from '@chakra-ui/react'
import { specialties } from '@constants/index'
import { Doctor as DoctorType } from '@src/types'
import { isIOS } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

function ConfirmationModal({
  isOpen,
  onClose,
  onSubmit,
  method,
  name
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  method: string
  name: string
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          ¿Seguro que desea {method.toLowerCase()} el acceso a {name}?
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blackAlpha" onClick={onSubmit}>
            {method} acceso
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function Doctor({
  context: {
    doctor,
    isDenialOpen,
    onDenialOpen,
    onDenialClose,
    isApprovalOpen,
    onApprovalOpen,
    onApprovalClose,
    isRemovalOpen,
    onRemovalOpen,
    onRemovalClose,
    onApproval,
    onDenial,
    onRemoval,
    isLoading
  }
}: {
  context: {
    doctor: DoctorType
    isDenialOpen: boolean
    onDenialOpen: () => void
    onDenialClose: () => void
    isApprovalOpen: boolean
    onApprovalOpen: () => void
    onApprovalClose: () => void
    isRemovalOpen: boolean
    onRemovalOpen: () => void
    onRemovalClose: () => void
    onApproval: () => void
    onDenial: () => void
    onRemoval: () => void
    isLoading: boolean
  }
}): ReactElement {
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
  const doctorSpecialtiesList = doctor.specialties?.map(
    (specialty, idx) =>
      `${specialties.find((el: { id: string; name: string }) => el.id === specialty)?.name}${
        doctor.specialties.length > 0 && idx !== doctor.specialties.length - 1 ? ',' : ''
      }${idx === doctor.specialties.length - 1 ? '.' : ' '}`
  )
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`flex h-screen w-screen flex-col p-8 lg:px-96 ${isIOS() ? 'pt-20' : 'pt-8'}`}
      data-testid="doctor"
    >
      <div className="mb-8 flex flex-row items-center justify-start">
        <IconButton
          size="xl"
          className="mr-4"
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
            <Text>CI: {doctor.govId}</Text>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack mb={6} mt={6}>
            <h4 className="text-sm text-gray-600">Especialidad</h4>
            <Text className="text-wrap">{doctorSpecialtiesList}</Text>
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
            <Text className="font-medium">{doctor.phoneNumber}</Text>
          </Stack>
        </div>
        {isLoading && <Spinner />}
        {!doctor?.patientPending && !isLoading && (
          <Button onClick={onRemovalOpen}>Revocar acceso</Button>
        )}
        {doctor?.patientPending && !isLoading && (
          <div className="flex w-full flex-row">
            <Button className="mr-2 flex-grow" variant="outline" onClick={onDenialOpen}>
              Rechazar
            </Button>
            <Button className="ml-2 flex-grow" onClick={onApprovalOpen}>
              Aceptar
            </Button>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isDenialOpen}
        onClose={onDenialClose}
        onSubmit={onDenial}
        method="Denegar"
        name={`${doctor.firstname} ${doctor.lastname}`}
      />
      <ConfirmationModal
        isOpen={isApprovalOpen}
        onClose={onApprovalClose}
        onSubmit={onApproval}
        method="Conceder"
        name={`${doctor.firstname} ${doctor.lastname}`}
      />
      <ConfirmationModal
        isOpen={isRemovalOpen}
        onClose={onRemovalClose}
        onSubmit={onRemoval}
        method="Revocar"
        name={`${doctor.firstname} ${doctor.lastname}`}
      />
    </div>
  )
}
