import Splash from '@components/atoms/Splash'
import { doctors, GENERIC_NOTIFICATION, GENERIC_ERROR } from '@constants/index'
import { useDoctor, useSpecialties, useUpdateDoctor } from '@services/index'
import { getUser, removeSession } from '@shared/index'
import { ReactSelectOption } from '@src/types'
import DoctorProfileView from '@src/views/DoctorProfile'
import { isMobile } from '@utils/index'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Store } from 'react-notifications-component'

export default function DoctorProfile() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()
  const router = useRouter()

  const { data: doctorData, isLoading: isDoctorLoading } = useDoctor(
    user?.id,
    () => setIsLoading(false),
    () => setIsLoading(false)
  )

  const { data: specialties, isLoading: isSpecialtiesLoading } = useSpecialties(
    () => setIsLoading(false),
    () => setIsLoading(false)
  )

  const { mutate: updateDoctor, isLoading: isMutationLoading } = useUpdateDoctor(
    () => {
      Store.addNotification(
        GENERIC_NOTIFICATION('Datos actualizados exitosamente.', isMobile(window))
      )
      setIsLoading(false)
    },
    () => {
      Store.addNotification(
        GENERIC_ERROR(
          'Ha ocurrido un error actualizando los datos. Por favor inténtelo de nuevo.',
          isMobile(window)
        )
      )
      setIsLoading(false)
    }
  )
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false)
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    if (isSpecialtiesLoading || isMutationLoading || isDoctorLoading) setIsLoading(true)

    return () => setIsLoading(false)
  }, [isSpecialtiesLoading, isMutationLoading, isDoctorLoading])
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onSubmit = useCallback(
    (specialties: ReactSelectOption[]) => {
      const data = doctorData?.data ?? doctors[0]
      const body = {
        ...data,
        specialties: specialties.map((specialty) => String(specialty?.value ?? ''))
      }
      updateDoctor(body)
    },
    [doctorData?.data, updateDoctor]
  )

  const specialtiesOptions = specialties?.data?.map((option: { name: string; id: string }) => ({
    value: option.id,
    label: option.name
  }))

  const doctor = useMemo(
    () =>
      doctorData
        ? {
            ...doctorData?.data,
            specialties:
              doctorData?.data?.specialities?.map((specialty: { id: string }) => specialty.id) ?? []
          }
        : doctors[0],
    [doctorData]
  )

  const onLogout = useCallback(() => {
    removeSession()
    router.push('/')
  }, [router])

  const context = useMemo(
    () => ({
      doctor,
      specialtiesOptions: specialtiesOptions ?? [],
      onSubmit,
      onLogout
    }),
    [doctor, specialtiesOptions, onSubmit, onLogout]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <DoctorProfileView context={context} />
}
