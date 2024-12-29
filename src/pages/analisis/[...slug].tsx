import { useDisclosure } from '@chakra-ui/react'
import Splash from '@components/atoms/Splash'
import { ATTACHMENT_DELETED, IMAGE_DELETED } from '@constants/index'
import { useRecordById, useRecordDelete, useAttachmentDelete } from '@services/index'
import { getSession, getUser } from '@src/shared'
import { isMobile } from '@utils/index'
import AttachmentsView from '@views/Attachments'
import { useRouter } from 'next/router'
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Store } from 'react-notifications-component'

export default function OrdersPage() {
  // --- Local state -----------------------------------------------------------
  const [deleteType, setDeleteType] = useState('all')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()
  const user = getUser()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isDoctor = useMemo(() => getSession() === 'doctor', [])
  const isPatient = useMemo(() => getSession() === 'patient', [])
  const test = useMemo(
    () => (isPatient ? String(router?.query?.slug?.[1]) : String(router?.query?.slug?.[2])),
    [isPatient, router?.query?.slug]
  )

  const { data: recordData } = useRecordById(test)
  const { mutate: deleteRecord } = useRecordDelete(test, () => {
    setImageUrl('')
    Store.addNotification(ATTACHMENT_DELETED(isMobile(window), true))
    router.back()
  })

  const { mutate: deleteAttachment } = useAttachmentDelete(test, () => {
    setImageUrl('')
    Store.addNotification(IMAGE_DELETED(isMobile(window)))
    router.back()
  })
  // --- END: Hooks ------------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (!recordData?.data || !recordData.data.content) {
      setIsLoading(false)

      return
    }

    const fetchImage = async () => {
      try {
        const response = await fetch(recordData.data.content)
        const blob = await response.blob()
        const imageUrl = URL.createObjectURL(blob)
        setImageUrl(imageUrl)
        setIsLoading(false)
      } catch (error) {
        setImageUrl('')
        setIsLoading(false)
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [recordData])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const testData = useMemo(() => recordData?.data, [recordData?.data])
  const title = useMemo(() => String(testData?.title), [testData])

  const specialty = useMemo(
    () => (isPatient ? String(router?.query?.slug?.[0]) : String(router?.query?.slug?.[1])),
    [isPatient, router?.query?.slug]
  )

  const patientId = useMemo(
    () => (isPatient ? user?.govId : router?.query?.slug?.[0]),
    [isPatient, router?.query?.slug, user?.govId]
  )

  const goBackRef = useMemo(
    () => `/especialidad/${patientId}/${specialty}?type=test`,
    [patientId, specialty]
  )

  const data = useMemo(
    () => ({
      description: testData?.description ?? '',
      attachments: imageUrl
        ? [
            {
              url: imageUrl,
              alt: 'Test'
            }
          ]
        : []
    }),
    [imageUrl, testData?.description]
  )

  const onDeleteClick = useCallback(
    (type: string) => {
      setDeleteType(type)
      onOpen()
    },
    [onOpen]
  )

  const onSubmit = useCallback(() => {
    if (deleteType === 'all') {
      deleteRecord(test)
    } else {
      deleteAttachment(test)
    }
    onClose()
  }, [deleteType, onClose, router, test, deleteAttachment, deleteRecord])

  const description = useMemo(
    () => (deleteType === 'all' ? '¿Deseas eliminar el análisis?' : '¿Deseas eliminar la imagen?'),
    [deleteType]
  )

  const context = useMemo(
    () => ({
      goBackRef,
      title,
      data,
      isPatient,
      isDoctor,
      description,
      isOpen,
      deleteType,
      onClose,
      onDeleteClick,
      onSubmit
    }),
    [
      goBackRef,
      title,
      data,
      isPatient,
      isDoctor,
      description,
      isOpen,
      deleteType,
      onClose,
      onDeleteClick,
      onSubmit
    ]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <AttachmentsView context={context} />
}
