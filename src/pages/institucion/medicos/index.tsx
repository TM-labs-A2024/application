import { getUser } from '@shared/index'
import { useInstitutionDoctors, useSpecialties, useInstitutionNurses } from '@src/services'
import InstitutionDoctorsView from '@views/InstitutionDoctors'
import React, { useMemo } from 'react'

export default function InstitutionDoctorsPage() {
  // --- Hooks -----------------------------------------------------------------
  const user = getUser()

  const { data } = useInstitutionDoctors(user?.institutionId)
  const { data: nursesData } = useInstitutionNurses(user?.institutionId)
  const { data: specialties } = useSpecialties()
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const doctorsFiltered = useMemo(() => data?.data ?? [], [data])
  const nursesFiltered = useMemo(() => nursesData?.data ?? [], [nursesData])

  const specialtiesOptions = specialties?.data?.map((option: { name: string; id: string }) => ({
    value: option.id,
    label: option.name
  }))

  const context = useMemo(
    () => ({
      doctors: doctorsFiltered,
      nurses: nursesFiltered,
      specialtiesOptions: specialtiesOptions ?? []
    }),
    [doctorsFiltered, specialtiesOptions, nursesFiltered]
  )
  // --- END: Data and handlers ------------------------------------------------

  return <InstitutionDoctorsView context={context} />
}
