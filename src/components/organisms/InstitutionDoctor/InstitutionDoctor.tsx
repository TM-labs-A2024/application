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
import { Doctor as DoctorType, ReactSelectOption } from '@src/types'
import { isIOS, isAndroid } from '@utils/index'
import { formatDate } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import Image from 'next/image'
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

export default function InstitutionDoctor({
  context: {
    doctor,
    specialtiesOptions,
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
    specialtiesOptions: ReactSelectOption[]
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

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 ${isIOS() ? 'pb-64 pt-20' : 'pb-0 pt-10'} ${isAndroid() ?? 'pb-64 pt-8'}`}
      data-testid="institution-doctor"
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
        <Text className="font-medium">Perfil del médico</Text>
      </div>
      <div className="flex h-4/5 flex-col justify-between lg:px-96">
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
            <div className="flex flex-row flex-wrap gap-2">
              {doctor?.specialties?.map((specialty, idx) => (
                <Text
                  className="text-nowrap font-medium"
                  key={`institution-doctor-card-${specialty}`}
                >
                  {specialtiesOptions.find((el) => el?.value === specialty.id)?.label}
                  {doctor?.specialties &&
                    (doctor?.specialties?.length > 0 && idx !== doctor?.specialties?.length - 1
                      ? ','
                      : '')}
                </Text>
              ))}
            </div>
          </Stack>
          <Stack mb={6}>
            <h4 className="text-sm text-gray-600">Fecha de nacimiento</h4>
            <Text className="font-medium">
              {doctor.birthdate &&
                format(new Date(formatDate(doctor.birthdate)), "dd 'de' MMMM, yyyy", {
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
        {doctor?.pending && !isLoading && (
          <div className="mb-4 flex w-full flex-row">
            <Button className="mr-2 flex-grow" variant="outline" onClick={onDenialOpen}>
              Rechazar
            </Button>
            <Button className="ml-2 flex-grow" onClick={onApprovalOpen}>
              Aceptar
            </Button>
          </div>
        )}
        {!doctor?.pending && !isLoading && (
          <div className="mb-4 flex w-full flex-row">
            <Button className="flex-grow" variant="outline" onClick={onRemovalOpen}>
              Revocar acceso
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
