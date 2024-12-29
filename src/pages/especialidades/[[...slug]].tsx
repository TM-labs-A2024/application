import { useSpecialties, usePatientByGovId } from '@services/index'
import { getSession, getUser } from '@shared/index'
import Splash from '@src/components/atoms/Splash'
import { specialties as specialtiesFallback } from '@src/constants'
import SpecialtiesView from '@views/Specialties'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialtiesPage() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter()

  const { data: patientData, isLoading: isPatientLoading } = usePatientByGovId(
    router?.query?.slug?.[0] ?? getUser()?.govId
  )
  const patient = useMemo(() => patientData?.data, [patientData])
  const { data: specialitiesData, isLoading: isSpecialitiesLoading } = useSpecialties()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const isLoading = useMemo(
    () => isPatientLoading || isSpecialitiesLoading,
    [isPatientLoading, isSpecialitiesLoading]
  )

  const isPatient = useMemo(() => getSession() === 'patient', [])

  const specialties = useMemo(
    () => specialitiesData?.data ?? specialtiesFallback,
    [specialitiesData]
  )

  const context = useMemo(
    () => ({
      isPatient,
      patient,
      specialties
    }),
    [patient, specialties, isPatient]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <SpecialtiesView context={context} />
}
