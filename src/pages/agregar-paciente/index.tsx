import { ACCESS_REQUESTED } from '@constants/index'
import { patients } from '@src/constants'
import { Patient } from '@src/types'
import { isMobile } from '@utils/index'
import AddPatientView from '@views/AddPatient'
import React, { useState, useCallback, useMemo } from 'react'
import { Store } from 'react-notifications-component'

export default function Medicos() {
  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [filteredPatients, setFilteredPatients] = useState<Patient[] | []>([])
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onChange = useCallback(
    (id: string) =>
      id !== ''
        ? setFilteredPatients(patients?.filter((patient) => patient?.govId?.includes(id)))
        : setFilteredPatients([]),
    []
  )

  const onSubmit = useCallback(() => {
    Store.addNotification(ACCESS_REQUESTED(isMobile(window)))
  }, [])

  const context = useMemo(
    () => ({
      onChange,
      filteredPatients,
      onSubmit
    }),
    [onChange, filteredPatients, onSubmit]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <AddPatientView context={context} />
}
