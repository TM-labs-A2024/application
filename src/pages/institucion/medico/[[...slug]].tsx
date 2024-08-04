import { useDisclosure } from '@chakra-ui/react'
import Splash from '@components/atoms/Splash'
import { ACCESS_GRANTED, ACCESS_DENIED, ACCESS_REMOVED } from '@constants/index'
import { doctors as DoctorsFallback } from '@constants/index'
import {
  useDoctor,
  useInstitutionApproveAccessRequestsMutation,
  useInstitutionDenyAccessRequestsMutation,
  useInstitutionRevokeAccessRequestsMutation,
  useSpecialties
} from '@services/index'
import { isMobile, setupErrorNotification } from '@src/utils'
import InstitutionDoctorView from '@views/InstitutionDoctor'
import { useRouter } from 'next/router'
import React, { useMemo, useCallback } from 'react'
import { Store } from 'react-notifications-component'

export default function InstitutionDoctorPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { isOpen: isDenialOpen, onOpen: onDenialOpen, onClose: onDenialClose } = useDisclosure()
  const {
    isOpen: isApprovalOpen,
    onOpen: onApprovalOpen,
    onClose: onApprovalClose
  } = useDisclosure()
  const { isOpen: isRemovalOpen, onOpen: onRemovalOpen, onClose: onRemovalClose } = useDisclosure()

  const { data, isLoading: isDoctorLoading } = useDoctor(router.query.slug?.[0] ?? '')
  const { data: specialties } = useSpecialties()

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
  const specialtiesOptions = specialties?.data?.map((option: { name: string; id: string }) => ({
    value: option.id,
    label: option.name
  }))

  const isLoading = useMemo(
    () =>
      isLoadingAccessApproval || isLoadingAccessDenial || isLoadingAccessRemoval || isDoctorLoading,
    [isLoadingAccessApproval, isLoadingAccessDenial, isLoadingAccessRemoval, isDoctorLoading]
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
      specialtiesOptions: specialtiesOptions ?? [],
      doctor: data?.data ?? DoctorsFallback[0],
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
      specialtiesOptions,
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

  return isLoading ? <Splash /> : <InstitutionDoctorView context={context} />
}
