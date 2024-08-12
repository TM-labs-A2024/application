import Splash from '@components/atoms/Splash'
import { specialties as specialtiesFallback } from '@constants/index'
import { usePatientByGovId, useSpecialties } from '@services/index'
import { getUser } from '@shared/index'
import SpecialtiesSearchView from '@views/Specialties/Search'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export default function SpecialtiesSearchPage() {
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

  const specialties = useMemo(
    () => specialitiesData?.data ?? specialtiesFallback,
    [specialitiesData]
  )

  const context = useMemo(
    () => ({
      specialties,
      patient
    }),
    [patient, specialties]
  )
  // --- END: Data and handlers ------------------------------------------------

  return isLoading ? <Splash /> : <SpecialtiesSearchView context={context} />
}
