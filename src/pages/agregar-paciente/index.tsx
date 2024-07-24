/* eslint-disable no-console */
import { ACCESS_REQUESTED } from '@constants/index'
import Splash from '@src/components/atoms/Splash'
import { usePatients, usePatientAccessRequestMutation } from '@src/services/index'
import { Patient } from '@src/types'
import { isMobile } from '@utils/index'
import { setupErrorNotification } from '@utils/index'
import AddPatientView from '@views/AddPatient'
import React, { useState, useCallback, useMemo } from 'react'
import { Store } from 'react-notifications-component'

export default function AgregarPaciente() {
  // --- Local state -----------------------------------------------------------
  const [filteredPatients, setFilteredPatients] = useState<Patient[] | []>([])
  const [loadingId, setLoadingId] = useState('')
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  const { data, isLoading } = usePatients()

  const { mutate: requestAccess } = usePatientAccessRequestMutation(
    () => {
      setLoadingId('')
      Store.addNotification(ACCESS_REQUESTED(isMobile(window)))
    },
    () => {
      setLoadingId('')
      setupErrorNotification()
    }
  )
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const patients = useMemo(() => data?.data, [data])
  const onChange = useCallback(
    (id: string) =>
      id !== ''
        ? setFilteredPatients(patients?.filter((patient) => patient?.govId?.includes(id)) ?? [])
        : setFilteredPatients([]),
    [patients]
  )

  const onSubmit = useCallback(
    (patientId: string) => {
      setLoadingId(patientId)
      requestAccess(patientId)
    },
    [requestAccess]
  )

  const context = useMemo(
    () => ({
      onChange,
      filteredPatients,
      onSubmit,
      loadingId
    }),
    [onChange, filteredPatients, onSubmit, loadingId]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <AddPatientView context={context} />
}
