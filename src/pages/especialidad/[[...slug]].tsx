import { specialties as specialtiesFallback } from '@constants/index'
import { useSpecialties, useSpecialityRecordsByPatientGovId } from '@services/index'
import { getSession, getUser } from '@shared/index'
import Splash from '@src/components/atoms/Splash'
import SpecialtyView from '@src/views/Specialty'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialtyPage() {
  // --- Local state -----------------------------------------------------------
  const router = useRouter()
  const user = getUser()

  const isPatient = useMemo(() => getSession() === 'patient', [])
  const isDoctor = useMemo(() => getSession() === 'doctor', [])
  const specialtyId = useMemo(() => String(router.query.slug?.[1]), [router.query.slug])

  const patientId = useMemo(
    () => (isPatient ? user?.govId : String(router.query.slug?.[0])),
    [isPatient, router.query.slug, user?.govId]
  )
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const { data: specialties, isLoading: isLoadingSpecialties } = useSpecialties()
  const { data: records, isLoading: isLoadingRecord } = useSpecialityRecordsByPatientGovId(
    specialtyId,
    patientId
  )
  // --- END: Hooks ------------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isLoading = useMemo(
    () => isLoadingSpecialties || isLoadingRecord,
    [isLoadingSpecialties, isLoadingRecord]
  )

  const specialty = useMemo(
    () => specialties?.data?.find((specialty) => String(specialty.id) === specialtyId),
    [specialties?.data, specialtyId]
  )

  const currentTab = useMemo(() => {
    if (!router.query.type) return 0

    const tab = router.query.type

    if (typeof window !== 'undefined') {
      router.replace(router.asPath.split('?')[0])
    }

    switch (tab) {
      case 'evolution':
        return 0
      case 'order':
        return 1
      case 'test':
        return 2
      default:
        return 0
    }
  }, [router])

  const specialtyData = useMemo(
    () => ({
      evolutions: records?.data
        ?.filter((el) => el.type !== 'orden' && el.type !== 'análisis')
        ?.map((evolution) => ({
          ...evolution,
          reason: evolution.description,
          date: new Date(evolution.created_at)
        })),
      orders: records?.data
        ?.filter((el) => el.type === 'orden')
        ?.map((evolution) => ({
          ...evolution,
          date: new Date(evolution.created_at)
        })),
      tests: records?.data
        ?.filter((el) => el.type === 'análisis')
        ?.map((evolution) => ({
          ...evolution,
          date: new Date(evolution.created_at)
        }))
    }),
    [records]
  )

  const data = useMemo(
    () => ({
      evolutions: specialtyData?.evolutions?.map(({ id, title, author, reason }) => ({
        href: isPatient
          ? `/evolucion/${specialtyId}/${id}`
          : `/evolucion/${patientId}/${specialtyId}/${id}`,
        title,
        description: `Editado por: ${author}`,
        comment: `Patología: ${reason}`
      })),
      orders: specialtyData?.orders?.map(({ id, title, date, author }) => ({
        href: isPatient
          ? `/orden/${specialtyId}/${id}`
          : `/orden/${patientId}/${specialtyId}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      })),
      tests: specialtyData?.tests?.map(({ id, title, date, author }) => ({
        href: isPatient
          ? `/analisis/${specialtyId}/${id}`
          : `/analisis/${patientId}/${specialtyId}/${id}`,
        title,
        description: `${format(new Date(date), 'dd, MMMM yyyy', {
          locale: es
        })}`,
        comment: `Agregado por: ${author}`
      }))
    }),
    [isPatient, patientId, specialtyId, specialtyData]
  )

  const context = useMemo(
    () => ({
      isPatient,
      isDoctor,
      specialty: specialty ?? specialtiesFallback[0],
      data,
      currentTab
    }),
    [isPatient, specialty, data, currentTab, isDoctor]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <SpecialtyView context={context} />
}
