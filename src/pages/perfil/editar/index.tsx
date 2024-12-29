import Splash from '@components/atoms/Splash'
import { patient } from '@constants/index'
import { GENERIC_NOTIFICATION, GENERIC_ERROR } from '@constants/index'
import { getUser } from '@shared/index'
import { usePatientByGovId, usePatientUpdate } from '@src/services'
import { Patient } from '@src/types'
import { isMobile } from '@src/utils'
import EditPatientView from '@views/PatientEdit'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { Store } from 'react-notifications-component'

export default function PatientEditPage() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()
  const router = useRouter()

  const { data, isLoading: isPatientLoading } = usePatientByGovId(user?.govId)
  const { mutate, isLoading: isUpdateLoading } = usePatientUpdate(
    () => {
      Store.addNotification(
        GENERIC_NOTIFICATION('Datos actualizados exitosamente.', isMobile(window))
      )
      router.push('/perfil')
    },
    () =>
      Store.addNotification(
        GENERIC_ERROR('Ha ocurrido un error, por favor inténtelo de nuevo.', isMobile(window))
      )
  )
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isLoading = useMemo(
    () => isPatientLoading || isUpdateLoading,
    [isPatientLoading, isUpdateLoading]
  )

  const onSubmit = useCallback(
    (patient: Patient) => {
      const body = {
        ...data?.data,
        ...patient
      }

      mutate(body)
    },
    [data?.data, mutate]
  )

  const context = useMemo(
    () => ({
      onSubmit,
      patient: data?.data ?? patient
    }),
    [data?.data, onSubmit]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <EditPatientView context={context} />
}
