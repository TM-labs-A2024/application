import { useDisclosure } from '@chakra-ui/react'
import Splash from '@components/atoms/Splash'
import { ACCESS_DENIED, ACCESS_GRANTED, ACCESS_REMOVAL } from '@constants/index'
import { institutions } from '@constants/index'
import {
  useInstitutionById,
  useGovernmentApproveAccessRequestsMutation,
  useGovernmentDenyAccessRequestsMutation,
  useGovernmentRevokeAccessRequestsMutation
} from '@services/index'
import { isMobile, setupErrorNotification } from '@utils/index'
import InstitutionView from '@views/Institution'
import { useRouter } from 'next/router'
import React, { useMemo, useCallback } from 'react'
import { Store } from 'react-notifications-component'

export default function InstitutionPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { isOpen: isDenialOpen, onOpen: onDenialOpen, onClose: onDenialClose } = useDisclosure()
  const {
    isOpen: isApprovalOpen,
    onOpen: onApprovalOpen,
    onClose: onApprovalClose
  } = useDisclosure()
  const { isOpen: isRemovalOpen, onOpen: onRemovalOpen, onClose: onRemovalClose } = useDisclosure()

  const { data: institutionData, isLoading: isInstitutionLoading } = useInstitutionById(
    router.query.slug?.[0] ?? ''
  )

  const { mutate: approveAccess, isLoading: isLoadingAccessApproval } =
    useGovernmentApproveAccessRequestsMutation(
      () => {
        onApprovalClose()
        router.push('/ministerio/solicitudes')
        Store.addNotification(ACCESS_GRANTED(isMobile(window)))
      },
      () => {
        onApprovalClose()
        setupErrorNotification()
      }
    )

  const { mutate: denyAccess, isLoading: isLoadingAccessDenial } =
    useGovernmentDenyAccessRequestsMutation(
      () => {
        onDenialClose()
        router.push('/ministerio/solicitudes')
        Store.addNotification(ACCESS_DENIED(isMobile(window)))
      },
      () => {
        onDenialClose()
        setupErrorNotification()
      }
    )

  const { mutate: removeAccess, isLoading: isLoadingAccessRemoval } =
    useGovernmentRevokeAccessRequestsMutation(
      () => {
        onRemovalClose()
        router.push('/ministerio/instituciones')
        Store.addNotification(ACCESS_REMOVAL(isMobile(window)))
      },
      () => {
        onRemovalClose()
        setupErrorNotification()
      }
    )
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isLoading = useMemo(
    () =>
      isLoadingAccessApproval ||
      isLoadingAccessDenial ||
      isLoadingAccessRemoval ||
      isInstitutionLoading,
    [isLoadingAccessApproval, isLoadingAccessDenial, isLoadingAccessRemoval, isInstitutionLoading]
  )
  const requestId = useMemo(() => router?.query?.slug?.[1], [router.query.slug])

  const onApproval = useCallback(() => {
    approveAccess(requestId ?? '')
  }, [approveAccess, requestId])

  const onDenial = useCallback(() => {
    denyAccess(requestId ?? '')
  }, [denyAccess, requestId])

  const onRemoval = useCallback(() => {
    removeAccess(institutionData?.data?.id ?? '')
  }, [removeAccess, institutionData])

  const context = useMemo(
    () => ({
      institution: institutionData?.data ?? institutions[0],
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
    }),
    [
      institutionData,
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
    ]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <InstitutionView context={context} />
}
