import { useDisclosure } from '@chakra-ui/react'
import Splash from '@components/atoms/Splash'
import { ACCESS_GRANTED, ACCESS_DENIED, ACCESS_REMOVED } from '@constants/index'
import { nurse as nurseFallback } from '@constants/index'
import {
  useNurseById,
  useInstitutionApproveAccessRequestsMutation,
  useInstitutionDenyAccessRequestsMutation,
  useInstitutionRevokeAccessRequestsMutation
} from '@services/index'
import { isMobile, setupErrorNotification } from '@src/utils'
import InstitutionNurseView from '@views/InstitutionNurse'
import { useRouter } from 'next/router'
import React, { useMemo, useCallback } from 'react'
import { Store } from 'react-notifications-component'

export default function InstitutionNursePage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { isOpen: isDenialOpen, onOpen: onDenialOpen, onClose: onDenialClose } = useDisclosure()
  const {
    isOpen: isApprovalOpen,
    onOpen: onApprovalOpen,
    onClose: onApprovalClose
  } = useDisclosure()
  const { isOpen: isRemovalOpen, onOpen: onRemovalOpen, onClose: onRemovalClose } = useDisclosure()

  const { data, isLoading: isNurseLoading } = useNurseById(router.query.slug?.[0] ?? '')

  const { mutate: approveAccess, isLoading: isLoadingAccessApproval } =
    useInstitutionApproveAccessRequestsMutation(
      () => {
        onApprovalClose()
        router.push('/institucion/solicitudes')
        Store.addNotification(ACCESS_GRANTED(isMobile(window)))
      },
      () => {
        onApprovalClose()
        setupErrorNotification()
      }
    )

  const { mutate: denyAccess, isLoading: isLoadingAccessDenial } =
    useInstitutionDenyAccessRequestsMutation(
      () => {
        onDenialClose()
        router.push('/institucion/solicitudes')
        Store.addNotification(ACCESS_DENIED(isMobile(window)))
      },
      () => {
        onDenialClose()
        setupErrorNotification()
      }
    )

  const { mutate: removeAccess, isLoading: isLoadingAccessRemoval } =
    useInstitutionRevokeAccessRequestsMutation(
      () => {
        onRemovalClose()
        router.push('/institucion/medicos')
        Store.addNotification(ACCESS_REMOVED(isMobile(window)))
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
      isLoadingAccessApproval || isLoadingAccessDenial || isLoadingAccessRemoval || isNurseLoading,
    [isLoadingAccessApproval, isLoadingAccessDenial, isLoadingAccessRemoval, isNurseLoading]
  )
  const requestId = useMemo(() => router?.query?.slug?.[1], [router.query.slug])

  const onApproval = useCallback(() => {
    approveAccess(requestId ?? '')
  }, [approveAccess, requestId])

  const onDenial = useCallback(() => {
    denyAccess(requestId ?? '')
  }, [denyAccess, requestId])

  const nurseData = useMemo(() => data?.data ?? nurseFallback, [data])

  const onRemoval = useCallback(() => {
    removeAccess(nurseData?.id ?? '')
  }, [removeAccess, nurseData])

  const context = useMemo(
    () => ({
      nurse: data?.data ?? nurseFallback,
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
      data?.data,
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

  return isLoading ? <Splash /> : <InstitutionNurseView context={context} />
}
