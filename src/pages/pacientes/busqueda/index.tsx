import Splash from '@components/atoms/Splash'
import { useDoctorPatients, useApprovedInstitutions } from '@services/index'
import { patients } from '@src/constants'
import { getSession, getUser } from '@src/shared'
import PatientsSearchView from '@views/Patients/Search'
import React, { useMemo } from 'react'

export default function PatientsSearchPage() {
  // --- Hooks -----------------------------------------------------------------
  const user = useMemo(() => getUser(), [])

  const { data, isLoading } = useDoctorPatients(user?.id)
  const { data: institutionsData } = useApprovedInstitutions()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isDoctor = useMemo(() => getSession() === 'doctor', [])

  const approvedPatients = useMemo(
    () =>
      isDoctor
        ? data?.data?.filter((patient) => !patient.pending) ?? []
        : patients.filter((patient) => !patient.pending && patient?.status === 'hospitalizado'),
    [isDoctor, data]
  )

  const context = useMemo(
    () => ({
      approvedPatients,
      institutionsData: institutionsData?.data ?? []
    }),
    [approvedPatients]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <PatientsSearchView context={context} />
}
