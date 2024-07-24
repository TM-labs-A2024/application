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
import { ACCESS_DENIED, ACCESS_GRANTED, ACCESS_REMOVAL } from '@constants/index'
import { specialties } from '@constants/index'
import { Doctor as DoctorType } from '@src/types'
import { isIOS, isAndroid, isMobile } from '@utils/index'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useCallback } from 'react'
import { Store } from 'react-notifications-component'

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

export default function InstitutionDoctor({ doctor }: { doctor: DoctorType }): ReactElement {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isApprovalOpen,
    onOpen: onApprovalOpen,
    onClose: onApprovalClose
  } = useDisclosure()
  const { isOpen: isRemovalOpen, onOpen: onRemovalOpen, onClose: onRemovalClose } = useDisclosure()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onDenial = useCallback(() => {
    Store.addNotification(ACCESS_DENIED(isMobile(window)))
    onClose()
    router.push('/institucion/solicitudes')
  }, [onClose, router])

  const onApproval = useCallback(() => {
    Store.addNotification(ACCESS_GRANTED(isMobile(window)))
    onApprovalClose()
    router.push('/institucion/solicitudes')
  }, [onApprovalClose, router])

  const onRemoval = useCallback(() => {
    Store.addNotification(ACCESS_REMOVAL(isMobile(window)))
    onRemovalClose()
    router.push('/institucion/medicos')
  }, [onRemovalClose, router])
  // --- END: Data and handlers ------------------------------------------------

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
              {doctor.specialties?.map((specialty, idx) => (
                <Text
                  className="text-nowrap font-medium"
                  key={`institution-doctor-card-${specialty}`}
                >
                  {specialties.find((el) => el.id === specialty)?.name}
                  {doctor.specialties.length > 0 && idx !== doctor.specialties.length - 1
                    ? ','
                    : ''}
                </Text>
              ))}
            </div>
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
        {doctor?.pending && (
          <div className="mb-4 flex w-full flex-row">
            <Button className="mr-2 flex-grow" variant="outline" onClick={onOpen}>
              Rechazar
            </Button>
            <Button className="ml-2 flex-grow" onClick={onApprovalOpen}>
              Aceptar
            </Button>
          </div>
        )}
        {!doctor?.pending && (
          <div className="mb-4 flex w-full flex-row">
            <Button className="flex-grow" variant="outline" onClick={onRemovalOpen}>
              Revocar acceso
            </Button>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
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
