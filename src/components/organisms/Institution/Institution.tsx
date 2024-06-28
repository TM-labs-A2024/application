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
import { Institution as InstitutionType } from '@src/types'
import { isIOS, isAndroid, isMobile } from '@utils/index'
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

export default function Institution({
  institution
}: {
  institution: InstitutionType
}): ReactElement {
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
    router.push('/ministerio/solicitudes')
  }, [onClose, router])

  const onApproval = useCallback(() => {
    Store.addNotification(ACCESS_GRANTED(isMobile(window)))
    onApprovalClose()
    router.push('/ministerio/solicitudes')
  }, [onApprovalClose, router])

  const onRemoval = useCallback(() => {
    Store.addNotification(ACCESS_REMOVAL(isMobile(window)))
    onRemovalClose()
    router.push('/ministerio/instituciones')
  }, [onRemovalClose, router])
  // --- END: Data and handlers ------------------------------------------------

  return (
    <div
      className={`mx-auto block h-screen w-screen overflow-hidden px-8 ${isIOS() ? 'pb-64 pt-20' : 'pb-0 pt-10'} ${isAndroid() ?? 'pb-64 pt-8'}`}
      data-testid="institution"
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
            <Text>RIF {institution.credentials}</Text>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack mb={6}>
            <h4 className="text-sm text-gray-600">Correo electrónico</h4>
            <Text className="font-medium">{institution.email}</Text>
          </Stack>
          <Stack mb={6}>
            <h4 className="text-sm text-gray-600">Teléfono</h4>
            <Text className="font-medium">{institution.phone}</Text>
          </Stack>
        </div>
        {institution?.pending && (
          <div className="mb-4 flex w-full flex-row">
            <Button className="mr-2 flex-grow" variant="outline" onClick={onOpen}>
              Rechazar
            </Button>
            <Button className="ml-2 flex-grow" onClick={onApprovalOpen}>
              Aceptar
            </Button>
          </div>
        )}
        {!institution?.pending && (
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
        name={institution.name}
      />
      <ConfirmationModal
        isOpen={isApprovalOpen}
        onClose={onApprovalClose}
        onSubmit={onApproval}
        method="Conceder"
        name={institution.name}
      />
      <ConfirmationModal
        isOpen={isRemovalOpen}
        onClose={onRemovalClose}
        onSubmit={onRemoval}
        method="Revocar"
        name={institution.name}
      />
    </div>
  )
}
