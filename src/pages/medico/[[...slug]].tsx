import { useDisclosure } from '@chakra-ui/react'
import { ACCESS_DENIED, ACCESS_GRANTED, ACCESS_REMOVED } from '@constants/index'
import {
  usePatientApproveAccessRequestsMutation,
  usePatientDenyAccessRequestsMutation,
  usePatientRevokeAccessRequestsMutation
} from '@services/index'
import { useDoctor } from '@services/index'
import Splash from '@src/components/atoms/Splash'
import { doctors as DoctorsFallback } from '@src/constants'
import { isMobile, setupErrorNotification } from '@utils/index'
import DoctorView from '@views/Doctor'
import { useRouter } from 'next/router'
import React, { useMemo, useCallback } from 'react'
import { Store } from 'react-notifications-component'

export default function DoctorPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { isOpen: isDenialOpen, onOpen: onDenialOpen, onClose: onDenialClose } = useDisclosure()
  const {
    isOpen: isApprovalOpen,
    onOpen: onApprovalOpen,
    onClose: onApprovalClose
  } = useDisclosure()
  const { isOpen: isRemovalOpen, onOpen: onRemovalOpen, onClose: onRemovalClose } = useDisclosure()

  const { mutate: approveAccess, isLoading: isLoadingAccessApproval } =
    usePatientApproveAccessRequestsMutation(
      () => {
        onApprovalClose()
        router.push('/medicos')
        Store.addNotification(ACCESS_GRANTED(isMobile(window)))
      },
      () => {
        onApprovalClose()
        setupErrorNotification()
      }
    )

  const { mutate: denyAccess, isLoading: isLoadingAccessDenial } =
    usePatientDenyAccessRequestsMutation(
      () => {
        onDenialClose()
        router.push('/medicos')
        Store.addNotification(ACCESS_DENIED(isMobile(window)))
      },
      () => {
        onDenialClose()
        setupErrorNotification()
      }
    )

  const { mutate: removeAccess, isLoading: isLoadingAccessRemoval } =
    usePatientRevokeAccessRequestsMutation(
      () => {
        onRemovalClose()
        router.push('/medicos')
        Store.addNotification(ACCESS_REMOVED(isMobile(window)))
      },
      () => {
        onRemovalClose()
        setupErrorNotification()
      }
    )

  const { data, isLoading: isLoadingDoctor } = useDoctor(router?.query?.slug?.[0] ?? '')
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
  const isLoading = useMemo(
    () => isLoadingAccessApproval || isLoadingAccessDenial || isLoadingAccessRemoval,
    [isLoadingAccessApproval, isLoadingAccessDenial, isLoadingAccessRemoval]
  )
  const requestId = useMemo(() => router?.query?.slug?.[1], [router.query.slug])

  const onApproval = useCallback(() => {
    approveAccess(requestId ?? '')
  }, [approveAccess, requestId])

  const onDenial = useCallback(() => {
    denyAccess(requestId ?? '')
  }, [denyAccess, requestId])

  const doctorData = useMemo(() => data?.data ?? DoctorsFallback[0], [data])

  const onRemoval = useCallback(() => {
    removeAccess(doctorData?.id ?? '')
  }, [removeAccess, doctorData])

  const context = useMemo(
    () => ({
      doctor: doctorData,
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
      doctorData,
      isApprovalOpen,
      isDenialOpen,
      isRemovalOpen,
      onApprovalClose,
      onApprovalOpen,
      onDenialClose,
      onDenialOpen,
      onRemovalClose,
      onRemovalOpen,
      onApproval,
      onDenial,
      onRemoval,
      isLoading
    ]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoadingDoctor ? <Splash /> : <DoctorView context={context} />
}
